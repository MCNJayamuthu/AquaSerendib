import React, { useState, useRef } from 'react';
import { Upload, X, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import SwimmingFishLoader from '../components/SwimmingFishLoader';
import backgroundImage from '../assets/home-background.avif';

function dataURLtoFile(dataurl: string, filename: string) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

const Home: React.FC = () => {

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      setResult(null);
    };

    reader.readAsDataURL(file);
  };

  const getConfidenceColor = (confidence: number) => {
  const percentage = confidence * 100;

  if (percentage < 30) return "bg-red-500";
  if (percentage < 50) return "bg-orange-500";
  if (percentage < 70) return "bg-yellow-500";
  return "bg-green-500";
  };

  const handleAnalyze = async () => {

    if (!selectedImage) return;

    setIsAnalyzing(true);
    setResult(null);

    const file = dataURLtoFile(selectedImage, "fish.jpg");

    const formData = new FormData();
    formData.append("file", file);

    try {

      const aiResponse = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData
      });

      const aiResult = await aiResponse.json();

      if (aiResult.status === "identified") {

        const fishResponse = await fetch(
          `http://localhost:5000/api/fish/search?name=${encodeURIComponent(aiResult.species)}`
        );

        const fishData = await fishResponse.json();

        setResult({
          status: "identified",
          confidence: aiResult.confidence,
          fish: fishData
        });

      } else {

        setResult(aiResult);

      }

    } catch (error) {

      setResult({
        status: "error",
        message: "Failed to analyze image"
      });

    }

    setIsAnalyzing(false);
  };

  const resetUpload = () => {

    setSelectedImage(null);
    setResult(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

  };

  return (

    <div className="flex flex-col w-full">

      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-slate-50"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-[-80px]">

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
            AquaSerendib
          </h1>

          <p className="text-xl md:text-2xl text-sand/90 mb-12">
            AI-Powered Endemic Freshwater Fish Detection
          </p>

          <button
            onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-aqua-mid hover:bg-aqua-deep text-white px-8 py-4 rounded-full font-bold text-lg"
          >
            Start Detection
          </button>

        </div>

      </div>

      <div id="upload-section" className="min-h-screen bg-slate-50 py-20 px-4">

        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-12">

            <h2 className="text-3xl font-serif font-bold text-aqua-deep mb-4">
              Identify Your Discovery
            </h2>

            <p className="text-slate-600 max-w-2xl mx-auto">
              Upload a clear photo of a freshwater fish found in Sri Lanka.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-xl p-10">

            {!selectedImage && (

              <div
                className="border-2 border-dashed border-slate-300 rounded-xl p-12 flex flex-col items-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >

                <Upload className="w-10 h-10 text-aqua-mid mb-4" />

                <p>Click to upload an image</p>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />

              </div>

            )}

            {selectedImage && (

              <div className="flex flex-col items-center">

                <div className="relative w-full max-w-lg mb-6">

                  <img
                    src={selectedImage}
                    className="w-full rounded-lg shadow-lg"
                  />

                  <button
                    onClick={resetUpload}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full"
                  >
                    <X />
                  </button>

                </div>

                {!isAnalyzing && !result && (

                  <button
                    onClick={handleAnalyze}
                    className="bg-aqua-mid text-white px-8 py-3 rounded-xl font-bold"
                  >
                    Analyze Image
                  </button>

                )}

              </div>

            )}

            {isAnalyzing && (

              <div className="mt-6">
                <SwimmingFishLoader />
              </div>

            )}

            {result && (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {result.error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                    <p className="text-red-700">{result.error}</p>
                  </div>
                )}

                {result.status === "unknown" && (
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                    <p className="text-amber-700">
                      Seems like this fish is unidentified. At the moment the system can only predict 5 species.
                      We are working on extending the species database in the future.
                    </p>
                  </div>
                )}

                {result.status === "uncertain" && (

                  <div className="p-8 rounded-2xl border-2 border-yellow-500 bg-yellow-50/50">

                    <h3 className="text-2xl font-serif font-bold text-slate-800 mb-6">
                      Possible Fish Species
                    </h3>

                    <div className="space-y-6">

                      {result.possible_species.map((fish: any, index: number) => (

                        <div key={index} className="grid md:grid-cols-2 gap-8">

                          <div>

                            <h4 className="text-xl font-bold text-aqua-deep mb-2">
                              {fish.species}
                            </h4>

                          </div>

                          <div>

                            <h4 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-2">
                              Confidence
                            </h4>

                            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">

                              <div
                                className={`h-full ${getConfidenceColor(fish.confidence)} rounded-full`}
                                style={{ width: `${fish.confidence * 100}%` }}
                              ></div>

                            </div>

                            <p className="mt-2 font-bold">
                              {(fish.confidence * 100).toFixed(1)}%
                            </p>

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                )}

                {result.status === "identified" && result.fish && (

                  <div className="p-8 rounded-2xl border-2 border-green-500 bg-green-50/50">

                    <h3 className="text-2xl font-serif font-bold text-slate-800 mb-6">
                      Fish Identified Successfully
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8">

                      <div>

                        <h4 className="text-xl font-bold text-aqua-deep mb-2">
                          {result.fish.sinhala_name}
                        </h4>

                        <p><b>English Name:</b> {result.fish.english_name}</p>

                        <p><b>Scientific Name:</b> <i>{result.fish.scientific_name}</i></p>

                        <p className="mt-4">
                          <b>Habitat:</b> {result.fish.habitat}
                        </p>

                        <p>
                          <b>Location:</b> {result.fish.location}
                        </p>

                        <p>
                          <b>Conservation Status:</b> {result.fish.conservation_status}
                        </p>

                      </div>

                      <div>

                        <h4 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-2">
                          Confidence
                        </h4>

                        <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">

                          <div  
                            className={`h-full ${getConfidenceColor(result.confidence)} rounded-full`}
                            style={{ width: `${result.confidence * 100}%` }}
                          ></div>

                        </div>

                        <p className="mt-2 font-bold">
                          {(result.confidence * 100).toFixed(1)}%
                        </p>

                        <h4 className="text-sm uppercase tracking-wider text-slate-500 font-bold mt-6 mb-2">
                          Description
                        </h4>

                        <p className="text-slate-700">
                          {result.fish.description}
                        </p>

                      </div>

                    </div>

                  </div>

                )}

                <div className="mt-8 text-center">
                  <button
                    onClick={resetUpload}
                    className="text-aqua-mid hover:text-aqua-deep font-bold underline"
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

  );

};

export default Home;

