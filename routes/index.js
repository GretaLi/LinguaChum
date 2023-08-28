const express = require("express");

const { OPENAI_CONTENT } = require("../configs");

const chatAI = require("../services/openai");

const router = express.Router();

const messages = [
  { role: "user", content: OPENAI_CONTENT },
  {
    role: "assistant",
    content:
      "Hi there! 🌟 It's wonderful to help you learn a new language through conversation. Could you please tell me your **name** which **language** you're learning and your **proficiency level**? Also, do you have a favorite topic you'd like to talk about? 😊",
  },
];

router
  .get("/", async (req, res) => {
    res.render("index", {
      description: req.flash("answer"),
      messages: messages,
    });
  })
  .post("/", async (req, res) => {
    const { description } = req.body;

    // 創建一個新的陣列傳送給 API
    const conversation = [...messages, { role: "user", content: description }];

    const answer = await chatAI({
      messages: conversation,
    });

    messages.push({
      role: "user",
      content: description,
    });

    messages.push({
      role: "assistant",
      content: answer,
    });

    req.flash("answer", answer);

    res.redirect("/");
  });

module.exports = router;
