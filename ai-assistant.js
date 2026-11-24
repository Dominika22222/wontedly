const form = document.getElementById('ai-form');
const input = document.getElementById('ai-message');
const sendButton = document.getElementById('ai-send');
const messages = document.getElementById('ai-messages');

function addMessage(text, role) {
  const message = document.createElement('div');
  message.className = `ai-message ${role}`;
  message.textContent = text;
  messages.append(message);
  messages.scrollTop = messages.scrollHeight;
  return message;
}

function getResultContext() {
  const scoreRows = [...document.querySelectorAll('#score-list .score-row')];
  const scores = scoreRows.map(row => {
    const name = row.querySelector('.score-label strong')?.textContent.trim();
    const trait = row.querySelector('.score-label span')?.textContent.trim();
    const scoreText = row.querySelector('.score-number')?.textContent || '';
    return { name, trait, scoreText };
  }).filter(item => item.name);

  const highlightName = document.querySelector('.main-color-name')?.textContent.trim() || '';
  return {
    leadingColors: highlightName,
    scores
  };
}

form?.addEventListener('submit', async event => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  input.value = '';
  sendButton.disabled = true;
  input.disabled = true;
  const loading = addMessage('Thinking…', 'assistant');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, context: getResultContext() })
    });

    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`);
    }

    const data = await response.json();
    if (!data.reply) throw new Error('No reply returned');
    loading.remove();
    addMessage(data.reply, 'assistant');
  } catch (error) {
    loading.remove();
    addMessage('I could not respond right now. Please try again shortly.', 'error');
  } finally {
    sendButton.disabled = false;
    input.disabled = false;
    input.focus();
  }
});
