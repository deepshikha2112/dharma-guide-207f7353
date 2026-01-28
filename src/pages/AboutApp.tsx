import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Sparkles, BookOpen, Music, Calendar, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/divya-dharshan-logo.jpeg";

const AboutApp = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Divine Deities",
      description: "Explore the glory of Hindu deities with mantras, stories, and sacred wisdom."
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: "Mantras & Bhajans",
      description: "Collection of powerful mantras, aartis, and devotional music for daily practice."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Sacred Scriptures",
      description: "Read Bhagavad Gita, Ramcharitmanas, and other holy texts with translations."
    },
    {
      icon: <Compass className="w-6 h-6" />,
      title: "Astrology Guidance",
      description: "Get personalized insights based on Vedic astrology and planetary positions."
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Vrat & Panchang",
      description: "Daily panchang, festival calendar, and complete vrat guides with vidhi."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Meditation & Peace",
      description: "Guided meditation, mood-based sounds, and spiritual techniques for inner calm."
    }
  ];

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
          <h1 className="text-xl font-heading font-semibold text-foreground">About Divya Darshan</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 pb-24 animate-fade-in">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20">
            <img src={logo} alt="Divya Darshan" className="w-full h-full object-cover" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Divya Darshan</h2>
          <p className="text-primary font-medium">दिव्य दर्शन</p>
          <p className="text-sm text-muted-foreground mt-2">Version 1.0.0</p>
        </div>

        {/* Mission */}
        <div className="temple-card-warm rounded-2xl p-6 md:p-8 mb-6">
          <div className="text-center mb-6">
            <span className="text-4xl mb-3 inline-block">🙏</span>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Divya Darshan is a spiritual and devotional platform dedicated to guiding souls towards 
              inner peace through the timeless wisdom of Sanatan Dharma. We aim to make ancient 
              spiritual knowledge accessible, meaningful, and transformative for the modern devotee.
            </p>
          </div>

          <div className="flex justify-center gap-4 text-center pt-4 border-t border-border">
            <div>
              <p className="text-2xl font-bold text-primary">11+</p>
              <p className="text-xs text-muted-foreground">Deities</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="text-2xl font-bold text-primary">100+</p>
              <p className="text-xs text-muted-foreground">Mantras</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="text-2xl font-bold text-primary">50+</p>
              <p className="text-xs text-muted-foreground">Stories</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4 px-1">What We Offer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="temple-card-warm rounded-xl p-4 flex gap-4 items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="temple-card-warm rounded-2xl p-6 md:p-8 mb-6">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4 text-center">Our Values</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3">
              <span className="text-2xl mb-2 inline-block">☮️</span>
              <p className="text-sm font-medium text-foreground">Peace</p>
            </div>
            <div className="p-3">
              <span className="text-2xl mb-2 inline-block">✨</span>
              <p className="text-sm font-medium text-foreground">Positivity</p>
            </div>
            <div className="p-3">
              <span className="text-2xl mb-2 inline-block">🙏</span>
              <p className="text-sm font-medium text-foreground">Devotion</p>
            </div>
            <div className="p-3">
              <span className="text-2xl mb-2 inline-block">🌱</span>
              <p className="text-sm font-medium text-foreground">Growth</p>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="text-center p-6 bg-primary/5 rounded-2xl border border-primary/10">
          <p className="text-lg font-hindi text-foreground mb-2">
            "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः"
          </p>
          <p className="text-sm text-muted-foreground italic">
            "May all beings be happy, may all beings be free from illness"
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">
            Made with 🙏 and devotion
          </p>
          <p className="text-xs text-muted-foreground">
            © 2025 Divya Darshan. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutApp;
