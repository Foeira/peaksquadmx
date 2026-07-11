'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { createPortal } from 'react-dom';

// Carousel Card Component – now using div instead of Link
// Carousel Card Component
// Carousel Card Component
// Carousel Card Component
// Carousel Card Component – with forced styles
function DestinationCard({ dest, index, onClick }: { dest: any; index: number; onClick: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const hasMultipleImages = dest.images && dest.images.length > 1;

  useEffect(() => {
    if (isHovering && hasMultipleImages) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % dest.images.length);
      }, 1500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentImageIndex(0);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering, dest.images, hasMultipleImages]);

  const currentImage = dest.images?.[currentImageIndex] || dest.image;

  return (
    <div
      className="group relative aspect-[4/5] overflow-hidden bg-zinc-900 cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => onClick()}
    >
      <Image
        src={currentImage}
        alt={dest.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Dark vignette – two layers: solid black + gradient */}
      <div
        className="absolute inset-0 transition-opacity duration-500 z-10"
        style={{
          opacity: isHovering ? 1 : 0,
          background: 'rgba(0,0,0,0.65)',
          backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
        }}
      />

      {/* Text overlay – bottom left, bold, white with shadow */}
      <div
        className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 z-20"
        style={{
          transform: isHovering ? 'translateY(0)' : 'translateY(20px)',
          opacity: isHovering ? 1 : 0,
        }}
      >
        <h3
          className="text-3xl md:text-4xl font-serif-display font-bold"
          style={{
            color: 'white !important',
            textShadow: '0 2px 20px rgba(0,0,0,0.8)',
          }}
        >
          {dest.name}
        </h3>
        <p
          className="text-lg md:text-xl font-sans-display font-semibold"
          style={{
            color: 'rgba(255,255,255,0.9) !important',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}
        >
          {dest.location}
        </p>
      </div>

      {/* Index number */}
      <span className="absolute top-4 left-4 text-xs text-white/20 font-sans-display z-10">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Carousel dots */}
      {hasMultipleImages && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
          {dest.images.map((_: any, i: number) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentImageIndex ? 'w-4 bg-white/80' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Modal Component
function DestinationModal({ dest, onClose }: { dest: any; onClose: () => void }) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  // Portal to body, with forced red background
  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-red-500"
      onClick={onClose}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div
        className="bg-white text-black p-8 rounded-lg max-w-md"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', maxWidth: '400px' }}
      >
        <h2 className="text-2xl font-bold mb-4">Modal is working!</h2>
        <p className="mb-4">Destination: {dest.name}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}

export default function Home() {
  const [selectedDest, setSelectedDest] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (dest: any) => {
    console.log('Opening modal for:', dest.name);
    setSelectedDest(dest);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
    setSelectedDest(null);
  };

  console.log('Home render, isModalOpen:', isModalOpen, 'selectedDest:', selectedDest);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dc6xthiol/image/upload/v1783727930/iztamod1_aq3osi.jpg"
          alt="Nature landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/60 mb-6 font-sans-display">
            Discover the Unseen
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif-display font-light leading-[1.1] mb-6">
            Peak Squad
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Luxury travel experiences crafted for those who seek the extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#destinations"
              className="px-10 py-3 border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-widest uppercase font-sans-display"
            >
              Explore
            </Link>
            <Link
              href="#contact"
              className="px-10 py-3 border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-widest uppercase font-sans-display"
            >
              Inquire
            </Link>
          </div>
        </div>

      </section>

      {/* DESTINATIONS */}
      <section id="destinations" className="py-24 w-full">
        <div className="text-center mb-16 px-6 max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-3 font-sans-display">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-serif-display font-light">
            Spectacular Destinations
          </h2>
          <div className="w-12 h-px bg-white/20 mx-auto mt-4" />
        </div>

        <div
          className="w-full"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 0,
          }}
        >
          <style>{`
            @media (min-width: 640px) {
              .carousel-grid {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
            @media (min-width: 1024px) {
              .carousel-grid {
                grid-template-columns: repeat(3, 1fr) !important;
              }
            }
          `}</style>

          <div className="carousel-grid w-full" style={{ display: 'grid', gap: 0 }}>
            {destinations.map((dest, index) => (
              <DestinationCard
                key={dest.id}
                dest={dest}
                index={index}
                onClick={() => openModal(dest)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 px-6 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] overflow-hidden ">
            <Image
              src="https://res.cloudinary.com/dc6xthiol/image/upload/v1783735412/cover5_to9kqg.jpg"
              alt="Adventure"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4 font-sans-display">
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl font-serif-display font-light mb-6 leading-tight">
              Curated Journeys,<br />Timeless Memories
            </h2>
            <p className="text-white/60 font-light leading-relaxed mb-8">
              We believe travel is not just about destinations—it's about the stories you collect along the way. 
              Every itinerary is a carefully composed narrative, designed to reveal the soul of a place.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-3 text-sm tracking-widest uppercase font-sans-display border-b border-white/20 pb-1 hover:border-white transition-colors"
            >
              Discover More
              <span className="text-white/40">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-3 font-sans-display">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-serif-display font-light">
            What Our Travelers Say
          </h2>
          <div className="w-12 h-px bg-white/20 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="border border-white/10 p-8 hover:border-white/30 transition-colors">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-white/30 text-sm">★</span>
                ))}
              </div>
              <p className="text-white/70 font-light leading-relaxed mb-6">“{t.quote}”</p>
              <div>
                <p className="text-sm font-serif-display">{t.name}</p>
                <p className="text-xs text-white/40 font-sans-display">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4 font-sans-display">
            Start Your Journey
          </p>
          <h2 className="text-4xl md:text-6xl font-serif-display font-light mb-6 leading-tight">
            Let's Create<br />Something Unforgettable
          </h2>
          <p className="text-white/50 font-light max-w-md mx-auto mb-10">
            Reach out and let us craft a travel experience that speaks to your soul.
          </p>
          <Link
            href="#"
            className="inline-block px-12 py-4 border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-widest uppercase font-sans-display"
          >
            Get in Touch
          </Link>
        </div>
      </section>

{/* FOOTER – brand name at bottom right */}
<footer className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center px-6 overflow-hidden border-t border-white/5">
  {/* Background image – aligned to bottom */}
  <Image
    src="https://res.cloudinary.com/dc6xthiol/image/upload/v1783735412/cover5_to9kqg.jpg"
    alt="Footer background"
    fill
    className="object-cover object-bottom"
    quality={90}
    priority
  />
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Content – social links on left, brand name on right */}
  <div className="relative z-10 max-w-7xl w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans-display tracking-widest uppercase text-center md:text-left">
    {/* Social links – left side */}
    <div className="flex gap-8 text-white/80">
      <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
      <Link href="#" className="hover:text-white transition-colors">Facebook</Link>
      <Link href="#" className="hover:text-white transition-colors">Pinterest</Link>
    </div>

    {/* Brand name – right side, fully white */}
    <p className="text-white">
      © {new Date().getFullYear()} Wild Escapes ®
    </p>
  </div>
</footer>

      {/* MODAL */}
      {isModalOpen && selectedDest && (
        <DestinationModal dest={selectedDest} onClose={closeModal} />
      )}
    </main>
  );
}

// DATA
const destinations = [
  {
    id: 1,
    name: 'Pico de Orizaba',
    location: 'Veracruz, Mexico',
    description: 'The highest mountain in Mexico, a dormant volcano offering breathtaking views and challenging climbs for adventurers.',
    images: [
      
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783731719/citla_card1_qniywz.jpg',
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783732137/citlacard2_ww4hao.jpg',
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783727915/citlaCover_vhlwgx.jpg',
    ],
  },
  {
    id: 2,
    name: 'Rancho Quemado',
    location: 'Queretaro',
    description: 'Sail through deep blue fjords surrounded by towering cliffs and cascading waterfalls – a true natural wonder.',
    images: [
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735435/modRQ4_vpw2su.jpg',
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735434/modRQ3_lzsmlu.jpg',
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735435/modRQ5_oaswoo.jpg',
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735433/modRQ1_kxoifc.jpg',
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735418/coverRQ_zhphyr.jpg'
    ],
  },
  {
    id: 3,
    name: 'Mineral El Chico',
    location: 'Hidalgo',
    description: 'Turquoise lakes, snow‑capped peaks, and abundant wildlife – Banff is a paradise for nature lovers.',
    images: [
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783732138/cover7_aajcqi.jpg',
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735422/esc4_ddnalh.jpg',
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783727927/IMG-20230620-WA0050_hdam8l.jpg',
    ],
  },
  {
    id: 4,
    name: 'Nevado de Toluca',
    location: 'Toluca',
    description: 'White‑washed villages clinging to volcanic cliffs, overlooking the deep blue Aegean – pure romance.',
    images: [
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735439/nevmod5_o7hzvs.jpg',
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735438/nevmod3_ydannf.jpg',
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735399/about10_pglrie.jpg',
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735433/malMod4_uxzckh.jpg'
    ],
  },

    {
    id: 5,
    name: 'Arco del Tiempo',
    location: 'Chiapas',
    description: 'The Garden Isle – lush rainforests, dramatic cliffs, and pristine beaches that feel like paradise.',
    images: [
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735415/cover17_ot2dar.jpg',
      
    ],
  },

  {
    id: 6,
    name: 'Iztaccihuatl',
    location: 'Puebla/México',
    description: 'Land of fire and ice – glaciers, volcanoes, geysers, and the magical Northern Lights.',
    images: [
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735431/iztamod2_wwp2fg.jpg',
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735398/about8_tc8eli.webp',
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735431/iztamod1_gmhzjf.jpg'
    ],
  },

      {
    id: 7,
    name: 'Desierto de los Leones',
    location: 'CDMX',
    description: 'The Garden Isle – lush rainforests, dramatic cliffs, and pristine beaches that feel like paradise.',
    images: [
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735410/contact_qoxpuv.jpg',
      
    ],
  },

      {
    id: 8,
    name: 'Ajusco',
    location: 'CDMX',
    description: 'The Garden Isle – lush rainforests, dramatic cliffs, and pristine beaches that feel like paradise.',
    images: [
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735407/ajusMod4_c939np.jpg',
      
    ],
  },

  {
    id: 9,
    name: 'Peña de Bernal',
    location: 'Queretaro',
    description: 'The Garden Isle – lush rainforests, dramatic cliffs, and pristine beaches that feel like paradise.',
    images: [
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735421/esc3_yhsexp.jpg',
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735423/esc5_blvrnj.jpg',
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735424/esc6_b79cnl.jpg'
      
    ],
  },
  {
    id: 10,
    name: 'Amealco',
    location: 'Queretaro',
    description: 'The Garden Isle – lush rainforests, dramatic cliffs, and pristine beaches that feel like paradise.',
    images: [
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735433/modAculco2_k8xuvh.jpg',
      
    ],
  },
  {
    id: 11,
    name: 'Malinche',
    location: 'Tlaxcala',
    description: 'The Garden Isle – lush rainforests, dramatic cliffs, and pristine beaches that feel like paradise.',
    images: [
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735407/ajusMod4_c939np.jpg',
      
    ],
  },
  {
    id: 12,
    name: 'Popocatepetl',
    location: 'Puebla',
    description: 'The Garden Isle – lush rainforests, dramatic cliffs, and pristine beaches that feel like paradise.',
    images: [
      'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735417/coverMontPopo_eiz738.jpg',
      
    ],
  },

];

const testimonials = [
  {
    quote: 'The most breathtaking views I have ever seen. Every detail was thoughtfully curated.',
    name: 'Emily R.',
    location: 'Sydney, Australia',
  },
  {
    quote: 'They transformed our dream trip into reality. A truly life‑changing experience.',
    name: 'Carlos M.',
    location: 'Madrid, Spain',
  },
  {
    quote: 'Impeccable service, stunning locations, and a team that genuinely cares.',
    name: 'Aisha K.',
    location: 'Dubai, UAE',
  },
];