import React, { useEffect, useState } from 'react';
import { MapPin, Info, AlertTriangle } from 'lucide-react';
import { getFishData } from '../services/fishData';
import { FishData } from '../types/index';

const Knowledge: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [fishList, setFishList] = useState<FishData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getFishData();
      setFishList(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-aqua-deep mb-6">Endemic Treasures</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover the unique freshwater species found exclusively in the rivers and streams of Sri Lanka. 
            Data sourced from our comprehensive database.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden h-96 animate-pulse">
                <div className="h-48 bg-slate-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-20 bg-slate-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fishList.map((fish) => (
              <div key={fish.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col group">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={fish.image_url} 
                    alt={fish.english_name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-aqua-deep uppercase tracking-wider shadow-sm">
                    Endemic
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-slate-800 mb-1">{fish.sinhala_name}</h2>
                    <p className="text-sm text-aqua-mid italic font-serif">{fish.scientific_name}</p>
                    <p className="text-xs text-slate-500 mt-1">English: <span className="font-semibold">{fish.english_name}</span></p>
                  </div>

                  <p className="text-slate-500 mb-6 text-sm leading-relaxed flex-grow">Habitat: <span className="font-semibold">{fish.habitat}</span></p>

                  <p className="text-slate-500 mb-6 text-sm leading-relaxed flex-grow">Description: <span className="font-semibold">{fish.description}</span></p>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex items-start gap-3 text-sm text-slate-600">
                      <MapPin className="w-4 h-4 text-aqua-mid mt-0.5 flex-shrink-0" />
                      <span>{fish.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${
                        fish.conservationStatus.includes('Critical') ? 'text-red-600' :
                        fish.conservationStatus.includes('Endangered') ? 'text-orange-500' :
                        'text-yellow-600'
                      }`} />
                      <span className={`font-bold ${
                        fish.conservationStatus.includes('Critical') ? 'text-red-700' :
                        fish.conservationStatus.includes('Endangered') ? 'text-orange-600' :
                        'text-yellow-700'
                      }`}>{fish.conservationStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Knowledge;