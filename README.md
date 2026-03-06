# Keelung Cooking School（基隆料理教室）

Mobile-first MVP 靜態網站：串接基隆銀髮主廚與學員，可部署至 Vercel，並以 Capacitor 打包成 Android App。

## 專案結構

- `www/`：所有靜態資源（Capacitor 的 webDir、Vercel 的輸出目錄）
  - `index.html`：首頁與精選課程
  - `courses.html`：課程列表
  - `student.html`：學員報名（嵌入 Google 表單）
  - `chef.html`：主廚開課（嵌入 Google 表單）
  - `style.css`、`app.js`、`sw.js`、`manifest.webmanifest`
  - `assets/icons/`、`assets/images/`

## 替換 Google Form 嵌入網址

1. 在 **Google 表單** 建立兩份表單（學員報名、主廚開課），取得「嵌入」的 iframe 網址（格式如 `https://docs.google.com/forms/d/e/xxxxx/viewform?embedded=true`）。
2. 開啟 `www/app.js`，在檔案最上方找到：
   - `STUDENT_FORM_URL`：改為學員報名表單的嵌入網址。
   - `CHEF_FORM_URL`：改為主廚開課表單的嵌入網址。
3. 若留空或仍為佔位字串，表單頁會顯示說明文字，不會載入 iframe。

建議表單欄位：

- **學員**：姓名、Email、電話、想學的菜、可上課時間。
- **主廚**：姓名、年齡、拿手菜、料理經驗、所在區域、可授課時間。

## 本地預覽

在專案根目錄執行：

```bash
npx serve www -l 3000
```

或使用其他靜態伺服器，根目錄指向 `www`。開啟 `http://localhost:3000`。

## Vercel 部署

1. 將專案推送到 Git（GitHub / GitLab / Bitbucket）。
2. 在 [Vercel](https://vercel.com) 匯入該 repo。
3. 設定：
   - **Root Directory**：維持專案根目錄（不要選 `www`）。
   - **Output Directory**：設為 `www`（或依 `vercel.json` 的 `outputDirectory`）。
4. 若使用根目錄的 `vercel.json`，已指定 `outputDirectory: "www"`，Vercel 會以 `www` 為靜態輸出，直接部署。
5. 部署後可透過 `/courses.html`、`/student.html`、`/chef.html` 存取各頁。

## Capacitor Android 打包

1. 安裝 Capacitor（若尚未安裝）：
   ```bash
   npm init -y
   npm install @capacitor/core @capacitor/cli @capacitor/android
   ```

2. 初始化（App 名稱與 ID 可自訂）：
   ```bash
   npx cap init "Keelung Cooking School" com.keelung.cookingschool
   ```

3. 在 `capacitor.config.ts`（或 `capacitor.config.json`）中設定：
   ```json
   {
     "webDir": "www"
   }
   ```

4. 加入 Android 並同步：
   ```bash
   npx cap add android
   npx cap copy
   ```

5. 以 Android Studio 開啟並建置：
   ```bash
   npx cap open android
   ```

注意事項：

- 所有連結與資源均使用相對路徑（如 `./courses.html`、`./assets/...`），以便在 WebView 內正常運作。
- 若表單使用 Google Form iframe，需有網路連線才能載入表單內容。

## 技術說明

- 純靜態 HTML/CSS/JS，無建置步驟。
- 課程資料目前寫在 `www/app.js` 的 `courses` 陣列，可改為從後端或 JSON 載入。
- Service Worker（`www/sw.js`）會快取靜態資源，離線可開啟頁面；表單 iframe 為外部網址，離線時無法載入屬正常。

## 授權

依專案需求自訂。
# keelung-cooking-platform
