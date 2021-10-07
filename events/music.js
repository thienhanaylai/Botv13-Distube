const { MessageEmbed } = require("discord.js");


module.exports.DistubeEvents = (distube) => {

    distube
        .on("playSong", (queue, song) => {

            let thumbnail;
            let url = song.thumbnail;
            if (url === null) {
                thumbnail = 'https://i0.wp.com/s1.uphinh.org/2021/09/25/Untitled2e84e3ca63fb3550.th.png';
            } else {
                thumbnail = song.thumbnail;
            }


            const embed = new MessageEmbed()
                .setColor('AQUA')
                .setDescription(` **Now Playing**\n[${song.name}](${song.url})`)
                .setThumbnail(`${thumbnail}`)
                .addField('Channel', `${song.uploader.name}`, true)
                .addField('Durantion', `${song.formattedDuration}`, true)
                .addField('Request by', `${song.user}`)
                .setTimestamp()
            queue.textChannel.send({ embeds: [embed] })
        })
        .on("addSong", (queue, song) => {
            const embed = new MessageEmbed()
                .setColor('AQUA')
                .setURL(song.url)
                .setDescription(` **Add to playlist**\n[${song.name}](${song.url})`)
                .setThumbnail(`${song.thumbnail}`)
                .addField('Request by:', `${song.user}`)
                .setTimestamp()
            queue.textChannel.send({ embeds: [embed] })
        })
        .on('addList', (queue, playlist) => {
            const embed = new MessageEmbed()
                .setColor('AQUA')
                .setURL(playlist.url)
                .setTitle(`Add playlist ${playlist.name} ...!`)
                .setThumbnail(`${playlist.thumbnail}`)
                .addField('Request by:', `${playlist.user}`)
                .setTimestamp()
            queue.textChannel.send({ embeds: [embed] })
        })
        .on('error', (textChannel, e) => {
            channel1 = client.channels.cache.find(channel => channel.id === '895523356986707979')
            const embed = new MessageEmbed()
                .setColor('RED')
                .setTitle('Error!')
                .addField(`Error:`, `\`\`\`js\n${e}\n\`\`\``)
            channel1.send({
                embeds: [embed],
                allowedMentions: { repliedUser: false }
            })
            console.error(e)

        })
        .on('finishSong', queue => { return; })
        .on('finish', queue => queue.textChannel.send('Đã phát hết nhạc trong dánh sách | **Leaved !**'))
        .on('disconnect', queue => { return; })
        .on('empty', queue => queue.textChannel.send('Không ai ở trong kênh thoại | **Leaved !**'))
}