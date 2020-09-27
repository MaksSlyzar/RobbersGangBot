const Discord = require('discord.js');
const fs = require("fs");
const jsonfile = require("jsonfile");
const { dbInit, getUserById, createUser, changeUserLevel, changeUserXp } = require("./dbInit");

//


const { prefix, token } = require('./../config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

//Bot in online
client.once('ready', async () => {
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
client.on('message', async (message) => {
    

	if (message.content.startsWith(prefix) || message.author.bot){
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        
        
        //Running commands
        try {
            if (client.commands.has(command)) {
                client.commands.get(command).execute(client, message, args);
            }
        } catch (error) {
            console.error(error);
        }
    }else{
        //Level update
        DataUser = await getUserById(message.author.id);

        if (DataUser == null){
            DataUser = await createUser(message.author.id);
            console.log("User registered")
        }

        q = 1.5
        b1 = 1
        n = DataUser.level + 1;

        const nextXp = Math.round(b1 * (1 - Math.pow(q, n)) / (1 - q))

        

        

        if (DataUser.xp >= nextXp){
            const Embed = {
                title: `Поздравляю с получением ${DataUser.level + 1} уровня!`,
                description: `Спасибо, что проявляешь активность на сервере\n\rТвоя награда - 10 (эмодзи монетки)`,
                thumbnail: {
                    url: message.author.avatarURL(),
                },        
                image: {
                    url: 'https://cdn.discordapp.com/attachments/758715594819895366/759093242443726848/Lesvel_up.png'
                },
                color: ""
            }
            changeUserLevel(message.author.id, DataUser.level + 1);
            changeUserXp(message.author.id, DataUser.xp - nextXp);

            //message.channel.send({ embed: Embed });
        }


        
        if (DataUser.collectedXp == null){
            changeUserXp(message.author.id, DataUser.xp + 2);
            DataUser.collectedXp = new Date();
        }else{
            console.log(DateUser.collectedXp);
        }
        
        
        console.log(DataUser.xp)
        //message.channel.send(`Next xp: ${nextXp}`);
        //
    }

});


//Logining bot
client.login(token);