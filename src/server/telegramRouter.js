require('dotenv').config();

var TeleBot = require('telebot');
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
let chatId = '781956430';

const bot = new TeleBot(TELEGRAM_TOKEN);
bot.on(/\/start/, msg => {
  chatId = msg.from.id;
  msg.reply.text('khjlji-wedding-invitation 텔레그램 챗봇에 연동되었습니다.');
});

var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
  const { type, data } = req.body;
  if (type === 'comment') {
    const message = `새 코멘트가 등록되었습니다. ${data.user.name}: ${
      data.text
    }`;
    bot.sendMessage(chatId, message);
    res.send({ result: 'success', type, data });
  } else if (type === 'reservation') {
    const message = `${data.user.name} 님께서 ${
      data.gift.name
    } 선물을 예약해 주셨습니다: ${data.text}`;
    bot.sendMessage(chatId, message);
    res.send({ result: 'success', type, data });
  } else {
    res.status(400).send({ result: 'fail', type, data });
  }
});

module.exports = router;
