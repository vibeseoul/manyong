/* 마뇽을 찾아라 · vibe seoul Halloween 2026 */
(function () {
"use strict";

const CFG = window.MANYONG_CONFIG || {};
// Each QR carries ...?s=CODE. The same short code can be typed in by hand.
const CODES = { BOO: 1, FANG: 2, CAPE: 3, MOON: 4 };
const KEY = "manyong-hunt-2026";
const Q_KEY = KEY + "-queue";
const ENDS = CFG.endsAt ? new Date(CFG.endsAt).getTime() : Infinity;

const T = {
 en:{eyebrow:"Halloween · Oct 26–31",title:"Find Manyong!",lead:"Our vampire Manyong is hiding in three spots in the store. Tap a shadow and scan the QR code when you find him.",
  found:"Found",tap:"Tap a shadow to open the camera.",slotOpen:"Still hiding",slotDone:"Found!",
  doneEyebrow:"All three found",doneTitle:"You caught Manyong!",sample:"SAMPLE",valid:"Valid until 31 Oct 2026",show:"Show this screen at the checkout",
  hint:"Our staff will confirm it with a PIN.",staff:"Staff only · Redeem",pinLabel:"Staff PIN",pinWrong:"Wrong PIN.",pinLocked:"Too many tries. Please wait {s} s.",pinNoHttps:"PIN check needs a secure (https) page.",
  usedAt:"Redeemed ",stamp:"Redeemed",ended:"This promotion has ended.",redeemedToast:"Coupon redeemed",
  secretEyebrow:"Psst … secret",secretTitle:"There's one more: the golden Manyong.",secretHint:"Play “Don't Wake Manyong!” in the K-POP zone on the 1st floor. Win, and a secret QR code appears on the screen.",
  bonusEyebrow:"Secret found",bonusTitle:"Golden Manyong found!",bonusEarly:"Golden Manyong found! Find the other three to unlock it.",
  s1:"Find the three hidden Manyongs in the store.",s2:"Tap a shadow here and scan the QR code next to him.",s3:"Found all three? Show this screen at the checkout.",
  foot:"vibe seoul · Zeil 68, Frankfurt",privacy:"No personal data. We only count anonymously how many people take part. Your progress stays on this phone.",
  scanTitle:"Scan the QR code",photo:"📷 Take a photo of the QR code",or:"or enter the code",
  camStarting:"Starting camera …",camFail:"Camera not available. Take a photo of the QR code or type the code below.",noQr:"No QR code found. Try closer, with more light.",
  wrong:"That's not a Manyong code.",already:"You already found this one!",gotIt:"Found! ",bonusGot:"Golden Manyong found!",entrance:"You're already here. Now find the hidden Manyongs!",
  resetTitle:"Staff: reset this phone",resetBtn:"Reset",resetDone:"Reset done."},
 de:{eyebrow:"Halloween · 26.–31. Oktober",title:"Finde Manyong!",lead:"Unser Vampir Manyong hat sich an drei Orten im Store versteckt. Tippe auf einen Schatten und scanne den QR-Code, wenn du ihn findest.",
  found:"Gefunden",tap:"Tippe auf einen Schatten, um die Kamera zu öffnen.",slotOpen:"Noch versteckt",slotDone:"Gefunden!",
  doneEyebrow:"Alle drei gefunden",doneTitle:"Manyong ist erwischt!",sample:"BEISPIEL",valid:"Gültig bis 31.10.2026",show:"Zeig diesen Bildschirm an der Kasse",
  hint:"Unser Team bestätigt mit einer PIN.",staff:"Nur Personal · Einlösen",pinLabel:"Personal-PIN",pinWrong:"Falsche PIN.",pinLocked:"Zu viele Versuche. Bitte {s} Sek. warten.",pinNoHttps:"Die PIN-Prüfung braucht eine sichere (https) Seite.",
  usedAt:"Eingelöst am ",stamp:"Eingelöst",ended:"Diese Aktion ist beendet.",redeemedToast:"Coupon eingelöst",
  secretEyebrow:"Psst … geheim",secretTitle:"Da ist noch ein goldener Manyong.",secretHint:"Spiel „Weck Manyong nicht auf!“ in der K-POP-Zone im 1. OG. Wer gewinnt, bekommt einen geheimen QR-Code auf dem Bildschirm.",
  bonusEyebrow:"Geheimnis gelüftet",bonusTitle:"Goldener Manyong gefunden!",bonusEarly:"Goldener Manyong gefunden! Finde zuerst die anderen drei.",
  s1:"Finde die drei versteckten Manyongs im Store.",s2:"Tippe hier auf einen Schatten und scanne den QR-Code daneben.",s3:"Alle drei gefunden? Zeig den Bildschirm an der Kasse.",
  foot:"vibe seoul · Zeil 68, Frankfurt",privacy:"Keine persönlichen Daten. Wir zählen nur anonym, wie viele mitmachen. Dein Fortschritt bleibt auf diesem Handy.",
  scanTitle:"QR-Code scannen",photo:"📷 Foto vom QR-Code machen",or:"oder Code eingeben",
  camStarting:"Kamera startet …",camFail:"Kamera nicht verfügbar. Mach ein Foto vom QR-Code oder gib den Code darunter ein.",noQr:"Kein QR-Code erkannt. Versuch es näher und mit mehr Licht.",
  wrong:"Das ist kein Manyong-Code.",already:"Diesen Manyong hast du schon!",gotIt:"Gefunden! ",bonusGot:"Goldener Manyong gefunden!",entrance:"Du bist schon hier. Jetzt such die versteckten Manyongs!",
  resetTitle:"Personal: dieses Handy zurücksetzen",resetBtn:"Zurücksetzen",resetDone:"Zurückgesetzt."},
 ko:{eyebrow:"Halloween · 10월 26–31일",title:"숨은 마뇽을 찾아라!",lead:"뱀파이어 마뇽이 매장 세 곳에 숨었어요. 그림자를 누르고, 마뇽을 찾으면 옆의 QR을 찍어 주세요.",
  found:"찾은 마뇽",tap:"그림자를 누르면 카메라가 켜져요.",slotOpen:"숨어 있음",slotDone:"찾았다!",
  doneEyebrow:"세 마리 모두 찾음",doneTitle:"마뇽을 잡았어요!",sample:"예시",valid:"2026년 10월 31일까지 사용 가능",show:"계산대에서 이 화면을 보여 주세요",
  hint:"직원이 PIN으로 확인해 드려요.",staff:"직원 전용 · 사용 처리",pinLabel:"직원 PIN",pinWrong:"PIN이 맞지 않아요.",pinLocked:"시도가 너무 많아요. {s}초 후에 다시 해 주세요.",pinNoHttps:"PIN 확인은 https 페이지에서만 돼요.",
  usedAt:"사용 완료 ",stamp:"사용 완료",ended:"이벤트가 끝났어요.",redeemedToast:"쿠폰 사용 완료",
  secretEyebrow:"쉿… 비밀",secretTitle:"황금 마뇽이 하나 더 있어요.",secretHint:"1층 K-POP존에서 ‘마뇽을 깨우지 마!’ 게임을 해 보세요. 성공하면 화면에 비밀 QR이 나타나요.",
  bonusEyebrow:"비밀을 찾았어요",bonusTitle:"황금 마뇽을 찾았어요!",bonusEarly:"황금 마뇽을 찾았어요! 나머지 세 마리를 먼저 찾아 주세요.",
  s1:"매장에 숨은 마뇽 세 마리를 찾아요.",s2:"여기서 그림자를 누르고 옆의 QR을 찍어요.",s3:"다 찾았다면 계산대에서 화면을 보여 주세요.",
  foot:"vibe seoul · Zeil 68, Frankfurt",privacy:"개인정보는 받지 않아요. 참여 인원만 익명으로 집계하고, 진행 기록은 이 휴대폰에만 남아요.",
  scanTitle:"QR 찍기",photo:"📷 QR 사진 찍기",or:"또는 코드 입력",
  camStarting:"카메라를 켜는 중…",camFail:"카메라를 쓸 수 없어요. QR 사진을 찍거나 아래에 코드를 입력해 주세요.",noQr:"QR을 찾지 못했어요. 더 가까이, 밝은 곳에서 찍어 주세요.",
  wrong:"마뇽 코드가 아니에요.",already:"이미 찾은 마뇽이에요!",gotIt:"찾았다! ",bonusGot:"황금 마뇽을 찾았어요!",entrance:"이미 들어와 있어요. 이제 숨은 마뇽을 찾아보세요!",
  resetTitle:"직원용: 이 휴대폰 기록 초기화",resetBtn:"초기화",resetDone:"초기화했어요."}
};

const IMG = { s1:"img/s1.webp", s2:"img/s2.webp", s3:"img/s3.webp", c1:"img/c1.webp", c2:"img/c2.webp", c3:"img/c3.webp", gold:"img/gold.webp", sgold:"img/sgold.webp" };

const fresh = () => ({ found: [], code: null, redeemed: null, bonusRedeemed: null, visited: false, pinFails: 0, lockUntil: 0 });
let state = fresh();
let lang = "en";
const $ = s => document.querySelector(s);

/* ---------- storage ---------- */
function load() {
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && Array.isArray(s.found)) state = Object.assign(fresh(), s); } catch (e) {}
  try { const l = localStorage.getItem(KEY + "-lang"); if (l && T[l]) { lang = l; return; } } catch (e) {}
  const n = (navigator.language || "en").slice(0, 2).toLowerCase();
  lang = T[n] ? n : "en";
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
const t = k => (T[lang][k] != null ? T[lang][k] : T.en[k]);
const has = n => state.found.includes(n);
const mainDone = () => [1, 2, 3].every(has);
const locale = () => (lang === "ko" ? "ko-KR" : lang === "de" ? "de-DE" : "en-GB");
const fmt = ts => new Date(ts).toLocaleString(locale(), { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
const ended = () => Date.now() >= ENDS;

function newCode() {
  const A = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  const r = new Uint32Array(4);
  try { crypto.getRandomValues(r); } catch (e) { for (let i = 0; i < 4; i++) r[i] = Math.floor(Math.random() * 1e9); }
  for (let i = 0; i < 4; i++) s += A[r[i] % A.length];
  return "MN-" + s;
}

/* ---------- anonymous counting (Google Sheet) ---------- */
let queue = [];
let flushing = false;
try { queue = JSON.parse(localStorage.getItem(Q_KEY)) || []; } catch (e) { queue = []; }
function saveQ() { try { localStorage.setItem(Q_KEY, JSON.stringify(queue.slice(-50))); } catch (e) {} }
function track(ev, extra) {
  if (!CFG.sheetUrl) return;
  queue.push(Object.assign({ ev: ev, lang: lang, t: Date.now() }, extra || {}));
  saveQ(); flush();
}
async function flush() {
  if (flushing || !queue.length || !CFG.sheetUrl) return;
  flushing = true;
  while (queue.length) {
    try {
      await fetch(CFG.sheetUrl, { method: "POST", mode: "no-cors", keepalive: true,
        headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(queue[0]) });
      queue.shift(); saveQ();
    } catch (e) { break; }
  }
  flushing = false;
}
window.addEventListener("online", flush);

/* ---------- PIN ---------- */
async function pinOk(pin) {
  if (!window.crypto || !crypto.subtle) throw new Error("nohttps");
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("manyong:" + pin));
  const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
  return hex === String(CFG.staffPinHash || "").toLowerCase();
}
function lockLeft() { return Math.max(0, Math.ceil((state.lockUntil - Date.now()) / 1000)); }
async function checkPin(pin, errEl, box) {
  errEl.textContent = "";
  const left = lockLeft();
  if (left) { errEl.textContent = t("pinLocked").replace("{s}", left); return false; }
  let ok = false;
  try { ok = await pinOk(pin); } catch (e) { errEl.textContent = t("pinNoHttps"); return false; }
  if (ok) { state.pinFails = 0; save(); return true; }
  state.pinFails = (state.pinFails || 0) + 1;
  if (state.pinFails >= 5) { state.pinFails = 0; state.lockUntil = Date.now() + 60000; }
  save();
  errEl.textContent = lockLeft() ? t("pinLocked").replace("{s}", lockLeft()) : t("pinWrong");
  if (box) { box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake"); }
  return false;
}

/* ---------- coupons ---------- */
const coupons = {};
function buildCoupon(el, kind) {
  el.appendChild($("#couponTpl").content.cloneNode(true));
  const q = k => el.querySelector('[data-k="' + k + '"]');
  const c = { el: el, kind: kind, q: q };
  q("staff").addEventListener("click", () => {
    q("staff").hidden = true; q("pinbox").hidden = false; q("pin").value = ""; q("pinerr").textContent = "";
    q("pin").focus();
  });
  q("cancel").addEventListener("click", () => { q("pinbox").hidden = true; q("staff").hidden = false; });
  const submit = async () => {
    const pin = q("pin").value.trim();
    if (!/^\d{4}$/.test(pin)) { q("pinerr").textContent = t("pinWrong"); return; }
    const ok = await checkPin(pin, q("pinerr"), q("pinbox"));
    q("pin").value = "";
    if (!ok) return;
    if (kind === "main") { state.redeemed = Date.now(); track("redeem", { code: state.code }); }
    else { state.bonusRedeemed = Date.now(); track("bonus_redeem", { code: state.code }); }
    save(); q("pinbox").hidden = true; render(); toast(t("redeemedToast"));
  };
  q("ok").addEventListener("click", submit);
  q("pin").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); submit(); } });
  q("pin").addEventListener("input", () => { if (q("pin").value.length === 4) submit(); });
  coupons[kind] = c;
}
function renderCoupon(kind) {
  const c = coupons[kind], q = c.q, main = kind === "main";
  const used = main ? state.redeemed : state.bonusRedeemed;
  const offer = (main ? CFG.offer : CFG.bonusOffer) || {};
  q("eyebrow").textContent = main ? t("doneEyebrow") : t("bonusEyebrow");
  q("eyebrow").hidden = false;
  q("title").textContent = main ? t("doneTitle") : t("bonusTitle");
  q("img").src = main ? IMG.c3 : IMG.gold;
  q("offer").textContent = offer[lang] || offer.en || "";
  q("sample").textContent = t("sample");
  q("sample").hidden = !CFG.sample;
  q("valid").textContent = t("valid");
  q("show").textContent = t("show");
  q("code").textContent = state.code || "";
  q("hint").textContent = t("hint");
  q("staff").textContent = t("staff");
  q("pinLabel").textContent = t("pinLabel");
  q("stamp").textContent = t("stamp");
  q("ended").textContent = t("ended");
  c.el.classList.toggle("redeemed", !!used);
  q("stamp").hidden = !used;
  q("used").hidden = !used;
  if (used) q("used").textContent = t("usedAt") + fmt(used);
  const isEnded = !used && ended();
  q("ended").hidden = !isEnded;
  const canRedeem = !used && !isEnded;
  q("hint").hidden = !canRedeem;
  if (!canRedeem) { q("staff").hidden = true; q("pinbox").hidden = true; }
  else if (q("pinbox").hidden) q("staff").hidden = false;
}

/* ---------- render ---------- */
function render() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-t]").forEach(el => { el.textContent = t(el.dataset.t); });
  document.querySelectorAll(".langs button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  const n = [1, 2, 3].filter(has).length;
  $("#count").textContent = n + " / 3";
  $("#barfill").style.width = (n / 3 * 100) + "%";
  const wrap = $("#plates");
  if (!wrap.children.length) {
    for (let i = 1; i <= 3; i++) {
      const s = document.createElement("div"); s.className = "slot"; s.dataset.n = i;
      s.innerHTML = '<button type="button" class="plate"><img alt=""><span class="q"></span></button><small></small>';
      s.querySelector("button").addEventListener("click", openScanner);
      wrap.appendChild(s);
    }
  }
  Array.prototype.forEach.call(wrap.children, s => {
    const i = +s.dataset.n, f = has(i), p = s.querySelector(".plate");
    s.classList.toggle("done", f);
    p.classList.toggle("found", f);
    p.querySelector("img").src = f ? IMG["c" + i] : IMG["s" + i];
    p.querySelector(".q").textContent = f ? "✓" : i;
    p.setAttribute("aria-label", "Manyong " + i + ": " + (f ? t("slotDone") : t("slotOpen")));
    s.querySelector("small").textContent = f ? t("slotDone") : t("slotOpen");
  });
  const done = mainDone();
  $("#reward").hidden = !done;
  $("#secret").hidden = !done;
  $("#steps").hidden = done;
  $("#tapnote").hidden = done;
  if (done) renderCoupon("main");
  const g = has(4), p4 = $("#plate4");
  p4.classList.toggle("found", g);
  p4.querySelector("img").src = g ? IMG.gold : IMG.sgold;
  $("#bonus").hidden = !(g && done);
  if (g && done) renderCoupon("bonus");
  tick();
}
function tick() {
  const now = new Date().toLocaleString(locale(), { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" });
  document.querySelectorAll('[data-k="clock"]').forEach(e => { e.textContent = now; });
}

let toastTimer;
function toast(msg) {
  const el = $("#toast"); el.textContent = msg; el.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.hidden = true; }, 2600);
}

/* ---------- collecting ---------- */
function tokenFrom(text) {
  let v = (text || "").trim();
  try {
    const u = new URL(v);
    if (u.searchParams.get("s")) v = u.searchParams.get("s");
    else if (u.searchParams.get("from") || u.searchParams.get("f")) return "POP";
  } catch (e) {}
  return v.toUpperCase().replace(/[^A-Z0-9]/g, "");
}
function collect(raw, fromUrl) {
  const tok = tokenFrom(raw);
  if (tok === "POP") { closeScanner(); toast(t("entrance")); return true; }
  const n = CODES[tok];
  if (!n) { if (!fromUrl) $("#err").textContent = t("wrong"); return false; }
  closeScanner();
  if (has(n)) { toast(t("already")); return true; }
  const wasDone = mainDone();
  state.found.push(n);
  if (n === 4) track("bonus", { code: state.code });
  else track("found" + n);
  if (!wasDone && mainDone()) { state.code = state.code || newCode(); track("complete", { code: state.code }); }
  save(); render();
  const el = n === 4 ? $("#plate4") : document.querySelector('.slot[data-n="' + n + '"] .plate');
  if (el) { el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); }
  try { if (navigator.vibrate) navigator.vibrate(n === 4 ? [60, 40, 60, 40, 120] : 80); } catch (e) {}
  if (n === 4) {
    toast(mainDone() ? t("bonusGot") : t("bonusEarly"));
    if (mainDone()) setTimeout(() => $("#bonus").scrollIntoView({ behavior: "smooth", block: "center" }), 500);
  } else {
    toast(t("gotIt") + [1, 2, 3].filter(has).length + " / 3");
    if (mainDone()) setTimeout(() => $("#reward").scrollIntoView({ behavior: "smooth", block: "start" }), 700);
  }
  return true;
}

/* ---------- scanner ---------- */
let stream = null, loopId = 0, detector = null;
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

async function decodeSource(src, w, h) {
  if (detector) {
    try { const r = await detector.detect(src); if (r && r[0]) return r[0].rawValue; } catch (e) {}
  }
  if (window.jsQR && w && h) {
    const scale = Math.min(1, 900 / Math.max(w, h));
    canvas.width = Math.round(w * scale); canvas.height = Math.round(h * scale);
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height); // transparent images → white
    ctx.drawImage(src, 0, 0, canvas.width, canvas.height);
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const r = window.jsQR(img.data, img.width, img.height, { inversionAttempts: "attemptBoth" });
    if (r) return r.data;
  }
  return null;
}

async function openScanner() {
  $("#sheet").hidden = false; $("#err").textContent = ""; $("#code").value = "";
  const msg = $("#cammsg"), video = $("#video");
  msg.textContent = t("camStarting"); msg.hidden = false; $("#frame").hidden = true;
  try {
    if (!detector && "BarcodeDetector" in window) {
      const f = await BarcodeDetector.getSupportedFormats();
      if (f.includes("qr_code")) detector = new BarcodeDetector({ formats: ["qr_code"] });
    }
  } catch (e) { detector = null; }
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error("no camera");
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
    if ($("#sheet").hidden) { stopCam(); return; }
    video.srcObject = stream; await video.play();
    msg.hidden = true; $("#frame").hidden = false;
    const id = ++loopId; let busy = false;
    const step = async () => {
      if (id !== loopId) return;
      if (!busy && video.readyState >= 2) {
        busy = true;
        const v = await decodeSource(video, video.videoWidth, video.videoHeight);
        busy = false;
        if (v && collect(v)) return;
      }
      setTimeout(step, 160);
    };
    step();
  } catch (e) {
    msg.textContent = t("camFail"); msg.hidden = false;
  }
}
function stopCam() {
  loopId++;
  if (stream) { stream.getTracks().forEach(tr => tr.stop()); stream = null; }
  const v = $("#video"); try { v.pause(); } catch (e) {} v.srcObject = null;
}
function closeScanner() { stopCam(); $("#sheet").hidden = true; }

/* ---------- wiring ---------- */
$("#close").addEventListener("click", closeScanner);
$("#sheet").addEventListener("click", e => { if (e.target.id === "sheet") closeScanner(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#sheet").hidden) closeScanner(); });
document.addEventListener("visibilitychange", () => { if (document.hidden && !$("#sheet").hidden) closeScanner(); });
$("#codeform").addEventListener("submit", e => { e.preventDefault(); collect($("#code").value); });
$("#photo").addEventListener("change", e => {
  const file = e.target.files && e.target.files[0]; e.target.value = "";
  if (!file) return;
  const img = new Image();
  img.onload = async () => {
    const v = await decodeSource(img, img.naturalWidth, img.naturalHeight);
    URL.revokeObjectURL(img.src);
    if (!v) { $("#err").textContent = t("noQr"); return; }
    collect(v);
  };
  img.onerror = () => { $("#err").textContent = t("noQr"); };
  img.src = URL.createObjectURL(file);
});
$("#plate4").addEventListener("click", openScanner);
document.querySelectorAll(".langs button").forEach(b => b.addEventListener("click", () => {
  lang = b.dataset.lang; try { localStorage.setItem(KEY + "-lang", lang); } catch (e) {} render();
}));

// Staff-only reset: open the page with #reset, enter the PIN.
async function doReset() {
  const ok = await checkPin($("#resetPin").value.trim(), $("#resetErr"), $("#staffpanel"));
  $("#resetPin").value = "";
  if (!ok) return;
  const keep = { visited: state.visited };
  state = Object.assign(fresh(), keep); save();
  $("#staffpanel").hidden = true;
  try { history.replaceState(null, "", location.pathname); } catch (e) {}
  render(); toast(t("resetDone"));
}
$("#resetGo").addEventListener("click", doReset);
$("#resetPin").addEventListener("keydown", e => { if (e.key === "Enter") doReset(); });

/* ---------- boot ---------- */
load();
buildCoupon($("#reward"), "main");
buildCoupon($("#bonus"), "bonus");
const checkHash = () => { if (location.hash === "#reset") { $("#staffpanel").hidden = false; window.scrollTo(0, 0); } };
checkHash();
window.addEventListener("hashchange", checkHash);
let params = null;
try { params = new URLSearchParams(location.search); } catch (e) {}
const s = params && params.get("s");
if (!state.visited) {
  state.visited = true; save();
  track("visit", { src: s ? "qr" : (params && (params.get("from") || params.get("f"))) || "link" });
}
render();
setInterval(tick, 1000);
if (s) collect(s, true);
if (params && (s || params.get("from") || params.get("f"))) { try { history.replaceState(null, "", location.pathname + location.hash); } catch (e) {} }
flush();
})();
