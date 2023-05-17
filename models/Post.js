const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
            model: 'user',
            key: 'id',
            },
        },
    },
    {
            sequelize,
            timestamps: true,
            freezeTableName: true,
            modelName: "post",
    }
);

module.exports = Post;