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
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary flex items-center gap-2">
            <Tv className="text-accent" />
            <span>AssetLoaderAds</span>
          </h1>
        </div>
      </header>

      <div className="container mx-auto flex-1 w-full overflow-hidden pb-14">
        <main className="h-full w-full">
          <iframe
            src="/assets/home.html"
            title="Loaded Content"
            className="w-full h-full border-0"
          />
        </main>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-14 bg-card border-t flex items-center justify-center z-20">
          <div className="container mx-auto h-full">
            <AdBanner />
          </div>
      </div>

      <AdInterstitial
        isOpen={isInterstitialOpen}
        onClose={() => setIsInterstitialOpen(false)}
      />
    </div>
  );
}
