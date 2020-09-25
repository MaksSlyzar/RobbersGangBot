const Discord = require('discord.js');
const fs = require("fs");
const jsonfile = require("jsonfile");


const { prefix, token } = require('./../config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

//Bot in online
client.once('ready', () => {
	console.log('Ready!');
});


client.on("guildMemberAdd", (member) => {
    const WelcomeTexts = jsonfile.readFileSync("./data/WelcomeTexts.json");
    
    //Set Text
    let text = WelcomeTexts[WelcomeTexts.length - 1];
    text = text.replace("<UserName>", member.user.username);
    text = text.replace("<Discriminator>", member.user.discriminator);
    
    const Embed = {
        description: text,
        color: "#a6e3d5"
    }

    const Data = jsonfile.readFileSync("./src/channels.json");
    if (Data.Guilds[member.guild.id] == undefined){
        //Guild not found
    }else{
        ChannelID = Data.Guilds[member.guild.id].WelcomeChannelId;
        member.guild.channels.cache.get(ChannelID).send({ embed: Embed }).then( mess => {
            mess.react("758775897016500234");
        });
    }
});


//Load commands
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}


//Take messages
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
    
    
    //Running commands
    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(client, message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});


//Logining bot
client.login(token);