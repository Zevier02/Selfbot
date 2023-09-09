//prérequis (modules)
const { GuildChannel } = require('discord.js');
const Discord = require('discord.js-selfbot-v13');
const Client = new Discord.Client

//variables
const prefix = ">se"
var cname = ""

//le bot se lance
Client.on('ready', () => {
    console.log("prêt")
});

//commandes
Client.on("messageCreate", message => {
    //utilisateurs
    if(){
        //spam
        if(message.content.startsWith(prefix + "spam")){
            message.delete().catch(err => {
                console.log("Delete error")
            });
            let args = message.content.split(", ")
            let i = 0
            if(isNaN(args[1])){
            }
            if(args[1] == "0"){
            }
            else{
                while(args[1] > i){
                    message.channel.send(args[2])
                    i = i + 1
                }
            }
        }
        //créer un salon
        if(message.content.startsWith(prefix + "ccreate")){
            message.delete().catch(err => {
                console.log("Delete error")
            });
            var args = message.content.split(" ")
            message.guild.channels.create(args[1]).catch(err => {
                console.log("Create channel error.")
            });

            cname = args[1]
        }
        //ghost message
        if(message.content.startsWith(prefix + "ghostmsg")){
            message.delete().catch(err => {
                console.log("Delete error")
            });
        }
        //calcul
        if(message.content.startsWith(prefix + "calcul")){
            message.delete().catch(err => {
                console.log("Delete error")
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
    }
});

//connexion
Client.login("Ton token ici");
