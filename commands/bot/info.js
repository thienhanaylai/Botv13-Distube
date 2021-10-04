const { MessageEmbed, version } = require("discord.js");
const os = require('os')
const si = require('systeminformation');

module.exports = {
    name: "info",
    category: "bot",
    aliases: ["stats"],
    run: async(client, message, args) => {

        const cpu = await si.cpu();
        const name = message.guild.ownerId;
        const embed = new MessageEmbed()
            .setColor('AQUA')
            .setThumbnail(message.guild.iconURL())
            .setFooter(`Bot created by : Pảu#5664`)
            .setDescription(`
**━━━━━━Sever Information━━━━━━**
**Servers name** : ${message.guild.name}
**Owner sever** : <@${name}>
**Member count** : ${message.guild.memberCount} users
**Channel count** : ${message.guild.channels.cache.size} channel
**━━━━━━System Information━━━━━━**
**Discord.js** : \`v${version}\`
**Platfrom** : \`${os.type}\`
**CPU** : \`${os.cpus()[0].model}\`
**Cores** : \`${cpu.cores} core\`
**Speed** : \`${os.cpus()[0].speed} MHz\`
**Total Memory** : \`${(os.totalmem() / 1024 / 1024).toFixed(2)} Mb\`
**Free Memory** : \`${(os.freemem() / 1024 / 1024).toFixed(2)} Mb\`

`)

        message.channel.send({ embeds: [embed] });
    }
}