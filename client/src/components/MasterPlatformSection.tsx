import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Users, 
  BarChart3, 
  Settings, 
  MessageSquare, 
  Star,
  Gift,
  Wifi,
  ExternalLink,
  Play,
  FileText,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface FeatureContent {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  sections: Array<{
    id: string;
    title: string;
    content: string;
    type: 'overview' | 'tutorial' | 'advanced';
    videoUrl?: string;
    estimatedTime?: string;
    completed?: boolean;
  }>;
  quickActions: Array<{
    label: string;
    action: string;
    primary?: boolean;
  }>;
}

const platformFeatures: FeatureContent[] = [
  {
    id: 'bookings',
    title: 'Booking Management',
    description: 'Complete reservation and appointment management system',
    icon: <BarChart3 className="h-5 w-5" />,
    sections: [
      {
        id: 'booking-overview',
        title: 'Getting Started with Bookings',
        content: 'Learn the fundamentals of setting up your booking system, including calendar integration, availability settings, and customer notification preferences. This comprehensive overview covers everything from basic setup to advanced customization options.',
        type: 'overview',
        videoUrl: 'booking-intro-tutorial',
        estimatedTime: '15 minutes',
        completed: true
      },
      {
        id: 'calendar-setup',
        title: 'Calendar Integration & Sync',
        content: 'Connect your existing calendars (Google, Outlook, Apple) to automatically sync availability and prevent double bookings. Configure timezone settings, buffer times between appointments, and set up recurring availability patterns.',
        type: 'tutorial',
        videoUrl: 'calendar-integration-guide',
        estimatedTime: '20 minutes',
        completed: false
      },
      {
        id: 'booking-automation',
        title: 'Advanced Automation Rules',
        content: 'Set up sophisticated automation workflows including automatic confirmations, reminder sequences, follow-up emails, and waitlist management. Create conditional logic based on booking types, customer segments, or time-based triggers.',
        type: 'advanced',
        videoUrl: 'automation-workflows',
        estimatedTime: '35 minutes',
        completed: false
      }
    ],
    quickActions: [
      { label: 'Create New Booking', action: 'create-booking', primary: true },
      { label: 'View Calendar', action: 'view-calendar' },
      { label: 'Booking Settings', action: 'booking-settings' }
    ]
  },
  {
    id: 'payments',
    title: 'Payment Processing',
    description: 'Secure payment handling and financial management',
    icon: <CreditCard className="h-5 w-5" />,
    sections: [
      {
        id: 'payment-setup',
        title: 'Payment Gateway Configuration',
        content: 'Configure your preferred payment processors including Stripe, PayPal, and Square. Set up merchant accounts, enable multiple payment methods (credit cards, digital wallets, bank transfers), and configure currency settings for international transactions.',
        type: 'overview',
        videoUrl: 'payment-gateway-setup',
        estimatedTime: '25 minutes',
        completed: true
      },
      {
        id: 'pricing-models',
        title: 'Pricing & Subscription Models',
        content: 'Create flexible pricing structures including one-time payments, recurring subscriptions, tiered pricing, and promotional codes. Set up tax calculations, handling refunds, and managing subscription lifecycle events.',
        type: 'tutorial',
        videoUrl: 'pricing-configuration',
        estimatedTime: '30 minutes',
        completed: false
      },
      {
        id: 'financial-reporting',
        title: 'Financial Analytics & Reporting',
        content: 'Generate comprehensive financial reports, track revenue trends, analyze payment success rates, and export data for accounting software. Set up automated reporting schedules and create custom dashboards for financial insights.',
        type: 'advanced',
        videoUrl: 'financial-analytics',
        estimatedTime: '40 minutes',
        completed: false
      }
    ],
    quickActions: [
      { label: 'Process Payment', action: 'process-payment', primary: true },
      { label: 'View Transactions', action: 'view-transactions' },
      { label: 'Financial Reports', action: 'financial-reports' }
    ]
  },
  {
    id: 'customer-management',
    title: 'Customer Management',
    description: 'Comprehensive customer relationship and data management',
    icon: <Users className="h-5 w-5" />,
    sections: [
      {
        id: 'customer-profiles',
        title: 'Customer Profile Management',
        content: 'Create detailed customer profiles with contact information, preferences, booking history, and custom fields. Organize customers into segments, track customer lifetime value, and manage communication preferences.',
        type: 'overview',
        videoUrl: 'customer-profiles-guide',
        estimatedTime: '18 minutes',
        completed: true
      },
      {
        id: 'communication-tools',
        title: 'Customer Communication Hub',
        content: 'Set up automated email campaigns, SMS notifications, and in-app messaging. Create personalized communication templates, schedule follow-ups, and track engagement metrics across all communication channels.',
        type: 'tutorial',
        videoUrl: 'communication-setup',
        estimatedTime: '28 minutes',
        completed: false
      },
      {
        id: 'loyalty-programs',
        title: 'Loyalty & Rewards Programs',
        content: 'Design and implement customer loyalty programs with points systems, tier-based benefits, referral rewards, and special member pricing. Track program performance and adjust rewards based on customer behavior analytics.',
        type: 'advanced',
        videoUrl: 'loyalty-program-advanced',
        estimatedTime: '45 minutes',
        completed: false
      }
    ],
    quickActions: [
      { label: 'Add Customer', action: 'add-customer', primary: true },
      { label: 'View Customers', action: 'view-customers' },
      { label: 'Send Message', action: 'send-message' }
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics & Insights',
    description: 'Business intelligence and performance tracking',
    icon: <BarChart3 className="h-5 w-5" />,
    sections: [
      {
        id: 'dashboard-overview',
        title: 'Analytics Dashboard Overview',
        content: 'Navigate your comprehensive analytics dashboard featuring key performance indicators, real-time metrics, and customizable widgets. Learn to interpret data visualizations and set up automated alerts for important business metrics.',
        type: 'overview',
        videoUrl: 'analytics-dashboard-tour',
        estimatedTime: '12 minutes',
        completed: true
      },
      {
        id: 'custom-reports',
        title: 'Custom Report Builder',
        content: 'Create tailored reports using the drag-and-drop report builder. Combine data from multiple sources, apply filters and date ranges, and schedule automated report delivery to stakeholders.',
        type: 'tutorial',
        videoUrl: 'custom-reports-tutorial',
        estimatedTime: '25 minutes',
        completed: false
      },
      {
        id: 'predictive-analytics',
        title: 'Predictive Analytics & Forecasting',
        content: 'Leverage machine learning algorithms to predict customer behavior, forecast revenue trends, and identify growth opportunities. Set up predictive models for demand forecasting and customer churn prevention.',
        type: 'advanced',
        videoUrl: 'predictive-analytics-deep-dive',
        estimatedTime: '50 minutes',
        completed: false
      }
    ],
    quickActions: [
      { label: 'View Dashboard', action: 'view-dashboard', primary: true },
      { label: 'Create Report', action: 'create-report' },
      { label: 'Export Data', action: 'export-data' }
    ]
  }
];

interface SectionCardProps {
  section: FeatureContent['sections'][0];
  onStartSection: (sectionId: string) => void;
}

function SectionCard({ section, onStartSection }: SectionCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'overview':
        return 'bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/30';
      case 'tutorial':
        return 'bg-[#00D98B]/20 text-[#00D98B] border-[#00D98B]/30';
      case 'advanced':
        return 'bg-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6]/30';
      default:
        return 'bg-muted/50 text-muted-foreground border-border';
    }
  };

  return (
    <div className="card-glow group h-full">
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-foreground group-hover:text-glow-pink transition-all duration-300">
              {section.title}
            </h3>
            <div className="flex items-center gap-3">
              <Badge className={`${getTypeColor(section.type)} font-semibold border`}>
                {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
              </Badge>
              {section.estimatedTime && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                  <Clock className="h-4 w-4" />
                  {section.estimatedTime}
                </div>
              )}
            </div>
          </div>
          {section.completed && (
            <div className="p-2 rounded-full bg-[#00D98B]/20 border border-[#00D98B]/30">
              <CheckCircle2 className="h-5 w-5 text-[#00D98B]" />
            </div>
          )}
        </div>
        
        <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{section.content}</p>
        
        <div className="flex gap-3 pt-4 border-t border-border/50">
          <Button 
            onClick={() => onStartSection(section.id)} 
            className="btn-brand-pink flex items-center gap-2 flex-1"
          >
            <Play className="h-4 w-4" />
            {section.completed ? 'Review' : 'Start Training'}
          </Button>
          {section.videoUrl && (
            <Button variant="outline" size="sm" className="border-[#FF2E88]/30 text-[#FF2E88] hover:bg-[#FF2E88]/10">
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MasterPlatformSection() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleStartSection = (sectionId: string) => {
    setSelectedSection(sectionId);
    // In a real implementation, this would navigate to the detailed tutorial
    console.log(`Starting section: ${sectionId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Master Your Platform</h2>
        <p className="text-muted-foreground">
          Comprehensive training and resources for every feature and capability
        </p>
      </div>

      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-muted/30 rounded-xl border border-border/50 backdrop-blur-sm h-auto p-2">
          {platformFeatures.map((feature) => (
            <TabsTrigger 
              key={feature.id} 
              value={feature.id} 
              className="brand-tab flex items-center gap-3 h-auto py-4 px-6"
            >
              <div className="p-1.5 rounded-lg bg-white/10">
                {feature.icon}
              </div>
              <span className="font-bold text-sm md:text-base hidden sm:inline">{feature.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {platformFeatures.map((feature) => (
          <TabsContent key={feature.id} value={feature.id} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
              <div className="flex gap-2">
                {feature.quickActions.map((action) => (
                  <Button 
                    key={action.action}
                    variant={action.primary ? "default" : "outline"}
                    size="sm"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {feature.sections.map((section) => (
                <SectionCard 
                  key={section.id} 
                  section={section} 
                  onStartSection={handleStartSection}
                />
              ))}
            </div>

            {/* Advanced accordion for additional details */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="advanced-topics">
                <AccordionTrigger>Advanced Topics & Best Practices</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Explore advanced configurations, integration patterns, and optimization techniques 
                      for {feature.title.toLowerCase()}.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">API Integration</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            Connect with external services and build custom integrations
                          </CardDescription>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Performance Optimization</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            Fine-tune settings for maximum efficiency and speed
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="troubleshooting">
                <AccordionTrigger>Common Issues & Troubleshooting</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-medium">Configuration Issues</h4>
                      <p className="text-sm text-muted-foreground">
                        Common setup problems and their solutions
                      </p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-medium">Error Resolution</h4>
                      <p className="text-sm text-muted-foreground">
                        How to diagnose and fix common errors
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium">Performance Issues</h4>
                      <p className="text-sm text-muted-foreground">
                        Identifying and resolving performance bottlenecks
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}