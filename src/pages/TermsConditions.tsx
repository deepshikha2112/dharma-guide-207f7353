import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, AlertCircle, BookOpen, Users, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";

const TermsConditions = () => {
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
            <FileText className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-heading font-semibold text-foreground">Terms & Conditions</h1>
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

          {/* Acceptance */}
          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="text-primary">📜</span> Acceptance of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using Divya Darshan, you accept and agree to be bound by these Terms and Conditions. 
              If you do not agree with any part of these terms, please do not use our application. 
              Your continued use of the app constitutes acceptance of these terms and any future updates.
            </p>
          </section>

          {/* Nature of Content */}
          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Nature of Content
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Divya Darshan provides spiritual, devotional, and astrology-related content including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Mantras, bhajans, and aarti collections</li>
                <li>Sacred stories and scriptures</li>
                <li>Astrology guidance and predictions</li>
                <li>Vrat (fasting) guides and panchang information</li>
                <li>Meditation and spiritual practices</li>
                <li>Daily spiritual notifications and wisdom</li>
              </ul>
              <p className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
                <strong className="text-foreground">Important:</strong> All content is provided for informational, 
                educational, and faith-based guidance purposes only. It reflects traditional spiritual teachings 
                and should be approached with personal discretion.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Disclaimer of Liability
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="font-medium text-foreground">We do NOT provide and are NOT responsible for:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong>Legal Advice:</strong> Our content should not be considered as legal counsel</li>
                <li><strong>Medical Advice:</strong> For health concerns, always consult qualified medical professionals</li>
                <li><strong>Financial Advice:</strong> Investment or financial decisions should be made with professional guidance</li>
                <li><strong>Guaranteed Outcomes:</strong> Astrology predictions and spiritual practices are guidance-based and do not guarantee specific results</li>
              </ul>
              <p className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                🙏 Spiritual content is meant to inspire faith, positivity, and inner peace. 
                Users should exercise their own judgment and not rely solely on app content for major life decisions.
              </p>
            </div>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              User Conduct
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>When using Divya Darshan, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Use the app respectfully and for its intended spiritual purposes</li>
                <li>Not misuse, copy, or redistribute our content without permission</li>
                <li>Not attempt to hack, disrupt, or damage the application</li>
                <li>Provide accurate information when creating an account</li>
                <li>Respect the sanctity of spiritual content and other users</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-3">Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content, including text, images, audio, graphics, and design elements within Divya Darshan, 
              is protected by intellectual property rights. You may not reproduce, distribute, modify, or 
              create derivative works without prior written consent. Traditional scriptures and mantras 
              are presented with respect to their sacred origins.
            </p>
          </section>

          {/* Account Termination */}
          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <Ban className="w-5 h-5 text-primary" />
              Account Termination
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate user access if there is evidence of misuse, 
              violation of these terms, inappropriate behavior, or any activity that harms the app or 
              its community. Such actions will be taken at our discretion to maintain a peaceful and 
              respectful environment for all devotees.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground mb-3">Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms and Conditions from time to time. Changes will be reflected with 
              an updated "Last Updated" date. Continued use of the app after changes constitutes acceptance 
              of the revised terms. We encourage you to review this page periodically.
            </p>
          </section>

          {/* Contact */}
          <section className="text-center pt-4 border-t border-border">
            <p className="text-muted-foreground">
              For questions about these terms, contact us at:
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

export default TermsConditions;
