import React, { useState } from 'react';
import Section from './Section';
import { Calculator, Play, MapPin, Star, Clock, Activity, BarChart3, Info } from 'lucide-react';

interface Contribution {
  feature: string;
  value: number;
  label: string;
  color: string;
  description: string;
}

const Demo: React.FC = () => {
  const [inputs, setInputs] = useState({
    distance: 5.0,
    rating: 4.8,
    hour: 18,
    traffic: 'Medium'
  });
  const [prediction, setPrediction] = useState<number | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const trafficOptions = ['Low', 'Medium', 'High', 'Jam'];

  const handlePredict = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // --- ML Model Simulation Logic ---
    
    // 1. Base Model Intercept (Average Prep Time)
    const baseTime = 12; 

    // 2. Feature Contributions (SHAP-style additive logic)
    
    // Distance: +2.5 mins per km
    const distanceImpact = inputs.distance * 2.5;
    
    // Traffic: Additive delay based on density
    let trafficImpact = 0;
    switch(inputs.traffic) {
        case 'Low': trafficImpact = 0; break;
        case 'Medium': trafficImpact = 5; break;
        case 'High': trafficImpact = 15; break;
        case 'Jam': trafficImpact = 30; break;
    }

    // Hour: Rush Hour Feature Engineering (8-10am, 5-7pm)
    const isRushHour = (inputs.hour >= 8 && inputs.hour <= 10) || (inputs.hour >= 17 && inputs.hour <= 19);
    const hourImpact = isRushHour ? 10 : 0;

    // Rating: Driver Efficiency (Negative contribution means faster delivery)
    // Centered at 4.0 stars. Every star above 4.0 saves 3 mins. Below adds 3 mins.
    const ratingImpact = (4.0 - inputs.rating) * 3;

    // Total Calculation
    const totalScore = baseTime + distanceImpact + trafficImpact + hourImpact + ratingImpact;
    // Floor at 8 mins to keep it realistic
    const finalPrediction = Math.max(8, Math.round(totalScore)); 

    // 3. Prepare Explainability Data
    // We normalize bar widths against a theoretical max impact for visualization
    const newContributions: Contribution[] = [
      { 
        feature: 'Base Time', 
        value: baseTime,
        label: `${baseTime}m`,
        color: 'bg-gray-600', 
        description: 'Kitchen prep & handling' 
      },
      { 
        feature: `Distance (${inputs.distance}km)`, 
        value: distanceImpact,
        label: `+${distanceImpact.toFixed(1)}m`,
        color: 'bg-blue-500', 
        description: 'Travel time at avg speed' 
      },
      { 
        feature: `Traffic (${inputs.traffic})`, 
        value: trafficImpact + hourImpact,
        label: `+${trafficImpact + hourImpact}m`,
        color: (trafficImpact + hourImpact) > 10 ? 'bg-red-500' : 'bg-orange-500', 
        description: isRushHour ? 'High congestion + Rush hour' : 'Traffic density delay'
      },
      { 
        feature: `Driver (⭐${inputs.rating})`, 
        value: ratingImpact,
        label: ratingImpact <= 0 ? `${ratingImpact.toFixed(1)}m` : `+${ratingImpact.toFixed(1)}m`,
        color: ratingImpact <= 0 ? 'bg-accent' : 'bg-yellow-500', 
        description: ratingImpact <= 0 ? 'High efficiency bonus' : 'Navigation inefficiency' 
      }
    ];

    setContributions(newContributions);

    // 4. Animation Loop
    let current = prediction || 0;
    const duration = 800;
    const steps = 30;
    const stepTime = duration / steps;
    const increment = (finalPrediction - current) / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setPrediction(finalPrediction);
        setIsAnimating(false);
        clearInterval(timer);
      } else {
        setPrediction(Math.round(current));
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
        <div className="bg-surface p-8 rounded-2xl border border-gray-800 space-y-8 h-full">
          
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
            </div>
          </div>

          <button 
            onClick={handlePredict}
            disabled={isAnimating}
            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5 active:scale-[0.98]"
          >
            <Play size={18} fill="currentColor" /> {isAnimating ? 'Computing...' : 'Predict Delivery Time'}
          </button>
        </div>

        {/* Output Area */}
        <div className="h-full flex flex-col gap-6">
          <div className="bg-gradient-to-br from-surface to-background border border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group min-h-[240px]">
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {prediction !== null ? (
              <div className="relative z-10 animate-slide-up">
                <div className="text-sm text-gray-400 uppercase tracking-widest mb-4 font-semibold">Predicted ETA</div>
                <div className="text-7xl md:text-8xl font-bold text-white mb-2 tracking-tighter">
                  {prediction}
                  <span className="text-2xl md:text-4xl text-accent ml-2">min</span>
                </div>
                <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs md:text-sm font-mono mt-4 border border-accent/20">
                  Model Confidence: 94%
                </div>
              </div>
            ) : (
              <div className="relative z-10 text-gray-600">
                <Calculator size={64} className="mx-auto mb-6 opacity-20" />
                <p className="text-lg font-medium">Configure inputs to generate prediction</p>
              </div>
            )}
          </div>

          {/* Model Explainability (SHAP-style) */}
          {contributions.length > 0 && (
            <div className="bg-surface border border-gray-800 rounded-2xl p-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <BarChart3 size={14} /> Feature Contributions
              </h4>
              <div className="space-y-5">
                {contributions.map((item, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300 font-medium">{item.feature}</span>
                      <span className={`font-mono ${item.value < 0 ? 'text-accent' : 'text-gray-400'}`}>
                        {item.label}
                      </span>
                    </div>
                    
                    {/* Progress Bar Container */}
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden flex items-center relative">
                      {/* Bar Fill */}
                      <div 
                        className={`h-full rounded-full bar-transition ${item.color}`}
                        style={{ 
                          width: `${Math.min(100, Math.abs(item.value) * 1.5)}%`, // Scale factor for visuals
                          opacity: item.value === 0 ? 0.3 : 1
                        }} 
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-800/50 flex gap-3 text-xs text-gray-500">
                <Info size={14} className="shrink-0 mt-0.5 text-accent" />
                <p>
                  This breakdown simulates SHAP (SHapley Additive exPlanations) values, visualizing how each feature pushes the prediction away from the baseline.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default Demo;