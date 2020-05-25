const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "게스트"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '코로나봇아') {
    return message.reply('무엇을 도와드릴까요?');
  }

  if(message.content == 'c정보') {
    let img = 'https://cafe.naver.com/common/storyphoto/viewer.html?src=https%3A%2F%2Fcafefiles.pstatic.net%2FMjAyMDA1MjVfMTcy%2FMDAxNTkwMzkwNDUxMDM4.DcHwRmi0mltWm1Rv7zqFcRYzuSUwz06EkGMluwNq-FUg.ZGaza82BNhBSwsdwbwTRZs61Ow7PraQs3CoQqkgMFfwg.JPEG%2Fbot_pf.jpg';
    let embed = new Discord.RichEmbed()
      .setTitle('Corona Bot')
      .setURL('http://www.naver.com')
      .setAuthor('Corona Bot', img, 'http://www.naver.com')
      .setThumbnail(img)
      .addBlankField()
      .addField('저으 탄생일(?)은..', '2020년05월25일 이예요!')
      .addField('저의 개발자는...', 'Corona님 이예요!', true)
      .addField('제가 할수있는일은...', 'c?라고 쳐보세요!ㅎㅎ', false)
      .addField('봇에 오류가 있으면...', '저의 주인님인 Corona님을 불러주세요!', false)
      .addField('Corona Bot', '카톡봇은 제가 있는 오픈채팅방에서 사용하실수 있어요!\n여기서의 기능은 카톡봇과는 다릅니다!\n\n© 2020 Corona, All rights reserved\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('Corona', img)

    message.channel.send(embed)
  } else if(message.content == 'c?') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: 'c청소 (할개수(최대99개))', desc: '메세지를 삭제합니다!'},
      {name: '인사', desc: '새로운 회원이 들어오면 자동으로 인사합니다!'},
      {name: '자동역할부여', desc: '자동으로 역할을 부여합니다!'},
      {name: 'c전체공지', desc: 'dm으로 전체 공지 보냅니다!'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Corona Bot', helpImg)
      .setColor('#186de6')
      .setFooter(`Corona Bot`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('c전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('c전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }

if(message.content.startsWith('c청소')) {
  if(checkPermission(message)) return

  var clearLine = message.content.slice('c청소 '.length);
  var isNum = !isNaN(clearLine)

  if(isNum && (clearLine <= 0 || 100 < clearLine)) {
    message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
    return;
  } else if(!isNum) { // c @나긋해 3
    if(message.content.split('<@').length == 2) {
      if(isNaN(message.content.split(' ')[2])) return;

      var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
      var count = parseInt(message.content.split(' ')[2])+1;
      const _limit = 10;
      let _cnt = 0;

      message.channel.fetchMessages({limit: _limit}).then(collected => {
        collected.every(msg => {
          if(msg.author.id == user) {
            msg.delete();
            ++_cnt;
          }
          return !(_cnt == count);
        });
      });
    }
  } else {
    message.channel.bulkDelete(parseInt(clearLine)+1)
      .then(() => {
        AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
      })
      .catch(console.error)
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


client.login(token);