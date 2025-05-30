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
import bannerImage from "@assets/banne_1.png";
import frontBannerImage from "@assets/Banner 1 (1).png";
import { ThemeToggle } from "@/components/ThemeToggle";
import { signIn, signOutUser } from "@/lib/firebase";
import { useAuth } from "@/components/AuthProvider";
import LockedStateDemo from "@/components/LockedStateDemo";
import PlatformTipsSection from "@/components/PlatformTipsSection";
import KnowledgeBaseSection from "@/components/KnowledgeBaseSection";
import ChatWidget from "@/components/ChatWidget";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ClientLogosSection from "@/components/ClientLogosSection";
import FeedbackAndReferralSection from "@/components/FeedbackAndReferralSection";
import HelpResourcesSection from "@/components/HelpResourcesSection";
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-[#FF389A] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading your onboarding portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="bg-background shadow-sm border-b border-[#FF389A]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#FF389A] rounded-lg flex items-center justify-center">
                  <ChartLine className="text-white text-sm" />
                </div>
                <span className="text-xl font-bold text-foreground">Stampede</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {!firebaseUser ? (
                <Button
                  variant="ghost"
                  onClick={() => setShowAuthModal(true)}
                  className="text-muted-foreground hover:text-[#FF389A]"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              ) : (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">
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
      <section className="relative bg-background text-foreground py-20 overflow-hidden">
        {/* WiFi Background with Pink Gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
            <img 
              src="/attached_assets/Group 1000003713.png" 
              alt="Stampede WiFi Network" 
              className="w-full h-full object-contain opacity-50"
            />
          </div>
        </div>
        
        {/* Background pattern with pink accents */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF389A] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF389A] rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-muted rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 opacity-10"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Authentic Stampede logo */}
            <div className="flex items-center justify-center mb-2">
              <span className="text-4xl md:text-5xl font-bold text-[#FF389A]">Stampede</span>
            </div>
            
            {!firebaseUser ? (
              <>
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                    Welcome to the
                    <br />
                    <span className="bg-gradient-to-r from-[#FF389A] to-pink-400 bg-clip-text text-transparent">
                      Stampede Onboarding Journey
                    </span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                    Driving new and repeat customers for hospitality. Your complete ecosystem online and in-person, 
                    connecting marketing and operations with expert guidance every step of the way.
                  </p>
                </div>

                {/* Image Block for Logged-out Users */}
                <div className="flex justify-center">
                  <div className="relative w-full max-w-4xl mx-auto">
                    <img 
                      src={frontBannerImage} 
                      alt="Stampede Mobile Platform Features" 
                      className="w-full h-auto rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    onClick={() => {
                      const element = document.getElementById('onboarding-progress');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-[#FF389A] hover:bg-[#E6329C] text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-200 shadow-lg shadow-[#FF389A]/25"
                  >
                    <Rocket className="mr-2 h-5 w-5" />
                    Start Your Journey
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => {
                      const element = document.getElementById('master-platform');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="border-[#FF389A] text-[#FF389A] hover:bg-[#FF389A] hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-200"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Explore Features
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                    <span className="bg-gradient-to-r from-[#FF389A] to-pink-400 bg-clip-text text-transparent">
                      You are in! Welcome to Stampede
                    </span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                    Super excited to get this over the line for you!
                  </p>
                </div>

                {/* Image Block for Logged-in Users */}
                <div className="flex justify-center">
                  <div className="relative w-full max-w-4xl mx-auto">
                    <img 
                      src={bannerImage} 
                      alt="Stampede Platform Overview" 
                      className="w-full h-auto rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    onClick={() => {
                      const element = document.getElementById('onboarding-progress');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-[#FF389A] hover:bg-[#E6329C] text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-200 shadow-lg shadow-[#FF389A]/25"
                  >
                    <Rocket className="mr-2 h-5 w-5" />
                    Your Onboarding Journey
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="border-[#FF389A] text-[#FF389A] hover:bg-[#FF389A] hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-200"
                  >
                    <User className="mr-2 h-5 w-5" />
                    Venue Training
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      const element = document.getElementById('master-platform');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="border-[#FF389A] text-[#FF389A] hover:bg-[#FF389A] hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-200"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Master Your Platform
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          {/* Section 1: Your Onboarding Progress */}
          <section id="onboarding-progress">
            <LockedStateDemo />
          </section>

          <Separator className="my-16" />

          {/* Section 2: Master Your Platform */}
          <section id="master-platform" className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Master Your Platform</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Now that you have run through the setup and features, let's master the platform
              </p>
            </div>
            <PlatformTipsSection />
            
            {/* Advanced Topics & Troubleshooting Dropdowns */}
            <HelpResourcesSection />
            
            {/* Client Success Highlights at bottom of Master Platform section */}
            <TestimonialCarousel />
            
            {/* Client Logos Section */}
            <ClientLogosSection />
            
            {/* Feedback and Referral Section */}
            <FeedbackAndReferralSection />
          </section>

          {/* Call to Action Section - Only for logged out users */}
          {!firebaseUser && (
            <section className="bg-background py-16">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-left space-y-8">
                  <div className="space-y-4">
                    <p className="text-[#FF389A] text-sm font-medium">From £89 per venue monthly</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                      Let's do this,<br />
                      choose your path
                    </h2>
                    <div className="space-y-2 max-w-4xl">
                      <p className="text-muted-foreground text-lg">
                        We're constantly reviewing our pricing to remain competitive and fair for business of all sizes.
                      </p>
                      <p className="text-muted-foreground text-lg">
                        Prices start from £89 per month, per venue. This allows you to design and send unlimited emails to your customers.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left side - Live Demo */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-foreground">Book a live demo</h3>
                      <p className="text-muted-foreground">
                        Book a screen-share demo at a time to suit you with one of our specialists to learn more about Stampede and see how it works in real-time.
                      </p>
                      <Button 
                        className="bg-[#FF389A] hover:bg-[#E6329] text-white px-8 py-4 text-lg font-semibold rounded-full"
                        onClick={() => {
                          // Handle demo booking
                          toast({
                            title: "Demo Booking",
                            description: "Redirecting to demo booking page...",
                          });
                        }}
                      >
                        Show me
                      </Button>
                    </div>

                    {/* Right side - Request Quote */}
                    <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#FF389A] rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-foreground">REQUEST A QUOTE</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-muted-foreground mb-2 block">Business Email</label>
                          <input 
                            type="email" 
                            placeholder="you@company.com"
                            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#FF389A] focus:border-transparent"
                          />
                        </div>
                        
                        <Button 
                          className="w-full bg-[#FF389A] hover:bg-[#E6329] text-white py-3 text-lg font-semibold rounded-lg"
                          onClick={() => {
                            // Handle quote request
                            toast({
                              title: "Quote Request",
                              description: "Thank you! We'll be in touch soon.",
                            });
                          }}
                        >
                          Get Started
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#FF389A]/20 bg-background mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground">
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
        <DialogContent className="sm:max-w-md bg-background border-[#FF389A]/30 text-foreground">
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
