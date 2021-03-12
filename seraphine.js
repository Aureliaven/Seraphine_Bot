const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "sera";
const token = '';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  var lowercase = message.content.toLowerCase();
  if (lowercase === 'hey seraphine') {
    message.channel.send("Hey!");
  } else if (lowercase === 'hi seraphine') {
    message.channel.send("Hi! :wave:");
  } else if (lowercase === 'hello seraphine') {
    message.channel.send("Hello!");
  } else if (lowercase === 'seraphine ni hao') {
    message.channel.send('你好!');
  } else if (lowercase === 'ni hao seraphine') {
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
  } else if (lowercase.includes('marry me seraphine')) {
    message.channel.send("Let's just be friends, okay?");
  } else if (lowercase.includes('seraphine is cute')) {
    message.channel.send('Aww, you really think that? :purple_heart:');
  } else if (lowercase.includes("seraphine you're cute")) {
    message.channel.send('Aww, thanks! :purple_heart:');
  } else if (lowercase.includes('i love seraphine')) {
    message.channel.send("Aww, really? I'm touched. :purple_heart:");
  } else if (lowercase.includes('i love you seraphine')) {
    message.channel.send("Aww, really? You're sweet. :purple_heart:");
  } else if (lowercase.includes('seraphine i love you')) {
    message.channel.send("Aww, really? You're sweet. :purple_heart:");
  } else if (lowercase.includes('porn')) {
    message.reply('you like that kind of stuff?');
  } else if (lowercase.includes('hentai')) {
    message.reply('you like that kind of stuff?');
  }

  if (message.author.bot) return;
  if (!message.content.includes(prefix)) return;

  if (message.content.startsWith(`${prefix} avatar`)) {
    message.channel.send('https://imgur.com/oLhQlOD');
    return;
  } else if (message.content.startsWith(`${prefix} photoalbum`)) {
    message.channel.send('https://imgur.com/a/a8LMjfk');
    return;
  } else if (message.content.startsWith(`${prefix} server`)) {
    message.channel.send('https://discord.gg/vAYPf2S');
    return;
  } else if (message.content.startsWith(`${prefix} twitter`)) {
    message.channel.send('https://twitter.com/seradotwav');
    return;
  } else if (message.content.startsWith(`${prefix} instagram`)) {
    message.channel.send('https://www.instagram.com/seradotwav');
    return;
  } else if (message.content.startsWith(`${prefix} spotify`)) {
    message.channel.send('https://open.spotify.com/artist/4TqlcgMFDryY96KWcvrhTv');
    return;
  } else if (message.content.startsWith(`${prefix} help`)) {
    message.channel.send(`Here's how I can help! Say \"${prefix}\" followed by:\n` +
      "> **avatar** - *My avatar*\n" +
      "> **photoalbum** - *My photo album*\n" +
      "> **server** - *My server's invite link*\n" +
      "> **twitter** - *My Twitter!*\n" +
      "> **instagram** - *My Instagram!*\n" +
      "> **spotify** - *My Spotify!*");
    return;
  } else if (message.content.startsWith(`${prefix} say`)) {
    message.delete();
    message.channel.send(message.content.substring(prefix.length + 4));
    return;
  } else if (message.content.startsWith(`<@!762879902420172852>`) &&
    (message.content.includes('hi') ||
      message.content.includes('hey') ||
      message.content.includes('hello'))) {
    message.reply(":wave:");
    return;
  } else if (message.content.startsWith(`${prefix} `)){
    message.channel.send("I'm not sure I understand that.");
  }
});

client.login(token);
