const { contextBridge, ipcRenderer, remote } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
    setUserData: (data) => ipcRenderer.send("set-user-data", data),
    setUserSettings: (settings) => ipcRenderer.send("set-user-settings", settings),
    restoreUserSettings: (settings_default) =>
        ipcRenderer.send("restore-user-settings", settings_default),
});
