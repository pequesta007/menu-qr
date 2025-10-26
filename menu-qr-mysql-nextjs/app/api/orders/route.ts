import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const status = url.searchParams.get('status') as any
  const orders = await prisma.order.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { item: true } } }
  })
  return NextResponse.json({
    orders: orders.map(o => ({
      id: o.id,
      type: o.type,
      status: o.status,
      tableNumber: o.tableNumber ?? undefined,
      createdAt: o.createdAt,
      items: o.items.map(oi => ({
        id: oi.id,
        name: oi.item.name,
        quantity: oi.quantity,
        note: oi.note ?? undefined,
        serveFor: oi.serveFor,
        status: oi.status
      }))
    }))
  })
}

export async function POST(req: Request) {
  const body = await req.json()
  const { restaurantSlug, type, tableNumber, items } = body
  const rest = await prisma.restaurant.findUnique({ where: { slug: restaurantSlug } })
  if (!rest) return NextResponse.json({ error: 'Restaurante no existe' }, { status: 404 })

  // Fetch item prices
  const itemIds = items.map((i: any) => i.itemId)
  const dbItems = await prisma.item.findMany({ where: { id: { in: itemIds }, restaurantId: rest.id } })
  const byId: any = {}; dbItems.forEach(i => byId[i.id] = i)

  let total = 0
  const orderItemsData = items.map((i: any) => {
    const unitPrice = Number(byId[i.itemId]?.price || 0)
    total += unitPrice * i.quantity
    return {
      itemId: i.itemId,
      quantity: i.quantity,
      unitPrice,
      note: i.note || null,
      serveFor: i.serveFor === 'to_go' ? 'to_go' : 'to_table',
    }
  })

  const order = await prisma.order.create({
    data: {
      restaurantId: rest.id,
      type: type === 'takeaway' ? 'takeaway' : 'dine_in',
      tableNumber: tableNumber || null,
      total,
      items: { create: orderItemsData }
    },
    include: { items: true }
  })

  return NextResponse.json({ orderId: order.id, total })
}

export async function PATCH(req: Request) {
  const body = await req.json()
  if (body.id && body.status) {
    const order = await prisma.order.update({ where: { id: body.id }, data: { status: body.status } })
    return NextResponse.json({ ok: true, order })
  }
  return NextResponse.json({ error: 'Parámetros inválidos' }, { status: 400 })
}
