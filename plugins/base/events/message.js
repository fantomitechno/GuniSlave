const bypass = ["528340380064677891","585864257569292299", "563749920683720709","685846994027020361"]
module.exports = async(client, message) => {
    let prefix = client.config.prefix
    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return
    let args = message.content.split(" ");
    let commandName = args[0].toLowerCase().replace(prefix, "")
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if (command) command.run(client, message, args);
}
