# Menu QR (MySQL + Next.js + Prisma)

Proyecto base para carta digital con QR, panel de empleado y admin (placeholder). Responsive para móviles.

## Requisitos
- Node 18+
- MySQL (PlanetScale/AWS RDS/Local)
- PNPM/NPM/Yarn
- (Opcional) Seed con datos demo

## Pasos
1) Clona el repo y entra a la carpeta:
```bash
npm install
cp .env.example .env
# Edita DATABASE_URL y NEXT_PUBLIC_BASE_URL
```

2) **Prisma**
```bash
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```

3) **Dev**
```bash
npm run dev
# Abre http://localhost:3000
```

4) Prueba
- Menú público: `http://localhost:3000/r/demo-cieneguilla`
- Empleado: `http://localhost:3000/employee`
- Admin: `http://localhost:3000/admin` (placeholder)

## Notas
- Falta auth (recomendado: sessions HttpOnly + roles).
- Agrega subida de imágenes (S3 / Cloud Storage).
- Para QR, basta generar un código con URL `/r/[slug]`.
- Para realtime (nuevos pedidos), usa Pusher o WebSockets.
