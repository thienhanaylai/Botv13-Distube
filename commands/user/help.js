const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags');
const { category } = require('../fun/emoji');
const SchemaPrefix = require('../../Schemas/SchemaPrefix');
module.exports = {
    name: 'help',
    category: 'user',
    aliases: ['h'],
    description: 'Xem các lệnh của',
    usage: '~help [tên lệnh]',
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

        if (!args[0]) return getAll(client, message);
        return getCMD(client, message, args[0]);
    },
};


async function getAll(client, message) {
    let prefix;
    let data1 = await SchemaPrefix.findOne({ _id: message.guild.id })
    if (data1 === null) {
        prefix = config.prefix;
    } else {
        prefix = data1.newPrefix;
    }
    const embed = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor(`Lgirl Bot`, client.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(`Sử dụng ${prefix}help [tên lệnh] để xem chi tiết`)
    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${cmd.name}\``)
            .join('-')
    }
    const info = client.categories
        .map(cat => stripIndent `**●${cat[0].toUpperCase() + cat.slice(1)}●**\n> ${commands(cat)} `)
        .reduce((string, category) => string + "\n" + category);

    return message.channel.send({ embeds: [embed.setDescription(info)] });
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()
        .setColor('AQUA')
        .setTimestamp()
        .setFooter(`Yêu cầu bởi ${message.author.username}`)
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    let info = `Không tìm thấy lệnh **${input.toLowerCase()}**`;

    if (!cmd) return message.channel.send(embed.setColor('RED').setDescription(info));

    if (cmd.name) info = `**Tên lệnh**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Cú pháp**:  ~${cmd.aliases.map(a => `\`${a}\``).join('~ ')}`;
    if (cmd.description) info += `\n**Chi tiết lệnh**: ${cmd.description}`;
    if (cmd.usage) info += `\n**Cách sử dụng lệnh**: ${cmd.usage}`;

    return message.channel.send({embeds:[embed.setDescription(info)]});
}