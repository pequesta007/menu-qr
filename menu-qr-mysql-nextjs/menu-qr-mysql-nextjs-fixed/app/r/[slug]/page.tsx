import React from 'react'

async function getMenu(slug: string) {
  const res = await fetch(`/api/menu/${slug}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('No se pudo cargar el menú')
  return res.json()
}

export default async function MenuPage({ params }: { params: { slug: string } }) {
  const data = await getMenu(params.slug)

  return (
    <div>
      <h1 className="text-2xl font-bold">{data.restaurant.name}</h1>
      <div className="mt-3 flex gap-2 overflow-x-auto">
        {data.categories.map((c: any) => (
          <span key={c.id} className="chip">{c.name}</span>
        ))}
      </div>

      {data.categories.map((cat: any) => (
        <section key={cat.id} className="mt-5">
          <h2 className="text-xl font-semibold">{cat.name}</h2>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cat.items.map((item: any) => (
              <article key={item.id} className="card">
                <div className="flex items-start gap-3">
                  {item.image_url && <img src={item.image_url} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <span className="font-semibold">S/ {Number(item.price).toFixed(2)}</span>
                    </div>
                    {item.description && <p className="text-sm mt-1 opacity-80">{item.description}</p>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
