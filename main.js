const Discord = require("discord.js");
const config = require("./config.json");
const botCommands = require("./commands");

const prefix = config.bot.prefix;

const mayerbot = {
    client : new Discord.Client(),
    commands : new Discord.Collection(),
    log : console.log
}

mayerbot.load = function load() {
    this.log("loading commands...");
    Object.keys(botCommands).forEach(key => {
        this.commands.set(botCommands[key].name, botCommands[key]);
    });

    this.log("logging in...");
    this.client.login(config.bot.token);
}

mayerbot.onConnect = async function onConnect() {
    this.log(`Logged in as: ${this.client.user.tag}`);
}

mayerbot.onMessage = async function onMessage(message) {
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.split(/ +/);

    const command = args.shift().toLowerCase().slice(prefix.length);

   if(!this.commands.has(command)) return;

    try {
        this.commands.get(command).execute(message, args);
    } catch(err) {
        this.log(err);
        message.channel.send("There was an error executing this command.");
    }
}

mayerbot.client.on("ready", mayerbot.onConnect.bind(mayerbot));
mayerbot.client.on("message", mayerbot.onMessage.bind(mayerbot));

mayerbot.load();