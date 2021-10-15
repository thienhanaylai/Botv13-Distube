const { MessageEmbed } = require('discord.js');
const HuyAPI = require("huyapi")
const image = new HuyAPI
module.exports = {
    name: "girl",
    aliases: ['gr'],
    category: "image",
    run: async(client, message, args) => {

        try {

            const cat = await image.get.girl()
            const embed = new MessageEmbed()
                .setColor('AQUA')
                .setImage(cat.url)
                .setFooter(`Author : ${cat.author}`)
                .setTimestamp()
            message.channel.send({ embeds: [embed] })
        } catch (e) { console.error(e) }
    }

}