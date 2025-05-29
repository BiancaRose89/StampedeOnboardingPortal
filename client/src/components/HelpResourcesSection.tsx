import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/AuthProvider';
import { 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  AlertTriangle, 
  Lightbulb, 
  Settings, 
  HelpCircle,
  ExternalLink,
  FileText,
  Video
} from 'lucide-react';

export default function HelpResourcesSection() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { firebaseUser } = useAuth();

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const advancedTopics = [
    {
      id: 'automation',
      title: 'Advanced Automation Workflows',
      description: 'Set up complex customer journey automations',
      type: 'guide',
      difficulty: 'Advanced',
      estimatedTime: '25 min'
    },
    {
      id: 'integrations',
      title: 'Third-Party Integrations',
      description: 'Connect with POS systems, email platforms, and more',
      type: 'tutorial',
      difficulty: 'Intermediate',
      estimatedTime: '15 min'
    },
    {
      id: 'analytics',
      title: 'Advanced Analytics & Reporting',
      description: 'Deep-dive into customer behavior analytics',
      type: 'guide',
      difficulty: 'Advanced',
      estimatedTime: '20 min'
    },
    {
      id: 'customization',
      title: 'White-Label Customization',
      description: 'Brand the platform with your colors and logo',
      type: 'tutorial',
      difficulty: 'Intermediate',
      estimatedTime: '10 min'
    },
    {
      id: 'api',
      title: 'API Development & Webhooks',
      description: 'Build custom integrations using our REST API',
      type: 'reference',
      difficulty: 'Advanced',
      estimatedTime: '45 min'
    }
  ];

  const troubleshooting = [
    {
      id: 'login-issues',
      title: 'Customer Login Problems',
      description: 'Common authentication and account access issues',
      type: 'troubleshooting',
      urgency: 'High',
      solutions: 3
    },
    {
      id: 'payment-failures',
      title: 'Payment Processing Errors',
      description: 'Resolving transaction and billing problems',
      type: 'troubleshooting',
      urgency: 'High',
      solutions: 5
    },
    {
      id: 'notification-delivery',
      title: 'Email/SMS Not Delivering',
      description: 'Troubleshoot communication delivery issues',
      type: 'troubleshooting',
      urgency: 'Medium',
      solutions: 4
    },
    {
      id: 'mobile-app',
      title: 'Mobile App Sync Issues',
      description: 'Fix data synchronization problems',
      type: 'troubleshooting',
      urgency: 'Medium',
      solutions: 2
    },
    {
      id: 'data-export',
      title: 'Data Import/Export Problems',
      description: 'Resolve CSV and data migration issues',
      type: 'troubleshooting',
      urgency: 'Low',
      solutions: 3
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide':
        return <BookOpen className="h-4 w-4" />;
      case 'tutorial':
        return <Video className="h-4 w-4" />;
      case 'reference':
        return <FileText className="h-4 w-4" />;
      default:
        return <HelpCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Advanced Topics & Best Practices - Only show for authenticated users */}
      {firebaseUser && (
        <Card className="bg-[#16173F] border-[#FF389A]/30 overflow-hidden">
        <Button
          variant="ghost"
          className="w-full p-6 h-auto justify-between hover:bg-[#FF389A]/10 transition-colors duration-200"
          onClick={() => toggleSection('advanced')}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#FF389A]/20 border border-[#FF389A]/30">
              <Lightbulb className="h-6 w-6 text-[#FF389A]" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-white">Advanced Topics & Best Practices</h3>
              <p className="text-gray-300 text-sm">Deep-dive guides and expert-level features</p>
            </div>
          </div>
          {expandedSection === 'advanced' ? (
            <ChevronUp className="h-5 w-5 text-[#FF389A]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-[#FF389A]" />
          )}
        </Button>
        
        {expandedSection === 'advanced' && (
          <CardContent className="px-6 pb-6 pt-0">
            <div className="space-y-4">
              {advancedTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="p-4 bg-[#0D0D24]/50 rounded-lg border border-gray-600/30 hover:border-[#FF389A]/30 transition-colors duration-200 group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-lg bg-[#FF389A]/10 border border-[#FF389A]/20 mt-1">
                        {getTypeIcon(topic.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white group-hover:text-[#FF389A] transition-colors duration-200">
                          {topic.title}
                        </h4>
                        <p className="text-gray-400 text-sm mt-1">{topic.description}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <Badge className={`${getDifficultyColor(topic.difficulty)} text-xs font-semibold`}>
                            {topic.difficulty}
                          </Badge>
                          <span className="text-xs text-gray-400">{topic.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-[#FF389A] transition-colors duration-200 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
        </Card>
      )}

      {/* Common Issues & Troubleshooting - Only show for authenticated users */}
      {firebaseUser && (
        <Card className="bg-[#16173F] border-[#FF389A]/30 overflow-hidden">
          <Button
            variant="ghost"
            className="w-full p-6 h-auto justify-between hover:bg-[#FF389A]/10 transition-colors duration-200"
            onClick={() => toggleSection('troubleshooting')}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#FF389A]/20 border border-[#FF389A]/30">
                <AlertTriangle className="h-6 w-6 text-[#FF389A]" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-white">Common Issues & Troubleshooting</h3>
                <p className="text-gray-300 text-sm">Quick solutions to frequent problems</p>
              </div>
            </div>
            {expandedSection === 'troubleshooting' ? (
              <ChevronUp className="h-5 w-5 text-[#FF389A]" />
            ) : (
              <ChevronDown className="h-5 w-5 text-[#FF389A]" />
            )}
          </Button>
        
        {expandedSection === 'troubleshooting' && (
          <CardContent className="px-6 pb-6 pt-0">
            <div className="space-y-4">
              {troubleshooting.map((issue) => (
                <div
                  key={issue.id}
                  className="p-4 bg-[#0D0D24]/50 rounded-lg border border-gray-600/30 hover:border-[#FF389A]/30 transition-colors duration-200 group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-lg bg-[#FF389A]/10 border border-[#FF389A]/20 mt-1">
                        <Settings className="h-4 w-4 text-[#FF389A]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white group-hover:text-[#FF389A] transition-colors duration-200">
                          {issue.title}
                        </h4>
                        <p className="text-gray-400 text-sm mt-1">{issue.description}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <Badge className={`${getUrgencyColor(issue.urgency)} text-xs font-semibold`}>
                            {issue.urgency} Priority
                          </Badge>
                          <span className="text-xs text-gray-400">{issue.solutions} Solutions</span>
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-[#FF389A] transition-colors duration-200 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
        </Card>
      )}
    </div>
  );
}