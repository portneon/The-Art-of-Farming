const prisma = require('../../db/mysqlCient');

require('dotenv').config();

const PLANT_CATALOG = [
  {
    common_name: "Monstera Deliciosa",
    scientific_name: "Monstera deliciosa",
    family: "Araceae",
    origin: "Southern Mexico",
    price: "$45.00",
    description: "The Swiss Cheese Plant is famous for its natural leaf holes, known as fenestrations. A fast-growing climber that adds an instant tropical feel to any space. In the wild, these holes allow wind to pass through the large leaves without tearing them.",
    care_water: "Water every 1-2 weeks, allowing soil to dry out between waterings.",
    care_light: "Thrives in bright to medium indirect light. Not suited for intense, direct sun.",
    care_humidity: "Prefers a humid environment. Mist weekly.",
    care_temperature: "65°F-85°F (18°C-30°C).",
    image_url: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800"
  },
  {
    common_name: "Fiddle Leaf Fig",
    scientific_name: "Ficus lyrata",
    family: "Moraceae",
    origin: "West Africa",
    price: "$60.00",
    description: "Known for its broad, violin-shaped leaves. A statement piece for any room, but known for being a bit dramatic if its conditions aren't met perfectly.",
    care_water: "Water only when the top inch of soil is dry.",
    care_light: "Requires bright, consistent indirect light.",
    care_humidity: "Loves humidity. Keep away from drafts.",
    care_temperature: "60°F-75°F (15°C-24°C).",
    image_url: "https://images.unsplash.com/photo-1612470120215-68048126b38c?auto=format&fit=crop&q=80&w=800"
  },
  {
    common_name: "Snake Plant",
    scientific_name: "Dracaena trifasciata",
    family: "Asparagaceae",
    origin: "West Africa",
    price: "$25.00",
    description: "An exceptionally resilient succulent that thrives on neglect. Known for its air-purifying abilities and striking vertical growth pattern. Perfect for beginners.",
    care_water: "Water sparingly, every 2-3 weeks. Allow soil to dry completely between waterings.",
    care_light: "Tolerates low to bright indirect light. Can even survive in dim corners.",
    care_humidity: "Low humidity tolerant. Does not require misting.",
    care_temperature: "60°F-75°F (15°C-24°C).",
    image_url: "https://images.unsplash.com/photo-1599598425947-321124233f2e?auto=format&fit=crop&q=80&w=800"
  },
  {
    common_name: "Rubber Plant",
    scientific_name: "Ficus elastica",
    family: "Moraceae",
    origin: "South Asia",
    price: "$50.00",
    description: "A bold, sculptural plant with glossy leaves. Grows tall and makes a strong statement in any interior. Responds well to pruning to achieve desired shape.",
    care_water: "Water when top inch of soil is dry. Prefers slightly moist (not soggy) soil.",
    care_light: "Bright, indirect light. Can tolerate some direct morning sun.",
    care_humidity: "Moderate humidity. Wipe leaves monthly to maintain shine.",
    care_temperature: "65°F-75°F (18°C-24°C).",
    image_url: "https://images.unsplash.com/photo-1598887142487-3c825a0b943d?auto=format&fit=crop&q=80&w=800"
  },
  {
    common_name: "Bird of Paradise",
    scientific_name: "Strelitzia reginae",
    family: "Strelitziaceae",
    origin: "South Africa",
    price: "$55.00",
    description: "Famous for its exotic, colorful flowers that resemble a tropical bird. A stunning focal point in any space, rewarding patient growers with brilliant blooms.",
    care_water: "Water regularly during growing season. Allow soil to dry slightly between waterings.",
    care_light: "Requires bright, direct light to bloom. At least 6 hours of sun daily.",
    care_humidity: "Moderate humidity. Benefits from occasional misting.",
    care_temperature: "50°F-65°F (10°C-18°C) for best blooming.",
    image_url: "https://images.unsplash.com/photo-1545641203-7d072a14e3b2?auto=format&fit=crop&q=80&w=800"
  },
  {
    common_name: "Pothos",
    scientific_name: "Epipremnum aureum",
    family: "Araceae",
    origin: "French Polynesia",
    price: "$20.00",
    description: "A trailing vine perfect for hanging baskets and shelves. Extremely easy to grow and propagate. Air-purifying properties make it ideal for offices and bedrooms.",
    care_water: "Water when top inch of soil is dry. Tolerates underwatering better than overwatering.",
    care_light: "Low to bright indirect light. Variegation is more pronounced in brighter conditions.",
    care_humidity: "Low to moderate humidity. Drought tolerant.",
    care_temperature: "65°F-85°F (18°C-30°C).",
    image_url: "https://images.unsplash.com/photo-1596724852959-9f43c2c4b547?auto=format&fit=crop&q=80&w=800"
  },

];

async function main() {
  console.log("🌱 Starting plant catalog seed...");

  try {
    let addedCount = 0;
    for (const plantData of PLANT_CATALOG) {
      try {
        const species = await prisma.plantSpecies.create({
          data: {
            common_name: plantData.common_name,
            scientific_name: plantData.scientific_name,
            family: plantData.family,
            origin: plantData.origin,
            price: plantData.price,
            description: plantData.description,
            care_water: plantData.care_water,
            care_light: plantData.care_light,
            care_humidity: plantData.care_humidity,
            care_temperature: plantData.care_temperature,
            image_url: plantData.image_url
          }
        });
        console.log(`✅ Added: ${plantData.common_name}`);
        addedCount++;
      } catch (plantError) {
        if (plantError.code === 'P2002') {
          console.log(`⚠️  Skipped (already exists): ${plantData.common_name}`);
        } else {
          throw plantError;
        }
      }
    }

    console.log("\n✅ 🌱 Plant catalog seeded successfully!");
    console.log(`Total plants added: ${addedCount}`);

  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
