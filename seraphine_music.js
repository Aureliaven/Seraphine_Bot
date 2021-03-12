const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "sera";
const token = '';
const ytdl = require("ytdl-core-discord");
const yts = require("yt-search");

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

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix} play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix} skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix} stop`)) {
    stop(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix} avatar`)) {
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
      "> **play [YouTube link or query]** - *I'll add the song to the queue*\n" +
      "> **skip** - *I'll skip the current song*\n" +
      "> **stop** - *I'll stop playing music*\n" +
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

const queue = new Map();

client.once("ready", () => {
  console.log("Ready!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnected!");
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "Hold on, you need to be in a voice channel to play music."
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  let song;
  if (args.length < 3) {
    return message.channel.send("Wait, what am I playing?");
  }
  if (ytdl.validateURL(args[2])) {
    const songInfo = await ytdl.getInfo(args[2]);
    song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url
    };
  } else {
    const {
      videos
    } = await yts(args.slice(2).join(" "));
    if (!videos.length)
      return message.channel.send("I couldn't find a song in your request.");
    song = {
      title: videos[0].title,
      url: videos[0].url
    };
  }

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
      console.log("Joined \"" + voiceChannel.name + "\" in \"" +
        voiceChannel.guild.name + "\"");
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`Sure, **${song.title}** has been added to the queue.`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Hold on, you gotta be in the voice channel to skip."
    );
  if (!serverQueue)
    return message.channel.send("Wait, there's nothing to skip!");
  serverQueue.connection.dispatcher.destroy();
  message.channel.send("Okay, skipped.");
  serverQueue.songs.shift();
  play(message.guild, serverQueue.songs[0]);
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Hold on, you gotta be in the voice channel to stop the music."
    );
  if (!serverQueue)
    return message.channel.send(
      "Um, there's nothing to stop."
    );
  serverQueue.songs = [];
  console.log("Left \"" + serverQueue.voiceChannel.name + "\" in \"" +
    serverQueue.voiceChannel.guild.name + "\"");
  serverQueue.connection.dispatcher.destroy();
  serverQueue.voiceChannel.leave();
  message.channel.send('Aw okay. Stopping the music.');
}

async function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    console.log("Left \"" + serverQueue.voiceChannel.name + "\" in \"" +
      serverQueue.voiceChannel.guild.name + "\"");
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(await ytdl(song.url), {
      type: "opus",
      quality: "highestaudio",
      highWaterMark: 1 << 20
    })
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolume(0.3);
  serverQueue.textChannel.send(`Alright, now playing: **${song.title}**`);
}

client.login(token);
