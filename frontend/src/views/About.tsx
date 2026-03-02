import React from 'react';
import { Target, Shield, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Header */}
      <div className="relative h-[60vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2074&auto=format&fit=crop")' }}
        >
          <div className="absolute inset-0 bg-aqua-deep/70 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Our Mission</h1>
          <p className="text-xl max-w-2xl mx-auto font-light text-slate-100">
            Preserving Sri Lanka's aquatic heritage through technology and awareness.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-serif font-bold text-aqua-deep mb-6">Who We Are</h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-6">
              AquaSerendib is a pioneering initiative dedicated to the identification and conservation of Sri Lanka's endemic freshwater fish. We bridge the gap between advanced Artificial Intelligence and environmental conservation.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg">
              Sri Lanka is a global biodiversity hotspot, home to dozens of fish species found nowhere else on Earth. Many are threatened by pollution and habitat loss. Our tool empowers researchers, students, and nature enthusiasts to identify these species instantly, fostering a deeper connection with nature.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl shadow-lg mt-8" alt="River" />
             <img src="https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl shadow-lg" alt="Underwater" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-aqua-mid text-center">
            <div className="w-16 h-16 bg-aqua-pale rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-aqua-deep" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Our Goal</h3>
            <p className="text-slate-600">To create a comprehensive, accessible digital registry of all endemic freshwater fish in Sri Lanka.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-aqua-mid text-center">
            <div className="w-16 h-16 bg-aqua-pale rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-aqua-deep" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Conservation</h3>
            <p className="text-slate-600">Supporting conservation efforts by educating the public on endangered species and their habitats.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-aqua-mid text-center">
             <div className="w-16 h-16 bg-aqua-pale rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-aqua-deep" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Community</h3>
            <p className="text-slate-600">Building a community of eco-conscious citizens who contribute to monitoring our waterways.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;