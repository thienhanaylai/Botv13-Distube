const mongoose = require('mongoose');
const SchemaPrefix = require('../../Schemas/SchemaPrefix');
module.exports = {
    name: 'setprefix',
    category: 'bot',
    aliases: ['sp'],

    run: async(client, message, args) => {
        if (message.member.id !== message.guild.ownerId) return message.channel.send('Bạn không có quyền set prefix !');

        if (!args.join(' ')) return message.channel.send('Nhập gì đó để set prefix !')
        let data;
        try {
            data = await SchemaPrefix.findOne({
                _id: message.guild.id,
            })
            if (!data) {
                let newData = await SchemaPrefix.create({
                    _id: message.guild.id,
                    newPrefix: args.join()

                })
                newData.save()

            } else {
                await SchemaPrefix.findOneAndUpdate({
                    _id: message.guild.id,
                    newPrefix: args.join()

                })
            }
            message.channel.send(`Set prefix to **${args.join()}**`)
        } catch (e) { console.error(e) }
    }
}