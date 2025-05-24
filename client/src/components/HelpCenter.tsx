import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Play,
  Download,
  BookOpen,
  MessageCircle,
  Clock,
  FileText,
  HelpCircle,
  Star,
  Users,
  CreditCard,
  Wifi,
  Mail
} from "lucide-react";

/**
 * Comprehensive Help Center Component
 * Master Your Platform theme with pink accents and dark mode support
 * Organized support materials and client use cases
 */
export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  const videoTutorials = [
    {
      title: "Getting Started with Stampede",
      duration: "8:45",
      type: "intro",
      description: "Complete platform overview and first steps"
    },
    {
      title: "Setting Up Table Bookings",
      duration: "12:30",
      type: "feature",
      description: "Configure your booking system from start to finish"
    },
    {
      title: "Advanced Loyalty Program Configuration",
      duration: "15:20",
      type: "technical",
      description: "Deep dive into points, rewards, and automation"
    },
    {
      title: "Marketing Campaign Best Practices",
      duration: "10:15",
      type: "feature",
      description: "Create effective email campaigns that convert"
    },
    {
      title: "WiFi Marketing Setup",
      duration: "6:30",
      type: "technical",
      description: "Turn guest WiFi into customer acquisition tool"
    },
    {
      title: "Review Management Strategies",
      duration: "9:45",
      type: "feature",
      description: "Build and maintain your online reputation"
    }
  ];

  const downloads = [
    {
      title: "Stampede Quick Start Guide",
      type: "PDF",
      size: "2.3 MB",
      description: "Essential setup checklist for new users"
    },
    {
      title: "Marketing Templates Pack",
      type: "ZIP",
      size: "5.7 MB",
      description: "Email templates, social media graphics, and copy"
    },
    {
      title: "Integration API Documentation",
      type: "PDF",
      size: "1.8 MB",
      description: "Technical guide for custom integrations"
    },
    {
      title: "ROI Calculator Spreadsheet",
      type: "XLSX",
      size: "890 KB",
      description: "Track your Stampede investment returns"
    }
  ];

  const useCases = [
    {
      feature: "Loyalty Programs",
      icon: <Star className="h-5 w-5" />,
      examples: [
        "Points-based: Coffee shop gives 1 point per $1 spent, 100 points = free drink",
        "Tier system: Restaurant with Bronze/Silver/Gold levels based on visits",
        "Discount-based: Retail store offers 10% off after 5 purchases",
        "Hybrid model: Bar combines points + exclusive member events"
      ]
    },
    {
      feature: "Table Bookings",
      icon: <Users className="h-5 w-5" />,
      examples: [
        "Fine dining: Advance reservations with deposit requirements",
        "Casual dining: Walk-ins + online bookings with SMS confirmations",
        "Events venue: Special occasion bookings with custom packages",
        "Quick service: Pickup time slots for busy lunch periods"
      ]
    },
    {
      feature: "Marketing Automation",
      icon: <Mail className="h-5 w-5" />,
      examples: [
        "Welcome series: 3-email sequence for new WiFi subscribers",
        "Win-back campaigns: Target customers who haven't visited in 30 days",
        "Birthday promotions: Automated special offers on customer birthdays",
        "Seasonal campaigns: Holiday-specific promotions and menus"
      ]
    },
    {
      feature: "WiFi Marketing",
      icon: <Wifi className="h-5 w-5" />,
      examples: [
        "Data capture: Social login for instant customer profiles",
        "Segmentation: Tag customers by location, visit frequency, preferences",
        "Retargeting: Follow up with customers who visited but didn't return",
        "Analytics: Track peak times, popular areas, customer behavior"
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "intro":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "feature":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "technical":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          <span className="text-[#FA58A8]">Master Your Platform</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Everything you need to unlock Stampede's full potential. Videos or Articles – pick your way.
        </p>
      </div>

      {/* Search Bar */}
      <Card className="border-[#FA58A8]/20 dark:border-[#FA58A8]/30">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search videos, articles, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-200 dark:border-gray-700 focus:border-[#FA58A8] dark:focus:border-[#FA58A8]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Knowledge Base & Resources */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#FA58A8]" />
              <span className="text-[#FA58A8]">Knowledge Base & Resources</span>
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-300">
              Dive deep into guides, best practices, and step-by-step tutorials
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Button variant="outline" className="justify-start h-auto p-4 border-gray-200 dark:border-gray-700 hover:border-[#FA58A8] dark:hover:border-[#FA58A8]">
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">Setup Guides</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Step-by-step platform configuration</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4 border-gray-200 dark:border-gray-700 hover:border-[#FA58A8] dark:hover:border-[#FA58A8]">
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">Best Practices</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Industry insights and proven strategies</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4 border-gray-200 dark:border-gray-700 hover:border-[#FA58A8] dark:hover:border-[#FA58A8]">
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">Troubleshooting</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Common issues and quick solutions</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Video Tutorials */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-[#FA58A8]" />
              <span className="text-[#FA58A8]">Video Tutorials</span>
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-300">
              Learn by watching with our comprehensive video library
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {videoTutorials.map((video, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-[#FA58A8] dark:hover:border-[#FA58A8] transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{video.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={getTypeColor(video.type)}>
                      {video.type}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{video.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4" />
                  {video.duration}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Downloads */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-[#FA58A8]" />
            <span className="text-[#FA58A8]">Downloads</span>
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300">
            Essential resources, templates, and documentation
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {downloads.map((download, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-[#FA58A8] dark:hover:border-[#FA58A8] transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#FA58A8]" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">{download.title}</h4>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {download.type} • {download.size}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{download.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Client Use Cases & FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#FA58A8]" />
            <span className="text-[#FA58A8]">Client Use Cases & FAQs</span>
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300">
            Real-world examples of how successful businesses implement each feature
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {useCases.map((useCase, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#FA58A8]/10 rounded-lg text-[#FA58A8]">
                  {useCase.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{useCase.feature}</h3>
              </div>
              <div className="space-y-3">
                {useCase.examples.map((example, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-2 h-2 bg-[#FA58A8] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 dark:text-gray-300">{example}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Need Help CTA */}
      <Card className="bg-gradient-to-r from-[#FA58A8]/10 to-[#FA58A8]/5 border-[#FA58A8]/20 dark:border-[#FA58A8]/30">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-[#FA58A8]/10 rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="h-8 w-8 text-[#FA58A8]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              <span className="text-[#FA58A8]">Need Help?</span> We're Here for You
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our expert support team is ready to help you succeed. Whether you're just getting started 
              or optimizing advanced features, we'll guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button className="bg-[#FA58A8] hover:bg-[#FA58A8]/90 text-white">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" className="border-[#FA58A8] text-[#FA58A8] hover:bg-[#FA58A8]/10">
                Schedule Onboarding Call
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}