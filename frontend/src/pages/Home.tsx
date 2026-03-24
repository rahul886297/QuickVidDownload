import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Download, Search, Loader2, Music, Video as VideoIcon, AlertCircle } from 'lucide-react';
import RelatedTools from '../components/RelatedTools';
import SupportedPlatforms from '../components/SupportedPlatforms';
import HowToGuide from '../components/HowToGuide';
import SeoLinks from '../components/SeoLinks';
import NativeAd from '../components/NativeAd';
import IframeAd from '../components/IframeAd';

interface VideoFormat {
  formatId: string;
  resolution?: string;
  url: string;
  ext: string;
  filesize?: number;
  note?: string;
  hasAudio?: boolean;
}

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string | number;
  channel?: string;
  videoFormats: VideoFormat[];
  audioFormats: VideoFormat[];
  originalUrl: string;
}

export default function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const platformStr = queryParams.get('platform');
  const formatStr = queryParams.get('format');
  const platform = platformStr || 'YouTube';
  
  const title = formatStr 
    ? `Download YouTube to ${formatStr.toUpperCase()}` 
    : `Download ${platform} Videos`;
  const subtitle = `Convert and download your favorite ${platform} videos to MP4 or MP3 in the highest quality available.`;
  const placeholder = `Paste ${platform} URL here...`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.search]);

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text);
    } catch {}
  };

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError('');
    setVideoInfo(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch video details');

      setVideoInfo(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(1) + ' MB';
  };

  return (
    <div className="w-full text-center flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 leading-tight">
        {title}
      </h1>
      <p className="text-gray-300 mt-2 mb-8">
        {subtitle}
      </p>

      <div className="bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-12 border border-white/5 w-full">
        <form onSubmit={handleFetch} className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-11 pr-20 px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-500"
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={handlePaste}
              className="absolute inset-y-2 right-2 px-3 flex items-center bg-gray-700 rounded-lg text-sm text-gray-300 hover:text-white transition-colors border border-gray-600 cursor-pointer"
            >
              Paste
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl px-6 py-3 font-semibold hover:scale-105 transition duration-300 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2 min-w-[140px] shadow-lg shadow-purple-500/30 cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Download'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-900/30 border border-red-500/30 text-red-400 rounded-xl flex items-center gap-3">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm text-left">{error}</p>
          </div>
        )}
      </div>

      {videoInfo && (
        <div className="bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/5 text-left animate-slide-up w-full mb-12">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-5/12">
              <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-700 mb-4 bg-gray-800 relative group">
                <img src={videoInfo.thumbnail} alt={videoInfo.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <VideoIcon className="h-10 w-10 text-white" />
                </div>
              </div>
              <h2 className="text-lg font-bold text-white line-clamp-2">{videoInfo.title}</h2>
              <p className="text-sm text-gray-400 mt-1">{videoInfo.channel} • {videoInfo.duration}</p>
            </div>
            
            <div className="md:w-7/12 flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-purple-400">
                  <VideoIcon className="h-5 w-5" /> Video (MP4)
                </h3>
                <div className="grid grid-cols-1 gap-2 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                  {videoInfo.videoFormats.slice(0, 6).map((format, idx) => (
                    <a
                      key={idx}
                      href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/proxy?url=${encodeURIComponent(format.url)}&title=${encodeURIComponent(videoInfo.title)}&ext=${format.ext}`}
                      className="flex items-center justify-between p-3 rounded-xl border border-gray-700 bg-gray-800 hover:border-purple-500 hover:bg-gray-750 transition-all group"
                      download
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-white flex items-center gap-2">
                          {format.resolution || 'Video'}
                          {format.hasAudio === false && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold tracking-wide uppercase">No Audio</span>
                          )}
                        </span>
                        <span className="text-xs text-gray-400">{formatSize(format.filesize)}</span>
                      </div>
                      <Download className="h-4 w-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    </a>
                  ))}
                  {videoInfo.videoFormats.length === 0 && <p className="text-sm text-gray-400">No formats available.</p>}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-pink-400">
                  <Music className="h-5 w-5" /> Audio (MP3/M4A)
                </h3>
                <div className="grid grid-cols-1 gap-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                  {videoInfo.audioFormats.slice(0, 4).map((format, idx) => (
                    <a
                      key={idx}
                      href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/proxy?url=${encodeURIComponent(format.url)}&title=${encodeURIComponent(videoInfo.title)}&ext=${format.ext}`}
                      className="flex items-center justify-between p-3 rounded-xl border border-gray-700 bg-gray-800 hover:border-pink-500 hover:bg-gray-750 transition-all group"
                      download
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-white">{format.note || 'Audio'}</span>
                        <span className="text-xs text-gray-400">{formatSize(format.filesize)}</span>
                      </div>
                      <Download className="h-4 w-4 text-gray-400 group-hover:text-pink-400 transition-colors" />
                    </a>
                  ))}
                  {videoInfo.audioFormats.length === 0 && <p className="text-sm text-gray-400">No audio formats available.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Smartlink Ad Banner */}
      <div className="w-full mt-8 mb-4 flex justify-center px-4 animate-fade-in">
        <a 
          href="https://www.profitablecpmratenetwork.com/zm8ys3vvt?key=834308d0a7eb76c1b76252e520d04b7f" 
          target="_blank" 
          rel="noreferrer"
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-[1px] shadow-lg shadow-green-500/20 w-full max-w-4xl block hover:scale-[1.01] transition-transform cursor-pointer"
        >
          <div className="bg-gray-900 rounded-xl px-4 py-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 w-full h-full text-center sm:text-left">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1 block">Sponsored Advertisement</span>
              <h4 className="text-white font-bold text-lg md:text-xl">Fast & Secure Premium Downloads</h4>
              <p className="text-gray-400 text-sm mt-1">Unlock high-speed access and support QuickVidDownload by visiting our sponsor!</p>
            </div>
            <div className="bg-green-500 hover:bg-green-400 text-white font-bold py-2.5 px-6 rounded-lg whitespace-nowrap transition-colors shadow-md w-full sm:w-auto">
              Continue
            </div>
          </div>
        </a>
      </div>

      <NativeAd />
      <IframeAd />

      {/* New QuickVidDownload Copied Components */}
      <SupportedPlatforms />
      <HowToGuide />
      <RelatedTools />
      <SeoLinks />


    </div>
  );
}
