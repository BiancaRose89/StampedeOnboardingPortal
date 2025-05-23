import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, ChartLine, User, LogOut } from "lucide-react";
import { signIn, signOutUser } from "@/lib/firebase";
import { useAuth } from "@/components/AuthProvider";
import GuideViewer from "@/components/GuideViewer";
import ResourcesSection from "@/components/ResourcesSection";
import ProgressTracker from "@/components/ProgressTracker";
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to the Stampede Onboarding Journey
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
            Your complete guide to getting started with Stampede's hospitality platform. 
            Access training materials, readiness guides, and expert support.
          </p>
          <a
            href={APP_CONFIG.onboardingJourneyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Start Your Journey
          </a>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Progress Tracker */}
        <ProgressTracker onStepComplete={handleStepComplete} />

        {/* Onboarding Guides */}
        <GuideViewer onGuideView={handleGuideView} />

        {/* Resources Section */}
        <ResourcesSection onContactSupport={handleContactSupport} />
      </div>

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
