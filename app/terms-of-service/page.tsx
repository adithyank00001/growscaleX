import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — GrowscaleX",
  description: "Terms of Service for GrowscaleX",
};

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last Updated: April 7, 2026
          </p>
        </header>

        <article className="space-y-8 text-foreground">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. Our Partnership</h2>
            <p className="text-muted-foreground leading-relaxed">
              GrowscaleX provides the &quot;automation brain&quot; for your WhatsApp
              admissions. We ensure your leads are greeted in seconds and
              qualified before your counselors ever pick up the phone. By using
              our service, you agree to these simple terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              2. Service Reliability & Meta Integration
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                We use the official Meta WhatsApp Business API to ensure the
                highest message delivery rates.
              </p>
              <p>
                <span className="font-medium text-foreground">Uptime:</span> We
                strive for 99.9% uptime for the GrowscaleX platform.
              </p>
              <p>
                <span className="font-medium text-foreground">Account Health:</span>{" "}
                We are here to help you stay compliant with Meta’s official
                WhatsApp Business Policies. While we cannot control Meta’s
                global infrastructure or their internal policy changes, we will
                actively work with you to ensure your account remains in good
                standing.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">3. Messaging & Fair Use</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                We handle the technical billing and relationship with Meta so
                you don’t have to.
              </p>
              <p>
                <span className="font-medium text-foreground">Included Volume:</span>{" "}
                Your plan includes specific usage automated conversations per
                month limit.
              </p>
              <p>
                <span className="font-medium text-foreground">Fair Use:</span>{" "}
                If your agency is growing exceptionally fast and exceeds this
                volume, we will simply reach out to move you to a high-volume
                plan. No hidden fees or surprise shut-offs.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              4. Professional Security Guarantee
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Once you connect your Meta API to GrowscaleX, we take over the
              responsibility for the security of that connection. We use
              professional-grade encryption to ensure your API tokens are never
              compromised.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">5. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              We are committed to your success, but we are a service provider.
              GrowscaleX is not liable for any indirect losses or &quot;lost
              commissions&quot; resulting from third-party API outages (Meta),
              internet connectivity issues, or leads that do not eventually
              convert into admissions. Our total liability is limited to the
              amount paid for your current subscription.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">6. No Lock-in Contracts</h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe in earning your business every month. You can cancel
              your subscription at any time. There are no long-term
              contracts—just results.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}

