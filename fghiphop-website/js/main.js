// ============================================================
// 主要邏輯:入場畫面、CD 播放器、照片牆、活動、貼紙
// 一般情況不需要改這個檔,內容都改 config.js。
// ============================================================

(function () {
  const C = SITE_CONFIG;
  const $ = (id) => document.getElementById(id);

  // ---------- 文字帶入 ----------
  document.title = C.clubName;
  $("entry-title").textContent = C.clubName;
  $("entry-sub").textContent = C.clubNameEn;
  $("hero-title").textContent = C.clubName;
  $("hero-slogan").textContent = C.slogan;
  $("about-text").textContent = C.aboutText;
  $("footer-text").textContent = C.footerText;
  $("link-ig").href = C.instagramUrl;
  $("link-join").href = C.joinUrl;

  // ---------- 系統列時鐘 ----------
  function tickClock() {
    const d = new Date();
    $("os-clock").textContent =
      String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  }
  tickClock();
  setInterval(tickClock, 30000);

  // ---------- CD 播放器 ----------
  const audio = $("audio");
  const disc = $("disc");
  let current = 0;
  let started = false;

  function fmt(sec) {
    if (!isFinite(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ":" + String(s).padStart(2, "0");
  }

  function loadTrack(i, autoplay) {
    if (!C.songs.length) {
      $("track-title").textContent = "歌單是空的(去 config.js 加歌)";
      return;
    }
    current = ((i % C.songs.length) + C.songs.length) % C.songs.length;
    const song = C.songs[current];
    audio.src = song.file;
    $("track-no").textContent =
      "TRACK " + String(current + 1).padStart(2, "0") + "/" + String(C.songs.length).padStart(2, "0");
    $("track-title").textContent = song.title;
    renderPlaylist();
    if (autoplay) play();
  }

  function play() {
    audio.play().then(() => {
      disc.classList.add("spinning");
      $("btn-play").textContent = "⏸";
    }).catch(() => {
      // 音檔不存在或格式錯誤
      $("track-title").textContent = C.songs[current].title + "(找不到音檔)";
    });
  }

  function pause() {
    audio.pause();
    disc.classList.remove("spinning");
    $("btn-play").textContent = "▶";
  }

  $("btn-play").addEventListener("click", () => (audio.paused ? play() : pause()));
  $("btn-prev").addEventListener("click", () => loadTrack(current - 1, true));
  $("btn-next").addEventListener("click", () => loadTrack(current + 1, true));
  audio.addEventListener("ended", () => loadTrack(current + 1, true));

  audio.addEventListener("timeupdate", () => {
    const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    $("progress-fill").style.width = pct + "%";
    $("time-current").textContent = fmt(audio.currentTime);
    $("time-total").textContent = fmt(audio.duration);
  });

  $("progress-bar").addEventListener("click", (e) => {
    if (!audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  });

  // 歌單
  function renderPlaylist() {
    const box = $("playlist");
    box.innerHTML = "";
    C.songs.forEach((s, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "playlist-item" + (i === current ? " active" : "");
      b.textContent = (i === current ? "▶ " : "  ") + String(i + 1).padStart(2, "0") + " " + s.title;
      b.addEventListener("click", () => loadTrack(i, true));
      box.appendChild(b);
    });
  }
  $("btn-playlist").addEventListener("click", () => {
    $("playlist").hidden = !$("playlist").hidden;
  });

  // ---------- 入場畫面 ----------
  $("entry-btn").addEventListener("click", () => {
    $("entry-screen").classList.add("hidden");
    if (!started) {
      started = true;
      play(); // 使用者已互動,瀏覽器允許播放
    }
  });

  // ---------- 照片牆 ----------
  const grid = $("photos-grid");
  C.photos.forEach((p, idx) => {
    const fig = document.createElement("figure");
    fig.className = "polaroid";
    const rot = typeof p.rotate === "number" ? p.rotate : (Math.random() * 4 - 2);
    fig.style.transform = "rotate(" + rot + "deg)";
    const img = document.createElement("img");
    img.src = p.src;
    img.alt = p.caption || "社團照片";
    img.loading = "lazy";
    const cap = document.createElement("figcaption");
    cap.textContent = p.caption || "";
    fig.appendChild(img);
    fig.appendChild(cap);
    fig.addEventListener("click", () => openLightbox(p));
    grid.appendChild(fig);
  });

  // 燈箱
  function openLightbox(p) {
    $("lightbox-img").src = p.src;
    $("lightbox-caption").textContent = p.caption || "";
    $("lightbox").hidden = false;
  }
  $("lightbox-close").addEventListener("click", () => ($("lightbox").hidden = true));
  $("lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") $("lightbox").hidden = true;
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") $("lightbox").hidden = true;
  });

  // ---------- 近期活動 ----------
  const list = $("events-list");
  C.events.forEach((ev) => {
    const div = document.createElement("div");
    div.className = "event-item";
    const t = document.createElement("p");
    t.className = "event-title";
    t.textContent = ev.date + " " + ev.title;
    const d = document.createElement("p");
    d.className = "event-detail";
    d.textContent = ev.detail || "";
    div.appendChild(t);
    div.appendChild(d);
    list.appendChild(div);
  });

  // ---------- 貼紙散落 ----------
  const stickerColors = ["sticker-pink", "sticker-purple", "sticker-paper"];
  const anchors = [document.querySelector(".hero"), $("events-note"), document.querySelector(".photos-section")];
  (C.stickers || []).forEach((text, i) => {
    const host = anchors[i % anchors.length];
    if (!host) return;
    host.style.position = "relative";
    const s = document.createElement("span");
    s.className = "sticker " + stickerColors[i % stickerColors.length];
    s.textContent = text;
    const side = i % 2 === 0;
    s.style.top = (-10 + (i * 7) % 20) + "px";
    s.style[side ? "right" : "left"] = (4 + (i * 13) % 40) + "px";
    s.style.transform = "rotate(" + ((i * 47) % 13 - 6) + "deg)";
    host.appendChild(s);
  });

  // 初始載入第一首(不自動播,等入場點擊)
  loadTrack(0, false);
})();
