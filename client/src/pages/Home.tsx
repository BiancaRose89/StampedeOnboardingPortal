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
import LockedStateDemo from "@/components/LockedStateDemo";
import PlatformTipsSection from "@/components/PlatformTipsSection";
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
      <div className="min-h-screen bg-[#16173F] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-[#FF389A] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-300">Loading your onboarding portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#16173F]">
      {/* Navigation Header */}
      <nav className="bg-[#16173F] shadow-sm border-b border-[#FF389A]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#FF389A] rounded-lg flex items-center justify-center">
                  <ChartLine className="text-white text-sm" />
                </div>
                <span className="text-xl font-bold text-white">Stampede</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {!firebaseUser ? (
                <Button
                  variant="ghost"
                  onClick={() => setShowAuthModal(true)}
                  className="text-gray-300 hover:text-[#FF389A]"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              ) : (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-300">
                    {dbUser?.name || dbUser?.email || firebaseUser.email}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="text-[#FF389A] hover:text-red-400"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Classic Stampede Style */}
      <section className="relative bg-[#16173F] text-white py-20 overflow-hidden">
        {/* Background pattern matching Stampede.ai */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF389A] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF389A] rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-white rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 opacity-10"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Authentic Stampede logo */}
            <div className="flex items-center justify-center mb-2">
              <span className="text-4xl md:text-5xl font-bold text-[#FF389A]">Stampede</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                Welcome to the
                <br />
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Stampede Onboarding Journey
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Driving new and repeat customers for hospitality. Your complete ecosystem online and in-person, 
                connecting marketing and operations with expert guidance every step of the way.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => {
                  const onboardingSection = document.getElementById('onboarding-progress');
                  if (onboardingSection) {
                    onboardingSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                size="lg"
                className="btn-brand-white px-8 py-4 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Start Your Journey
              </Button>
              
              {!firebaseUser && (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="btn-brand-outline px-8 py-4 font-semibold"
                >
                  Access Your Portal
                </Button>
              )}
            </div>

            {/* Stats or features */}
            <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">6</div>
                <div className="text-blue-200">Core Features</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-blue-200">Expert Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-200">Knowledge Base</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          {/* Section 1: Locked State Demo */}
          <section id="locked-state-demo">
            <LockedStateDemo />
          </section>

          <Separator className="my-16" />

          {/* Section 2: Master Your Platform */}
          <section id="master-platform" className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-white">Now that you have run through the setup and features, let's master the platform</h2>
            </div>
            <PlatformTipsSection />
          </section>

          <Separator className="my-16" />


        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#FF389A]/20 bg-[#16173F] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-300">
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
        <DialogContent className="sm:max-w-md bg-[#16173F] border-[#FF389A]/30 text-white">
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
            <p className="text-center text-sm text-gray-300">
              Don't have access?{" "}
              <button
                type="button"
                className="text-[#FF389A] hover:underline"
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
