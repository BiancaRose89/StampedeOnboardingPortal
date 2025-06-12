import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/AuthProvider';
import { ExternalLink, Calendar, TrendingUp, Users, Zap, BookOpen, ArrowRight } from 'lucide-react';
import { SiLinkedin, SiX, SiFacebook, SiInstagram } from 'react-icons/si';

export default function FeedbackAndReferralSection() {
  const { firebaseUser } = useAuth();

  // Hide entire section for logged out users
  if (!firebaseUser) {
    return null;
  }

  const blogLinks = [
    { title: "Product Updates", href: "https://stampede.ai/blog/category/product-updates" },
    { title: "Industry Insights", href: "https://stampede.ai/blog/category/industry-insights" },
    { title: "Customer Success", href: "https://stampede.ai/blog/category/customer-success" },
    { title: "Best Practices", href: "https://stampede.ai/blog/category/best-practices" },
    { title: "Technical Guides", href: "https://stampede.ai/blog/category/technical-guides" },
    { title: "Event Coverage", href: "https://stampede.ai/blog/category/events" }
  ];

  const socialLinks = [
    { icon: SiLinkedin, href: "https://linkedin.com/company/stampede-ai", label: "LinkedIn" },
    { icon: SiX, href: "https://twitter.com/stampede_ai", label: "Twitter" },
    { icon: SiFacebook, href: "https://facebook.com/stampede.ai", label: "Facebook" },
    { icon: SiInstagram, href: "https://instagram.com/stampede.ai", label: "Instagram" }
  ];

  return (
    <section className="py-16 bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Featured Blog Post */}
        <div className="mb-16">
          <Card className="bg-gradient-to-br from-[#FF389A]/10 to-[#FF389A]/5 border-[#FF389A]/30 hover:border-[#FF389A]/50 transition-all duration-300">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-2 text-[#FF389A] text-sm font-medium">
                    <Calendar className="h-4 w-4" />
                    January 2025 • Featured Post
                  </div>
                  <h2 className="text-3xl font-bold text-white leading-tight">
                    Build, Build, Build: Scaling Your Hospitality Business
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    This month we're focusing on growth strategies that work. From optimizing your booking flow 
                    to implementing loyalty programs that drive repeat business, discover the tools and tactics 
                    that successful venues use to scale operations while maintaining exceptional guest experiences.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Growth Strategy", "Customer Retention", "Operations", "Technology"].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-[#FF389A]/20 text-[#FF389A] text-sm rounded-full border border-[#FF389A]/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#FF389A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-10 w-10 text-[#FF389A]" />
                    </div>
                    <p className="text-gray-400 text-sm mb-4">5 min read • Most Popular</p>
                  </div>
                  <Button 
                    className="bg-[#FF389A] hover:bg-[#E6329C] text-white px-6 py-3 font-semibold"
                    onClick={() => window.open('https://stampede.ai/blog/build-build-build', '_blank')}
                  >
                    Read Full Article
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog Categories and Social Links */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Blog Categories */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-[#FF389A]" />
              <h3 className="text-2xl font-bold text-white">Explore Our Blog</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {blogLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:border-[#FF389A]/50 hover:text-white hover:bg-[#FF389A]/10 text-left justify-start h-auto p-4"
                  onClick={() => window.open(link.href, '_blank')}
                >
                  <div className="text-left">
                    <div className="font-medium">{link.title}</div>
                  </div>
                  <ExternalLink className="ml-auto h-4 w-4 flex-shrink-0" />
                </Button>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-6 w-6 text-[#FF389A]" />
              <h3 className="text-2xl font-bold text-white">Stay Connected</h3>
            </div>
            
            {/* Social Media Links */}
            <div className="space-y-4">
              <p className="text-gray-300">Follow us for the latest updates, industry insights, and success stories:</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="border-gray-700 text-gray-300 hover:border-[#FF389A]/50 hover:text-white hover:bg-[#FF389A]/10"
                    onClick={() => window.open(social.href, '_blank')}
                  >
                    <social.icon className="h-4 w-4 mr-2" />
                    {social.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { name: "Help Center", href: "https://help.stampede.ai" },
                  { name: "API Documentation", href: "https://docs.stampede.ai" },
                  { name: "Contact Support", href: "https://stampede.ai/contact" },
                  { name: "Feature Requests", href: "https://features.stampede.ai" }
                ].map((link, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="text-gray-400 hover:text-white hover:bg-gray-800 w-full justify-start p-2"
                    onClick={() => window.open(link.href, '_blank')}
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    {link.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © 2025 Stampede AI. All rights reserved. • 
            <Button variant="link" className="text-gray-400 hover:text-white p-1 h-auto" onClick={() => window.open('https://stampede.ai/privacy', '_blank')}>
              Privacy Policy
            </Button> • 
            <Button variant="link" className="text-gray-400 hover:text-white p-1 h-auto" onClick={() => window.open('https://stampede.ai/terms', '_blank')}>
              Terms of Service
            </Button>
          </p>
        </div>
      </div>
    </section>
  );
}