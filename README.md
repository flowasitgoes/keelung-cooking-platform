# 基隆料理教室 Keelung Cooking School

連結基隆 50–80+ 歲的在地主廚與想學做菜的學員，以靜態網站呈現課程瀏覽與報名／開課表單（Google Form 嵌入）。

## 本地開發

```bash
npm install
npm start
```

瀏覽 [http://localhost:3000](http://localhost:3000)。靜態檔案來自 `www/`，以 **npm start** 啟動（`serve www -l 3000`）。

## 專案結構

- `www/`：所有靜態資源（Capacitor 與 Vercel 皆以此為根）
  - `index.html`：首頁（Hero + 精選課程）
  - `courses.html`：課程列表
  - `student.html`：學員報名（嵌入 Google Form）
  - `chef.html`：主廚開課（嵌入 Google Form）
  - `style.css` / `app.js`：樣式與導覽、課程渲染、SW 註冊
  - `sw.js`：Service Worker（離線快取靜態資源）
  - `manifest.webmanifest`：PWA 設定
  - `assets/icons/`、`assets/images/`：圖示與課程佔位圖

## 替換 Google Form 嵌入網址

1. 在 **www/app.js** 最上方找到：
   - `STUDENT_FORM_URL`（學員報名表）
   - `CHEF_FORM_URL`（主廚開課表）
2. 將兩個變數改為你的 Google Form **嵌入網址**（表單 → 傳送 → 嵌入 HTML 中的 `src`，且網址需含 `?embedded=true`）。
3. 存檔後重新整理 `student.html` / `chef.html` 即可。

範例：

```js
var STUDENT_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe.../viewform?embedded=true';
var CHEF_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf.../viewform?embedded=true';
```

## Vercel 部署

- 本專案為**純靜態站**，無 build 步驟。
- 在 Vercel 專案設定中將 **Root Directory** 設為 `www`（或使用根目錄的 `vercel.json`，其內已指定 `outputDirectory: "www"`）。
- 部署後路徑對應為：
  - `/` → `index.html`
  - `/courses.html`、`/student.html`、`/chef.html` 直接對應同名檔案。

## Capacitor Android 打包

1. 安裝 Capacitor（若尚未安裝）：
   ```bash
   npm install @capacitor/core @capacitor/cli
   npx cap init
   ```
2. 設定 **webDir** 為 `www`（在 `capacitor.config.ts` 或 `capacitor.config.json`）：
   ```json
   {
     "appId": "com.keelung.cooking",
     "appName": "Keelung Cooking School",
     "webDir": "www"
   }
   ```
3. 加入 Android 並同步：
   ```bash
   npx cap add android
   npx cap copy
   npx cap open android
   ```
4. 在 Android Studio 中建置並執行。所有連結與資源均使用相對路徑（如 `./assets/...`），適合 WebView 與離線靜態資源。

## 技術說明

- **Mobile-first**：底部導覽、大觸控目標、卡片式課程列表。
- **離線**：Service Worker 快取 HTML/CSS/JS 與靜態資產；表單 iframe 為外部網址，離線時可能無法載入。
- **路徑**：全站使用相對路徑，方便 Vercel 與 Capacitor 共用同一份 `www/` 產物。
