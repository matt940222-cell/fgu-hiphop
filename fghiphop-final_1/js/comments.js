// ============================================================
// 留言終端機
// config.js 裡 firebase.enabled = true 時 → 留言存到 Firebase,所有人看得到
// enabled = false 時 → 測試模式,留言只存在自己瀏覽器(localStorage)
// ============================================================

(function () {
  const CFG = SITE_CONFIG.comments;
  const listEl = document.getElementById("comments-list");
  const noteEl = document.getElementById("comment-note");
  const nameEl = document.getElementById("comment-name");
  const msgEl = document.getElementById("comment-msg");
  const sendBtn = document.getElementById("comment-send");

  const useFirebase = CFG.firebase && CFG.firebase.enabled;
  let db = null;

  if (useFirebase) {
    try {
      firebase.initializeApp({
        apiKey: CFG.firebase.apiKey,
        authDomain: CFG.firebase.authDomain,
        projectId: CFG.firebase.projectId,
      });
      db = firebase.firestore();
    } catch (e) {
      showNote("Firebase 連線失敗,檢查 config.js 設定");
    }
  } else {
    showNote("測試模式:留言只會存在你自己的瀏覽器裡");
  }

  function showNote(text) {
    noteEl.textContent = text;
    setTimeout(() => { if (noteEl.textContent === text) noteEl.textContent = ""; }, 4000);
  }

  function esc(s) {
    return s.replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  function render(comments) {
    listEl.innerHTML = "";
    if (!comments.length) {
      listEl.innerHTML = '<p class="terminal-loading">還沒有留言,搶頭香</p>';
      return;
    }
    comments.forEach((c, i) => {
      const p = document.createElement("p");
      p.innerHTML =
        '<span class="comment-name' + (i % 2 ? " alt" : "") + '">&gt; ' +
        esc(c.name) + ":</span> <span class=\"comment-text\">" + esc(c.text) + "</span>";
      listEl.appendChild(p);
    });
  }

  // ---------- 讀留言 ----------
  function loadComments() {
    if (db) {
      db.collection("comments")
        .orderBy("ts", "desc")
        .limit(50)
        .onSnapshot(
          (snap) => {
            const arr = [];
            snap.forEach((doc) => arr.push(doc.data()));
            render(arr.reverse());
          },
          () => { listEl.innerHTML = '<p class="terminal-loading">留言載入失敗</p>'; }
        );
    } else {
      let arr = [];
      try { arr = JSON.parse(localStorage.getItem("fgu_comments") || "[]"); } catch (e) {}
      render(arr);
    }
  }

  // ---------- 送出留言 ----------
  let lastSend = 0;

  function submit() {
    const name = nameEl.value.trim();
    const text = msgEl.value.trim();

    if (!name || !text) return showNote("暱稱和留言都要填");
    if (name.length > CFG.maxNameLength) return showNote("暱稱最多 " + CFG.maxNameLength + " 個字");
    if (text.length > CFG.maxMessageLength) return showNote("留言最多 " + CFG.maxMessageLength + " 個字");

    const all = (name + text).toLowerCase();
    for (const w of CFG.bannedWords || []) {
      if (w && all.includes(w.toLowerCase())) return showNote("留言包含不允許的字詞");
    }

    const now = Date.now();
    if (now - lastSend < 15000) return showNote("留言太頻繁,休息一下");
    lastSend = now;

    const item = { name: name, text: text, ts: now };

    if (db) {
      sendBtn.disabled = true;
      db.collection("comments").add(item)
        .then(() => { msgEl.value = ""; })
        .catch(() => showNote("送出失敗,再試一次"))
        .finally(() => { sendBtn.disabled = false; });
    } else {
      let arr = [];
      try { arr = JSON.parse(localStorage.getItem("fgu_comments") || "[]"); } catch (e) {}
      arr.push(item);
      if (arr.length > 50) arr = arr.slice(-50);
      localStorage.setItem("fgu_comments", JSON.stringify(arr));
      msgEl.value = "";
      render(arr);
    }
  }

  sendBtn.addEventListener("click", submit);
  msgEl.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });

  loadComments();
})();
