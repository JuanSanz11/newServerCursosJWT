
# Back end con APIS - Docker - Node.js - JWT

Este proyecto es una API backend avanzada construida con Node.js, Fastify, Drizzle ORM y Docker. Incluye autenticación JWT, gestión de cursos, integración con base de datos y documentación con Swagger.

## Tecnologías Utilizadas
- **Node.js**
- **Fastify**
- **Drizzle ORM**
- **Docker & Docker Compose**
- **TypeScript**
- **Swagger**
- **Scalar**
--

## Estructura del Proyecto
```
docker-compose.yml
package.json
drizzle.config.ts
requisiciones.http
tsconfig.json
drizzle/
routes/
src/
```

## Funcionalidades Principales
- Autenticación JWT
- Gestión de usuarios y cursos
- Rutas protegidas por roles (student/manager)
- Documentación automática con Swagger y Scalar APIs
- Scripts SQL versionados
- Seed y migración de base de datos

## Cómo ejecutar el proyecto
1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia la base de datos y los servicios con Docker:
   ```bash
   docker-compose up -d
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Accede a la documentación Swagger en: `http://localhost:PUERTO/swagger`

## Scripts Útiles
- `npm run dev` — Inicia el servidor en modo desarrollo
- `npm run db:studio` — Abre Prisma Studio para visualizar los datos

## Organización de Carpetas
- `src/` — Código principal de la aplicación
- `routes/` — Rutas de la API
- `drizzle/` — Migraciones y snapshots de la base de datos
- `db/` — Cliente, esquema y seed de la base de datos
- `utils/` — Funciones utilitarias


variavles ambientes

NODE_ENV=development

DATABASE_URL=postgresql://admin:senha@localhost:5440/mi_db


JWT_SECRET=minhachavedireta
## Autor
JuanSanz11
- JuanSanz11

---
Sinta-se à vontade para contribuir ou abrir issues!
