(() => {
  const chat = document.getElementById('chat');
  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const statusEl = document.getElementById('status');

  const tplUser = document.getElementById('msg-user');
  const tplBot = document.getElementById('msg-bot');

  let previousResponseId = null;
  let busy = false;

  function setBusy(on) {
    busy = on;
    form.querySelector('button').disabled = on;
    statusEl.textContent = on ? 'Piszę…' : 'Gotowy';
  }

  function addMessage(text, who = 'user') {
    const tpl = who === 'user' ? tplUser : tplBot;
    const node = tpl.content.cloneNode(true);
    node.querySelector('.bubble').textContent = text;
    chat.appendChild(node);
    // Auto scroll to bottom
    chat.scrollTop = chat.scrollHeight;
  }

  function showEmptyHint() {
    if (!chat.querySelector('.msg')) {
      const p = document.createElement('p');
      p.className = 'empty';
      p.textContent = 'Zacznij rozmowę, wpisując wiadomość poniżej.';
      chat.appendChild(p);
    }
  }

  async function sendMessage(text) {
    setBusy(true);
    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, previousResponseId })
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(`Błąd serwera (${res.status}): ${body || 'nieznany błąd'}`);
      }

      const data = await res.json();
      if (typeof data.response === 'string') {
        addMessage(data.response, 'bot');
      } else {
        addMessage('Otrzymano nieoczekiwaną odpowiedź z serwera.', 'bot');
      }
      previousResponseId = data.responseId || previousResponseId;
    } catch (err) {
      console.error(err);
      addMessage('Nie udało się pobrać odpowiedzi. Upewnij się, że aplikacja ma ustawioną zmienną środowiskową OPENAI_API_KEY i spróbuj ponownie.\n\nSzczegóły: ' + err.message, 'bot');
    } finally {
      setBusy(false);
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || busy) return;
    // Remove empty hint if present
    const hint = chat.querySelector('.empty');
    if (hint) hint.remove();

    addMessage(text, 'user');
    input.value = '';
    sendMessage(text);
  });

  // Initial UI state
  showEmptyHint();
})();