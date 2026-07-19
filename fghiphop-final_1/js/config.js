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
  instagramUrl: "https://www.instagram.com/fgu_hiphop/",
  joinUrl: "https://www.instagram.com/fgu_hiphop/", // 「加入我們」按鈕連結,可換成 Google 表單
  footerText: "© 2026 佛光嘻哈研究社 — KEEP IT REAL",

  // ---------- 關於我們 ----------
  aboutTitle: "關於我們",
  aboutText: "我們超爆。",

  // ---------- 歌單 ----------
  // 把 mp3 檔丟進 assets/audio/ 資料夾,然後在下面加一行。
  // 新增歌曲範例:{ title: "歌名", file: "assets/audio/檔名.mp3" },
  songs: [
    { title: "I WON'T LET YOU DOWN — J HOT", file: "assets/audio/i-wont-let-u-down.mp3" },
  ],

  // ---------- 照片牆 ----------
  // 把照片丟進 assets/photos/ 資料夾,然後在下面加一行。
  // rotate 是歪斜角度(度數),負數往左歪、正數往右歪,不填就隨機。
  photos: [
    { src: "assets/photos/IMG_2213.jpg", caption: "IMG_2213.jpg", rotate: -2 },
    { src: "assets/photos/IMG_9189.jpg", caption: "IMG_9189.jpg", rotate: 1.5 },
    { src: "assets/photos/IMG_1559.jpg", caption: "IMG_1559.jpg", rotate: -1 },
  ],

  // ---------- 近期活動 ----------
  events: [
    { date: "09月", title: "跑馬古道活動(暫定)", detail: "礁溪跑馬古道 · 日期未定,有可能延期,詳情關注 IG" },
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
