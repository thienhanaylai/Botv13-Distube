const { joinVoiceChannel } = require('@discordjs/voice');
const { checkroom } = require('../../check');
module.exports = {
    name: 'leave',
    aliases: ['dis'],
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
        if (!message.member.voice.channel) return message.channel.send(`Chui dô cái kênh thoại nào đi chời !`);
        if (!message.guild.me.voice.channel) return message.channel.send('Bot hiện không có trong phòng thoại nào!')
        const queue = client.distube.getQueue(message);


        try {
            client.distube.voices.leave(message)
            await message.channel.send('**Leaved !**');
        } catch (e) {
            console.log(e)
        }
    }
}