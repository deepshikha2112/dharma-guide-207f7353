import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, MessageCircle, Bug, Lightbulb, AlertTriangle, Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const ContactSupport = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "feedback",
    message: ""
  });

  const feedbackTypes = [
    { id: "feedback", label: "General Feedback", icon: <MessageCircle className="w-4 h-4" /> },
    { id: "suggestion", label: "Suggestion", icon: <Lightbulb className="w-4 h-4" /> },
    { id: "bug", label: "Report Bug", icon: <Bug className="w-4 h-4" /> },
    { id: "content", label: "Content Issue", icon: <AlertTriangle className="w-4 h-4" /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`[Divya Darshan] ${formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}: ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nType: ${formData.type}\n\nMessage:\n${formData.message}`
    );
    
    window.open(`mailto:dharmadevotion05@gmail.com?subject=${subject}&body=${body}`, "_blank");
    
    toast.success("Opening your email client...", {
      description: "Please send the email to complete your submission."
    });
  };

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
            <Mail className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-heading font-semibold text-foreground">Contact & Support</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 pb-24 animate-fade-in">
        {/* Direct Contact */}
        <div className="temple-card-warm rounded-2xl p-6 mb-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Get in Touch</h2>
            <p className="text-muted-foreground mb-4">
              We're here to help! Reach out to us for support, suggestions, or any questions.
            </p>
            <a 
              href="mailto:dharmadevotion05@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              <Mail className="w-5 h-5" />
              dharmadevotion05@gmail.com
            </a>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="temple-card-warm rounded-2xl p-6 md:p-8 mb-6">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Send Us Your Feedback
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Feedback Type */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">What would you like to share?</label>
              <div className="grid grid-cols-2 gap-2">
                {feedbackTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type.id })}
                    className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium transition-all ${
                      formData.type === type.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {type.icon}
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Your Name</label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-xl"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Email Address</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="rounded-xl"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Your Message</label>
              <Textarea
                placeholder="Share your thoughts, suggestions, or describe the issue..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="rounded-xl min-h-[120px]"
                required
              />
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full rounded-xl" size="lg">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </div>

        {/* What We Welcome */}
        <div className="temple-card-warm rounded-2xl p-6">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            We Welcome
          </h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-primary">✓</span>
              <span><strong className="text-foreground">Feedback:</strong> Your thoughts help us grow and serve you better.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">✓</span>
              <span><strong className="text-foreground">Suggestions:</strong> Ideas for new features, content, or improvements.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">✓</span>
              <span><strong className="text-foreground">Bug Reports:</strong> Technical issues, crashes, or unexpected behavior.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">✓</span>
              <span><strong className="text-foreground">Content Issues:</strong> Incorrect information, typos, or missing content.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">✓</span>
              <span><strong className="text-foreground">Support Requests:</strong> Help with app usage or account issues.</span>
            </li>
          </ul>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 p-4 bg-primary/5 rounded-xl">
          <p className="text-sm text-muted-foreground">
            🙏 We read every message and strive to respond within 24-48 hours.
            <br />
            Thank you for helping us create a better spiritual experience!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
