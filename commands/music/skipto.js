const { checkroom } = require('../../check')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'skiptop',
    aliases: ['fsto'],
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

        if (checkroom(message)) return;
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`Không có bản nhạc nào đang phát !`)
        if (isNaN(args[0])) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Vui lòng nhập số thứ tự của bài hát!`);
            return message.channel.send({ embeds: [thing] });
        }
        if (queue.songs.length === 1) return message.channel.send('Không còn bài hát nào trong hàng đợi !')
        if (args[0] > queue.songs.length) return message.channel.send('Vui lòng chọn số thứ tự có sẵn trong danh sách đợi !')
        message.client.distube.jump(message, parseInt(args[0]))
            .then(queue => {
                let thing = new MessageEmbed()
                    .setColor('AQUA')
                    .setDescription(`**Skip** ${args[0]} songs.`)
                    .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send({ embeds: [thing] });
            })

    }
}