const mongoose = require('mongoose');
const SchemaLang = require('../../Schemas/SchemaLang');
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'setlang',
    category: 'bot',
    aliases: ['sl'],
    run: async(client, message, args) => {


        const embed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Danh sách ngôn ngữ có thể thay đổi')
            .setDescription('Sử dụng lệnh **~sl + < mã ngôn ngữ >**\nVí dụ: **~sl vi** sẽ chuyển sang chị google tiếng việt')
            .addFields({
                name: 'Việt nam',
                value: `vi`,
                inline: true
            })
            .addFields({
                name: 'English',
                value: `en`,
                inline: true
            })
            .addFields({
                name: 'Thái Lan',
                value: `th`,
                inline: true
            })
            .addFields({
                name: 'Trung Quốc',
                value: `zh-CN`,
                inline: true
            })
            .addFields({
                name: 'Nhật Bản',
                value: `ja`,
                inline: true
            })
            .addFields({
                name: 'Hàn Quốc',
                value: `ko`,
                inline: true
            })
            .addFields({
                name: 'Pháp',
                value: `fr`,
                inline: true
            })
            .addFields({
                name: 'Đức',
                value: `de`,
                inline: true
            })
            .setTimestamp()
        const str = args.join('')
        if (str === 'zh-CN') {
            let data;
            try {
                data = await SchemaLang.findOne({ _id: message.guild.id })
                if (!data) {
                    let newData = await SchemaLang.create({
                        _id: message.guild.id,
                        newLang: args.join(' ')

                    })
                    newData.save()

                } else {
                    await SchemaLang.findOneAndUpdate({
                        _id: message.guild.id,
                        newLang: args.join(' ')

                    })
                }

                message.channel.send(`Đã đổi chị google **${args.join()}**`)
            } catch (e) { console.error(e) }
        } else { if (str.length > 2) return message.channel.send('Nhập đúng mã ngôn ngữ Example: **vi, en, ja, de, fr, ko, zh-CN**...') }
        if (!args.join('')) return message.channel.send(embed)
        let data;
        try {
            data = await SchemaLang.findOne({ _id: message.guild.id })
            if (!data) {
                let newData = await SchemaLang.create({
                    _id: message.guild.id,
                    newLang: args.join(' ')

                })
                newData.save()

            } else {
                await SchemaLang.findOneAndUpdate({
                    _id: message.guild.id,
                    newLang: args.join(' ')

                })
            }
            message.channel.send(`Đã đổi chị google **${args.join()}**`)
        } catch (e) { console.error(e) }
    }
}