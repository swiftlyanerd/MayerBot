module.exports = {
    name : "ping",
    description : "Returns the response delay (in ms).",
    execute(message) {
        let delay = Date.now() - message.createdAt;
        message.channel.send(`${delay} \`ms\``);
    },
}