import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Star, Mail, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { GuideConfig } from "@shared/schema";
import { DEFAULT_GUIDE_CONFIGS } from "@/lib/config";

interface GuideViewerProps {
  onGuideView?: (guideType: string) => void;
}

export default function GuideViewer({ onGuideView }: GuideViewerProps) {
  const [activeGuide, setActiveGuide] = useState("bookings");

  const { data: guides, isLoading } = useQuery<GuideConfig[]>({
    queryKey: ["/api/guides"],
  });

  // Fallback to default configs if API fails
  const getGuideConfig = (guideType: string) => {
    const apiGuide = guides?.find(g => g.guideType === guideType);
    if (apiGuide) return apiGuide;
    
    const defaultConfig = DEFAULT_GUIDE_CONFIGS[guideType as keyof typeof DEFAULT_GUIDE_CONFIGS];
    return {
      guideType,
      title: defaultConfig.title,
      description: defaultConfig.description,
      url: defaultConfig.url,
      isActive: true,
    };
  };

  const handleTabChange = (value: string) => {
    setActiveGuide(value);
    onGuideView?.(value);
  };

  const getGuideIcon = (guideType: string) => {
    switch (guideType) {
      case "bookings": return <Calendar className="h-4 w-4" />;
      case "loyalty": return <Star className="h-4 w-4" />;
      case "marketing": return <Mail className="h-4 w-4" />;
      default: return null;
    }
  };

  const getGuideColor = (guideType: string) => {
    switch (guideType) {
      case "bookings": return "bg-blue-50 border-blue-200";
      case "loyalty": return "bg-green-50 border-green-200";
      case "marketing": return "bg-purple-50 border-purple-200";
      default: return "bg-gray-50 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="flex justify-center space-x-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-32" />
          ))}
        </div>
        <Card>
          <Skeleton className="h-96 w-full" />
        </Card>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Onboarding Guides</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Interactive guides to help you set up and configure each feature of your Stampede platform
        </p>
      </div>

      <Tabs value={activeGuide} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
          <TabsTrigger value="bookings" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Bookings Guide
          </TabsTrigger>
          <TabsTrigger value="loyalty" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Loyalty Guide
          </TabsTrigger>
          <TabsTrigger value="marketing" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Marketing Guide
          </TabsTrigger>
        </TabsList>

        {["bookings", "loyalty", "marketing"].map((guideType) => {
          const guide = getGuideConfig(guideType);
          
          return (
            <TabsContent key={guideType} value={guideType}>
              <Card className="overflow-hidden shadow-lg">
                <CardHeader className={`${getGuideColor(guideType)} border-b`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getGuideIcon(guideType)}
                      <div>
                        <CardTitle className="text-xl">{guide.title}</CardTitle>
                        <p className="text-gray-600 mt-1">{guide.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Interactive</Badge>
                      <a
                        href={guide.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative" style={{ height: "70vh" }}>
                    <iframe
                      src={guide.url}
                      className="w-full h-full border-0"
                      title={guide.title}
                      loading="lazy"
                      onError={(e) => {
                        const iframe = e.target as HTMLIFrameElement;
                        iframe.style.display = "none";
                        const fallback = document.createElement("div");
                        fallback.className = "flex flex-col items-center justify-center h-full p-8 text-center";
                        fallback.innerHTML = `
                          <div class="text-yellow-500 mb-4">
                            <svg class="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                            </svg>
                          </div>
                          <h3 class="text-lg font-semibold text-gray-900 mb-2">Unable to load content</h3>
                          <p class="text-gray-600 mb-4">Please try refreshing the page or check your internet connection.</p>
                          <a href="${guide.url}" target="_blank" class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
                            Open in new window
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                            </svg>
                          </a>
                        `;
                        iframe.parentNode?.appendChild(fallback);
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
