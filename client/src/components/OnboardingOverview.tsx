import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  CheckCircle, 
  Clock, 
  Users, 
  Settings, 
  Calendar,
  Star,
  Mail,
  Wifi,
  ArrowRight,
  Shield,
  BookOpen
} from "lucide-react";

interface OnboardingOverviewProps {
  onStepClick?: (stepId: string) => void;
}

export default function OnboardingOverview({ onStepClick }: OnboardingOverviewProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const onboardingSteps = [
    {
      id: "step1",
      title: "Account Setup",
      duration: "5 minutes",
      status: "completed",
      icon: <Shield className="h-6 w-6" />,
      description: "We'll begin setup behind the scenes to prepare your platform.",
      details: [
        "Brand your account using your logos and colours",
        "Add your venue(s) to the system", 
        "Send your login credentials"
      ],
      action: "Check your inbox for your login email or use your activation link"
    },
    {
      id: "step2", 
      title: "Kick-Off Call",
      duration: "20 minutes",
      status: "current",
      icon: <Users className="h-6 w-6" />,
      description: "Your introduction to your Customer Success Manager.",
      details: [
        "Your core feature setup",
        "Overview of your onboarding journey",
        "Preparation for going live"
      ],
      action: "Reply to the scheduling email with your availability"
    },
    {
      id: "step3",
      title: "Configuration Call", 
      duration: "45 minutes",
      status: "pending",
      icon: <Settings className="h-6 w-6" />,
      description: "Tailor your system to your venue's specific needs.",
      details: [
        "WiFi Setup - Confirm hardware and network layout",
        "Marketing Setup - Verify domain and upload brand assets", 
        "Feature Configuration - Loyalty, Reviews, Gifting, Bookings"
      ],
      action: "Provide WiFi contact details, CRM file, and branding assets"
    },
    {
      id: "step4",
      title: "Feature Training",
      duration: "Multiple sessions",
      status: "pending", 
      icon: <BookOpen className="h-6 w-6" />,
      description: "Focused training sessions to master each platform feature.",
      details: [
        "Marketing & Reviews Training - Create segments and campaigns",
        "Loyalty & Gifting Training - Configure rules and redemption",
        "Bookings Training - Set up table types and embed widgets"
      ],
      action: "Complete each training module and practice exercises"
    },
    {
      id: "step5",
      title: "Go-Live & Handover",
      duration: "30 minutes", 
      status: "pending",
      icon: <Play className="h-6 w-6" />,
      description: "Final checks and launch confirmation.",
      details: [
        "All features tested and working",
        "Training resources shared",
        "Google Reserve activated (if needed)",
        "Transition to ongoing Support Team"
      ],
      action: "Review go-live checklist and confirm readiness"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "current": return "bg-blue-100 text-blue-800 border-blue-200";  
      case "pending": return "bg-gray-100 text-gray-600 border-gray-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "current": return <Play className="h-4 w-4 text-blue-600" />;
      case "pending": return <Clock className="h-4 w-4 text-gray-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          <Star className="h-4 w-4" />
          Your Complete Journey
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to your Stampede Onboarding Journey
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Stampede is your all-in-one hospitality partner helping you manage guest WiFi, bookings, 
          marketing, loyalty, reviews and more. This guide is built to help you launch successfully 
          and with confidence, fully supported at each step.
        </p>
      </div>

      {/* Hero Image Placeholder */}
      <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
        <div className="flex justify-center items-center space-x-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Wifi className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-semibold">WiFi</span>
          </div>
          <ArrowRight className="h-6 w-6 text-gray-400" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-semibold">Bookings</span>
          </div>
          <ArrowRight className="h-6 w-6 text-gray-400" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-semibold">Marketing</span>
          </div>
        </div>
        <p className="mt-4 text-gray-600">Complete ecosystem online and in-person</p>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your 5-Step Journey</h2>
        
        {onboardingSteps.map((step, index) => (
          <Card 
            key={step.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              step.status === 'current' ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
            }`}
            onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      step.status === 'completed' ? 'bg-green-100' :
                      step.status === 'current' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Step {index + 1}: {step.title}
                      </h3>
                      <Badge className={`text-xs ${getStatusColor(step.status)}`}>
                        {getStatusIcon(step.status)}
                        <span className="ml-1 capitalize">{step.status}</span>
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{step.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {step.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  {expandedStep === step.id ? '−' : '+'}
                </Button>
              </div>
            </CardHeader>
            
            {expandedStep === step.id && (
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What We'll Cover:</h4>
                    <ul className="space-y-1">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-1">What You Need to Do:</h4>
                    <p className="text-blue-800">{step.action}</p>
                  </div>

                  {step.status === 'current' && (
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onStepClick?.(step.id);
                      }}
                      className="w-full"
                    >
                      Start This Step
                    </Button>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* What Happens Next */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">What Happens Next?</h3>
          <p className="text-gray-600 mb-4">
            Once you've completed this onboarding journey and gone live, your dedicated Customer Success Manager 
            will hand you over to our Support Team for ongoing assistance. But this is just the beginning — 
            we're here to help you grow, optimise, and make the most of Stampede.
          </p>
          <p className="text-gray-600">
            Keep an eye on your inbox for product updates, insights, and tips to keep your venue thriving.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}