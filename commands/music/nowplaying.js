const { MessageEmbed } = require('discord.js');
const { checkroom } = require('../../check')
const { convertTime } = require('../../util/convert')
const { progressbar } = require('../../util/progressbar')
module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
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

        const queue = message.client.distube.getQueue(message);
        const status = queue => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Filter: \`${queue.filters.join(', ')
		|| 'Off'}\``;
        if (!queue) return message.channel.send(`Không có bản nhạc nào đang phát !`)
        const currentSong = queue.songs[0];


        var total = currentSong.duration * 1000;
        var current = queue.currentTime * 1000;
        var size = 30;
        var line = '─';
        var slider = ':radio_button:';


        let thing = new MessageEmbed()
            .setDescription(` **Now Playing**\n[${currentSong.name}](${currentSong.url}) - \`[${currentSong.formattedDuration}]\``)
            .setThumbnail(currentSong.thumbnail)
            .setColor('AQUA')
            .addField("\u200b", `${progressbar(total, current, size, line, slider)}`)
            .addField("Duration", `\`${convertTime(current)} / ${convertTime(total)}\``, true)
            .addField('Status', `${status(queue)}`, true)
            .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
        message.channel.send({ embeds: [thing] });
    }
}