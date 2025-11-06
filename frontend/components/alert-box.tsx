"use client"

import type { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface AlertBoxProps {
  isVisible: boolean
  icon: ReactNode
  title: string
  message: string
  onClose: () => void
  variant?: "success" | "error" | "info"
}

export function AlertBox({ isVisible, icon, title, message, onClose, variant = "success" }: AlertBoxProps) {
  const bgColor = {
    success: "bg-green-950",
    error: "bg-red-950",
    info: "bg-blue-950",
  }[variant]

  const borderColor = {
    success: "border-green-800",
    error: "border-red-800",
    info: "border-blue-800",
  }[variant]

  const textColor = {
    success: "text-green-100",
    error: "text-red-100",
    info: "text-blue-100",
  }[variant]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-6 right-6 max-w-sm ${bgColor} border ${borderColor} rounded-lg p-4 shadow-lg z-50`}
        >
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 mt-0.5 ${textColor}`}>{icon}</div>
            <div className="flex-1">
              <h3 className={`font-semibold ${textColor}`}>{title}</h3>
              <p className={`text-sm ${textColor} opacity-90`}>{message}</p>
            </div>
            <button onClick={onClose} className={`flex-shrink-0 ${textColor} hover:opacity-70 transition-opacity`}>
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
