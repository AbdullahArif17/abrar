import { Shield, Truck, RefreshCw, Users } from 'lucide-react'

interface TrustBadge {
  icon: React.ReactNode
  title: string
  description: string
}

const badges: TrustBadge[] = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: '1 Year Warranty',
    description: 'Full coverage'
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: '7 Days Return',
    description: 'Easy replacement'
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: 'Free Delivery',
    description: 'On orders 5000+'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: '50,000+',
    description: 'Happy customers'
  }
]

export function TrustBadges() {
  return (
    <div className="bg-secondary/50 border-y border-border py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                {badge.icon}
              </div>
              <div>
                <h4 className="font-bold text-sm text-primary">{badge.title}</h4>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
