import { useEffect, useRef } from 'react';

export default function NativeAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Prevent duplicate script injections on React re-renders
    if (containerRef.current.querySelector('script')) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://pl28972971.profitablecpmratenetwork.com/81cca3010ba4f2896d4574703dbb8639/invoke.js';

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="w-full flex justify-center my-6 items-center flex-col animate-fade-in">
      {/* Monetag/PropellerAds Native Banner Container */}
      <div ref={containerRef} className="w-full max-w-4xl overflow-hidden flex justify-center">
        <div id="container-81cca3010ba4f2896d4574703dbb8639"></div>
      </div>
    </div>
  );
}
