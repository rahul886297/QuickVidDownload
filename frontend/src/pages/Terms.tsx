import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdPlaceholder from '../components/AdPlaceholder';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Terms of Service - QuickVidDownload</title>
        <meta name="description" content="Terms and conditions for using QuickVidDownload." />
      </Helmet>
      
      <div className="glass-panel p-8">
        <h1 className="text-3xl font-bold mb-6 gradient-text">Terms of Service</h1>
        <div className="space-y-4 text-text/80 leading-relaxed">
          <p>By accessing QuickVidDownload, you agree to be bound by these Terms of Service.</p>
          <h2 className="text-xl font-semibold text-text mt-6">Use License</h2>
          <p>QuickVidDownload is a tool designed to help you download videos for personal, fair-use purposes. You may not use this service to download protected content or violate the copyrights of content creators.</p>
          <h2 className="text-xl font-semibold text-text mt-6">Disclaimer</h2>
          <p>The materials on QuickVidDownload are provided on an 'as is' basis. QuickVidDownload makes no warranties, expressed or implied, and hereby disclaims all other warranties.</p>
        </div>
      </div>
      
      <AdPlaceholder type="banner" className="mt-8" />
    </div>
  );
}
