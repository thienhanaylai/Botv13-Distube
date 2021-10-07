const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avt',
    category: 'user',
    aliases: ['a'],
    usage: "~a [@người cần lấy avt]",
    description: "Sử dụng lệnh này để download avt của người khác",
    run: (client, message, args) => {
        try {

            console.log(message.mentions.members.first())
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
            const URL = member.user.avatarURL({ format: 'jpg', dynamic: true, size: 1024 });
            const avatarEmbed = new MessageEmbed()
                .setImage(URL)
                .setURL(URL)
                .setColor('AQUA')
                .setTitle('Nhấn để tải avt FHD không che')
                .setTimestamp()
                .setFooter(`Yêu cầu bởi ${message.author.username}`)
            message.channel.send({ embeds: [avatarEmbed] });
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