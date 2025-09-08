"use client";

import { useState, useEffect } from 'react';
import AdBanner from '@/components/ad-banner';
import AdInterstitial from '@/components/ad-interstitial';
import { Tv } from 'lucide-react';

export default function Home() {
  const [isInterstitialOpen, setIsInterstitialOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsInterstitialOpen(true);
    }, 120000); // 120000ms = 2 minutes

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-4 border-b bg-card flex justify-between items-center shrink-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold text-primary flex items-center gap-2">
          <Tv className="text-accent" />
          <span>AssetLoaderAds</span>
        </h1>
      </header>

      <main className="flex-1 w-full overflow-hidden pb-14">
        <iframe
          src="/assets/home.html"
          title="Loaded Content"
          className="w-full h-full border-0"
        />
      </main>

      <AdBanner />
      <AdInterstitial
        isOpen={isInterstitialOpen}
        onClose={() => setIsInterstitialOpen(false)}
      />
    </div>
  );
}
