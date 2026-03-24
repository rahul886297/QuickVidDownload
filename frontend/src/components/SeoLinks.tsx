import React from 'react';
import { Link } from 'react-router-dom';

const seoData = [
  { text: "YT to MP4", link: "/" },
  { text: "YT to MP3", link: "/" },
  { text: "YT Music Downloader", link: "/" },
  { text: "YT Movies Downloader", link: "/" },
  { text: "Why Can't I Download YT Videos?", link: "/" },
  { text: "How to Download Instagram Photos in HD", link: "/" },
  { text: "Instagram Video Downloader", link: "/" },
  { text: "Facebook Video Downloader", link: "/" },
  { text: "TikTok Video Downloader", link: "/" },
  { text: "Pinterest Video Downloader", link: "/" },
];

export default function SeoLinks() {
  return (
    <div className="w-full mt-20 pt-10 border-t border-gray-800 animate-slide-up text-left">
      <h2 className="text-2xl font-bold text-white mb-6">The Fastest Way: One Click YT Downloads</h2>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {seoData.map((item, idx) => (
          <Link 
            key={idx} 
            to={item.link}
            className="text-sm font-medium text-purple-400 hover:text-pink-400 transition-colors underline decoration-purple-500/30 hover:decoration-pink-400/80 underline-offset-4"
          >
            {item.text}
          </Link>
        ))}
      </div>
    </div>
  );
}
