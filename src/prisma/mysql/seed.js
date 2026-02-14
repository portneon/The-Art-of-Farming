const prisma = require('../../db/mysqlCient');
const plantData = require('./Plant.json');
const bcrypt = require('bcrypt');

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

  // Create a test user (if needed for testing)
  console.log("\n👤 Creating test user...");
  let testUser;
  try {
    const hashedPassword = await bcrypt.hash('test123', 10);
    testUser = await prisma.user.create({
      data: {
        email: 'test@garden.com',
        password: hashedPassword,
        name: 'Test Gardener'
      }
    });
    console.log("✅ Test user created: test@garden.com (password: test123)");
  } catch (error) {
    if (error.code === 'P2002') {
      console.log("⚠️  Test user already exists, fetching...");
      testUser = await prisma.user.findUnique({
        where: { email: 'test@garden.com' }
      });
    } else {
      console.error("❌ Error creating test user:", error.message);
    }
  }

  if (testUser) {
    // Create sample gardens
    console.log("\n🏡 Creating sample gardens...");
    const gardens = [];

    const gardenData = [
      { name: "Indoor Sanctuary", description: "My collection of indoor plants that brighten up the living space" },
      { name: "Balcony Oasis", description: "Sun-loving plants thriving on the balcony" },
      { name: "Kitchen Herbs", description: "Fresh herbs for cooking adventures" }
    ];

    for (const gardenInfo of gardenData) {
      try {
        const garden = await prisma.garden.create({
          data: {
            name: gardenInfo.name,
            description: gardenInfo.description,
            userId: testUser.id
          }
        });
        gardens.push(garden);
        console.log(`✅ Created garden: ${garden.name}`);
      } catch (error) {
        console.error(`❌ Error creating garden ${gardenInfo.name}:`, error.message);
      }
    }

    // Get some plant species for planting
    const plantSpecies = await prisma.plantSpecies.findMany({ take: 10 });

    if (plantSpecies.length > 0 && gardens.length > 0) {
      console.log("\n🌿 Planting sample plants...");

      // Helper to get date N days ago
      const daysAgo = (days) => {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date;
      };

      const plantsToCreate = [
        {
          nickname: "Monstera Max",
          location: "Living room corner",
          healthStatus: "Good",
          lastWatered: daysAgo(2),
          lastFertilized: daysAgo(25),
          notes: "Growing beautifully!",
          gardenId: gardens[0]?.id,
          plantSpeciesId: plantSpecies[0]?.id
        },
        {
          nickname: "Fiddle Fig",
          location: "Near window",
          healthStatus: "NeedsAttention",
          lastWatered: daysAgo(10),
          lastFertilized: daysAgo(40),
          notes: "Leaves looking droopy, needs water",
          gardenId: gardens[0]?.id,
          plantSpeciesId: plantSpecies[1]?.id
        },
        {
          nickname: "Basil Buddy",
          location: "Kitchen windowsill",
          healthStatus: "Good",
          lastWatered: daysAgo(1),
          lastFertilized: daysAgo(14),
          notes: "Great for pasta!",
          gardenId: gardens[2]?.id,
          plantSpeciesId: plantSpecies[2]?.id
        },
        {
          nickname: "Succulent Sally",
          location: "Balcony table",
          healthStatus: "Good",
          lastWatered: daysAgo(15),
          lastFertilized: null,
          notes: "Low maintenance beauty",
          gardenId: gardens[1]?.id,
          plantSpeciesId: plantSpecies[3]?.id
        },
        {
          nickname: "Aloe Vera",
          location: "Bathroom counter",
          healthStatus: "Critical",
          lastWatered: daysAgo(30),
          lastFertilized: daysAgo(60),
          notes: "Needs urgent care!",
          gardenId: gardens[1]?.id,
          plantSpeciesId: plantSpecies[4]?.id
        },
        {
          nickname: "Peace Lily",
          location: "Bedroom desk",
          healthStatus: "Good",
          lastWatered: daysAgo(3),
          lastFertilized: daysAgo(20),
          notes: "Air purifier extraordinaire",
          gardenId: gardens[0]?.id,
          plantSpeciesId: plantSpecies[5]?.id
        }
      ];

      for (const plantInfo of plantsToCreate) {
        try {
          await prisma.plant.create({
            data: {
              ...plantInfo,
              userId: testUser.id
            }
          });
          console.log(`✅ Planted: ${plantInfo.nickname}`);
        } catch (error) {
          console.error(`❌ Error planting ${plantInfo.nickname}:`, error.message);
        }
      }
    }
  }

  console.log("\n🌱 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

