const { contextBridge, ipcRenderer, remote } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
    setUserData: (data) => ipcRenderer.send("set-user-data", data),
});
