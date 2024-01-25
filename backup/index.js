const { app, BrowserWindow, Notification, ipcMain } = require("electron");
require("@electron/remote/main").initialize();
// App Window Settings

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    win.setMenu(null);
    win.webContents.openDevTools();
    require("@electron/remote/main").enable(win.webContents);
    win.webContents.on("before-input-event", (event, input) => {
        if (input.control && input.key.toLowerCase() === "i") {
            console.log("Pressed Control+I");
            win.webContents.openDevTools();
            event.preventDefault();
        }
    });

    ipcMain.on("getNotification", (title) => {});

    // win.webContents.executeJavaScript(``)

    // win.loadURL(
    //     "https://www.halley.it//include/ihbxw.php?ente=H&amp;x=2d5a7596d0d3d5964ca8817dd36a98d8"
    // );

    win.loadFile("index.html");

    // win.webContents.setWindowOpenHandler((url) => {
    //     if (url === "about:blank") {
    //         return {
    //             action: "allow",
    //             overrideBrowserWindowOptions: {
    //                 frame: true,
    //                 fullscreenable: false,
    //                 backgroundColor: "black",
    //                 webPreferences: {
    //                     webSecurity: false,
    //                 },
    //             },
    //         };
    //     }
    //     console.log(url);
    //     return { action: "allow" };
    // });
    // win.webContents.openDevTools();
};

// Notifications

// const NOTIFICATION_TITLE = "Application Has Been Launched";
// const NOTIFICATION_BODY = "Notification from the Main process";

app.whenReady().then(() => {
    createWindow();
    // app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");
    // new Notification({
    //     title: NOTIFICATION_TITLE,
    //     body: NOTIFICATION_BODY,
    // }).show();
});
