import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LOGO_URL =
  "https://media.base44.com/images/public/user_69ddf7daaafe19a747853fbc/87ed8f8e9_logo.png";

export default function SplashScreen({ onFinish }) {
  const [stage, setStage] = useState("reveal"); // reveal -> hold -> iris -> done

  useEffect(() => {
    const t1 = setTimeout(() => setStage("hold"), 700);
    const t2 = setTimeout(() => setStage("iris"), 2400);
    const t3 = setTimeout(() => onFinish?.(), 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian"
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          animate={
            stage === "iris"
              ? { clipPath: "circle(0% at 50% 50%)" }
              : { clipPath: "circle(150% at 50% 50%)" }
          }
          transition={{ duration: stage === "iris" ? 1 : 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#E2E2E2 1px, transparent 1px), linear-gradient(90deg, #E2E2E2 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          {/* corner crop marks */}
          {[
            "top-6 left-6 border-t border-l",
            "top-6 right-6 border-t border-r",
            "bottom-6 left-6 border-b border-l",
            "bottom-6 right-6 border-b border-r",
          ].map((c) => (
            <div
              key={c}
              className={`absolute h-10 w-10 border-studio-silver/30 ${c}`}
            />
          ))}

          <motion.div
            className="relative flex items-center"
            initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            animate={{
              opacity: stage === "reveal" ? [0, 1] : 1,
              scale: stage === "reveal" ? [0.92, 1] : stage === "iris" ? 1.06 : 1,
              filter: stage === "reveal" ? ["blur(8px)", "blur(0px)"] : "blur(0px)",
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={LOGO_URL} alt="Plat Form" className="h-16 w-auto md:h-24" />

            {/* glow ring pulse */}
            <motion.span
              className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "140%",
                height: "140%",
                background:
                  "radial-gradient(circle, rgba(255,184,0,0.10) 0%, transparent 70%)",
              }}
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.05, 0.9] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* REC indicator */}
          <motion.div
            className="absolute bottom-10 right-10 flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] text-studio-silver/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.span
              className="inline-block h-2 w-2 rounded-full bg-amber"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            REC
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-10 font-mono text-[11px] tracking-[0.3em] text-studio-silver/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            PLAT · FORM
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}