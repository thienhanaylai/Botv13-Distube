module.exports = {
    name: "random",
    aliases: ['r'],
    category: "fun",
    run: async(client, message, args) => {

        function getRndInteger(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        if (!args[1]) {
            const number = getRndInteger(args[0], '0');
            if (!number) return message.channel.send('Nhập số cần random!')
            message.channel.send(`Số random của bạn là <:khoc:838270644759822346> :\`${number}\``);
        } else {
            const number = getRndInteger(args[0], args[1]);
            if (!number) return message.channel.send('Nhập số cần random!')
            message.channel.send(`Số random của bạn là :\`${number}\``);
        }
    }
}