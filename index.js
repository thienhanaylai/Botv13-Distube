const { Client, Intents, MessageEmbed } = require('discord.js');
const discord = require('discord.js');
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { DisTube } = require('distube')
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES
    ]
});

const config = require("./config");

const distube = new DisTube(client, {
    searchSongs: 1,
    leaveOnEmpty: true,
    emptyCooldown: 30,
    leaveOnFinish: true,
    youtubeCookie: config.cookie,
    emitNewSongOnly: true,
    emitAddListWhenCreatingQueue: true,
    emitAddSongWhenCreatingQueue: false,
    ytdlOptions: {
        highWaterMark: 1 << 24,
        quality: 'highestaudio'
    },
    customFilters: {
        "bass": "bass=g=20,dynaudnorm=f=220",
        '3D': "apulsator=hz=0.03",
        "x1.5": "atempo=1.5",
        "x1": "atempo=1",
    },
    plugins: [new SoundCloudPlugin()]

});



const { readdirSync } = require('fs');
const fs = require('fs');



client.on("ready", () => {
    console.log(`${client.user.username} online`);
    client.user.setPresence({
        activities: [{
            name: '| ~play to play music !',
            type: "LISTENING",

        }],
        status: 'online'
    });
})



client.config = require('./config.js');
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.events = new discord.Collection();
client.categories = readdirSync("./commands/");

client.distube = distube;
const { DistubeEvents } = require('./events/music');
DistubeEvents(client.distube);

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir("./events/", (err, files) => {

    if (err) return console.log("Can't find any file!")
    const jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach(file => {
        var fileGet = require(`./events/${file}`)
        try {
            client.events.set(fileGet.name, fileGet)
        } catch (e) {
            console.log(e)
        }
    })
})


const mongoose = require('mongoose');
const SchemaPrefix = require('./Schemas/SchemaPrefix')

mongoose.connect('mongodb+srv://thienhanaylai:BAO123az@cluster0.ssew6.mongodb.net/Data2', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('> Connected...'))
    .catch(err => console.log(`> Error while connecting to mongoDB : ${err.message}`))

client.on("messageCreate", async(message) => {

    let prefix;
    let data1 = await SchemaPrefix.findOne({ _id: message.guild.id })
    if (data1 === null) {
        prefix = config.prefix;
    } else {
        prefix = data1.newPrefix;
    }

    if (message.content === `<@!${client.user.id}>`) {
        const embed = new MessageEmbed()
            .setColor('ORANGE')
            .setTitle(`My prefix is ${prefix}\nUse ${prefix}help to see more!`)
        message.reply({ embeds: [embed] })
    };

    if (message.author.dmChannel) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;


    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (!command) return;
    if (command) {
        command.run(client, message, args);

    }
})

client.login('ODg1ODk0NzU3MjA3OTEyNTY4.YTtryQ.iScGeSlK6tRzMm5mG_s4NLJXSmI');