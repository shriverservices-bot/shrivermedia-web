import React from "react";
import InfiniteGallery from "./ui/3d-gallery-photography";

import cheapassPartner from "../../media/cheapass partner.png";
import colePartner from "../../media/cole partner.png";
import riseupPartner from "../../media/riseup partner.png";
import setbreakPartner from "../../media/setbreak partner.png";
import southernPartner from "../../media/southern partner.webp";

export function Hero3D() {
  const sampleImages = [
    { src: cheapassPartner, alt: 'Cheapass Partner' },
    { src: colePartner, alt: 'Cole Partner' },
    { src: riseupPartner, alt: 'Riseup Partner' },
    { src: setbreakPartner, alt: 'Set Break Partner' },
    { src: southernPartner, alt: 'Southern Partner' },
    { src: cheapassPartner, alt: 'Cheapass Partner' },
    { src: colePartner, alt: 'Cole Partner' },
    { src: riseupPartner, alt: 'Riseup Partner' },
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
