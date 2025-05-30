import { useAuth } from '@/components/AuthProvider';
import { 
  User, 
  Target, 
  Wifi, 
  CalendarDays, 
  Star, 
  Gift, 
  BarChart3, 
  Rocket 
} from 'lucide-react';

export default function OnboardingFlowChart() {
  const { firebaseUser } = useAuth();
  const isLoggedIn = !!firebaseUser;

  const flowSteps = [
    {
      id: 'account-setup',
      title: 'Account Setup',
      icon: <User className="h-8 w-8 text-[#FF389A]" />,
      description: 'Set up your business profile and basic settings',
      stepNumber: 1
    },
    {
      id: 'marketing',
      title: 'Marketing',
      icon: <Target className="h-8 w-8 text-[#FF389A]" />,
      description: 'Configure your marketing campaigns and promotions',
      stepNumber: 2
    },
    {
      id: 'wifi',
      title: 'Wi-Fi',
      icon: <Wifi className="h-8 w-8 text-[#FF389A]" />,
      description: 'Set up customer Wi-Fi access and captive portal',
      stepNumber: 3
    },
    {
      id: 'booking',
      title: 'Booking',
      icon: <CalendarDays className="h-8 w-8 text-[#FF389A]" />,
      description: 'Configure appointment booking and scheduling',
      stepNumber: 4
    },
    {
      id: 'reviews',
      title: 'Reviews',
      icon: <Star className="h-8 w-8 text-[#FF389A]" />,
      description: 'Set up review management and response system',
      stepNumber: 5
    },
    {
      id: 'loyalty',
      title: 'Loyalty',
      icon: <Gift className="h-8 w-8 text-[#FF389A]" />,
      description: 'Create customer loyalty programs and rewards',
      stepNumber: 6
    },
    {
      id: 'gift-cards',
      title: 'Gift Cards',
      icon: <Gift className="h-8 w-8 text-[#FF389A]" />,
      description: 'Enable digital gift card sales and management',
      stepNumber: 7
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: <BarChart3 className="h-8 w-8 text-[#FF389A]" />,
      description: 'Set up reporting dashboards and metrics tracking',
      stepNumber: 8
    },
    {
      id: 'launch',
      title: 'Launch',
      icon: <Rocket className="h-8 w-8 text-[#FF389A]" />,
      description: 'Go live with your complete Stampede platform',
      stepNumber: 9
    }
  ];

  // Hide entire numbered steps section for logged-in users
  if (isLoggedIn) {
    return (
      <div className="space-y-8 mb-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Your Onboarding Journey</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 mb-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white">Your Onboarding Journey</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Follow these 9 essential steps to get your platform ready for customers:
        </p>
      </div>

      {/* Desktop Flow Chart */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {flowSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* Step Icon */}
              <div className="flex flex-col items-center space-y-3">
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-[#FF389A]/20">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF389A] rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {step.stepNumber}
                  </div>
                </div>
                <div className="text-center max-w-[120px]">
                  <h3 className="font-bold text-white text-sm">{step.title}</h3>
                </div>
              </div>
              
              {/* Arrow connector (not for last item) */}
              {index < flowSteps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className="h-0.5 bg-gradient-to-r from-[#FF389A]/50 to-[#FF389A]/20"></div>
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
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-[#FF389A]/20">
                  {step.icon}
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF389A] rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {step.stepNumber}
                </div>
              </div>
              
              {/* Step Info */}
              <div className="text-center">
                <h3 className="font-bold text-white text-sm">{step.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Summary Card */}
      <div className="max-w-md mx-auto">
        <div className="relative group cursor-pointer">
          <div className="bg-gradient-to-r from-[#FF389A]/10 to-[#FF389A]/5 border border-[#FF389A]/30 rounded-2xl p-6 text-center backdrop-blur-sm transition-all duration-300 group-hover:border-[#FF389A]/50 group-hover:shadow-lg group-hover:shadow-[#FF389A]/20">
            <h3 className="font-bold text-white text-lg mb-2">Your Complete Onboarding Guide</h3>
            <p className="text-gray-300 mb-4">Duration: 9 minutes</p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-[#FF389A] rounded-full animate-pulse"></div>
              <span className="text-[#FF389A] font-medium">Get Started</span>
            </div>
          </div>
          
          {/* Hover effect */}
          <div className="absolute inset-0 bg-[#FF389A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <p className="text-gray-400 text-sm mt-4">Click to start your onboarding journey overview</p>
      </div>
    </div>
  );
}