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

        {/* Stampede Footer - Full Width */}
        <div className="space-y-12">
          {/* Header with Logo and Social Icons */}
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-[#FF389A]">Stampede</h2>
              <p className="text-gray-300 text-lg">Bring more customers back.</p>
            </div>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-2"
                  onClick={() => window.open(social.href, '_blank')}
                >
                  <social.icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Four Column Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Contact Us */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-300">Contact us</h3>
              <div className="space-y-3 text-gray-400">
                <p>0131 510 7008</p>
                <p>Find Us - hello@stampede.ai</p>
                <div className="space-y-1">
                  <p>4F The Loft</p>
                  <p>29-30 Maritime Street</p>
                  <p>Edinburgh</p>
                  <p>EH6 6SE</p>
                </div>
              </div>
            </div>

            {/* Product */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-300">Product</h3>
              <div className="space-y-2">
                {[
                  "Table Management",
                  "Marketing & CRM",
                  "Guest Wi-Fi",
                  "Gift Cards",
                  "Reviews",
                  "Analytics",
                  "Loyalty & Rewards"
                ].map((item, index) => (
                  <p key={index} className="text-gray-400 text-sm">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-300">Resources</h3>
              <div className="space-y-2">
                {[
                  "Free Downloads",
                  "Success Stories",
                  "Article and Guides",
                  "Supported Hardware",
                  "Knowledge Base",
                  "Developers"
                ].map((item, index) => (
                  <p key={index} className="text-gray-400 text-sm">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Company */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-300">Company</h3>
              <div className="space-y-2">
                {[
                  "About Us",
                  "Partnerships",
                  "Careers - We're Hiring!",
                  "Cookie Policy",
                  "Press",
                  "Sitemap"
                ].map((item, index) => (
                  <p key={index} className="text-gray-400 text-sm">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Copyright and Legal Links */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Stampede AI Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Button 
                variant="link" 
                className="text-gray-400 hover:text-white p-0 h-auto text-sm" 
                onClick={() => window.open('https://stampede.ai/privacy', '_blank')}
              >
                Privacy Policy
              </Button>
              <Button 
                variant="link" 
                className="text-gray-400 hover:text-white p-0 h-auto text-sm" 
                onClick={() => window.open('https://stampede.ai/saas-agreement', '_blank')}
              >
                SaaS Agreement
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}