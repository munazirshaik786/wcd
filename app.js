/* WCD — Waqt Cut Daalo | App logic */

const $ = (id) => document.getElementById(id);
const store = {
  get(k, d) { try { const v = localStorage.getItem("wcd_" + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem("wcd_" + k, JSON.stringify(v)); } catch {} },
};

let state = {
  xp: store.get("xp", 0),
  total: store.get("total", 0),
  streak: store.get("streak", 0),
  lastDay: store.get("lastDay", ""),
  history: store.get("history", []),
  category: "all",
  time: 0,
  current: null,
  lastIndex: -1,
};

let timer = { id: null, left: 0, running: false };

const todayStr = () => new Date().toISOString().slice(0, 10);

/* ---------- stats ---------- */
function level() { return Math.floor(state.xp / 100) + 1; }

function renderStats() {
  $("stat-xp").textContent = state.xp + " XP";
  $("stat-level").textContent = "Level " + level();
  $("stat-streak").textContent = "🔥 " + state.streak + " din";
  $("stat-total").textContent = state.total + " tasks";
  const pct = (state.xp % 100);
  $("xp-fill").style.width = pct + "%";
  $("xp-text").textContent = pct + " / 100 XP agle level tak";
}

function bumpStreak() {
  const t = todayStr();
  if (state.lastDay === t) return;
  const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  state.streak = (state.lastDay === y) ? state.streak + 1 : 1;
  state.lastDay = t;
  store.set("streak", state.streak);
  store.set("lastDay", state.lastDay);
}

/* ---------- filters ---------- */
function renderChips() {
  const catWrap = $("cat-chips"), timeWrap = $("time-chips");
  catWrap.innerHTML = ""; timeWrap.innerHTML = "";
  Object.entries(CATEGORIES).forEach(([key, c]) => {
    const b = document.createElement("button");
    b.className = "chip" + (state.category === key ? " active" : "");
    b.textContent = c.label;
    b.style.setProperty("--chip", c.color);
    b.onclick = () => { state.category = key; renderChips(); };
    catWrap.appendChild(b);
  });
  [["Koi bhi", 0], ["5 min", 5], ["15 min", 15], ["30 min", 30]].forEach(([label, v]) => {
    const b = document.createElement("button");
    b.className = "chip" + (state.time === v ? " active" : "");
    b.textContent = "⏱ " + label;
    b.style.setProperty("--chip", "#7b2ff7");
    b.onclick = () => { state.time = v; renderChips(); };
    timeWrap.appendChild(b);
  });
}

/* ---------- task picking ---------- */
function pickTask() {
  let pool = TASKS.map((t, i) => ({ ...t, i }))
    .filter(t => (state.category === "all" || t.c === state.category))
    .filter(t => (state.time === 0 || t.m === state.time));
  if (!pool.length) pool = TASKS.map((t, i) => ({ ...t, i }));
  let idx = Math.floor(Math.random() * pool.length);
  if (pool.length > 1 && pool[idx].i === state.lastIndex)
    idx = (idx + 1) % pool.length;
  state.lastIndex = pool[idx].i;
  state.current = pool[idx];
  showTask(pool[idx]);
}

function showTask(task) {
  const card = $("task-card");
  card.classList.remove("hidden");
  const cat = CATEGORIES[task.c];
  const badge = $("task-cat");
  badge.textContent = cat.label;
  badge.style.background = cat.color;
  $("task-text").textContent = task.t;
  $("task-time").textContent = "⏱ " + task.m + " minute";
  resetTimer(task.m * 60);
  card.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ---------- timer ---------- */
function fmt(s) {
  s = Math.max(0, s);
  return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
}

function resetTimer(sec) {
  clearInterval(timer.id);
  timer = { id: null, left: sec, running: false };
  $("timer").textContent = fmt(sec);
  $("timer-btn").textContent = "▶ Start";
  $("timer-ring").style.setProperty("--p", "0%");
}

function toggleTimer() {
  if (timer.running) {
    clearInterval(timer.id); timer.running = false;
    $("timer-btn").textContent = "▶ Resume";
    return;
  }
  const total = state.current ? state.current.m * 60 : timer.left;
  timer.running = true;
  $("timer-btn").textContent = "⏸ Pause";
  timer.id = setInterval(() => {
    timer.left--;
    $("timer").textContent = fmt(timer.left);
    $("timer-ring").style.setProperty("--p", ((1 - timer.left / total) * 100) + "%");
    if (timer.left <= 0) {
      clearInterval(timer.id); timer.running = false;
      $("timer-btn").textContent = "▶ Start";
      $("timer").textContent = "Done!";
      celebrate(false);
    }
  }, 1000);
}

/* ---------- completing ---------- */
function completeTask() {
  if (!state.current) return;
  const gained = 10 + state.current.m; // 5 min = 15 XP, 30 min = 40 XP
  state.xp += gained;
  state.total += 1;
  bumpStreak();
  state.history.unshift({ t: state.current.t, c: state.current.c, d: todayStr(), xp: gained });
  state.history = state.history.slice(0, 20);
  store.set("xp", state.xp); store.set("total", state.total);
  store.set("history", state.history);
  renderStats(); renderHistory();
  celebrate(true, "+" + gained + " XP");
  state.current = null;
  $("task-card").classList.add("hidden");
}

function celebrate(big, msg) {
  const c = $("confetti");
  c.innerHTML = "";
  const n = big ? 60 : 25;
  const colors = ["#ff7a1a", "#7b2ff7", "#ff4d6d", "#3ddc84", "#ffc93d", "#4da6ff"];
  for (let i = 0; i < n; i++) {
    const p = document.createElement("span");
    p.className = "piece";
    p.style.left = Math.random() * 100 + "vw";
    p.style.background = colors[i % colors.length];
    p.style.animationDelay = (Math.random() * 0.4) + "s";
    p.style.animationDuration = (1.6 + Math.random() * 1.4) + "s";
    c.appendChild(p);
  }
  if (msg) {
    const toast = $("toast");
    toast.textContent = "🎉 " + msg + " — Waqt cut gaya, boss!";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2600);
  }
  setTimeout(() => c.innerHTML = "", 3400);
}

/* ---------- history ---------- */
function renderHistory() {
  const list = $("history-list");
  list.innerHTML = "";
  if (!state.history.length) {
    list.innerHTML = '<li class="empty">Abhi tak koi task nahi kiya — pehla task uthao! 👆</li>';
    return;
  }
  state.history.forEach(h => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="h-cat" style="background:${CATEGORIES[h.c].color}">${CATEGORIES[h.c].label}</span>
      <span class="h-text">${h.t}</span><span class="h-xp">+${h.xp}</span>`;
    list.appendChild(li);
  });
}

/* ---------- wire up ---------- */
$("big-btn").onclick = pickTask;
$("new-btn").onclick = pickTask;
$("done-btn").onclick = completeTask;
$("timer-btn").onclick = toggleTimer;
$("timer-reset").onclick = () => state.current && resetTimer(state.current.m * 60);

renderChips();
renderStats();
renderHistory();
