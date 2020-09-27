module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        // Model attributes are defined here
        discord_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        xp: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        level: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        coins: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        collectedXpDate: {
            type: DataTypes.STRING
        }
    }, {
    });
}