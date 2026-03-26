const { app, BrowserWindow, shell } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 520,
    height: 700,
    minWidth: 420,
    minHeight: 580,
    resizable: true,
    frame: false,
    transparent: false,
    backgroundColor: '#0a0a0a',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'icon.ico'),
    title: 'TikSave',
    show: false,
  })

  win.loadFile(path.join(__dirname, 'index.html'))

  win.once('ready-to-show', () => {
    win.show()
  })

  // Открывать внешние ссылки в браузере
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

const { ipcMain } = require('electron')
let mainWindow

app.whenReady().then(() => {})

ipcMain.on('window-minimize', () => {
  BrowserWindow.getFocusedWindow()?.minimize()
})

ipcMain.on('window-close', () => {
  BrowserWindow.getFocusedWindow()?.close()
})
