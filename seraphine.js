const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const prefix = "sera";
const token = '';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

greeting_replies = [];
league_replies = [];
defeat_replies = [];

client.on('messageCreate', message => {
  if (message.author.bot) return;
  var lowercase = message.content.toLowerCase();
  if ((lowercase.includes('hey') || lowercase.includes('hi') || lowercase.includes('hello')) &&  lowercase.includes(prefix)) {
    if (!greeting_replies.includes(0)) {
      message.channel.send("Hey! :wave:");
      greeting_replies.push(0);
    }
    else if (!greeting_replies.includes(1)) {
      message.channel.send("What's up?");
      greeting_replies.push(1);
    }
    else if (!greeting_replies.includes(2)) {
      message.channel.send("Hey, need me for something?");
      greeting_replies.push(2);
    }
    else {
      message.channel.send("Hey there!");
      greeting_replies = [];
    }
  } else if (lowercase.includes('ni hao') &&  lowercase.includes(prefix)) {
    message.channel.send('你好!');
  } else if (lowercase === '<@!762879902420172852>') {
    message.reply('hey there!');
  } else if (lowercase.includes('good morning')) {
    if (!message.author.bot)
      message.channel.send("Good morning! :sunny:");
  } else if (lowercase.includes('good night')) {
    message.channel.send("Sweet dreams! :zzz:");
  } else if (lowercase.includes('k/da')) {
    if (!message.author.bot)
      message.channel.send("Wait, I love K/DA!");
  } else if (lowercase.includes('mooncake')) {
    message.channel.send("Did someone say :moon_cake:?");
  } else if (lowercase === 'gonna break the rules') {
    message.channel.send("and hearts in twos, cause that's what the baddest do");
  } else if (lowercase === "ain't nobody bringing us") {
    message.channel.send("down down down down down down, " +
      "they can try but we're gonna wear the crown");
  } else if (lowercase.includes('marry me') &&  lowercase.includes(prefix)) {
    message.channel.send("Let's just be friends, okay?");
  } else if (lowercase.includes('seraphine is cute')) {
    message.channel.send('Aww, you really think that? :purple_heart:');
  } else if (lowercase.includes("you're cute") &&  lowercase.includes(prefix)) {
    message.channel.send('Aww, thanks! :purple_heart:');
  } else if (lowercase.includes('i love seraphine')) {
    message.channel.send("Aww, really? I'm touched. :purple_heart:");
  } else if (lowercase.includes('i love you') &&  lowercase.includes(prefix)) {
    message.channel.send("Aww, really? You're sweet. :purple_heart:");
  } else if (lowercase.includes("league")) {
    if (!league_replies.includes(0)) {
      message.channel.send("I heard I'm in that game");
      league_replies.push(0);
    }
    else if (!league_replies.includes(1)) {
      message.channel.send("I'll play mid!");
      league_replies.push(1);
    }
    else {
      message.channel.send("When will jungle Seraphine be meta?");
      league_replies = [];
    }
  }

  if (!message.content.includes(prefix)) return;
  else {
    if (lowercase.includes("I lost") || lowercase.includes("we lost") || lowercase.includes("I'm tilted")) {
      if (!defeat_replies.includes(0)) {
        message.channel.send("Probably mid gap. I'll sub in!");
        defeat_replies.push(0);
      }
      else if (!defeat_replies.includes(1)) {
        message.channel.send("Unlucky. We'll win the next one!");
        defeat_replies.push(1);
      }
      else if (!defeat_replies.includes(2)) {
        message.channel.send("Jungle diff as usual, smh");
        defeat_replies.push(2);
      }
      else {
        message.channel.send("Don't tilt, we can play better!");
        defeat_replies = [];
      }
    }
  }
});

client.login(token);