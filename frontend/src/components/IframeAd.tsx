export default function IframeAd() {
  const adCode = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            margin: 0; 
            padding: 0; 
            background: transparent; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh;
            overflow: hidden;
          }
        </style>
      </head>
      <body>
        <script>
          var atOptions = {
            'key' : '4baf386380a0c53fd323177469f1a28b',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/4baf386380a0c53fd323177469f1a28b/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <div className="w-full flex justify-center my-8 animate-fade-in">
      <div className="bg-gray-900 overflow-hidden shadow-lg shadow-black/20 rounded-xl relative">
        <span className="absolute top-1 left-2 text-[8px] uppercase font-bold text-gray-600 tracking-widest z-0">Advertisement</span>
        <iframe 
          srcDoc={adCode} 
          width="300" 
          height="250" 
          sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin"
          style={{ border: 'none', display: 'block', overflow: 'hidden', position: 'relative', zIndex: 1 }}
          scrolling="no"
          title="Banner Advertisement"
        />
      </div>
    </div>
  );
}
