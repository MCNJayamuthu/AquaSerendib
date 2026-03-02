import React from 'react';

const Plans: React.FC = () => {
  const roadmapItems = [
    {
      title: 'Extend Fish Species Database',
      detail: 'Add more endemic and threatened freshwater species with verified records and images.',
      status: 'Planned'
    },
    {
      title: 'Community Submissions',
      detail: 'Allow researchers and citizen scientists to submit observations for review.',
      status: 'Planned'
    },
    {
      title: 'Offline Identification Mode',
      detail: 'Support low-connectivity field use with cached species data and deferred sync.',
      status: 'Backlog'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-aqua-deep mb-4">Roadmap</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            This page tracks the next improvements planned for AquaSerendib.
          </p>
        </div>

        <div className="grid gap-6">
          {roadmapItems.map((item) => (
            <article key={item.title} className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <h2 className="text-2xl font-bold text-slate-800">{item.title}</h2>
                <span className="text-xs uppercase tracking-wider bg-aqua-pale text-aqua-deep font-bold px-3 py-1 rounded-full">
                  {item.status}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plans;
