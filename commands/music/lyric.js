const { MessageEmbed } = require('discord.js');
const { getSong } = require('genius-lyrics-api');

module.exports = {
    name: 'lyric',
    aliases: ['l'],
    category: 'music',
    run: async(client, message, args) => {
        const SchemaChannel = require('../../Schemas/SchemaChannel');
        let channelID;
        let data = await SchemaChannel.findOne({ _id: message.guild.id })
        if (data === null) {
            channelID = message.channel.id;
        } else {
            channelID = data.IDChannel;
        }
        const channel1 = client.channels.cache.find(channel => channel.id === `${channelID}`);
        if (message.channel.id !== channel1.id) return message.channel.send(`Bạn không thể sử dụng lệnh ở kênh này\nVui lòng chuyển đến kênh <#${channel1.id}>`);


        try {
            if (args.join(' ')) {
                const title = args.join(' ');
                const options = {
                    apiKey: 'fxRWwdEIxgyNPOOldRyqbzdKVTq5bEJOCb5hu23GaLKYvaOxN0rDuQFE3swNG6pP',
                    title: title,
                    artist: '',
                    optimizeQuery: true
                };
                getSong(options).then(function(song) {
                    let thumbnail;

                    if (song.albumArt === null) {
                        thumbnail = 'https://i0.wp.com/s1.uphinh.org/2021/09/25/Untitled2e84e3ca63fb3550.th.png';
                    } else {
                        thumbnail = song.albumArt;
                    }

                    const embed = new MessageEmbed()
                        .setColor('BLACK')
                        .setTitle(` ${args.join(' ')}`)
                        .setThumbnail(thumbnail)
                        .setDescription(`${song.lyrics}`)
                        .setTimestamp()
                        .setFooter(`Yêu cầu bởi ${message.author.username}`, message.author.displayAvatarURL())
                    message.channel.send({ embeds: [embed] })
                })
            }

            if (!args.join(' ')) {
                const queue = client.distube.getQueue(message)
                if (!queue) return message.reply(`Không có bài nhạc nào đang phát vui lòng nhập tên bài hát !`)
                const track = queue.songs[0];
                const name = track.name;
                const options = {
                    apiKey: 'fxRWwdEIxgyNPOOldRyqbzdKVTq5bEJOCb5hu23GaLKYvaOxN0rDuQFE3swNG6pP',
                    title: name,
                    artist: '',
                    optimizeQuery: true
                };
                getSong(options).then(function(song) {
                    let thumbnail;

                    if (song.albumArt === null) {
                        thumbnail = 'https://i0.wp.com/s1.uphinh.org/2021/09/25/Untitled2e84e3ca63fb3550.th.png';
                    } else {
                        thumbnail = song.albumArt;
                    }
                    const embed = new MessageEmbed()
                        .setColor('BLACK')
                        .setTitle(`${name}`)
                        .setThumbnail(thumbnail)
                        .setDescription(`${song.lyrics}`)
                        .setTimestamp()
                        .setFooter(`Yêu cầu bởi ${message.author.username}`, message.author.displayAvatarURL())
                    message.channel.send({ embeds: [embed] })
                })
            }

        } catch (error) {
            console.error(error)
            message.channel.send(`Not Found !`)
            channel1 = client.channels.cache.find(channel => channel.id === '895523356986707979')
            const embed = new MessageEmbed()
                .setColor('RED')
                .setTitle('Error!')
                .addField(`Error:`, `\`\`\`js\n${error}\n\`\`\``)
            channel1.send({
                embeds: [embed],
                allowedMentions: { repliedUser: false }
            })
        }
    }
}