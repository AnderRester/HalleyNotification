console.log("connected");

// const { contextBridge, ipcRenderer, remote } = require("electron");

// const validChannels = ["sample-event-1", "sample-event-2", "sample-event-3"];
// contextBridge.exposeInMainWorld("api", {
//     send: (channel, data) => {
//         // whitelist channels To Main Process
//         if (validChannels.includes(channel)) {
//             ipcRenderer.send(channel, data);
//         }
//     },
//     receive: (channel, func) => {
//         // From Main Process
//         if (validChannels.includes(channel)) {
//             console.log("receive: " + channel);
//             ipcRenderer.on(channel, (event, ...args) => func(...args));
//         }
//     },
//     openNewWindow: (url) => {
//         var BrowserWindow = remote.BrowserWindow;
//         var win = new BrowserWindow({
//             width: 1024,
//             height: 768,
//             show: true,
//             webPreferences: {
//                 nodeIntegration: false,
//                 webSecurity: true,
//                 allowEval: false,
//                 nativeWindowOpen: true,
//                 allowRunningInsecureContent: false,
//                 contextIsolation: true,
//                 enableRemoteModule: true,
//                 preload: path.join(__dirname, "preload.js"),
//             },
//             autoHideMenuBar: true,
//             icon: path.join(__dirname, "favicon.ico"),
//         });

//         win.loadURL(
//             url.format({
//                 pathname: path.join(__dirname, url, "index.html"),
//                 protocol: "file:",
//                 slashes: true,
//             })
//         );
//     },
// });
