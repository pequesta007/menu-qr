export default function AdminPage() {
  return (
    <div className="card">
      <h1 className="text-2xl font-bold">Panel Admin</h1>
      <p className="mt-2">Aquí irán: CRUD de categorías y platos, subida de imágenes, reportes diarios/semanales/mensuales.</p>
      <ul className="list-disc ml-6 mt-3">
        <li>Reporte rápido: /api/reports/daily?date=YYYY-MM-DD</li>
        <li>Reporte semanal: /api/reports/weekly?start=YYYY-MM-DD</li>
        <li>Reporte mensual: /api/reports/monthly?year=YYYY&month=MM</li>
      </ul>
    </div>
  )
}
