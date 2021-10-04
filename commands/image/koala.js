const axios = require('axios')
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "koala",
    aliases: ['koala'],
    category: "image",
    run: async(client, message, args) => {
        axios.get("https://some-random-api.ml/img/koala")
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