const { MessageEmbed } = require('discord.js');
const translate = require('@vitalets/google-translate-api');
const SchemaLang = require('../../Schemas/SchemaLang')
const util = require('util')
module.exports = {
    name: 'dich',
    aliases: ['d'],
    category: 'fun',
    run: async(client, message, args) => {

        let lang;
        let data2 = await SchemaLang.findOne({ _id: message.guild.id })
        if (data2 === null) {
            lang = 'vi';
        } else {
            lang = data2.newLang;
        }

        try {
            const str = args.join(' ')
            if (!str) return message.channel.send(`Nhập văn bản cần dịch !`)
            const res = await translate(str, { to: `${lang}` })

            const embed = new MessageEmbed()
                .setColor('AQUA')
                .setTitle('Translate !')
                .setDescription(`${res.text}`)
            message.channel.send({ embeds: [embed] })
        } catch (e) {
            message.channel.send('Error try late !')
        }

    }
}