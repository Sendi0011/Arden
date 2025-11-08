"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Users, Award, PlusCircle, XCircle } from "lucide-react"

interface CampaignCardProps {
  id: string
  title: string
  description: string
  icon: ReactNode
  participants: number
  reward: string
  isJoined?: boolean
  onJoin: (e: React.MouseEvent) => void
  onLeave: (e: React.MouseEvent) => void
  isBuilder?: boolean
}

export function CampaignCard({
  id,
  title,
  description,
  icon,
  participants,
  reward,
  isJoined = false,
  onJoin,
  onLeave,
  isBuilder = false,
}: CampaignCardProps) {
  return (
    <Link href={`/campaign/${id}`} className="block h-full">
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors group h-full flex flex-col"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-accent/10 rounded-lg text-accent">{icon}</div>
          {!isBuilder &&
            (isJoined ? (
              <button
                onClick={onLeave}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
              >
                <XCircle size={14} />
                Leave
              </button>
            ) : (
              <button
                onClick={onJoin}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
              >
                <PlusCircle size={14} />
                Join
              </button>
            ))}
        </div>

        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        </div>

        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/50 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{participants}</span>
          </div>
          <div className="flex items-center gap-1">
            <Award size={16} />
            <span>{reward}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}