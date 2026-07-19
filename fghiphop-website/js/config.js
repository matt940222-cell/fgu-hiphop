// ============================================================
// 佛光嘻哈研究社 網站設定檔
// 這是你唯一需要改的檔案。改完存檔、git push 就會更新。
// 規則:文字放在引號裡面,每一項後面要有逗號。
// ============================================================

const SITE_CONFIG = {

  // ---------- 基本資料 ----------
  clubName: "佛光嘻哈研究社",
  clubNameEn: "FGU HIP-HOP RESEARCH CLUB",
  slogan: "NOW PLAYING SINCE DAY ONE",
  instagramUrl: "https://www.instagram.com/你們的IG帳號/",
  joinUrl: "https://www.instagram.com/你們的IG帳號/", // 「加入我們」按鈕連結,可換成 Google 表單
  footerText: "© 2026 佛光嘻哈研究社 — KEEP IT REAL",

  // ---------- 關於我們 ----------
  aboutTitle: "關於我們",
  aboutText: "這裡放社團簡介。饒舌、DJ、Beatbox、街舞,寫你們實際在做的事。改 js/config.js 裡的 aboutText 就能換掉這段。",

  // ---------- 歌單 ----------
  // 把 mp3 檔丟進 assets/audio/ 資料夾,然後在下面加一行。
  // 新增歌曲範例:{ title: "歌名", file: "assets/audio/檔名.mp3" },
  songs: [
    { title: "社歌 DEMO", file: "assets/audio/demo.mp3" },
    { title: "CYPHER 現場錄音", file: "assets/audio/cypher.mp3" },
  ],

  // ---------- 照片牆 ----------
  // 把照片丟進 assets/photos/ 資料夾,然後在下面加一行。
  // rotate 是歪斜角度(度數),負數往左歪、正數往右歪,不填就隨機。
  photos: [
    { src: "assets/photos/photo1.jpg", caption: "cypher_night_01.png", rotate: -2 },
    { src: "assets/photos/photo2.jpg", caption: "社課側拍.png", rotate: 1.5 },
    { src: "assets/photos/photo3.jpg", caption: "成發彩排.png", rotate: -1 },
    { src: "assets/photos/photo4.jpg", caption: "社遊合照.png", rotate: 2 },
  ],

  // ---------- 近期活動 ----------
  events: [
    { date: "09/09", title: "迎新 CYPHER 之夜", detail: "學生活動中心 19:00 · 免報名直接來" },
    { date: "09/25", title: "BEAT 製作工作坊", detail: "攜帶筆電 · 名額 20" },
  ],

  // ---------- 貼紙(散落在頁面上的小字) ----------
  stickers: ["爽", "來玩", "KEEP IT REAL", "FGU", "PEACE"],

  // ---------- 留言區 ----------
  comments: {
    // 留言過濾字(留言包含這些詞會被擋下)
    bannedWords: ["幹你娘", "垃圾", "去死"],
    maxNameLength: 12,
    maxMessageLength: 100,
    // Firebase 設定:照「維護說明.md」的步驟建立專案後,
    // 把 Firebase 給你的設定貼進來,並把 enabled 改成 true。
    // enabled 是 false 的時候,留言只會存在訪客自己的瀏覽器裡(測試用)。
    firebase: {
      enabled: true,
      apiKey: "AIzaSyAQ2Tc1tTW4OPGOXQbeL90cvWw91HfLZNA",
      authDomain: "fguhiphop.firebaseapp.com",
      projectId: "fguhiphop",
    },
  },

};
