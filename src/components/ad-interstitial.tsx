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

  useEffect(() => {
    if (isOpen) {
      setCountdown(5);
      const interval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && countdown === 0) {
          onClose();
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearInterval(interval);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose, countdown]);

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
        
        <div className="text-center">
            <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">Interstitial Ad</h2>
            <p className="text-white/80 mt-2 max-w-sm">This is a simulation of a full-screen ad experience.</p>
            <div className="mt-8 w-[300px] h-[450px] sm:w-[350px] sm:h-[525px] bg-white/10 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center shadow-2xl">
                <p className="text-white/60 text-lg">Your Ad Content Here</p>
            </div>
        </div>
      </div>
    </div>
  );
};
export default AdInterstitial;
