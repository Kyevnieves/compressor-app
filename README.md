# compressor-app
Aplicación de Compresión de Imágenes
Aplicación web para comprimir imágenes utilizando las siguientes tecnologías:

Sharp
File Uploader
Bcrypt
JWT
Cloudinary
MongoDB
Cookie para la sesión
Instalación
npm install
Configuración
Variables de entorno
Crear un archivo .env en la raíz del proyecto y establecer las siguientes variables de entorno:

CLOUDINARY_CLOUD_NAME=<nombre del cloudinary cloud>
CLOUDINARY_API_KEY=<api key de cloudinary>
CLOUDINARY_API_SECRET=<api secret de cloudinary>
JWT_SECRET=<clave secreta para jwt>
MONGODB_URI=<MONGO DB URI>
Configuración de File Uploader
En el archivo config.js se deben establecer las configuraciones de File Uploader:

Uso
Iniciar la aplicación:

npm run start
Abrir un navegador web y visitar:

http://localhost:4000/
La aplicación permitirá al usuario subir una imagen y comprimirla utilizando la biblioteca Sharp. La imagen comprimida se cargará en Cloudinary y se eliminara del disco duro el archivo temporal (para no almacenar imagenes en nuestro servicio).

La aplicación requerirá que el usuario inicie sesión con un nombre de usuario y contraseña válidos. El servidor generará y enviará un token JWT al cliente para su posterior autenticación en las solicitudes posteriores.

La sesión del usuario se maneja utilizando cookies.
Los usuarios se guardan en una BD mongo
Contribuir
Si desea contribuir a este proyecto, no dude en enviar una solicitud de extracción. Estaré encantado de revisar y fusionar cualquier adición útil.
