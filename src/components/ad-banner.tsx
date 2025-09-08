"use client";
import React, { useEffect, useState } from 'react';

const AdBanner = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense banner error:', err);
      }
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full flex items-center justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'inline-block', width: '320px', height: '50px' }}
        data-ad-client="ca-app-pub-2718792162592521/1039823651"
        data-ad-slot="1234567890"
        data-ad-format="horizontal"
        data-full-width-responsive="false"
      ></ins>
    </div>
  );
};

export default AdBanner;
