const linebot = require('linebot');
const express = require('express');
const fs = require('fs-extra');


let bot = linebot({
  channelId: '1649141912',
  channelSecret: 'aa0db738fd55d025e18be11f2926b60c',
  channelAccessToken: 'qy2yCXR6HiORxp2Xjyzt6JGuZuINuvRX4zDRMQmEXwgjPG5EV/gwj0WqeksvyETsxFRI8I8nNTMajyNph59sONxM9IATSV6hJnFdcDZCaZcqeFnfxa6IPg6xYzHUiv6I04N/yWEBrVqPtuEkWuSH/wdB04t89/1O/w1cDnyilFU='
});

const app = express();
const linebotParser = bot.parser();
const port = process.env.PORT || 3000;

app.use(express.static('data'));
app.post('/linewebhook', linebotParser);
app.listen(port, () => {
  console.log('Bot Ready!At port: ' + port);
});

//--------------------------------------------------------------

MEMO = './memo.json';
let memo;


function loaddata() {
  fs.readFile(MEMO)
    .then(data => memo = JSON.parse(data))
}

function savedata() {
  fs.writeFile(MEMO, memo)
    .then(() => { return })
}


loaddata()
setInterval(savedata, 3600000)


bot.on('join', function (event) {
  memo.bot.grouplist.push(event.source.groupId)
  memo.bot.grouplist.filter((element, index, arr) => {
    return arr.indexOf(element) === index;
  });
});


bot.on('follow', async function (event) {
  let msg = null
  let profile = await event.source.profile();
  if (msg) {
    event.reply(msg + 'Hello ' + profile.displayName)
  }
  memo.bot.userid.push(event.source.userId)
  memo.bot.userid.filter((element, index, arr) => {
    return arr.indexOf(element) === index;
  });
});


bot.on('message', function (event) {
  memo.bot.userid.push(event.source.userId)
  memo.bot.userid.filter((element, index, arr) => {
    return arr.indexOf(element) === index;
  });
});