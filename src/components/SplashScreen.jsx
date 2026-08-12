import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const SPLASH_VIDEO_URL =
  "https://media.base44.com/videos/public/6a6f7ad42956b021bd3930bf/5ddbc3a61_animation.mp4";

export default function SplashScreen({ onFinish }) {
  const [exiting, setExiting] = useState(false);

  const finish = () => {
    setExiting(true);
    setTimeout(() => onFinish?.(), 700);
  };

  // fallback in case onEnded never fires
  useEffect(() => {
    const t = setTimeout(finish, 9000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <video
            src={SPLASH_VIDEO_URL}
            autoPlay
            muted
            playsInline
            onEnded={finish}
            className="h-full w-full object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}