import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Master Your Platform</h2>
        <p className="text-gray-300 mt-2">
          Quick tips and best practices for each feature to get you up and running fast
        </p>
      </div>

      {/* Feature Navigation */}
      <div className="flex flex-wrap justify-center gap-3">
        {platformTips.map((feature) => (
          <Button
            key={feature.id}
            onClick={() => setSelectedFeature(feature)}
            variant={selectedFeature.id === feature.id ? "default" : "outline"}
            className={`flex items-center gap-2 px-4 py-2 ${
              selectedFeature.id === feature.id 
                ? 'btn-brand-pink' 
                : 'border-[#FF389A]/30 text-gray-300 hover:bg-[#FF389A]/10'
            }`}
          >
            {feature.icon}
            {feature.title}
          </Button>
        ))}
      </div>

      {/* Selected Feature Tips */}
      <div className="max-w-6xl mx-auto">
        <div className={`bg-gradient-to-r ${selectedFeature.color} p-1 rounded-xl mb-6`}>
          <div className="bg-[#0D0D24] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${selectedFeature.color}`}>
                {selectedFeature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white">{selectedFeature.title} Top Tips</h3>
            </div>
            <p className="text-gray-300">
              Essential tips and quick wins to maximize your {selectedFeature.title.toLowerCase()} success
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedFeature.tips.map((tip) => (
            <Card key={tip.id} className="card-glow h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg text-white">{tip.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(tip.difficulty)}>
                        {tip.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Clock className="h-3 w-3" />
                        {tip.timeToImplement}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 mb-4 leading-relaxed">
                  {tip.description}
                </CardDescription>
                <Button className="btn-brand-pink w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-[#FF389A]/20 to-[#FF389A]/10 rounded-lg border border-[#FF389A]/30">
            <div className="text-2xl font-bold text-white">{selectedFeature.tips.length}</div>
            <div className="text-sm text-gray-300">Quick Tips</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-[#FF389A]/20 to-[#FF389A]/10 rounded-lg border border-[#FF389A]/30">
            <div className="text-2xl font-bold text-white">
              {selectedFeature.tips.filter(tip => tip.difficulty === 'Easy').length}
            </div>
            <div className="text-sm text-gray-300">Easy Wins</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-[#FF389A]/20 to-[#FF389A]/10 rounded-lg border border-[#FF389A]/30">
            <div className="text-2xl font-bold text-white">
              ~{Math.round(selectedFeature.tips.reduce((acc, tip) => 
                acc + parseInt(tip.timeToImplement.split(' ')[0]), 0) / selectedFeature.tips.length)}
            </div>
            <div className="text-sm text-gray-300">Avg Minutes</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-[#FF389A]/20 to-[#FF389A]/10 rounded-lg border border-[#FF389A]/30">
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-sm text-gray-300">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}