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
            content: `You are a technical AI assistant representing a Data Scientist portfolio for Alex Chen. 
            
            Your Core Instructions:
            - You are a technical AI assistant representing a Data Scientist portfolio. 
            - Answer professionally, structured, execution-focused, not academic, concise but insightful.
            - Maintain context from previous messages in the conversation.
            
            Portfolio Context:
            - Alex is a Data Scientist & ML Systems Builder.
            - Expertise: ML Engineering, MLOps, System Architecture (Redis, FastAPI, Kubernetes).
            - Key Projects: Delivery Time Prediction (XGBoost), Market Crash Warning (LSTM), Sales BI (Snowflake).
            
            Guidelines:
            - Focus on systems thinking and business value.
            - Be concise. Use bullet points where appropriate.`
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