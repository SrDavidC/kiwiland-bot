const config = require("./config.json");
const token = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({ disableEveryone: true });
client.commands = new Discord.Collection();
const { MessageEmbed } = require('discord.js');

//Playing Message
client.on("ready", async () => {
    console.log(`${client.user.username} is online on ${client.guilds.cache.size} servers!`);

    client.user.setActivity("Kiwiland.wtf", { type: "PLAYING" });
});
client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.

    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if (message.author.bot) return;

    // Also good practice to ignore any message that does not start with our prefix, 
    // which is set in the configuration file.
    // `startsWith` was added in ES2015 and you can use this instead of
    // if(message.content.indexOf(config.prefix) !== 0) return;
    if (!message.content.startsWith(config.prefix)) return;

    // Here we separate our "command" name, and our "arguments" for the command. 
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Let's go with a few common example commands! Feel free to delete or change those.
    
    if(command ==="pef"){
        message.channel.send(":yum:")
    }
    else if(command === "moob" || command === "moob56"){
        message.channel.send(":moyai:")
    }
    else if(command === "newo" || command === "newoad"){
        message.channel.send(":sunglasses: :call_me:")
    }
    else if(command === "furia" || command === "nxfuria"){
        message.channel.send(":potato:")
    }


    
    ///UTILITY COMANDS
    else if(command ==="ip" || command === "IP"){
        message.channel.send("kiwiland.wtf")
    }
    
    else if (command === "talk") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('No tienes permisos para usar este comando');
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => { });
        message.channel.send(sayMessage);
    }

    else if (command === "say") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('No tienes permisos para usar este comando');

        let mention;

        if (!args.length) return message.channel.send('> Usage: M!announce <#channel> <message> <-ping ?>');

        const channel = message.mentions.channels.first();
        if (!channel) return message.reply('Especifica el canal');

        if (!args[1]) return message.reply('Especifica el mensaje');

        // mentions
        if (args.some((val) => val.toLowerCase() === '-ping')) {
            for (let i = 0; i < args.length; i++) {
                if (args[i].toLowerCase() === '-ping') args.splice(i, 1);
            }

            mention = true;
        } else mention = false;

        if (mention === true) channel.send('@everyone');

        channel.send(
            new MessageEmbed()
                .setTitle("KIWILAND ANNOUNCEMENT :kiwi: ")
                .setThumbnail('https://i.imgur.com/WFxU2I2.png')
                .setDescription(args.slice(1).join(" "))
                .setTimestamp()
                .setColor('RANDOM')
        )


    }
})







client.login(token.token);