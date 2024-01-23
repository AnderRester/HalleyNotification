const { app, BrowserWindow, Notification } = require("electron");

// App Window Settings

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    });
    win.setMenu(null);

    win.webContents.on("before-input-event", (event, input) => {
        if (input.control && input.key.toLowerCase() === "i") {
            console.log("Pressed Control+I");
            win.webContents.openDevTools();
            event.preventDefault();
        }
    });

    win.loadFile("index.html");

    // win.webContents.setWindowOpenHandler(() => {
    //     shell.openExternal(
    //         "https://www.halley.it//include/ihbxw.php?ente=H&amp;x=2d5a7596d0d3d5964ca8817dd36a98d8"
    //     ); // Open URL in user's browser.
    //     return { action: "deny" }; // Prevent the app from opening the URL.
    // });
};
const NOTIFICATION_TITLE = "Application Has Been Launched";
const NOTIFICATION_BODY = "Notification from the Main process";

app.whenReady().then(() => {
    createWindow();
    new Notification({
        title: NOTIFICATION_TITLE,
        body: NOTIFICATION_BODY,
    }).show();
});
