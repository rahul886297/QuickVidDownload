import React from 'react';
import { Link } from 'react-router-dom';

const platforms = [
  {
    name: 'YT Downloader',
    desc: 'Download YT videos in HD, Full HD, or MP3 format',
    link: '/?platform=YouTube',
    iconColor: 'bg-blue-50',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.582 6.186a2.68 2.68 0 0 0-1.884-1.895C17.973 3.842 12 3.842 12 3.842s-5.973 0-7.698.449A2.68 2.68 0 0 0 2.418 6.186C2 7.92 2 12 2 12s0 4.08.418 5.814a2.68 2.68 0 0 0 1.884 1.895c1.725.449 7.698.449 7.698.449s5.973 0 7.698-.449a2.68 2.68 0 0 0 1.884-1.895C22 16.08 22 12 22 12s0-3.92-.418-5.814z" fill="#FF0000"/>
        <path d="M10 15v-6l5 3-5 3z" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    name: 'Facebook Downloader',
    desc: 'Download Facebook videos, reels, and stories in MP4',
    link: '/?platform=Facebook',
    iconColor: 'bg-blue-50',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        <path d="M16.671 15.542l.532-3.469h-3.328V9.823c0-.949.465-1.874 1.956-1.874h1.514V5.006s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.634H7.078v3.469h3.047v8.385a12.09 12.09 0 003.75 0v-8.385h2.796z" fill="#FFFFFF"/>
      </svg>
    )
  },
  {
    name: 'TikTok Downloader',
    desc: 'Download TikTok videos without watermark in HD',
    link: '/?platform=TikTok',
    iconColor: 'bg-blue-50',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1v4.74c-.01 2.21-.92 4.29-2.51 5.84-1.57 1.54-3.79 2.45-6.03 2.37-2.68-.08-5.22-1.38-6.86-3.41C-.13 15.11-.32 11.83.92 9.4c1.1-1.92 3.04-3.23 5.17-3.71.55-.13 1.13-.2 1.7-.19v4.06c-1.25.13-2.5.88-3.25 1.93-.8 1.11-.94 2.65-.3 3.88.66 1.25 2.01 2.03 3.49 2.03 1.66.01 3.09-1.24 3.23-2.9v-14.5h1.56z"/>
      </svg>
    )
  },
  {
    name: 'Instagram Downloader',
    desc: 'Save Instagram videos, reels, and stories instantly',
    link: '/?platform=Instagram',
    iconColor: 'bg-blue-50',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-grad)"/>
         <path d="M12 7.75a4.25 4.25 0 100 8.5 4.25 4.25 0 000-8.5zM12 14.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5zM16.5 8.5a1 1 0 11-2 0 1 1 0 012 0z" fill="#FFFFFF"/>
         <path fillRule="evenodd" clipRule="evenodd" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3z" fill="#FFFFFF"/>
         <defs>
           <linearGradient id="ig-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
             <stop stopColor="#F5A249"/>
             <stop offset="0.33" stopColor="#E94F5E"/>
             <stop offset="0.66" stopColor="#E0297B"/>
             <stop offset="1" stopColor="#813CB0"/>
           </linearGradient>
         </defs>
      </svg>
    )
  },
  {
    name: 'Pinterest Downloader',
    desc: 'Download Pinterest videos, images, and GIFs',
    link: '/?platform=Pinterest',
    iconColor: 'bg-blue-50',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="#E60023" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.44.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.968-2.914 2.171-2.914 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.568-.99 3.992-.281 1.198.597 2.174 1.776 2.174 2.132 0 3.766-2.252 3.766-5.498 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.731.097.125.111.222.083.345-.089.39-.288 1.176-.328 1.332-.057.228-.19.278-.423.168-1.583-.736-2.571-3.044-2.571-4.898 0-3.978 2.898-7.632 8.351-7.632 4.382 0 7.797 3.125 7.797 7.295 0 4.364-2.753 7.876-6.58 7.876-1.282 0-2.493-.667-2.906-1.455 0 0-.636 2.417-.79 3.013-.284 1.1-1.05 2.477-1.57 3.321C9.697 23.824 10.824 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
    )
  }
];

export default function SupportedPlatforms() {
  return (
    <div className="w-full mt-20 mb-10 animate-slide-up text-center relative z-10">
      <h2 className="text-4xl font-black mb-3 text-white">Supported Platforms</h2>
      <p className="text-gray-300 mb-10 text-lg">Download videos from your favorite social media and video platforms</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {platforms.map((platform, idx) => (
          <Link 
            to={platform.link} 
            key={idx}
            className="flex items-center gap-5 p-5 bg-white shadow-xl rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all group"
          >
             <div className={`flex items-center justify-center shrink-0 w-16 h-16 rounded-2xl ${platform.iconColor}`}>
               {platform.icon}
             </div>
             <div className="flex flex-col pr-2">
               <h3 className="font-bold text-[17px] text-gray-900 mb-1 leading-none">{platform.name}</h3>
               <p className="text-[13px] text-gray-500 leading-snug">
                 {platform.desc}
               </p>
             </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
