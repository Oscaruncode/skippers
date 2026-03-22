# 🔥 Skippers Detector

![Status](https://img.shields.io/badge/status-active-success)
![Made with JS](https://img.shields.io/badge/JavaScript-frontend-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)

Herramienta para detectar jugadores que estuvieron **conectados pero no participaron en una pelea (CTA)**.

👉 Ideal para control de asistencia en guilds de Albion Online.

---

## 🌐 Demo

👉 https://oscaruncode.github.io/skippers/

---

## 🧠 ¿Cómo funciona?

La herramienta compara dos listas:

- 🟢 **Jugadores conectados** (antes de la CTA)
- ⚔️ **Jugadores que participaron en la pelea**

Y detecta automáticamente:

- ✅ Participaron
- ⚠️ Skippers (no asistieron)
- ❌ Llegaron tarde (no estaban online al inicio)

---

## 📋 Paso a paso

### 1️⃣ Guardar lista de conectados

Antes de la CTA (ejemplo: **19:50**):

- Abre Albion Online
- Ve a la lista de jugadores conectados
- Copia toda la lista
- Guárdala en un bloc de notas

---

### 2️⃣ Obtener lista de pelea

Después de la CTA (ejemplo: **21:05**):

1. Entra a AlbionBB
2. Busca las peleas del horario
3. Dale a **"Multi"** (Multi Battle)
4. Ve a la sección **Players**
5. Filtra por tu guild (ej: *GuildNovaNocturnx*)
6. Copia la lista de jugadores

---

### 3️⃣ Usar la herramienta

1. Entra a la página:
   👉 https://oscaruncode.github.io/skippers/

2. Pega:

   - 🟢 **Izquierda** → lista de conectados  
   - ⚔️ **Derecha** → lista de pelea  

3. Click en:
   👉 **Analizar**

---

## 📊 Resultado

La herramienta mostrará:

- ✅ **Participaron** → estaban online y sí fueron  
- ⚠️ **Skippers** → estaban online pero NO fueron  
- ❌ **Offline pero fueron** → se conectaron después  

---

## ⚠️ Importante

- Debes copiar la lista de conectados **ANTES de la CTA**
- Si no estabas conectado en ese momento → no podrás detectar correctamente los skippers
- La precisión depende completamente de los datos que pegues

---

## 💡 Resumen rápido

1. Copias lista de conectados (antes de CTA)
2. Copias lista de pelea en AlbionBB (después)
3. Pegas ambas en la herramienta
4. Click en analizar

👉 Y listo, tienes los skippers automáticamente

---

## 🙌 Notas

- Si no puedes hacerlo, alguien más puede generar las listas
- La herramienta funciona completamente en el navegador (no guarda datos)

---

## 🚀 Autor

Creado por **Oscar** para facilitar el control de asistencia en CTA 😎
