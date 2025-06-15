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
  ExternalLink,
  Rocket
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
      id: 'platform-setup',
      number: 1,
      title: 'Platform Setup & Configuration',
      icon: <User className="h-6 w-6" />,
      description: 'We build your branded platform while you prepare for launch',
      image: 'https://h.stampede.ai/hs-fs/hubfs/booking%20lp%20dark-1.png?width=1440&height=1440&name=booking%20lp%20dark-1.png',
      detailedContent: {
        subtitle: 'Your Customer Success Manager configures everything behind the scenes - no technical work required from you.',
        stampedeActions: [
          'Build your fully branded platform with custom colors and logo',
          'Configure all purchased features and integrations',
          'Set up user accounts and permissions for your team',
          'Prepare your dashboard with relevant widgets and analytics',
          'Test all systems to ensure everything works perfectly'
        ],
        userActions: [
          'Provide branding assets (logo, color preferences, imagery)',
          'Share venue details and operational preferences',
          'Prepare team member information for account access',
          'Gather any existing customer data for import'
        ],
        additionalInfo: [
          'Completed within 24-48 hours of receiving your assets',
          'You\'ll receive progress updates via email',
          'Platform ready for training by step 2'
        ]
      }
    },
    {
      id: 'welcome-orientation',
      number: 2,
      title: 'Welcome & Platform Orientation',
      icon: <Calendar className="h-6 w-6" />,
      description: 'Meet your team and get your first look at your branded platform',
      duration: '30 mins',
      image: 'https://h.stampede.ai/hs-fs/hubfs/WiFi%20lp%20dark.png?width=1440&height=1440&name=WiFi%20lp%20dark.png',
      detailedContent: {
        subtitle: 'Quick platform tour and strategic scheduling of your modular feature training sessions.',
        stampedeActions: [
          'Introduce your dedicated Customer Success Manager',
          'Tour your fully branded platform and dashboard',
          'Review all purchased features and capabilities',
          'Schedule personalized 1-hour training sessions for each feature',
          'Set up communication channels and support access'
        ],
        userActions: [
          'Attend with key team members who will use the platform',
          'Ask questions about your specific features and setup',
          'Choose convenient times for upcoming training sessions',
          'Confirm your target go-live date',
          'Provide any additional requirements or preferences'
        ],
        additionalInfo: [
          'Scheduled within 24 hours of platform setup completion',
          'All feature training sessions booked during this call',
          'Recording provided for team members who cannot attend'
        ]
      }
    },
    {
      id: 'feature-training',
      number: 3,
      title: 'Feature Training Sessions',
      icon: <BookOpen className="h-6 w-6" />,
      description: 'Master each feature you\'ve purchased with dedicated 1-hour training sessions',
      duration: '1 hour per feature',
      image: 'https://h.stampede.ai/hs-fs/hubfs/admin%20lp%20dark.png?width=1440&height=1440&name=admin%20lp%20dark.png',
      detailedContent: {
        subtitle: 'Master each feature you\'ve purchased with dedicated 1-hour training sessions focused on your specific needs.',
        stampedeActions: [
          'Deliver hands-on training for each purchased feature',
          'Configure settings based on your business requirements',
          'Provide templates, scripts, and ready-to-use content',
          'Share best practices from successful venues',
          'Record all sessions for team reference',
          'Offer follow-up support for complex features'
        ],
        userActions: [
          'Attend training sessions for features relevant to your role',
          'Practice using features during hands-on portions',
          'Ask venue-specific questions and scenarios',
          'Take notes and save provided templates',
          'Schedule follow-up sessions if needed'
        ],
        additionalInfo: [
          'Only train on features you\'ve purchased - no wasted time',
          'Each session is recorded for absent team members',
          'Training can be split across multiple days to fit your schedule'
        ]
      }
    },
    {
      id: 'testing-preparation',
      number: 4,
      title: 'Testing & Go-Live Preparation',
      icon: <CheckCircle className="h-6 w-6" />,
      description: 'Test your platform and prepare for a smooth launch',
      duration: '30 mins',
      image: 'https://h.stampede.ai/hs-fs/hubfs/Wifi%20training%20dark.png?width=1440&height=1440&name=Wifi%20training%20dark.png',
      detailedContent: {
        subtitle: 'Final testing and preparation to ensure everything works perfectly before you go live.',
        stampedeActions: [
          'Conduct comprehensive platform testing with your team',
          'Review all feature configurations and settings',
          'Test customer journeys from start to finish',
          'Provide go-live checklist and support materials',
          'Schedule go-live support and monitoring',
          'Confirm backup and support procedures'
        ],
        userActions: [
          'Test all features with real-world scenarios',
          'Train any remaining team members',
          'Confirm your go-live date and timing',
          'Prepare customer communications about new features',
          'Review all settings and make final adjustments',
          'Ask any last-minute questions'
        ],
        additionalInfo: [
          'Final opportunity to make changes before launch',
          'We provide dedicated support during your first week live',
          'Testing can be done at your own pace'
        ]
      }
    },
    {
      id: 'go-live-success',
      number: 5,
      title: 'Go-Live & Ongoing Success',
      icon: <Rocket className="h-6 w-6" />,
      description: 'Launch your platform and transition to ongoing support',
      duration: 'Launch day',
      image: 'https://h.stampede.ai/hs-fs/hubfs/admin%20lp%20dark.png?width=1440&height=1440&name=admin%20lp%20dark.png',
      detailedContent: {
        subtitle: 'Launch day support and seamless transition to your ongoing Customer Success Manager relationship.',
        stampedeActions: [
          'Provide dedicated launch day support and monitoring',
          'Activate all platform features for live customer use',
          'Monitor performance and resolve any launch issues',
          'Transfer full platform ownership to your team',
          'Schedule ongoing check-ins and success reviews',
          'Provide access to knowledge base and support resources'
        ],
        userActions: [
          'Confirm your go-live date and launch timing',
          'Announce new features to your customers',
          'Start engaging customers with your new platform',
          'Monitor customer response and platform performance',
          'Schedule regular success check-ins with your CSM',
          'Take ownership of day-to-day platform management'
        ],
        additionalInfo: [
          'Dedicated support available on launch day',
          'Ongoing Customer Success Manager relationship continues',
          'Additional training available whenever you need it'
        ]
      }
    }
  ];

  return (
    <div className={className}>
      {/* Main Onboarding Journey */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Your Journey to Hospitality Success Starts Here
        </h2>
        <p className="text-2xl text-gray-200 font-medium max-w-3xl mx-auto mb-8 leading-relaxed">
          Welcome to Stampede! In just 5 focused steps, you'll unlock the full power of your all-in-one hospitality platform. Our streamlined onboarding gets you live faster, with dedicated training for each feature you've purchased and expert support every step of the way.
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
                  <p className="text-gray-200 text-xl font-medium leading-relaxed mb-3">
                    {step.description}
                  </p>
                  {step.detailedContent.subtitle && (
                    <p className="text-gray-300 text-lg font-medium italic">
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
                          <li key={actionIndex} className="text-gray-200 text-base font-medium flex items-start gap-2">
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
                          <li key={actionIndex} className="text-gray-200 text-base font-medium flex items-start gap-2">
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
                          <p key={infoIndex} className="text-gray-200 text-base font-medium mb-2 last:mb-0">{info}</p>
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
        <p className="text-lg text-gray-200 font-medium mb-4">
          Need help or want to dive deeper? 
        </p>
        <Button 
          variant="outline" 
          className="border-[#FF389A]/50 text-[#FF389A] hover:bg-[#FF389A]/10 text-base font-semibold"
          onClick={() => window.open('https://help.stampede.ai/hc/en-gb', '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Check out our Knowledge Base
        </Button>
      </div>
    </div>
  );
}