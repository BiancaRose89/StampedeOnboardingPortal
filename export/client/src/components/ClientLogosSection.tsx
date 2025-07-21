import { Card } from '@/components/ui/card';

const clientLogos = [
  { name: 'Society', logo: '/assets/logos/society.png' },
  { name: 'Streetfair', logo: '/assets/logos/streetfair.png' },
  { name: 'Whatley Manor', logo: '/assets/logos/whatley-manor.png' },
  { name: 'Cotswold Company', logo: '/assets/logos/cotswold-company.png' },
  { name: 'Lane7', logo: '/assets/logos/lane7.png' },
  { name: 'The Breakfast Club', logo: '/assets/logos/breakfast-club.png' },
  { name: 'Best Western', logo: '/assets/logos/best-western.png' },
  { name: 'Beefeater', logo: '/assets/logos/beefeater.png' }
];

export default function ClientLogosSection() {
  return (
    <section className="bg-black py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              2,200+ venues use Stampede to <span className="text-[#FF389A]">bring customers back</span>
            </h2>
          </div>

          {/* Client Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center justify-items-center">
            {clientLogos.map((client, index) => (
              <div 
                key={index}
                className="flex items-center justify-center h-16 w-full opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              >
                {/* Placeholder for logo - in production you'd use actual logo images */}
                <div className="text-center">
                  <div className="text-gray-400 text-sm font-medium px-2">
                    {client.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}