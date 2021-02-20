const Discord = require('discord.js');
const client = new Discord.Client()
const fs = require("fs");
client.config = require('./setup.js')

client.commands = new Discord.Collection()
client.alias = new Discord.Collection()

client.on('ready', () =>{
    console.log(`Reload de ${client.user.tag}`)
});

fs.readdir('./plugins/', (err, docs) => {
    if (err) console.log(err)
    docs.forEach(doc => {
        fs.readdir("./plugins/"+doc+"/commands/", (err, files) => {
            if (err) console.log(err)
            files.forEach(file => {
                if (!file.endsWith(".js")) return console.log("Je n'ai pas pu accepter le fichier " + file + " car il n'est pas en \".js\" .")
                let props = require("./plugins/"+doc+"/commands/" + file)
                client.commands.set(props.help.name, props)
                client.alias.set(props.help.alias, props.help.name)
            })
        })
        fs.readdir("./plugins/"+doc+"/events/", (err, files) => {
            if (err) console.log(err)
            files.forEach(file => {
                if (!file.endsWith(".js")) return console.log("Je n'ai pas pu accepter le fichier " + file + " car il n'est pas en \".js\" .")
                let event = require("./plugins/"+doc+"/events/" + file)
                client.on(file.split(".")[0], event.bind(null, client))
                delete require.cache[require.resolve("./plugins/"+doc+"/events/" + file)]
            })
        })
    })
})

client.login(client.config.token);
