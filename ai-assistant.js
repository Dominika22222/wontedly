const form = document.getElementById('ai-form');
const input = document.getElementById('ai-message');
const sendButton = document.getElementById('ai-send');
const messages = document.getElementById('ai-messages');

form.addEventListener('submit', async (event) => {
  // Prevent the browser's default form submission, which reloads the page.
  event.preventDefault();

  const message = input.value.trim();
  if (!message || sendButton.disabled) return;

  addMessage(message, 'user');
  input.value = '';
  sendButton.disabled = true;
  input.disabled = true;

  const pending = addMessage('Thinking…', 'assistant');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context: getColorResultContext() })
    });

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error(`The server returned an unreadable response (${response.status}).`);
    }

    if (!response.ok) {
      throw new Error(data?.error || `Request failed (${response.status}).`);
    }
    if (typeof data.reply !== 'string' || !data.reply.trim()) {
      throw new Error('The server returned an empty reply.');
    }

    pending.textContent = data.reply;
  } catch (error) {
    pending.textContent = `I could not respond: ${error.message || 'Please try again.'}`;
    pending.classList.add('is-error');
  } finally {
    sendButton.disabled = false;
    input.disabled = false;
    input.focus();
  }
});

function addMessage(text, role) {
  const message = document.createElement('p');
  message.className = `ai-message ai-message-${role}`;
  message.textContent = text;
  messages.append(message);
  message.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  return message;
}

function getColorResultContext() {
  const scores = [...document.querySelectorAll('#score-list .score-row')].map((row) => ({
    color: row.querySelector('.score-label strong')?.textContent.trim() || '',
    trait: row.querySelector('.score-label span')?.textContent.trim() || '',
    score: row.querySelector('.score-number')?.textContent.trim() || ''
  }));

  return {
    result: document.getElementById('result-heading')?.textContent.trim() || '',
    summary: document.getElementById('result-copy')?.textContent.trim() || '',
    scores
  };
}
