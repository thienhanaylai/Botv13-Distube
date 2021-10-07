const { MessageEmbed } = require('discord.js');
const { checkroom } = require('../../check');
const { convertTime } = require('../../util/convert');
const { progressbar } = require('../../util/progressbar');
module.exports = {
    name: 'seekto',
    aliases: ['sk'],
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
        if (message.channel.id !== channel1.id) return message.channel.send(`Bạn không thể sử dụng lệnh ở kênh này\nVui lòng chuyển đến kênh #**${channel1.name}**`);
        if (checkroom(message)) return;
        if (!args[0]) return message.channel.send('Nhập số giây muốn tua !')
        try {
            const queue = client.distube.getQueue(message)
            if (!queue) return message.channel.send(`Không có bản nhạc nào đang phát !`)
            let seektime = queue.currentTime + Number(args[0]);
            if (seektime >= queue.songs[0].duration) return message.channel.send('Không được tua quá thời gian của bài hát');
            await client.distube.seek(message, Number(seektime))

            const currentSong = queue.songs[0];
            var total = currentSong.duration * 1000;
            var current = queue.currentTime * 1000;
            var size = 30;
            var line = '─';
            var slider = ':radio_button:';




            const embed = new MessageEmbed()
                .setTitle(`⏩ | Đã tua : ${args[0]} s`)
                .setDescription(`\n[${currentSong.name}](${currentSong.url}) - \`[${currentSong.formattedDuration}]\``)
                .setThumbnail(currentSong.thumbnail)
                .setColor('AQUA')
                .addField("\u200b", `${progressbar(total, current, size, line, slider)}`)
                .addField("Duration", `\`${convertTime(current)} / ${convertTime(total)}\``, true)
                .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send({ embeds: [embed] })
        } catch (error) {
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