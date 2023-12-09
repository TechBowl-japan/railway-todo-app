// ./react-todo/src/electron/index.js
// Electron
import { app, BrowserWindow } from "electron";
import path from "path";

// RootPath
const ROOT_PATH = "file://" + path.resolve("");

// mainWindowのHTMLファイル(第4項で解説)
const rootPath = `${ROOT_PATH}/build/react/index.html`;

// アプリ起動時の処理
app.on("ready", (e) => {
  const winSetting = { width: 800, height: 600 };
  const mainWindow = new BrowserWindow(winSetting);
  // デベロップツールの表示
  mainWindow.openDevTools();
  mainWindow.loadURL(rootPath);
});

// アプリ終了時の処理
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
