const prisma = require('../../db/mysqlCient');
const plantData = require('./Plant.json');

require('dotenv').config();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data (optional - uncomment if you want to clear before seeding)
  // await prisma.plantSpecies.deleteMany({});
  // console.log("Cleared existing plant species");

  // Seed PlantSpecies from Plant.json
  console.log(`📦 Seeding ${plantData.length} plant species...`);

  for (const plant of plantData) {
    // Map the nested JSON structure to the flat database schema
    const plantSpeciesData = {
      common_name: plant.common_name,
      scientific_name: plant.scientific_name,
      family: plant.family,
      origin: plant.origin,
      description: plant.description,
      care_water: JSON.stringify(plant.care.water),
      care_light: JSON.stringify(plant.care.light),
      care_humidity: JSON.stringify(plant.care.humidity),
      care_temperature: JSON.stringify(plant.care.temperature),
      image_url: plant.image_url,
    };

    try {
      await prisma.plantSpecies.create({
        data: plantSpeciesData
      });
      console.log(`✅ Added: ${plant.common_name}`);
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(`⚠️  Skipped (already exists): ${plant.common_name}`);
      } else {
        console.error(`❌ Error adding ${plant.common_name}:`, error.message);
      }
    }
  }

  console.log("🌱 Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
