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
  HeartHandshake,
  Sparkles,
} from "lucide-react";

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
        <a 
          href="tel:+918891993882"
          className="bg-primary text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full font-medium text-xs md:text-sm hover:bg-primary-hover transition-colors flex items-center gap-1.5 md:gap-2 shadow-lg shadow-primary/20 shrink-0"
        >
          Book A Call <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </a>
      </div>
    </nav>
  );
}

// --- Hero Section ---
function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden relative min-h-[90vh] flex items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-gradient-to-b from-[#2F6FE5]/10 via-[#2F6FE5]/5 to-transparent rounded-full blur-[120px] -z-10" />
      
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
              Contact us for our current offer
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-medium text-dark leading-[1.1] mb-8 tracking-tight">
            Fill Your Calendar With <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 font-semibold">
              Qualified Appointments.
            </span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            We help service-based businesses attract, qualify, and book more appointments with high-intent prospects.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="tel:+918891993882"
              className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-primary-hover transition-all hover:shadow-xl hover:shadow-primary/30 flex items-center justify-center gap-2 group"
            >
              Book A Strategy Call 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" /> No Long-Term Contracts
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" /> No Expensive Retainers
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" /> Results-Focused Approach
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
              Tired Of An Unpredictable Pipeline?
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Most businesses don&apos;t struggle because they offer a bad service. They struggle because new opportunities aren&apos;t coming in consistently.
              </p>
              <p>
                One month you&apos;re fully booked. The next month you&apos;re wondering where your next customer is coming from.
              </p>
              <p>
                Referrals are great. Word-of-mouth is powerful. But neither creates predictable growth.
              </p>
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-blue-900 font-medium">
                If you want consistent revenue, you need a consistent flow of qualified appointments. That&apos;s where we come in.
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
              Why Businesses Choose GrowscaleX
            </h3>
            <ul className="space-y-5">
              {[
                { title: "Less Guesswork", text: "No more wondering where your next customer will come from.", active: true },
                { title: "Consistent Opportunities", text: "Create a steady flow of qualified appointments throughout the year.", active: true },
                { title: "Growth-Focused Strategy", text: "Every effort is focused on generating opportunities that can drive revenue.", active: true },
                { title: "A Long-Term Growth Partner", text: "We're focused on helping your business grow, not selling unnecessary services.", active: true },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 text-gray-700"
                >
                  <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5 text-primary" />
                  <div>
                    <span className="block font-bold text-dark">{item.title}</span>
                    <span className="text-sm text-gray-500">{item.text}</span>
                  </div>
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
      title: "More Qualified Appointments",
      desc: "Connect with people actively searching for the services you offer.",
      icon: Users,
    },
    {
      title: "More Revenue Opportunities",
      desc: "More conversations with qualified prospects means more opportunities to close business.",
      icon: ShieldCheck,
    },
    {
      title: "A Predictable Pipeline",
      desc: "Build a reliable flow of appointments instead of relying solely on referrals.",
      icon: CalendarCheck,
    },
    {
      title: "Focus On What You Do Best",
      desc: "Spend less time chasing leads and more time serving customers.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="benefits" className="py-24 px-6 bg-white shrink-0">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-dark tracking-tight mb-4">
            What This Means For Your Business
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Experience the freedom of a predictable, consistent pipeline.
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
      title: "Book A Strategy Call",
      desc: "We'll learn about your business, goals, and current challenges.",
    },
    {
      title: "Build Your Growth Plan",
      desc: "We'll identify the best approach for attracting qualified prospects in your market.",
    },
    {
      title: "Start Booking More Appointments",
      desc: "Qualified prospects begin entering your pipeline and booking appointments.",
    },
    {
      title: "Focus On Closing Deals",
      desc: "Spend your time doing what matters most—turning opportunities into customers.",
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
      q: "What types of businesses do you work with?",
      a: "We primarily work with service-based businesses looking to generate more qualified appointments and growth opportunities.",
    },
    {
      q: "How do I know if this is a good fit for my business?",
      a: "Book a strategy call and we'll discuss your goals, market, and current situation.",
    },
    {
      q: "How quickly can I get started?",
      a: "Most businesses can get started shortly after the initial strategy call.",
    },
    {
      q: "Do I need to sign a long-term contract?",
      a: "No. We believe relationships should be built on results and trust.",
    },
    {
      q: "What makes GrowscaleX different?",
      a: "We focus on one thing: helping businesses generate more qualified appointments and revenue opportunities.",
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
            Ready To Generate More Qualified Appointments?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            If you&apos;re looking for a predictable way to attract more opportunities and grow your business, let&apos;s talk. Book a strategy call and see what&apos;s possible for your business.
          </p>
          <a href="tel:+918891993882" className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-hover transition-all hover:scale-105 shadow-xl shadow-primary/30 flex items-center justify-center gap-3 mx-auto w-full sm:w-auto">
            Book A Strategy Call <ArrowRight className="w-5 h-5" />
          </a>
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
          <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            <div className="pb-8 md:pb-0 md:px-6">
              <h4 className="text-4xl font-black mb-2">₹0</h4>
              <p className="text-blue-100 font-medium">Upfront Management Fees</p>
            </div>
            <div className="py-8 md:py-0 md:px-6">
              <h4 className="text-4xl font-black mb-2">0</h4>
              <p className="text-blue-100 font-medium">Long-Term Contracts</p>
            </div>
            <div className="py-8 md:py-0 md:px-6">
              <h4 className="text-4xl font-black mb-2">100%</h4>
              <p className="text-blue-100 font-medium">Focused On Results</p>
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
