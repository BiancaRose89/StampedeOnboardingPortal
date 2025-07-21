import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star, Wallet, CreditCard, Gift, ArrowRight } from 'lucide-react';

interface LoyaltyCard {
  id: string;
  businessName: string;
  customerName: string;
  cardType: 'punch' | 'points' | 'cashback' | 'vip';
  progress: number;
  maxValue: number;
  reward: string;
  backgroundColor: string;
  textColor: string;
  avatar: string;
  logo: string;
}

const loyaltyCards: LoyaltyCard[] = [
  {
    id: '1',
    businessName: 'BREW & BEAN',
    customerName: 'Sarah M.',
    cardType: 'punch',
    progress: 7,
    maxValue: 10,
    reward: 'Free Coffee',
    backgroundColor: 'from-amber-400 to-orange-500',
    textColor: 'text-white',
    avatar: '👩‍💼',
    logo: '☕'
  },
  {
    id: '2',
    businessName: 'STYLE STUDIO',
    customerName: 'Marcus K.',
    cardType: 'points',
    progress: 850,
    maxValue: 1000,
    reward: '$50 Off Service',
    backgroundColor: 'from-purple-500 to-pink-500',
    textColor: 'text-white',
    avatar: '👨‍💻',
    logo: '✂️'
  },
  {
    id: '3',
    businessName: 'FITNESS FIRST',
    customerName: 'Emma R.',
    cardType: 'cashback',
    progress: 65,
    maxValue: 100,
    reward: '5% Cashback',
    backgroundColor: 'from-green-400 to-blue-500',
    textColor: 'text-white',
    avatar: '👩‍🏫',
    logo: '💪'
  },
  {
    id: '4',
    businessName: 'GOURMET BITES',
    customerName: 'David L.',
    cardType: 'vip',
    progress: 12,
    maxValue: 15,
    reward: 'VIP Status',
    backgroundColor: 'from-gray-800 to-gray-900',
    textColor: 'text-yellow-400',
    avatar: '👨‍🍳',
    logo: '🍽️'
  },
  {
    id: '5',
    businessName: 'TECH REPAIR',
    customerName: 'Lisa T.',
    cardType: 'points',
    progress: 450,
    maxValue: 500,
    reward: 'Free Diagnostic',
    backgroundColor: 'from-blue-600 to-cyan-500',
    textColor: 'text-white',
    avatar: '👩‍🔧',
    logo: '📱'
  },
  {
    id: '6',
    businessName: 'BLOOM FLORIST',
    customerName: 'Rachel P.',
    cardType: 'punch',
    progress: 4,
    maxValue: 8,
    reward: 'Free Bouquet',
    backgroundColor: 'from-pink-400 to-rose-500',
    textColor: 'text-white',
    avatar: '👩‍🌾',
    logo: '🌸'
  }
];

function LoyaltyCardComponent({ card, isActive }: { card: LoyaltyCard; isActive: boolean }) {
  const progressPercentage = (card.progress / card.maxValue) * 100;
  
  return (
    <div className={`
      transform transition-all duration-500 ease-out
      ${isActive ? 'scale-105 shadow-2xl shadow-[#FF389A]/20' : 'scale-95 opacity-70'}
    `}>
      <Card className={`
        w-[280px] h-[180px] relative overflow-hidden border-0
        bg-gradient-to-br ${card.backgroundColor}
        group hover:scale-105 transition-all duration-300
        shadow-xl hover:shadow-2xl hover:shadow-[#FF389A]/30
      `}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 text-6xl opacity-20">{card.logo}</div>
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-white/10 transform translate-x-8 translate-y-8"></div>
        </div>
        
        {/* Card Content */}
        <div className="relative h-full p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className={`font-bold text-lg ${card.textColor} tracking-wider`}>
                {card.businessName}
              </h3>
              <div className="text-2xl">{card.logo}</div>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <div className="text-2xl">{card.avatar}</div>
              <span className={`text-sm ${card.textColor} opacity-90`}>{card.customerName}</span>
            </div>
          </div>
          
          <div>
            {/* Progress Section */}
            <div className="mb-3">
              {card.cardType === 'punch' ? (
                <div className="flex gap-1">
                  {Array.from({ length: card.maxValue }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full border-2 ${
                        i < card.progress 
                          ? 'bg-white border-white' 
                          : 'bg-transparent border-white/50'
                      }`}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className={card.textColor}>{card.progress}</span>
                    <span className={`${card.textColor} opacity-70`}>/{card.maxValue}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-white to-white/80 transition-all duration-1000 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Reward */}
            <div className={`text-sm font-semibold ${card.textColor} flex items-center gap-1`}>
              <Gift className="h-4 w-4" />
              {card.reward}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function LoyaltyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % loyaltyCards.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % loyaltyCards.length);
    setIsAutoPlaying(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + loyaltyCards.length) % loyaltyCards.length);
    setIsAutoPlaying(false);
  };

  const goToCard = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="space-y-8 mt-16">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#FF389A]/20 to-[#00D98B]/20 border border-[#FF389A]/30">
            <Wallet className="h-8 w-8 text-[#FF389A]" />
          </div>
          <h2 className="text-4xl font-bold text-white uppercase tracking-wider">
            See Loyalty In Action
          </h2>
        </div>
        
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Real customer loyalty cards from businesses using Stampede. 
          Watch how your customers will engage with your brand every day.
        </p>
        
        <div className="flex items-center justify-center gap-4 mt-6">
          <Badge className="bg-[#FF389A]/20 text-[#FF389A] border-[#FF389A]/30 px-4 py-2 text-sm font-bold">
            <Star className="h-4 w-4 mr-2" />
            REAL CUSTOMER DATA
          </Badge>
          <Badge className="bg-[#00D98B]/20 text-[#00D98B] border-[#00D98B]/30 px-4 py-2 text-sm font-bold">
            <CreditCard className="h-4 w-4 mr-2" />
            MOBILE WALLET READY
          </Badge>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Main Carousel */}
        <div 
          className="flex gap-6 items-center px-4 h-[240px] overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div 
            className="flex gap-6 transition-transform duration-700 ease-out"
            style={{ 
              transform: `translateX(-${currentIndex * (280 + 24)}px)`,
              width: `${loyaltyCards.length * (280 + 24)}px`
            }}
          >
            {loyaltyCards.map((card, index) => (
              <LoyaltyCardComponent
                key={card.id}
                card={card}
                isActive={index === currentIndex}
              />
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#0D0D24]/80 border-[#FF389A]/30 hover:bg-[#FF389A]/20 backdrop-blur-sm z-10"
          onClick={prevCard}
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0D0D24]/80 border-[#FF389A]/30 hover:bg-[#FF389A]/20 backdrop-blur-sm z-10"
          onClick={nextCard}
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {loyaltyCards.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#FF389A] scale-125 shadow-lg shadow-[#FF389A]/50' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              onClick={() => goToCard(index)}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-6 mt-12">
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-white">
            Ready to Create Your Own Loyalty Program?
          </h3>
          <p className="text-gray-300 max-w-xl mx-auto">
            Join hundreds of businesses building customer loyalty with Stampede's mobile wallet integration.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button className="bg-gradient-to-r from-[#FF389A] to-[#E6329C] hover:from-[#E6329C] hover:to-[#FF389A] text-white px-8 py-4 font-bold text-lg shadow-lg shadow-[#FF389A]/30 transition-all duration-300 hover:scale-105">
            Book a Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            className="border-[#00D98B] text-[#00D98B] hover:bg-[#00D98B]/10 px-8 py-4 font-bold text-lg"
          >
            View All Features
          </Button>
        </div>
      </div>
    </div>
  );
}