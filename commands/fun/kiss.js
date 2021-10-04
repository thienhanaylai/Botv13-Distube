const { MessageEmbed } = require("discord.js")
const riapi = require("random-image-api")
module.exports = {
    name: 'kiss',
    category: 'fun',
    aliases: ["kiss"],
    run: async(client, message, args) => {
        const url = await riapi.nekos("kiss")
        if (args[0] === `<@&837683924624736277>`) return message.reply('Hôn quần què gì mà hôn zữ zạy!')
        if (!args[0]) return message.channel.send(`Tag người muốn  hôn vào!`);
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || `<@!${args[0]}>`
        console.log(args[0])
        if (`<@${member.id}>` === `<@${message.author.id}>`) return message.reply('Đừng thudam tinh thần nữa bạn !')

        const embed = new MessageEmbed()
            .setColor('LUMINOUS_VIVID_PINK')
            .setDescription(`<@${message.author.id}> đã trao 1 nụ hôn cho <@${member.id}> :kissing_heart: `)
            .setImage(url)
        message.channel.send({ embeds: [embed] })
    }
}