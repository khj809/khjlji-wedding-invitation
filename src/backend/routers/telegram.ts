import express from "express";
import TeleBot from "telebot";

import { TELEGRAM_TOKEN, TELEGRAM_DEFAULT_CHAT_ID } from "../config";

const bot = new TeleBot(TELEGRAM_TOKEN);
let chatId = TELEGRAM_DEFAULT_CHAT_ID;

bot.on(/\/start/, msg => {
  chatId = msg.from.id;
  msg.reply.text(`khjlji-wedding-invitation 텔레그램 챗봇에 연동되었습니다. Chat ID: ${chatId}`);
});

const router = express.Router();

router.post("/", (req, res) => {
  if (!chatId) {
    res.status(400).send({ result: "fail", message: "chat id가 존재하지 않습니다." });
    return;
  }

  const { type, data } = req.body;
  if (type === "comment") {
    const message = `새 코멘트가 등록되었습니다. ${data.user.name}: ${data.text}`;
    bot.sendMessage(chatId, message);
    res.send({ result: "success", type, data });
  } else if (type === "reservation") {
    const message = `${data.user.name} 님께서 ${data.gift.name} 선물을 예약해 주셨습니다: ${data.text}`;
    bot.sendMessage(chatId, message);
    res.send({ result: "success", type, data });
  } else {
    res.status(400).send({ result: "fail", type, data });
  }
});

export default router;
