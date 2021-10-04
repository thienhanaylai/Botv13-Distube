const checkroom = (message) => {

    if (!message.member.voice.channel) return message.reply({ content: "Bạn không có trong kênh thoại nào~" });
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
        return message.reply('Bạn phải cùng phòng với bot mới có thể sử dụng lệnh này!');
    }


}




module.exports = {

    checkroom
}