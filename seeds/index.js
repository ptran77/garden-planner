const seedUsers = require('./user-seeds');
const seedGardens = require('./garden-seeds');
const seedPlants = require('./plant-seeds');
const seedGardenPlants = require('./garden-plant-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedGardens();
  console.log('\n----- GARDENS SEEDED -----\n');

  await seedPlants();
  console.log('\n----- PLANTS SEEDED -----\n');

  await seedGardenPlants();
  console.log('\n----- GARDENPLANTS SEEDED -----\n')

  process.exit(0);
};

seedAll();