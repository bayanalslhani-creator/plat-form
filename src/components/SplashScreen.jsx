import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LOGO_URL =
  "https://media.base44.com/images/public/6a6f7ad42956b021bd3930bf/59f915d42_.jpg";

export default function SplashScreen({ onFinish }) {
  const [stage, setStage] = useState("reveal");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("iris"), 2200);
    const t2 = setTimeout(() => onFinish?.(), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
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
          transition={{
            duration: stage === "iris" ? 0.9 : 0.6,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <div className="relative flex h-44 w-44 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-studio-silver/10"
              style={{ borderTopColor: "hsl(var(--primary))" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
            />
            <motion.span
              className="absolute inset-3 rounded-full border border-studio-silver/[0.06]"
              style={{ borderBottomColor: "hsl(var(--primary))" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
            />
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,184,0,0.10) 0%, transparent 70%)",
              }}
            />
            <motion.img
              src={LOGO_URL}
              alt="Plat Form"
              className="relative h-16 w-auto md:h-20"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}