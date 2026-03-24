import React from 'react';
import { Copy, ClipboardPaste, DownloadCloud } from 'lucide-react';

const steps = [
  {
    title: '1. Copy URL',
    desc: 'Find the YouTube video you want to download and copy its URL from the browser address bar or app share button.',
    icon: Copy,
  },
  {
    title: '2. Paste Link',
    desc: 'Paste the copied YouTube link into the search box at the top of this page.',
    icon: ClipboardPaste,
  },
  {
    title: '3. Download',
    desc: 'Click the Download button and choose your preferred video (MP4) or audio (MP3) quality.',
    icon: DownloadCloud,
  }
];

export default function HowToGuide() {
  return (
    <div className="w-full mt-20 mb-10 animate-slide-up">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-4">How to Use QuickVidDownload</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Follow these three simple steps to download YouTube videos directly to your device.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Connecting Line for Desktop */}
        <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-pink-500/0 z-0"></div>

        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-6 bg-gray-900/40 backdrop-blur-md rounded-2xl border border-gray-700/50 relative z-10 hover:bg-gray-800/60 transition-colors">
            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center border-4 border-gray-900 shadow-xl mb-6">
              <step.icon className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
