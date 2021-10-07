const { checkroom } = require('../../check')
module.exports = {
    name: 'resume',
    aliases: ['re'],
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
        try {
            const queue = client.distube.getQueue(message)

            if (!queue) return message.channel.send(`Không có bản nhạc nào đang phát !`)
            if (queue.playing) return message.channel.send(`Đang phát gòi mà kêu tiếp tục gì nữa má!`)
            client.distube.resume(message)

            message.channel.send(`▶ | **Continue!**`)
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