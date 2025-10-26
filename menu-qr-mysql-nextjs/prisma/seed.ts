import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const rest = await prisma.restaurant.upsert({
    where: { slug: 'demo-cieneguilla' },
    update: {},
    create: {
      name: 'Demo Cieneguilla',
      slug: 'demo-cieneguilla',
    }
  });

  const cat1 = await prisma.category.create({
    data: { name: 'Entradas', position: 1, restaurantId: rest.id }
  });
  const cat2 = await prisma.category.create({
    data: { name: 'Fondos', position: 2, restaurantId: rest.id }
  });

  const causa = await prisma.item.create({
    data: {
      name: 'Causa Limeña',
      description: 'Papa amarilla con ají amarillo y pollo.',
      ingredients: 'papa, pollo, mayonesa, ají amarillo',
      allergens: 'huevo',
      price: 18.50,
      restaurantId: rest.id,
      categoryId: cat1.id
    }
  });

  const lomo = await prisma.item.create({
    data: {
      name: 'Lomo Saltado',
      description: 'Clásico salteado peruano.',
      ingredients: 'lomo, cebolla, tomate, papas',
      price: 28.00,
      restaurantId: rest.id,
      categoryId: cat2.id
    }
  });

  console.log('Seed listo:', { rest, cat1, cat2, causa, lomo });
}

main().finally(() => prisma.$disconnect());
