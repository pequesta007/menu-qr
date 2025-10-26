import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function PATCH(req: Request) {
  const body = await req.json()
  if (body.id && body.status) {
    const it = await prisma.orderItem.update({ where: { id: body.id }, data: { status: body.status } })
    return NextResponse.json({ ok: true, item: it })
  }
  return NextResponse.json({ error: 'Parámetros inválidos' }, { status: 400 })
}
