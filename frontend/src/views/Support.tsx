import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, MessageSquare, Send } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button 
        className="w-full py-4 flex items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-aqua-deep">{question}</span>
        {isOpen ? <ChevronUp className="text-aqua-mid" /> : <ChevronDown className="text-slate-400" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 pb-4' : 'max-h-0'}`}>
        <p className="text-slate-600">{answer}</p>
      </div>
    </div>
  );
};

const Support: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !message) {
      setStatusMessage("Email and message are required.");
      setIsError(true);
      return;
    }

    try {
      setLoading(true);
      setStatusMessage(null);

      const response = await fetch("http://localhost:5000/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          message
        })
      });

      if (!response.ok) {
        throw new Error("Failed to submit message");
      }

      setStatusMessage("Your message has been sent successfully!");
      setIsError(false);

      // Reset form
      setName('');
      setEmail('');
      setMessage('');

    } catch (error) {
      setStatusMessage("Something went wrong. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-aqua-deep mb-4">How can we help?</h1>
          <p className="text-slate-600">Find answers to common questions or reach out to our team.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* FAQ Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="w-6 h-6 text-aqua-mid" />
              <h2 className="text-2xl font-bold text-slate-800">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-2">
              <FAQItem 
                question="How accurate is the AI detection?" 
                answer="Our AI model is trained on verified datasets of Sri Lankan endemic fish species. Accuracy exceeds 90% under optimal conditions." 
              />
              <FAQItem 
                question="Is this service free to use?" 
                answer="Yes, AquaSerendib is completely free and dedicated to conservation awareness." 
              />
              <FAQItem 
                question="Can I upload marine fish?" 
                answer="Currently, the system supports only freshwater endemic species of Sri Lanka." 
              />
              <FAQItem 
                question="How can I contribute data?" 
                answer="We are working on a community contribution module. Stay tuned for updates." 
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-aqua-deep text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <Mail className="w-6 h-6 text-aqua-light" />
                <h2 className="text-2xl font-bold">Contact Us</h2>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-aqua-pale mb-1">Name</label>
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-aqua-light"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-aqua-pale mb-1">Email</label>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-aqua-light"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-aqua-pale mb-1">Message</label>
                  <textarea 
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-aqua-light"
                    placeholder="How can we assist you?"
                    required
                  />
                </div>

                {statusMessage && (
                  <p className={`text-sm ${isError ? 'text-red-300' : 'text-green-300'}`}>
                    {statusMessage}
                  </p>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-aqua-deep font-bold py-3 rounded-lg hover:bg-aqua-pale transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;