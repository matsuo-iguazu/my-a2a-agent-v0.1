// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// A2Aプロトコル対応のエンドポイント
app.post('/v1/chat/completions', (req, res) => {
  const { messages, model } = req.body;
  const lastMessage = messages[messages.length - 1];
  
  console.log('Received message:', lastMessage.content);
  
  res.json({
    id: 'chatcmpl-' + Date.now(),
    object: 'chat.completion',
    created: Math.floor(Date.now() / 1000),
    model: model || 'custom-agent',
    choices: [{
      index: 0,
      message: {
        role: 'assistant',
        content: `Hello! You asked: "${lastMessage.content}". This is a response from your custom A2A agent running on Code Engine.`
      },
      finish_reason: 'stop'
    }]
  });
});

// ヘルスチェック用
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`A2A Agent running on port ${PORT}`);
});
