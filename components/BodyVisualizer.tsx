
import React from 'react';
import { BodyStats, Gender, ViewMode } from '../types';

interface BodyVisualizerProps {
  stats: BodyStats;
  bmi: number;
  viewMode: ViewMode;
}

const BodyVisualizer: React.FC<BodyVisualizerProps> = ({ stats, bmi, viewMode }) => {
  const t = (bmi - 15) / 30;
  const w = Math.max(0, Math.min(1.2, t));
  const isMale = stats.gender === Gender.MALE;

  const neckW = (isMale ? 17 : 14) + (w * 12 * (isMale ? 1.2 : 0.8));
  const shoulderW = (isMale ? 48 : 38) + (w * 10);
  const waistW = (isMale ? 32 : 26) + (w * 65 * (isMale ? 1.1 : 0.7));
  const hipW = (isMale ? 36 : 42) + (w * 50 * (isMale ? 0.6 : 1.3));
  const thighW = (isMale ? 18 : 22) + (w * 22 * (isMale ? 0.7 : 1.4));
  const chestW = (isMale ? 42 : 36) + (w * 25 * (isMale ? 0.8 : 1.0));
  const armW = 10 + (w * 9);

  const sNeckD = (isMale ? 16 : 14) + (w * 8);
  const sChestD = (isMale ? 32 : 34) + (w * 20);
  const sBellyD = 28 + (w * 85 * (isMale ? 1.2 : 0.8));
  const sButtD = (isMale ? 24 : 34) + (w * 25 * (isMale ? 0.6 : 1.4));
  const sThighD = 20 + (w * 18);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#FDFDFE] rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden group">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
      </div>
      
      <svg viewBox="0 0 240 500" className="h-[92%] w-auto transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-[0_25px_45px_rgba(15,23,42,0.12)]">
        <defs>
          <linearGradient id="humanSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBD5C5" />
            <stop offset="50%" stopColor="#E9BBA6" />
            <stop offset="100%" stopColor="#D29A83" />
          </linearGradient>
          <filter id="softOrganic" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
          </filter>
        </defs>

        <g filter="url(#softOrganic)">
          <ellipse cx="120" cy="485" rx={viewMode === ViewMode.FRONT ? 60 + (w * 60) : 40 + (w * 50)} ry="10" fill="#0f172a" fillOpacity="0.08" className="transition-all duration-1000" />

          {viewMode === ViewMode.FRONT ? (
            <g className="transition-all duration-1000">
              <path d="M 120,40 C 105,40 94,52 94,70 C 94,88 106,100 120,100 C 134,100 146,88 146,70 C 146,52 135,40 120,40" fill="url(#humanSkin)" />
              <path d={`M ${120-neckW/2},92 C ${120-neckW*0.8},94 ${120-shoulderW*0.6},96 ${120-shoulderW},105 L ${120+shoulderW},105 C ${120+shoulderW*0.6},96 ${120+neckW*0.8},94 ${120+neckW/2},92 Z`} fill="url(#humanSkin)" />
              <path d={`M 120,105 C ${120 - shoulderW},105 ${120 - chestW},145 ${120 - chestW},195 C ${120 - chestW},250 ${120 - waistW},290 ${120 - waistW},330 C ${120 - waistW},370 ${120 - hipW},390 ${120 - hipW},420 L ${120 + hipW},420 C ${120 + hipW},390 ${120 + waistW},370 ${120 + waistW},330 C ${120 + waistW},290 ${120 + chestW},250 ${120 + chestW},195 C ${120 + chestW},145 ${120 + shoulderW},105 120,105 Z`} fill="url(#humanSkin)" className="transition-all duration-1000" />
              <g fill="url(#humanSkin)">
                <path d={`M ${120-shoulderW},105 C ${120-shoulderW-armW*1.2},150 ${120-shoulderW-armW},250 ${120-shoulderW-armW*0.8},320 Q ${120-shoulderW-armW},340 ${120-shoulderW-armW*1.1},360 L ${120-shoulderW-armW*0.4},360 Q ${120-shoulderW},340 ${120-shoulderW+10},320 Z`} />
                <path d={`M ${120+shoulderW},105 C ${120+shoulderW+armW*1.2},150 ${120+shoulderW+armW},250 ${120+shoulderW+armW*0.8},320 Q ${120+shoulderW+armW},340 ${120+shoulderW+armW*1.1},360 L ${120+shoulderW+armW*0.4},360 Q ${120+shoulderW},340 ${120+shoulderW-10},320 Z`} />
                <circle cx={120-shoulderW-armW*0.75} cy="365" r="5.5" />
                <circle cx={120+shoulderW+armW*0.75} cy="365" r="5.5" />
              </g>
              <g fill="url(#humanSkin)" className="transition-all duration-1000">
                <path d={`M ${120-hipW+8},420 C ${120-hipW-4},430 ${120-thighW*1.4},455 ${120-thighW*1.2},485 L ${120-thighW*0.3},485 C ${120-thighW*0.3},465 ${120-10},445 ${120-10},420 Z`} />
                <path d={`M ${120+hipW-8},420 C ${120+hipW+4},430 ${120+thighW*1.4},455 ${120+thighW*1.2},485 L ${120+thighW*0.3},485 C ${120+thighW*0.3},465 ${120+10},445 ${120+10},420 Z`} />
              </g>
            </g>
          ) : (
            <g className="transition-all duration-1000">
              <path d="M 120,40 C 100,40 88,55 88,72 C 88,90 102,100 120,100 C 142,100 148,82 148,68 C 148,48 138,40 120,40" fill="url(#humanSkin)" />
              <path d={`M 120,100 C ${120 - sChestD},110 ${120 - sChestD * 1.3},165 ${120 - sChestD * 1.15},235 C ${120 - sBellyD},305 ${120 - sBellyD},370 ${120 - sChestD},420 L ${120 + sButtD},420 C ${120 + sButtD * 1.5},370 ${120 + sButtD * 1.2},205 ${120 + sNeckD},100 Z`} fill="url(#humanSkin)" className="transition-all duration-1000" />
              <path d={`M ${120 - sChestD + 18},420 C ${120 - sBellyD * 0.4},445 ${120 - sThighD * 1.15},470 ${120 - sThighD},485 L ${120 + sButtD * 0.6},485 C ${120 + sButtD * 0.9},465 ${120 + sButtD},445 ${120 + sButtD},420 Z`} fill="url(#humanSkin)" className="transition-all duration-1000" />
            </g>
          )}
        </g>
      </svg>
      
      {/* Real-time HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Live Feed</div>
              <div className="text-sm font-black text-slate-900 uppercase italic tracking-tight">Blueprint v2.5</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Index Rank</div>
            <div className="text-sm font-black text-blue-600 uppercase italic tracking-tight">Anatomical Scan</div>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="bg-slate-900/5 backdrop-blur-sm p-4 rounded-2xl border border-slate-200">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Real-time Calculation</div>
             <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-900 tracking-tighter">{bmi.toFixed(1)}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">BMI</span>
             </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-1">Projection Active</div>
            <div className="text-[8px] font-bold text-slate-400 uppercase">Latency: 14ms</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyVisualizer;
