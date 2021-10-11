const { MessageEmbed } = require('discord.js');
const SchemaChannel = require('../../Schemas/SchemaChannel');
const moment = require("moment");
require("moment-duration-format");
module.exports = {
    name: 'ping',
    category: 'user',
    aliases: ['ping'],
    usage: "~ping",
    description: "Kiểm tra độ trễ",
    run: async(client, message, args) => {

        let channelID;
        let data = await SchemaChannel.findOne({ _id: message.guild.id })
        if (data === null) {
            channelID = message.channel.id;
        } else {
            channelID = data.IDChannel;
        }
        const channel1 = client.channels.cache.find(channel => channel.id === `${channelID}`);
        if (message.channel.id !== channel1.id) return message.channel.send(`Bạn không thể sử dụng lệnh ở kênh này\nVui lòng chuyển đến kênh <#${channel1.id}>`);
        const duration1 = moment.duration(message.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        const embed = new MessageEmbed()
            .setColor('AQUA')
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setDescription(`🏓~Pong : ${client.ws.ping} ms\n⌚ Up time: ${duration1}`)
            .setTimestamp()
            .setFooter(`Yêu cầu bởi ${message.author.username}`)
        message.channel.send({ embeds: [embed] })











    }
}