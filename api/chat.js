export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Method Check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Input Validation
  const { message, history } = req.body;
  
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Valid message string is required' });
  }

  // Parse History (Map frontend 'text' to OpenAI 'content', limit individual msg size)
  const contextMessages = Array.isArray(history) 
    ? history.map(msg => ({
        role: msg.role, 
        content: typeof msg.text === 'string' ? msg.text.substring(0, 1000) : '' 
      })) 
    : [];

  // Configuration Check
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('Missing OPENAI_API_KEY environment variable');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Cost-optimized model
        messages: [
          {
            role: 'system',
            content: `You are a specialized AI assistant for the portfolio of Alex Chen, a Data Scientist & ML Systems Builder.

            **Core Objectives:**
            1. Showcase Alex's expertise in ML Engineering, MLOps, and System Architecture (Redis, FastAPI, Kubernetes).
            2. Explain his key projects: 
               - Delivery Time Prediction (XGBoost + Redis for <50ms latency).
               - Market Crash Warning (LSTM Autoencoders for anomaly detection).
               - Enterprise Sales BI (Snowflake + dbt for centralized warehousing).
            3. Demonstrate "systems thinking"—focus on deployment, latency, business value, and reliability, not just academic model training.

            **Strict Constraints:**
            - **Topic Guardrails:** ONLY answer questions related to Data Science, Machine Learning, Software Engineering, and Alex's professional background. If asked about politics, religion, sports, or unrelated general knowledge, politely refuse and redirect to his professional skills.
            - **Conciseness:** Keep responses under 200 words. Use bullet points for readability.
            - **Tone:** Professional, execution-focused, and technical. Avoid flowery language.

            **Context Awareness:**
            - Use the provided conversation history to maintain context.
            - Focus on results: "Reduced MAE by 45%", "Saved 20 hours/week".`
          },
          ...contextMessages,
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenAI API Error:', data);
      return res.status(502).json({ error: 'Failed to communicate with AI service' });
    }

    return res.status(200).json({ 
      reply: data.choices[0].message.content 
    });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}