import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const prismaAny = prisma as any;

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
    const existing = await prisma.service.findFirst({
      where: { title: data.title },
    });
    if (!existing) {
      await prisma.service.create({
        data,
      });
    } else {
      await prisma.service.update({
        where: { id: existing.id },
        data,
      });
    }
  }

  const testimonialsData = [
    {
      name: "Rafi Pratama",
      role: "Founder",
      company: "Urban Supply",
      content:
        "Tim ASDEV membantu kami merapikan website dan alur lead masuk. Hasilnya proses sales jadi jauh lebih cepat dan terukur.",
      avatarUrl: "/brand/asdev-logo-light.png",
      rating: 5,
      published: true,
      order: 1,
    },
    {
      name: "Nadia Putri",
      role: "Marketing Manager",
      company: "Aksara Edu",
      content:
        "Komunikasi clear, progres transparan, dan delivery cepat. Sangat membantu tim internal kami yang butuh partner eksekusi lincah.",
      avatarUrl: "/brand/asdev-logo-dark.png",
      rating: 5,
      published: true,
      order: 2,
    },
    {
      name: "Aditya Wijaya",
      role: "COO",
      company: "Nusantara Logistik",
      content:
        "Bukan cuma develop, tapi ikut mikir prioritas fitur dan dampak bisnisnya. Itu yang bikin kolaborasi terasa beda.",
      avatarUrl: "/brand/asdev-logo-light.png",
      rating: 5,
      published: true,
      order: 3,
    },
  ];

  for (const data of testimonialsData) {
    const existing = await prismaAny.testimonial.findFirst({
      where: { name: data.name, company: data.company },
    });
    if (!existing) {
      await prismaAny.testimonial.create({ data });
    } else {
      await prismaAny.testimonial.update({
        where: { id: existing.id },
        data,
      });
    }
  }

  // Portfolio (8 items), BlogArticles (5 published), ContactMessages (3)
  // ... similar

  console.log("✅ Database seeded with dummy data!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
