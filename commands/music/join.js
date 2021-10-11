const { joinVoiceChannel } = require('@discordjs/voice');
module.exports = {
    name: 'join',
    aliases: ['j'],
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

        if (!message.member.voice.channel) return message.channel.send(`Chui dô cái kênh thoại nào đi chời !`);
        if (message.guild.me.voice.channel) return message.channel.send('Bot đã ở trong phòng thoại !')

        try {
            const connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            })

            const voiceChannel = message.member.voice.channel;

            message.channel.send(`**Join to** \'${voiceChannel.name}\` !`);
        } catch (e) {
            console.log(e)
        }
    }
}