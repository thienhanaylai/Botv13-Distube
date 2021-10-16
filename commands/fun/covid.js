const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "covid",
    aliases: ['cov'],
    category: "fun",
    run: async(client, message, args) => {
        try {

            axios.get("https://api.ncovvn.xyz/cityvn")
                .then(function(response) {
                    function uppercase(str) {
                        var array1 = str.split(' ');
                        var newarray1 = [];

                        for (var x = 0; x < array1.length; x++) {
                            newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
                        }
                        return newarray1.join(' ');
                    }
                    if (!args.join(' ')) return message.channel.send('Nhập tỉnh cần tìm có dấu')
                    const data = response.data.filter(al => al.dia_diem == uppercase(args.join(' ')))[0];

                    const embed = new MessageEmbed()
                        .setColor('AQUA')
                        .setThumbnail('https://i.imgur.com/dxrPLw3.png')
                        .setTitle(`Thông tin tình hình dịch bệnh ở ${data.dia_diem}. `)
                        .addFields({ name: '\u200B', value: '\u200B' })
                        .addField('Tổng số ca nhiễm:', `${data.tong_ca_nhiem} ca nhiễm`, true)
                        .addField('Số ca nhiễm hôm nay:', `${data.hom_nay} ca nhiễm`, true)
                        .addField('Số bệnh nhân tử vong:', `${data.tu_vong} người`, true)
                        .setTimestamp()


                    message.channel.send({ embeds: [embed] });
                })
        } catch (error) {
            channel1 = client.channels.cache.find(channel => channel.id === '895523356986707979')
            const embed = new MessageEmbed()
                .setColor('RED')
                .setTitle('Error!')
                .addField(`Error:`, `\`\`\`js\n${error}\n\`\`\``)
            channel1.send({
                embeds: [embed],
                allowedMentions: { repliedUser: false }
            })
        }




    }

}