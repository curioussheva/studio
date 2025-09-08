"use client";

import React, { useState, useEffect, type FC } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AdInterstitialProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdInterstitial: FC<AdInterstitialProps> = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(5);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCountdown(5);
      setAdLoaded(false);

      const adTimer = setTimeout(() => {
        try {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setAdLoaded(true);
        } catch (err) {
          console.error('AdSense error:', err);
          setAdLoaded(true); // Proceed even if ad fails
        }
      }, 500); // Small delay to allow component to render

      const countdownTimer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && countdown === 0) {
          onClose();
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(adTimer);
        clearInterval(countdownTimer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  
  const canClose = countdown === 0;

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center animate-in fade-in-0 duration-300"
      onClick={() => { if(canClose) onClose(); }}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="relative w-full h-full flex flex-col items-center justify-center text-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          disabled={!canClose}
          onClick={onClose}
          className="absolute top-6 right-6 bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed transition-opacity"
          aria-label="Close ad"
        >
          {canClose ? <X className="h-6 w-6" /> : <span className="text-lg font-bold">{countdown}</span>}
        </Button>
        
        <div className="w-full h-full max-w-full max-h-full flex items-center justify-center">
            <ins className="adsbygoogle"
                style={{display: 'block'}}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot="2345678901" // Replace with your interstitial ad slot ID
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
      </div>
    </div>
  );
};
export default AdInterstitial;
