import React, { useEffect, useState } from "react";

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  stage: string;
}

const Plans: React.FC = () => {

  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const fetchRoadmap = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/roadmap");

      if (!res.ok) {
        throw new Error("Failed to fetch roadmap items");
      }

      const data = await res.json();

      console.log("Roadmap API response:", data);

      if (Array.isArray(data)) {
        setRoadmapItems(data);
      } else {
        setRoadmapItems([]);
      }

    } catch (error) {

      console.error("Error fetching roadmap:", error);

      setRoadmapItems([]);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading roadmap...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">

      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-aqua-deep mb-4">
            Roadmap
          </h1>

          <p className="text-slate-600 max-w-2xl mx-auto">
            This page tracks the next improvements planned for AquaSerendib.
          </p>

        </div>

        <div className="grid gap-6">

          {roadmapItems.length === 0 && (
            <p className="text-center text-gray-500">
              No roadmap items available.
            </p>
          )}

          {roadmapItems.map((item) => (

            <article
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6"
            >

              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">

                <h2 className="text-2xl font-bold text-slate-800">
                  {item.title}
                </h2>

                <span className="text-xs uppercase tracking-wider bg-aqua-pale text-aqua-deep font-bold px-3 py-1 rounded-full">
                  {item.stage}
                </span>

              </div>

              <p className="text-slate-600 leading-relaxed">
                {item.description}
              </p>

            </article>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Plans;