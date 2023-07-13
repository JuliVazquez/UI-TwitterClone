# Mobile
## Configuración y ejecución del proyecto
Antes de comenzar, es importante asegurarse de tener npm instalado en el sistema. Los pasos son los siguientes:


1. En la ubicación actual de la terminal (por ejemplo, `~/2023s1-Grupo02/Mobile/`), se debe crear un archivo llamado `.env` basado en el archivo de ejemplo **`.env-example.`**

2. Abrir el archivo .env y reemplazar la sección correspondiente a la IP de la API por la dirección IP y el puerto donde se encuentra alojada la API. Por ejemplo, si la API se encuentra en la IP `192.168.0.100` y utiliza el puerto `7000`, en el archivo `.env` tiene que verse así: `API_URL=http://192.168.0.100:7000` 

3. Guardar y cerrar el archivo `.env`

4. Desde la ubicación actual de la terminal, ejecutar el siguiente comando para instalar las dependencias del proyecto:
  ```
  npm install
  ```
5. Después, hay que ejecutar el siguiente comando para iniciar el proyecto:
```
npx expo start --clear --android
```
6. Si prefieren utilizar un emulador Android, es importante tenerlo instalado y en funcionamiento previamente. De lo contrario, al ejecutar el comando expo start, se mostrará un código QR para usar su celular.
7. Para escanear el código QR, se tiene que usar la aplicación Expo Go en su celular. Asegúrense de que el celular esté conectado a la misma red que la computadora.

**La clave principal para que el proyecto funcione correctamente es asegurarse de configurar el archivo .env con la dirección IP y el puerto correctos de la API. Esto es fundamental para que la aplicación pueda comunicarse con la API y obtener los datos.**

## Modificaciones realizadas

Debido a correciones del TP 2 para evitar el re-fetch hacia la API para obtener la foto de perfil de los usuarios, se modificó el metodo de la api para obtener un tweet, en el cual dentro de ese tweet, muestra la foto de perfil del usuario.
El atributo se llama profilePic