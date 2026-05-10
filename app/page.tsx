'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Smartphone, MapPin, Search } from 'lucide-react';
import logo from '../Untitled design (18).png';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Mock API call for waitlist
      setIsSubmitted(true);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col justify-center">
      {/* Abstract Background Design */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Glowing orbs for depth */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[80px]"></div>
        <div className="absolute top-[20%] -left-32 w-[400px] h-[400px] rounded-full bg-blue-400/5 blur-[80px]"></div>
      </div>

      {/* Navigation (Minimal) */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-2xl bg-white/60 ring-1 ring-blue-600/20 px-3 py-2">
            <Image
              src={logo}
              alt="PropTrace logo"
              width={160}
              height={36}
              className="h-6 w-auto sm:h-7"
              priority
            />
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Column: Copy & Form */}
        <div className="flex-1 text-center lg:text-left max-w-2xl lg:max-w-none mx-auto">

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-poppins text-4xl sm:text-5xl lg:text-[3.6rem] font-medium tracking-tight text-black leading-[1.1] mb-6 max-w-[640px] mx-auto lg:mx-0"
          >
            Skip Trace Instantly <br className="hidden lg:block"/>
            From Your Phone. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              No Complicated Software Needed.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            No complex dashboards. Just open the app, type in the address, and get verified property owner data with 
            <strong className="text-slate-900 font-semibold">75% to 95% accuracy</strong> before you even leave the driveway.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-none mx-auto lg:mx-0 lg:max-w-xl"
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center shadow-sm"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-blue-600">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-lg font-bold font-poppins text-slate-900 mb-1">You&apos;re on the list!</h3>
                <p className="text-slate-600 text-sm">Keep an eye on your inbox. We&apos;ll notify you the moment the app is ready for download.</p>
              </motion.div>
            ) : (
              <div className="w-full">
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="w-full h-14 px-8 rounded-xl bg-blue-600/60 text-white font-semibold shadow-[0_8px_16px_-6px_rgba(37,99,235,0.25)] whitespace-nowrap flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  Launching Soon
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
            
            {!isSubmitted && (
              <p className="text-xs text-slate-500 mt-4 text-center lg:text-left flex items-center justify-center lg:justify-start gap-1.5">
                <CheckCircle2 size={14} className="text-blue-500" />
                No desktop required. No spam. We&apos;ll only email you when the app is live.
              </p>
            )}
          </motion.div>
        </div>

        {/* Mobile-only mock to keep hero phone visible */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:hidden w-full flex justify-center"
        >
          <div className="relative w-[260px] h-[520px] bg-black rounded-[2.5rem] p-2.5 shadow-2xl shadow-blue-900/20 ring-1 ring-slate-900/5">
            <div className="relative w-full h-full bg-slate-50 rounded-[2rem] overflow-hidden flex flex-col pt-8">
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center">
                <div className="w-28 h-5 bg-black rounded-b-2xl"></div>
              </div>
              <div className="flex px-5 pt-6 pb-4 items-center justify-between bg-white border-b border-slate-100">
                <div>
                  <h3 className="font-poppins font-bold text-lg text-slate-900">Find Owner</h3>
                  <p className="text-[10px] text-slate-500 font-medium">Anywhere in the US</p>
                </div>
                <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                  <MapPin size={16} />
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="text-[10px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">Target Property</div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                      <Search size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">1234 Maple Street</div>
                      <div className="text-xs text-slate-500">Austin, TX 78701</div>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-600 rounded-2xl p-5 shadow-lg shadow-blue-600/20 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mr-3 -mt-3 w-20 h-20 bg-white/20 rounded-full blur-2xl"></div>
                  <div className="relative z-10 text-xs font-medium text-blue-100 mb-1">Owner Found!</div>
                  <div className="relative z-10 text-xl font-bold font-poppins mb-3">Jonathan Davis</div>
                  <div className="relative z-10 bg-white/10 rounded-xl p-3 flex items-center justify-between backdrop-blur-sm border border-white/10">
                    <div>
                      <div className="text-[10px] text-blue-200 mb-0.5">Mobile Phone</div>
                      <div className="font-mono text-sm">(512) 555-0199</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <div className="w-full h-10 bg-black text-white rounded-xl flex items-center justify-center text-xs font-semibold shadow-lg">
                  Save to Leads
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Visual App Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
          className="flex-1 hidden md:flex justify-center lg:justify-end relative"
        >
          {/* Decorative background for the phone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-100 to-white rounded-full blur-3xl opacity-50 z-0"></div>
          
          <div className="relative z-10 w-[300px] h-[600px] bg-black rounded-[3rem] p-2.5 shadow-2xl shadow-blue-900/20 ring-1 ring-slate-900/5 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
            {/* Screen Content Wrapper */}
            <div className="relative w-full h-full bg-slate-50 rounded-[2.5rem] overflow-hidden flex flex-col pt-8">
              {/* Fake status bar notch */}
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center">
                <div className="w-32 h-6 bg-black rounded-b-2xl"></div>
              </div>
              
              {/* Mockup UI */}
              <div className="flex px-6 pt-6 pb-4 items-center justify-between bg-white border-b border-slate-100">
                <div>
                  <h3 className="font-poppins font-bold text-lg text-slate-900">Find Owner</h3>
                  <p className="text-[10px] text-slate-500 font-medium">Anywhere in the US</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                  <MapPin size={18} />
                </div>
              </div>

              <div className="p-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-4">
                  <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Target Property</div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                      <Search size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">1234 Maple Street</div>
                      <div className="text-xs text-slate-500">Austin, TX 78701</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600 rounded-2xl p-5 shadow-lg shadow-blue-600/20 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                  <div className="relative z-10 text-xs font-medium text-blue-100 mb-1">Owner Found!</div>
                  <div className="relative z-10 text-xl font-bold font-poppins mb-4">Jonathan Davis</div>
                  
                  <div className="relative z-10 bg-white/10 rounded-xl p-3 flex items-center justify-between backdrop-blur-sm border border-white/10">
                    <div>
                      <div className="text-[10px] text-blue-200 mb-0.5">Mobile Phone</div>
                      <div className="font-mono text-sm">(512) 555-0199</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom floating button */}
              <div className="absolute bottom-6 left-6 right-6">
                 <div className="w-full h-12 bg-black text-white rounded-xl flex items-center justify-center text-sm font-semibold shadow-lg">
                   Save to Leads
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
