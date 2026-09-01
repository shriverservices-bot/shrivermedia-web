import React from "react";
import { createRoot } from "react-dom/client";
import MetroHero from "@/components/ui/scroll-locked-video-hero";
import "./tailwind.css";

// Mount the Scroll-Locked Video Hero on the front page
const canvasElement = document.getElementById("react-hero-canvas");
if (canvasElement) {
  const canvasRoot = createRoot(canvasElement);
  canvasRoot.render(
    <React.StrictMode>
      <MetroHero
        title="JSHRIVER MEDIA"
        tagline="Engineering high-performance digital experiences."
        signature={false}
      />
    </React.StrictMode>
  );
}
