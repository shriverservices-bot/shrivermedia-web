import React from "react";
import InfiniteGallery from "./ui/3d-gallery-photography";

export function Hero3D() {
  const sampleImages = [
    { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop', alt: 'Web Design' },
    { src: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop', alt: 'Analytics' },
    { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop', alt: 'Code' },
    { src: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1200&auto=format&fit=crop', alt: 'Marketing' },
    { src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop', alt: 'Photography' },
    { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop', alt: 'Development' },
    { src: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop', alt: 'Design Mockup' },
    { src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop', alt: 'Growth' },
  ];

  return (
    <div className="relative w-full h-[95vh] min-h-[600px] overflow-hidden bg-transparent flex items-center justify-center">
      {/* 3D WebGL Infinite Gallery Background */}
      <div className="absolute inset-0 z-0">
        <InfiniteGallery
          images={sampleImages}
          speed={1.0}
          zSpacing={3.5}
          visibleCount={10}
          fadeSettings={{
            fadeIn: { start: 0.05, end: 0.25 },
            fadeOut: { start: 0.65, end: 0.8 },
          }}
          blurSettings={{
            blurIn: { start: 0.0, end: 0.15 },
            blurOut: { start: 0.65, end: 0.8 },
            maxBlur: 6.0,
          }}
          className="w-full h-full"
        />
        {/* Subtle dark tint to improve text legibility */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>


      {/* Hero Content Overlay */}
      <div className="relative z-10 text-center max-w-[850px] px-5 flex flex-col items-center">
        {/* mix-blend-exclusion makes text change color based on the images underneath */}
        <div className="mix-blend-exclusion text-white mb-6">
          <h1 className="font-sans text-4xl md:text-7xl font-extrabold tracking-tight mb-4 leading-none">
            JSHRIVER <span className="text-emerald-400">MEDIA</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium tracking-wide max-w-[650px] mx-auto opacity-95 leading-relaxed">
            Engineering high-performance digital experiences.
          </p>
        </div>

        {/* Regular rendering for buttons to maintain hover states and colors */}
        <p className="text-gray-300 text-sm md:text-base max-w-[600px] mb-8 leading-relaxed">
          We combine bespoke web design, cinematic videography, and data-driven marketing to build platforms that dominate.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="https://calendly.com/shriverservices"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Start Now
          </a>
          <a href="services.html" className="btn btn-outline">
            Our Services
          </a>
        </div>
      </div>
    </div>

  );
}
