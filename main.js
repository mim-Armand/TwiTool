/* jshint node: true */
/*jshint esversion: 6 */
const {app, BrowserWindow, Menu, protocol, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const {autoUpdater} = require("electron-updater");
const log = require('electron-log'); // ~/Library/Logs/<app name>/log.log

//----------------------------------------------------------------------------------------------------------------------
//          Logging
//
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

//----------------------------------------------------------------------------------------------------------------------
//          MENU
//
let template = []
if (process.platform === 'darwin') {
    // OS X
    const name = app.getName();
    template.unshift({
        label: name,
        submenu: [
            {
                label: 'About ' + name,
                role: 'about'
            },
            {
                label: 'Update ' + name,
                click(){
                    createUpdateWindow()
                }
            },
            {
                label: 'Quit',
                accelerator: 'Command+Q',
                click() { app.quit(); }
            },
        ]
    })
}

//----------------------------------------------------------------------------------------------------------------------
//          Update Window
//
let updateWin;

function sendStatusToWindow(text) {
    log.info(text);
    updateWin.webContents.send('message', text);
}
function createUpdateWindow() {
    updateWin = new BrowserWindow();
    updateWin.webContents.openDevTools();
    updateWin.on('closed', ()=>{
        updateWin = null;
    })
    updateWin.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`)
    log.info(autoUpdater)
    return updateWin;
}
autoUpdater.on('checking-for-update', () => {
    log.info('Checking for update...')
    sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
    log.info('Update available.')
    sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
    log.info('Update not available.')
    sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
    log.info('Error in auto-updater.')
    sendStatusToWindow('Error in auto-updater.');
})
autoUpdater.on('download-progress', (progressObj) => {
    log.info('download-progress')
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
    log.info('update-downloaded')
    log.info(info)
    sendStatusToWindow('Update downloaded; will install in 5 seconds');
});
app.on('ready', function()  {
    autoUpdater.checkForUpdates();
});


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    createUpdateWindow()

    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
    app.quit();
}
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
    createWindow();
}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.