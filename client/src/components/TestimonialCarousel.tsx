import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  company: string;
  quote: string;
  author?: string;
  tagline?: string;
  details?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    company: 'Great British Inn',
    quote: 'Bianca was readily available, created clear workflows, and delivered informative, engaging sessions that helped us maximize our platform potential.',
    tagline: 'Onboarded by Bianca (CSM)',
    details: 'Successfully implemented WiFi marketing, loyalty program, and booking system resulting in 40% increase in repeat customers'
  },
  {
    id: '2',
    company: 'Vino Vita',
    quote: "You're awesome and have done such a great job with our onboarding. The support throughout the process has been exceptional and the results speak for themselves.",
    tagline: 'Onboarded by Bianca (CSM)',
    details: 'Launched comprehensive digital ecosystem including guest WiFi, marketing automation, and review management'
  },
  {
    id: '3',
    company: 'Number 90 UK',
    quote: 'Stampede was the complete opposite of most setups — stress-free, smooth, and incredibly well supported. The team guided us through every step.',
    tagline: 'Onboarded by Bianca (CSM)',
    details: 'Streamlined operations with integrated booking system, loyalty rewards, and automated marketing campaigns'
  },
  {
    id: '4',
    company: 'Great British Inn',
    quote: 'The loyalty scheme we launched has been the shining star of our partnership. Customer engagement has never been stronger.',
    tagline: 'Onboarded by Bianca (CSM)',
    details: 'Implemented punch card loyalty system with SMS marketing integration, achieving 65% customer retention rate'
  },
  {
    id: '5',
    company: 'Ronnie Joice',
    quote: "You're absolutely amazing, Bianca. I genuinely mean that. The level of support and expertise has been outstanding.",
    tagline: 'Onboarded by Bianca (CSM)',
    details: 'Complete digital transformation including WiFi capture, automated reviews, gift card sales, and customer analytics'
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-black py-12 border-b border-[#FF389A]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Section Title */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Client Success Highlights
            </h2>
            <p className="text-[#FF389A] font-medium">
              Real Results, Real Voices
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-[#0D0D24] to-black border-[#FF389A]/30 shadow-2xl overflow-hidden min-h-[350px] max-h-[450px]">
              <CardContent className="p-8 md:p-12 flex items-center justify-center">
                <div className={`text-center space-y-6 transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                  {/* Quote Icon */}
                  <div className="flex justify-center">
                    <div className="p-3 rounded-full bg-[#FF389A]/20 border border-[#FF389A]/30">
                      <Quote className="h-8 w-8 text-[#FF389A]" />
                    </div>
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-xl md:text-2xl font-medium text-gray-200 leading-relaxed max-w-3xl">
                    "{currentTestimonial.quote}"
                  </blockquote>

                  {/* Attribution */}
                  <div className="space-y-3">
                    <div className="text-lg font-bold text-white">
                      — {currentTestimonial.company}
                    </div>
                    {currentTestimonial.tagline && (
                      <div className="text-sm text-[#FF389A] font-medium">
                        {currentTestimonial.tagline}
                      </div>
                    )}
                    {currentTestimonial.details && (
                      <div className="text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed border-t border-[#FF389A]/20 pt-3">
                        {currentTestimonial.details}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-black/50 hover:bg-[#FF389A]/20 border border-[#FF389A]/30 backdrop-blur-sm text-white hover:text-[#FF389A] transition-all duration-200"
              onClick={prevSlide}
              disabled={isAnimating}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-black/50 hover:bg-[#FF389A]/20 border border-[#FF389A]/30 backdrop-blur-sm text-white hover:text-[#FF389A] transition-all duration-200"
              onClick={nextSlide}
              disabled={isAnimating}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Dot Navigation */}
          <div className="flex justify-center space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-[#FF389A] shadow-lg shadow-[#FF389A]/50'
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}