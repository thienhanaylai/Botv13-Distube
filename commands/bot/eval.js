const { MessageEmbed } = require('discord.js');
const util = require("util")
module.exports = {
    name: "tinh",
    aliases: ['t'],
    category: "bot",
    run: async(client, message, args) => {
        const adm = message.member.roles.cache.has('889522119153684510')
        if (!adm) return message.reply('Bạn không có quyền sử dụng lệnh này!')
        var code = args.join(" ");
        try {
            var start = new Date().getTime();
            const ev = eval(code);
            var end = new Date().getTime();
            const time = (start - end) / 1000;
            let str = util.inspect(ev, {
                depth: 1,
            });

            if (str.length > 1914) {
                str = str.substr(0, 1914);
                str = str + "...";
            }
            if (code.length > 1914) {
                code = code.substr(0, 1914);
                code = "Bruh, your code is very long.";
            }
            const embed = new MessageEmbed()
                .setColor('AQUA')
                .setTitle('Command runing...')
                .addField("Code:", `\`\`\`js\n${code}\n\`\`\``)
                .addField(`Result:`, `\`\`\`js\n${clean(str)}\n\`\`\``)
                .addField("Time:", `\`\`\`\n${time} ms\n\`\`\``)
            message.reply({
                embeds: [embed],
                allowedMentions: {
                    repliedUser: false
                },

            })
        } catch (error) {
            const embed = new MessageEmbed()
                .setColor('AQUA')
                .setTitle('Error!')
                .addField("Code:", `\`\`\`js\n${code}\n\`\`\``)
                .addField(`Error:`, `\`\`\`js\n${error}\n\`\`\``)
            message.reply({
                embeds: [embed],
                allowedMentions: { repliedUser: false }
            })
        }

        function clean(text) {
            if (typeof(text) === 'string')
                return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
            else
                return text;
        }

    }
}