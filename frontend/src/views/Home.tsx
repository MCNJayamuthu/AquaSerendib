import React, { useState, useRef } from 'react';
import { Upload, X, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { identifyFish } from '../services/geminiService';
import { IdentificationResult } from '../types';
import SwimmingFishLoader from '../components/SwimmingFishLoader';

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<IdentificationResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setResult(null);

    // Smooth scroll to result area placeholder
    setTimeout(() => {
        resultSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    const identification = await identifyFish(selectedImage);
    setResult(identification);
    setIsAnalyzing(false);
  };

  const resetUpload = () => {
    setSelectedImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transform scale-105 transition-transform duration-[20s] ease-in-out hover:scale-100"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-slate-50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-[-80px]">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-wide drop-shadow-lg">
            AquaSerendib
          </h1>
          <p className="text-xl md:text-2xl text-sand/90 font-light tracking-wider mb-12 drop-shadow-md">
            AI-Powered Endemic Freshwater Fish Detection
          </p>
          
          <button 
            onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-aqua-mid hover:bg-aqua-deep text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(20,83,116,0.5)] flex items-center gap-2 mx-auto"
          >
            Start Detection
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Upload & Identification Section */}
      <div id="upload-section" className="min-h-screen bg-slate-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-aqua-deep mb-4">Identify Your Discovery</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Upload a clear photo of a freshwater fish found in Sri Lanka. Our AI model will analyze its features to determine if it is one of the island's precious endemic species.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="p-8 md:p-12">
              
              {!selectedImage ? (
                <div 
                  className="border-3 border-dashed border-slate-300 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-aqua-mid hover:bg-aqua-pale/20 transition-all group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-20 h-20 bg-aqua-pale rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Upload className="w-10 h-10 text-aqua-mid" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">Click to Upload Image</h3>
                  <p className="text-slate-500">or drag and drop here</p>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="relative w-full max-w-lg mb-8 rounded-lg overflow-hidden shadow-lg group">
                    <img src={selectedImage} alt="Upload preview" className="w-full h-auto object-cover" />
                    {!isAnalyzing && (
                      <button 
                        onClick={resetUpload}
                        className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {!isAnalyzing && !result && (
                    <button 
                      onClick={handleAnalyze}
                      className="bg-aqua-mid hover:bg-aqua-deep text-white px-10 py-3 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg w-full md:w-auto"
                    >
                      Analyze Image
                    </button>
                  )}
                </div>
              )}

              {/* Loading State */}
              <div ref={resultSectionRef} className="mt-8">
                {isAnalyzing && <SwimmingFishLoader />}
              </div>

              {/* Results Display */}
              {result && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {result.error ? (
                     <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg flex items-start gap-4">
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-red-800">Analysis Failed</h3>
                          <p className="text-red-700">{result.error}</p>
                        </div>
                     </div>
                  ) : (
                    <div className={`p-8 rounded-2xl border-2 ${result.isEndemic ? 'border-green-500 bg-green-50/50' : 'border-amber-500 bg-amber-50/50'}`}>
                      <div className="flex items-center gap-3 mb-6">
                        {result.isEndemic ? (
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        ) : (
                          <AlertCircle className="w-8 h-8 text-amber-600" />
                        )}
                        <h3 className="text-2xl font-serif font-bold text-slate-800">
                          {result.isEndemic ? 'Endemic Species Detected' : 'Not an Endemic Species'}
                        </h3>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-1">Common Name</h4>
                          <p className="text-xl font-bold text-aqua-deep mb-4">{result.name || "Unknown"}</p>
                          
                          <h4 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-1">Scientific Name</h4>
                          <p className="text-lg italic text-slate-700 mb-4">{result.scientificName || "N/A"}</p>
                        </div>
                        <div>
                          <h4 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-1">Analysis Confidence</h4>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${result.confidence === 'High' ? 'bg-green-500 w-[90%]' : result.confidence === 'Medium' ? 'bg-yellow-500 w-[60%]' : 'bg-red-500 w-[30%]'}`}
                              ></div>
                            </div>
                            <span className="text-sm font-bold text-slate-600">{result.confidence || "Low"}</span>
                          </div>

                          <h4 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-1">Description</h4>
                          <p className="text-slate-700 leading-relaxed">{result.description}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8 text-center">
                    <button 
                      onClick={resetUpload}
                      className="text-aqua-mid hover:text-aqua-deep font-bold underline decoration-2 underline-offset-4"
                    >
                      Analyze Another Fish
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;