import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Edit3, Save, X, Image, Star, CheckCircle, Users, MessageSquare, Phone } from "lucide-react";

interface ContentBlock {
  id: string;
  title: string;
  type: 'hero' | 'features' | 'process' | 'testimonials' | 'faq' | 'footer_cta';
  content: any;
  isPublished: boolean;
}

const initialContentBlocks: ContentBlock[] = [
  {
    id: 'hero',
    title: 'Hero Section',
    type: 'hero',
    isPublished: true,
    content: {
      headline: "Transform Your Hospitality Business with Stampede",
      subheadline: "The all-in-one platform that streamlines bookings, builds customer loyalty, and drives revenue growth for restaurants, bars, and venues.",
      ctaText: "Start Your Free Trial",
      ctaSecondary: "Schedule Demo",
      backgroundImage: "/api/placeholder/1920/1080",
      features: [
        "Easy table booking system",
        "Customer loyalty rewards",
        "Marketing automation",
        "Real-time analytics"
      ]
    }
  },
  {
    id: 'features',
    title: 'Key Features',
    type: 'features',
    isPublished: true,
    content: {
      sectionTitle: "Everything You Need to Succeed",
      sectionSubtitle: "Powerful features designed specifically for hospitality businesses",
      features: [
        {
          id: 1,
          icon: "Calendar",
          title: "Smart Booking System",
          description: "Seamless table reservations with real-time availability, automated confirmations, and no-show protection.",
          image: "/api/placeholder/400/300"
        },
        {
          id: 2,
          icon: "Star",
          title: "Customer Loyalty Program",
          description: "Build lasting relationships with points, rewards, and personalized offers that keep customers coming back.",
          image: "/api/placeholder/400/300"
        },
        {
          id: 3,
          icon: "Zap",
          title: "Marketing Automation",
          description: "Targeted email campaigns, SMS marketing, and social media integration to grow your customer base.",
          image: "/api/placeholder/400/300"
        },
        {
          id: 4,
          icon: "Users",
          title: "Team Management",
          description: "Staff scheduling, performance tracking, and communication tools to keep your team aligned.",
          image: "/api/placeholder/400/300"
        }
      ]
    }
  },
  {
    id: 'process',
    title: 'How It Works',
    type: 'process',
    isPublished: true,
    content: {
      sectionTitle: "Get Started in 3 Simple Steps",
      sectionSubtitle: "From setup to go-live in just a few days",
      steps: [
        {
          id: 1,
          title: "Quick Setup",
          description: "Complete your business profile and customize your settings in under 30 minutes.",
          duration: "30 minutes",
          image: "/api/placeholder/300/200"
        },
        {
          id: 2,
          title: "Team Training",
          description: "Your team gets hands-on training with our onboarding specialists to master the platform.",
          duration: "2-3 days",
          image: "/api/placeholder/300/200"
        },
        {
          id: 3,
          title: "Go Live",
          description: "Launch your new system with full support and see immediate results in customer engagement.",
          duration: "1 week",
          image: "/api/placeholder/300/200"
        }
      ]
    }
  },
  {
    id: 'testimonials',
    title: 'Customer Success Stories',
    type: 'testimonials',
    isPublished: true,
    content: {
      sectionTitle: "Trusted by Leading Hospitality Businesses",
      sectionSubtitle: "See how Stampede has transformed operations for venues like yours",
      testimonials: [
        {
          id: 1,
          name: "Sarah Chen",
          title: "Restaurant Owner",
          business: "The Garden Bistro",
          image: "/api/placeholder/80/80",
          rating: 5,
          quote: "Stampede increased our repeat customers by 45% in just 3 months. The loyalty program is a game-changer.",
          results: "45% increase in repeat customers"
        },
        {
          id: 2,
          name: "Marcus Johnson",
          title: "Bar Manager",
          business: "Downtown Lounge",
          image: "/api/placeholder/80/80",
          rating: 5,
          quote: "Our booking efficiency improved dramatically. No more double bookings or lost reservations.",
          results: "90% reduction in booking errors"
        },
        {
          id: 3,
          name: "Elena Rodriguez",
          title: "Venue Director",
          business: "Grand Events Hall",
          image: "/api/placeholder/80/80",
          rating: 5,
          quote: "The marketing automation saves us 10 hours per week while increasing our event bookings by 30%.",
          results: "30% increase in bookings"
        }
      ]
    }
  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    type: 'faq',
    isPublished: true,
    content: {
      sectionTitle: "Common Questions",
      sectionSubtitle: "Everything you need to know about getting started",
      faqs: [
        {
          id: 1,
          question: "How long does implementation take?",
          answer: "Most venues are fully operational within 1-2 weeks. Our onboarding team works with you to ensure a smooth transition with minimal disruption to your business."
        },
        {
          id: 2,
          question: "Do you provide training for my staff?",
          answer: "Yes! We include comprehensive training for your entire team, plus ongoing support and resources to ensure everyone is comfortable with the platform."
        },
        {
          id: 3,
          question: "Can I integrate with my existing POS system?",
          answer: "Stampede integrates with most major POS systems including Square, Toast, and Clover. Our technical team will handle the integration setup."
        },
        {
          id: 4,
          question: "What kind of support do you offer?",
          answer: "We provide 24/7 customer support via phone, email, and live chat. Plus dedicated account management for enterprise clients."
        },
        {
          id: 5,
          question: "Is there a contract or can I cancel anytime?",
          answer: "We offer flexible month-to-month plans with no long-term contracts. You can upgrade, downgrade, or cancel at any time."
        }
      ]
    }
  },
  {
    id: 'footer_cta',
    title: 'Footer Call-to-Action',
    type: 'footer_cta',
    isPublished: true,
    content: {
      headline: "Ready to Transform Your Business?",
      subheadline: "Join thousands of hospitality businesses already using Stampede to grow their revenue and delight their customers.",
      ctaPrimary: "Start Free Trial",
      ctaSecondary: "Schedule Demo",
      contactInfo: {
        phone: "1-800-STAMPEDE",
        email: "hello@stampede.ai",
        address: "123 Business Ave, Suite 100, San Francisco, CA 94105"
      },
      socialLinks: [
        { platform: "Facebook", url: "https://facebook.com/stampede" },
        { platform: "Twitter", url: "https://twitter.com/stampede" },
        { platform: "LinkedIn", url: "https://linkedin.com/company/stampede" },
        { platform: "Instagram", url: "https://instagram.com/stampede" }
      ]
    }
  }
];

interface ContentBlockEditorProps {
  block: ContentBlock;
  onSave: (block: ContentBlock) => void;
}

function ContentBlockEditor({ block, onSave }: ContentBlockEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editedBlock, setEditedBlock] = useState<ContentBlock>(block);

  const handleSave = () => {
    onSave(editedBlock);
    setIsOpen(false);
  };

  const renderBlockPreview = () => {
    switch (block.type) {
      case 'hero':
        return (
          <div className="bg-gradient-to-r from-[#FF389A]/20 to-purple-600/20 p-6 rounded-lg border border-gray-700">
            <h1 className="text-2xl font-bold text-white mb-2">{block.content.headline}</h1>
            <p className="text-gray-300 mb-4">{block.content.subheadline}</p>
            <div className="flex space-x-3 mb-4">
              <Button className="bg-[#FF389A] hover:bg-[#E6329C]">{block.content.ctaText}</Button>
              <Button variant="outline">{block.content.ctaSecondary}</Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {block.content.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white mb-2">{block.content.sectionTitle}</h2>
              <p className="text-gray-400">{block.content.sectionSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {block.content.features.slice(0, 2).map((feature: any) => (
                <div key={feature.id} className="p-4 bg-[#1A1A2E] rounded-lg border border-gray-700">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-[#FF389A]/20 rounded-lg flex items-center justify-center">
                      <Star className="h-4 w-4 text-[#FF389A]" />
                    </div>
                    <h3 className="font-medium text-white">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
            {block.content.features.length > 2 && (
              <p className="text-xs text-gray-500 text-center">
                +{block.content.features.length - 2} more features...
              </p>
            )}
          </div>
        );

      case 'process':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-white mb-2">{block.content.sectionTitle}</h2>
              <p className="text-gray-400">{block.content.sectionSubtitle}</p>
            </div>
            <div className="space-y-3">
              {block.content.steps.map((step: any, idx: number) => (
                <div key={step.id} className="flex items-start space-x-3 p-3 bg-[#1A1A2E] rounded-lg border border-gray-700">
                  <div className="w-6 h-6 bg-[#FF389A] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{step.title}</h3>
                    <p className="text-sm text-gray-400">{step.description}</p>
                    <Badge variant="outline" className="mt-1 text-xs">{step.duration}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-white mb-2">{block.content.sectionTitle}</h2>
              <p className="text-gray-400">{block.content.sectionSubtitle}</p>
            </div>
            <div className="space-y-3">
              {block.content.testimonials.slice(0, 2).map((testimonial: any) => (
                <div key={testimonial.id} className="p-4 bg-[#1A1A2E] rounded-lg border border-gray-700">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-white">{testimonial.name}</span>
                        <span className="text-sm text-gray-400">• {testimonial.business}</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">"{testimonial.quote}"</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <Badge variant="outline" className="text-xs">{testimonial.results}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {block.content.testimonials.length > 2 && (
              <p className="text-xs text-gray-500 text-center">
                +{block.content.testimonials.length - 2} more testimonials...
              </p>
            )}
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-white mb-2">{block.content.sectionTitle}</h2>
              <p className="text-gray-400">{block.content.sectionSubtitle}</p>
            </div>
            <div className="space-y-2">
              {block.content.faqs.slice(0, 3).map((faq: any) => (
                <div key={faq.id} className="p-3 bg-[#1A1A2E] rounded-lg border border-gray-700">
                  <div className="flex items-start space-x-2">
                    <MessageSquare className="h-4 w-4 text-[#FF389A] mt-1" />
                    <div>
                      <h4 className="font-medium text-white text-sm">{faq.question}</h4>
                      <p className="text-xs text-gray-400 mt-1">{faq.answer.substring(0, 100)}...</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {block.content.faqs.length > 3 && (
              <p className="text-xs text-gray-500 text-center">
                +{block.content.faqs.length - 3} more questions...
              </p>
            )}
          </div>
        );

      case 'footer_cta':
        return (
          <div className="bg-gradient-to-r from-[#FF389A]/10 to-purple-600/10 p-6 rounded-lg border border-gray-700">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-white mb-2">{block.content.headline}</h2>
              <p className="text-gray-300 mb-4">{block.content.subheadline}</p>
              <div className="flex justify-center space-x-3 mb-4">
                <Button className="bg-[#FF389A] hover:bg-[#E6329C]">{block.content.ctaPrimary}</Button>
                <Button variant="outline">{block.content.ctaSecondary}</Button>
              </div>
            </div>
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-400">{block.content.contactInfo.phone}</span>
              </div>
              <p className="text-xs text-gray-500">{block.content.contactInfo.email}</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 bg-[#1A1A2E] rounded-lg border border-gray-700">
            <p className="text-gray-400">Content preview not available</p>
          </div>
        );
    }
  };

  const renderEditor = () => {
    return (
      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
        <div>
          <Label className="text-gray-300">Block Title</Label>
          <Input
            value={editedBlock.title}
            onChange={(e) => setEditedBlock(prev => ({ ...prev, title: e.target.value }))}
            className="bg-[#1A1A2E] border-gray-600 text-white"
          />
        </div>
        
        <div>
          <Label className="text-gray-300">Content (JSON)</Label>
          <Textarea
            value={JSON.stringify(editedBlock.content, null, 2)}
            onChange={(e) => {
              try {
                const content = JSON.parse(e.target.value);
                setEditedBlock(prev => ({ ...prev, content }));
              } catch {
                // Keep invalid JSON for editing
              }
            }}
            rows={15}
            className="bg-[#1A1A2E] border-gray-600 text-white font-mono text-sm"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`published-${editedBlock.id}`}
            checked={editedBlock.isPublished}
            onChange={(e) => setEditedBlock(prev => ({ ...prev, isPublished: e.target.checked }))}
            className="rounded"
          />
          <Label htmlFor={`published-${editedBlock.id}`} className="text-gray-300">
            Published
          </Label>
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-[#0D0D24] border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">{block.title}</CardTitle>
            <p className="text-sm text-gray-400 capitalize">{block.type.replace('_', ' ')} section</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={block.isPublished ? "default" : "secondary"}>
              {block.isPublished ? "Published" : "Draft"}
            </Badge>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="border-[#FF389A] text-[#FF389A] hover:bg-[#FF389A] hover:text-white">
                  <Edit3 className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0D0D24] border-gray-600 max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-white">Edit {block.title}</DialogTitle>
                </DialogHeader>
                {renderEditor()}
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="bg-[#FF389A] hover:bg-[#E6329C]">
                    <Save className="h-3 w-3 mr-1" />
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {renderBlockPreview()}
      </CardContent>
    </Card>
  );
}

export default function ContentBlocksEditor() {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>(initialContentBlocks);

  const handleSaveBlock = (updatedBlock: ContentBlock) => {
    setContentBlocks(prev => 
      prev.map(block => block.id === updatedBlock.id ? updatedBlock : block)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Landing Page Content Blocks</h2>
          <p className="text-gray-400">Edit individual sections of your front-facing website</p>
        </div>
        <Button className="bg-[#FF389A] hover:bg-[#E6329C]">
          <Image className="h-4 w-4 mr-2" />
          Manage Images
        </Button>
      </div>

      <div className="grid gap-6">
        {contentBlocks.map((block) => (
          <ContentBlockEditor
            key={block.id}
            block={block}
            onSave={handleSaveBlock}
          />
        ))}
      </div>
    </div>
  );
}