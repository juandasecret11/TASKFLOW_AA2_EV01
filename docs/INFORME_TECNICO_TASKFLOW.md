# INFORME TÉCNICO – TASKFLOW

**Evidencia:** GA7-220501096-AA2-EV01  
**Proyecto:** TaskFlow – Sistema de gestión de tareas  
**Aprendiz:** Juan David Meneses  
**Programa:** Análisis y Desarrollo de Software – SENA

## 1. Objetivo

Desarrollar la codificación de un módulo de gestión de tareas que permita registrar, consultar, actualizar y eliminar actividades mediante una aplicación web conectada a una base de datos MySQL.

## 2. Descripción del sistema

TaskFlow es una aplicación web diseñada para organizar actividades personales, académicas y laborales. Permite administrar tareas, establecer categorías, fechas límite y prioridades, así como identificar las actividades pendientes y completadas.

## 3. Tecnologías utilizadas

- **Frontend:** React y JavaScript.
- **Herramienta de construcción:** Vite.
- **Backend:** Java 17 y Spring Boot.
- **Acceso a datos:** JDBC mediante Spring JdbcTemplate.
- **Base de datos:** MySQL.
- **Gestión de dependencias:** Maven y npm.
- **Control de versiones:** Git y GitHub.

## 4. Arquitectura del sistema

El sistema utiliza una arquitectura cliente-servidor:

1. El frontend desarrollado en React presenta la interfaz y recibe las acciones del usuario.
2. El backend desarrollado en Java recibe las solicitudes mediante una API REST.
3. La capa de repositorio utiliza JdbcTemplate para ejecutar consultas SQL.
4. MySQL almacena la información de las tareas.

## 5. Base de datos

Se creó la base de datos `taskflow_db`, que contiene la tabla `tasks`.

La tabla incluye los siguientes campos:

| Campo | Descripción |
|---|---|
| id | Identificador de la tarea |
| title | Nombre de la tarea |
| category | Categoría |
| due_date | Fecha límite |
| priority | Prioridad |
| done | Estado de finalización |
| created_at | Fecha de creación |

## 6. Funcionalidades CRUD

El módulo implementa las siguientes operaciones:

- **Crear (INSERT):** registrar nuevas tareas.
- **Consultar (SELECT):** obtener todas las tareas o consultar una por identificador.
- **Actualizar (UPDATE):** modificar los datos y el estado de las tareas.
- **Eliminar (DELETE):** borrar tareas de la base de datos.

## 7. Endpoints de la API

| Método HTTP | Endpoint | Función |
|---|---|---|
| GET | /api/tasks | Consultar tareas |
| GET | /api/tasks/{id} | Consultar una tarea |
| POST | /api/tasks | Crear una tarea |
| PUT | /api/tasks/{id} | Actualizar una tarea |
| DELETE | /api/tasks/{id} | Eliminar una tarea |

## 8. Pruebas realizadas

Durante la implementación se realizaron las siguientes comprobaciones:

- Compilación del backend mediante Maven.
- Inicio del servidor Spring Boot en el puerto 8080.
- Conexión del backend con MySQL.
- Consulta de tareas mediante la API REST.
- Registro de una tarea desde la interfaz web.
- Verificación de persistencia después de recargar la aplicación.
- Eliminación de una tarea y comprobación de que la tabla quedó sin registros.

Las operaciones de actualización están implementadas en el código; su validación independiente debe documentarse cuando se complete la prueba correspondiente.

## 9. Control de versiones

El proyecto utiliza Git para registrar sus cambios y GitHub para alojar el repositorio remoto.

**Repositorio del proyecto:**

https://github.com/juandasecret11/TASKFLOW_AA2_EV01

## 10. Conclusiones

El desarrollo de TaskFlow permitió implementar un módulo de gestión de tareas utilizando tecnologías web y conexión a bases de datos mediante JDBC.

La integración entre React, Java, Spring Boot y MySQL permite administrar la información mediante operaciones CRUD y mantener los datos almacenados de forma persistente.

El proyecto constituye la implementación del módulo de gestión de tareas correspondiente a la evidencia GA7-220501096-AA2-EV01.