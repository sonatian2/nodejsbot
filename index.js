const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "현관";
const byeChannelName = "현관";
const welcomeChannelComment = "환영합니다!\n 기본 역할이 자동 지급되었습니다.\n봇의 명령어가 궁금하시다면  c? 를 입력하셔서 확인하실수 있습니다.";
const byeChannelComment = "안녕히가세요ㅠㅠ";

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: 'Corona Bot이 작동' }, status: 'online' })
});



client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "요원"));
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
    let img = 'https://discordapp.com/channels/713666957467189349/714828023093788752/715066715771502603';
    let embed = new Discord.RichEmbed()
      .setTitle('Corona Bot')
      .setURL('http://www.cafe.naver.com')
      .setAuthor('Corona Bot', img, 'http://www.cafe.naver.com')
      .setThumbnail(img)
      .addBlankField()
      .addField('저의 탄생일(?)은..', '2020년05월25일 이예요!')
      .addField('저의 개발자는...', 'Corona님 이예요!', true)
      .addField('제가 할수있는일은...', 'c?라고 쳐보세요!ㅎㅎ', false)
      .addField('봇에 오류가 있으면...', '저의 주인님인 Corona님을 불러주세요!', false)
      .addField('Corona Bot', '카톡봇은 제가 있는 오픈채팅방에서 사용하실수 있어요!\n여기서의 기능은 카톡봇과는 다릅니다!\n\n© 2020 Corona, All rights reserved\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('Corona', img)

    message.channel.send(embed)
  } else if(message.content == 'c?') {
    
 
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.webp?size=256';
    let commandList = [{name: 'Corona Bot 도움말 NO.2',desc:' '},
      {name: '안녕', desc: '제가 인사해 드립니다!'}, 
      {name: '코로나봇아', desc: '저를 부릅니다!'},
      {name: 'c청소 (할개수(최대99개))', desc: '메세지를 삭제합니다!'},
      {name: '입장 인사', desc: '새로운 회원이 들어오면 자동으로 인사합니다!'},
      {name: '퇴장 인사', desc: '회원이 나가면 잘가라는(?)인사를 합니다!'},
      {name: '자동역할부여', desc: '서버에 참여시 자동으로 기본 역할을 부여합니다!'},
      {name: 'c전체공지', desc: 'dm으로 전체 공지 보냅니다!'},
      {name: 'c초대코드', desc: '해당서버의 초대코드를 생성합니다.'},
      {name: 'c미국 @(추방할사람)', desc: '해당 회원을 미국(?)으로 보내버립니다!'},
      {name: 'c! (할말)', desc: 'Corona Ai 대답합니다! (BETA)'},
      {name: 'c정보', desc: 'Corona Bot에대한 정보를 출력합니다!'},
      {name: 'c반응', desc: '당신의 말에 반응합니다. (BETA)'},
      {name: ' ',desc: '\n© 2020 Corona, All rights reserved'},
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
    
  
} else if(message.content == 'c??') {
  let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
  let commandList = [{name: '아래기능은 관리자 기능입니다.',desc:' '},
    {name: 'c청소 (할개수(최대99개))', desc: '메세지를 삭제합니다!'},
    {name: 'c전체공지', desc: 'dm으로 전체 공지 보냅니다!'},
    {name: 'c미국 @(추방할사람)', desc: '해당 회원을 미국(?)으로 보내버립니다!'},
    {name: ' ',desc: '\n© 2020 Corona, All rights reserved'},
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
    

 
  }else if(message.content == 'c초대코드') {
    message.guild.channels.get(message.channel.id).createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
      .then(invite => {
        message.channel.send(invite.url)
      });
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

function getEmbedFields(message, modify=false) {
  if(message.content == '' && message.embeds.length > 0) {
    let e = message.embeds[0].fields;
    let a = [];

    for(let i=0;i<e.length;i++) {
        a.push(`\`${e[i].name}\` - \`${e[i].value}\`\n`);
    }

    return a.join('');
  } else if(modify) {
    return message.author.lastMessage.content;
  } else {
    return message.content;
  }
}

function MessageSave(message, modify=false) {
  imgs = []
  if (message.attachments.array().length > 0) {
    message.attachments.array().forEach(x => {
      imgs.push(x.url+'\n')
    });
  }

  username = message.author.username.match(/[\u3131-\uD79D^a-zA-Z^0-9]/ugi)
  channelName = message.channel.type != 'dm' ? message.channel.name : ''
  try {
    username = username.length > 1 ? username.join('') : username
  } catch (error) {}

  try {
    channelName = channelName.length > 1 ? channelName.join('') : channelName
  } catch (error) {}

  var s = {
    ChannelType: message.channel.type,
    ChannelId: message.channel.type != 'dm' ? message.channel.id : '',
    ChannelName: channelName,
    GuildId: message.channel.type != 'dm' ? message.channel.guild.id : '',
    GuildName: message.channel.type != 'dm' ? message.channel.guild.name : '',
    Message: getEmbedFields(message, modify),
    AuthorId: message.author.id,
    AuthorUsername: username + '#' + message.author.discriminator,
    AuthorBot: Number(message.author.bot),
    Embed: Number(message.embeds.length > 0), // 0이면 false 인거다.
    CreateTime: momenttz().tz('Asia/Seoul').locale('ko').format('ll dddd LTS')
  }

  s.Message = (modify ? '[수정됨] ' : '') + imgs.join('') + s.Message

  MessageAdd(
    s.ChannelType,
    s.ChannelId,
    s.ChannelName,
    s.GuildId,
    s.GuildName,
    s.Message,
    s.AuthorId,
    s.AuthorUsername,
    s.AuthorBot,
    s.Embed,
    s.CreateTime,
  )
    // .then((res) => {
    //   console.log('db 저장을 했다.', res);
    // })
    .catch(error => console.log(error))
}


client.login(token);
