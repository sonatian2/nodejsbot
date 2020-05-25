const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;

client.on('ready', () => {
  console.log('켰다.');
});

client.on('message', (message) => {
  if(message.content === '코로나봇아') {
    message.reply('무엇을 도와드릴까요?');
      if(message.content === '멘션') {
        message.reply('앙 맨션띠');
    
}
}
});
client.login(token);