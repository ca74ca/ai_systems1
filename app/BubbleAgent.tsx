"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function BubbleAgent() {
  const [open, setOpen] = useState(false);
  const [popped, setPopped] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setPopped(true);
    setTimeout(() => setOpen(true), 280); // bubble pops → chat appears
  };

  // Listen for orb click events to open the chat
  useEffect(() => {
    const handler = () => {
      console.log('[BubbleAgent] ai-orb-click received');
      // simulate the pop sequence
      setPopped(true);
      setTimeout(() => setOpen(true), 220);
    };

    window.addEventListener("ai-orb-click", handler as EventListener);
    return () => window.removeEventListener("ai-orb-click", handler as EventListener);
  }, []);

  const submit = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", content: userText }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: userText }] }),
      });

      const data = await res.json();
      if (res.ok && data.assistant) {
        setMessages((m) => [...m, { role: "assistant", content: data.assistant }]);
      } else {
        setMessages((m) => [...m, { role: "assistant", content: "(error) " + JSON.stringify(data) }]);
      }
    } catch (err: any) {
      setMessages((m) => [...m, { role: "assistant", content: "(network error) " + String(err) }]);
    } finally {
      setLoading(false);
    }
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
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">AI Studio Agent</h3>
                  <p className="text-white/70 text-sm mb-4">
                    What are we building together today?
                  </p>
                </div>
                <button
                  aria-label="Close chat"
                  onClick={() => {
                    setOpen(false);
                    setPopped(false);
                  }}
                  className="text-white/60 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Chat Box */}
              <div className="flex-1 bg-black/30 rounded-xl p-3 overflow-y-auto text-sm">
                {messages.length === 0 ? (
                  <p className="text-white/80">👋 Hey! Tell me your idea…</p>
                ) : (
                  messages.map((m, i) => (
                    <div key={i} className={`mb-2 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block px-3 py-2 rounded-xl ${m.role === 'user' ? 'bg-white/20' : 'bg-white/10'}`}>
                        <span className="text-sm text-white/90">{m.content}</span>
                      </div>
                    </div>
                  ))
                )}

                {loading && <p className="text-white/60">Thinking…</p>}
              </div>

              <div className="mt-3 flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
                  placeholder="Type your message..."
                  className="
                    flex-1 p-2 rounded-xl 
                    bg-white/20 
                    placeholder-white/60 
                    focus:outline-none 
                    text-white
                  "
                />
                <button
                  onClick={submit}
                  disabled={loading}
                  className="px-4 py-2 rounded-xl bg-white text-black font-bold disabled:opacity-40"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}