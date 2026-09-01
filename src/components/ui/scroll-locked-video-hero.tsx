"use client"

import React, { useEffect, useRef, useState } from "react"
import subwayVideo from "../../../media/subway-hero.mp4"

export interface MetroHeroProps {
  videoSrc?: string
  title?: string
  scrollHint?: string
  tagline?: string
  signature?: { name: string; url: string } | false
  /** Total height of scroll track in vh (e.g. 240 for 240vh) */
  scrollDistanceVh?: number
  className?: string
  style?: React.CSSProperties
}

const DEFAULT_VIDEO = subwayVideo || "https://raw.githubusercontent.com/gughigug/metro-hero-assets/main/Subway_doors_open_to_city_202608242331.mp4"
const SANS = "Outfit, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

const COL_BG = "#020502"
const COL_TEXT = "#f3f4f8"

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

export default function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  title = "JSHRIVER MEDIA",
  scrollHint = "SCROLL TO ENTER",
  tagline = "Engineering high-performance digital experiences.",
  signature = false,
  scrollDistanceVh = 240,
  className,
  style,
}: MetroHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    let duration = 0
    let targetProgress = 0
    let currentProgress = 0
    let rafId = 0
    let isSeeking = false

    const handleReady = () => {
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        duration = video.duration
        setReady(true)
      }
    }

    video.addEventListener("loadedmetadata", handleReady)
    video.addEventListener("loadeddata", handleReady)
    video.addEventListener("canplay", handleReady)
    video.addEventListener("canplaythrough", handleReady)

    if (video.readyState >= 1 && video.duration) {
      handleReady()
    }

    const onSeeked = () => {
      isSeeking = false
    }
    video.addEventListener("seeked", onSeeked)

    const handleScroll = () => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      const scrollableDistance = container.offsetHeight - window.innerHeight
      if (scrollableDistance <= 0) return

      const scrolled = -rect.top
      const progress = clamp(scrolled / scrollableDistance, 0, 1)
      targetProgress = progress
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })
    handleScroll()

    // Smooth render loop
    const frame = () => {
      // Smooth lerping for video seeking
      currentProgress += (targetProgress - currentProgress) * 0.22

      if (duration > 0 && video) {
        const targetTime = currentProgress * duration
        if (!isSeeking && Math.abs(video.currentTime - targetTime) > 0.015) {
          isSeeking = true
          video.currentTime = targetTime
        }
      }

      if (videoRef.current) {
        const scale = 1 + currentProgress * 0.05
        videoRef.current.style.transform = `scale(${scale})`
      }

      if (titleRef.current) {
        // Title fades out and blurs as doors start opening (first 35% of scroll)
        const t = 1 - clamp(currentProgress / 0.35, 0, 1)
        titleRef.current.style.opacity = String(t)
        titleRef.current.style.transform = `translateY(${(1 - t) * -28}px) scale(${0.95 + t * 0.05})`
        titleRef.current.style.filter = `blur(${(1 - t) * 12}px)`
      }

      if (hintRef.current) {
        // Scroll hint disappears immediately once user begins scrolling
        hintRef.current.style.opacity = currentProgress > 0.02 ? "0" : "1"
      }

      if (taglineRef.current) {
        // Tagline emerges and sharpens as doors fully open (last 30% of scroll)
        const t = clamp((currentProgress - 0.70) / 0.30, 0, 1)
        taglineRef.current.style.opacity = String(t)
        taglineRef.current.style.transform = `translateY(${(1 - t) * 24}px) scale(${0.96 + t * 0.04})`
        taglineRef.current.style.filter = `blur(${(1 - t) * 10}px)`
      }

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`
      }

      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      video.removeEventListener("loadedmetadata", handleReady)
      video.removeEventListener("loadeddata", handleReady)
      video.removeEventListener("canplay", handleReady)
      video.removeEventListener("canplaythrough", handleReady)
      video.removeEventListener("seeked", onSeeked)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        height: `${scrollDistanceVh}vh`,
        width: "100%",
        ...style,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: COL_BG,
        }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: ready ? 1 : 0,
            transformOrigin: "center center",
            willChange: "transform",
            transition: "opacity 0.5s ease",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(2,5,2,0.45) 0%, rgba(2,5,2,0.1) 30%, rgba(2,5,2,0.2) 70%, rgba(2,5,2,0.6) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Title */}
        <div
          ref={titleRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 6%",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: "clamp(32px, 8vw, 100px)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: COL_TEXT,
              textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 0 40px rgba(16,185,129,0.2)",
              display: "inline-block",
              willChange: "transform, filter, opacity",
            }}
          >
            {title}
          </span>
        </div>

        {/* Tagline */}
        {tagline && (
          <div
            ref={taglineRef}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 8%",
              textAlign: "center",
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontFamily: SANS,
                fontWeight: 700,
                fontSize: "clamp(22px, 3.8vw, 44px)",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                color: "#10b981",
                textShadow: "0 4px 24px rgba(0,0,0,0.9), 0 0 20px rgba(16,185,129,0.3)",
              }}
            >
              {tagline}
            </span>
          </div>
        )}

        {/* Scroll hint */}
        <div
          ref={hintRef}
          style={{
            position: "absolute",
            left: "50%",
            bottom: "clamp(24px, 6vh, 48px)",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            color: "rgba(243,244,246,0.85)",
            fontFamily: SANS,
            fontSize: "clamp(10px, 1.4vw, 12px)",
            fontWeight: 700,
            letterSpacing: "0.3em",
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
          }}
        >
          <span>{scrollHint}</span>
          <svg width="14" height="18" viewBox="0 0 14 18" style={{ animation: "metro-hero-bounce 1.6s ease-in-out infinite" }}>
            <style>{`
              @keyframes metro-hero-bounce {
                0%, 100% { transform: translateY(0); opacity: 0.5; }
                50% { transform: translateY(5px); opacity: 1; }
              }
            `}</style>
            <path d="M7 1 L7 17 M2 12 L7 17 L12 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Thin progress line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 3,
            background: "rgba(255,255,255,0.1)",
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              height: "100%",
              width: "100%",
              background: "linear-gradient(90deg, #10b981, #3b82f6)",
              transform: "scaleX(0)",
              transformOrigin: "left center",
            }}
          />
        </div>
      </div>
    </div>
  )
}
