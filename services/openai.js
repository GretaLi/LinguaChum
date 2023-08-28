const { OPENAI_MAX_TOKENS } = require("../configs");

const openai = require("../connections/openai");

async function chatAI({ messages }) {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    max_tokens: Number(OPENAI_MAX_TOKENS),
  });

  return response.data.choices[0].message.content;
}

module.exports = chatAI;
