# Proyecto: API con Docker Compose y MongoDB

Este proyecto despliega un entorno compuesto por tres contenedores Docker:
1. **API 1**: Recibe solicitudes de usuarios y realiza una comunicación con **API 2**.
2. **API 2**: Gestiona la conexión con una base de datos MongoDB para insertar y contar registros de usuarios.
3. **MongoDB**: Base de datos para almacenar y consultar la información de usuarios.

## 🛠️ Requisitos

Asegúrate de tener instalados los siguientes elementos en tu sistema:
- [Docker](https://www.docker.com/)

---

## 🚀 Instrucciones para levantar el entorno

Sigue estos pasos para construir y ejecutar los contenedores:

1. Construye las imágenes de los contenedores:
   ```bash
   docker-compose build
   ```
2. Levanta los servicios definidos en el archivo `docker-compose.yml`:
   ```bash
   docker-compose up
   ```

---

## 📂 Estructura del proyecto

### API 1
- **Tecnologías:** Node.js y Express.js
- **Puerto:** `3000`
- **Descripción:**  
  Esta API recibe el nombre de un usuario mediante una solicitud POST. Internamente, se comunica con **API 2** para obtener el número de veces que dicho usuario aparece en la base de datos. La respuesta final se envía al cliente.

### API 2
- **Tecnologías:** Node.js, Express.js y Mongoose
- **Puerto:** `3001`
- **Descripción:**  
  Recibe el nombre de un usuario desde **API 1** y lo guarda en una colección de MongoDB. Posteriormente, consulta cuántas veces aparece el usuario en la colección y devuelve este conteo a **API 1**.

### MongoDB
- **Tecnología:** MongoDB
- **Puerto:** `27017`
- **Descripción:**  
  Base de datos utilizada para almacenar los registros de usuarios. Cada registro corresponde al nombre del usuario enviado desde **API 2**.

---

## 🔄 Llamadas a las APIs

Puedes probar las APIs usando `curl` o herramientas como [Postman](https://www.postman.com/). A continuación, algunos ejemplos de pruebas:

### Ejemplo de llamada a **API 1**
Envía una solicitud POST con un JSON que contiene el nombre de un usuario.

#### Comando:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"user": "John"}' http://localhost:3000/
```

#### Respuesta esperada:
La respuesta será un JSON con el conteo de veces que el usuario aparece en la base de datos. Ejemplo:
```json
{
  "count": 1
}
```

#### Otro ejemplo:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"user": "Cesar"}' http://localhost:3000/
```

---

## 🛠️ Tecnologías utilizadas
- **Node.js**: Framework principal para construir las APIs.
- **Express.js**: Framework de Node.js para manejar rutas y middleware.
- **Mongoose**: ODM (Object Document Mapper) para gestionar la conexión con MongoDB.
- **MongoDB**: Base de datos NoSQL para almacenamiento de datos.
- **Docker**: Para contenerizar y orquestar los servicios.
- **Docker Compose**: Para definir y administrar los servicios del proyecto.

---

## 📝 Notas
- Asegúrate de que no hay servicios ocupando los puertos `3000`, `3001` o `27018` antes de levantar los contenedores.
- Los datos de la base de datos se almacenan en un volumen persistente definido en el archivo `docker-compose.yml`.
