export default function Home() {
  return (
    <div className="card">
      <h1 className="text-2xl font-bold">Proyecto: Carta Digital con QR</h1>
      <p className="mt-2">Escanea un QR del tipo <code>/r/demo-cieneguilla</code> para ver un menú público.</p>
      <ul className="list-disc ml-6 mt-3">
        <li><a className="text-blue-600 underline" href="/r/demo-cieneguilla">Ver menú de demo</a></li>
        <li><a className="text-blue-600 underline" href="/employee">Panel de empleado (demo)</a></li>
        <li><a className="text-blue-600 underline" href="/admin">Panel de admin (placeholder)</a></li>
      </ul>
    </div>
  )
}
