import React, { useState } from 'react';
import Section from './Section';
import { Calculator, Play, MapPin, Star, Clock, Activity } from 'lucide-react';

const Demo: React.FC = () => {
  const [inputs, setInputs] = useState({
    distance: 5.0,
    rating: 4.8,
    hour: 18,
    traffic: 'Medium'
  });
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const trafficOptions = ['Low', 'Medium', 'High', 'Jam'];

  const handlePredict = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // 1. Define Coefficients (Weights) from a "trained" model
    const intercept = 12.0;
    const weights = {
      distance: 2.8, // +2.8 mins per km
      rating: -1.5,  // -1.5 mins per star
    };
    
    // 2. Feature Engineering / Preprocessing
    const trafficMultipliers: Record<string, number> = {
      'Low': 0.85, 'Medium': 1.0, 'High': 1.35, 'Jam': 2.0
    };
    
    // Rush hour feature (1 if rush hour, 0 otherwise)
    const isRushHour = (inputs.hour >= 8 && inputs.hour <= 10) || (inputs.hour >= 17 && inputs.hour <= 19);
    const rushHourMultiplier = isRushHour ? 1.2 : 1.0;

    // 3. Compute Weighted Sum (Linear Regression Equation)
    let score = intercept + 
                (inputs.distance * weights.distance) + 
                (inputs.rating * weights.rating);
    
    // 4. Apply Non-linear Interactions
    score *= trafficMultipliers[inputs.traffic];
    score *= rushHourMultiplier;

    // 5. Add Aleatoric Uncertainty (Random Noise)
    const noise = (Math.random() * 4) - 2; // +/- 2 minutes
    const finalPrediction = Math.max(5, Math.round(score + noise));

    // Animation Logic
    let current = 0;
    const duration = 600;
    const steps = 20;
    const stepTime = duration / steps;
    const increment = finalPrediction / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= finalPrediction) {
        setPrediction(finalPrediction);
        setIsAnimating(false);
        clearInterval(timer);
      } else {
        setPrediction(Math.floor(current));
      }
    }, stepTime);
  };

  return (
    <Section id="demo">
      <div className="mb-12">
        <h3 className="text-accent font-medium mb-2 uppercase tracking-wider">Interactive Demo</h3>
        <h2 className="text-3xl md:text-4xl font-bold text-white">Delivery Time Prediction Simulator</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Input Controls */}
        <div className="bg-surface p-8 rounded-2xl border border-gray-800 space-y-8">
          
          {/* Distance Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <MapPin size={16} className="text-accent" /> Distance
              </label>
              <span className="text-accent font-mono">{inputs.distance} km</span>
            </div>
            <input 
              type="range" 
              min="0.5" max="20" step="0.5"
              value={inputs.distance}
              onChange={(e) => setInputs({...inputs, distance: parseFloat(e.target.value)})}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent hover:accent-accent-hover transition-all"
            />
          </div>

          {/* Rating Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Star size={16} className="text-accent" /> Delivery Person Rating
              </label>
              <span className="text-accent font-mono">{inputs.rating}</span>
            </div>
            <input 
              type="range" 
              min="1" max="5" step="0.1"
              value={inputs.rating}
              onChange={(e) => setInputs({...inputs, rating: parseFloat(e.target.value)})}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent hover:accent-accent-hover transition-all"
            />
          </div>

          {/* Hour Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Clock size={16} className="text-accent" /> Order Hour
              </label>
              <span className="text-accent font-mono">{inputs.hour}:00</span>
            </div>
            <input 
              type="range" 
              min="0" max="23" step="1"
              value={inputs.hour}
              onChange={(e) => setInputs({...inputs, hour: parseInt(e.target.value)})}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent hover:accent-accent-hover transition-all"
            />
          </div>

          {/* Traffic Dropdown */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Activity size={16} className="text-accent" /> Traffic Density
              </label>
            </div>
            <div className="relative">
              <select 
                value={inputs.traffic}
                onChange={(e) => setInputs({...inputs, traffic: e.target.value})}
                className="w-full bg-background border border-gray-700 text-white rounded-lg p-3 appearance-none focus:border-accent outline-none transition-colors cursor-pointer"
              >
                {trafficOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <div className="absolute right-4 top-3.5 pointer-events-none text-gray-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>

          <button 
            onClick={handlePredict}
            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-white/5 active:scale-[0.98]"
          >
            <Play size={18} fill="currentColor" /> Predict Delivery Time
          </button>
        </div>

        {/* Output Area */}
        <div className="h-full flex flex-col">
          <div className="flex-grow bg-gradient-to-br from-surface to-background border border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group min-h-[300px]">
            
            {/* Background Decor */}
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {prediction !== null ? (
              <div className="relative z-10 animate-in fade-in zoom-in duration-300">
                <div className="text-sm text-gray-400 uppercase tracking-widest mb-4 font-semibold">Estimated Time</div>
                <div className="text-7xl md:text-8xl font-bold text-white mb-2 tracking-tighter">
                  {prediction}
                  <span className="text-2xl md:text-4xl text-accent ml-2">min</span>
                </div>
                <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs md:text-sm font-mono mt-4 border border-accent/20">
                  ± 2 min confidence interval
                </div>
              </div>
            ) : (
              <div className="relative z-10 text-gray-600">
                <Calculator size={64} className="mx-auto mb-6 opacity-20" />
                <p className="text-lg font-medium">Adjust parameters and click predict</p>
              </div>
            )}
          </div>
          
          <div className="mt-6 p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
             <p className="text-sm text-blue-200/80 leading-relaxed flex gap-3">
               <span className="shrink-0 mt-0.5 font-bold">ⓘ</span>
               This demo simulates how a trained regression model adjusts predictions based on engineered features.
             </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Demo;