import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Book, 
  Play, 
  Download, 
  Headphones, 
  ExternalLink,
  FileText,
  Video,
  HelpCircle
} from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

interface ResourcesSectionProps {
  onContactSupport?: () => void;
}

export default function ResourcesSection({ onContactSupport }: ResourcesSectionProps) {
  const videoTutorials = [
    { title: "Platform Overview", duration: "5 min", type: "intro" },
    { title: "WiFi Setup Guide", duration: "8 min", type: "technical" },
    { title: "Marketing Automation", duration: "12 min", type: "feature" },
  ];

  const downloadResources = [
    { title: "Setup Checklist", type: "PDF", size: "2.1 MB" },
    { title: "Quick Reference Card", type: "PDF", size: "1.5 MB" },
  ];

  const handleResourceClick = (resourceType: string, title: string) => {
    // Track resource access
    console.log(`Resource accessed: ${resourceType} - ${title}`);
  };

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Knowledge Base & Resources</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive documentation, tutorials, and support materials organized by topic
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Knowledge Base Embed */}
        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5 text-blue-600" />
              Help Center
            </CardTitle>
            <p className="text-gray-600 text-sm">
              Search articles and guides by feature or topic
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative" style={{ height: "60vh" }}>
              <iframe
                src={APP_CONFIG.knowledgeBaseUrl}
                className="w-full h-full border-0"
                title="Stampede Knowledge Base"
                loading="lazy"
                onError={(e) => {
                  const iframe = e.target as HTMLIFrameElement;
                  iframe.style.display = "none";
                  const fallback = document.createElement("div");
                  fallback.className = "flex flex-col items-center justify-center h-full p-6 text-center";
                  fallback.innerHTML = `
                    <div class="text-gray-400 mb-4">
                      <svg class="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <p class="text-gray-600 mb-4">Unable to load Knowledge Base</p>
                    <a href="${APP_CONFIG.knowledgeBaseUrl}" target="_blank" class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
                      Open Knowledge Base
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

        {/* Quick Access Resources */}
        <div className="space-y-6">
          {/* Video Tutorials */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-green-600" />
                Video Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {videoTutorials.map((video, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                  onClick={() => handleResourceClick("video", video.title)}
                >
                  <div className="flex items-center gap-3">
                    <Video className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                    <div>
                      <span className="font-medium text-gray-900">{video.title}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {video.duration}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {video.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Downloads */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-blue-600" />
                Downloads
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {downloadResources.map((resource, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                  onClick={() => handleResourceClick("download", resource.title)}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-red-500" />
                    <div>
                      <span className="font-medium text-gray-900">{resource.title}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {resource.type}
                        </Badge>
                        <span className="text-xs text-gray-500">{resource.size}</span>
                      </div>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Support */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-purple-600" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Our support team is here to help you succeed with your onboarding journey.
              </p>
              <Button 
                onClick={onContactSupport}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
