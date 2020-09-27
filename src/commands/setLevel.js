const { dbInit, Users, changeUserLevel } = require("./../dbInit");

module.exports = {
    name: "set_level",
    description: "",
    async execute(client, message, args){
        changeUserLevel(message.author.id, args[0]);
    }
}