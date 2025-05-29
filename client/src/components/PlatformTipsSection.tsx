import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  Clock,
  Play,
  X
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
  image?: string;
  videoUrl?: string;
  description: string;
  examples: string[];
  tips: TipCard[];
}

const platformTips: FeatureTips[] = [
  {
    id: 'marketing',
    title: 'Marketing',
    icon: <MessageSquare className="h-6 w-6" />,
    color: 'from-pink-500 to-rose-500',
    image: '/images/marketing-dashboard.png',
    videoUrl: '/videos/marketing-mastery.mp4',
    description: 'Master automated marketing campaigns that drive customer engagement and revenue growth.',
    examples: [
      'Set up welcome email sequences for new customers',
      'Create birthday and anniversary campaigns with special offers',
      'Build win-back campaigns for inactive customers',
      'Design targeted promotions based on customer behavior'
    ],
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
    image: '/images/wifi-dashboard.png',
    videoUrl: '/videos/wifi-setup.mp4',
    description: 'Transform your WiFi into a powerful customer acquisition and data collection tool.',
    examples: [
      'Configure secure guest networks with branded landing pages',
      'Capture customer data through social WiFi login',
      'Track foot traffic and visitor analytics',
      'Set up location-based marketing triggers'
    ],
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
    image: '/images/reviews-dashboard.png',
    videoUrl: '/videos/reviews-mastery.mp4',
    description: 'Build a systematic approach to collecting and managing customer reviews.',
    examples: ['Automated review requests after visits', 'Response templates for feedback', 'Review monitoring and alerts', 'Integration with review platforms'],
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
    image: '/images/loyalty-dashboard.png',
    videoUrl: '/videos/loyalty-setup.mp4',
    description: 'Create engaging loyalty programs that drive repeat business and customer retention.',
    examples: ['Points-based reward systems', 'VIP membership tiers', 'Referral programs', 'Birthday and milestone rewards'],
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
    image: '/images/bookings-dashboard.png',
    videoUrl: '/videos/bookings-setup.mp4',
    description: 'Streamline reservations and appointments with automated booking management.',
    examples: ['Online reservation system', 'Calendar synchronization', 'Automated confirmations', 'Payment processing'],
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
    id: 'analytics',
    title: 'Analytics',
    icon: <TrendingUp className="h-6 w-6" />,
    color: 'from-blue-500 to-purple-500',
    image: '/images/analytics-dashboard.png',
    videoUrl: '/videos/analytics-setup.mp4',
    description: 'Track performance metrics and gain insights into customer behavior and business trends.',
    examples: ['Customer behavior tracking', 'Revenue analytics', 'Performance dashboards', 'Custom reporting'],
    tips: [
      {
        id: 'dashboard-setup',
        title: 'Analytics Dashboard',
        description: 'Create comprehensive dashboards with key performance indicators and metrics',
        timeToImplement: '15 mins',
        difficulty: 'Easy',
        category: 'reporting'
      },
      {
        id: 'customer-insights',
        title: 'Customer Behavior Analytics',
        description: 'Track customer interactions, preferences, and engagement patterns',
        timeToImplement: '20 mins',
        difficulty: 'Medium',
        category: 'insights'
      },
      {
        id: 'custom-reports',
        title: 'Custom Report Builder',
        description: 'Design and schedule custom reports for business intelligence and decision making',
        timeToImplement: '25 mins',
        difficulty: 'Advanced',
        category: 'reports'
      }
    ]
  }
];

// Customer inspiration examples for each feature
const getCustomerExamples = (featureId: string) => {
  const examples = {
    marketing: [
      {
        icon: '📧',
        type: 'Email Campaign',
        title: 'Welcome Series Success',
        description: 'Automated 3-email welcome sequence with 40% open rates',
        business: 'Great British Inn',
        result: '+25% bookings'
      },
      {
        icon: '🎂',
        type: 'Birthday Campaign',
        title: 'Birthday Rewards Program',
        description: 'Monthly birthday offers driving repeat visits',
        business: 'Vino Vita',
        result: '65% redemption'
      },
      {
        icon: '🔄',
        type: 'Win-back Campaign',
        title: 'Inactive Customer Recovery',
        description: 'Targeted offers to customers who haven\'t visited in 90 days',
        business: 'Number 90 UK',
        result: '30% return rate'
      },
      {
        icon: '🎯',
        type: 'Targeted Promo',
        title: 'Behavioral Triggers',
        description: 'Promotions based on visit frequency and spending patterns',
        business: 'Local Cafe',
        result: '+40% revenue'
      }
    ],
    wifi: [
      {
        icon: '📶',
        type: 'Guest Portal',
        title: 'Branded WiFi Landing',
        description: 'Custom splash page capturing customer data',
        business: 'Coffee Shop',
        result: '500+ emails/month'
      },
      {
        icon: '📱',
        type: 'Social Login',
        title: 'Facebook WiFi Access',
        description: 'Social media login for seamless data collection',
        business: 'Restaurant',
        result: '80% data capture'
      },
      {
        icon: '📊',
        type: 'Analytics',
        title: 'Foot Traffic Insights',
        description: 'Real-time visitor analytics and return visit tracking',
        business: 'Retail Store',
        result: 'Daily insights'
      },
      {
        icon: '📍',
        type: 'Location Based',
        title: 'Geofencing Campaigns',
        description: 'Location-triggered marketing messages',
        business: 'Shopping Center',
        result: '15% uplift'
      }
    ],
    reviews: [
      {
        icon: '⭐',
        type: 'Review Request',
        title: 'Automated Review Invites',
        description: 'Timed review requests 24 hours after visits',
        business: 'Hotel',
        result: '4.8★ average'
      },
      {
        icon: '💬',
        type: 'Response System',
        title: 'Review Response Templates',
        description: 'Quick responses to all customer feedback',
        business: 'Restaurant',
        result: '100% response rate'
      },
      {
        icon: '🔔',
        type: 'Monitoring',
        title: 'Review Alerts',
        description: 'Instant notifications for new reviews across platforms',
        business: 'Spa',
        result: 'Real-time tracking'
      },
      {
        icon: '📈',
        type: 'Analytics',
        title: 'Review Performance',
        description: 'Monthly review analytics and improvement insights',
        business: 'Gym',
        result: '+1.2★ improvement'
      }
    ],
    loyalty: [
      {
        icon: '🎁',
        type: 'Points System',
        title: 'Visit-Based Rewards',
        description: 'Earn points for every visit and purchase',
        business: 'Bakery',
        result: '70% participation'
      },
      {
        icon: '👑',
        type: 'VIP Tiers',
        title: 'Gold Membership Program',
        description: 'Exclusive perks for top customers',
        business: 'Wine Bar',
        result: '45% retention'
      },
      {
        icon: '🤝',
        type: 'Referral Program',
        title: 'Friend Referral Rewards',
        description: 'Bonus points for bringing new customers',
        business: 'Fitness Studio',
        result: '25% new customers'
      },
      {
        icon: '🎪',
        type: 'Special Events',
        title: 'Member-Only Events',
        description: 'Exclusive access to special events and tastings',
        business: 'Brewery',
        result: 'Sold out events'
      }
    ],
    bookings: [
      {
        icon: '📅',
        type: 'Online Booking',
        title: 'Table Reservations',
        description: '24/7 online booking with real-time availability',
        business: 'Fine Dining',
        result: '60% online bookings'
      },
      {
        icon: '🔄',
        type: 'Calendar Sync',
        title: 'Multi-Platform Integration',
        description: 'Synced across Google, Outlook, and Apple calendars',
        business: 'Salon',
        result: 'Zero conflicts'
      },
      {
        icon: '✅',
        type: 'Confirmations',
        title: 'Automated Reminders',
        description: 'SMS and email confirmations with reminder sequences',
        business: 'Dental Practice',
        result: '5% no-shows'
      },
      {
        icon: '💳',
        type: 'Payment Processing',
        title: 'Deposit Collection',
        description: 'Secure deposit collection for reservations',
        business: 'Event Venue',
        result: '90% deposit rate'
      }
    ],
    analytics: [
      {
        icon: '📊',
        type: 'Performance Tracking',
        title: 'Customer Behavior Dashboard',
        description: 'Real-time tracking of customer visits, preferences, and spending patterns',
        business: 'Coffee Shop',
        result: '25% revenue increase'
      },
      {
        icon: '📈',
        type: 'Custom Reports',
        title: 'Weekly Business Intelligence',
        description: 'Automated reports showing peak hours, popular items, and customer retention',
        business: 'Restaurant',
        result: 'Data-driven decisions'
      },
      {
        icon: '🎯',
        type: 'Customer Insights',
        title: 'Behavior Analytics',
        description: 'Track customer engagement and identify high-value segments',
        business: 'Retail Store',
        result: '40% better targeting'
      },
      {
        icon: '📋',
        type: 'Custom Analytics',
        title: 'Revenue Forecasting',
        description: 'Predictive analytics for inventory and staffing decisions',
        business: 'Hotel',
        result: '15% cost savings'
      }
    ]
  };
  
  return examples[featureId as keyof typeof examples] || [];
};

export default function PlatformTipsSection() {
  const [selectedFeature, setSelectedFeature] = useState(platformTips[0]);
  const [selectedModal, setSelectedModal] = useState<FeatureTips | null>(null);
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
          <div 
            key={feature.id} 
            className="interactive-card group cursor-pointer"
            onClick={() => setSelectedModal(feature)}
          >
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

      {/* Feature Mastery Modal */}
      <Dialog open={!!selectedModal} onOpenChange={() => setSelectedModal(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0D0D24] to-black border-[#FF389A]/30">
          {selectedModal && (
            <>
              <DialogHeader className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30">
                    {selectedModal.icon}
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold text-white">
                      Master {selectedModal.title}
                    </DialogTitle>
                    <DialogDescription className="text-gray-300 text-lg">
                      {selectedModal.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Video Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Play className="h-5 w-5 text-[#FF389A]" />
                    Training Video
                  </h3>
                  <div className="rounded-lg overflow-hidden border border-[#FF389A]/20 bg-black/50">
                    {selectedModal.videoUrl ? (
                      <video 
                        className="w-full h-64 object-cover"
                        controls
                        poster={selectedModal.image}
                      >
                        <source src={selectedModal.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="w-full h-64 flex items-center justify-center bg-gray-800">
                        <div className="text-center space-y-2">
                          <Play className="h-12 w-12 text-gray-400 mx-auto" />
                          <p className="text-gray-400">Training video coming soon</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Customer Inspiration Section */}
                <div className="space-y-4">
                  <div className="text-center space-y-2 py-4">
                    <h3 className="text-xl font-bold text-white">Need Some Inspiration?</h3>
                    <p className="text-gray-300">
                      Check out some of what our customers have done and let's get your dream started
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getCustomerExamples(selectedModal.id).map((example, index) => (
                      <div key={index} className="bg-[#0D0D24]/30 rounded-lg border border-[#FF389A]/20 overflow-hidden">
                        <div className="h-32 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                          <div className="text-center space-y-1">
                            <div className="text-2xl">{example.icon}</div>
                            <p className="text-xs text-gray-400">{example.type}</p>
                          </div>
                        </div>
                        <div className="p-3 space-y-2">
                          <h4 className="font-bold text-white text-sm">{example.title}</h4>
                          <p className="text-gray-300 text-xs">{example.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-[#FF389A] text-xs font-medium">{example.business}</span>
                            <span className="text-gray-400 text-xs">{example.result}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Examples Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">What You'll Learn</h3>
                  <div className="grid gap-3">
                    {selectedModal.examples.map((example, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-[#0D0D24]/50 rounded-lg border border-[#FF389A]/20">
                        <div className="w-6 h-6 rounded-full bg-[#FF389A]/20 flex items-center justify-center text-xs font-bold text-[#FF389A] mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-gray-300">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feature Details */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Feature Details</h3>
                  <div className="space-y-3">
                    {selectedModal.tips.map((tip, index) => (
                      <div key={tip.id} className="p-4 bg-[#0D0D24]/50 rounded-lg border border-gray-600/30">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-white">{tip.title}</h4>
                          <Badge className={getDifficultyColor(tip.difficulty)} variant="secondary">
                            {tip.difficulty}
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{tip.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Clock className="h-3 w-3" />
                          <span>{tip.timeToImplement}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-4 border-t border-[#FF389A]/20">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedModal(null)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Close
                  </Button>
                  <Button className="bg-[#FF389A] hover:bg-[#E6329C] text-white">
                    Start Learning
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}