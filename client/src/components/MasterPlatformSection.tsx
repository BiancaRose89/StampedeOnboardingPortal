import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription } from '@/components/ui/dialog';
import { 
  CreditCard, 
  Users, 
  BarChart3, 
  Settings, 
  MessageSquare, 
  Star,
  Gift,
  Wifi,
  Play,
  Clock,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface PlatformFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  estimatedTime: string;
  masterDescription: string;
  examples: string[];
  features: Array<{
    id: string;
    title: string;
    description: string;
    timeToImplement: string;
    difficulty: 'Easy' | 'Medium' | 'Advanced';
    category: string;
  }>;
}

interface PlatformModalProps {
  feature: PlatformFeature;
}

function PlatformModal({ feature }: PlatformModalProps) {
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
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0D0D24] to-black border-[#FF389A]/30">
      <DialogHeader className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30">
            {feature.icon}
          </div>
          <div>
            <DialogTitle className="text-2xl font-bold text-white">
              Master {feature.title}
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-lg">
              {feature.masterDescription}
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
            <div className="w-full h-64 flex items-center justify-center bg-gray-800">
              <div className="text-center space-y-2">
                <Play className="h-12 w-12 text-gray-400 mx-auto" />
                <p className="text-gray-400">Training video coming soon</p>
              </div>
            </div>
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
            {getPlatformCustomerExamples(feature.id).map((example, index) => (
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

        {/* What You'll Learn Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">What You'll Learn</h3>
          <div className="grid gap-3">
            {feature.examples.map((example, index) => (
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
            {feature.features.map((featureDetail, index) => (
              <div key={featureDetail.id} className="p-4 bg-[#0D0D24]/50 rounded-lg border border-gray-600/30">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-white">{featureDetail.title}</h4>
                  <Badge className={getDifficultyColor(featureDetail.difficulty)} variant="secondary">
                    {featureDetail.difficulty}
                  </Badge>
                </div>
                <p className="text-gray-300 text-sm mb-2">{featureDetail.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>{featureDetail.timeToImplement}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4 border-t border-[#FF389A]/20">
          <Button 
            variant="outline" 
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Close
          </Button>
          <Button className="bg-[#FF389A] hover:bg-[#E6329C] text-white">
            Start Learning
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

// Customer inspiration examples for platform features
const getPlatformCustomerExamples = (featureId: string) => {
  const examples = {
    'account': [
      {
        icon: '👥',
        type: 'Team Setup',
        title: 'Multi-Location Management',
        description: 'Configured role-based access for 15 staff members across 3 locations',
        business: 'Restaurant Chain',
        result: 'Streamlined operations'
      },
      {
        icon: '🏢',
        type: 'Business Profile',
        title: 'Complete Brand Setup',
        description: 'Professional business profile with hours, contact info, and social links',
        business: 'Local Cafe',
        result: 'Professional presence'
      }
    ],
    'marketing': [
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
      }
    ],
    'wifi': [
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
      }
    ],
    'loyalty': [
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
      }
    ],
    'reviews': [
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
      }
    ],
    'gift-cards': [
      {
        icon: '🎁',
        type: 'Digital Cards',
        title: 'Online Gift Card Sales',
        description: 'Digital gift cards with instant delivery',
        business: 'Spa',
        result: '+30% revenue'
      },
      {
        icon: '📱',
        type: 'Mobile Redemption',
        title: 'Easy Redemption Process',
        description: 'QR code scanning for quick gift card redemption',
        business: 'Restaurant',
        result: 'Seamless experience'
      }
    ]
  };
  
  return examples[featureId as keyof typeof examples] || [];
};

export default function MasterPlatformSection() {
  const platformFeatures: PlatformFeature[] = [
    {
      id: 'account',
      title: 'Account Management',
      description: 'Complete business profile configuration and team management system',
      icon: <Users className="h-8 w-8 text-white" />,
      progress: 100,
      status: 'completed',
      estimatedTime: '15 minutes',
      masterDescription: 'Master account setup and business profile management for a professional platform presence.',
      examples: [
        'Set up comprehensive business profiles with contact information',
        'Configure team member roles and access permissions',
        'Integrate business systems and existing tools',
        'Customize platform branding and appearance'
      ],
      features: [
        {
          id: 'business-profile',
          title: 'Business Profile Setup',
          description: 'Create comprehensive business profiles with contact info, hours, and branding',
          timeToImplement: '15 mins',
          difficulty: 'Easy',
          category: 'Configuration'
        },
        {
          id: 'team-management',
          title: 'Team Member Access',
          description: 'Add team members and configure role-based permissions for platform access',
          timeToImplement: '10 mins',
          difficulty: 'Easy',
          category: 'User Management'
        },
        {
          id: 'integrations',
          title: 'System Integrations',
          description: 'Connect existing business tools and systems for seamless data flow',
          timeToImplement: '25 mins',
          difficulty: 'Medium',
          category: 'Integration'
        }
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing',
      description: 'Launch automated marketing campaigns and customer communications',
      icon: <BarChart3 className="h-8 w-8 text-white" />,
      progress: 0,
      status: 'not-started',
      estimatedTime: '25 minutes',
      masterDescription: 'Build automated marketing campaigns that drive customer engagement and increase revenue through targeted communications.',
      examples: [
        'Set up welcome email sequences for new customers',
        'Create birthday and anniversary campaigns with special offers',
        'Build win-back campaigns for inactive customers',
        'Design targeted promotions based on customer behavior'
      ],
      features: [
        {
          id: 'email-automations',
          title: 'Email Automations',
          description: 'Set up welcome sequences, birthday campaigns, and win-back series to engage customers automatically',
          timeToImplement: '15 mins',
          difficulty: 'Easy',
          category: 'Email Marketing'
        },
        {
          id: 'lead-forms',
          title: 'Create Lead Forms',
          description: 'Build high-converting forms for newsletters, events, and special promotions with custom fields',
          timeToImplement: '10 mins',
          difficulty: 'Easy',
          category: 'Lead Generation'
        },
        {
          id: 'customer-segmentation',
          title: 'Customer Segmentation',
          description: 'Group customers by behavior, preferences, or demographics for targeted campaigns',
          timeToImplement: '20 mins',
          difficulty: 'Medium',
          category: 'Targeting'
        }
      ]
    },
    {
      id: 'wifi',
      title: 'WiFi',
      description: 'Configure guest WiFi portal for customer data capture',
      icon: <Wifi className="h-8 w-8 text-white" />,
      progress: 40,
      status: 'in-progress',
      estimatedTime: '20 minutes',
      masterDescription: 'Create a branded WiFi experience that captures valuable customer data while providing seamless internet access.',
      examples: [
        'Design custom WiFi splash pages with your branding',
        'Set up social media login options for easy access',
        'Configure data collection forms and surveys',
        'Enable location-based marketing and analytics'
      ],
      features: [
        {
          id: 'guest-portal',
          title: 'Branded Guest Portal',
          description: 'Custom WiFi landing page with your branding and data collection forms',
          timeToImplement: '25 mins',
          difficulty: 'Easy',
          category: 'Customer Experience'
        },
        {
          id: 'social-login',
          title: 'Social Media Login',
          description: 'Allow customers to access WiFi using Facebook, Google, or other social accounts',
          timeToImplement: '15 mins',
          difficulty: 'Medium',
          category: 'Authentication'
        },
        {
          id: 'analytics',
          title: 'WiFi Analytics',
          description: 'Track usage patterns, customer behavior, and engagement metrics',
          timeToImplement: '10 mins',
          difficulty: 'Easy',
          category: 'Analytics'
        }
      ]
    },
    {
      id: 'loyalty',
      title: 'Loyalty',
      description: 'Implement loyalty programs to increase customer retention',
      icon: <Star className="h-8 w-8 text-white" />,
      progress: 0,
      status: 'not-started',
      estimatedTime: '15 minutes',
      masterDescription: 'Create engaging loyalty programs that reward customers and encourage repeat business through points, tiers, and special perks.',
      examples: [
        'Set up points-based reward systems for purchases and visits',
        'Create VIP membership tiers with exclusive benefits',
        'Design referral programs to grow your customer base',
        'Configure automatic reward redemption and notifications'
      ],
      features: [
        {
          id: 'points-system',
          title: 'Points & Rewards',
          description: 'Create flexible points systems with customizable earning and redemption rules',
          timeToImplement: '20 mins',
          difficulty: 'Easy',
          category: 'Loyalty Program'
        },
        {
          id: 'vip-tiers',
          title: 'VIP Membership Tiers',
          description: 'Set up tiered loyalty programs with escalating benefits for top customers',
          timeToImplement: '15 mins',
          difficulty: 'Medium',
          category: 'Customer Retention'
        },
        {
          id: 'referral-program',
          title: 'Referral Rewards',
          description: 'Encourage customer referrals with automatic reward distribution',
          timeToImplement: '10 mins',
          difficulty: 'Easy',
          category: 'Growth'
        }
      ]
    },
    {
      id: 'reviews',
      title: 'Reviews',
      description: 'Manage customer reviews and feedback collection',
      icon: <MessageSquare className="h-8 w-8 text-white" />,
      progress: 0,
      status: 'not-started',
      estimatedTime: '10 minutes',
      masterDescription: 'Automate review collection and management to build your online reputation and gather valuable customer feedback.',
      examples: [
        'Set up automated review requests after customer visits',
        'Create response templates for positive and negative reviews',
        'Monitor reviews across multiple platforms from one dashboard',
        'Use feedback to improve your products and services'
      ],
      features: [
        {
          id: 'review-requests',
          title: 'Automated Review Requests',
          description: 'Send timed review invitations via email and SMS after customer interactions',
          timeToImplement: '15 mins',
          difficulty: 'Easy',
          category: 'Reputation Management'
        },
        {
          id: 'response-management',
          title: 'Review Response Tools',
          description: 'Manage and respond to reviews with templates and automated notifications',
          timeToImplement: '10 mins',
          difficulty: 'Easy',
          category: 'Customer Service'
        },
        {
          id: 'multi-platform',
          title: 'Multi-Platform Monitoring',
          description: 'Monitor reviews from Google, Facebook, Yelp, and other platforms in one place',
          timeToImplement: '5 mins',
          difficulty: 'Easy',
          category: 'Monitoring'
        }
      ]
    },
    {
      id: 'gift-cards',
      title: 'Gift Cards',
      description: 'Set up digital gift card sales and management system',
      icon: <Gift className="h-8 w-8 text-white" />,
      progress: 0,
      status: 'not-started',
      estimatedTime: '12 minutes',
      masterDescription: 'Launch a digital gift card program that drives sales and introduces new customers to your business.',
      examples: [
        'Create digital gift cards with instant delivery via email',
        'Set up gift card purchase forms on your website',
        'Configure automated gift card delivery and redemption',
        'Track gift card sales and usage analytics'
      ],
      features: [
        {
          id: 'digital-cards',
          title: 'Digital Gift Cards',
          description: 'Create and sell digital gift cards with customizable designs and instant delivery',
          timeToImplement: '20 mins',
          difficulty: 'Medium',
          category: 'E-commerce'
        },
        {
          id: 'redemption-system',
          title: 'Easy Redemption',
          description: 'Simple QR code or PIN-based redemption system for staff and customers',
          timeToImplement: '10 mins',
          difficulty: 'Easy',
          category: 'Point of Sale'
        },
        {
          id: 'sales-tracking',
          title: 'Sales Analytics',
          description: 'Track gift card sales performance, redemption rates, and customer behavior',
          timeToImplement: '5 mins',
          difficulty: 'Easy',
          category: 'Analytics'
        }
      ]
    }
  ];

  const getStatusColor = (status: PlatformFeature['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'in-progress':
        return 'text-[#FF389A]';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: PlatformFeature['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-[#FF389A]" />;
      default:
        return <ArrowRight className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Master Your Platform
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Now that you have run through the setup and features, let's master the platform
          </p>
        </div>

        {/* Account Management - Full Width Row */}
        <div className="mb-8">
          {platformFeatures.filter(feature => feature.id === 'account').map((feature) => (
            <Dialog key={feature.id}>
              <DialogTrigger asChild>
                <Card className="bg-gradient-to-br from-[#0D0D24] to-black border-[#FF389A]/30 hover:border-[#FF389A]/50 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 group-hover:scale-110 transition-transform duration-300">
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                          <p className="text-gray-300 text-lg mb-4">{feature.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {feature.estimatedTime}
                            </span>
                            <span className="capitalize">{feature.status.replace('-', ' ')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm text-gray-400 mb-1">Progress</div>
                          <div className={`text-2xl font-bold ${getStatusColor(feature.status)}`}>{feature.progress}%</div>
                          <Progress 
                            value={feature.progress} 
                            className="h-3 w-32 mt-2"
                            style={{
                              background: 'rgba(255, 255, 255, 0.1)',
                            } as React.CSSProperties}
                          />
                        </div>
                        {getStatusIcon(feature.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              
              <PlatformModal feature={feature} />
            </Dialog>
          ))}
        </div>

        {/* Other Platform Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformFeatures.filter(feature => feature.id !== 'account').map((feature) => (
            <Dialog key={feature.id}>
              <DialogTrigger asChild>
                <Card className="bg-gradient-to-br from-[#0D0D24] to-black border-[#FF389A]/30 hover:border-[#FF389A]/50 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      {getStatusIcon(feature.status)}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{feature.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className={getStatusColor(feature.status)}>{feature.progress}%</span>
                      </div>
                      <Progress 
                        value={feature.progress} 
                        className="h-2"
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                        } as React.CSSProperties}
                      />
                      
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {feature.estimatedTime}
                        </span>
                        <span className="capitalize">{feature.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              
              <PlatformModal feature={feature} />
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}