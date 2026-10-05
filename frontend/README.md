# Gestión de Casos

Frontend Angular para consultar y administrar casos mediante la API REST de la práctica.

## Funcionalidades

- Listado paginado con búsqueda global por título, responsable o id.
- Filtros por estado y prioridad.
- Consulta de detalle, alta, edición y eliminación confirmada.
- Formularios reactivos con validación y mensajes de resultado.
- Estados de carga, error, listado vacío y búsqueda sin resultados.
- Responsables cargados desde la API; la asignación puede quedar vacía.

## Requisitos

- Node.js y npm.
- API disponible en `http://localhost:3000/api`.

La documentación de la API está en `http://localhost:3000/api/docs`.

## Instalación y ejecución

Desde el directorio del frontend, donde se encuentra `package.json`:

```bash
npm install
npm start
```

La aplicación queda disponible en `http://localhost:4200`.

Comandos adicionales:

```bash
npm run build
```

## Tecnologías

- Angular 22 y TypeScript.
- Angular Router y componentes standalone.
- Formularios reactivos.
- `HttpClient` y RxJS.
- Angular CDK y SCSS.

## Estructura

```text
src/app/
├── core/          Servicios transversales
├── environments/  Configuración de la URL base de la API
├── features/
│   ├── models/    Modelos de casos y responsables
│   ├── pages/     Pantallas y flujos de la aplicación
│   └── services/  Comunicación HTTP de cada dominio
└── shared/        Componentes reutilizables
```

## Decisiones técnicas

- La aplicación usa componentes standalone y Angular Router, sin módulos de funcionalidad.
- Las llamadas HTTP se centralizan en servicios; los componentes coordinan la interfaz y los formularios.
- Los formularios de alta y edición son reactivos y usan controles tipados.
- El listado usa paginación de la API. La búsqueda de texto es global y local sobre los casos que coinciden con los filtros; sus páginas se reutilizan por combinación de filtros y la caché se invalida al crear, modificar o eliminar.
- La URL base se configura en `src/app/environments/environment.ts`.
