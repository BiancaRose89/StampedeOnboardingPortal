import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User,
  Calendar,
  Settings,
  BookOpen,
  CheckCircle,
  Clock,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  number: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  duration?: string;
  image: string;
  detailedContent: {
    subtitle?: string;
    stampedeActions: string[];
    userActions: string[];
    additionalInfo?: string[];
  };
}

interface OnboardingJourneyPreviewProps {
  className?: string;
}

export default function OnboardingJourneyPreview({ className }: OnboardingJourneyPreviewProps) {
  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'account-setup',
      number: 1,
      title: 'Account Setup',
      icon: <User className="h-6 w-6" />,
      description: 'We set up your branded platform behind the scenes',
      image: 'https://h.stampede.ai/hs-fs/hubfs/booking%20lp%20dark-1.png?width=1440&height=1440&name=booking%20lp%20dark-1.png',
      detailedContent: {
        subtitle: 'Your dedicated Customer Success Manager handles the technical setup while you focus on your business.',
        stampedeActions: [
          'Create your branded platform with custom colors and logo',
          'Configure your account settings and permissions',
          'Set up your venue profiles and basic information',
          'Prepare your dashboard with essential widgets',
          'Configure security settings and access controls'
        ],
        userActions: [
          'Provide your branding assets (logo, colors, etc.)',
          'Share basic venue information and contact details',
          'Review and approve the initial setup',
          'Prepare any specific requirements or preferences'
        ],
        additionalInfo: [
          'This step typically takes 24-48 hours to complete',
          'You\'ll receive email updates on progress',
          'No technical knowledge required on your part'
        ]
      }
    },
    {
      id: 'kickoff-call',
      number: 2,
      title: 'Kick-Off Call',
      icon: <Calendar className="h-6 w-6" />,
      description: 'Meet your Customer Success Manager and plan your journey',
      duration: '20 mins',
      image: 'https://h.stampede.ai/hs-fs/hubfs/WiFi%20lp%20dark.png?width=1440&height=1440&name=WiFi%20lp%20dark.png',
      detailedContent: {
        subtitle: 'A personal introduction to establish your goals and create a customized implementation plan.',
        stampedeActions: [
          'Introduction to your dedicated Customer Success Manager',
          'Review your business goals and objectives',
          'Explain the Stampede platform capabilities',
          'Create a personalized timeline for your implementation',
          'Schedule upcoming calls and milestones'
        ],
        userActions: [
          'Share your business goals and current challenges',
          'Discuss your customer demographics and venue type',
          'Outline your team structure and technical capabilities',
          'Ask questions about the platform features',
          'Confirm availability for upcoming training sessions'
        ],
        additionalInfo: [
          'This call sets the foundation for your entire onboarding experience',
          'Bring any specific questions or concerns you have',
          'We\'ll record action items and next steps'
        ]
      }
    },
    {
      id: 'configuration-call',
      number: 3,
      title: 'Configuration Call',
      icon: <Settings className="h-6 w-6" />,
      description: 'Tailor your system to your venue\'s specific needs',
      duration: '45 mins',
      image: 'https://h.stampede.ai/hs-fs/hubfs/admin%20lp%20dark.png?width=1440&height=1440&name=admin%20lp%20dark.png',
      detailedContent: {
        subtitle: 'Deep-dive configuration session to customize every aspect of your platform for optimal performance.',
        stampedeActions: [
          'Configure WiFi portal with your branding and messaging',
          'Set up booking system with your availability and pricing',
          'Customize marketing campaigns and customer journeys',
          'Configure loyalty program rules and rewards',
          'Set up reporting dashboards and key metrics',
          'Integrate with your existing systems (POS, email, etc.)'
        ],
        userActions: [
          'Provide detailed business rules and preferences',
          'Share existing customer data for import (if applicable)',
          'Define your marketing goals and target audiences',
          'Specify reward structures for loyalty program',
          'Test configurations and provide feedback',
          'Approve final settings before going live'
        ],
        additionalInfo: [
          'This is the most technical part of the setup process',
          'We handle all the complex configuration work',
          'You\'ll see your platform come to life during this call',
          'Multiple revisions are included until you\'re satisfied'
        ]
      }
    },
    {
      id: 'feature-training',
      number: 4,
      title: 'Feature Training',
      icon: <BookOpen className="h-6 w-6" />,
      description: 'Focused training sessions to master your platform',
      image: 'https://h.stampede.ai/hs-fs/hubfs/Wifi%20training%20dark.png?width=1440&height=1440&name=Wifi%20training%20dark.png',
      detailedContent: {
        subtitle: 'Comprehensive training to ensure you and your team are confident using every feature.',
        stampedeActions: [
          'Provide detailed walkthroughs of each platform feature',
          'Demonstrate best practices and pro tips',
          'Share real-world examples from similar venues',
          'Provide training materials and quick reference guides',
          'Record training sessions for future reference',
          'Offer ongoing support and additional training as needed'
        ],
        userActions: [
          'Attend all scheduled training sessions',
          'Practice using the platform during training',
          'Ask questions and request clarification',
          'Train additional team members',
          'Test real scenarios with sample data',
          'Provide feedback on user experience'
        ],
        additionalInfo: [
          'Training is tailored to your specific use cases',
          'We can provide separate sessions for different team roles',
          'All training materials are yours to keep',
          'Unlimited follow-up questions during this phase'
        ]
      }
    },
    {
      id: 'go-live-handover',
      number: 5,
      title: 'Go-Live & Handover',
      icon: <CheckCircle className="h-6 w-6" />,
      description: 'Launch your system and complete the handover process',
      image: 'https://h.stampede.ai/hs-fs/hubfs/admin%20lp%20dark.png?width=1440&height=1440&name=admin%20lp%20dark.png',
      detailedContent: {
        subtitle: 'The exciting moment when your platform goes live and you take full control of your customer experience.',
        stampedeActions: [
          'Perform final system checks and testing',
          'Activate all platform features for live use',
          'Monitor initial performance and resolve any issues',
          'Provide immediate support during launch period',
          'Transfer full admin access to your team',
          'Schedule regular check-ins for ongoing success'
        ],
        userActions: [
          'Announce the launch to your customers',
          'Start promoting your new digital features',
          'Monitor customer feedback and engagement',
          'Use the platform for real customer interactions',
          'Report any issues or questions immediately',
          'Begin building your customer database'
        ],
        additionalInfo: [
          'We stay closely involved for the first week after launch',
          'Emergency support is available during business hours',
          'Regular health checks ensure optimal performance',
          'Success metrics tracking begins immediately'
        ]
      }
    }
  ];

  return (
    <div className={className}>
      {/* Main Onboarding Journey */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Your Onboarding Journey
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
          Your all-in-one hospitality partner helping you manage guest WiFi, bookings, marketing, loyalty, reviews and more. This onboarding guide is built to help you launch successfully and with confidence, fully supported at each step.
        </p>
        
        {/* Platform Animation */}
        <div className="mb-8">
          <img 
            src="https://h.stampede.ai/hubfs/stampede%20phones.gif" 
            alt="Platform Preview"
            className="mx-auto max-w-md rounded-lg"
          />
        </div>
      </div>

      {/* Visual Roadmap - Vertical Flow */}
      <div className="max-w-6xl mx-auto mb-12">
        {onboardingSteps.map((step, index) => (
          <div key={step.id} className="relative">
            {/* Step Card with Detailed Content */}
            <div className="bg-black/40 border border-[#FF389A]/30 rounded-xl mb-6 hover:border-[#FF389A]/60 transition-all duration-300 overflow-hidden">
              {/* Header Section */}
              <div className="flex items-center gap-6 p-6">
                {/* Step Number Circle */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-[#FF389A] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {step.number}
                  </div>
                </div>
                
                {/* Step Header Content */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-[#FF389A]">
                      {step.icon}
                    </div>
                    <h3 className="font-bold text-white text-2xl">
                      {step.title}
                    </h3>
                    {step.duration && (
                      <Badge variant="outline" className="border-[#FF389A]/40 text-[#FF389A] text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        {step.duration}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed mb-3">
                    {step.description}
                  </p>
                  {step.detailedContent.subtitle && (
                    <p className="text-gray-400 text-base italic">
                      {step.detailedContent.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Detailed Content Section */}
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Image */}
                  <div className="order-2 lg:order-1">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full rounded-lg border border-[#FF389A]/20"
                    />
                  </div>
                  
                  {/* Content Details */}
                  <div className="space-y-6 order-1 lg:order-2">
                    {/* What Stampede Does */}
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#FF389A]" />
                        What We Handle:
                      </h4>
                      <ul className="space-y-2">
                        {step.detailedContent.stampedeActions.map((action, actionIndex) => (
                          <li key={actionIndex} className="text-gray-300 text-sm flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-[#FF389A] rounded-full mt-2 flex-shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* What You Need to Do */}
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <User className="h-4 w-4 text-[#FF389A]" />
                        What You'll Do:
                      </h4>
                      <ul className="space-y-2">
                        {step.detailedContent.userActions.map((action, actionIndex) => (
                          <li key={actionIndex} className="text-gray-300 text-sm flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-[#FF389A] rounded-full mt-2 flex-shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Additional Info */}
                    {step.detailedContent.additionalInfo && (
                      <div className="bg-[#FF389A]/10 border border-[#FF389A]/20 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-2">Key Information:</h4>
                        {step.detailedContent.additionalInfo.map((info, infoIndex) => (
                          <p key={infoIndex} className="text-gray-300 text-sm mb-2 last:mb-0">{info}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Connecting Arrow */}
            {index < onboardingSteps.length - 1 && (
              <div className="flex justify-center mb-6">
                <ArrowRight className="h-8 w-8 text-[#FF389A] rotate-90" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Support Link */}
      <div className="text-center">
        <p className="text-gray-300 mb-4">
          Need help or want to dive deeper? 
        </p>
        <Button 
          variant="outline" 
          className="border-[#FF389A]/30 text-[#FF389A] hover:bg-[#FF389A]/10"
          onClick={() => window.open('https://help.stampede.ai/hc/en-gb', '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Check out our Knowledge Base
        </Button>
      </div>
    </div>
  );
}