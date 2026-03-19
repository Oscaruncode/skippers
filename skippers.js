// ==========================
// SKIPPERS DETECTOR
// ==========================

// ===== INPUTS =====
const rawOnlineList = `PEGA_AQUI_TU_LISTA_ONLINE`;
const rawBattleList = `PEGA_AQUI_TU_LISTA_DE_PELEA`;

// ===== HELPERS =====
function cleanOnlineList(raw) {
  const lines = raw.split("\n");

  return lines
    .filter(line => line.includes('"')) // evita headers basura
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

// ===== CORE =====
function analyze(onlineRaw, battleRaw) {
  const onlineList = cleanOnlineList(onlineRaw);
  const battleList = cleanBattleList(battleRaw);

  const onlineNow = onlineList.filter(u => u.isOnline).map(u => u.name);

  const battleSet = new Set(battleList);
  const onlineSet = new Set(onlineNow);

  const participated = onlineNow.filter(name => battleSet.has(name));
  const skippers = onlineNow.filter(name => !battleSet.has(name));
  const offlineButInBattle = battleList.filter(name => !onlineSet.has(name));

  return {
    participated,
    skippers,
    offlineButInBattle,
    totalOnline: onlineNow.length,
    totalBattle: battleList.length
  };
}

// ===== RUN =====
const result = analyze(rawOnlineList, rawBattleList);

// ===== OUTPUT =====
console.log("===== PREVIEW =====");
console.log("Online:", result.totalOnline);
console.log("En pelea:", result.totalBattle);

console.log("\n✅ Participaron:");
console.log(result.participated.join("\n"));

console.log("\n⚠️ Skippers (online pero no fueron):");
console.log(result.skippers.join("\n"));

console.log("\n❌ En pelea pero NO online:");
console.log(result.offlineButInBattle.join("\n"));