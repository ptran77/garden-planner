// import models
const User = require('./User');
const Garden = require('./Garden');
const Plant = require('./Plant');
const GardenPlant = require('./GardenPlant');

User.hasMany(Garden, {
    foreignKey: 'user_id'
});

Garden.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Garden.belongsToMany(Plant, {
    through: GardenPlant,
    as: 'garden_plant',
    foreignKey: 'garden_id'
});

Plant.belongsToMany(Garden, {
    through: GardenPlant,
    as: 'garden_plant',
    foreignKey: 'plant_id'
});

module.exports = {
    User,
    Garden,
    Plant,
    GardenPlant
};

