import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/AuthProvider';
import { Heart, Users, Star, Gift } from 'lucide-react';

export default function FeedbackAndReferralSection() {
  const [feedbackText, setFeedbackText] = useState('');
  const [referralName, setReferralName] = useState('');
  const [referralContact, setReferralContact] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [isSubmittingReferral, setIsSubmittingReferral] = useState(false);
  
  const { toast } = useToast();
  const { firebaseUser } = useAuth();

  // Hide entire section for logged out users
  if (!firebaseUser) {
    return null;
  }

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) {
      toast({
        title: "Please share your feedback",
        description: "We'd love to hear about your onboarding experience.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingFeedback(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for your feedback!",
        description: "Your review helps us improve the onboarding experience for everyone.",
      });
      setFeedbackText('');
      setIsSubmittingFeedback(false);
    }, 1500);
  };

  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralName.trim() || !referralContact.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "We need both name and contact information for the referral.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    
    if (!emailRegex.test(referralContact) && !phoneRegex.test(referralContact)) {
      toast({
        title: "Invalid contact information",
        description: "Please provide a valid email address or phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingReferral(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Referral submitted successfully!",
        description: "We'll reach out to your referral and keep you updated on their progress.",
      });
      setReferralName('');
      setReferralContact('');
      setIsSubmittingReferral(false);
    }, 1500);
  };

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feedback Block */}
          <Card className="bg-gradient-to-br from-[#0D0D24] to-black border-[#FF389A]/30 hover:border-[#FF389A]/50 transition-all duration-300">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 mb-4">
                    <Heart className="h-8 w-8 text-[#FF389A]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Loved your onboarding?
                  </h3>
                  <p className="text-lg text-gray-300">
                    We'd love your feedback.
                  </p>
                </div>

                <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="feedback" className="text-white text-base">
                      Share your experience
                    </Label>
                    <Textarea
                      id="feedback"
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Tell us what you loved about the onboarding process..."
                      className="bg-[#0D0D24]/50 border-[#FF389A]/30 text-white placeholder-gray-400 min-h-[120px] resize-none"
                      maxLength={500}
                      aria-describedby="feedback-description feedback-counter"
                    />
                    <div className="flex justify-between items-center">
                      <p id="feedback-description" className="text-sm text-gray-400">
                        Help us improve the experience for future users
                      </p>
                      <p id="feedback-counter" className="text-sm text-gray-400">
                        {feedbackText.length} / 500
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmittingFeedback || !feedbackText.trim()}
                    className="w-full bg-[#FF389A] hover:bg-[#E6329C] text-white text-lg h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingFeedback ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Share your experience
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* Referral Block */}
          <Card className="bg-gradient-to-br from-[#0D0D24] to-black border-[#FF389A]/30 hover:border-[#FF389A]/50 transition-all duration-300">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#FF389A]/30 to-[#FF389A]/10 border border-[#FF389A]/30 mb-4">
                    <Users className="h-8 w-8 text-[#FF389A]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Loved Stampede? Let's share it.
                  </h3>
                  <p className="text-lg text-gray-300">
                    Who do you know that should hear about us?
                  </p>
                </div>

                <form onSubmit={handleReferralSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="referral-name" className="text-white text-base">
                        Contact Name
                      </Label>
                      <Input
                        id="referral-name"
                        type="text"
                        value={referralName}
                        onChange={(e) => setReferralName(e.target.value)}
                        placeholder="Enter their full name"
                        className="bg-[#0D0D24]/50 border-[#FF389A]/30 text-white placeholder-gray-400 h-12"
                        maxLength={100}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="referral-contact" className="text-white text-base">
                        Email or Phone
                      </Label>
                      <Input
                        id="referral-contact"
                        type="text"
                        value={referralContact}
                        onChange={(e) => setReferralContact(e.target.value)}
                        placeholder="email@example.com or +1234567890"
                        className="bg-[#0D0D24]/50 border-[#FF389A]/30 text-white placeholder-gray-400 h-12"
                        maxLength={100}
                      />
                    </div>
                  </div>

                  <div className="bg-[#0D0D24]/30 rounded-lg p-4 border border-[#FF389A]/20">
                    <div className="flex items-start gap-3">
                      <Gift className="h-6 w-6 text-[#FF389A] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-semibold mb-1">Special Offer</h4>
                        <p className="text-gray-300 text-sm">
                          Anyone who signs up for a 12-month contract gets a free yearly contact calendar.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmittingReferral || !referralName.trim() || !referralContact.trim()}
                    className="w-full bg-[#FF389A] hover:bg-[#E6329C] text-white text-lg h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingReferral ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Make a Referral
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}