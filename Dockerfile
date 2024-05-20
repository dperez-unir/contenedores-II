#Verisón ligera y con soporte LTS
FROM node:16-alpine

# Se establece el el directorio de trabajo habitual
WORKDIR /usr/src/app

# Se copian los archivos de configuración de node
COPY package*.json ./

# Se instala lo necesario para ejecutar, eliminando la parte necesaria para el desarrollo, y se limpia la caché
RUN npm install --production && npm cache clean --force

# Se copian los ficheros específicos de la aplicación
COPY node/ ./

# Se expone el puerto 3000
EXPOSE 3000

# Finalmente se ejecuta la aplicación
CMD ["node", "app.js"]
