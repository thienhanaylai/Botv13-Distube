const { MessageEmbed } = require('discord.js');
const { checkroom } = require('../../check')
module.exports = {
        name: 'queue',
        aliases: ['q'],
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
                const queue = client.distube.getQueue(message)
                if (!queue) return message.channel.send(`Không có bản nhạc nào đang phát !`)
                const q = queue.songs.map((song, i) => `${i === 0 ? "**Playing**:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).slice(0, 10).join("\n")
                const embed = new MessageEmbed()
                .setColor('AQUA')
                .setTitle('━━━━━━━━━━━Playlist━━━━━━━━━━━')
                .setDescription(`${q}`)
        message.channel.send({embeds: [embed]})
    }
}