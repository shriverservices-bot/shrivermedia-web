import React from "react";
import { createRoot } from "react-dom/client";
import { HeroScrollDemo } from "./components/HeroScrollDemo";
import { Hero3D } from "./components/Hero3D";
import "./tailwind.css";

// Mount the 3D Hero Gallery Canvas
const canvasElement = document.getElementById("react-hero-canvas");
if (canvasElement) {
  const canvasRoot = createRoot(canvasElement);
  canvasRoot.render(
    <React.StrictMode>
      <Hero3D />
    </React.StrictMode>
  );
}


