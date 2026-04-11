import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const hashedPassword = await bcrypt.hash("password", 12);
  await prisma.user.upsert({
    where: { email: "admin@asdev.id" },
    update: {},
    create: {
      email: "admin@asdev.id",
      password: hashedPassword,
      name: "Admin",
    },
  });

  // Services dummy data
  const servicesData = [
    {
      title: "Website Development",
      description: "Website responsif",
      icon: "🌐",
      detail: "Full-stack",
      image: "/services/website.jpg",
      order: 1,
    },
    {
      title: "Mobile App",
      description: "Android/iOS native",
      icon: "📱",
      detail: "React Native/Flutter",
      image: "/services/mobile.jpg",
      order: 2,
    },
    {
      title: "UI/UX Design",
      description: "Design modern",
      icon: "🎨",
      detail: "Figma/Adobe XD",
      image: "/services/design.jpg",
      order: 3,
    },
    // Add 3 more...
  ];

  for (const data of servicesData) {
    await prisma.service.upsert({
      where: { title: data.title },
      update: data,
      create: data,
    });
  }

  // Portfolio (8 items), BlogArticles (5 published), ContactMessages (3)
  // ... similar

  console.log("✅ Database seeded with dummy data!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
