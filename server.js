const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static("public"));

// ===== LOGICA =====
function cleanOnlineList(raw) {
  return raw
    .split("\n")
    .filter(line => line.includes('"'))
    .map(line => {
      const parts = line.split("\t");
      const name = parts[0]?.replace(/"/g, "").trim();
      const status = parts[1]?.replace(/"/g, "").trim();

      return {
        name,
        isOnline: status === "Online"
      };
    })
    .filter(x => x.name);
}

function cleanBattleList(raw) {
  return raw
    .split("\n")
    .map(x => x.trim())
    .filter(x => x.length > 0);
}

function analyze(onlineRaw, battleRaw) {
  const onlineList = cleanOnlineList(onlineRaw);
  const battleList = cleanBattleList(battleRaw);

  const onlineNow = onlineList.filter(u => u.isOnline).map(u => u.name);

  const battleSet = new Set(battleList);
  const onlineSet = new Set(onlineNow);

  return {
    participated: onlineNow.filter(n => battleSet.has(n)),
    skippers: onlineNow.filter(n => !battleSet.has(n)),
    offlineButInBattle: battleList.filter(n => !onlineSet.has(n)),
    totalOnline: onlineNow.length,
    totalBattle: battleList.length
  };
}

// ===== API =====
app.post("/analyze", (req, res) => {
  const { online, battle } = req.body;

  const result = analyze(online, battle);
  res.json(result);
});

// ===== START =====
app.listen(3000, () => {
  console.log("🚀 Skippers corriendo en http://localhost:3000");
});