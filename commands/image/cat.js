const axios = require('axios')
const { MessageEmbed } = require('discord.js');
const HuyAPI = require("huyapi")
const image = new HuyAPI
module.exports = {
    name: "cat",
    aliases: ['cat'],
    category: "image",
    run: async(client, message, args) => {
        const res = Math.floor(Math.random() * 2)
        if (res === 0) {
            axios.get("https://some-random-api.ml/img/cat")
                .then(function(res) {
                    const url = res.data.link;
                    const embed = new MessageEmbed()
                        .setColor('AQUA')
                        .setImage(url)
                        .setTimestamp()
                    message.channel.send({ embeds: [embed] })
                })
                .catch((e) => {
                    console.error(e)
                })
        }
        if (res === 1) {
            try {
                const cat = await image.get.cat()
                const embed = new MessageEmbed()
                    .setColor('AQUA')
                    .setImage(cat.url)
                    .setFooter(`Author : ${cat.author}`)
                    .setTimestamp()
                message.channel.send({ embeds: [embed] })
            } catch (e) { console.error(e) }
        }

    }
}