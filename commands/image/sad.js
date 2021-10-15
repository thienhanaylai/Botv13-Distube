const { MessageEmbed } = require('discord.js');
const HuyAPI = require("huyapi")
const image = new HuyAPI
module.exports = {
    name: "sad",
    aliases: ['sd'],
    category: "image",
    run: async(client, message, args) => {

        try {

            const cat = await image.get.sad()
            const embed = new MessageEmbed()
                .setColor('AQUA')
                .setImage(cat.url)
                .setFooter(`Author : ${cat.author}`)
                .setTimestamp()
            message.channel.send({ embeds: [embed] })
        } catch (e) { console.error(e) }
    }

}