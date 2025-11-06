import { Zap, Database, Palette, Code2, Smartphone, Blocks } from "lucide-react"

export interface Campaign {
  id: string
  title: string
  description: string
  icon: any
  participants: number
  reward: string
  tasks: number
  reward_amount: string
}

export const campaigns: Campaign[] = [
  {
    id: "1",
    title: "Launch Analytics Dashboard",
    description: "Help test our new analytics platform and provide feedback",
    icon: Zap,
    participants: 342,
    reward: "500 USDC",
    tasks: 3,
    reward_amount: "500 USDC",
  },
  {
    id: "2",
    title: "Beta Test Database Tool",
    description: "Be among the first to try our optimized database solution",
    icon: Database,
    participants: 218,
    reward: "250 USDC",
    tasks: 4,
    reward_amount: "250 USDC",
  },
  {
    id: "3",
    title: "Design System Review",
    description: "Review our new design system and suggest improvements",
    icon: Palette,
    participants: 156,
    reward: "300 USDC",
    tasks: 2,
    reward_amount: "300 USDC",
  },
  {
    id: "4",
    title: "API Integration Testing",
    description: "Test our new REST API endpoints and report issues",
    icon: Code2,
    participants: 287,
    reward: "350 USDC",
    tasks: 5,
    reward_amount: "350 USDC",
  },
  {
    id: "5",
    title: "Mobile App Feedback",
    description: "Try our iOS app and share your user experience",
    icon: Smartphone,
    participants: 195,
    reward: "400 USDC",
    tasks: 3,
    reward_amount: "400 USDC",
  },
  {
    id: "6",
    title: "Component Library Testing",
    description: "Help us perfect our component library",
    icon: Blocks,
    participants: 223,
    reward: "275 USDC",
    tasks: 4,
    reward_amount: "275 USDC",
  },
]
