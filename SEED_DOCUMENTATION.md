# Plant Database Seed Documentation

## Overview

A comprehensive seed file has been created to populate the plant catalog database with detailed plant species information. This includes 10 popular plants with complete care instructions, botanical data, and image URLs.

## Files Created/Modified

### New Files
- **`backend/src/prisma/mysql/plantSeed.js`** - Main seed file containing 10 plant species with full metadata
- **`backend/src/prisma/migrations/add_plant_species/migration.sql`** - SQL migration for the new `PlantSpecies` table

### Modified Files
- **`backend/src/prisma/mysql/schema.prisma`** - Added new `PlantSpecies` model
- **`backend/Dashboard/users/controllers/GetPlants.js`** - Updated to fetch from `PlantSpecies` instead of `Plant`
- **`backend/package.json`** - Added seed and migrate scripts

## Schema Changes

### New PlantSpecies Model

```prisma
model PlantSpecies {
  id                String @id @default(cuid())
  common_name       String
  scientific_name   String
  family            String
  origin            String
  price             String?
  description       String @db.LongText
  care_water        String @db.Text
  care_light        String @db.Text
  care_humidity     String @db.Text
  care_temperature  String @db.Text
  image_url         String
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Plants Seeded

1. **Monstera Deliciosa** - $45.00
   - Swiss Cheese Plant, tropical climber with unique fenestrations

2. **Fiddle Leaf Fig** - $60.00
   - Dramatic plant with violin-shaped leaves, requires consistent conditions

3. **Snake Plant** - $25.00
   - Hardy succulent, air-purifying, perfect for beginners

4. **Rubber Plant** - $50.00
   - Bold sculptural plant, responds well to pruning

5. **Bird of Paradise** - $55.00
   - Exotic flowers resembling tropical birds, rewards patient growers

6. **Pothos** - $20.00
   - Trailing vine, easy to propagate, excellent for beginners

7. **Holy Basil (Tulsi)** - $15.00
   - Sacred Ayurvedic herb, medicinal and culinary uses

8. **Aloe Vera** - $18.00
   - Healing succulent, minimal care requirements

9. **Hibiscus** - $35.00
   - Vibrant flowers, used for tea and hair oils

10. **Philodendron** - $30.00
    - Versatile climber with heart-shaped leaves

## How to Use

### 1. Run the Migration

First, ensure your database is accessible and run the migration to create the `PlantSpecies` table:

```bash
cd backend
npm run migrate
```

Or manually:
```bash
npx prisma migrate dev --name add_plant_species --schema="./src/prisma/mysql/schema.prisma"
```

### 2. Seed the Database

Run the seed file to populate the plant catalog:

```bash
cd backend
npm run seed
```

Or manually:
```bash
node src/prisma/mysql/plantSeed.js
```

Expected output:
```
🌱 Starting plant catalog seed...
✅ Added: Monstera Deliciosa
✅ Added: Fiddle Leaf Fig
✅ Added: Snake Plant
✅ Added: Rubber Plant
✅ Added: Bird of Paradise
✅ Added: Pothos
✅ Added: Holy Basil (Tulsi)
✅ Added: Aloe Vera
✅ Added: Hibiscus
✅ Added: Philodendron

✅ 🌱 Plant catalog seeded successfully!
Total plants added: 10
```

### 3. Verify the Data

Check that data was seeded by visiting:
```
http://localhost:3000/plants
```

The API should return a JSON array with all plant species.

## API Response Format

The `/plants` endpoint now returns:

```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": "cuid_hash",
      "common_name": "Monstera Deliciosa",
      "scientific_name": "Monstera deliciosa",
      "family": "Araceae",
      "origin": "Southern Mexico",
      "price": "$45.00",
      "description": "The Swiss Cheese Plant is famous for its natural leaf holes...",
      "care_water": "Water every 1-2 weeks...",
      "care_light": "Thrives in bright to medium indirect light...",
      "care_humidity": "Prefers a humid environment...",
      "care_temperature": "65°F-85°F (18°C-30°C).",
      "image_url": "https://images.unsplash.com/...",
      "createdAt": "2025-12-06T...",
      "updatedAt": "2025-12-06T..."
    },
    // ... more plants
  ]
}
```

## Frontend Integration

The frontend (`The-Art-of-Farming/src/Plants.jsx`) already fetches from `http://localhost:3000/api/plants`. To use the new API response format, update the frontend to handle the new structure:

### Current Frontend Fetch
```javascript
const response = await fetch("http://localhost:3000/api/plants");
const result = await response.json();
setPlants(result.data);  // Now correctly accesses the data array
```

## Notes

- **Idempotent Seeding**: The seed file uses `upsert` operations, so running it multiple times won't create duplicates
- **Image URLs**: All images are hosted on Unsplash and are publicly accessible
- **Care Information**: Each plant includes detailed water, light, humidity, and temperature requirements
- **Expandable**: Easily add more plants by adding objects to the `PLANT_CATALOG` array in `plantSeed.js`

## Troubleshooting

### Database Connection Error
Ensure your MySQL database is running and the `DATABASE_URL` in `.env` is correct.

### Migration Conflicts
If you have existing migrations, you may need to adjust the migration file path or reset:
```bash
npx prisma migrate resolve --rolled-back add_plant_species --schema="./src/prisma/mysql/schema.prisma"
```

### Seed Script Not Running
Ensure you're in the backend directory:
```bash
cd backend
npm run seed
```

## Adding More Plants

To add more plants, edit `backend/src/prisma/mysql/plantSeed.js` and add entries to the `PLANT_CATALOG` array:

```javascript
{
  common_name: "Your Plant Name",
  scientific_name: "Scientific name",
  family: "Plant Family",
  origin: "Origin Region",
  price: "$XX.00",
  description: "Plant description...",
  care_water: "Watering instructions...",
  care_light: "Light requirements...",
  care_humidity: "Humidity needs...",
  care_temperature: "Temperature range...",
  image_url: "https://image-url-here.com"
}
```

Then run `npm run seed` again.
