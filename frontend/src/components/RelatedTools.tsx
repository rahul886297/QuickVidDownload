import React from 'react';
import { Video, Music, Film, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const tools = [
  { name: 'YT Music', icon: Music, link: '/' },
  { name: 'YT Movies', icon: Film, link: '/' },
  { name: 'YT MP3', icon: Music, link: '/' },
  { name: 'YT MP4', icon: Video, link: '/' },
  { name: 'YT Shorts', icon: Smartphone, link: '/' },
];

export default function RelatedTools() {
  return (
    <div className="w-full mt-12 animate-slide-up">
      <h2 className="text-2xl font-bold mb-6 text-white text-left">Relate To YT</h2>
      <div className="flex flex-wrap gap-4">
        {tools.map((tool, idx) => (
          <Link 
            to={tool.link} 
            key={idx}
            className="flex items-center gap-2 px-5 py-3 bg-gray-900/60 backdrop-blur-md border border-gray-700 rounded-xl hover:border-purple-500 hover:bg-gray-800 transition-all text-gray-300 hover:text-white group"
          >
             <tool.icon className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
             <span className="font-medium">{tool.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
