import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Users, Wifi, Target, MessageSquare, Star, Gift, Calendar, ArrowRight, Play, Clock, CheckCircle } from "lucide-react";

interface OnboardingBlock {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  videoUrl?: string;
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
  steps: Array<{
    id: string;
    title: string;
    description: string;
    videoUrl?: string;
    articles: Array<{
      title: string;
      url: string;
      type: 'guide' | 'tutorial' | 'reference' | 'template';
    }>;
  }>;
}

interface OnboardingModalProps {
  block: OnboardingBlock;
  currentStep: number;
  onStepChange: (step: number) => void;
}

function OnboardingModal({ block, currentStep, onStepChange }: OnboardingModalProps) {
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
            {block.icon}
          </div>
          <div>
            <DialogTitle className="text-2xl font-bold text-white">
              Master {block.title}
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-lg">
              {block.masterDescription}
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
            {block.videoUrl ? (
              <video 
                className="w-full h-64 object-cover"
                controls
              >
                <source src={block.videoUrl} type="video/mp4" />
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
            {getOnboardingCustomerExamples(block.id).map((example, index) => (
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
            {block.examples.map((example, index) => (
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
            {block.features.map((feature, index) => (
              <div key={feature.id} className="p-4 bg-[#0D0D24]/50 rounded-lg border border-gray-600/30">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-white">{feature.title}</h4>
                  <Badge className={getDifficultyColor(feature.difficulty)} variant="secondary">
                    {feature.difficulty}
                  </Badge>
                </div>
                <p className="text-gray-300 text-sm mb-2">{feature.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>{feature.timeToImplement}</span>
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

// Customer inspiration examples for onboarding features
const getOnboardingCustomerExamples = (blockId: string) => {
  const examples = {
    'account-setup': [
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
    'bookings': [
      {
        icon: '📅',
        type: 'Online Booking',
        title: 'Table Reservations',
        description: '24/7 online booking system with real-time availability',
        business: 'Fine Dining',
        result: '60% online bookings'
      },
      {
        icon: '✅',
        type: 'Confirmations',
        title: 'Automated Reminders',
        description: 'SMS and email confirmations with reminder sequences',
        business: 'Dental Practice',
        result: '5% no-shows'
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
    ],
    'launch': [
      {
        icon: '🚀',
        type: 'Go Live',
        title: 'Platform Launch',
        description: 'Complete platform activation with all features enabled',
        business: 'New Business',
        result: 'Successful launch'
      },
      {
        icon: '📊',
        type: 'Analytics',
        title: 'Performance Tracking',
        description: 'Real-time monitoring of platform performance and customer engagement',
        business: 'Growing Business',
        result: 'Data-driven insights'
      }
    ]
  };
  
  return examples[blockId as keyof typeof examples] || [];
};

export default function OnboardingProgressSection() {
  const [currentModalStep, setCurrentModalStep] = useState(0);

  const onboardingBlocks: OnboardingBlock[] = [
    {
      id: 'account-setup',
      title: 'Account Setup',
      description: 'Complete your basic account configuration and business profile setup',
      icon: <Users className="h-8 w-8 text-white" />,
      progress: 85,
      status: 'in-progress',
      estimatedTime: '10 minutes',
      difficulty: 'Beginner',
      videoUrl: '/videos/account-setup.mp4',
      masterDescription: 'Complete account setup and business profile configuration for a professional platform presence.',
      examples: [
        'Set up your business profile with complete contact information',
        'Configure team member roles and access permissions',
        'Integrate your business systems and existing tools',
        'Customize your platform branding and appearance'
      ],
      features: [
        {
          id: 'business-profile',
          title: 'Business Profile Setup',
          description: 'Create a comprehensive business profile with contact info, hours, and branding',
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
      ],
      steps: [
        {
          id: 'business-profile',
          title: 'Business Profile',
          description: 'Set up your business information and contact details',
          articles: [
            { title: 'Profile Setup Guide', url: '#', type: 'guide' }
          ]
        }
      ]
    },
    {
      id: 'bookings',
      title: 'Bookings',
      description: 'Set up online booking system for appointments and reservations',
      icon: <Calendar className="h-8 w-8 text-white" />,
      progress: 0,
      status: 'not-started',
      estimatedTime: '15 minutes',
      difficulty: 'Beginner',
      videoUrl: '/videos/bookings-setup.mp4',
      masterDescription: 'Implement a comprehensive online booking system that streamlines appointment scheduling and reduces no-shows.',
      examples: [
        'Set up online booking forms for your services',
        'Configure automated booking confirmations and reminders',
        'Manage availability calendars and booking slots',
        'Integrate payment processing for booking deposits'
      ],
      features: [
        {
          id: 'online-booking',
          title: 'Online Booking Forms',
          description: 'Create custom booking forms for different services with availability management',
          timeToImplement: '20 mins',
          difficulty: 'Easy',
          category: 'Customer Experience'
        },
        {
          id: 'confirmations',
          title: 'Automated Confirmations',
          description: 'Set up automatic email and SMS confirmations with reminder sequences',
          timeToImplement: '15 mins',
          difficulty: 'Easy',
          category: 'Communication'
        },
        {
          id: 'calendar-sync',
          title: 'Calendar Integration',
          description: 'Sync with Google Calendar, Outlook, or other calendar systems',
          timeToImplement: '10 mins',
          difficulty: 'Medium',
          category: 'Integration'
        }
      ],
      steps: [
        {
          id: 'booking-setup',
          title: 'Booking Setup',
          description: 'Configure booking forms and availability',
          articles: [
            { title: 'Booking System Guide', url: '#', type: 'guide' }
          ]
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
      difficulty: 'Beginner',
      videoUrl: '/videos/wifi-setup.mp4',
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
      ],
      steps: [
        {
          id: 'portal-setup',
          title: 'Portal Setup',
          description: 'Configure WiFi portal and branding',
          articles: [
            { title: 'WiFi Portal Guide', url: '#', type: 'guide' }
          ]
        }
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing',
      description: 'Launch automated marketing campaigns and customer communications',
      icon: <Target className="h-8 w-8 text-white" />,
      progress: 0,
      status: 'not-started',
      estimatedTime: '25 minutes',
      difficulty: 'Intermediate',
      videoUrl: '/videos/marketing-campaigns.mp4',
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
      ],
      steps: [
        {
          id: 'campaign-setup',
          title: 'Campaign Setup',
          description: 'Create and configure marketing campaigns',
          articles: [
            { title: 'Marketing Campaign Guide', url: '#', type: 'guide' }
          ]
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
      difficulty: 'Beginner',
      videoUrl: '/videos/loyalty-programs.mp4',
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
      ],
      steps: [
        {
          id: 'loyalty-setup',
          title: 'Loyalty Setup',
          description: 'Configure loyalty programs and rewards',
          articles: [
            { title: 'Loyalty Program Guide', url: '#', type: 'guide' }
          ]
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
      difficulty: 'Beginner',
      videoUrl: '/videos/review-management.mp4',
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
      ],
      steps: [
        {
          id: 'review-setup',
          title: 'Review Setup',
          description: 'Configure review collection and management',
          articles: [
            { title: 'Review Management Guide', url: '#', type: 'guide' }
          ]
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
      difficulty: 'Advanced',
      videoUrl: '/videos/gift-cards.mp4',
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
      ],
      steps: [
        {
          id: 'gift-card-setup',
          title: 'Gift Card Setup',
          description: 'Configure gift card products and sales',
          articles: [
            { title: 'Gift Card Setup Guide', url: '#', type: 'guide' }
          ]
        }
      ]
    }
  ];

  const completedTasks = onboardingBlocks.filter(block => block.status === 'completed').length;
  const totalTasks = onboardingBlocks.length;

  const getStatusColor = (status: OnboardingBlock['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'in-progress':
        return 'text-[#FF389A]';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: OnboardingBlock['status']) => {
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
            Your Onboarding Progress
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Complete these essential setup tasks to get the most out of your platform
          </p>
          <div className="inline-flex items-center gap-3 bg-[#0D0D24] px-6 py-3 rounded-full border border-[#FF389A]/30">
            <span className="text-2xl font-bold text-[#FF389A]">{completedTasks}/{totalTasks}</span>
            <span className="text-gray-300">Tasks Complete</span>
          </div>
        </div>

        {/* Account Setup - Full Width Row */}
        <div className="mb-8">
          {onboardingBlocks.filter(block => block.id === 'account-setup').map((block) => (
            <Dialog key={block.id}>
              <DialogTrigger asChild>
                <Card className="bg-gradient-to-br from-[#0D0D24] to-black border-[#FF389A]/30 hover:border-[#FF389A]/50 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 group-hover:scale-110 transition-transform duration-300">
                          {block.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">{block.title}</h3>
                          <p className="text-gray-300 text-lg mb-4">{block.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {block.estimatedTime}
                            </span>
                            <span className="capitalize">{block.status.replace('-', ' ')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm text-gray-400 mb-1">Progress</div>
                          <div className={`text-2xl font-bold ${getStatusColor(block.status)}`}>{block.progress}%</div>
                          <Progress 
                            value={block.progress} 
                            className="h-3 w-32 mt-2"
                            style={{
                              background: 'rgba(255, 255, 255, 0.1)',
                            } as React.CSSProperties}
                          />
                        </div>
                        {getStatusIcon(block.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              
              <OnboardingModal 
                block={block} 
                currentStep={currentModalStep} 
                onStepChange={setCurrentModalStep} 
              />
            </Dialog>
          ))}
        </div>

        {/* Other Onboarding Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {onboardingBlocks.filter(block => block.id !== 'account-setup').map((block) => (
            <Dialog key={block.id}>
              <DialogTrigger asChild>
                <Card className="bg-gradient-to-br from-[#0D0D24] to-black border-[#FF389A]/30 hover:border-[#FF389A]/50 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 group-hover:scale-110 transition-transform duration-300">
                        {block.icon}
                      </div>
                      {getStatusIcon(block.status)}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{block.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{block.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className={getStatusColor(block.status)}>{block.progress}%</span>
                      </div>
                      <Progress 
                        value={block.progress} 
                        className="h-2"
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                        } as React.CSSProperties}
                      />
                      
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {block.estimatedTime}
                        </span>
                        <span className="capitalize">{block.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              
              <OnboardingModal 
                block={block} 
                currentStep={currentModalStep} 
                onStepChange={setCurrentModalStep} 
              />
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}