# Herramientas
Se debe de tener las siguientes herramientas instaladas
- MySQL
- NODEJS

# Instalar los paquetes de node
Ejecutar el comando
```
npm install
```

# Configurar base de datos
Para esto se debe de crear una base de datos y se debe de poner los datos en las variables de configuración en el siguiente paso.

# configurar variables de ambiente
Para esto se puede crear un archivo .env en la raiz del proyecto o configurarlas por el sistema operativo, las variables a configurar son:
```
PORT=
USERNAMEDB=
PASSWORD=
DATABASE=
HOST=
SECRET=
BRAVENEWCOIN_KEY=
```

# Ejecutar el script para generar las tablas
Para esto ejecutamos el siguiente comando
```
npm run setupDatabase
```

# Ejecutar el servidor de desarrollo
Para esto se ejecuta el siguiente comando:
Para esto ejecutamos el siguiente comando
```
npm run dev
```