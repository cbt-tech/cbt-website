"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./AboutScrollHero.module.css";

const heroImage = "/images/about/about2.webp";
const portraits = [
  { src: "/images/about/about2.webp", position: "48% 30%", label: "People Who Use It", number: "01", alt: "Colleagues working together at a laptop" },
  { src: "/images/about/about3.webp", position: "52% 52%", label: "Work It Needs to Do", number: "02", alt: "A team planning a digital product workflow" },
  { src: "/images/about/about1.webp", position: "58% 55%", label: "Technology That Fits", number: "03", alt: "An engineer developing a connected IoT device" },
] as const;

export function AboutScrollHero() {
  const trackRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 78, damping: 24, mass: 0.34 });
  const introY = useTransform(progress, [0, 0.2, 0.38], ["0%", "0%", "-115%"]);
  const introOpacity = useTransform(progress, [0, 0.24, 0.37], [1, 1, 0]);
  const introScale = useTransform(progress, [0, 0.24, 0.38], [1, 1, 0.97]);
  const compositionY = useTransform(progress, [0.18, 0.42, 1], ["108%", "0%", "0%"]);
  const compositionOpacity = useTransform(progress, [0.2, 0.4, 1], [0, 1, 1]);
  const compositionScale = useTransform(progress, [0.18, 0.43, 0.78, 1], [0.97, 1, 1, 1.035]);
  const imageScale = useTransform(progress, [0.38, 1], [1.045, 1]);
  const copyY = useTransform(progress, [0.43, 0.66, 1], [38, 0, 0]);
  const copyOpacity = useTransform(progress, [0.43, 0.63, 1], [0, 1, 1]);
  const detailsOpacity = useTransform(progress, [0.57, 0.75], [0, 1]);
  const staticFinal = reduceMotion === true;

  return (
    <section ref={trackRef} className={styles.track} aria-labelledby="about-title">
      <div className={styles.stickyStage}>
        <div className={styles.frame}>
          <div className={styles.frameTopline} aria-hidden="true">
            <span>Cantabridge Technologies</span><span className={styles.frameIndex}>About Us</span>
          </div>
          <motion.div className={styles.introScene} style={staticFinal ? { opacity: 0 } : { y: introY, opacity: introOpacity, scale: introScale }} aria-hidden={staticFinal}>
            <p className={`${styles.eyebrow} section-eyebrow`}>About Cantabridge</p>
            <h1 id="about-title" className={`${styles.introTitle} brand-display-heading`}>Business Understanding.<span>Technical Execution.</span></h1>
            <p className={styles.introBody}>Cantabridge Technologies is an IT solutions and software development company based in Rajasthan, India. We build and integrate AI agents, custom web and mobile applications, IoT engineering tools, Salesforce CRM solutions, and cloud services directly into everyday business operations.</p>
            <div className={styles.portraitRow} aria-label="What guides our work">
              {portraits.map((portrait) => (
                <div className={styles.portraitWrap} key={portrait.label}>
                  <div className={styles.portrait}>
                    <Image src={portrait.src} alt={portrait.alt} fill sizes="(max-width: 640px) 25vw, 132px" className={styles.portraitImage} style={{ objectPosition: portrait.position }} />
                    <span className={styles.portraitNumber}>{portrait.number}</span>
                  </div>
                  <span>{portrait.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div className={styles.finalScene} style={staticFinal ? { opacity: 1, scale: 1, y: 0 } : { opacity: compositionOpacity, scale: compositionScale, y: compositionY }}>
            <motion.div className={styles.imageLayer} style={staticFinal ? { scale: 1 } : { scale: imageScale }}>
              <Image src={heroImage} alt="Cantabridge colleagues collaborating on a software project" fill priority sizes="(max-width: 768px) 96vw, 92vw" className={styles.finalImage} />
            </motion.div>
            <div className={styles.finalScrim} />
            <motion.div className={styles.finalCopy} style={staticFinal ? { opacity: 1, y: 0 } : { opacity: copyOpacity, y: copyY }}>
              <p className="section-eyebrow section-eyebrow-light">Who We Are</p>
              <h2>Engineering the Technology to Scale and Grow Your Business</h2>
              <motion.div className={styles.finalDescription} style={staticFinal ? { opacity: 1 } : { opacity: detailsOpacity }}>
                Building a powerful online footprint requires seamless integration across every layer of your business software. This development connects custom AI agents with secure records, configures responsive applications with easy user paths, and structures IoT pipelines with robust control architectures to keep your operations running smoothly.
              </motion.div>
            </motion.div>
            <motion.div className={styles.finalMeta} style={staticFinal ? { opacity: 1 } : { opacity: detailsOpacity }} aria-hidden="true">
              <span>Automation</span><span>Development</span><span>Integration</span>
            </motion.div>
          </motion.div>
        </div>
        <div className={styles.scrollNote} aria-hidden="true"><span>Get to Know Cantabridge</span><ArrowDown size={14} strokeWidth={1.6} /></div>
      </div>
    </section>
  );
}
