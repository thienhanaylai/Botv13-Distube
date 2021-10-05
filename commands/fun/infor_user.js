const { MessageEmbed } = require('discord.js');
const moment = require('moment');


module.exports = {
    name: "info",
    aliases: ['if'],
    category: "fun",
    run: async(client, message, args) => {
        try {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
            const embed = new MessageEmbed()
                .setColor('AQUA')
                .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
                .setThumbnail(member.user.displayAvatarURL())
                .addFields({
                    name: `User Name`,
                    value: `${member.user.username}`
                })
                .addFields({
                    name: `User ID`,
                    value: `${member.id}`
                })
                .addFields({
                    name: 'Thời gian vào nhóm',
                    value: moment(member.joinedAt).format('L, LT')
                })
                .addFields({
                    name: 'Thời gian tạo tài khoản',
                    value: moment(member.user.createdTimestamp).format('L, LT')
                })


            message.channel.send({ embeds: [embed] });
        } catch (e) { console.error(e) }
    }
}