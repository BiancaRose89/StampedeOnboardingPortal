import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChartLine, User, LogOut, Rocket, BookOpen, HelpCircle, Users } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { signIn, signOutUser } from "@/lib/firebase";
import { useAuth } from "@/components/AuthProvider";
import OnboardingProgressSection from "@/components/OnboardingProgressSection";
import MasterPlatformSection from "@/components/MasterPlatformSection";
import KnowledgeBaseSection from "@/components/KnowledgeBaseSection";
import ChatWidget from "@/components/ChatWidget";
import { APP_CONFIG } from "@/lib/config";

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const { firebaseUser, dbUser, loading } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;

    setIsLoggingIn(true);
    try {
      await signIn(loginEmail, loginPassword);
      setShowAuthModal(false);
      setLoginEmail("");
      setLoginPassword("");
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in to your onboarding portal.",
      });
    } catch (error: any) {
      toast({
        title: "Sign In Failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGuideView = (guideType: string) => {
    if ((window as any).trackOnboardingProgress) {
      (window as any).trackOnboardingProgress(`viewed_${guideType}_guide`);
    }
  };

  const handleStepComplete = (stepId: string) => {
    console.log(`Onboarding step completed: ${stepId}`);
  };

  const handleContactSupport = () => {
    if ((window as any).Tawk_API) {
      (window as any).Tawk_API.toggle();
    } else {
      toast({
        title: "Chat support",
        description: "Chat widget is loading. Please try again in a moment.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading your onboarding portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <ChartLine className="text-white text-sm" />
                </div>
                <span className="text-xl font-bold text-gray-900">Stampede</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {!firebaseUser ? (
                <Button
                  variant="ghost"
                  onClick={() => setShowAuthModal(true)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              ) : (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    {dbUser?.name || dbUser?.email || firebaseUser.email}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Navy and Pink Theme */}
      <section className="relative bg-[#0D0D24] text-white py-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D24] via-[#1a1a3a] to-[#0D0D24]"></div>
          
          {/* Pink accent circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF389A] rounded-full blur-3xl opacity-10 translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF389A] rounded-full blur-3xl opacity-15 -translate-x-1/3 translate-y-1/3"></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8">
              {/* Experience badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#FF389A]/20 border border-[#FF389A]/30 backdrop-blur-sm">
                <span className="text-sm font-semibold text-[#FF389A] tracking-wide">✦ EXPERIENCE</span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                  <span className="text-white">BEST-IN-CLASS</span>
                  <br />
                  <span className="text-white">EVERYWHERE</span>
                </h1>
                
                <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                  Craft a digital customer experience to match the high standards of your in-venue efforts. Our mobile-first, intuitive user interfaces make it easier for your customers to get booked, get online and remember your brand.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => {
                    const onboardingSection = document.getElementById('onboarding-progress');
                    if (onboardingSection) {
                      onboardingSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="btn-brand-pink px-8 py-4 text-lg"
                >
                  Book a Demo
                </Button>
                
                {!firebaseUser && (
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="btn-brand-outline px-8 py-4 text-lg"
                  >
                    Access Portal
                  </Button>
                )}
              </div>
            </div>

            {/* Right side - Banner image area */}
            <div className="relative">
              {/* Main banner image container */}
              <div className="relative bg-gradient-to-br from-[#FF389A]/20 to-transparent rounded-2xl p-8 backdrop-blur-sm border border-[#FF389A]/20">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Platform preview showing customer experience interface"
                  className="w-full h-auto rounded-xl shadow-2xl"
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(255, 56, 154, 0.25)'
                  }}
                />
                
                {/* Floating elements to match the screenshots */}
                <div className="absolute -top-4 -left-4 bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF389A] to-[#FF389A]/60 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-[#FF389A] rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">Live Demo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          {/* Section 1: Your Onboarding Progress */}
          <section id="onboarding-progress">
            <OnboardingProgressSection />
          </section>

          <Separator className="my-16" />

          {/* Section 2: Master Your Platform */}
          <section id="master-platform">
            <MasterPlatformSection />
          </section>

          <Separator className="my-16" />

          {/* Section 3: Knowledge Base & Resources */}
          <section id="knowledge-base">
            <KnowledgeBaseSection />
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-600">
                © 2024 Stampede. Built for seamless onboarding experiences.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleContactSupport}>Contact Support</Button>
              <Button variant="ghost" size="sm">Documentation</Button>
              <Button variant="ghost" size="sm">Status</Button>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Access Your Portal</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Signing In..." : "Sign In"}
            </Button>
            <p className="text-center text-sm text-gray-600">
              Don't have access?{" "}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => {
                  toast({
                    title: "Request Access",
                    description: "Please contact your administrator for portal access.",
                  });
                }}
              >
                Request an invite
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}
