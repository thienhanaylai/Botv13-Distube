const mongoose = require('mongoose');
const SchemaChannel = require('../../Schemas/SchemaChannel');
module.exports = {
    name: 'setchannel',
    category: 'bot',
    aliases: ['sc'],

    run: async(client, message, args) => {
        if (message.member.id !== message.guild.ownerId) return message.channel.send('Bạn không có quyền set Channel !');

        if (!args.join(' ')) return message.channel.send('Nhập id của channel muốn dùng bot !')
        const channel1 = client.channels.cache.find(channel => channel.id === `${args[0]}`);

        let data;
        try {
            data = await SchemaChannel.findOne({ _id: message.guild.id })
            if (!data) {
                let newData = await SchemaChannel.create({
                    _id: message.guild.id,
                    IDChannel: args.join()

                })
                newData.save()

            } else {
                await SchemaChannel.findOneAndUpdate({
                    _id: message.guild.id,
                    IDChannel: args.join()

                })
            }
            message.channel.send(`Set channel to <#${args[0]}>`)
        } catch (e) { console.error(e) }
    }
}