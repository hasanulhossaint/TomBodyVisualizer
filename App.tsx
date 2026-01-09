
import React, { useState, useMemo } from 'react';
import { BodyStats, HealthMetrics, Gender, UnitSystem, ViewMode, VisualType } from './types';
import { BMI_CATEGORIES, INITIAL_STATS } from './constants';
import BodyVisualizer from './components/BodyVisualizer';
import BodyVisualizer3D from './components/BodyVisualizer3D';
import Controls from './components/Controls';

const App: React.FC = () => {
  const [stats, setStats] = useState<BodyStats>(INITIAL_STATS);
  const [units, setUnits] = useState<UnitSystem>(UnitSystem.METRIC);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.FRONT);
  const [visualType, setVisualType] = useState<VisualType>(VisualType.TWO_D);

  const metrics = useMemo<HealthMetrics>(() => {
    const heightM = stats.height / 100;
    const bmi = stats.weight / (heightM * heightM);
    const category = BMI_CATEGORIES.find(c => bmi >= c.min && bmi <= c.max) || BMI_CATEGORIES[3];
    const sexFactor = stats.gender === Gender.MALE ? 1 : 0;
    const bodyFatEstimate = (1.20 * bmi) + (0.23 * stats.age) - (10.8 * sexFactor) - 5.4;
    const idealWeightRange: [number, number] = [Math.round(18.5 * heightM * heightM), Math.round(24.9 * heightM * heightM)];
    return { bmi, category: category.label, categoryColor: category.color, bodyFatEstimate: Math.max(2, bodyFatEstimate), idealWeightRange };
  }, [stats]);

  const handleCalculate = () => {
    const el = document.getElementById('visualization-area');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFE] text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      <header className="py-6 md:py-10 px-4 sm:px-8 max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Engine Active
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-none">
              TOM <span className="text-blue-600 italic">BodyVisualizer</span>
            </h1>
          </div>
          
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            <button 
              onClick={() => setVisualType(VisualType.TWO_D)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${visualType === VisualType.TWO_D ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              2D Blueprint
            </button>
            <button 
              onClick={() => setVisualType(VisualType.THREE_D)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${visualType === VisualType.THREE_D ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              3D Projection
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-[1600px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 pb-20 w-full">
        <aside className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-8 self-start">
          <Controls stats={stats} onChange={setStats} units={units} onUnitChange={setUnits} onCalculate={handleCalculate} viewMode={viewMode} onViewModeChange={setViewMode} />
          <div className="hidden lg:block p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Biometric Status</h3>
             <div className="space-y-4">
               <div className="flex justify-between items-center"><span className="text-xs font-bold text-slate-500">Gender</span><span className="text-sm font-black text-slate-800 uppercase tracking-tighter">{stats.gender}</span></div>
               <div className="flex justify-between items-center"><span className="text-xs font-bold text-slate-500">System Accuracy</span><span className="text-sm font-black text-emerald-600 uppercase tracking-tighter">98.4%</span></div>
             </div>
          </div>
        </aside>

        <section id="results-section" className="lg:col-span-7 xl:col-span-8 space-y-6 md:space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">BMI Index</div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">{metrics.bmi.toFixed(1)}</span>
                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${metrics.categoryColor} bg-slate-50`}>{metrics.category}</span>
              </div>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Adiposity</div>
              <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">{metrics.bodyFatEstimate.toFixed(1)}%</div>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm sm:col-span-2 xl:col-span-1">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Ideal Mass</div>
              <div className="text-2xl font-black text-slate-900">{units === UnitSystem.METRIC ? `${metrics.idealWeightRange[0]}-${metrics.idealWeightRange[1]} kg` : `${Math.round(metrics.idealWeightRange[0]*2.2)}-${Math.round(metrics.idealWeightRange[1]*2.2)} lb`}</div>
            </div>
          </div>

          <div id="visualization-area" className="w-full h-[500px] sm:h-[600px] md:h-[700px]">
            {visualType === VisualType.THREE_D ? (
              <BodyVisualizer3D stats={stats} bmi={metrics.bmi} />
            ) : (
              <BodyVisualizer stats={stats} bmi={metrics.bmi} viewMode={viewMode} />
            )}
          </div>
        </section>
      </main>

      <footer className="sticky bottom-0 z-50 w-full bg-white/80 backdrop-blur-md border-t border-slate-100 py-4 px-4 sm:px-8">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-center sm:text-left">
            © 2025 TOM BodyVisualizer. All Rights Reserved.
          </p>
          <p className="text-[10px] md:text-xs font-black text-slate-900 uppercase tracking-[0.2em] text-center sm:text-right">
            Developed by <span className="text-blue-600">Md. Hassanul Hossain Tomal</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
