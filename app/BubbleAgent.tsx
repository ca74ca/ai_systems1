"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function BubbleAgent() {
  const [open, setOpen] = useState(false);
  const [popped, setPopped] = useState(false);

  const handleClick = () => {
    setPopped(true);
    setTimeout(() => setOpen(true), 280); // bubble pops → chat appears
  };

  return (
    <div className="absolute top-40 left-10 z-50">

      {/* BUBBLE BUTTON */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              boxShadow: [
                "0 0 25px rgba(34,197,94,0.4)",
                "0 0 40px rgba(16,185,129,0.4)",
                "0 0 25px rgba(74,222,128,0.4)",
              ],
              background: [
                "radial-gradient(circle, #22c55e, #15803d)",
                "radial-gradient(circle, #10b981, #047857)",
                "radial-gradient(circle, #4ade80, #166534)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            whileHover={{
              scale: 1.1,
              filter: "brightness(1.3)",
            }}
            whileTap={{ scale: 0.7 }}
            onClick={handleClick}
            className="
              w-16 h-16 
              rounded-full 
              cursor-pointer 
              relative 
              flex items-center justify-center
            "
          >
            {/* POP EFFECT */}
            {popped && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute w-full h-full rounded-full bg-white/60"
              />
            )}

            {/* HOVER TEXT */}
            <motion.span
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="
                absolute 
                bottom-[-35px] 
                text-white 
                text-sm 
                whitespace-nowrap
              "
            >
              Tap to start your build
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHAT PANEL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.7, filter: "blur(20px)" }}
            transition={{ duration: 0.4 }}
            className="
              w-[350px] 
              h-[420px] 
              rounded-3xl 
              p-4 
              backdrop-blur-3xl 
              bg-white/10 
              border border-white/20 
              shadow-2xl 
              overflow-hidden
              relative
            "
          >
            {/* CHAT CONTENT */}
            <div className="relative z-20 h-full flex flex-col">
              <h3 className="text-xl font-bold mb-2">AI Studio Agent</h3>
              <p className="text-white/70 text-sm mb-4">
                What are we building together today?
              </p>

              {/* Chat Box */}
              <div className="flex-1 bg-black/30 rounded-xl p-3 overflow-y-auto text-sm">
                <p className="text-white/80">👋 Hey! Tell me your idea…</p>
              </div>

              <input
                placeholder="Type your message..."
                className="
                  mt-3 p-2 rounded-xl 
                  bg-white/20 
                  placeholder-white/60 
                  focus:outline-none 
                  text-white
                "
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}