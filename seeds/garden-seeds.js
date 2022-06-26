const { Garden } = require('../models');

const gardendata = [
  {
    garden_name: 'Alpha',
    user_id: 1
  },
  {
    garden_name: 'Beta',
    user_id: 1
  },
  {
    garden_name: 'Omega',
    user_id: 1
  },
  {
    garden_name: 'Ruby',
    user_id: 2
  },
  {
    garden_name: 'Tree',
    user_id: 3
  },
  {
    garden_name: 'Foggy',
    user_id: 3
  },
  {
    garden_name: 'Pearl',
    user_id: 4
  }
]

const seedGardens = () => Garden.bulkCreate(gardendata, {individualHooks: true});

module.exports = seedGardens;