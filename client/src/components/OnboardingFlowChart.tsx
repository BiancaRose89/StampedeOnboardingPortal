import { Users, Wifi, Target, Star, MessageSquare, Gift, Calendar, Rocket, ArrowRight, BarChart3, Heart } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

interface FlowStep {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  stepNumber: number;
}

export default function OnboardingFlowChart() {
  const { firebaseUser } = useAuth();
  const isLoggedIn = !!firebaseUser;

  const flowSteps: FlowStep[] = [
    {
      id: 'account-setup',
      title: 'Account Setup',
      icon: <Users className="h-6 w-6 text-white" />,
      description: 'Complete your basic account configuration',
      stepNumber: 1
    },
    {
      id: 'marketing',
      title: 'Marketing',
      icon: <Target className="h-6 w-6 text-white" />,
      description: 'Build powerful marketing campaigns',
      stepNumber: 2
    },
    {
      id: 'wifi-setup',
      title: 'Wi-Fi',
      icon: <Wifi className="h-6 w-6 text-white" />,
      description: 'Configure guest WiFi with marketing capture',
      stepNumber: 3
    },
    {
      id: 'booking',
      title: 'Booking',
      icon: <Calendar className="h-6 w-6 text-white" />,
      description: 'Set up booking and appointment management',
      stepNumber: 4
    },
    {
      id: 'reviews',
      title: 'Reviews',
      icon: <Star className="h-6 w-6 text-white" />,
      description: 'Set up review management systems',
      stepNumber: 5
    },
    {
      id: 'loyalty',
      title: 'Loyalty',
      icon: <Heart className="h-6 w-6 text-white" />,
      description: 'Create customer loyalty programs',
      stepNumber: 6
    },
    {
      id: 'gift-cards',
      title: 'Gift Cards',
      icon: <Gift className="h-6 w-6 text-white" />,
      description: 'Launch digital gift card sales',
      stepNumber: 7
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: <BarChart3 className="h-6 w-6 text-white" />,
      description: 'Track performance and customer insights',
      stepNumber: 8
    },
    {
      id: 'launch',
      title: 'Launch',
      icon: <Rocket className="h-6 w-6 text-white" />,
      description: 'Go live with your fully configured platform',
      stepNumber: 9
    }
  ];

  return (
    <div className="space-y-8 mb-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white">Your Onboarding Journey</h2>
{!isLoggedIn ? (
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Follow these 9 essential steps to get your platform ready for customers:
          </p>
        ) : (
          <div className="space-y-3">
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Welcome to your onboarding journey.
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Let's run through what to expect and get you set up for success.
            </p>
          </div>
        )}
      </div>

      {/* Desktop Flow Chart */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {flowSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* Step Icon */}
              <div className="flex flex-col items-center space-y-3">
{!isLoggedIn ? (
                  <div className="relative">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-[#FF389A]/20">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF389A] rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {step.stepNumber}
                    </div>
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-[#FF389A] rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {step.stepNumber}
                  </div>
                )}
                <div className="text-center max-w-[120px]">
                  <h3 className="font-bold text-white text-sm">{step.title}</h3>
                </div>
              </div>

              {/* Arrow (except for last item) */}
              {index < flowSteps.length - 1 && (
                <div className="flex-1 flex items-center justify-center mx-4">
                  <ArrowRight className="h-5 w-5 text-[#FF389A]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Flow Chart */}
      <div className="lg:hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {flowSteps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center space-y-3 relative">
              {/* Step Icon */}
              {!isLoggedIn ? (
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-[#FF389A]/20">
                    {step.icon}
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF389A] rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {step.stepNumber}
                  </div>
                </div>
              ) : (
                <div className="w-7 h-7 bg-[#FF389A] rounded-full flex items-center justify-center text-sm font-bold text-white">
                  {step.stepNumber}
                </div>
              )}
              
              {/* Step Info */}
              <div className="text-center">
                <h3 className="font-bold text-white text-sm">{step.title}</h3>
              </div>

              {/* Connection line for mobile */}
              {index < flowSteps.length - 1 && index % 2 === 0 && index < flowSteps.length - 2 && (
                <div className="absolute top-7 left-full w-6 h-0.5 bg-[#FF389A]/50 hidden md:block"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Video Placeholder Section */}
      <div className="mt-16 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#FF389A]/20">
            <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-black to-gray-900 relative group cursor-pointer hover:from-gray-900 hover:to-black transition-all duration-300">
              {/* Play Button */}
              <div className="w-20 h-20 rounded-full bg-[#FF389A] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              
              {/* Video overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              {/* Video title overlay */}
              <div className="absolute bottom-6 left-6 text-left">
                <h4 className="text-xl font-bold text-white mb-2">Your Complete Onboarding Guide</h4>
                <p className="text-gray-300 text-sm">Duration: 9 minutes</p>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-[#FF389A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          
          <p className="text-gray-400 text-sm mt-4">Click to start your onboarding journey overview</p>
        </div>
      </div>

    </div>
  );
}