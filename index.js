//prérequis (modules)
const Discord = require("discord.js-selfbot-v13-fixed4")
const Client = new Discord.Client
const { kill } = require("process");
const Config = require("./config.json")
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
var connection
var player
var subscription
var resource
//variables
var prefix
var cname = ""
var senddeletedmessage
var senddeletedmessageCustom
var senddeletedmessageChannel
var autorizedusersid

//le bot se lance
Client.once('ready', () => {
    console.log("prêt")
    senddeletedmessage = Config.senddeletedmessage
    senddeletedmessageChannel = Config.senddeletedmessageChannel
    senddeletedmessageCustom = Config.senddeletedmessageCustom
    prefix = Config.prefix
    autorizedusersid = Config["autorized users id"]
});

//commandes
Client.on("messageCreate", message => {
    try {
        //utilisateurs
        if(message.author.id == Client.user.id || autorizedusersid.indexOf(message.author.id) != -1){
            //config
            if(message.startsWith(prefix + "config")){
                const args = message.content.split(" ")
                if(args[1] == "users"){
                    if(args[2] == "" || args[2] == undefined || args[2] == null){
                        message.delete().catch(err => {
                            //console.log("Delete error")
                        });
                        var text = ""
                        var i = 0
                        while(autorizedusersid[i] != undefined){
                            text = text + `<@${autorizedusersid[i]}>, `
                            i++
                        }
                        text = text.substring(0, text.length - 2)
                        message.channel.send(`The currently autorized users are : ${text}.`)
                    }
                    else if(args[2] == "add"){
                        autorizedusersid.push(args[3])
                        message.delete().catch(err => {
                            //console.log("Delete error")
                        });
                        message.channel.send(`The user <@${args[3]}> is now added.`)
                    }
                    else if(args[2] == "remove"){
                        if(autorizedusersid.indexOf(args[3]) == -1){
                            message.delete().catch(err => {
                                //console.log("Delete error")
                            });
                            message.channel.send(`The user <@${args[3]}> is not in the users list.`)
                        }
                        else {
                            autorizedusersid.splice(autorizedusersid.indexOf(args[3]), 1)
                            message.delete().catch(err => {
                                //console.log("Delete error")
                            });
                            message.channel.send(`The user <@${args[3]}> is now removed.`)
                        }
                    }
                }
                else if(args[1] == "prefix"){
                    if(args[2] == "" || args[2] == undefined || args[2] == null){
                        message.delete().catch(err => {
                            //console.log("Delete error")
                        });
                        message.channel.send(`The prefix is currently **${prefix}**.`)
                    }
                    else {
                        message.delete().catch(err => {
                            //console.log("Delete error")
                        });
                        prefix = args[2]
                        message.channel.send(`The prefix is now **${prefix}**.`)
                    }
                }
                else if(args[1].toLowerCase() == "senddeletedcustom" || args[1].toLowerCase() == "sdc"){
                    if(args[2].toLowerCase() == "true" || args[2].toLowerCase() == "on"){
                        message.delete().catch(err => {
                            //console.log("Delete error")
                        });
                        senddeletedmessageCustom = true
                        message.channel.send(`The SDC is now **${senddeletedmessageCustom? "On" : "Off"}** (base ${Config.senddeletedmessageCustom? "On" : "Off"}).`)
                    }
                    else if(args[2].toLowerCase() == "false" || args[2].toLowerCase() == "off"){
                        message.delete().catch(err => {
                            //console.log("Delete error")
                        });
                        senddeletedmessageCustom = false
                        message.channel.send(`The SDC is now **${senddeletedmessageCustom? "On" : "Off"}** (base ${Config.senddeletedmessageCustom? "On" : "Off"}).`)
                    }
                    else {
                        message.delete().catch(err => {
                            //console.log("Delete error")
                        });
                        message.channel.send(`The SDC is currently **${senddeletedmessageCustom? "On" : "Off"}** (base ${Config.senddeletedmessageCustom? "On" : "Off"}).`)
                    }
                }
                else if(args[1].toLowerCase() == "sendmessagechannel" || args[1].toLowerCase() == "smc"){
                    if(args[2].toLowerCase() == "true" || args[2].toLowerCase() == "on"){
                        message.delete().catch(err => {
                            //console.log("Delete error")
                        });
                        senddeletedmessage = true
                        message.channel.send(`The SDM is now **${senddeletedmessage? "On" : "Off"}** (base ${Config.senddeletedmessage? "On" : "Off"}).`)
                    }
                    else if(args[2].toLowerCase() == "false" || args[2].toLowerCase() == "off"){
                        message.delete().catch(err => {
                            //console.log("Delete error")
                        });
                        senddeletedmessage = false
                        message.channel.send(`The SDM is now **${senddeletedmessage? "On" : "Off"}** (base ${Config.senddeletedmessage? "On" : "Off"}).`)
                    }
                    else {
                        message.delete().catch(err => {
                            //console.log("Delete error")
                        });
                        message.channel.send(`The SDM is currently **${senddeletedmessage? "On" : "Off"}** (base ${Config.senddeletedmessage? "On" : "Off"}).`)
                    }
                }
                else if(args[1].toLowerCase() == "senddeltedcustomchannel" || args[2].toLowerCase() == "sdcc"){
                    if(args[2] == "set"){
                        message.delete().catch(err => {
                            //console.log("Delete error")
                        });
                        senddeletedmessageChannel = message.channel.id
                        message.channel.send(`The SDM is now <#${senddeletedmessageChannel}> (base ${senddeletedmessageChannel}).`)
                    }
                    else {
                        message.delete().catch(err => {
                            //console.log("Delete error")
                        });
                        message.channel.send(`The SDM is currently <#${senddeletedmessageChannel}> (base ${senddeletedmessageChannel}).`)  
                    }
                }
                else {
                    message.delete().catch(err => {
                        //console.log("Delete error")
                    });
                    //console.log("Didn't give any parameter to edit.")
                }
            }

            //voc
            if(message.content.startsWith(prefix + "voice")){
                message.delete().catch(err => {
                    //console.log("Delete error")
                });
                if(message.member.voice.channel != null){
                    const args = message.content.split(" ")
                    var sound = args[1]
                    var soundduration = 5000
                    if(sound == "tacobell"){
                        soundduration = 2000
                    }
                    try{
                        connection = joinVoiceChannel({
                            channelId: message.member.voice.channel.id,
                            guildId: message.guild.id,
                            adapterCreator: message.guild.voiceAdapterCreator,
                        });
                        player = createAudioPlayer();
                        subscription = connection.subscribe(player);
                        resource = createAudioResource("./Self Bot/" + sound + ".mp3");
                        player.play(resource);
                        setTimeout(() => {
                            player.stop()
                            connection.destroy();
                        }, soundduration);
                    } catch(err){
                        //console.log(err)
                    }
                }
            }
            //arrêter la voc
            if(message.content == prefix + "deco"){
                message.delete().catch(err => {
                    //console.log("Delete error")
                });
                if(player == undefined || connection == undefined){
                    return;
                }
                player.stop()
                connection.destroy();
            }
            //spam
            if(message.content.startsWith(prefix + "spam")){
                message.delete().catch(err => {
                    //console.log("Delete error")
                });
                let args = message.content.split(", ")
                let i = 0
                if(isNaN(args[1])){
                    }
                    else {
                    if(args[1] == "0"){
                    }
                    else{
                        while(args[1] > i){
                            message.channel.send(args[2])
                            i = i + 1
                        }
                    }
                }
            }
            //créer un salon
            if(message.content.startsWith(prefix + "ccreate")){
                message.delete().catch(err => {
                    //console.log("Delete error")
                });
                var args = message.content.split(" ")
                message.guild.channels.create(args[1]).catch(err => {
                    //console.log("Create channel error." + err)
                });

                cname = args[1]
            }
            //ghost message
            if(message.content.startsWith(prefix + "ghostmsg")){
                message.delete().catch(err => {
                    //console.log("Delete error")
                });
            }
            //calcul
            if(message.content.startsWith(prefix + "calcul")){
                message.delete().catch(err => {
                    //console.log("Delete error")
                });
                let args = message.content.split(" ")
                if(isNaN(args[1])){
                }
                else if(isNaN(args[3])){
                }
                else{
                    if(args[2] == "-"){
                        result = args[1] - args[3]
                        message.channel.send(args[1] + " " + args[2] + " " + args[3] + " = " + result)
                    }
                    else if(args[2] == "+"){
                        var nb1=parseFloat(args[1]);
                        var nb2=parseFloat(args[3]);
                        result = nb1 + nb2
                        message.channel.send(args[1] + " " + args[2] + " " + args[3] + " = " + result)
                    }
                    else if(args[2] == "*" || args[2] == "x" || args[2] == "×"){
                        result = args[1] * args[3]
                        message.channel.send(args[1] + " " + args[2] + " " + args[3] + " = " + result)
                    }
                    else if(args[2] == "/" || args[2] == ":" || args[2] == "÷"){
                        result = args[1] / args[3]
                        message.channel.send(args[1] + " " + args[2] + " " + args[3] + " = " + result)
                    }   
                }
            }
            if(message.author.id == Client.user.id){
                if(message.content.startsWith(prefix + "config")){
                    var args = message.content.split(" ")
                    message.delete().catch(err => {
                        //console.log("Delete error")
                    });

                    if(args[1] == "senddeletedmessage"){
                        if(args[2] == "false"){
                            senddeletedmessage = false
                        }
                        else if(args[2] == "true"){
                            senddeletedmessage = true
                        }
                        else {
                            //console.log("Error : can be only \"false\" or \"true\".")
                        }
                    }
                    else if(args[1] == "senddeletedmessageCustom"){
                        if(args[2] == "false"){
                            senddeletedmessageCustom = false
                        }
                        else if(args[2] == "true"){
                            senddeletedmessageCustom = true
                        }
                        else {
                            //console.log("Error : can be only \"false\" or \"true\".")
                        }

                        senddeletedmessageChannel = message.channel.id
                    }
                }
            }
        }
    } catch(err) {
        //console.log("Error : " + err)
    }
});

//messages supprimés
Client.on("messageDelete", message => {
    if(`${message.author == null ? "0" : message.author.id == null ? "0" : message.author.id}` == Client.user.id){
        return;
    }
    if(message.author == null && message.content == null && message.attachments.size == 0){
        return;
    }
    if(senddeletedmessage == true){
        message.channel.send({content: `\`By : ${message.author == null ? "*Error*" : message.author.tag == null ? "*Error*" : message.author.tag},\` ` + message.content, files: message.attachments}).catch(err => {
            //console.log("Resend error.")
        })
    }
    if(senddeletedmessageCustom == true){
        if(message.channel.id != senddeletedmessageChannel){
            Client.channels.cache.get(senddeletedmessageChannel).send({content: `\`By : ${message.author == null ? "*Error*" : message.author.tag == null ? "*Error*" : message.author.tag}\nSend date : ${new Date(message.createdTimestamp)}\nAt : \n ${message.guild == null? "Channel : " + message.channel.name + " `<#" + message.channel.id + ">" : "Guild : " + message.guild.name + "\n Channel : " + message.channel.name + " `<#" + message.channel.id + ">"}\n` + message.content, files: message.attachments}).catch(err => {
            //console.log(err)
            })
        }
    }
    //console.log("\nDeleted message : \nContent: " + `${message.content == null? "Error" : message.content}` + `${message.author == null? "\nBy : Error" : message.author.tag == null? "\nBy : Error" : "\nBy : " + message.author.tag} \nSend date : ${new Date(message.createdTimestamp)}\nAt : \n ${message.guild == null? "Channel : " + message.channel.name : "Guild : " + message.guild.name + "\n Channel : " + message.channel.name}\n`)
});

//connexion
Client.login(Config.token);