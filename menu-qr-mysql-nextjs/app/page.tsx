'use client'
import React, { useEffect, useState } from 'react'

type Order = {
  id: string
  type: 'dine_in' | 'takeaway'
  status: string
  tableNumber?: string
  createdAt: string
  items: {
    id: string
    name: string
    quantity: number
    note?: string
    serveFor: 'to_table' | 'to_go'
    status: string
  }[]
}

export default function EmployeePage() {
  const [orders, setOrders] = useState<Order[]>([])

  async function load() {
    const res = await fetch('/api/orders?status=pending', { cache: 'no-store' })
    const data = await res.json()
    setOrders(data.orders || [])
  }

  useEffect(() => {
    load()
    const t = setInterval(load, 5000)
    return () => clearInterval(t)
  }, [])

  async function updateItem(id: string, status: string) {
    await fetch('/api/orders/item', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    load()
  }

  async function updateOrder(id: string, status: string) {
    await fetch('/api/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    load()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Panel de Empleado</h1>
      <p className="opacity-80">
        Actualiza estados (pendiente → preparando → listo → servido).
      </p>
      <div className="grid gap-4 mt-4">
        {orders.map((o) => (
          <div key={o.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Pedido #{o.id.slice(0, 8)}</div>
                <div className="text-sm opacity-70">
                  {o.type === 'dine_in'
                    ? `Mesa ${o.tableNumber || '-'}`
                    : 'Para llevar'}
                </div>
              </div>
              <button
                className="btn btn-outline"
                onClick={() => updateOrder(o.id, 'ready')}
              >
                Marcar listo
              </button>
            </div>
            <div className="mt-3 grid gap-2">
              {o.items.map((it) => (
                <div key={it.id} className="border rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">
                        {it.quantity}× {it.name}
                      </div>
                      {it.note && (
                        <div className="text-sm opacity-70">Nota: {it.note}</div>
                      )}
                      <div className="text-xs opacity-60">
                        Entrega: {it.serveFor === 'to_go' ? 'Para llevar' : 'A mesa'}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-outline"
                        onClick={() => updateItem(it.id, 'preparing')}
                      >
                        Preparando
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => updateItem(it.id, 'ready')}
                      >
                        Listo
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
