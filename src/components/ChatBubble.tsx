"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageCircle, X, Minimize2 } from "lucide-react";

interface ChatBubbleProps {
  isOpen: boolean;
  onToggle: () => void;
  onMinimize: () => void;
  unreadCount?: number;
}

export default function ChatBubble({ 
  isOpen, 
  onToggle, 
  onMinimize, 
  unreadCount = 0 
}: ChatBubbleProps) {
  return (
    <>
      {/* Burbuja flotante - solo visible cuando chat está cerrado */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              onClick={onToggle}
              className="relative bg-[var(--solar-orange)] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={24} />
              
              {/* Contador de mensajes no leídos */}
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-[var(--electric-blue)] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </motion.span>
              )}
              
              {/* Efecto de pulso */}
              <motion.div
                className="absolute inset-0 bg-[var(--solar-orange)] rounded-full opacity-30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón de minimizar - solo visible cuando chat está abierto */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={onMinimize}
            className="fixed bottom-6 right-6 z-50 bg-white border border-black/10 text-[var(--electric-blue)] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Minimize2 size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
