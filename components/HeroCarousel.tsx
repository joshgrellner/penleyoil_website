'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import { SITE_CONFIG } from '@/lib/config';

interface Slide {
  id: number;
  badge: string;
  title: string;
  titleHighlight?: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
  backgroundImage: string;
  backgroundAlt: string;
}

const slides: Slide[] = [
  {
    id: 1,
    badge: 'SERVING OKLAHOMA SINCE 1958',
    title: "Oklahoma's Premier",
    titleHighlight: 'Fuel & DEF',
    description: 'Next-day fuel delivery • Guaranteed DEF supply • Free tank rentals • 24/7 emergency service available',
    primaryCTA: {
      text: 'Schedule a Delivery →',
      href: '/contact?quote=true'
    },
    secondaryCTA: {
      text: `📞 ${SITE_CONFIG.contact.phone}`,
      href: `tel:${SITE_CONFIG.contact.phoneRaw}`
    },
    backgroundImage: '/images/home/home-hero-1.png',
    backgroundAlt: 'Penley Oil fuel delivery bobtail truck refilling commercial fuel tank at Oklahoma construction site'
  },
  {
    id: 2,
    badge: 'NEW PARTNERSHIP ANNOUNCEMENT',
    title: 'Now Distributing',
    titleHighlight: 'MULTI SEAL',
    description: 'Industrial tire sealant that reduces flats by 95% • Lifetime protection • Perfect for fleets and heavy equipment',
    primaryCTA: {
      text: 'Learn About MULTI SEAL →',
      href: '/multiseal'
    },
    secondaryCTA: {
      text: 'Request Information',
      href: '/contact?quote=true'
    },
    backgroundImage: '/images/tanks/tanks-hero.jpg',
    backgroundAlt: 'MULTI SEAL tire sealant protection for commercial vehicles'
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative text-white py-24 md:py-40 overflow-hidden min-h-[600px] md:min-h-[700px]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={slide.backgroundImage}
              alt={slide.backgroundAlt}
              fill
              priority={index === 0}
              quality={95}
              className="object-cover object-center scale-95"
              sizes="100vw"
            />
            {/* Different gradient overlay for MULTI SEAL slide */}
            {slide.id === 2 ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-[--penley-green-dark]/85 to-black/80"></div>
                <div className="absolute inset-0 bg-[--penley-gold]/10"></div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-[--penley-green-dark]/70 to-transparent"></div>
                <div className="absolute inset-0 bg-[--penley-green-dark]/30"></div>
              </>
            )}
          </div>

          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[--penley-gold] opacity-10 rounded-full blur-3xl z-[1]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[--penley-gold] opacity-5 rounded-full blur-3xl z-[1]"></div>

          <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
            <div className="max-w-5xl">
              <div className="inline-flex items-center bg-[--penley-gold]/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-bold mb-8 border border-[--penley-gold]/30">
                <span className="text-[--penley-gold]">★</span>
                <span className="ml-2">{slide.badge}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.5)' }}>
                {slide.title}
                {slide.titleHighlight && (
                  <>
                    <br />
                    <span className="text-[--penley-gold]" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9), -1px -1px 2px rgba(0,0,0,0.6)' }}>
                      {slide.titleHighlight}
                    </span>
                    {slide.id === 2 && <sup className="text-3xl md:text-4xl">®</sup>}
                    {slide.id === 1 && ' Distributor'}
                  </>
                )}
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-gray-100 font-medium max-w-3xl leading-relaxed" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.5)' }}>
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton href={slide.primaryCTA.href} size="lg">
                  {slide.primaryCTA.text}
                </CTAButton>
                <CTAButton href={slide.secondaryCTA.href} variant="outline" size="lg">
                  {slide.secondaryCTA.text}
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full ${
              index === currentSlide
                ? 'bg-[--penley-gold] w-8 h-3'
                : 'bg-white/50 hover:bg-white/70 w-3 h-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
