'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const heroImages = [
    'https://res.cloudinary.com/dc6xthiol/image/upload/v1783727930/iztamod1_aq3osi.jpg',
    'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735411/cover3_afunxx.jpg',
    'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735411/cover2_rnryev.jpg',
    'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735426/img10_r3zcpl.jpg',
    'https://res.cloudinary.com/dc6xthiol/image/upload/v1783735413/cover11_hcstw3.jpg',
    'https://res.cloudinary.com/dc6xthiol/image/upload/v1783802443/IMG-20220910-WA0099_dxl7nt.jpg',
    'https://res.cloudinary.com/dc6xthiol/image/upload/v1783803057/IMG-20220904-WA0023_mnuail.jpg',
    'https://res.cloudinary.com/dc6xthiol/image/upload/v1783803177/IMG-20220829-WA0020_gj69ak.jpg'
  ];

  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden isolate">
      {/* Background image */}
      <div key={heroIndex} className="absolute inset-0 w-full h-full">
        <Image
          src={heroImages[heroIndex]}
          alt="Nature landscape"
          fill
          className="object-cover transition-opacity duration-1000"
          priority
          sizes="100vw"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/60 mb-6 font-sans-display">
          Discover the Unseen
        </p>

        {/* "Peak Squad" with dynamic contrast */}
<h1
  className="text-5xl md:text-7xl lg:text-8xl font-serif-display font-light leading-[1.1] mb-6 inline-block px-6 py-2"
  style={{
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.2)',
  }}
>
  Peak Squad
</h1>


      </div>

    </section>
  );
}