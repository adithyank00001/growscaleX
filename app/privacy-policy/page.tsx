import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — GrowscaleX",
  description: "Privacy Policy for GrowscaleX",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to home
          </Link>
        </div>

        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last Updated: April 7, 2026
          </p>
        </header>

        <article className="space-y-8 text-foreground">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              Our Commitment to Your Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At GrowscaleX, we know that your student leads and your WhatsApp
              reputation are your most valuable assets. We are committed to
              protecting your data and your API credentials with
              industry-standard security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                <span className="font-medium text-foreground">
                  Agency Credentials:
                </span>{" "}
                To run your automation, we securely store your Meta WhatsApp
                Business API tokens (Access Tokens, Phone Number IDs).
              </p>
              <p>
                <span className="font-medium text-foreground">Lead Data:</span>{" "}
                Our system processes information provided by students during
                the automated qualification flow (e.g., Name, Phone Number,
                IELTS scores, Budget, and Destination Country).
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. Data Security & Encryption</h2>
            <p className="text-muted-foreground leading-relaxed">
              We take full responsibility for the security of the tokens you
              provide. All Meta API credentials and student data are protected
              using AES-256 encryption at rest and SSL/TLS encryption in transit.
              Your &quot;keys to the house&quot; are never stored in plain text and
              are accessible only to the GrowscaleX engine to execute your
              workflows.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              3. Data Processing & UAE Compliance
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              GrowscaleX operates as a Data Processor in compliance with the UAE
              Personal Data Protection Law (PDPL).
            </p>
            <ul className="list-disc pl-5 text-muted-foreground leading-relaxed space-y-2">
              <li>
                <span className="font-medium text-foreground">Ownership:</span>{" "}
                You (the Agency) own all student lead data. We only process it
                to qualify and route it to your team.
              </li>
              <li>
                <span className="font-medium text-foreground">Minors:</span>{" "}
                For students under 18, the Agency is responsible for ensuring
                parental consent is obtained as per UAE digital safety
                guidelines.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">4. Data Retention & Deletion</h2>
            <p className="text-muted-foreground leading-relaxed">
              We only keep lead data as long as your account is active. If you
              choose to leave GrowscaleX, we will purge your API tokens and lead
              records from our active database within 30 days.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}

