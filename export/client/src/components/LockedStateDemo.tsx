import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, ArrowRight, Calendar, MessageSquare, Star, Wifi, CheckCircle, Clock, Play, BookOpen, Zap } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import OnboardingFlowChart from '@/components/OnboardingFlowChart';
import MultiVenueOnboarding from '@/components/MultiVenueOnboarding';
import HelpResourcesSection from '@/components/HelpResourcesSection';
import PlatformTipsSection from '@/components/PlatformTipsSection';
import FeedbackAndReferralSection from '@/components/FeedbackAndReferralSection';

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
  const [showMasterPlatform, setShowMasterPlatform] = useState(false);
  
  // Check if user is actually logged out
  const isLoggedOut = !firebaseUser || !dbUser;

  if (showMasterPlatform && !isLoggedOut) {
    return (
      <div className="space-y-16">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => setShowMasterPlatform(false)}
            className="text-[#FF389A] hover:bg-[#FF389A]/10"
          >
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
            Back to Dashboard
          </Button>
        </div>
        <PlatformTipsSection />
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Onboarding Journey Flowchart - Only show for logged-out users */}
      {isLoggedOut && <OnboardingFlowChart />}

      {/* Your Onboarding Progress */}
      <MultiVenueOnboarding />
      
      {/* Two Action Blocks for Logged-in Users */}
      {!isLoggedOut && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Master the Platform Block */}
          <Card className="bg-gradient-to-br from-[#FF389A]/20 to-[#FF389A]/5 border-[#FF389A]/30 hover:border-[#FF389A]/50 transition-all duration-300 cursor-pointer group" onClick={() => setShowMasterPlatform(true)}>
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-20 h-20 bg-[#FF389A]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF389A]/30 transition-colors">
                <BookOpen className="h-10 w-10 text-[#FF389A]" />
              </div>
              <h3 className="text-2xl font-bold text-white">Master the Platform</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Dive deeper into advanced features and best practices to get the most out of your platform
              </p>
              <Button className="bg-[#FF389A] hover:bg-[#E6329C] text-white px-6 py-3 font-semibold w-full group-hover:scale-105 transition-transform">
                Explore Features
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>

          {/* Live Feature Examples Block */}
          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                <Zap className="h-10 w-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Live Feature Examples</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                See real examples of how other venues use features to drive customer engagement
              </p>
              <Button variant="outline" className="border-blue-400/50 text-blue-400 hover:bg-blue-400/10 px-6 py-3 font-semibold w-full group-hover:scale-105 transition-transform">
                View Examples
                <Play className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Feedback and Referral Section for Logged-in Users */}
      {!isLoggedOut && (
        <FeedbackAndReferralSection />
      )}

    </div>
  );
}