# Verwende ein offizielles Node.js-Image als Basis
FROM node:18

# Setze das Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Kopiere die Abhängigkeiten und den Package-Lock in den Container
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Anwendungsquellcodes in den Container
COPY . .

# Exponiere den Port, den die Anwendung verwendet
EXPOSE 3000
# Definiere den Befehl, um die Anwendung zu starten
CMD ["npm", "start"]