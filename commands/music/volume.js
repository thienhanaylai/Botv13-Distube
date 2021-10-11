const { checkroom } = require('../../check')
module.exports = {
    name: 'volume',
    aliases: ['vl'],
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
        let volume;
        let number = parseInt(args[0]);
        if (0 < number && number < 100) {
            volume = parseInt(number)
        } else if (number <= 0) {
            volume = 0;
            message.channel.send('Rồi nhỏ dị ai nghe :)')
        } else if (number >= 100) {
            volume = 100;
            message.channel.send('Bị điếc hay gì mở to vậy ?')
        }
        if (isNaN(volume)) return message.channel.send(`Vui lòng nhập 1 số 0-100 để chỉnh âm lượng!`)
        client.distube.setVolume(message, volume)
        message.channel.send(`Volume set to \`${volume}\``)
    }
}