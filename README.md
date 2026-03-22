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

## ⚙️ ¿Cómo funciona internamente?

La herramienta está construida completamente en JavaScript y funciona en el navegador sin necesidad de backend.

---

### 1. Limpieza de datos

Primero se procesan las dos entradas:

- La lista de conectados:
  - Se separa por líneas
  - Se extrae el nombre del jugador
  - Se identifica si está en estado `"Online"`

- La lista de pelea:
  - Se limpia eliminando espacios vacíos
  - Se convierte en un arreglo simple de nombres

---

### 2. Filtrado de jugadores online

Solo se tienen en cuenta los jugadores que estaban realmente conectados:

```js
const onlineNow = onlineList.filter(u => u.isOnline).map(u => u.name);
3. Comparación eficiente con Sets

Para optimizar la búsqueda, se usan estructuras Set:

const battleSet = new Set(battleList);
const onlineSet = new Set(onlineNow);

Esto permite hacer comparaciones rápidas en tiempo constante.

4. Clasificación de jugadores

Se generan tres grupos principales:

✅ Participaron

Jugadores que están en ambas listas:

onlineNow.filter(n => battleSet.has(n));
⚠️ Skippers

Jugadores que estaban online pero no fueron a la pelea:

onlineNow.filter(n => !battleSet.has(n));
❌ Offline pero fueron

Jugadores que aparecen en la pelea pero no estaban online al inicio:

battleList.filter(n => !onlineSet.has(n));
5. Renderizado

Finalmente, los resultados se muestran dinámicamente en pantalla usando:

HTML
Bootstrap
Renderizado dinámico con JavaScript

## 🚀 Autor

Creado por **OscarUnCode** para facilitar el control de asistencia en CTA 😎
