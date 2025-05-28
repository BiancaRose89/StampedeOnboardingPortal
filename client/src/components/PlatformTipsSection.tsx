import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/AuthProvider';
import { 
  MessageSquare, 
  Wifi, 
  Star, 
  Gift, 
  Calendar, 
  Users,
  Mail,
  Zap,
  FileText,
  Settings,
  TrendingUp,
  Clock
} from 'lucide-react';

interface TipCard {
  id: string;
  title: string;
  description: string;
  timeToImplement: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  category: string;
}

interface FeatureTips {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  tips: TipCard[];
}

const platformTips: FeatureTips[] = [
  {
    id: 'marketing',
    title: 'Marketing',
    icon: <MessageSquare className="h-6 w-6" />,
    color: 'from-pink-500 to-rose-500',
    tips: [
      {
        id: 'email-automation',
        title: 'Email Automations',
        description: 'Set up welcome sequences, birthday campaigns, and win-back series to engage customers automatically',
        timeToImplement: '15 mins',
        difficulty: 'Easy',
        category: 'automation'
      },
      {
        id: 'create-forms',
        title: 'Create Lead Forms',
        description: 'Build high-converting forms for newsletters, events, and special promotions with custom fields',
        timeToImplement: '10 mins',
        difficulty: 'Easy',
        category: 'forms'
      },
      {
        id: 'segment-customers',
        title: 'Customer Segmentation',
        description: 'Group customers by behavior, preferences, or demographics for targeted campaigns',
        timeToImplement: '20 mins',
        difficulty: 'Medium',
        category: 'targeting'
      }
    ]
  },
  {
    id: 'wifi',
    title: 'WiFi',
    icon: <Wifi className="h-6 w-6" />,
    color: 'from-blue-500 to-cyan-500',
    tips: [
      {
        id: 'guest-network',
        title: 'Guest Network Setup',
        description: 'Configure secure guest WiFi with custom landing pages to capture customer data',
        timeToImplement: '25 mins',
        difficulty: 'Medium',
        category: 'network'
      },
      {
        id: 'wifi-marketing',
        title: 'WiFi Marketing Capture',
        description: 'Turn WiFi access into marketing opportunities with social login and data collection',
        timeToImplement: '15 mins',
        difficulty: 'Easy',
        category: 'marketing'
      },
      {
        id: 'analytics-tracking',
        title: 'WiFi Analytics',
        description: 'Track foot traffic, return visits, and dwell time through WiFi connection data',
        timeToImplement: '10 mins',
        difficulty: 'Easy',
        category: 'analytics'
      }
    ]
  },
  {
    id: 'reviews',
    title: 'Reviews',
    icon: <Star className="h-6 w-6" />,
    color: 'from-yellow-500 to-orange-500',
    tips: [
      {
        id: 'review-requests',
        title: 'Automated Review Requests',
        description: 'Send timed review invitations after visits with personalized messaging',
        timeToImplement: '20 mins',
        difficulty: 'Medium',
        category: 'automation'
      },
      {
        id: 'review-response',
        title: 'Review Response Templates',
        description: 'Create template responses for positive and negative reviews to maintain reputation',
        timeToImplement: '15 mins',
        difficulty: 'Easy',
        category: 'templates'
      },
      {
        id: 'review-display',
        title: 'Display Reviews on Site',
        description: 'Showcase positive reviews on your website and social media automatically',
        timeToImplement: '10 mins',
        difficulty: 'Easy',
        category: 'display'
      }
    ]
  },
  {
    id: 'loyalty',
    title: 'Loyalty',
    icon: <Gift className="h-6 w-6" />,
    color: 'from-purple-500 to-indigo-500',
    tips: [
      {
        id: 'points-system',
        title: 'Points & Rewards System',
        description: 'Set up point values for purchases, visits, and actions with tiered rewards',
        timeToImplement: '30 mins',
        difficulty: 'Medium',
        category: 'rewards'
      },
      {
        id: 'referral-program',
        title: 'Referral Program',
        description: 'Reward customers for bringing friends with bonus points and special offers',
        timeToImplement: '25 mins',
        difficulty: 'Medium',
        category: 'referrals'
      },
      {
        id: 'vip-tiers',
        title: 'VIP Membership Tiers',
        description: 'Create bronze, silver, gold tiers with exclusive perks and early access',
        timeToImplement: '20 mins',
        difficulty: 'Advanced',
        category: 'membership'
      }
    ]
  },
  {
    id: 'bookings',
    title: 'Bookings',
    icon: <Calendar className="h-6 w-6" />,
    color: 'from-green-500 to-emerald-500',
    tips: [
      {
        id: 'calendar-sync',
        title: 'Calendar Integration',
        description: 'Sync with Google Calendar, Outlook, and Apple Calendar for seamless scheduling',
        timeToImplement: '15 mins',
        difficulty: 'Easy',
        category: 'integration'
      },
      {
        id: 'booking-rules',
        title: 'Smart Booking Rules',
        description: 'Set minimum advance notice, buffer times, and capacity limits automatically',
        timeToImplement: '20 mins',
        difficulty: 'Medium',
        category: 'automation'
      },
      {
        id: 'payment-integration',
        title: 'Payment & Deposits',
        description: 'Collect deposits, full payments, or setup payment plans at booking time',
        timeToImplement: '25 mins',
        difficulty: 'Advanced',
        category: 'payments'
      }
    ]
  },
  {
    id: 'account',
    title: 'Account Setup',
    icon: <Users className="h-6 w-6" />,
    color: 'from-gray-500 to-slate-500',
    tips: [
      {
        id: 'team-roles',
        title: 'Team Roles & Permissions',
        description: 'Assign different access levels to staff members based on their responsibilities',
        timeToImplement: '15 mins',
        difficulty: 'Easy',
        category: 'permissions'
      },
      {
        id: 'business-profile',
        title: 'Business Profile Setup',
        description: 'Complete your business information, hours, contact details, and social links',
        timeToImplement: '10 mins',
        difficulty: 'Easy',
        category: 'profile'
      },
      {
        id: 'integration-setup',
        title: 'Third-party Integrations',
        description: 'Connect POS systems, payment processors, and marketing tools',
        timeToImplement: '30 mins',
        difficulty: 'Advanced',
        category: 'integrations'
      }
    ]
  }
];

export default function PlatformTipsSection() {
  const [selectedFeature, setSelectedFeature] = useState(platformTips[0]);
  const { firebaseUser, dbUser } = useAuth();
  
  // Check if user is authenticated
  const isAuthenticated = !!firebaseUser && !!dbUser;
  const isLocked = !isAuthenticated;

  // Locked Overlay Component
  const LockedOverlay = ({ children, title }: { children: React.ReactNode; title: string }) => (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-[#0D0D24]/75 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10 animate-in fade-in duration-500">
        <div className="text-center space-y-4 bg-[#0D0D24]/90 border border-[#FF389A]/30 rounded-2xl p-8 max-w-md mx-4">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-[#FF389A]/20 border border-[#FF389A]/30">
              <Settings className="h-8 w-8 text-[#FF389A]" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white">Ready to Start?</h3>
          <p className="text-gray-300 leading-relaxed">
            Log in to access your personalized onboarding experience and unlock {title.toLowerCase()}.
          </p>
          <Button className="bg-[#FF389A] hover:bg-[#E6329C] text-white px-8 py-3 font-bold w-full">
            Log In to Continue
            <TrendingUp className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-16">
      {/* Master Your Platform Section Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Master Your Platform</h2>
            <p className="text-muted-foreground">Deep-dive into features and best practices to unlock the full potential of your platform.</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              6
            </div>
            <div className="text-sm text-muted-foreground">Core Features</div>
          </div>
        </div>
      </div>

      {/* Master Platform Cards - Matching Onboarding Progress Style */}
      {isLocked ? (
        <LockedOverlay title="Master Your Platform">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40 pointer-events-none">
        {platformTips.map((feature) => (
          <div key={feature.id} className="interactive-card group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 backdrop-blur-sm">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white group-hover:text-glow-pink transition-all duration-300">
                    {feature.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge className="bg-[#FF389A]/20 text-[#FF389A] border-[#FF389A]/30 font-semibold">
                      {feature.tips.length} Features
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-gray-300 leading-relaxed">
                Master essential {feature.title.toLowerCase()} features with step-by-step guidance and best practices.
              </p>
              
              {/* Nested Feature List */}
              <div className="space-y-3">
                {feature.tips.map((tip, index) => (
                  <div key={tip.id} className="flex items-center justify-between p-3 bg-[#0D0D24]/50 rounded-lg border border-gray-600/30 hover:border-[#FF389A]/30 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#FF389A]/20 flex items-center justify-center text-xs font-bold text-[#FF389A]">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{tip.title}</h4>
                        <p className="text-gray-400 text-xs">{tip.description}</p>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(tip.difficulty)} variant="secondary">
                      {tip.difficulty}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-600/30">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="h-4 w-4" />
                <span>10-20 min total</span>
              </div>
              <Button disabled className="bg-gray-600 text-gray-400 px-6 py-2 font-bold cursor-not-allowed">
                Locked
              </Button>
            </div>
          </div>
        ))}
          </div>
        </LockedOverlay>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platformTips.map((feature) => (
          <div key={feature.id} className="interactive-card group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 backdrop-blur-sm">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white group-hover:text-glow-pink transition-all duration-300">
                    {feature.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge className="bg-[#FF389A]/20 text-[#FF389A] border-[#FF389A]/30 font-semibold">
                      {feature.tips.length} Features
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-gray-300 leading-relaxed">
                Master essential {feature.title.toLowerCase()} features with step-by-step guidance and best practices.
              </p>
              
              {/* Nested Feature List */}
              <div className="space-y-3">
                {feature.tips.map((tip, index) => (
                  <div key={tip.id} className="flex items-center justify-between p-3 bg-[#0D0D24]/50 rounded-lg border border-gray-600/30 hover:border-[#FF389A]/30 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#FF389A]/20 flex items-center justify-center text-xs font-bold text-[#FF389A]">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{tip.title}</h4>
                        <p className="text-gray-400 text-xs">{tip.description}</p>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(tip.difficulty)} variant="secondary">
                      {tip.difficulty}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-600/30">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="h-4 w-4" />
                <span>10-20 min total</span>
              </div>
              <Button className="bg-[#FF389A] hover:bg-[#E6329C] text-white px-6 py-2 font-bold">
                Start Learning
                <Zap className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}