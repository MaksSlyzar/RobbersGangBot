module.exports = {
    name: "view",
    description: "",
    execute(client, message, args){
        const emoji = message.guild.emojis.cache.get("758775897016500234")
        const Embed = {
            title: "Поздравляю с получением 3 уровня!",
            description: `Спасибо, что проявляешь активность на сервере\n\rТвоя награда - 10 (эмодзи монетки)`,
            thumbnail: {
                url: message.author.avatarURL(),
            },        
            image: {
                url: 'https://cdn.discordapp.com/attachments/758715594819895366/759093242443726848/Lesvel_up.png'
            },
            color: ""
        }
        message.channel.send({ embed: Embed })
    }
}