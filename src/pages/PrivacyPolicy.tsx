import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, Database, Bell, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full hover:bg-primary/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-heading font-semibold text-foreground">Privacy Policy</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 pb-24 animate-fade-in">
        <div className="temple-card-warm rounded-2xl p-6 md:p-8 space-y-8">
          {/* Last Updated */}
          <p className="text-sm text-muted-foreground">
            Last Updated: January 2025
          </p>

          {/* Introduction */}
          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="text-primary">🙏</span> Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Divya Darshan. We respect your privacy and are committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard your data when you use our spiritual and devotional application.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Information We Collect
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="font-medium text-foreground">We may collect the following information:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong>Basic Usage Data:</strong> App usage patterns, feature preferences, and interaction statistics to improve user experience.</li>
                <li><strong>User Preferences:</strong> Language settings, notification preferences, theme choices, and favorite content selections.</li>
                <li><strong>Optional User Inputs:</strong> Birth details for astrology features (only if you choose to provide them), prayer journal entries, and any feedback you submit.</li>
                <li><strong>Device Information:</strong> Device type, operating system, and browser information for compatibility purposes.</li>
              </ul>
            </div>
          </section>

          {/* How We Use Your Data */}
          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              How We Use Your Data
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>Your data is used solely to:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Personalize your spiritual journey within the app</li>
                <li>Provide astrology guidance based on your birth details (if provided)</li>
                <li>Send daily spiritual notifications (if enabled)</li>
                <li>Improve app features and content quality</li>
                <li>Respond to your support requests and feedback</li>
              </ul>
              <p className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                <strong className="text-foreground">🔒 Important:</strong> We do NOT sell, trade, or misuse your personal data. 
                Your information is never shared with third parties for marketing purposes.
              </p>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Third-Party Services
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may use trusted third-party services for app functionality, such as cloud storage and analytics. 
              These services are bound by their own privacy policies and are selected for their commitment to data protection. 
              We ensure that any third-party integration respects your privacy and complies with applicable data protection standards.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Data Security
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your data, including encryption, secure data storage, 
              and access controls. While we strive to protect your information, no method of transmission over the internet 
              is 100% secure. We continuously work to enhance our security practices.
            </p>
          </section>

          {/* Cookies & Local Storage */}
          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Cookies & Local Storage
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We use local storage on your device to save your preferences (theme, language, notification settings) 
              for a seamless experience. This data stays on your device and is not transmitted to external servers 
              unless necessary for app functionality.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-3">Your Rights</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of notifications at any time</li>
                <li>Withdraw consent for data processing</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:dharmadevotion05@gmail.com" className="text-primary hover:underline">
                  dharmadevotion05@gmail.com
                </a>
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="p-4 bg-accent/10 rounded-xl border border-accent/20">
            <h2 className="text-lg font-heading font-semibold text-foreground mb-2">⚠️ Important Disclaimer</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              All astrology predictions, spiritual guidance, and devotional content provided in this app are for 
              informational and faith-based purposes only. They should not be considered as professional advice 
              and are meant to inspire and guide your spiritual journey.
            </p>
          </section>

          {/* Contact */}
          <section className="text-center pt-4 border-t border-border">
            <p className="text-muted-foreground">
              For privacy-related questions, contact us at:
            </p>
            <a 
              href="mailto:dharmadevotion05@gmail.com" 
              className="text-primary font-medium hover:underline"
            >
              📧 dharmadevotion05@gmail.com
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
