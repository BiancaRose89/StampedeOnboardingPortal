import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, ArrowRight, Calendar, MessageSquare, Star, Wifi, CheckCircle, Clock, Play } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import OnboardingFlowChart from '@/components/OnboardingFlowChart';
import VenueOnboardingManager from '@/components/VenueOnboardingManager';
import HelpResourcesSection from '@/components/HelpResourcesSection';

interface LockedOverlayProps {
  children: React.ReactNode;
  title: string;
}

const LockedOverlay = ({ children, title }: LockedOverlayProps) => (
  <div className="relative">
    {children}
    <div className="absolute inset-0 bg-[#0D0D24]/75 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10 animate-in fade-in duration-500">
      <div className="text-center space-y-4 bg-[#0D0D24]/90 border border-[#FF389A]/30 rounded-2xl p-8 max-w-md mx-4">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 rounded-full bg-[#FF389A]/20 border border-[#FF389A]/30">
            <Lock className="h-8 w-8 text-[#FF389A]" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white">Ready to Start?</h3>
        <p className="text-gray-300 leading-relaxed">
          Log in to access your personalized onboarding experience and unlock your onboarding progress.
        </p>
        <Button className="bg-[#FF389A] hover:bg-[#E6329C] text-white px-8 py-3 font-bold w-full">
          Log In to Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  </div>
);

export default function LockedStateDemo() {
  const { firebaseUser, dbUser } = useAuth();
  
  // Check if user is actually logged out
  const isLoggedOut = !firebaseUser || !dbUser;

  return (
    <div className="space-y-16">
      {/* Onboarding Journey Flowchart */}
      <OnboardingFlowChart />

      {/* Your Onboarding Progress */}
      <VenueOnboardingManager />
      

    </div>
  );
}