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
  const apiKey = env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) {
    return jsonResponse({ error: 'OPENROUTER_API_KEY is not configured in the Worker' }, 500);
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

  let response;
  try {
    response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://wontedly-site.dominika-sobczak.workers.dev',
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
  } catch (error) {
    return jsonResponse({ error: `Could not reach OpenRouter: ${error.message || 'network error'}` }, 502);
  }

  if (!response.ok) {
    let providerText = await response.text();
    let providerMessage = providerText;
    try {
      const providerJson = JSON.parse(providerText);
      providerMessage = providerJson?.error?.message || providerJson?.error || providerText;
    } catch {
      // Keep the provider's plain-text response.
    }

    return jsonResponse({
      error: `OpenRouter rejected the request (${response.status}): ${String(providerMessage).slice(0, 500)}`
    }, 502);
  }

  const result = await response.json();
  const reply = result?.choices?.[0]?.message?.content;
  if (!reply) {
    return jsonResponse({ error: 'OpenRouter returned no assistant reply' }, 502);
  }

  return jsonResponse({ reply });
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}
