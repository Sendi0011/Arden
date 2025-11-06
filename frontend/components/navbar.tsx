"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Rocket, Home, Layout, HelpCircle, Info, Mail, Wallet } from "lucide-react"
import { WalletModal } from "./wallet-modal"
import { useLocalStorage } from "@/hooks/use-localStorage"

export function Navbar() {
  const pathname = usePathname()
  const [isWalletOpen, setIsWalletOpen] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useLocalStorage("walletConnected", false)
  const [userName] = useLocalStorage<string | null>("userName", null)

  const links = [
    { href: "/#home", label: "Home", icon: Home },
    { href: "/#how-it-works", label: "How It Works", icon: HelpCircle },
    { href: "/about", label: "About Us", icon: Info },
    { href: "/contact", label: "Contact", icon: Mail },
    { href: "/dashboard", label: "Dashboard", icon: Layout },
  ]

  const handleScroll = (href: string) => {
    if (href.includes("#")) {
      const elementId = href.split("#")[1]
      const element = document.getElementById(elementId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <>
      <nav className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group hover:opacity-80 transition-opacity">
            <div className="p-2 bg-accent rounded-lg text-accent-foreground">
              <Rocket size={20} />
            </div>
            <span className="font-bold text-lg text-foreground">Arden</span>
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-1">
              {links.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={(e) => {
                    if (href.includes("#")) {
                      e.preventDefault()
                      handleScroll(href)
                    }
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    pathname === href || pathname === href.split("#")[0]
                      ? "text-accent bg-accent/10"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm">{label}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {userName && (
                <div className="hidden sm:flex items-center px-3 py-2 bg-card border border-border rounded-lg">
                  <span className="text-sm font-medium text-foreground">Welcome, {userName}</span>
                </div>
              )}
              <button
                onClick={() => setIsWalletOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                <Wallet size={18} />
                <span className="text-sm hidden sm:inline">{isWalletConnected ? "Wallet" : "Connect"}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        onConnect={setIsWalletConnected}
        isConnected={isWalletConnected}
      />
    </>
  )
}
