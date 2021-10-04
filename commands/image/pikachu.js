const axios = require('axios')
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "pikachu",
    aliases: ['pikachu'],
    category: "image",
    setTimeout: 7000,
    run: async(client, message, args) => {
        console.log(message.content)
        axios.get("https://some-random-api.ml/img/pikachu")
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