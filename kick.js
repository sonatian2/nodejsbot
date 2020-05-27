// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith('c미국')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`성공적으로 미국에 보냈습니다! ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('미국으로 보낼수 없는 회원 입니다.');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("이 세상에 없는사람(?) 입니다.");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("미국으로 보낼 사람을 선택하지 않으셨습니다.");
    }
  }
});
function checkPermission(message) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
      return true;
    } else {
      return false;
    }
    }
    function changeCommandStringLength(str, limitLen = 8) {
        let tmp = str;
        limitLen -= tmp.length;
        
        for(let i=0;i<limitLen;i++) {
            tmp += ' ';
        }
        
        return tmp;
        }
        
        async function AutoMsgDelete(message, str, delay = 3000) {
        let msg = await message.channel.send(str);
        
        setTimeout(() => {
          msg.delete();
        }, delay);
        }
// Log our bot in using the token from httpss://discordapp.com/developers/applications/me
client.login(process.env.token);
