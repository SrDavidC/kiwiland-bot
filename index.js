const config = require("./config.json");
const token = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({ disableEveryone: true });
client.commands = new Discord.Collection();
const { MessageEmbed } = require('discord.js');
const util = require('minecraft-server-util');
const status = "<:GreenTick:883814400409104414> Online"; // MANTENIMIENTO
const memberCounter = require("./counters/member-counter");
const activities = [
  "kiwiland.wtf",
  "UHC Meetups",
  "KiwiBot is Tier 2 High on PvP",
  " '!' is my prefix",
  "kiwiland.wtf",
  "Kiwi UHC",
  "Kiwi TexturePack",
  "!tienda",
  "!store",
  "!ranks",
  "Rangos en descuento !tienda",
  
  
];


client.on("ready", async () => {
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
        const newActivity = activities[randomIndex];
        client.user.setActivity(newActivity);
        }, 5000);
    console.log(`${client.user.username} is online on ${client.guilds.cache.size} servers!`);
    memberCounter(client)
    //client.user.setActivity("Kiwiland.wtf", { type: "PLAYING" });
});
client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    
    
    if(command ==="pef"){
        message.channel.send(":yum: :yum:")
    }
    else if(command === "moob" || command === "moob56"){
        message.channel.send(":moyai:")
    }
    else if(command === "newo" || command === "newoad"){
        message.channel.send("El best Kiwi :sunglasses: :call_me:")
    }
    else if(command === "drinka" || command === "zdrinka"){
        message.channel.send(":regional_indicator_s: :regional_indicator_o:")
    }
    else if(command === "furia" || command === "nxfuria"){
        message.channel.send("<:emoji_47:831279037334159400>")
    }
    else if(command === "maria" || command === "MariaDarkSM"){
        message.channel.send("<:olareina:825403240686157834>")
    }
  else if(command === "scly" || command === "furro"){
        message.channel.send("<:emoji_53:881644167900581950>")
    }
  else if(command === "mitormento" || command === "tormento"){
        message.channel.send(":moneybag: :moneybag:")
    }




    ///UTILITY COMANDS
    else if(command ==="ip" || command === "IP"){
        message.channel.send("kiwiland.wtf")
    }
    
    
    /////////////// COMANDO HABLAR CON EL BOT ///////////////
    else if (command === "talk") {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('No tienes permisos para usar este comando');
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => { });
        message.channel.send(sayMessage);
    }



             /////////////// COMANDO ANUNCIO ELABORADO !say #canal Mensaje // !say #canal Mensaje -ping ///////////////
    else if (command === "say") {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('No tienes permisos para usar este comando');

        let mention;

        if (!args.length) return message.channel.send('> Usage: !anuncio <#channel> <Color> <message> <-ping ?>');

        const channel = message.mentions.channels.first();
        if (!channel) return message.reply('Especifica el canal');

        if (!args[1].startsWith("#")) return message.reply('Pon un color v??lido en formato Hex');

        if (!args[2]) return message.reply('Especifica el mensaje');

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
                .setDescription(args.slice(2).join(" "))
                .setTimestamp()
                .setColor(args.slice(1).join(" "))
        
                )


    }
    
    /////////////// COMANDO STATUS DEL SERVER !sv ///////////////
    
    else if(command === "sv" || command === "server" || command === "kiwi" || command === "kiwiland"){
        util.status("kiwiland.wtf").then((response) =>{
            console.log(response);
            const embed = new Discord.MessageEmbed()
            .setColor('#1F8B4C')
            .setTitle('KIWILAND SERVER STATUS')
            .setThumbnail('https://i.imgur.com/WFxU2I2.png')
            .addFields(
                {name: 'Status', value: status   },
                {name: 'Online Players', value: response.onlinePlayers},
                {name: '**Modalidades**', value: "PracticePvP / Meetups / Creative"},
                {name: 'Server IP', value: response.host},
                {name: 'Version', value: "1.16.x - 1.17"}
            )
            .setFooter("Server: Kiwiland || Server Record: 139 players", "https://i.imgur.com/Z85KiTq.png");
            message.channel.send(embed);
        })
        .catch ((error) =>{
            message.channel.send('Kiwiland server is off or in maintence');
            throw error;
        })
    }
    ////////////////////STATUS DE OTRO SERVIDOR////////////////////////////////////  
      else if (command === "status"){
        if(!args[0]) return message.channel.send('Especifica la IP del server');
 
        util.status(args[0]).then((response) =>{
            console.log(response);
            const embed = new Discord.MessageEmbed()
            .setColor('#049FBC')
            .setTitle('SERVER STATUS')
            .addFields(
                {name: 'Server IP', value: response.host},
                {name: 'Online Players', value: response.onlinePlayers},
                {name: 'Version', value: response.version}
            )
            .setFooter('kiwiland.wtf Discord Bot');
 
            message.channel.send(embed);
        })
        .catch ((error) =>{
            message.channel.send('No se pudo encontrar el servidor');
            throw error;
        })
    }
  
  
    /////////////// QUITAR UN ROL ///////////////
    const Role = message.guild.roles.cache.get("RoleID");
    if(command === "ja"){
        message.member.roles.remove("783060970703683605");
    }

    
    
    //////////////// ANUNCIO SENCILLO ///////////////
    
    else if (command === "anuncio") {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('No tienes permisos para usar este comando');

        let mention;

        if (!args.length) return message.channel.send('> Usage: !anuncio <#channel> <Color ><message> <-ping ?>');

        const channel = message.mentions.channels.first();
        if (!channel) return message.reply('Especifica el canal');

        if (!args[1].startsWith("#")) return message.reply('Pon un color v??lido en formato Hex');

        if (!args[2]) return message.reply('Especifica el mensaje');

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
                .setDescription(args.slice(2).join(" "))
                .setColor(args.slice(1).join(" "))
        )
    }



            //////////////// COMANDO DE SUGERENCIAS ///////////////
   

    else if(command === "suggest"){
        const nosug = message.member.roles.cache.some(role => role.name === 'NoSug')
        const channel = message.guild.channels.cache.find(c => c.name === '?????????????????uggestions???');
        if(nosug) return message.channel.send('*Se te ha negado el permiso de sugerir*');
        if(!channel) return message.channel.send('*El canal no existe*!');

        let messageArgs = args.join(' ');
        const embed = new Discord.MessageEmbed()
        .setColor('#b02ffa')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(messageArgs);

        channel.send(embed).then((msg) =>{
            msg.react("<:negative:886137582742814791>");
            msg.react("<:positive:886137690234425386>");
            message.delete();
        }).catch((err)=>{
            throw err;
        });
    }

    
  

  
  
  /////////////!tienda !store !ranks////////////////
    else if(command === "store" || command === "tienda"){
        message.channel.send("??Ac?? tienes la tienda del servidor! : https://kiwiland.tebex.io/")
    }
    else if(command === "store" || command === "tienda"){
        message.channel.send("??Ac?? tienes la tienda del servidor!: https://kiwiland.tebex.io/")
    }
    else if(command === "rangos" || command === "ranks" || command === "beneficios" || command === "benefits") {
        message.channel.send("You can see that on " +  message.guild.channels.cache.get('884529545485615134').toString())
    }

///////////////////////COMANDO !HEAD & !SKIN////////////////////////////////////
else if(command === "head"){
    const request = require("request"); 
    const nombre = args.join(" ");
        if (!nombre) {
                return message.channel.send("Ingresa el nombre de un jugador **premium**");
            }
            if (nombre.length > 16) {
                return message.channel.send("Los nombres de los jugadores de minecraft no contienen mas de 16 caracteres.");
            }
            let mojang_player_api = `https://api.mojang.com/users/profiles/minecraft/${nombre}`;
            request(mojang_player_api, function(err, resp, body) {
                if (err) {
                    return message.channel.send(`El usuario **${nombre}** no es un jugador premium.`);
                }
                try {
                    body = JSON.parse(body);
                    let player_id = body.id;
                    let skin = `https://crafatar.com/skins/${player_id}`;
                    let avatar = `https://crafatar.com/avatars/${player_id}`;
                    let embed = new MessageEmbed();
                    embed.setColor("#EE1289");
                    embed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    embed.setImage(avatar);
                    return message.channel.send(embed);
                } catch (err) {
                    return message.channel.send(`El usuario **${nombre}** no es un jugador premium!`);
                }
            });
}
    else if(command === "skin"){
    const request = require("request"); 
    const nombre = args.join(" ");
        if (!nombre) {
                return message.channel.send("Ingresa el nombre de un jugador **premium**");
            }
            if (nombre.length > 16) {
                return message.channel.send("Los nombres de los jugadores de minecraft no contienen mas de 16 caracteres.");
            }
            let mojang_player_api = `https://api.mojang.com/users/profiles/minecraft/${nombre}`;
            request(mojang_player_api, function(err, resp, body) {
                if (err) {
                    return message.channel.send(`El usuario **${nombre}** no es un jugador premium.`);
                }
                try {
                    body = JSON.parse(body);
                    let player_id = body.id;
                    let render = `https://crafatar.com/renders/body/${player_id}`;
                    let skin = `https://crafatar.com/skins/${player_id}`;
                    let avatar = `https://crafatar.com/avatars/${player_id}`;
                    let embed = new MessageEmbed();
                    embed.setColor("#EE1289");
                    embed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    embed.setImage(render);
                    return message.channel.send(embed);
                } catch (err) {
                    return message.channel.send(`El usuario **${nombre}** no es un jugador premium!`);
                }
            });
    }

})


})

client.on('message', (message) => { 
    if(message.channel.id === ('884538809818173510')) {
    message.react('<:negative:886137582742814791>')
    message.react('<:positive:886137690234425386>')
}
})





client.login(token.token);
