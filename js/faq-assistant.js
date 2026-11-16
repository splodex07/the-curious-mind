/* An immediate, synchronous answer helper based on the store's published information.
   It does not call a remote AI model; connect a secure AI backend for open-ended AI chat. */
(() => {
  const form = document.getElementById('agentForm');
  const input = document.getElementById('agentInput');
  const messages = document.getElementById('agentMessages');
  if (!form || !input || !messages) return;

  const catalog = window.TCM && Array.isArray(window.TCM.catalog) ? window.TCM.catalog : [];
  const bookById = (id) => catalog.find(book => book.id === id);
  const priceOf = (id) => {
    const book = bookById(id);
    return book && book.price != null ? `₹${Number(book.price).toLocaleString('en-IN')}` : 'price to be announced';
  };
  const bookTitle = (id) => {
    const book = bookById(id);
    return book ? `“${book.title}”` : 'this eBook';
  };
  const allPrices = () => catalog.map(book => `${bookTitle(book.id)} — ${priceOf(book.id)}`).join('; ');

  const answers = [
    { keys: ['price', 'cost', 'how much', '₹', 'rupee', 'rate'], reply: () => `The current listed prices are: ${allPrices()}.` },
    { keys: ['format', 'pdf', 'file', 'download', 'receive', 'delivery'], reply: 'The books are digital eBooks in PDF format. Automatic delivery will be enabled after secure payment verification is connected.' },
    { keys: ['phone', 'mobile', 'computer', 'device', 'read'], reply: 'Yes. PDF eBooks can generally be read on phones, tablets and computers with a PDF reader.' },
    { keys: ['printed', 'paper', 'physical', 'hard copy'], reply: 'The books currently listed are digital eBooks, not printed or physical copies.' },
    { keys: ['refund', 'return', 'cancel'], reply: 'The final digital-product refund rules will be published before checkout is activated. For a specific order issue, contact the store with your order details.' },
    { keys: ['payment', 'upi', 'checkout', 'pay', 'qr'], reply: 'Online checkout is not active yet. Payment will be enabled only after a secure provider and verified order flow are configured.' },
    { keys: ['body', '100 secrets', 'human body'], reply: () => `${bookTitle('body')} explores surprising discoveries about the human body and the science behind everyday experiences. It is priced at ${priceOf('body')}.` },
    { keys: ['brain', 'psychology', 'memory', 'mental tricks'], reply: () => `${bookTitle('brain')} explores perception, memory, attention and mental shortcuts across five connected chapters. It is priced at ${priceOf('brain')}.` },
    { keys: ['art of noticing', 'noticing', 'attention', 'curiosity', 'ordinary life', 'senses'], reply: () => `${bookTitle('noticing')} explores how attention, perception, memory, the senses and curiosity shape what we notice in everyday life. It is priced at ${priceOf('noticing')}.` },
    { keys: ['contact', 'email', 'instagram', 'support', 'help'], reply: 'The Contact section is where the official email and Instagram links will appear once the store owner provides them.' }
  ];

  function add(text, who) {
    const bubble = document.createElement('div');
    bubble.className = `agent-bubble ${who === 'user' ? 'agent-user' : 'agent-bot'}`;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    add(question, 'user');
    const q = question.toLowerCase();
    const match = answers.find(item => item.keys.some(key => q.includes(key)));
    const reply = match ? (typeof match.reply === 'function' ? match.reply() : match.reply)
      : 'I can answer common questions about our books, prices, PDF format, delivery and checkout. For a question outside those topics, please use the Contact section. This quick-help assistant uses prepared store information.';
    input.value = '';
    input.focus();

    // A brief typing pause makes the exchange feel natural without slowing it down noticeably.
    const typing = document.createElement('div');
    typing.className = 'agent-typing';
    typing.textContent = 'Curious Assistant is typing…';
    typing.setAttribute('aria-label', 'Assistant is typing');
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
    window.setTimeout(() => {
      typing.remove();
      add(reply, 'bot');
    }, 1100);
  });
})();
