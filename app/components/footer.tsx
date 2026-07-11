'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Flag from 'react-flagkit';

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({ code: 'en', label: 'English', flag: 'GB' });

  const languages = [
    { code: 'en', label: 'English', flag: 'GB' },
    { code: 'es', label: 'Español', flag: 'ES' },
    { code: 'fr', label: 'Français', flag: 'FR' },
    { code: 'de', label: 'Deutsch', flag: 'DE' },
  ];

  const selectLanguage = (lang: any) => {
    setSelectedLang(lang);
    setIsOpen(false);
    // Trigger locale change here (e.g., with i18n)
  };

  return (
    <footer className="relative min-h-[500px] md:min-h-[400px] flex items-center justify-center px-6 overflow-hidden border-t border-white/5">
      <Image
        src="https://res.cloudinary.com/dc6xthiol/image/upload/v1783737990/cover14_c2gxjf.jpg"
        alt="Footer background"
        fill
        className="object-cover object-bottom"
        quality={90}
        priority
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-7xl w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans-display tracking-widest uppercase text-center md:text-left">
        {/* Social links */}
        <div className="flex gap-8 text-white/80">
          <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
          <Link href="#" className="hover:text-white transition-colors">Facebook</Link>
          <Link href="#" className="hover:text-white transition-colors">Pinterest</Link>
        </div>

        {/* Language selector */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors px-3 py-1 border border-white/20 rounded-md hover:border-white/50"
          >
            <Flag country={selectedLang.flag} size={20} />
            <span>{selectedLang.label}</span>
            <svg
              className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute bottom-full mb-2 right-0 bg-black/90 backdrop-blur-sm border border-white/20 rounded-md shadow-lg min-w-[140px] overflow-hidden">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => selectLanguage(lang)}
                  className={`w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 ${
                    selectedLang.code === lang.code ? 'bg-white/5' : ''
                  }`}
                >
                  <Flag country={lang.flag} size={20} />
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="text-white">
          © {new Date().getFullYear()} Wild Escapes ®
        </p>
      </div>
    </footer>
  );
}