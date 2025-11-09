"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Wallet, LogOut, Eye, Copy, Check, Landmark, History, ArrowDownToLine, ArrowUpFromLine } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { usePrivy } from "@privy-io/react-auth"
import { useAccount, useBalance } from "wagmi"
import { WagmiProvider } from "@privy-io/wagmi"
import { wagmiConfig } from "@/lib/wagmiConfig"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

import { ReceiveFundsModal } from "./ReceiveFundsModal"

function WalletModalContent({ isOpen, onClose }: WalletModalProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false)
  const { authenticated, logout } = usePrivy()
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })

  const isMobile = useMediaQuery("(max-width: 640px)")

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  const modalVariants = {
    hidden: {
      opacity: 0,
      x: "100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: "100vw",
    },
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 z-40"
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed inset-y-0 right-0 top-16 w-full max-w-md bg-card border-l border-border shadow-2xl z-50"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg text-accent">
                    <Wallet size={20} />
                  </div>
                  <h2 className="text-lg font-semibold">Wallet</h2>
                </div>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {!authenticated ? (
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      Connect your Account Abstraction wallet to start participating in campaigns.
                    </p>
                    {/* The connect button is in the navbar, so we don't need one here. */}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-card/50 border border-border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Landmark size={16} />
                          Status
                        </span>
                        <span className="text-sm font-semibold text-accent flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent rounded-full" />
                          Connected
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Address</span>
                        <button onClick={handleCopy} className="text-sm font-semibold text-foreground flex items-center gap-2">
                          {isCopied ? <Check size={16} /> : <Copy size={16} />}
                          {isCopied ? "Copied!" : `${address?.slice(0, 6)}...${address?.slice(-4)}`}
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Landmark size={16} />
                          Balance
                        </span>
                        <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                          <Eye size={16} />
                          {balance?.formatted} {balance?.symbol}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <History size={16} />
                        Transaction History
                      </h3>
                      <div className="text-muted-foreground text-sm flex flex-col items-center justify-center text-center p-4 border border-dashed rounded-lg">
                        <History size={32} className="mb-2" />
                        <p>No transactions yet.</p>
                        <p>Your transaction history will appear here.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setIsReceiveModalOpen(true)}
                        className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        <ArrowDownToLine size={18} />
                        Receive
                      </button>
                      <button
                        className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        <ArrowUpFromLine size={18} />
                        Withdraw
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <ReceiveFundsModal
        isOpen={isReceiveModalOpen}
        onClose={() => setIsReceiveModalOpen(false)}
        address={address}
      />
    </>
  )
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export function WalletModal(props: WalletModalProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <WalletModalContent {...props} />
      </WagmiProvider>
    </QueryClientProvider>
  )
}
