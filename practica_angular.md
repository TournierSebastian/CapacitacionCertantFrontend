# Práctica Angular: gestión de casos

## Contexto

Se dispone de una API REST para administrar casos y responsables. El objetivo es desarrollar desde cero una aplicación frontend en Angular que permita consultar y gestionar los casos registrados.

La API ya se encuentra implementada. Su documentación y los endpoints disponibles pueden consultarse mediante Swagger.

## Objetivo

Construir una aplicación Angular que permita:

* Consultar el listado de casos.
* Ver el detalle de un caso.
* Crear un nuevo caso.
* Modificar un caso existente.
* Eliminar un caso.
* Buscar y filtrar casos.
* Visualizar correctamente los estados de carga, ausencia de datos y error.

## Requerimientos funcionales

### 1. Listado de casos

Crear una pantalla que muestre los casos en una tabla o en tarjetas.

Por cada caso se deberá visualizar, como mínimo:

* Identificador.
* Título.
* Estado.
* Prioridad.
* Responsable asignado.
* Fecha de creación.
* Acciones disponibles.

La pantalla deberá incluir:

* Búsqueda por texto.
* Filtro por estado.
* Filtro por prioridad.
* Paginación.
* Botón para crear un caso.
* Acceso al detalle y edición de cada caso.

### 2. Detalle de un caso

Crear una pantalla que permita consultar toda la información de un caso seleccionado.

Si el identificador no existe, la aplicación deberá mostrar un mensaje claro y permitir regresar al listado.

### 3. Creación de casos

Crear un formulario reactivo con los siguientes campos:

* Título.
* Descripción.
* Estado.
* Prioridad.
* Responsable.

El campo responsable puede quedar sin asignar.

El formulario deberá:

* Validar los campos antes de enviarlos.
* Mostrar mensajes de validación junto a cada campo.
* Evitar el envío cuando los datos sean inválidos.
* Informar si la operación fue exitosa.
* Mostrar el error devuelto por la API si la operación falla.

### 4. Edición de casos

Permitir modificar un caso existente utilizando un formulario precargado con sus datos actuales.

Al guardar los cambios, la aplicación deberá actualizar la información mostrada y comunicar el resultado de la operación.

### 5. Eliminación de casos

Permitir eliminar un caso solicitando previamente una confirmación.

La interfaz deberá actualizarse después de una eliminación exitosa.

### 6. Estados de la interfaz

Cada pantalla deberá contemplar:

* Estado de carga.
* Error de comunicación con la API.
* Listado sin registros.
* Búsqueda o filtro sin resultados.
* Operación realizada correctamente.

## Requerimientos técnicos

La solución deberá utilizar:

* No se debe modificar el backend
* Angular con componentes standalone.
* Angular Router.
* `HttpClient`.
* Formularios reactivos.
* Interfaces TypeScript para representar los datos.
* Servicios para centralizar la comunicación con la API.
* Separación entre componentes, servicios y modelos.
* Variables de entorno o configuración para la URL base de la API.

No se deberá colocar lógica de comunicación HTTP directamente en los componentes.

En esta etapa no es necesario implementar:

* Autenticación.
* Registro de usuarios.
* Administración de permisos.
* Contenerización del frontend.

## API

La documentación estará disponible en:

```text
http://localhost:3000/api/docs
```

Endpoints principales:

```text
GET    /api/casos
GET    /api/casos/:id
POST   /api/casos
PATCH  /api/casos/:id
DELETE /api/casos/:id
GET    /api/responsables
```

La aplicación deberá respetar los valores y las validaciones documentadas por la API.

## Entregables

Se deberá entregar:

* Código fuente del proyecto Angular.
* Archivo `README.md` con las instrucciones para instalar y ejecutar la aplicación.
* Breve explicación de la estructura utilizada.
* Registro de las decisiones técnicas más importantes.
* Repositorio Git con commits que permitan observar la evolución del trabajo.

## Criterios de aceptación

La práctica se considerará completa cuando:

* La aplicación pueda iniciarse siguiendo el README.
* Los casos puedan listarse, buscarse, filtrarse y paginarse.
* Sea posible consultar el detalle de un caso.
* Sea posible crear, modificar y eliminar casos.
* Los formularios validen correctamente los datos.
* Los responsables se obtengan desde la API.
* Se contemplen los estados de carga, error y ausencia de resultados.
* No existan llamadas HTTP duplicadas innecesariamente.
* La aplicación esté organizada de forma clara y consistente.
* El desarrollador pueda explicar las decisiones tomadas.

## Forma de trabajo sugerida

El desarrollo se realizará progresivamente:

1. Crear el proyecto y configurar `HttpClient`.
2. Definir las interfaces de datos.
3. Implementar el servicio de casos.
4. Mostrar el listado.
5. Incorporar detalle y navegación.
6. Crear el formulario de alta.
7. Incorporar edición y eliminación.
8. Agregar filtros y paginación.
9. Mejorar el manejo de carga, errores y estados vacíos.
10. Revisar y documentar la solución.

Se recomienda realizar un commit al finalizar cada avance significativo.
