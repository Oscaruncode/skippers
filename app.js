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

function analyzeData(onlineRaw, battleRaw) {
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

async function analyze() {
  const online = document.getElementById("online").value;
  const battle = document.getElementById("battle").value;

  renderPreview(online, battle);

    const data = analyzeData(online, battle);
    renderResults(data);
}

// ===== PREVIEW =====
function renderPreview(online, battle) {
  const preview = document.getElementById("preview");

  // ===== LIMPIAR ONLINE =====
  const onlineList = online
    .split("\n")
    .map(line => {
      const match = line.match(/"([^"]*)"/g);
      if (!match) return null;

      const values = match.map(x => x.replace(/"/g, ""));
      return {
        name: values[0],
        status: values[1]
      };
    })
    .filter(x => x && x.name && x.name !== "Character Name");

  // ===== LIMPIAR PELEA =====
  const battleList = battle
    .split("\n")
    .map(x => x.trim())
    .filter(x => x.length > 0);

  preview.innerHTML = `
    <!-- ONLINE -->
    <div class="col-md-6">
      <div class="card bg-secondary text-light">
        <div class="card-header">👀 Preview ONLINE</div>
        <div class="card-body p-0">
          <ul class="list-group list-group-flush">
            ${onlineList.map(user => `
              <li class="list-group-item bg-dark text-light border-secondary d-flex justify-content-between">
                ${user.name}
                ${
                  user.status === "Online"
                    ? '<span class="badge bg-success">ONLINE</span>'
                    : '<span class="badge bg-secondary">OFF</span>'
                }
              </li>
            `).join("")}
          </ul>
        </div>
      </div>
    </div>

    <!-- PELEA -->
<div class="col-md-6">
  <div class="card bg-secondary text-light">
    <div class="card-header">👀 Preview en PELEA</div>
    <div class="card-body p-0">
      <ul class="list-group list-group-flush">
        ${battleList.map(name => `
          <li class="list-group-item bg-dark text-light border-secondary d-flex justify-content-between align-items-center">
            ${name}
            <span class="badge bg-danger">FIGHTING</span>
          </li>
        `).join("")}
      </ul>
    </div>
  </div>
</div>
  `;
}

// ===== RESULTS =====
function renderResults(data) {
  const div = document.getElementById("results");

  const renderList = (list, badgeColor, label) =>
    `
    <ul class="list-group list-group-flush">
      ${list.map(name => `
        <li class="list-group-item bg-dark text-light border-secondary d-flex justify-content-between align-items-center">
          ${name}
          <span class="badge bg-${badgeColor}">${label}</span>
        </li>
      `).join("")}
    </ul>
    `;

  div.innerHTML = `
    <!-- RESUMEN -->
    <div class="col-md-3">
      <div class="card bg-secondary text-light text-center p-3">
        <h6 class="text-secondary text-light">Online</h6>
        <h2>${data.totalOnline}</h2>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card bg-secondary text-light text-center p-3">
        <h6 class="text-secondary text-light">En pelea</h6>
        <h2>${data.totalBattle}</h2>
      </div>.
    </div>

    <div class="col-md-6"></div>

    <!-- PARTICIPARON -->
    <div class="col-md-4">
      <div class="card bg-secondary text-light">
        <div class="card-header text-info">✅ Participaron</div>
        <div class="card-body p-0">
          ${renderList(data.participated, "primary", "OK")}
        </div>
      </div>
    </div>

    <!-- SKIPPERS -->
    <div class="col-md-4">
      <div class="card bg-secondary text-light">
        <div class="card-header bg-danger text-white">⚠️ Skippers</div>
        <div class="card-body p-0">
          ${renderList(data.skippers, "danger", "SKIP")}
        </div>
      </div>
    </div>

    <!-- OFFLINE PERO FUERON -->
    <div class="col-md-4">
      <div class="card bg-secondary text-light">
        <div class="card-header text-warning">
          ❌ Offline pero fueron (llegaron despues de la captura)
        </div>
        <div class="card-body p-0">
          ${renderList(data.offlineButInBattle, "warning", "LATE")}
        </div>
      </div>
    </div>
  `;
}
