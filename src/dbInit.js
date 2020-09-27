
const { Sequelize, Model, DataTypes } = require('sequelize');
const connection = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.sqlite3',
    logging: false
});


const Users = require("./../models/Users")(connection, DataTypes);

module.exports.getUserById = async (id) => {
    const user = await Users.findOne({ where: { discord_id: id } });

    return user;
}

module.exports.createUser = async (discord_id, xp = 1, level = 1, coin = 0) => {
    User = await Users.create({ 
        discord_id: discord_id,
        xp: xp,
        level: level,
        coin: coin
    })
    return User
}

module.exports.changeUserLevel = async (discord_id, level) => {
    User = await Users.findOne({ where: { discord_id: discord_id } });
    console.log(User);
    User.level = Number(level);
    User.save();
}

module.exports.changeUserXp = async (discord_id, xp) => {
    User = await Users.findOne({ where: { discord_id: discord_id } });
    User.xp = xp;
    User.save();
}

connection.sync({ force: true, logging: false });