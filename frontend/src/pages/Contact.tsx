import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <Helmet>
        <title>Contact Us - QuickVidDownload</title>
      </Helmet>

      <div className="glass-panel p-8">
        <h1 className="text-3xl font-bold mb-2 gradient-text">Contact Us</h1>
        <p className="text-text-muted mb-8">Have a question or feedback? We'd love to hear from you!</p>

        {sent ? (
          <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg">
            Thanks for reaching out! We'll get back to you shortly.
          </div>
        ) : (
          <form className="space-y-4" 
            onSubmit={async (e) => { 
                e.preventDefault(); 
                const formData = new FormData(e.currentTarget);
                try {
                  await fetch('https://formsubmit.co/ajax/rmandal9988@gmail.com', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(Object.fromEntries(formData))
                  });
                  setSent(true);
                } catch (err) {
                  alert('There was an error sending your message. Please try again later.');
                }
            }}>
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_subject" value="New Contact Message from QuickVidDownload!" />
            <input type="hidden" name="_template" value="box" />
            <input type="hidden" name="_captcha" value="false" />
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
              <input type="email" name="email" required className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-500" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Message</label>
              <textarea name="message" required rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-500 custom-scrollbar" placeholder="How can we help you?" />
            </div>
            <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] text-white font-semibold transition-transform shadow-lg shadow-purple-500/25 cursor-pointer">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
