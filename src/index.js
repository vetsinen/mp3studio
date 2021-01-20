const {app, BrowserWindow, dialog} = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow = null;

const getFolderFromUser = exports.getFolderFromUser =
    async (folder = '/home/jsdev/Music/') => {
        const files = await dialog.showOpenDialog(mainWindow, {
            defaultPath: folder,
            properties: ['openDirectory'],
        });
        if (!files.canceled) console.log(files.filePaths[0]);
        return files.filePaths[0]
    };

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        show: false
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        //getFolderFromUser()
    });
    //mainWindow.webContents.openDevTools();// Open the DevTools.

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
