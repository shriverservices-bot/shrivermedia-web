import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, BarChart3, Video, Settings, RotateCcw, ArrowRight } from "lucide-react";

type TabType = "design" | "marketing" | "video";

export function InteractiveAgencyHub() {
  const [activeTab, setActiveTab] = useState<TabType>("design");

  // Tab 1: Design Engine State
  const [radius, setRadius] = useState<number>(16);
  const [glow, setGlow] = useState<number>(15);
  const [hue, setHue] = useState<number>(150); // Emerald default
  const [darkGlass, setDarkGlass] = useState<boolean>(true);

  // Tab 2: Marketing Simulator State
  const [seoActive, setSeoActive] = useState<boolean>(false);
  const [designActive, setDesignActive] = useState<boolean>(false);
  const [adsActive, setAdsActive] = useState<boolean>(false);
  const [conversionRate, setConversionRate] = useState<number>(1.2);

  // Tab 3: Cinematic Grader State
  const [sliderPercent, setSliderPercent] = useState<number>(50);
  const graderContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Dynamic conversion calculator hook
  useEffect(() => {
    let base = 1.2;
    if (designActive) base += 1.2;
    if (adsActive) base += 2.4;
    if (seoActive) base += 2.6;
    
    // Animate conversion rate counter
    let current = conversionRate;
    const step = (base - current) / 10;
    let frame = 0;
    
    const interval = setInterval(() => {
      frame++;
      current += step;
      setConversionRate(Math.min(Math.max(parseFloat(current.toFixed(1)), 1.2), 7.4));
      if (frame >= 10) {
        setConversionRate(base);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [seoActive, designActive, adsActive]);

  // Video Tab slider event handlers
  const handleGraderMove = (clientX: number) => {
    if (!graderContainerRef.current) return;
    const rect = graderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPercent(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleGraderMove(e.touches[0].clientX);
    }
  };

  // Re-run spotlight bindings when tabs change
  useEffect(() => {
    if ((window as any).initCardSpotlights) {
      setTimeout(() => (window as any).initCardSpotlights(), 100);
    }
  }, [activeTab]);

  // SVG Chart path calculation
  const getSimulatedPath = () => {
    let y1 = 170;
    let y2 = 160;
    let y3 = 150;

    if (designActive && !adsActive && !seoActive) { y1 = 140; y2 = 110; y3 = 85; }
    else if (!designActive && adsActive && !seoActive) { y1 = 130; y2 = 90; y3 = 60; }
    else if (!designActive && !adsActive && seoActive) { y1 = 120; y2 = 80; y3 = 45; }
    else if (designActive && adsActive && !seoActive) { y1 = 100; y2 = 60; y3 = 35; }
    else if (designActive && !adsActive && seoActive) { y1 = 90; y2 = 50; y3 = 25; }
    else if (!designActive && adsActive && seoActive) { y1 = 80; y2 = 45; y3 = 20; }
    else if (designActive && adsActive && seoActive) { y1 = 50; y2 = 25; y3 = 10; }

    return `M 20 185 C 120 ${y1}, 240 ${y2}, 380 ${y3}`;
  };

  return (
    <section className="py-10 px-[5%] max-w-[1250px] mx-auto z-10 relative">

      <div className="section-header animate-on-scroll">
        <h2>Experience <span>Our Capabilities</span></h2>
        <p>Use our interactive simulator to explore the performance, design depth, and cinematic precision we bring to every partnership.</p>
      </div>

      {/* Tabs Menu Container */}
      <div className="flex justify-center mb-10 animate-on-scroll">
        <div className="flex p-1.5 bg-black/40 backdrop-blur-md border border-emerald-500/10 rounded-full">
          <button
            onClick={() => setActiveTab("design")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all relative ${
              activeTab === "design" ? "text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            {activeTab === "design" && (
              <motion.div
                layoutId="activeTabBg"
                className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full z-0"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles size={16} /> Design Engine
            </span>
          </button>

          <button
            onClick={() => setActiveTab("marketing")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all relative ${
              activeTab === "marketing" ? "text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            {activeTab === "marketing" && (
              <motion.div
                layoutId="activeTabBg"
                className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full z-0"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <BarChart3 size={16} /> Growth Simulator
            </span>
          </button>

          <button
            onClick={() => setActiveTab("video")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all relative ${
              activeTab === "video" ? "text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            {activeTab === "video" && (
              <motion.div
                layoutId="activeTabBg"
                className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full z-0"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Video size={16} /> Cinematic Grader
            </span>
          </button>
        </div>
      </div>

      {/* Main Showcase Panel */}
      <div className="card min-h-[500px] w-full p-8 md:p-12 animate-on-scroll relative overflow-hidden">
        <AnimatePresence mode="wait">
          {/* TAB 1: DESIGN ENGINE */}
          {activeTab === "design" && (
            <motion.div
              key="design-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Sliders Console */}
              <div className="lg:col-span-5 flex flex-col gap-6 relative z-10">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-1">Interactive Studio</span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Custom UI Customizer</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Adjust the sliders to fine-tune visual parameters. We craft custom codebases, avoiding rigid layout templates to ensure your digital presence is completely unique.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Accent Color Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-gray-300">
                      <span>Accent Hue Color</span>
                      <span style={{ color: `hsl(${hue}, 85%, 60%)` }}>{hue}° Hue</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={hue}
                      onChange={(e) => setHue(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-black/60 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                    />
                  </div>

                  {/* Corner Radius Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-gray-300">
                      <span>Corner Roundness</span>
                      <span>{radius}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="48"
                      value={radius}
                      onChange={(e) => setRadius(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-black/60 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                    />
                  </div>

                  {/* Glow Intensity Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-gray-300">
                      <span>Glow Intensity</span>
                      <span>{glow}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={glow}
                      onChange={(e) => setGlow(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-black/60 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                    />
                  </div>

                  {/* Toggle Glass backing */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-semibold text-gray-300">Deepen Glass Contrast</span>
                    <button
                      onClick={() => setDarkGlass(!darkGlass)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        darkGlass ? "bg-emerald-500" : "bg-black/60"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          darkGlass ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => {
                      setRadius(16);
                      setGlow(15);
                      setHue(150);
                      setDarkGlass(true);
                    }}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    <RotateCcw size={12} /> Reset Parameters
                  </button>
                </div>
              </div>

              {/* Visual Showcase Box */}
              <div className="lg:col-span-7 flex justify-center items-center py-6 min-h-[350px]">
                <div
                  style={{
                    borderRadius: `${radius}px`,
                    boxShadow: glow > 0 ? `0 10px 40px -10px rgba(0,0,0,0.5), 0 0 ${glow}px -2px hsl(${hue}, 80%, 55%)` : "0 10px 40px -10px rgba(0,0,0,0.5)",
                    borderColor: `hsl(${hue}, 60%, 40%, 0.3)`,
                    backgroundColor: darkGlass ? "rgba(4, 8, 4, 0.75)" : "rgba(20, 30, 20, 0.3)",
                  }}
                  className="w-full max-w-[420px] p-8 border backdrop-blur-xl transition-all duration-300 relative group"
                >
                  {/* Spotlight simulation circle */}
                  <div 
                    style={{ background: `radial-gradient(120px circle at 50% 50%, hsl(${hue}, 80%, 65%, 0.15), transparent 70%)` }}
                    className="absolute inset-0 opacity-60 pointer-events-none rounded-[inherit]" 
                  />
                  
                  <div className="flex items-center justify-between mb-8">
                    <span 
                      style={{ color: `hsl(${hue}, 90%, 60%)`, backgroundColor: `hsl(${hue}, 90%, 60%, 0.08)`, borderColor: `hsl(${hue}, 90%, 60%, 0.2)` }}
                      className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                    >
                      Bespoke Engine
                    </span>
                    <Settings size={16} className="text-gray-500 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2 leading-snug">
                    Where aesthetics meet <span style={{ color: `hsl(${hue}, 90%, 65%)` }}>uncompromising code.</span>
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6">
                    Our digital architecture features GPU-accelerated motion coordinates, advanced layout parameters, and fluid styling variables.
                  </p>

                  <div className="space-y-3">
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 rounded-full transition-all duration-500" style={{ background: `linear-gradient(to right, hsl(${hue}, 80%, 55%), hsl(${hue + 40}, 80%, 50%))` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500 font-semibold">
                      <span>PERFORMANCE INDEX</span>
                      <span style={{ color: `hsl(${hue}, 90%, 65%)` }}>99/100 LIGHTHOUSE</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: GROWTH SIMULATOR */}
          {activeTab === "marketing" && (
            <motion.div
              key="marketing-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Marketing Toggles */}
              <div className="lg:col-span-5 flex flex-col gap-6 relative z-10">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-1">Growth Engine</span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Conversion Calculator</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Toggle services to see how JShriver Media engineering impacts user engagement and conversions. Our campaigns focus on metrics, not vanity metrics.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Web Redesign Toggle */}
                  <button
                    onClick={() => setDesignActive(!designActive)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
                      designActive
                        ? "bg-emerald-500/10 border-emerald-500/30 text-white"
                        : "bg-black/30 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    <div>
                      <h5 className="font-bold text-sm">Bespoke UX Re-architecture</h5>
                      <p className="text-[11px] text-gray-400 mt-0.5">Custom layout logic & speed tuning</p>
                    </div>
                    <div className={`h-5 w-5 rounded-md border flex items-center justify-center transition-colors ${
                      designActive ? "bg-emerald-500 border-emerald-500 text-black" : "border-white/20"
                    }`}>
                      {designActive && <span className="text-[10px] font-bold">✓</span>}
                    </div>
                  </button>

                  {/* Google Ads Toggle */}
                  <button
                    onClick={() => setAdsActive(!adsActive)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
                      adsActive
                        ? "bg-emerald-500/10 border-emerald-500/30 text-white"
                        : "bg-black/30 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    <div>
                      <h5 className="font-bold text-sm">Targeted Cinematic Advertising</h5>
                      <p className="text-[11px] text-gray-400 mt-0.5">High-retention video marketing campaigns</p>
                    </div>
                    <div className={`h-5 w-5 rounded-md border flex items-center justify-center transition-colors ${
                      adsActive ? "bg-emerald-500 border-emerald-500 text-black" : "border-white/20"
                    }`}>
                      {adsActive && <span className="text-[10px] font-bold">✓</span>}
                    </div>
                  </button>

                  {/* SEO Boost Toggle */}
                  <button
                    onClick={() => setSeoActive(!seoActive)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
                      seoActive
                        ? "bg-emerald-500/10 border-emerald-500/30 text-white"
                        : "bg-black/30 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    <div>
                      <h5 className="font-bold text-sm">High-Performance Authority SEO</h5>
                      <p className="text-[11px] text-gray-400 mt-0.5">Greenville & global positioning logic</p>
                    </div>
                    <div className={`h-5 w-5 rounded-md border flex items-center justify-center transition-colors ${
                      seoActive ? "bg-emerald-500 border-emerald-500 text-black" : "border-white/20"
                    }`}>
                      {seoActive && <span className="text-[10px] font-bold">✓</span>}
                    </div>
                  </button>
                </div>
              </div>

              {/* Chart Visualizer */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div className="w-full bg-black/45 border border-emerald-500/10 rounded-2xl p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Real-time simulation</span>
                      <h4 className="text-white font-bold text-base mt-0.5">Conversion Growth Curves</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Projected Rate</div>
                      <div className="text-2xl md:text-3xl font-extrabold text-white mt-0.5">{conversionRate}%</div>
                    </div>
                  </div>

                  {/* Animated Chart Frame */}
                  <div className="w-full h-[180px] bg-black/20 border border-white/5 rounded-lg relative overflow-hidden flex items-end">
                    {/* SVG Grid Overlay */}
                    <div className="absolute inset-0 grid grid-cols-5 grid-rows-4 pointer-events-none opacity-[0.03]">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="border-t border-l border-white" />
                      ))}
                    </div>

                    <svg className="w-full h-full absolute inset-0 z-10" viewBox="0 0 400 200" preserveAspectRatio="none">
                      {/* Grid Bottom Base line */}
                      <line x1="20" y1="185" x2="380" y2="185" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      
                      {/* Gradient Fill under path */}
                      <defs>
                        <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Line Chart path */}
                      <motion.path
                        d={getSimulatedPath()}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        animate={{ d: getSimulatedPath() }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      />
                    </svg>

                    {/* Chart markers */}
                    <div className="absolute left-5 bottom-2 text-[9px] font-bold text-gray-600">LAUNCH</div>
                    <div className="absolute right-5 bottom-2 text-[9px] font-bold text-emerald-400">90 DAYS AFTER</div>
                  </div>
                </div>

                <div className="mt-6 text-center text-xs text-gray-500 leading-relaxed max-w-[420px]">
                  {designActive || adsActive || seoActive ? (
                    <p>
                      Integrating digital media modules can boost traffic flow conversion indexes by up to{" "}
                      <strong className="text-emerald-400 font-bold">
                        {((conversionRate / 1.2) * 100 - 100).toFixed(0)}%
                      </strong>.
                    </p>
                  ) : (
                    <p>Select toggle strategies on the console menu to plot engineering results.</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: CINEMATIC GRADER */}
          {activeTab === "video" && (
            <motion.div
              key="video-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Grader Controls */}
              <div className="lg:col-span-5 flex flex-col gap-6 relative z-10">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-1">Production Suite</span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Cinematic Color Grader</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Drag the slider across our Greenville cityscape image. Experience the contrast between flat camera output (raw log) and our custom graded dynamic range. We bring high-end production value to every frame.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-black/40 border border-emerald-500/10 rounded-xl space-y-2.5">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Log Profile (Flat)</span>
                      <span>Graded Cinematic</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 font-bold">RAW LOG</span>
                      <div className="h-1 bg-white/5 flex-grow rounded-full relative">
                        <div 
                          className="absolute h-full bg-emerald-400 rounded-full" 
                          style={{ width: `${sliderPercent}%` }} 
                        />
                      </div>
                      <span className="text-xs text-emerald-400 font-bold">REC.709 PRO</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 leading-relaxed italic">
                    💡 Hover & drag the vertical green line in the media preview panel to compare colors.
                  </div>
                </div>
              </div>

              {/* Slider Visualizer Container */}
              <div className="lg:col-span-7 flex justify-center">
                <div
                  ref={graderContainerRef}
                  onMouseMove={(e) => {
                    if (isDragging || e.buttons === 1) handleGraderMove(e.clientX);
                  }}
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                  onTouchMove={handleTouchMove}
                  onTouchStart={() => setIsDragging(true)}
                  onTouchEnd={() => setIsDragging(false)}
                  className="w-full max-w-[480px] h-[300px] bg-black rounded-2xl border border-white/10 overflow-hidden relative select-none cursor-ew-resize"
                >
                  {/* Image 1: Graded (Full Background) */}
                  <img
                    src="media/reedy.jpg"
                    alt="Cinematic Graded"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    draggable="false"
                  />

                  {/* Image 2: Flat Raw Log (Overlay Div) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPercent}%`, borderRight: '2px solid #10b981' }}
                  >
                    <img
                      src="media/reedy.jpg"
                      alt="Raw Log Footage"
                      style={{ 
                        width: graderContainerRef.current?.getBoundingClientRect().width || 480,
                        maxWidth: 'none',
                        filter: 'saturate(0.4) contrast(0.8) brightness(0.9) sepia(0.08)' 
                      }}
                      className="absolute inset-0 h-full object-cover pointer-events-none"
                      draggable="false"
                    />
                    
                    {/* Label Flat */}
                    <div className="absolute left-4 top-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-md text-[9px] font-bold text-gray-400 border border-white/5">
                      LOG PROFILE (FLAT)
                    </div>
                  </div>

                  {/* Label Graded */}
                  <div className="absolute right-4 top-4 bg-emerald-500 px-3 py-1.5 rounded-md text-[9px] font-extrabold text-black border border-emerald-400/20">
                    CINEMATIC GRADED
                  </div>

                  {/* Interactive Slider Bar Handle */}
                  <div
                    style={{ left: `${sliderPercent}%` }}
                    className="absolute top-0 bottom-0 w-1 -ml-0.5 bg-emerald-400 z-30 pointer-events-none flex items-center justify-center"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-black border border-emerald-400 flex items-center justify-center shadow-lg transform -translate-x-1/2">
                      <span className="text-[10px] font-bold">⇄</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
