"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  ArrowRight,
  Banknote,
  Bot,
  CheckCircle2,
  Clock,
  PhoneOff,
  ShieldCheck,
  TrendingUp,
  UserX,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";

export default function LandingPageClient() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-200 selection:text-slate-900">
      <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Image
              src="/Untitled design (18).png"
              alt="GrowscaleX"
              width={180}
              height={36}
              priority
              className="h-7 w-auto"
            />
          </div>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#problem" className="transition-colors hover:text-slate-900">
              The Problem
            </a>
            <a href="#solution" className="transition-colors hover:text-slate-900">
              How it Works
            </a>
            <a href="#outcome" className="transition-colors hover:text-slate-900">
              Benefits
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Log in
            </Button>
            <Button>Start Free Trial</Button>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative overflow-hidden pt-24 pb-32">
          <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 opacity-30">
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-slate-100 to-transparent blur-3xl" />
          </div>

          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  whileHover={{ y: -1 }}
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-gradient-to-b from-white to-slate-50 px-3 py-1 text-sm font-medium text-slate-700 shadow-sm shadow-slate-900/5 ring-1 ring-slate-900/5"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="tracking-tight">
                    Built for <span className="text-slate-900">Study Abroad</span>{" "}
                    Agencies
                  </span>
                </motion.div>
                <h1 className="mb-6 text-5xl leading-[1.1] font-semibold tracking-tight text-slate-900 lg:text-6xl">
                  Never Miss a Student. <br />
                  <span className="bg-gradient-to-r from-[#2965EC] to-[#5C89F8] bg-clip-text text-transparent">
                    Zero Junk Leads.
                  </span>{" "}
                  <br />
                  Close More Admissions.
                </h1>
                <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-600">
                  Students message 5 agencies at once. If you&apos;re slow, you lose
                  the commission. If you&apos;re fast but talk to &quot;junk&quot; leads,
                  you waste your team&apos;s time. GrowscaleX intercepts your WhatsApp
                  leads in 1 second, filters out unqualified students, and hands
                  your counselors only the ones ready to fly.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" className="h-14 gap-2 px-8 text-base">
                    Stop Losing Leads to Competitors{" "}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative mx-auto w-full max-w-md lg:ml-auto lg:max-w-none"
              >
                <div className="mx-auto aspect-[9/19] w-full max-w-[300px] overflow-hidden rounded-[2.5rem] border-[8px] border-slate-900 bg-slate-50 shadow-2xl">
                  <div className="relative z-10 rounded-b-3xl bg-slate-900 px-6 pt-12 pb-4 text-white shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800">
                        <Bot className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">GrowscaleX Bot</h3>
                        <p className="text-xs text-slate-300">
                          Typically replies instantly
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-full space-y-4 bg-[#E5DDD5] p-4">
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          'url("https://www.transparenttextures.com/patterns/cubes.png")',
                      }}
                    />

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="relative z-10 max-w-[85%] rounded-2xl rounded-tl-none bg-white p-3 text-sm shadow-sm"
                    >
                      Hi! I saw your Meta ad. I want to study in the UK.
                      <span className="mt-1 block text-right text-[10px] text-slate-400">
                        10:00 AM
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 }}
                      className="relative z-10 ml-auto max-w-[85%] rounded-2xl rounded-tr-none bg-[#dcf8c6] p-3 text-sm shadow-sm"
                    >
                      Hello! 👋 Thanks for reaching out. To connect you with the
                      right counselor, what is your IELTS score and tuition
                      budget?
                      <span className="mt-1 block text-right text-[10px] text-slate-500">
                        10:00 AM
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.5 }}
                      className="relative z-10 max-w-[85%] rounded-2xl rounded-tl-none bg-white p-3 text-sm shadow-sm"
                    >
                      I have a 7.0 IELTS and my budget is $30,000.
                      <span className="mt-1 block text-right text-[10px] text-slate-400">
                        10:01 AM
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 3.5 }}
                      className="relative z-10 mx-auto mt-4 flex w-max items-center gap-1 rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs text-emerald-800 shadow-sm"
                    >
                      <CheckCircle2 className="h-3 w-3" /> Premium Lead Qualified
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute top-24 -left-12 flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-xl"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Response Time
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      &lt; 1 Second
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 4, duration: 0.5 }}
                  className="absolute bottom-24 -right-8 flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-xl"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Lead Status
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      Ready to Close
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="problem" className="bg-slate-50 py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-semibold text-slate-900 md:text-4xl">
                Your Counselors Are Closers. <br />
                <span className="bg-gradient-to-r from-[#2965EC] to-[#5C89F8] bg-clip-text text-transparent">
                  Stop Making Them Act Like Human Spam Filters.
                </span>
              </h2>
              <p className="text-lg text-slate-600">
                You pay for Meta ads to get inquiries. But right now, your
                highly-paid counselors are spending 15+ hours a week on dead-end
                phone calls and manual WhatsApp chats.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900">
                  The Lead Leak
                </h3>
                <p className="leading-relaxed text-slate-600">
                  A student messages at 11 PM. By the time your team replies at
                  9 AM, they&apos;ve already booked a consultation with the agency
                  down the street.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                  <Banknote className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900">
                  The &quot;Junk&quot; Drain
                </h3>
                <p className="leading-relaxed text-slate-600">
                  Your team spends 20 minutes on the phone only to find out the
                  student has no IELTS score and a $2,000 budget.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                  <UserX className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900">
                  Counselor Burnout
                </h3>
                <p className="leading-relaxed text-slate-600">
                  When your team is busy filtering &quot;junk,&quot; they are too tired
                  or too slow to close the high-value students who are actually
                  ready to pay.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="solution" className="py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-16 max-w-3xl">
              <h2 className="mb-6 text-3xl font-semibold text-slate-900 md:text-4xl">
                <span className="bg-gradient-to-r from-[#2965EC] to-[#5C89F8] bg-clip-text text-transparent">
                  Meet Your 24/7 WhatsApp Gatekeeper.
                </span>
              </h2>
              <p className="text-lg text-slate-600">
                GrowscaleX is an automated bouncer for your agency. We handle the
                noise so your team can focus on the revenue.
              </p>
            </div>

            <div className="space-y-24">
              <div className="grid items-center gap-12 md:grid-cols-2">
                <div className="order-2 md:order-1">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl font-semibold text-slate-800">
                    1
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold text-slate-900">
                    <span className="bg-gradient-to-r from-[#2965EC] to-[#5C89F8] bg-clip-text text-transparent">
                      The 1-Second Intercept
                    </span>
                  </h3>
                  <p className="text-lg leading-relaxed text-slate-600">
                    The moment a student clicks your ad, GrowscaleX replies. We
                    ensure you are always the first agency to engage them,
                    securing their attention before they move to a competitor.
                  </p>
                </div>
                <div className="relative order-1 overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 p-8 md:order-2">
                  <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-slate-200 opacity-50 blur-3xl" />
                  <div className="relative z-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-4 border-b border-slate-50 pb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          Instant Reply Active
                        </p>
                        <p className="flex items-center gap-1 text-sm text-emerald-600">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />{" "}
                          Online 24/7
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-10 w-3/4 rounded-lg bg-slate-100" />
                      <div className="ml-auto h-16 w-5/6 rounded-lg border border-slate-200 bg-slate-100" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid items-center gap-12 md:grid-cols-2">
                <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 p-8">
                  <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-slate-200 opacity-50 blur-3xl" />
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      <p className="font-medium text-slate-700">
                        &quot;What is your tuition budget?&quot;
                      </p>
                    </div>
                    <div className="ml-4 flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      <p className="font-medium text-slate-700">
                        &quot;Do you have an IELTS/PTE score?&quot;
                      </p>
                    </div>
                    <div className="ml-8 flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      <p className="font-medium text-slate-700">
                        &quot;Which intake and country are you targeting?&quot;
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl font-semibold text-slate-800">
                    2
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold text-slate-900">
                    <span className="bg-gradient-to-r from-[#2965EC] to-[#5C89F8] bg-clip-text text-transparent">
                      The Dealbreaker Filter
                    </span>
                  </h3>
                  <p className="text-lg leading-relaxed text-slate-600">
                    Before a counselor ever sees the chat, our bot asks the
                    questions that matter. We qualify leads based on your
                    specific criteria, ensuring only serious students get
                    through.
                  </p>
                </div>
              </div>

              <div className="grid items-center gap-12 md:grid-cols-2">
                <div className="order-2 md:order-1">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl font-semibold text-slate-800">
                    3
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold text-slate-900">
                    <span className="bg-gradient-to-r from-[#2965EC] to-[#5C89F8] bg-clip-text text-transparent">
                      The Smart Handoff
                    </span>
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                        <PhoneOff className="h-5 w-5 text-slate-400" />{" "}
                        Unqualified?
                      </h4>
                      <p className="text-slate-600">
                        The bot politely sends them a brochure and archives the
                        chat. Your counselors never waste a second on them.
                      </p>
                    </div>
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                        <Users className="h-5 w-5 text-emerald-600" /> Qualified?
                      </h4>
                      <p className="text-slate-600">
                        The bot instantly pings your team:{" "}
                        <span className="font-medium text-slate-900">
                          &quot;Premium Lead Ready. Call Now.&quot;
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative order-1 flex min-h-[300px] items-center justify-center overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 p-8 md:order-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-50" />
                  <div className="relative z-10 w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-6 shadow-lg">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                        New Notification
                      </span>
                      <span className="text-xs text-slate-400">Just now</span>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                        <Zap className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="w-full">
                        <p className="font-semibold text-slate-900">
                          Premium Lead Ready
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          Sarah M. • UK • IELTS 7.5 • $40k Budget
                        </p>
                        <Button size="sm" className="mt-3 w-full">
                          Claim Lead
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="outcome" className="relative bg-slate-50 py-24">
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-semibold text-slate-900 md:text-5xl">
                <span className="text-slate-900">Zero Wasted Time.</span>
                <br />
                <span className="bg-gradient-to-r from-[#2965EC] to-[#5C89F8] bg-clip-text text-transparent">
                  100% Focus on Admissions.
                </span>
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2965EC]/10">
                  <ShieldCheck className="h-6 w-6 text-[#2965EC]" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900">
                  Protect Your Payroll
                </h3>
                <p className="leading-relaxed text-slate-600">
                  Stop paying for hours of manual filtering. Every call your team
                  makes is now a high-probability conversion.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2965EC]/10">
                  <Zap className="h-6 w-6 text-[#2965EC]" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900">
                  Beat the Competition
                </h3>
                <p className="leading-relaxed text-slate-600">
                  Speed-to-lead is everything. With a 1-second response time, you
                  win the student&apos;s trust instantly.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2965EC]/10">
                  <TrendingUp className="h-6 w-6 text-[#2965EC]" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900">
                  Scale Without Hiring
                </h3>
                <p className="leading-relaxed text-slate-600">
                  Handle 10x more leads without adding more staff. Let the
                  automation do the heavy lifting.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-32">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-6 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Stop Handing Students to Your Competitors.
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-600">
              Join the agencies using GrowscaleX to automate their admission
              pipeline and reclaim their counselors&apos; time.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                className="h-16 w-full px-10 text-lg shadow-xl shadow-slate-900/10 sm:w-auto"
              >
                Start Your Risk-Free Trial
              </Button>
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> No complex
                setup. Built specifically for Study Abroad Agencies.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 bg-white py-12">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src="/Untitled design (18).png"
              alt="GrowscaleX"
              width={160}
              height={32}
              className="h-6 w-auto"
            />
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} GrowscaleX. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a
              href="/privacy-policy"
              className="transition-colors hover:text-slate-900"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="transition-colors hover:text-slate-900"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

