const { app, shell, BrowserWindow, Notification, nativeImage, ipcMain, Menu } = require("electron");
const fs = require("node:fs");
const path = require("path");
require("dotenv").config();
let settings = require(path.join(__dirname, "settings.json"));
let settings_default = require(path.join(__dirname, "settings_default.json"));

// App Window Settings

const sound = require("sound-play");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        // titleBarStyle: "hiddenInset",
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });
    const updatedMenu = Menu.buildFromTemplate([
        {
            label: "Personalization",
            submenu: [
                {
                    label: "Profile",
                    icon: nativeImage
                        .createFromPath(path.join(__dirname, "assets/profile.png"))
                        .resize({ width: 24, height: 24 }),
                    click: () => profilePage(),
                },
                {
                    label: "Settings",
                    icon: nativeImage
                        .createFromPath(path.join(__dirname, "assets/settings.png"))
                        .resize({ width: 30, height: 30 }),
                    click: () => settingsPage(),
                },
            ],
        },
    ]);
    Menu.setApplicationMenu(updatedMenu);
    var scanMailBox;

    // win.setMenu(null);
    win.webContents.openDevTools();

    // Open Console Bind
    win.webContents.on("before-input-event", (event, input) => {
        if (input.control && input.key.toLowerCase() === "i") {
            console.log("Pressed Control+I");
            win.webContents.openDevTools();
            event.preventDefault();
        }
    });

    // Menu Items Functions

    const profilePage = () => {
        clearInterval(scanMailBox);
        win.loadFile("index.html");
        console.log("Message");
    };

    const settingsPage = () => {
        clearInterval(scanMailBox);
        win.loadFile("settings.html");
        console.log("Settings");
    };

    // Inter-Process Communication
    ipcMain.on("set-user-data", (e, data) => {
        // Actions with .env
        let dataToWrite = `enteredUserData=${data.enteredUserData}\nautoRun=${data.autoRun}\nuserLogin="${data.login}"\nuserPassword="${data.password}"\nhalleyMail="${data.halleyMail}"\n`;
        console.log(dataToWrite);
        fs.writeFile(".env", dataToWrite, (err) => {
            if (err) return console.error(err);
        });

        halleyMailStart(win);
    });
    console.log(process.env.autoRun == "true");
    if (process.env.autoRun == "true") {
        halleyMailStart(win);
    } else {
        win.loadFile("index.html");
    }
};

app.whenReady().then(() => {
    createWindow();
});

const halleyMailStart = (window) => {
    window.loadURL(process.env.halleyMail);

    let counter = 0;
    let NOTIFICATION_TITLE = "You've got message";
    let NOTIFICATION_BODY = new Date().toLocaleTimeString();
    let NOTIFICATION_SOUND = path.join(__dirname, settings.sound);
    let NOTIFICATION_SILENT = settings.silent;

    const playSound = () => {
        try {
            sound.play(NOTIFICATION_SOUND).then(() => console.log("done"));
        } catch (error) {
            console.log(error);
        }
    };
    window.webContents.on("did-finish-load", () => {
        let code = ``;
        if (counter == 2) {
            code = `
                credentialsData = document.querySelectorAll("input");
                credentialsData[5].value = "${process.env.userLogin}";
                credentialsData[6].value = "${process.env.userPassword}";
                document.querySelectorAll("button")[1].click();
            `;
            window.webContents.executeJavaScript(code);
            counter++;
        } else {
            counter++;
        }
        if (counter >= 5) {
            scanMailBox = setInterval(() => {
                console.log(counter);
                code = `
                    let messages = document.querySelectorAll(".HR_bold .hListHDataContainer");
                    if (messages != undefined) {
                        ${new Notification({
                            title: NOTIFICATION_TITLE,
                            body: NOTIFICATION_BODY,
                            silent: NOTIFICATION_SILENT,
                        }).show()};
                    }`;
            }, 9000);
            // 600000
        }
        counter++;

        window.webContents.executeJavaScript(code);
    });
};
