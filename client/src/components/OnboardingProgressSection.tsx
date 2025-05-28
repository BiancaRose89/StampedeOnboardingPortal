import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlayCircle, CheckCircle2, Clock, Users, Palette, Shield, Settings, FileText, Video } from 'lucide-react';

interface OnboardingBlock {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  videoUrl?: string;
  steps: Array<{
    id: string;
    title: string;
    description: string;
    videoUrl?: string;
    articles: Array<{
      title: string;
      url: string;
      type: 'guide' | 'tutorial' | 'reference';
    }>;
  }>;
}

const onboardingBlocks: OnboardingBlock[] = [
  {
    id: 'custom-branding',
    title: 'Custom Branding',
    description: 'Set up your brand colors, logos, and visual identity across the platform',
    icon: <Palette className="h-6 w-6" />,
    progress: 75,
    status: 'in-progress',
    estimatedTime: '15 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://example.com/branding-main',
    steps: [
      {
        id: 'upload-logo',
        title: 'Upload Your Logo',
        description: 'Add your company logo and favicon',
        videoUrl: 'https://example.com/upload-logo',
        articles: [
          { title: 'Logo Guidelines', url: '#', type: 'guide' },
          { title: 'Image Requirements', url: '#', type: 'reference' }
        ]
      },
      {
        id: 'color-scheme',
        title: 'Configure Color Scheme',
        description: 'Set primary and secondary brand colors',
        videoUrl: 'https://example.com/color-scheme',
        articles: [
          { title: 'Color Theory Basics', url: '#', type: 'tutorial' },
          { title: 'Accessibility Guidelines', url: '#', type: 'guide' }
        ]
      }
    ]
  },
  {
    id: 'adding-users',
    title: 'Adding Users',
    description: 'Invite team members and set up user accounts with appropriate access levels',
    icon: <Users className="h-6 w-6" />,
    progress: 0,
    status: 'not-started',
    estimatedTime: '20 minutes',
    difficulty: 'Beginner',
    videoUrl: 'https://example.com/users-main',
    steps: [
      {
        id: 'invite-users',
        title: 'Send User Invitations',
        description: 'Invite team members via email',
        articles: [
          { title: 'User Invitation Best Practices', url: '#', type: 'guide' }
        ]
      },
      {
        id: 'user-roles',
        title: 'Assign User Roles',
        description: 'Set appropriate permissions for each user',
        articles: [
          { title: 'Understanding User Roles', url: '#', type: 'tutorial' }
        ]
      }
    ]
  },
  {
    id: 'setting-permissions',
    title: 'Setting Permissions',
    description: 'Configure access controls and security settings for your organization',
    icon: <Shield className="h-6 w-6" />,
    progress: 100,
    status: 'completed',
    estimatedTime: '25 minutes',
    difficulty: 'Intermediate',
    videoUrl: 'https://example.com/permissions-main',
    steps: [
      {
        id: 'role-based-access',
        title: 'Role-Based Access Control',
        description: 'Set up RBAC for your organization',
        articles: [
          { title: 'RBAC Implementation Guide', url: '#', type: 'guide' }
        ]
      }
    ]
  },
  {
    id: 'integration-setup',
    title: 'Integration Setup',
    description: 'Connect with third-party tools and configure API integrations',
    icon: <Settings className="h-6 w-6" />,
    progress: 30,
    status: 'in-progress',
    estimatedTime: '45 minutes',
    difficulty: 'Advanced',
    videoUrl: 'https://example.com/integrations-main',
    steps: [
      {
        id: 'api-configuration',
        title: 'API Configuration',
        description: 'Set up API keys and endpoints',
        articles: [
          { title: 'API Security Best Practices', url: '#', type: 'guide' }
        ]
      }
    ]
  }
];

interface OnboardingModalProps {
  block: OnboardingBlock;
  currentStep: number;
  onStepChange: (step: number) => void;
}

function OnboardingModal({ block, currentStep, onStepChange }: OnboardingModalProps) {
  const totalSteps = block.steps.length;
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          {block.icon}
          {block.title}
        </DialogTitle>
        <DialogDescription>
          Step {currentStep + 1} of {totalSteps} • {block.estimatedTime} total
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* Progress indicator */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}% complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Main video section */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
          <PlayCircle className="h-16 w-16 mx-auto mb-2 text-blue-600" />
          <p className="text-sm text-muted-foreground">Main Tutorial Video</p>
          <p className="text-xs text-muted-foreground">{block.videoUrl}</p>
        </div>

        {/* Current step content */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">{block.steps[currentStep].title}</h3>
          <p className="text-muted-foreground mb-4">{block.steps[currentStep].description}</p>
          
          {/* Step video */}
          {block.steps[currentStep].videoUrl && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Video className="h-4 w-4" />
                <span>Step Tutorial Video</span>
              </div>
            </div>
          )}

          {/* Articles and guides */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Related Resources</h4>
            {block.steps[currentStep].articles.map((article, index) => (
              <div key={index} className="flex items-center gap-2 text-sm p-2 bg-gray-50 dark:bg-gray-900 rounded">
                <FileText className="h-4 w-4" />
                <span>{article.title}</span>
                <Badge variant="outline" className="ml-auto text-xs">
                  {article.type}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => onStepChange(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button 
            onClick={() => onStepChange(Math.min(totalSteps - 1, currentStep + 1))}
            disabled={currentStep === totalSteps - 1}
          >
            {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

export default function OnboardingProgressSection() {
  const [currentModalStep, setCurrentModalStep] = useState(0);

  const getStatusIcon = (status: OnboardingBlock['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: OnboardingBlock['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800';
      case 'in-progress':
        return 'border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800';
      default:
        return 'border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: OnboardingBlock['difficulty']) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Onboarding Progress</h2>
          <p className="text-muted-foreground">Complete these essential setup tasks to get the most out of your platform</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">
            {onboardingBlocks.filter(block => block.status === 'completed').length}/{onboardingBlocks.length}
          </div>
          <div className="text-sm text-muted-foreground">Tasks Complete</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {onboardingBlocks.map((block) => (
          <Dialog key={block.id} onOpenChange={() => setCurrentModalStep(0)}>
            <DialogTrigger asChild>
              <div className="interactive-card group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF2E88]/20 to-[#8B5CF6]/20 border border-[#FF2E88]/20">
                      {block.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-glow-pink transition-all duration-300">
                        {block.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-2">
                        {getStatusIcon(block.status)}
                        <span className="text-sm text-muted-foreground font-medium">{block.estimatedTime}</span>
                        <Badge className={`${getDifficultyColor(block.difficulty)} shadow-sm`}>
                          {block.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">{block.description}</p>
                
                {block.status !== 'not-started' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-foreground">Progress</span>
                      <span className="text-glow-pink">{block.progress}%</span>
                    </div>
                    <div className="relative">
                      <Progress value={block.progress} className="h-3 bg-muted/50" />
                      <div 
                        className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-[#FF2E88] to-[#8B5CF6] transition-all duration-500"
                        style={{ width: `${block.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-[#00D98B] animate-pulse" />
                    Ready to start
                  </div>
                  <div className="text-[#FF2E88] group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <OnboardingModal 
              block={block} 
              currentStep={currentModalStep}
              onStepChange={setCurrentModalStep}
            />
          </Dialog>
        ))}
      </div>
    </div>
  );
}