import HelpCenter from "@/components/HelpCenter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

/**
 * Dedicated Help Center Page
 * Master Your Platform theme with comprehensive support resources
 */
export default function Help() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0D0D25] transition-colors duration-200">
      {/* Navigation */}
      <nav className="bg-white dark:bg-[#0D0D25] shadow-sm border-b border-gray-200 dark:border-gray-800 relative z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation("/")}
                className="text-[#0D0D25] dark:text-white hover:bg-[#FA58A8]/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portal
              </Button>
              <div className="flex items-center space-x-3">
                <span className="text-xl font-bold text-[#FA58A8]">Stampede</span>
                <span className="text-xl font-medium text-[#0D0D25] dark:text-white">Help Center</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Help Center Content */}
      <main className="py-8">
        <HelpCenter />
      </main>
    </div>
  );
}