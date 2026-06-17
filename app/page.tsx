"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Target,
  CalendarCheck,
  Users,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  PhoneCall,
  TrendingUp,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

// --- Custom Icons ---
function ToothIcon({ className }: { className?: string }) {
  const maskId = React.useId ? React.useId().replace(/:/g, "") : "tooth-mask";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 24" fill="currentColor" className={className}>
      <mask id={maskId}>
        <rect width="29" height="24" fill="white" />
        <path d="M10,7 Q12,9 14,7 T 18,7" stroke="black" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </mask>
      <path 
        mask={`url(#${maskId})`}
        d="M9,2C6,2 4,5 4,8C4,10.11 5,13 6,14C7,15 8,22 10,22C14.54,22 12,15 14,15C16,15 13.46,22 18,22C20,22 21,15 22,14C23,13 24,10.11 24,8C24,5 22,2 19,2C16,2 16,3 14,3C12,3 12,2 9,2Z" 
      />
      {/* Sparkle 1 (Top Left) */}
      <path d="M 4 1 C 4 2.5 5.5 4 7 4 C 5.5 4 4 5.5 4 7 C 4 5.5 2.5 4 1 4 C 2.5 4 4 2.5 4 1 Z" />
      {/* Sparkle 2 (Bottom Left) */}
      <path d="M 2 8 C 2 9 3 10 4 10 C 3 10 2 11 2 12 C 2 11 1 10 0 10 C 1 10 2 9 2 8 Z" />
      {/* Sparkle 3 (Right) */}
      <path d="M 26 10.5 C 26 11.8 27.2 13 28.5 13 C 27.2 13 26 14.2 26 15.5 C 26 14.2 24.8 13 23.5 13 C 24.8 13 26 11.8 26 10.5 Z" />
    </svg>
  );
}

// --- Logo Component ---
function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <img 
      src="/logo.png" 
      alt="GrowscaleX Logo" 
      className={`object-contain ${className}`}
    />
  );
}

// --- Navigation ---
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl h-16 md:h-20 flex items-center justify-between">
        <Link href="/">
          <Logo className="h-8 md:h-10 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="#how-it-works"
            className="text-gray-600 hover:text-primary transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#benefits"
            className="text-gray-600 hover:text-primary transition-colors"
          >
            Benefits
          </Link>
          <Link
            href="#faq"
            className="text-gray-600 hover:text-primary transition-colors"
          >
            FAQ
          </Link>
        </div>
        <Link 
          href="/book"
          className="bg-primary text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full font-medium text-xs md:text-sm hover:bg-primary-hover transition-colors flex items-center gap-1.5 md:gap-2 shadow-lg shadow-primary/20 shrink-0"
        >
          Book A Call <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </Link>
      </div>
    </nav>
  );
}

// --- Hero Section ---
function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden relative min-h-[90vh] flex items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-gradient-to-b from-[#2F6FE5]/10 via-[#2F6FE5]/5 to-transparent rounded-full blur-[120px] -z-10" />
      
      {/* Decorative Floating Teeth */}
      {/* 1. Top Left (Mobile & Desktop) */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 left-[-5%] md:top-32 md:left-[10%] text-primary opacity-15 z-0 pointer-events-none"
      >
        <ToothIcon className="w-28 h-28 md:w-32 md:h-32" />
      </motion.div>

      {/* 2. Bottom Right (Mobile & Desktop) */}
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-[-10%] md:bottom-32 md:right-[10%] text-blue-400 opacity-15 z-0 pointer-events-none"
      >
        <ToothIcon className="w-32 h-32 md:w-48 md:h-48" />
      </motion.div>

      {/* 3. Middle Right (Desktop Only) */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [15, 0, 15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 left-[85%] text-primary opacity-15 z-0 pointer-events-none hidden md:block"
      >
        <ToothIcon className="w-20 h-20" />
      </motion.div>

      {/* 4. Middle Left (Desktop Only - NEW) */}
      <motion.div 
        animate={{ y: [0, 15, 0], rotate: [-10, 0, -10] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-[65%] left-[8%] text-blue-300 opacity-15 z-0 pointer-events-none hidden md:block"
      >
        <ToothIcon className="w-24 h-24" />
      </motion.div>

      {/* 5. Middle Right (Mobile Only - NEW) */}
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[45%] right-[-5%] text-primary opacity-15 z-0 pointer-events-none md:hidden"
      >
        <ToothIcon className="w-20 h-20" />
      </motion.div>

      {/* 6. Bottom Left (Mobile Only - NEW) */}
      <motion.div 
        animate={{ y: [0, 15, 0], rotate: [10, 0, 10] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute bottom-[35%] left-[-10%] text-blue-300 opacity-15 z-0 pointer-events-none md:hidden"
      >
        <ToothIcon className="w-24 h-24" />
      </motion.div>
      
      <div className="container mx-auto max-w-4xl relative z-10 flex flex-col items-center gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center pt-10 lg:pt-0"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm text-primary font-medium text-sm mb-8 border border-blue-100/50">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-gray-700">
              Pay-Per-Show Cosmetic Dental Marketing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-medium text-dark leading-[1.1] mb-8 tracking-tight">
            Fill Your Calendar With <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 font-semibold">
              Cosmetic Patients.
            </span>
            <br />
            Only Pay When They Show Up.
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Stop gambling on retainers and marketing promises. Get qualified
            cosmetic patients booking appointments with your practice and only
            pay when they attend.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/book"
              className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-primary-hover transition-all hover:shadow-xl hover:shadow-primary/30 flex items-center justify-center gap-2 group"
            >
              Book A Strategy Call 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" /> Zero long-term
              contracts.
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" /> No expensive
              retainers.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Problem Section ---
function Problem() {
  return (
    <section className="py-24 bg-gray-50 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dark leading-tight tracking-tight">
              Tired Of Paying For Marketing Without Knowing If It Will Work?
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Most dental practices don&apos;t struggle because they&apos;re
                bad at dentistry. They struggle because patient flow is
                unpredictable.
              </p>
              <p>
                One month your consultation calendar is full. The next month
                you&apos;re wondering where the next cosmetic case is coming
                from.
              </p>
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-red-900 font-medium">
                Meanwhile, agencies keep charging the same monthly fee whether
                you get results or not.
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 relative"
          >
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary text-white flex items-center justify-center rounded-xl shadow-lg rotate-[-10deg]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-6 mt-4">
              That&apos;s why we&apos;ve built a simpler model.
            </h3>
            <ul className="space-y-5">
              {[
                { text: "You don't pay for ad management.", active: false },
                { text: "You don't pay for reports.", active: false },
                { text: "You don't pay for promises.", active: false },
                {
                  text: "You only pay when patients actually show up for their appointment.",
                  active: true,
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-4 ${item.active ? "text-primary font-bold text-lg" : "text-gray-500 line-through decoration-gray-300"}`}
                >
                  {item.active ? (
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    </div>
                  )}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Benefits Section ---
function Benefits() {
  const benefits = [
    {
      title: "More Cosmetic Patients",
      desc: "Get in front of people actively looking for cosmetic dental treatments in your area.",
      icon: Users,
    },
    {
      title: "Lower Risk",
      desc: "No expensive retainers or long-term commitments before seeing results.",
      icon: ShieldCheck,
    },
    {
      title: "A Fuller Calendar",
      desc: "Keep your consultation schedule filled with more opportunities to convert patients into treatment plans.",
      icon: CalendarCheck,
    },
    {
      title: "Focus On Patient Care",
      desc: "Spend less time worrying about marketing and more time serving patients.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="benefits" className="py-24 px-6 bg-white shrink-0">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-dark tracking-tight mb-4">
            What This Means For Your Practice
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Experience the freedom of a performance-based partnership.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-primary/30 transition-colors group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- How It Works Section ---
function HowItWorks() {
  const steps = [
    {
      title: "Book A Quick Call",
      desc: "We'll learn about your practice and determine whether this model is a good fit.",
    },
    {
      title: "We Launch Your Campaign",
      desc: "Everything is set up to attract cosmetic patients interested in treatment.",
    },
    {
      title: "Patients Book Appointments",
      desc: "Qualified prospects schedule consultations with your practice.",
    },
    {
      title: "They Show Up. You Pay.",
      desc: "No retainers. No paying for activity. No paying for marketing promises. You only pay when patients attend their appointment.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 px-6 bg-dark text-white overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Getting Started Is Simple
          </h2>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${i % 2 === 0 ? "md:flex-row-reverse" : ""} relative`}
              >
                <div className="flex-1 w-full text-center md:text-left shadow-2xl p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm relative z-10 hidden md:block opacity-0" />

                <div className="w-16 h-16 shrink-0 bg-primary rounded-full flex items-center justify-center font-bold text-2xl z-10 shadow-lg shadow-primary/50 border-4 border-dark relative">
                  {i + 1}
                  {i !== steps.length - 1 && (
                    <div className="md:hidden absolute top-full left-1/2 w-0.5 h-12 bg-white/10 -translate-x-1/2" />
                  )}
                </div>

                <div
                  className={`flex-1 w-full md:w-1/2 text-center ${i % 2 === 0 ? "md:text-right" : "md:text-left"} p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm relative z-10 hover:bg-white/10 transition-colors`}
                >
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-lg">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- FAQ Section ---
function FAQ() {
  const faqs = [
    {
      q: "How is this different from a traditional marketing agency?",
      a: "Most agencies charge fixed monthly fees regardless of results. Our model is focused on bringing cosmetic patients into your practice and only getting paid when they show up.",
    },
    {
      q: "Do I need to sign a long-term contract?",
      a: "No. We believe results should keep clients, not contracts.",
    },
    {
      q: "What kind of patients do you help attract?",
      a: "People actively looking for cosmetic dental treatments and consultations.",
    },
    {
      q: "What happens if patients don't show up?",
      a: "Simple: You don't pay. Our incentives are 100% aligned with your success.",
    },
    {
      q: "How quickly can I get started?",
      a: "Book a quick strategy call and we'll determine whether this model is a fit for your practice. If it is, we can launch quickly.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-dark tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-50"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 text-left flex items-center justify-between font-semibold text-dark hover:bg-gray-100/50 transition-colors"
              >
                <span className="text-lg pr-8">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-600">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- CTA Section ---
function CTA() {
  return (
    <section
      id="book"
      className="py-24 px-6 bg-gray-50 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-10 md:p-12 rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100"
        >
          <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <PhoneCall className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4 tracking-tight">
            Ready To Fill More Consultation Slots?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            If you&apos;re looking for a lower-risk way to attract cosmetic
            dental patients, let&apos;s talk. Book a quick strategy call and see
            if this model is right for your practice.
          </p>
          <Link href="/book" className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-hover transition-all hover:scale-105 shadow-xl shadow-primary/30 flex items-center justify-center gap-3 mx-auto w-full sm:w-auto">
            Book A Strategy Call <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="bg-dark text-gray-400 py-12 px-6 border-t border-white/10">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="invert grayscale brightness-200 contrast-200">
          <Logo />
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} GrowscaleX. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm">
          <Link href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Problem />
      <Benefits />
      <HowItWorks />
      {/* Value Prop Summary */}
      <section className="py-20 bg-primary text-white px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            <div className="pb-8 md:pb-0 md:px-6">
              <h4 className="text-4xl font-black mb-2">$0</h4>
              <p className="text-blue-100 font-medium">Upfront Management Fees</p>
            </div>
            <div className="py-8 md:py-0 md:px-6">
              <h4 className="text-4xl font-black mb-2">0</h4>
              <p className="text-blue-100 font-medium">Long-Term Contracts</p>
            </div>
            <div className="py-8 md:py-0 md:px-6">
              <h4 className="text-4xl font-black mb-2">100%</h4>
              <p className="text-blue-100 font-medium">Results Focused</p>
            </div>
            <div className="pt-8 md:pt-0 md:px-6">
              <h4 className="text-4xl font-black mb-2">1</h4>
              <p className="text-blue-100 font-medium">Shared Goal</p>
            </div>
          </div>
        </div>
      </section>
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
