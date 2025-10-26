import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const restaurant = await prisma.restaurant.findUnique({ where: { slug: params.slug } })
  if (!restaurant) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })

  const categories = await prisma.category.findMany({
    where: { restaurantId: restaurant.id, isActive: true },
    orderBy: { position: 'asc' }
  })

  const items = await prisma.item.findMany({
    where: { restaurantId: restaurant.id, isActive: true },
    orderBy: { position: 'asc' }
  })

  const grouped = categories.map(c => ({
    id: c.id, name: c.name,
    items: items.filter(i => i.categoryId === c.id).map(i => ({
      id: i.id, name: i.name, price: i.price, image_url: i.imageUrl, description: i.description
    }))
  }))

  return NextResponse.json({ restaurant: { name: restaurant.name, slug: restaurant.slug }, categories: grouped })
}
