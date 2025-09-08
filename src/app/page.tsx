"use client";

import { useState, useEffect } from 'react';
import AdBanner from '@/components/ad-banner';
import AdInterstitial from '@/components/ad-interstitial';

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
      <div className="container mx-auto flex-1 w-full overflow-hidden">
        <main className="h-full w-full pb-14">
          <iframe
            src="/assets/home.html"
            title="Loaded Content"
            className="w-full h-full border-0"
          />
        </main>
      </div>
      <footer className="fixed bottom-0 left-0 right-0 h-14  border-t flex items-center justify-center z-20">
          <div className="container mx-auto h-full">
            <AdBanner />
          </div>
      </footer>
      <AdInterstitial
        isOpen={isInterstitialOpen}
        onClose={() => setIsInterstitialOpen(false)}
      />
    </div>
  );
}
