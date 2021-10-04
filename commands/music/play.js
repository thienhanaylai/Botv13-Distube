const { MessageEmbed } = require('discord.js');
const { checkroom } = require('../../check');

module.exports = {
    name: 'play',
    aliases: ['p'],
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

        if (!args[0]) return message.reply(`Nhập tên bài hát !`)
        if (checkroom(message)) return;

        const string = args.join(" ")
        if (!string) return message.channel.send(`Nhập tên bài hát hoặc URL !`)
        try {

            message.client.distube.play(message, string)


        } catch (e) {
            message.channel.send(`Error: \`${e}\``)
        }
    }
}