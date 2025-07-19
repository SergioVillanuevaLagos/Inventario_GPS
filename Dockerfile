# Usamos una imagen ligera de Node.js
FROM node:16-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias primero (para aprovechar cache)
COPY package*.json ./

# Instalamos solo las dependencias de producción
RUN npm install --production

# Copiamos el resto del código al contenedor
COPY . .

# Creamos la carpeta para logs (si tu app los usa)
RUN mkdir -p logs

# Exponemos el puerto que usa la app
EXPOSE 3001

# Comando para iniciar la app
CMD ["node", "server.js"]
