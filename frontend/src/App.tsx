import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Menu, X, ChevronDown } from 'lucide-react';

import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';

function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  const navLinks = [
    { name: 'Instagram', path: '/?platform=Instagram' },
    { name: 'Facebook', path: '/?platform=Facebook' },
    { name: 'TikTok', path: '/?platform=TikTok' },
    { name: 'Pinterest', path: '/?platform=Pinterest' },
    { name: 'YT to MP4', path: '/?format=mp4' },
    { name: 'YT to MP3', path: '/?format=mp3' },
    { name: 'YT Movies', path: '/?platform=YouTube' },
  ];

  const langMap: Record<string, string> = {
    'English': 'en', 'Español': 'es', 'العربية': 'ar', 'Português': 'pt',
    'Indonesia': 'id', 'Français': 'fr', '日本語': 'ja', 'Русский': 'ru',
    'Deutsch': 'de', '한국어': 'ko', 'Tiếng Việt': 'vi', 'Italiano': 'it',
    'Türkçe': 'tr', 'বাংলা': 'bn', 'தமிழ்': 'ta', 'ਪੰਜਾਬੀ': 'pa',
    'اُردُو': 'ur', 'తెలుగు': 'te', 'हिंदी': 'hi', 'Malaysia': 'ms', 'ภาษาไทย': 'th'
  };

  const languages = Object.keys(langMap);

  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]{2,5})/);
    if (match && match[1]) {
      const code = match[1].toLowerCase();
      const foundLang = Object.keys(langMap).find(k => langMap[k] === code);
      if (foundLang) setCurrentLang(foundLang);
    }
  }, []);

  const changeLanguage = (langName: string) => {
    const code = langMap[langName];
    if (code) {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const domainStr = isLocal ? '' : `domain=.${window.location.hostname}`;
      
      if (code === 'en') {
         document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; ${domainStr}`;
         document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      } else {
         document.cookie = `googtrans=/en/${code}; path=/; ${domainStr}`;
         document.cookie = `googtrans=/en/${code}; path=/;`;
      }
      setTimeout(() => window.location.reload(), 150);
    }
    setIsMenuOpen(false);
    setIsLangOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white flex flex-col font-sans">
      {/* Top Header (Dark like QuickVidDownload screenshot) */}
      <header className="bg-[#0f111a] text-white w-full border-b border-[#1a1d2d]">
        <div className="max-w-[1400px] mx-auto px-4 xl:px-8">
          <div className="flex justify-between items-center h-[70px]">
            {/* Logo */}
            <Link to="/" className="flex items-center text-3xl font-black tracking-tight shrink-0 transition-opacity hover:opacity-90">
              <span className="text-[#fde047]">QuickVid</span>
              <span className="text-white">Download.com</span>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center space-x-6 text-[15px] font-medium">
              {navLinks.map((link, idx) => {
                const isActive = currentPath === link.path || (currentPath === '/' && link.name === 'YT Movies');
                return (
                  <Link 
                    key={idx} 
                    to={link.path} 
                    className={`whitespace-nowrap pb-[2px] transition-all ${isActive ? 'text-[#fde047] border-b-2 border-[#fde047] font-bold' : 'text-gray-200 hover:text-white'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              {/* Language Selector */}
              <div className="relative group flex items-center h-[70px]">
                <div className="flex items-center space-x-1 cursor-pointer pl-4 border-l border-gray-700 h-6">
                  <span className="text-gray-100 group-hover:text-white transition-colors">{currentLang}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                {/* Dropdown Box */}
                <div className="absolute top-[60px] right-0 hidden group-hover:block bg-[#161a27] border border-gray-800 shadow-2xl rounded-xl p-4 w-[400px] z-50">
                  <div className="grid grid-cols-3 gap-2">
                    {languages.map((lang, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => changeLanguage(lang)}
                        className={`cursor-pointer text-[13px] hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors text-center ${currentLang === lang ? 'text-white bg-gray-800/50 font-bold' : 'text-gray-300 font-medium'}`}
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="xl:hidden text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="xl:hidden bg-[#161a27] border-t border-gray-800 shadow-xl absolute w-full z-50">
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link, idx) => {
                const isActive = currentPath === link.path || (currentPath === '/' && link.name === 'YT Movies');
                return (
                  <Link 
                    key={idx} 
                    to={link.path} 
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 text-base font-medium ${isActive ? 'text-[#fde047]' : 'text-gray-300 hover:text-white'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="py-3 mt-2 border-t border-gray-800 flex flex-col gap-2">
                <div 
                  className="flex items-center justify-between text-gray-300 cursor-pointer pr-2"
                  onClick={() => setIsLangOpen(!isLangOpen)}
                >
                  <span className="font-medium text-base">Language</span>
                  <div className="flex items-center gap-1">
                    <span>{currentLang}</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>
                {isLangOpen && (
                  <div className="grid grid-cols-2 gap-2 mt-2 bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                    {languages.map((lang, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => changeLanguage(lang)}
                        className={`text-sm hover:text-white p-1 cursor-pointer text-center ${currentLang === lang ? 'text-white font-bold' : 'text-gray-400'}`}
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>



      <main className="flex-1 w-full flex flex-col items-center relative py-12">
        <div className="w-full max-w-4xl mx-auto px-4 z-10 flex flex-col min-h-full">
          {children}
        </div>
      </main>

      <footer className="mt-10 py-10 text-center text-gray-400 border-t border-white/10 bg-black/20 w-full z-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6">
          <Link to="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link>
          <Link to="/contact" className="hover:text-purple-400 transition-colors">Contact</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} QuickVidDownload.com. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>QuickVidDownload - Download YouTube Videos</title>
        <meta name="description" content="Download YouTube videos quickly in MP4 and MP3 formats for free. Fast, secure, and modern UI." />
      </Helmet>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
