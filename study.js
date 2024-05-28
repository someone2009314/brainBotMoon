async function question() {
  const response = await fetch('/api/question', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grade: '...',
      subject: '...',
      topic: '...',
      type: '...',
    }),
  });

  const data = await response.json();
  document.getElementById('question').innerText = data.question;
}

window.question = question;
