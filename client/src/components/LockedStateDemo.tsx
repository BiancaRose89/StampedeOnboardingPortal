import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, ArrowRight, Calendar, MessageSquare, Star, Wifi } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

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

  const platformFeatures = [
    {
      id: 'bookings',
      title: 'Bookings',
      icon: <Calendar className="h-6 w-6" />,
      features: ['Create a Walk-In', 'Block Off Father\'s Day']
    },
    {
      id: 'marketing',
      title: 'Marketing',
      icon: <MessageSquare className="h-6 w-6" />,
      features: ['Set Up Email Automation', 'Schedule a Campaign']
    },
    {
      id: 'loyalty',
      title: 'Loyalty',
      icon: <Star className="h-6 w-6" />,
      features: ['Create a Loyalty Card', 'Set Redemption Rules']
    },
    {
      id: 'wifi',
      title: 'WiFi',
      icon: <Wifi className="h-6 w-6" />,
      features: ['Set Guest Access Rules', 'Add a Splash Page']
    }
  ];

  return (
    <div className="space-y-16">
      {/* Your Onboarding Progress - Locked */}
      {isLoggedOut ? (
        <LockedOverlay title="Your Onboarding Progress">
          <div className="space-y-6 opacity-40 pointer-events-none">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Your Onboarding Progress</h2>
                <p className="text-gray-300">Complete these essential setup tasks to get the most out of your platform</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">0/6</div>
                <div className="text-sm text-gray-300">Tasks Complete</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map((i) => (
                <Card key={i} className="bg-[#16173F] border-gray-600/30">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-4 rounded-xl bg-[#FF389A]/10 border border-[#FF389A]/30">
                        <Calendar className="h-6 w-6 text-[#FF389A]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Setup Task {i}</h3>
                        <Badge className="bg-gray-600/20 text-gray-400 border-gray-600/30">
                          Locked
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </LockedOverlay>
      ) : null}

      {/* Master Your Platform - Locked */}
      {isLoggedOut ? (
        <LockedOverlay title="Master Your Platform">
          <div className="space-y-6 opacity-40 pointer-events-none">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Master Your Platform</h2>
                <p className="text-gray-300">Deep-dive into features and best practices to unlock the full potential of your platform.</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">4</div>
                <div className="text-sm text-gray-300">Core Features</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {platformFeatures.map((feature) => (
                <Card key={feature.id} className="bg-[#16173F] border-gray-600/30">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-4 rounded-xl bg-[#FF389A]/10 border border-[#FF389A]/30">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                          <Badge className="bg-gray-600/20 text-gray-400 border-gray-600/30">
                            {feature.features.length} Features - Locked
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {feature.features.map((featureName, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-[#0D0D24]/50 rounded-lg border border-gray-600/30">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-gray-600/20 flex items-center justify-center text-xs font-bold text-gray-400">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-bold text-white text-sm">{featureName}</h4>
                              <p className="text-gray-400 text-xs">Requires login to access</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-600/30 mt-6">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Lock className="h-4 w-4" />
                        <span>Login Required</span>
                      </div>
                      <Button disabled className="bg-gray-600 text-gray-400 px-6 py-2 font-bold cursor-not-allowed">
                        Locked
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </LockedOverlay>
      ) : null}

      {/* Progress Till Go Live - Locked */}
      {isLoggedOut ? (
        <LockedOverlay title="Progress Till Go Live">
          <div className="space-y-8 mt-16 opacity-40 pointer-events-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h2 className="text-3xl font-bold text-white">Progress Till Go Live!</h2>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-[#FF389A]">0%</div>
                <div className="text-sm text-gray-300">Complete</div>
              </div>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#FF389A] to-[#E6329C] w-0"></div>
            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
              {[
                { title: "Platform Ready", description: "All core features configured and tested" },
                { title: "Team Training", description: "Staff onboarded and comfortable with tools" },
                { title: "Customer Launch", description: "Begin serving customers with new system" }
              ].map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-gray-600 bg-[#0D0D24] flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-400">{index + 1}</span>
                  </div>
                  
                  <div className="flex-1">
                    <Card className="p-6 bg-[#16173F] border-gray-600/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-2 text-gray-300">{step.title}</h3>
                          <p className="text-gray-400">{step.description}</p>
                        </div>
                        <Button disabled className="ml-4 bg-gray-600 text-gray-400 cursor-not-allowed">
                          Locked
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </LockedOverlay>
      ) : null}
    </div>
  );
}