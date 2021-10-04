const axios = require('axios')
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "whale",
    aliases: ['whale'],
    category: "image",
    run: async(client, message, args) => {
        axios.get("https://some-random-api.ml/img/whale")
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
}