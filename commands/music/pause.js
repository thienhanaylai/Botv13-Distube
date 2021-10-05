const { checkroom } = require('../../check')
module.exports = {
    name: 'pause',
    aliases: ['ps'],
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
        try {
            if (checkroom(message)) return;
            const queue = client.distube.getQueue(message)
            if (!queue) return message.channel.send(`Không có bản nhạc nào đang phát !`)
            if (queue.paused) {
                client.distube.resume(message)
                message.channel.send(`▶ | **Continue!**`)
            }
            client.distube.pause(message)
            message.channel.send("⏸ | **Paused**")
        } catch (e) {
            console.error(e);
        }
    }
}