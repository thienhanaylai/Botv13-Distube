const { MessageEmbed } = require("discord.js")
const riapi = require("random-image-api")
const HuyAPI = require("huyapi")
const image = new HuyAPI
module.exports = {
    name: 'kiss',
    category: 'fun',
    aliases: ["kiss"],
    run: async(client, message, args) => {
        const img = await image.get.kiss()
        const str = args[0].charAt(2)
        if (str === `&`) return message.reply('Hôn quần què gì mà hôn zữ zạy!')

        if (!args[0]) return message.channel.send(`Tag người muốn  hôn vào!`);
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || `<@!${args[0]}>`

        if (`<@${member.id}>` === `<@${message.author.id}>`) return message.reply('Đừng thudam tinh thần nữa bạn !')

        const embed = new MessageEmbed()
            .setColor('LUMINOUS_VIVID_PINK')
            .setDescription(`<@${message.author.id}> đã trao 1 nụ hôn cho <@${member.id}> :kissing_heart: `)
            .setImage(img.url)
        message.channel.send({ embeds: [embed] })
    }
}