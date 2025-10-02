'use client';

import { Github, Linkedin, Mail, ExternalLink, Calendar, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import NodeNetwork from "@/components/NodeNetwork";
import ContactForm from "@/components/ContactForm";
import LiveStats from "@/components/LiveStats";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative">
      {/* Node Network Background */}
      <NodeNetwork />
      
      {/* Animated background */}
      <div className="fixed inset-0 opacity-40 pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl transition-all duration-500 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
            animationDelay: '700ms',
          }}
        />
        <div 
          className="absolute top-3/4 right-1/3 w-64 h-64 rounded-full blur-2xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
            animationDelay: '1000ms',
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 backdrop-blur-md bg-slate-900/20 border-b border-white/5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-600 hover:border-slate-500 transition-colors relative">
              {!imageError ? (
                <Image 
                  src="/profile-picture.jpg" 
                  alt="Brian Cheruiyot" 
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="text-white font-semibold text-sm">BC</span>
              )}
            </div>
            <div className="hidden lg:block">
              <LiveStats />
            </div>
          </div>
          <div className="hidden md:flex space-x-8 text-sm">
            <a href="#work" className="text-slate-300 hover:text-white transition-colors duration-300 font-medium">Work</a>
            <a href="#projects" className="text-slate-300 hover:text-white transition-colors duration-300 font-medium">Projects</a>
            <a href="#contact" className="text-slate-300 hover:text-white transition-colors duration-300 font-medium">Contact</a>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-white/5">
            <div className="flex flex-col p-6 space-y-4">
              <a 
                href="#work" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white transition-colors duration-300 font-medium py-2"
              >
                Work
              </a>
              <a 
                href="#projects" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white transition-colors duration-300 font-medium py-2"
              >
                Projects
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white transition-colors duration-300 font-medium py-2"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className={`min-h-screen flex items-center justify-center px-6 pt-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center max-w-5xl mx-auto relative z-10">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm mb-8 backdrop-blur-sm">
              Available for hire
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-4 tracking-tight leading-tight">
            Brian Cheruiyot
          </h1>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-8 tracking-tight leading-tight text-slate-200">
            Full-Stack Developer
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Building scalable web applications with modern technologies. 
            Experienced in React, Next.js, Node.js, Python, and cloud deployment.
          </p>
          <div className="flex justify-center space-x-6 mb-16">
            <a href="https://github.com/Bryan-cheru" target="_blank" 
               className="group p-3 border border-slate-600 rounded-full hover:border-white/50 transition-all duration-300 hover:scale-110">
              <Github size={20} className="group-hover:text-white transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/bryancheru" target="_blank"
               className="group p-3 border border-slate-600 rounded-full hover:border-white/50 transition-all duration-300 hover:scale-110">
              <Linkedin size={20} className="group-hover:text-white transition-colors" />
            </a>
            <a href="mailto:briancheruiyot501@gmail.com"
               className="group p-3 border border-slate-600 rounded-full hover:border-white/50 transition-all duration-300 hover:scale-110">
              <Mail size={20} className="group-hover:text-white transition-colors" />
            </a>
          </div>
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto">
              <div className="w-1 h-3 bg-white/60 rounded-full mx-auto mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="work" className="pt-16 pb-32 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-20 text-center">Selected Work</h2>
          <div className="space-y-16">
            
            <div className="group relative p-8 rounded-2xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-500 backdrop-blur-xl bg-slate-900/50 hover:bg-slate-800/60 shadow-xl shadow-slate-950/50">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors">Founder & AI Trading Researcher</h3>
                  <p className="text-blue-400 text-lg font-medium">Tana Trading Labs</p>
                </div>
                <span className="text-slate-400 flex items-center gap-2 mt-2 md:mt-0 text-sm">
                  <Calendar size={16} />
                  May 2024 – Present
                </span>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Founded startup focused on building full-stack web applications and exploring fintech solutions. 
                Developed end-to-end applications using modern frameworks, APIs, and databases while honing development expertise.
              </p>
            </div>

            <div className="group relative p-8 rounded-2xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-500 hover:bg-slate-800/40 backdrop-blur-sm bg-slate-900/30">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors">Full Stack Engineer</h3>
                  <p className="text-blue-400 text-lg font-medium">TradePilotAI.com</p>
                </div>
                <span className="text-slate-400 flex items-center gap-2 mt-2 md:mt-0 text-sm">
                  <Calendar size={16} />
                  May 2024 – Aug 2024
                </span>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Full-stack web developer building comprehensive trading platform. Developed React components, 
                API integrations, user authentication, data visualization tools, and educational interfaces. 
                Collaborated with senior architects on scalable web architecture and modern deployment practices.
              </p>
            </div>

            <div className="group relative p-8 rounded-2xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-500 hover:bg-slate-800/40 backdrop-blur-sm bg-slate-900/30">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors">Full-Stack Developer Intern</h3>
                  <p className="text-blue-400 text-lg font-medium">Nganyaapp</p>
                </div>
                <span className="text-slate-400 flex items-center gap-2 mt-2 md:mt-0 text-sm">
                  <Calendar size={16} />
                  3 months
                </span>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Developed comprehensive fleet management platform with GPS tracking, booking systems, and staff management. 
                Built responsive web interfaces, integrated real-time tracking APIs, and implemented automated scheduling features 
                for transport companies.
              </p>
            </div>

            <div className="group relative p-8 rounded-2xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-500 hover:bg-slate-800/40 backdrop-blur-sm bg-slate-900/30">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors">Software Engineer</h3>
                  <p className="text-blue-400 text-lg font-medium">Everflow Trading</p>
                </div>
                <span className="text-slate-400 flex items-center gap-2 mt-2 md:mt-0 text-sm">
                  <Calendar size={16} />
                  Jul – Aug 2024
                </span>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Full-stack developer working on financial applications using C# .NET and Python. 
                Built web APIs, implemented automated testing frameworks, and optimized application performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-20 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            
            <a href="https://www.tradepilotai.com/about" target="_blank" className="group relative overflow-hidden rounded-2xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-500 backdrop-blur-xl bg-slate-900/50 hover:bg-slate-800/60 shadow-xl shadow-slate-950/50 block">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-semibold text-white group-hover:text-blue-300 transition-colors">Trading Platform Web App</h3>
                  <ExternalLink size={20} className="text-slate-400 group-hover:text-blue-300 transition-colors transform group-hover:scale-110" />
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed text-base">
                  Comprehensive web application with user authentication, real-time data visualization, 
                  responsive UI components, and educational content management system. 
                  Built with modern frameworks and deployment best practices.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/20">Next.js</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/20">TypeScript</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/20">Trading APIs</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Github size={16} />
                  <span>View on GitHub</span>
                </div>
              </div>
            </a>

            <a href="https://telegram-bot-lufl.onrender.com/" target="_blank" className="group relative overflow-hidden rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-all duration-500 bg-slate-800/20 hover:bg-slate-800/40 block">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-medium text-white group-hover:text-purple-300 transition-colors">Telegram Trading Bot</h3>
                  <ExternalLink size={20} className="text-slate-400 group-hover:text-purple-300 transition-colors" />
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Professional full-stack application that monitors Telegram channels, processes trading signals with OCR, 
                  and manages multi-account trading. Features real-time dashboard, risk management, and automated execution.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Node.js</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Express</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">OCR</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </div>
              </div>
            </a>

            <a href="https://everflowtrading.com" target="_blank" className="group relative overflow-hidden rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-all duration-500 bg-slate-800/20 hover:bg-slate-800/40 block">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-medium text-white group-hover:text-green-300 transition-colors">Enterprise Web Application</h3>
                  <ExternalLink size={20} className="text-slate-400 group-hover:text-green-300 transition-colors" />
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Full-stack enterprise application with automated workflows and data processing capabilities. 
                  Built with C# backend, SQL Server database, and responsive web interface for business process management.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">C# .NET</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">SQL Server</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Azure</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Github size={16} />
                  <span>Private Repository</span>
                </div>
              </div>
            </a>

            <a href="https://nganyaapp.com/" target="_blank" className="group relative overflow-hidden rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-all duration-500 bg-slate-800/20 hover:bg-slate-800/40 block">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-medium text-white group-hover:text-cyan-300 transition-colors">Nganyaapp Fleet Management</h3>
                  <ExternalLink size={20} className="text-slate-400 group-hover:text-cyan-300 transition-colors" />
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Complete fleet management and booking platform for transport companies. Built during 3-month internship 
                  with GPS tracking, online booking system, staff management, and real-time fleet monitoring capabilities.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">GPS Integration</span>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Real-time Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <ExternalLink size={16} />
                  <span>Live Platform</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-20 text-center">Technical Expertise</h2>
          
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">TS</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Frontend Development</h3>
              <p className="text-slate-400 text-sm">React, Next.js, TypeScript, Responsive Design, Modern CSS</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">FS</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Backend Development</h3>
              <p className="text-slate-400 text-sm">Node.js, Python, C# .NET, REST APIs, Microservices</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">ML</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Database & DevOps</h3>
              <p className="text-slate-400 text-sm">SQL/NoSQL Databases, Docker, Cloud Deployment, CI/CD</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">IN</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Tools & Frameworks</h3>
              <p className="text-slate-400 text-sm">Git, Testing Frameworks, Agile Development, Code Review</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-slate-700/50 bg-slate-900/30 backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-white mb-4">Languages & Core</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">JavaScript</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">TypeScript</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Node.js</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Python</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">C# .NET</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">SQL</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-slate-700/50 bg-slate-900/30 backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-white mb-4">Frameworks & Libraries</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Next.js</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Express.js</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">TailwindCSS</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Telegram Bot API</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">MetaAPI</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-slate-700/50 bg-slate-900/30 backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-white mb-4">Tools & Deployment</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Git</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Render</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Vercel</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">GPS APIs</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">OCR</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Git</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-20 text-center">What Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* South Africa Client */}
            <div className="relative p-8 rounded-2xl border border-slate-700/50 bg-slate-900/30 backdrop-blur-sm">
              <div className="text-4xl text-blue-400 mb-6">&ldquo;</div>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Working with Brian has been an absolute pleasure. He is exceptional at what he does — always professional, 
                detail-oriented, and truly goes the extra mile to deliver above expectations. His dedication and work ethic 
                stand out, making him a valuable partner on any project. Highly recommended to all! I look forward to 
                working with him again.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  ZA
                </div>
                <div>
                  <div className="text-white font-medium">Verified Client</div>
                  <div className="text-slate-400 text-sm flex items-center gap-2">
                    Harrismith, South Africa
                  </div>
                </div>
              </div>
            </div>

            {/* Australia Client */}
            <div className="relative p-8 rounded-2xl border border-slate-700/50 bg-slate-900/30 backdrop-blur-sm">
              <div className="text-4xl text-green-400 mb-6">&ldquo;</div>
              <div className="text-slate-300 mb-8 leading-relaxed space-y-4">
                <p>
                  Brian responded to my UpWork post within minutes with thoughtful suggestions and improvements. 
                  To my surprise, he completed the first version of the NinjaTrader bar type within just a few hours.
                </p>
                <p>
                  The code was clear, efficient, and well-commented. After testing it live during a volatile market session, 
                  it handled everything flawlessly under heavy load with multiple indicators.
                </p>
                <p className="text-slate-200 font-medium">
                  Brian was professional, communicative, and extremely skilled. I couldn&apos;t recommend him more highly — 
                  I&apos;ll absolutely be working with him again.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  AU
                </div>
                <div>
                  <div className="text-white font-medium">Trading Systems Developer</div>
                  <div className="text-slate-400 text-sm flex items-center gap-2">
                    Brighton, Australia
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-slate-400 mb-6">Ready to join these satisfied clients?</p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600/80 hover:bg-blue-600 border border-blue-500/50 rounded-lg text-white font-medium transition-all duration-300 backdrop-blur-sm group"
            >
              Start Your Project
              <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-12 text-white">Let&apos;s Build Something Amazing</h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your trading systems or build the next big fintech solution? 
            Let&apos;s discuss how we can work together.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-900/30 backdrop-blur-sm border border-slate-700/50">
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="text-white font-medium mb-1">Fast Delivery</h3>
              <p className="text-slate-400 text-sm">Most projects completed within 2-4 weeks</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/30 backdrop-blur-sm border border-slate-700/50">
              <div className="text-2xl mb-2">💡</div>
              <h3 className="text-white font-medium mb-1">Expert Solutions</h3>
              <p className="text-slate-400 text-sm">Specialized in trading & fintech systems</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/30 backdrop-blur-sm border border-slate-700/50">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-medium mb-1">Results Driven</h3>
              <p className="text-slate-400 text-sm">Focused on measurable business impact</p>
            </div>
          </div>
          
          {/* Working Contact Form */}
          <ContactForm />
          
          <div className="mt-8 text-slate-400 text-sm">
            Or reach out directly: 
            <a href="mailto:briancheruiyot501@gmail.com" className="text-blue-400 hover:text-blue-300 ml-1 transition-colors">
              briancheruiyot501@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-slate-400">
          <p>© 2025 Brian Cheruiyot</p>
          <p>Based in Nairobi, Kenya</p>
        </div>
      </footer>
    </div>
  );
}
