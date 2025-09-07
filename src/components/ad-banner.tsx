import type { FC } from 'react';

const AdBanner: FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t flex items-center justify-center z-20">
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">AdMob Banner</p>
        <p className="text-xs text-muted-foreground">Placeholder</p>
      </div>
    </div>
  );
};

export default AdBanner;
