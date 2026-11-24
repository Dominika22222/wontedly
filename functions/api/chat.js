export async function onRequestPost(context) {
  const { request, env } = context;

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

  const contextSummary = JSON.stringify(body.context ?? {}).slice(0, 6000);

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
          content: 'You are a thoughtful, concise Wontedly color-guide assistant. The color test is a reflective tool, not a scientific diagnosis or mental-health assessment. Discuss the user\'s selected colors and scores without diagnosing, labeling, or making strong claims. Be supportive and encourage self-reflection.'
        },
        {
          role: 'user',
          content: `The user's color-test result context is: ${contextSummary}\n\nUser question: ${message}`
        }
      ],
      max_tokens: 500
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    return jsonResponse({
      error: 'The AI provider returned an error',
      status: response.status,
      provider: errorText.slice(0, 500)
    }, 502);
  }

  const result = await response.json();
  const reply = result?.choices?.[0]?.message?.content;
  if (!reply) {
    return jsonResponse({ error: 'The AI provider returned no reply' }, 502);
  }

  return jsonResponse({ reply });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Allow': 'POST, OPTIONS'
    }
  });
}

export async function onRequest(context) {
  return jsonResponse({ error: 'Method not allowed' }, 405);
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
