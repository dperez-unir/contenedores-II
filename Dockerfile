# Usar una imagen base oficial de Node.js
FROM node:16

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de paquete para la instalación de dependencias
COPY package*.json ./

# Instalar las dependencias de Node.js
RUN npm install

# Copiar todos los archivos de la aplicación al directorio de trabajo
COPY node/ ./

# Exponer el puerto que usará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "app.js"]
