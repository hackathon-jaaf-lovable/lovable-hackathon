const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Audience endpoint using OpenAI if key present
const openaiApiKey = process.env.OPENAI_API_KEY;
let openai;
if (openaiApiKey) {
  openai = new OpenAI({ apiKey: openaiApiKey });
}

app.post('/audience', async (req, res) => {
  const message = req.body.message || '';
  if (openai) {
    try {
      const chat = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a simulated audience.' },
          { role: 'user', content: message }
        ]
      });
      return res.json({ response: chat.choices[0].message.content });
    } catch (err) {
      return res.json({ response: `Error contacting OpenAI: ${err.message}` });
    }
  }
  // Fallback echo
  res.json({ response: `Audience agent: ${message}` });
});

app.post('/coach', async (req, res) => {
  const message = req.body.message || '';
  const prompt = [
    { role: 'system', content: 'You are an encouraging speech coach giving concise feedback and tips on public speaking and body language.' },
    { role: 'user', content: message }
  ];
  if (openai) {
    try {
      const chat = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: prompt
      });
      return res.json({ response: chat.choices[0].message.content });
    } catch (err) {
      return res.json({ response: `Error contacting OpenAI: ${err.message}` });
    }
  }
  // Fallback tip if OpenAI key not provided
  res.json({ response: 'Great job! Remember to stand tall and project your voice.' });
});

app.post('/analyze', (_req, res) => {
  // Placeholder for body language analysis
  res.json({ tips: 'Keep your shoulders back and maintain eye contact.' });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
