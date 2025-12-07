"use client";

import { motion } from "framer-motion";
import BubbleAgent from "./BubbleAgent";
import AIOrb from "../components/AIOrb";

const menuItems = ["Services", "Portfolio", "AI Agents", "API & SDK", "Contact"];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative">
      
      {/* BLURRED BACKGROUND EXTENSION */}
      <video
        src="/ai_studio_mainart1-.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute inset-0 w-full h-full 
          object-cover 
          blur-3xl 
          scale-125 
          opacity-40
        "
      />

      {/* MAIN SHARP VIDEO */}
      <video
        src="/ai_studio_mainart1-.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute inset-0 w-full h-full
          object-contain
          z-10
          scale-75
        "
      />

      {/* Optional dark overlay for readability */}
      <div className="absolute inset-0 z-20 bg-black/20" />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-30"></div>

      {/* FULL WIDTH LIQUID GLASS BOX - TITLE ONLY */}
      <div className="absolute top-24 left-0 right-0 z-50 w-full">
        <div className="
          bg-white/5 backdrop-blur-xl border-y border-white/10 
          shadow-[0_8px_32px_rgba(0,0,0,0.3)]
          py-8 px-10
        ">
          
          {/* Content Container - keeps text left aligned */}
          <div className="flex items-center justify-start max-w-7xl">
            
            {/* Liquid Glass Title Only */}
            <motion.h1
              initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8 }}
              className="
                text-4xl md:text-5xl font-extrabold tracking-tight
                text-transparent bg-clip-text
                bg-gradient-to-b from-white/90 to-white/40
                drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]
              "
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.3)",
              }}
            >
              AI Systems Studio
            </motion.h1>
            
          </div>
        </div>
      </div>

      {/* AI COMPONENTS UNDER HEADER */}
      <div className="absolute top-40 left-10 z-50 flex items-center gap-4">
        <BubbleAgent />
        <AIOrb />
      </div>

      {/* BUILD Section */}
      <section className="relative z-20 pt-96 pb-24 px-6 w-full">

        <motion.h2 
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="
            text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-tight
            text-transparent bg-clip-text
            bg-gradient-to-b from-white/90 to-white/40
            drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]
          "
          style={{
            WebkitTextStroke: "1px rgba(255,255,255,0.3)",
          }}
        >
          Capability Systems & custom build options
        </motion.h2>

        {/* FULL WIDTH GRID NOW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full px-0 md:px-8">

          {/* LEFT CARD #1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-xl shadow-xl w-full md:ml-0 md:mr-auto max-w-xl"
          >
            <h3 className="text-white text-xl font-semibold mb-2">AI Website Engine</h3>
            <p className="text-white/80">
              A custom-designed website connected to a real backend and database. Not a template — a fully engineered system.
            </p>
          </motion.div>

          {/* RIGHT CARD #2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-xl shadow-xl w-full md:mr-0 md:ml-auto max-w-xl"
          >
            <h3 className="text-white text-xl font-semibold mb-2">AI Agent System</h3>
            <p className="text-white/80">
              Custom business logic, specialized agents, workflows, and integrations.
            </p>
          </motion.div>

          {/* LEFT CARD #3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-xl shadow-xl w-full md:ml-0 md:mr-auto max-w-xl"
          >
            <h3 className="text-white text-xl font-semibold mb-2">Chrome Extension</h3>
            <p className="text-white/80">
              Browser automation tools, DOM manipulation, and custom overlays for your workflows.
            </p>
          </motion.div>

          {/* RIGHT CARD #4 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-xl shadow-xl w-full md:mr-0 md:ml-auto max-w-xl"
          >
            <h3 className="text-white text-xl font-semibold mb-2">API & SDK Suite</h3>
            <p className="text-white/80">
              Clean REST APIs, custom SDKs, and integration tools to power your automation.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="max-w-7xl mx-auto mt-32 space-y-16 relative z-20 px-6">

        <h2 className="
          text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-tight
          text-transparent bg-clip-text
          bg-gradient-to-b from-white/90 to-white/40
          drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]
        "
        style={{
          WebkitTextStroke: "1px rgba(255,255,255,0.3)",
        }}>
          Our Core Offerings
        </h2>

        {/* 2 LEFT • 2 RIGHT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="liquid-glass p-10 w-full md:ml-0 md:mr-auto max-w-xl"
          >
            <h3 className="text-2xl font-bold mb-3">AI Automation Engine</h3>
            <p className="text-gray-300">
              Complete AI system — agents, backend, scrapers, SDK, Chrome overlay.
            </p>
          </motion.div>

          {/* RIGHT 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="liquid-glass p-10 w-full md:ml-auto md:mr-0 max-w-xl"
          >
            <h3 className="text-2xl font-bold mb-3">Full Website + AI Integration</h3>
            <p className="text-gray-300">
              Stunning modern websites with full embedded AI systems.
            </p>
          </motion.div>

          {/* LEFT 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="liquid-glass p-10 w-full md:ml-0 md:mr-auto max-w-xl"
          >
            <h3 className="text-2xl font-bold mb-3">Custom Chrome Extensions</h3>
            <p className="text-gray-300">
              DOM overlays, automations, scanners, fraud detection.
            </p>
          </motion.div>

          {/* RIGHT 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="liquid-glass p-10 w-full md:ml-auto md:mr-0 max-w-xl"
          >
            <h3 className="text-2xl font-bold mb-3">API + SDK Development</h3>
            <p className="text-gray-300">
              Battle-tested REST APIs & SDKs for production automation.
            </p>
          </motion.div>

        </div>
      </section>

      {/* INDUSTRIES TICKER */}
      <section className="relative z-20 mt-32 mb-16">
        <div className="
          bg-white/5 backdrop-blur-xl border-y border-white/10 
          shadow-[0_8px_32px_rgba(0,0,0,0.3)]
          py-6 overflow-hidden
          relative
        ">
          {/* Ticker Content */}
          <div className="flex animate-scroll">
            <div className="flex whitespace-nowrap">
              <span className="
                text-2xl md:text-3xl font-extrabold tracking-tight
                text-transparent bg-clip-text
                bg-gradient-to-b from-white/90 to-white/40
                drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]
              "
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.3)",
              }}>
                Industries We Transform • We rebuild workflows • interfaces • and backend systems for: • WordPress & template-based businesses • Real estate & housing professionals • Local service & 1099 workers • Retail • beauty • wellness • med spas • Creators • influencers • UGC brands • Online coaches & entrepreneurs • B2B agencies & production studios • Legal • finance • insurance • Medical & health practices • E-commerce brands • Restaurants & hospitality • Any business ready for a custom AI system •&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </div>
            <div className="flex whitespace-nowrap">
              <span className="
                text-2xl md:text-3xl font-extrabold tracking-tight
                text-transparent bg-clip-text
                bg-gradient-to-b from-white/90 to-white/40
                drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]
              "
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.3)",
              }}>
                Industries We Transform • We rebuild workflows • interfaces • and backend systems for: • WordPress & template-based businesses • Real estate & housing professionals • Local service & 1099 workers • Retail • beauty • wellness • med spas • Creators • influencers • UGC brands • Online coaches & entrepreneurs • B2B agencies & production studios • Legal • finance • insurance • Medical & health practices • E-commerce brands • Restaurants & hospitality • Any business ready for a custom AI system •&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="mt-32 text-center max-w-xl mx-auto pb-32 space-y-6 relative z-20 px-6"
      >
        <h2 className="text-4xl font-bold">Start Your Build</h2>
        <p className="text-gray-400">
          Tell us what you want to automate and we’ll design a complete AI system for it.
        </p>

        <a
          href="mailto:contact@ai-systems.studio"
          className="inline-block bg-white text-black px-8 py-4 font-bold rounded-lg hover:bg-gray-300 transition"
        >
          Contact Us
        </a>
      </section>

    </main>
  );
}
