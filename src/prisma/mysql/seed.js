const prisma = require('../../db/mysqlCient');

require('dotenv').config();

async function main() {
  console.log("🌱 Seeding database...");

  // Create a user
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password: "hashedpassword123", 
      plants: {
        create: [
          {
            nickname: "Aloe Vera",
            location: "Living Room",
          },
          {
            nickname: "Money Plant",
            location: "Bedroom",
          }
        ]
      }
    }
  });

  console.log("Created user with plants:", user.id);

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
