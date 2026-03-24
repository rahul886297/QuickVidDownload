import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdPlaceholder from '../components/AdPlaceholder';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Privacy Policy - QuickVidDownload</title>
        <meta name="description" content="Privacy Policy for QuickVidDownload YouTube video downloader." />
      </Helmet>
      
      <AdPlaceholder type="banner" className="mb-8" />
      
      <div className="glass-panel p-8">
        <h1 className="text-3xl font-bold mb-6 gradient-text">Privacy Policy</h1>
        <div className="space-y-4 text-text/80 leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>At QuickVidDownload, we value your privacy. This Privacy Policy outlines the types of information we collect and how we use it.</p>
          <h2 className="text-xl font-semibold text-text mt-6">Information Collection</h2>
          <p>QuickVidDownload does not store any downloaded videos on our servers. We act as a proxy between you and the content provider. We may collect basic analytics data such as IP addresses (which are anonymized) and usage patterns to improve our service.</p>
          <h2 className="text-xl font-semibold text-text mt-6">Cookies and Local Storage</h2>
          <p>We use Local Storage to save your theme preferences and local download history strictly on your device. We use third-party advertising partners like Google AdSense which may use cookies to serve personalized ads based on your visits to our site.</p>
          <h2 className="text-xl font-semibold text-text mt-6">Contact Us</h2>
          <p>If you have any questions about our Privacy Policy, please visit our Contact page.</p>
        </div>
      </div>
    </div>
  );
}
