const { readdirSync } = require(`fs`);
const ascii = require(`ascii-table`);

let table = new ascii(`lệnh`);
table.setHeading("Tên file", "Tình trạng");

module.exports = (Client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            if (pull.name) {
                Client.commands.set(pull.name, pull);
                table.addRow(file, '✔');
            } else {
                table.addRow(file, '❌');
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(aliases => Client.aliases.set(aliases, pull.name));

        }
    })
    console.log(table.toString());
}