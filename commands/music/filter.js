const { MessageEmbed } = require('discord.js');
const { checkroom } = require('../../check');

module.exports = {
    name: 'filter',
    aliases: ['f'],
    category: 'music',
    usage: "~filter :\n\'bass\',\'x1.5\',\`3d\`, \`bassboost\`, \`echo\`, \`flanger\`, \`gate\`, \`haas\`, \`karaoke\`, \`nightcore\`, \`reverse\`, \`vaporwave\`, \`mcompand\`, \`phaser\`, \`tremolo\`, \`surround\`, \`earwax\`",
    run: async(client, message, args) => {
        const SchemaChannel = require('../../Schemas/SchemaChannel');
        let channelID;
        let data = await SchemaChannel.findOne({ _id: message.guild.id })
        if (data === null) {
            channelID = message.channel.id;
        } else {
            channelID = data.IDChannel;
        }
        const channel1 = client.channels.cache.find(channel => channel.id === `${channelID}`);
        if (message.channel.id !== channel1.id) return message.channel.send(`Bạn không thể sử dụng lệnh ở kênh này\nVui lòng chuyển đến kênh #**${channel1.name}**`);

        if (!args[0]) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Vui lòng nhập 1 hiệu ứng !
        Valid filter:\n\`3d\`, \`bassboost\`, \`echo\`, \`flanger\`, \`gate\`, \`haas\`, \`karaoke\`, \`nightcore\`, \`reverse\`, \`vaporwave\`, \`mcompand\`, \`phaser\`, \`tremolo\`, \`surround\`, \`earwax\``);
            message.channel.send({ embeds: [thing] });
        }
        if (checkroom(message)) return;
        const queue = message.client.distube.getQueue(message);
        let filter = ['bass', 'x1.5', 'x1', '3d', 'bassboost', 'echo', 'flanger', 'gate', 'haas', 'karaoke', 'nightcore', 'reverse', 'vaporwave', 'mcompand', 'phaser', 'tremolo', 'surround', 'earwax'];
        try {
            if (args[0] === "off") {
                client.distube.setFilter(message, false, true);

                let embed = new MessageEmbed()
                    .setColor('AQUA')
                    .setDescription(`Disable filter !`)
                    .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send({ embeds: [embed] });
            } else
            if (!filter.includes(args[0])) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`Không tìm thấy hiệu ứng này !
        Examples: \`${message.client.prefix}filter\`
        Valid filter:\n\`3d\`, \`bassboost\`, \`echo\`, \`flanger\`, \`gate\`, \`haas\`, \`karaoke\`, \`nightcore\`, \`reverse\`, \`vaporwave\`, \`mcompand\`, \`phaser\`, \`tremolo\`, \`surround\`, \`earwax\``);
                message.channel.send({ embeds: [thing] });
            } else if (filter.includes(args[0])) {
                client.distube.setFilter(message, args[0], true);

                let embed = new MessageEmbed()
                    .setColor('AQUA')
                    .setDescription(`Set filter: ${args[0]} !`)
                    .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send({ embeds: [embed] });
            }

        } catch (e) {
            message.channel.send(`Error: \`${e}\``)
        }
    }
}