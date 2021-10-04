const { MessageEmbed } = require("discord.js");


module.exports = {
    name: "autoplay",
    category: "music",
    aliases: ["ap"],
    description: "AutoPlay Music",
    run: async(client, message, args) => {
        const queue = client.distube.getQueue(message);

        if (!queue.autoplay) {
            message.client.distube.toggleAutoplay(message);

            let thing = new MessageEmbed()
                .setColor('AQUA')
                .setDescription(` Activate **autoplay** mode.`)
                .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send({ embeds: [thing] });
        } else {
            message.client.distube.toggleAutoplay(message);

            let thing = new MessageEmbed()
                .setColor('AQUA')
                .setDescription(` Disable **autoplay** mode.`)
                .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send({ embeds: [thing] });
        }
    }
}