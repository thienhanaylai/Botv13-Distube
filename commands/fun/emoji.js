const { Util, MessageEmbed, Emoji } = require('discord.js');
const { parse } = require('twemoji-parser');
const SchemaChannel = require('../../Schemas/SchemaChannel');
module.exports = {
    name: 'emoji',
    category: 'fun',
    aliases: ["emo"],
    usage: "~emo [emoji cần phóng to]",
    description: "Phóng to emoji",
    run: (client, message, args) => {

        const emoji = args[0];
        if (!emoji) return message.channel.send("nhap ~emo [emoji]");

        let custom = Util.parseEmoji(emoji);
        const embed = new MessageEmbed()

        .setColor("AQUA");

        if (custom.id) {
            let link = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`
            embed.setImage(link)
                .setFooter(`Emoji ID: ${custom.id}`)
            return message.channel.send({ embeds: [embed] });
        } else {
            let parsed = parse(emoji, { assetType: 'png' });
            if (!parsed[0]) return message.channel.send('khoong co emoji');
            embed.setImage(parsed[0].url);

            essage.channel.send({ embeds: [embed] });
        }
    }
}