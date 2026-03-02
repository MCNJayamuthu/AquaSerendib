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
                answer="Our AI model is trained on a verified dataset of Sri Lankan endemic fish. While highly accurate for clear images, environmental factors like water turbidity can affect results. It typically achieves over 90% confidence." 
              />
              <FAQItem 
                question="Is this service free to use?" 
                answer="Yes, AquaSerendib is a free tool dedicated to environmental education and conservation awareness." 
              />
              <FAQItem 
                question="Can I upload photos of marine fish?" 
                answer="Currently, our model is specialized only for freshwater endemic species of Sri Lanka. Marine fish may not be identified correctly." 
              />
               <FAQItem 
                question="How do I contribute data?" 
                answer="We are working on a community submission feature. For now, please contact us if you have high-quality datasets." 
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-aqua-deep text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <Mail className="w-6 h-6 text-aqua-light" />
                <h2 className="text-2xl font-bold">Contact Us</h2>
              </div>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-aqua-pale mb-1">Name</label>
                  <input type="text" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-aqua-light" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-aqua-pale mb-1">Email</label>
                  <input type="email" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-aqua-light" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-aqua-pale mb-1">Message</label>
                  <textarea rows={4} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-aqua-light" placeholder="How can we assist you?"></textarea>
                </div>
                <button className="w-full bg-white text-aqua-deep font-bold py-3 rounded-lg hover:bg-aqua-pale transition-colors flex items-center justify-center gap-2">
                  Send Message
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