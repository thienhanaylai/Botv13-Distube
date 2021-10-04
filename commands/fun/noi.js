const googleTTS = require('google-tts-api');
const SchemaLang = require('../../Schemas/SchemaLang')
const { checkroom } = require('../../check')
const { createAudioPlayer, AudioPlayerStatus, joinVoiceChannel, createAudioResource } = require('@discordjs/voice');
module.exports = {
    name: 'noi',
    category: 'fun',
    aliases: ['n'],
    usage: "~n <nội dung cần nói>",
    description: "Text to speech",
    run: async(client, message, args) => {

        const SchemaChannel = require('../../Schemas/SchemaChannel');
        let channelID;
        let data1 = await SchemaChannel.findOne({ _id: message.guild.id })
        if (data1 === null) {
            channelID = message.channel.id;
        } else {
            channelID = data1.IDChannel;
        }
        const channel1 = client.channels.cache.find(channel => channel.id === `${channelID}`);
        if (message.channel.id !== channel1.id) return message.channel.send(`Bạn không thể sử dụng lệnh ở kênh này\nVui lòng chuyển đến kênh #**${channel1.name}**`);

        let lang;
        let data2 = await SchemaLang.findOne({ _id: message.guild.id })
        if (data2 === null) {
            lang = 'vi';
        } else {
            lang = data2.newLang;
        }

        if (checkroom(message)) return;
        const string = args.join(' ');
        if (!string) return message.channel.send('Nhập gì đi má !');
        if (string.length > 200) return message.channel.send('Nhập ít hơn 200 kí tự nhập nhiều nói mỏi mồm lắm chời!');

        const queue = client.distube.getQueue(message)
        if (queue != null) {
            message.channel.send('Đang phát nhạc gòi má !');
        } else {
            const audioURL = await googleTTS.getAudioUrl(string, {
                lang: `${lang}`,
                slow: false,
                host: 'https://translate.google.com',
                timeout: 10000,
            });


            try {
                message.delete();
                const connection = joinVoiceChannel({
                    channelId: message.member.voice.channel.id,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator
                })
                const resource = createAudioResource(audioURL);
                const player = createAudioPlayer();
                player.play(resource);
                connection.subscribe(player);

                player.on(AudioPlayerStatus.Idle, () => {

                    const connection =
                        joinVoiceChannel({
                            channelId: message.member.voice.channel.id,
                            guildId: message.guild.id,
                            adapterCreator: message.guild.voiceAdapterCreator
                        })
                    connection.destroy();
                });


            } catch (e) {
                message.channel.send('Bị lỗi gòi thử sau đi :)');
                console.error(e);
            }

        }

    }
}