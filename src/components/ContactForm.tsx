'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-slate-800/70 transition-all backdrop-blur-sm"
          />
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-slate-800/70 transition-all backdrop-blur-sm"
          />
        </div>
        
        <div>
          <textarea
            name="message"
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-slate-800/70 transition-all backdrop-blur-sm resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-6 py-3 bg-blue-600/80 hover:bg-blue-600 border border-blue-500/50 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {status === 'loading' ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : status === 'success' ? (
            <>
              <CheckCircle size={16} />
              Message Sent!
            </>
          ) : status === 'error' ? (
            <>
              <AlertCircle size={16} />
              Try Again
            </>
          ) : (
            <>
              <Send size={16} className="group-hover:translate-x-1 transition-transform" />
              Send Message
            </>
          )}
        </button>

        {status === 'success' && (
          <div className="text-green-400 text-sm text-center mt-2">
            Thanks! I&apos;ll get back to you soon.
          </div>
        )}

        {status === 'error' && (
          <div className="text-red-400 text-sm text-center mt-2">
            Something went wrong. Please try again.
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;