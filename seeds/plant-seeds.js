const { Plant } = require('../models');

const plantdata = [
  {
    name: "carrot",
    type: "vegetable",
    sun_intake: "full sun",
    water_intake: "0.15 inch per day",
    soil_type: "loose, well-drain soul"
  },
  {
    name: "rose",
    type: "flower",
    sun_intake: "4-6 hours daily",
    water_intake: "2 inches per week",
    soil_type: "loam"
  },
  {
    name: "apple",
    type: "fruit",
    sun_intake: "full sun",
    water_intake: "inch per week",
    soil_type: "well-draining medium-clay to saby loam"
  },
  {
    name: "tomato",
    type: "vegetable",
    sun_intake: "full sun",
    water_intake: "1-1.5 inch weekly",
    soil_type: "rich loam"
  },
  {
    name: "sunflower",
    type: "flower",
    sun_intake: "full-sun",
    water_intake: "inch weekly",
    soil_type: "alkaline"
  }
];

const seedPlants = () => Plant.bulkCreate(plantdata, {individualHooks: true});

module.exports = seedPlants;