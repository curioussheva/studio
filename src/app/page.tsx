"use client";

import { useState } from 'react';
import AdBanner from '@/components/ad-banner';
import AdInterstitial from '@/components/ad-interstitial';
import { Button } from '@/components/ui/button';
import { Tv } from 'lucide-react';

export default function Home() {
  const [isInterstitialOpen, setIsInterstitialOpen] = useState(false);

  const showInterstitial = () => {
    setIsInterstitialOpen(true);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-4 border-b bg-card flex justify-between items-center shrink-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold text-primary flex items-center gap-2">
          <Tv className="text-accent" />
          <span>AssetLoaderAds</span>
        </h1>
        <Button onClick={showInterstitial}>Show Interstitial Ad</Button>
      </header>

      <main className="flex-1 w-full overflow-hidden pb-16">
        {/* Konten iframe dari index.html sekarang berada di sini */}
        <div className="flex h-full">
            <iframe className="h-full border-none w-[250px]" src="/assets/sidebar.html"></iframe>
            <iframe className="h-full border-none flex-grow" src="/assets/content.html"></iframe>
        </div>

        
      </main>

      <AdBanner />
      <AdInterstitial
        isOpen={isInterstitialOpen}
        onClose={() => setIsInterstitialOpen(false)}
      />
    </div>
  );
}
