import React from "react";
import { createRoot } from "react-dom/client";
import { HeroScrollDemo } from "./components/HeroScrollDemo";
import "./tailwind.css";

const rootElement = document.getElementById("react-hero-scroll");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <HeroScrollDemo />
    </React.StrictMode>
  );
}
