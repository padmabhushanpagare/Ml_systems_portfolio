import React, { useState } from 'react';
import Section from './Section';
import { ChevronDown, Terminal, CheckCircle2, ShieldAlert, Cpu, PenTool } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  answer: string;
}

const techQuestions: Question[] = [
  {
    id: 1,
    question: "How do you approach feature engineering?",
    answer: "I prioritize domain-specific signals over blind generation. I start with exploratory analysis to understand the data's physics. For geospatial data (Delivery project), I used K-Means clustering to capture neighborhood density. For temporal data, I use cyclical encoding (sin/cos) and lag features to capture seasonality. I strictly verify feature availability at inference time to prevent look-ahead bias."
  },
  {
    id: 2,
    question: "How do you choose between models?",
    answer: "I treat complexity as a cost. I always start with a simple linear baseline (Logistic/Linear Regression) to establish a benchmark. I move to Tree-based models (XGBoost/LightGBM) when dealing with tabular data requiring non-linear interactions. I only reserve Deep Learning for unstructured data (text/images) or complex sequence modeling. For the delivery engine, XGBoost offered the best balance of accuracy (R² 0.63) and low-latency inference (<50ms)."
  },
  {
    id: 3,
    question: "How do you prevent overfitting?",
    answer: "I use a layered defense strategy. 1) Data-level: Removing noisy features and handling outliers robustly. 2) Model-level: Applying L1/L2 regularization and restricting tree depth/leaves. 3) Training-level: Implementing early stopping based on a validation set. Crucially, I ensure the validation split strictly respects time-series boundaries (training on past, validating on future) to prevent leakage."
  },
  {
    id: 4,
    question: "How do you validate models?",
    answer: "Random cross-validation fails in production environments due to temporal correlation. I use time-based splitting to mimic the actual serving environment. Beyond global metrics (MAE/AUC), I perform slice-based evaluation—checking performance on specific segments like 'Rainy Days' or 'Downtown Zones'—to ensure the model generalizes across different operating regimes and doesn't just memorize the majority class."
  },
  {
    id: 5,
    question: "Explain your clustering strategy.",
    answer: "Clustering is a powerful dimensionality reduction tool for high-cardinality data. In the Delivery project, raw lat/lng coordinates are too sparse. I used K-Means to group coordinates into 50 distinct 'traffic zones'. This allowed the model to learn that 'Zone A' (Downtown) inherently implies a +5m delay compared to 'Zone B' (Suburbs), transforming complex spatial data into a dense categorical feature."
  },
  {
    id: 6,
    question: "How do you use SHAP for interpretability?",
    answer: "I use SHAP (SHapley Additive exPlanations) to debug model logic and build stakeholder trust. Globally, it confirms which features drive predictions (e.g., Distance > Prep Time). Locally, it explains individual outliers—why was *this* specific order predicted to take 45 minutes? This helps distinguish between actual model errors and genuine data anomalies (e.g., extreme traffic)."
  },
  {
    id: 7,
    question: "How would you deploy this model?",
    answer: "I containerize the model using Docker to ensure environment consistency between dev and prod. I expose it via a FastAPI endpoint for high-performance async inference. For scale, I deploy to Kubernetes with horizontal pod autoscaling based on request volume. To handle real-time features, I integrate a Feature Store (Redis) to fetch context (like current traffic) with sub-millisecond latency during the request lifecycle."
  },
  {
    id: 8,
    question: "How do you monitor model performance in production?",
    answer: "I monitor three distinct layers: 1) Service Health: Latency, Error Rates, and Saturation. 2) Data Drift: Comparing the distribution of incoming features against the training baseline (using KL Divergence) to catch shifts early. 3) Model Performance: Lagged calculation of ground-truth metrics (MAE/RMSE) once the actual event (e.g., delivery completion) is recorded in the data warehouse."
  }
];

const scenarioQuestions: Question[] = [
    {
        id: 9,
        question: "If your model performance drops after deployment, how would you debug?",
        answer: "I isolate the failure domain systematically. 1) Infrastructure: Check 4xx/5xx errors and latency to rule out service failure. 2) Data Quality: Are upstream features broken or null? 3) Statistical Drift: Use KS-test to compare serving distribution vs training. 4) Segmentation: Is the failure global or specific to a region/device? Most 'model' bugs are actually data pipeline bugs."
    },
    {
        id: 10,
        question: "How would you redesign the system for 10x scale?",
        answer: "Stateless scaling is easy; stateful is hard. 1) Architecture: Move from sync REST to async event-driven (Kafka) to handle backpressure. 2) Data: Switch from row-based lookups to batched vector retrieval. 3) Compute: Quantize models (FP16/INT8) to double throughput on existing hardware. 4) Caching: Cache top 20% of queries which often drive 80% of volume (Zipf's law)."
    },
    {
        id: 11,
        question: "What tradeoffs exist between accuracy and latency?",
        answer: "It's a business ROI calculation. In fraud detection, latency < 200ms is non-negotiable; a slow model blocks the transaction. I measure the marginal revenue of +0.5% accuracy against the cloud cost of inference. If the heavier model costs 2x more compute for 0.1% lift, I reject it. Distillation is my go-to for compressing accuracy into low-latency runtimes."
    },
    {
        id: 12,
        question: "How would you handle data drift?",
        answer: "Detection is useless without a mitigation plan. I set thresholds on feature distributions (KL Divergence). If breached: 1) Alerting: Notify the team. 2) Fallback: Automatically switch to a robust 'safe mode' model (e.g., simple logistic regression) or last-known-good version. 3) Remediation: Trigger a retrain on the freshest data window to capture the new pattern."
    },
    {
        id: 13,
        question: "When would you reject a high-accuracy model?",
        answer: "I reject models that are 'fragile'. 1) Leakage: Using future information (e.g., 'delivery_timestamp' in a duration prediction). 2) Maintenance: Custom CUDA kernels that the team can't debug. 3) Ethics: Accuracy gained by overfitting to protected classes. 4) Cold Start: Models that are useless for new users. Reliability > Marginal Accuracy."
    }
];

const InterviewQA: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const renderAccordion = (questions: Question[]) => (
    <div className="space-y-4">
        {questions.map((q) => (
            <div 
                key={q.id} 
                className={`bg-surface border rounded-xl overflow-hidden transition-all duration-300 ${
                    openId === q.id ? 'border-accent shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-gray-800 hover:border-gray-700'
                }`}
            >
                <button 
                    onClick={() => toggle(q.id)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    aria-expanded={openId === q.id}
                >
                    <span className={`font-semibold text-lg transition-colors ${openId === q.id ? 'text-white' : 'text-gray-400'}`}>
                        {q.question}
                    </span>
                    <ChevronDown 
                        className={`text-accent transition-transform duration-300 ${openId === q.id ? 'rotate-180' : ''}`} 
                        size={20} 
                    />
                </button>
                
                <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openId === q.id ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-gray-800/50 bg-background/30">
                        <div className="flex gap-3">
                            <CheckCircle2 size={20} className="text-accent shrink-0 mt-1" />
                            <p>{q.answer}</p>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
  );

  return (
    <Section id="interview" className="py-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Header 1: Technical */}
        <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-surface border border-gray-800 rounded-lg text-accent">
                <Terminal size={24} />
            </div>
            <div>
                <h3 className="text-accent font-medium uppercase tracking-wider text-xs">Technical Deep Dive</h3>
                <h2 className="text-3xl font-bold text-white">Interview Mode — Q&A</h2>
            </div>
        </div>

        {renderAccordion(techQuestions)}

        {/* Spacer */}
        <div className="my-16 border-t border-gray-800/50"></div>

        {/* Header 2: Scenario */}
        <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-surface border border-gray-800 rounded-lg text-orange-500">
                <Cpu size={24} />
            </div>
            <div>
                <h3 className="text-orange-500 font-medium uppercase tracking-wider text-xs">System Design & Strategy</h3>
                <h2 className="text-3xl font-bold text-white">Scenario Simulations</h2>
            </div>
        </div>

        {renderAccordion(scenarioQuestions)}

        {/* Spacer */}
        <div className="my-16 border-t border-gray-800/50"></div>

        {/* Header 3: Whiteboard */}
        <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-surface border border-gray-800 rounded-lg text-purple-400">
                <PenTool size={24} />
            </div>
            <div>
                <h3 className="text-purple-400 font-medium uppercase tracking-wider text-xs">System Design</h3>
                <h2 className="text-3xl font-bold text-white">Whiteboard Thinking</h2>
            </div>
        </div>

        {/* Whiteboard Content Card */}
        <div className="bg-surface/30 border border-gray-800 rounded-2xl p-8 relative overflow-hidden backdrop-blur-sm shadow-xl">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <PenTool size={180} />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-8 border-b border-gray-700/50 pb-4 inline-block">
                Example: Delivery Time Optimization
            </h3>

            <div className="space-y-10 relative">
                {/* Connector Line */}
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-purple-500/50 to-transparent"></div>

                {/* Step 1 */}
                <div className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm border border-purple-500/30 z-10 shadow-[0_0_10px_rgba(168,85,247,0.2)]">1</div>
                    <div className="group">
                        <h4 className="text-white font-bold mb-2 group-hover:text-purple-400 transition-colors">Problem Restatement</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            <strong>Objective:</strong> Predict delivery duration (minutes) at checkout. <br/>
                            <strong>Business Goal:</strong> Reduce late orders by 20% to improve retention. <br/>
                            <strong>SLA:</strong> Inference &lt; 50ms; 99.9% Availability.
                        </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm border border-purple-500/30 z-10 shadow-[0_0_10px_rgba(168,85,247,0.2)]">2</div>
                    <div className="group">
                        <h4 className="text-white font-bold mb-2 group-hover:text-purple-400 transition-colors">Data Strategy</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            <strong>Training Data:</strong> 12 months of historical logs (Order Placed &rarr; Delivered). <br/>
                            <strong>Outliers:</strong> Filter trips &gt; 3 hrs (system errors) or &lt; 2 mins (cancellations). <br/>
                            <strong>Seasonality:</strong> Partition data by city; account for holidays/events.
                        </p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm border border-purple-500/30 z-10 shadow-[0_0_10px_rgba(168,85,247,0.2)]">3</div>
                    <div className="group">
                        <h4 className="text-white font-bold mb-2 group-hover:text-purple-400 transition-colors">Feature Engineering</h4>
                        <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
                            <li><strong>Spatial:</strong> S2 Cell ID, Pickup/Dropoff Cluster (K-Means), Haversine Distance.</li>
                            <li><strong>Temporal:</strong> Hour-of-Day (Sin/Cos), Day-of-Week, Is_Rush_Hour.</li>
                            <li><strong>Real-time:</strong> Restaurant Queue Depth (Redis), Weather API (Rain/Snow).</li>
                        </ul>
                    </div>
                </div>

                {/* Step 4 */}
                <div className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm border border-purple-500/30 z-10 shadow-[0_0_10px_rgba(168,85,247,0.2)]">4</div>
                    <div className="group">
                        <h4 className="text-white font-bold mb-2 group-hover:text-purple-400 transition-colors">Model Selection</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            <strong>Algorithm:</strong> Gradient Boosted Decision Trees (XGBoost/LightGBM).<br/>
                            <strong>Why?</strong> Superior handling of tabular data and non-linear feature interactions (e.g., Rain + Friday Night) compared to linear models. Faster inference/training than Deep Learning for this feature size.
                        </p>
                    </div>
                </div>

                {/* Step 5 */}
                <div className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm border border-purple-500/30 z-10 shadow-[0_0_10px_rgba(168,85,247,0.2)]">5</div>
                    <div className="group">
                        <h4 className="text-white font-bold mb-2 group-hover:text-purple-400 transition-colors">Evaluation & Deployment</h4>
                        <p className="text-gray-400 text-sm leading-relaxed mb-3">
                            <strong>Offline Eval:</strong> RMSE & MAE on time-based split (Train: Jan-Mar, Test: Apr). <br/>
                            <strong>Online Eval:</strong> A/B Test (Variant B: New Model). Metric: Customer Support Ticket Rate.<br/>
                            <strong>Serving:</strong> ONNX Runtime wrapped in FastAPI. Autoscaling on K8s. Feature store (Redis) for &lt;5ms feature retrieval.
                        </p>
                        <div className="inline-block px-3 py-1.5 rounded bg-gray-900 border border-gray-700 font-mono text-xs text-purple-300">
                             Architecture: Client &rarr; API GW &rarr; Feature Store Lookups &rarr; Model &rarr; Response
                        </div>
                    </div>
                </div>

            </div>
        </div>

      </div>
    </Section>
  );
};

export default InterviewQA;