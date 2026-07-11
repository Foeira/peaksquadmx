'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { createPortal } from 'react-dom';
import { destinations } from './data/destinations';
import { testimonials } from './data/testimonials';
import Hero from './components/Hero';
import Footer from './components/footer';


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

  useEffect(() => {
  const logo = document.getElementById('adaptive-logo');
  if (!logo) return;

  // Create a hidden canvas to sample the background
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const updateLogoColor = () => {
    if (!logo || !ctx) return;

    // Get the position of the logo
    const rect = logo.getBoundingClientRect();
    
    // Sample a pixel from the center of the logo
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Set canvas size to 1x1 (we only need 1 pixel)
    canvas.width = 1;
    canvas.height = 1;

    // Draw the pixel from the background
    ctx.drawImage(document.documentElement, x, y, 1, 1, 0, 0, 1, 1);
    
    // Get the pixel data
    const pixelData = ctx.getImageData(0, 0, 1, 1).data;
    const r = pixelData[0];
    const g = pixelData[1];
    const b = pixelData[2];

    // Calculate the opposite (inverted) color
    const invertR = 255 - r;
    const invertG = 255 - g;
    const invertB = 255 - b;

    // Apply the inverted color
    logo.style.color = `rgb(${invertR}, ${invertG}, ${invertB})`;
  };

  // Update on scroll and resize
  updateLogoColor();
  window.addEventListener('scroll', updateLogoColor);
  window.addEventListener('resize', updateLogoColor);

  return () => {
    window.removeEventListener('scroll', updateLogoColor);
    window.removeEventListener('resize', updateLogoColor);
  };
}, []);

  return (

    
    <main className="min-h-screen bg-black text-white">

  {/* Sticky Header – glass effect with white text + shadow */}
<header className="fixed top-0 left-0 w-full z-50 p-4 md:p-6 pointer-events-none">
  <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
    {/* Logo – white with strong shadow for any background */}
    <div className="text-2xl md:text-3xl font-serif-display font-light tracking-wide">
      <span className="text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] inline-block">
        Wild Escapes
      </span>
    </div>

    {/* Navigation links – also white with shadow */}
    <nav className="hidden md:flex gap-8 text-sm tracking-widest uppercase font-sans-display">
      <a href="#destinations" className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] hover:opacity-70 transition">
        Destinations
      </a>
      <a href="#contact" className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] hover:opacity-70 transition">
        Contact
      </a>
    </nav>
  </div>
</header>
     <Hero/>

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
<Footer />

      {/* MODAL */}
      {isModalOpen && selectedDest && (
        <DestinationModal dest={selectedDest} onClose={closeModal} />
      )}
    </main>
  );
}

