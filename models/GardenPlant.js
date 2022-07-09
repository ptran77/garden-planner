const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class GardenPlant extends Model {}

GardenPlant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        garden_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'garden',
                key: 'id'
            }
        },
        plant_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'plant',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'garden_plant'
    }
)

module.exports = GardenPlant;