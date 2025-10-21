"use client";

import { useState, useCallback, useRef } from "react";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
  isTyping?: boolean;
}

interface UseChatAgentReturn {
  isOpen: boolean;
  isMinimized: boolean;
  messages: Message[];
  isTyping: boolean;
  unreadCount: number;
  toggleChat: () => void;
  minimizeChat: () => void;
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
}

const WEBHOOK_URL = "https://obsessive-solutions-n8n.vdwibu.easypanel.host/webhook/agente-landing-xodarcom";

export function useChatAgent(): UseChatAgentReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const minimizeChat = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(true);
  }, []);

  const addMessage = useCallback((message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Incrementar contador si el chat está cerrado y es un mensaje del agente
    if (!isOpen && message.sender === "agent") {
      setUnreadCount(prev => prev + 1);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim()) return;

    // Cancelar petición anterior si existe
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Crear nuevo AbortController
    abortControllerRef.current = new AbortController();

    // Añadir mensaje del usuario
    addMessage({
      text: messageText,
      sender: "user"
    });

    setIsTyping(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          source: "xodarcom-landing-chat",
          url: typeof window !== "undefined" ? window.location.href : "",
          timestamp: new Date().toISOString(),
          sessionId: getSessionId(),
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      let data;
      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // Si no es JSON, obtener como texto
        const textResponse = await response.text();
        console.log("Respuesta del webhook (texto):", textResponse);
        data = { message: textResponse };
      }
      
      // Debug: log de la respuesta
      console.log("Respuesta del webhook:", data);
      
      // Simular delay de escritura
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      // Manejar diferentes formatos de respuesta
      let responseText = "Gracias por tu mensaje. Te contactaremos pronto.";
      
      if (typeof data === "string") {
        responseText = data;
      } else if (data && typeof data === "object") {
        responseText = data.output ||        // N8N format
                      data.response || 
                      data.message || 
                      data.text || 
                      data.answer ||
                      data.reply ||
                      JSON.stringify(data);
      }
      
      // Añadir respuesta del agente
      addMessage({
        text: responseText,
        sender: "agent"
      });

    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        // Petición cancelada, no hacer nada
        return;
      }
      
      console.error("Error enviando mensaje:", error);
      
      // Mensaje de error amigable
      addMessage({
        text: "Lo siento, hay un problema de conexión. Por favor, intenta nuevamente o contacta directamente a info@xodarcom.com",
        sender: "agent"
      });
    } finally {
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  }, [addMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setUnreadCount(0);
  }, []);

  return {
    isOpen,
    isMinimized,
    messages,
    isTyping,
    unreadCount,
    toggleChat,
    minimizeChat,
    sendMessage,
    clearMessages
  };
}

// Función para generar/obtener sessionId
function getSessionId(): string {
  if (typeof window === "undefined") return "server-session";
  
  let sessionId = sessionStorage.getItem("xodarcom-chat-session");
  if (!sessionId) {
    sessionId = "chat-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem("xodarcom-chat-session", sessionId);
  }
  return sessionId;
}
