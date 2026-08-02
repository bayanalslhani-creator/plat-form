import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import VideoHero from "@/components/VideoHero";
import StatsSection from "@/components/StatsSection";
import FinalFrame from "@/components/FinalFrame";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSplash]);

  return (
    <main className="bg-obsidian">
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <VideoHero />
      <StatsSection />
      <FinalFrame />
    </main>
  );
}