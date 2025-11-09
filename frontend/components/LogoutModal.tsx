"use client"

import { Modal } from "./modal"
import { LogOut, Loader2 } from "lucide-react"

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoggingOut: boolean
}

export function LogoutModal({ isOpen, onClose, onConfirm, isLoggingOut }: LogoutModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Logout" icon={<LogOut size={24} />}>
      <div className="space-y-4">
        <p className="text-muted-foreground">Are you sure you want to log out?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            disabled={isLoggingOut}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoggingOut}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold flex items-center gap-2"
          >
            {isLoggingOut ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Logging out...
              </>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </div>
    </Modal>
  )
}
