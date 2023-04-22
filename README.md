
# Newsletter Buddy

Newsletter Buddy es una aplicación para el envío de boletines informativos. 

## Estructura del proyecto

El proyecto consta de las siguientes partes:

-   Base de datos: PostgreSQL como sistema de gestión de bases de datos.
-   Backend: Construido con Node.js, utilizando TypeScript como lenguaje de programación y Fastify como marco de aplicación web.
-   Frontend: Utiliza Preact como biblioteca de interfaz de usuario, Vite como herramienta de construcción y desarrollo, y pnpm como administrador de paquetes.


 ## Cómo ejecutar la aplicación

### Producción

1. Clone este repositorio y cambie al directorio clonado.
2. Cree el archivo `docker/production/backend.env`. 

Para fines de prueba, puede utilizar el siguiente contenido:
```
# Server

NODE_ENV=production PORT=3000

# Database

DATABASE_URL=postgresql://username:password@psql_db:5432/newsletter_buddy

# SMTP Service

`EMAIl_PROVIDER`=gmail
`EMAIl_USER`=[your_email@gmail.com]
`EMAIL_PASSWORD`=your_email_password
```
3. Cree el archivo `docker/production/frontend.env`. Puede utilizar esta configuración:

```
 #APP

NODE_ENV=production
```


 4. Ejecute el proyecto utilizando `docker-compose -f docker-compose.production.yml up --build`. En versiones más recientes, la CLI de docker-compose está incluida en la CLI de Docker, por lo que debe usar `docker compose` en lugar de `docker-compose`.
5. Vaya a http://localhost:8000 y verifique que está obteniendo la página "Send Newsletter".

### Desarrollo

Dado que estamos vinculando volúmenes para cada servicio, es necesario acceder a los servicios para instalar las dependencias, ya que Docker no puede crear archivos en nuestro directorio.

1. Clone este repositorio y cambie al directorio clonado.
2. Recuerda cambiar los valores de las varibales de entorno de los .env de local en `docker/local` debes cambiar los calores de `backend.env` y `frontend.env`
3. Instale las dependencias del backend con los siguientes comandos:

`docker-compose -f docker-compose.local.yml run --rm backend bash pnpm install exit`

4. Instale las dependencias del frontend con los siguientes comandos:` 

`docker-compose -f docker-compose.local.yml run --rm frontend bash pnpm install exit`

5. Ejecute todos los servicios juntos con `docker-compose -f docker-compose.local.yml up`.

## Tecnologías utilizadas

- Base de datos: PostgreSQL
- Backend: Node.js, TypeScript, Fastify
- Frontend: Preact, Vite, pnpm

## Arquitectura

 La aplicación sigue una arquitectura típica de aplicaciones web modernas, que consta de un frontend construido con Preact, un backend construido con Node.js y TypeScript y una base de datos PostgreSQL. La aplicación se divide en componentes modulares y se utiliza una estructura de directorios clara para organizar el código fuente y los archivos de configuración. El uso de Docker y docker-compose permite una fácil implementación y despliegue tanto en entornos de desarrollo como de producción. La configuración de Docker está organizada en dos carpetas separadas (`local` y `production`) dentro del directorio `docker`. Esto permite mantener separadas las configuraciones específicas del entorno y facilita el mantenimiento del proyecto.

La aplicación cuenta con las siguientes características principales:

1.  Permite al usuario administrador cargar un archivo PDF o PNG (el boletín).
2.  El usuario administrador puede enviar una lista de correo electrónico de los destinatarios del boletín.
3.  El usuario administrador puede agregar un solo correo electrónico a la lista de destinatarios.
4.  El usuario administrador puede hacer clic en un botón para activar el envío del boletín.
5.  El documento PDF o PNG se adjunta al correo electrónico.
6.  Los usuarios destinatarios pueden hacer clic en un enlace "darse de baja" contenido en el correo electrónico, y no deberían recibir más correos electrónicos.

## Resumen

Esta aplicación es una solución completa para la gestión y envío de boletines por correo electrónico. Utiliza tecnologías modernas y prácticas recomendadas para brindar una experiencia de usuario sólida y escalable. El uso de Docker y la estructura de directorios clara facilitan la implementación y el mantenimiento del proyecto.

Para obtener más información sobre cómo ejecutar y utilizar la aplicación, consulte las instrucciones de configuración y ejecución mencionadas anteriormente en este archivo README.