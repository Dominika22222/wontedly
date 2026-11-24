export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/chat') {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: { 'Allow': 'POST, OPTIONS' }
        });
      }

      if (request.method !== 'POST') {
        return jsonResponse({ error: 'Method not allowed' }, 405);
      }

      return handleChat(request, env);
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Static assets are not configured', { status: 500 });
  }
};

async function handleChat(request, env) {
  if (!env.OPENROUTER_API_KEY) {
    return jsonResponse({ error: 'OPENROUTER_API_KEY is not configured' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) {
    return jsonResponse({ error: 'Message is required' }, 400);
  }
  if (message.length > 500) {
    return jsonResponse({ error: 'Message is too long' }, 400);
  }

  const resultContext = JSON.stringify(body.context ?? {}).slice(0, 6000);

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://wontedly-site.pages.dev',
      'X-Title': 'Wontedly Color Guide'
    },
    body: JSON.stringify({
      model: 'openrouter/auto',
      messages: [
        {
          role: 'system',
          content: 'You are a thoughtful, concise Wontedly color-guide assistant. The test is reflective, not a scientific diagnosis or mental-health assessment. Never diagnose or make strong psychological claims.'
        },
        {
          role: 'user',
          content: `The user's color-test result context is: ${resultContext}\n\nUser question: ${message}`
        }
      ],
      max_tokens: 500
    })
  });

  if (!response.ok) {
    const providerText = await response.text();
    return jsonResponse({
      error: 'The AI provider returned an error',
      status: response.status,
      provider: providerText.slice(0, 500)
    }, 502);
  }

  const result = await response.json();
  const reply = result?.choices?.[0]?.message?.content;
  if (!reply) {
    return jsonResponse({ error: 'The AI provider returned no reply' }, 502);
  }

  return jsonResponse({ reply });
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}
