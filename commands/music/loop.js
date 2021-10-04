const { checkroom, checkqueue } = require('../../check')

module.exports = {
    name: 'loop',
    aliases: ['lp'],
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
            // if (!args[0]) return message.channel.send(`Vui lòng chọn 1 trong chế độ sau:\n**off**: Tắt chế độ lặp lại.\n**song**: Chế độ lặp lại 1 bài hát.\n**queue**: Chế độ lặp lại cả danh sách.`)
        let mode;
        if (!args[0]) {
            mode = client.distube.setRepeatMode(message, 1)
            message.channel.send(`**Loop song** | 🔂`)
        } else {
            switch (args[0]) {
                case "off":
                    mode = 0
                    break
                case "song":
                    mode = 1
                    break
                case "queue":
                    mode = 2
                    break
            }
            mode = client.distube.setRepeatMode(message, mode)
            mode = mode ? mode === 2 ? "Repeat queue" : "Repeat song" : "Off"
            message.channel.send(`**Loop** : \`${mode}\``)
        }
    }
}