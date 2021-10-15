const { MessageEmbed } = require('discord.js');
const HuyAPI = require("huyapi")
const image = new HuyAPI
module.exports = {
    name: "boy",
    aliases: ['b'],
    category: "image",
    run: async(client, message, args) => {

        try {

            const cat = await image.get.boy()
            const embed = new MessageEmbed()
                .setColor('AQUA')
                .setImage(cat.url)
                .setFooter(`Author : ${cat.author}`)
                .setTimestamp()
            message.channel.send({ embeds: [embed] })
        } catch (e) { console.error(e) }
    }

}