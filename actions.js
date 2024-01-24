const { BrowserWindow, Notification } = require("@electron/remote");
const electron = require("electron");
const fs = require("node:fs");
require("dotenv").config();

// Get Credentionals
// console.log(process.env.userLogin);
const signInBtn = document.querySelector(".signInBtn");
const showPassBtn = document.querySelector(".showPassBtn");

signInBtn.addEventListener("click", () => {
    const loginData = document.querySelector(".loginInput").value;
    const passwordData = document.querySelector(".passwordInput").value;
    const userData = `userLogin="${loginData}" \nuserPassword="${passwordData}"`;
    fs.writeFile(".env1", userData, (err) => {
        if (err) {
            console.error(err);
        } else {
            // file written successfully
        }
    });
    openMail(urlToOpen);
});

showPassBtn.addEventListener("mousedown", () => {
    showPassBtn.style = "background-color: #acacac";
    document.querySelector(".passwordInput").type = "text";
});
showPassBtn.addEventListener("mouseup", () => {
    document.querySelector(".passwordInput").type = "password";
    showPassBtn.style = "background-color: #333333";
});

const urlToOpen =
    "https://www.halley.it//include/ihbxw.php?ente=H&amp;x=2d5a7596d0d3d5964ca8817dd36a98d8";
const openMail = (url) => {
    const openedWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });
    openedWindow.webContents.on("before-input-event", (event, input) => {
        if (input.control && input.key.toLowerCase() === "i") {
            console.log("Pressed Control+I");
            openedWindow.webContents.openDevTools();
            event.preventDefault();
        }
    });
    openedWindow.setMenu(null);
    openedWindow.loadURL(url);

    let NOTIFICATION_TITLE = "You've got message";
    let NOTIFICATION_BODY = new Date().toLocaleTimeString();

    var data = [];
    let counter = 0;
    const login = process.env.userLogin;
    const password = process.env.userPassword;

    openedWindow.webContents.on("did-finish-load", () => {
        let code = ``;
        if (counter == 2) {
            code = `
        const enterUserData = () => {
            let credentialsData = document.querySelectorAll("input");
            credentialsData[5].value = "jiganov andrei";
            credentialsData[6].value = "!!!Halley1";
            // credentialsData[5].value = ${login};
            // credentialsData[6].value = ${password};
            document.querySelectorAll("button")[1].click();
        };
        enterUserData();
        `;
            openedWindow.webContents.executeJavaScript(code);
            counter++;
        } else {
            counter++;
        }
        const scanMailBox = setInterval(() => {
            if (counter >= 5) {
                console.log(counter);
                code = `
            const getUnreadedMessages = () => {
                    
                    let messages = document.querySelectorAll(".HR_bold .hListHDataContainer");
                    if (messages != undefined) {
                        // for (let i = 0; i < messages.length; i += 8) {
                        //     try {
                        //         console.log(messages[4 + i].innerText);
                        //         console.log(messages[5 + i].innerText);
                        //         // let NOTIFICATION_TITLE = messages[4 + i].innerText";
                        //         // let NOTIFICATION_BODY = messages[5 + i].innerText;
                        //         // new Notification({
                        //         //     title: NOTIFICATION_TITLE,
                        //         //     body: NOTIFICATION_BODY,
                        //         // }).show();
                        //     } catch {
                        //         console.log("No Unreaded Messages");
                        //     }
                        // }
                        ${new Notification({
                            title: NOTIFICATION_TITLE,
                            body: NOTIFICATION_BODY,
                        }).show()}
                    }
                
            };

            const stopScan = () => {
                clearInterval(scanMailBox);
            };
            
            getUnreadedMessages();
        `;
            }
        }, 9000);
        counter++;

        openedWindow.webContents.executeJavaScript(code);
    });
};

/*

const enterUserData = () => {
                // console.log(item.document);
                let credentialsData = document.querySelectorAll("input");
                credentialsData[5].value = "jiganov andrei";
                credentialsData[6].value = "!!!Halley1";
                document.querySelectorAll("button")[1].click();
            };

            const getUnreadedMessages = () => {
                let messages = document.querySelectorAll(".HR_bold .hListHDataContainer");
                if (messages != undefined) {
                    for (let i = 0; i < messages.length; i += 8) {
                        try {
                            console.log(messages[4 + i].innerText);
                            console.log(messages[5 + i].innerText);
                        } catch {
                            console.log("No Unreaded Messages");
                        }
                    }
                }
                const scanMailBox = setInterval(() => {
                    let messages = document.querySelectorAll(".HR_bold .hListHDataContainer");
                    if (messages != undefined) {
                        for (let i = 0; i < messages.length; i += 8) {
                            try {
                                console.log(messages[4 + i].innerText);
                                console.log(messages[5 + i].innerText);
                            } catch {
                                console.log("No Unreaded Messages");
                            }
                        }
                    }
                }, 600000);
            };
            
            const stopScan = () => {
                clearInterval(scanMailBox);
            };

            enterUserData();
            getUnreadedMessages();


*/

// const enterUserData = () => {
//     // console.log(item.document);
//     let credentialsData = document.querySelectorAll("input");
//     credentialsData[5].value = "jiganov andrei";
//     credentialsData[6].value = "!!!Halley1";
//     document.querySelectorAll("button")[1].click();
// };

// let credentialsData = document.querySelectorAll("input");
// credentialsData[5].value = "jiganov andrei";
// credentialsData[6].value = "!!!Halley1";
// let signIn = document.querySelectorAll("button");
// singIn[2].click();

// 4 12 Sender
// 5 13 Message TOTAL 16 Elements
/*

unreadedMessages[4].innerText
unreadedMessages[5].innerText

unreadedMessages[4+8].innerText
unreadedMessages[5+8].innerText

unreadedMessages[4+16].innerText
unreadedMessages[5+16].innerText

*/

// const getUnreadedMessages = () => {
//     let messages = document.querySelectorAll(".HR_bold .hListHDataContainer");
//     if (messages != undefined) {
//         for (let i = 0; i < messages.length; i += 8) {
//             try {
//                 console.log(messages[4 + i].innerText);
//                 console.log(messages[5 + i].innerText);
//             } catch {
//                 console.log("No Unreaded Messages");
//             }
//         }
//     }
//     const scanMailBox = setInterval(() => {
//         let messages = document.querySelectorAll(".HR_bold .hListHDataContainer");
//         if (messages != undefined) {
//             for (let i = 0; i < messages.length; i += 8) {
//                 try {
//                     console.log(messages[4 + i].innerText);
//                     console.log(messages[5 + i].innerText);
//                 } catch {
//                     console.log("No Unreaded Messages");
//                 }
//             }
//         }
//     }, 600000);
// };

// const stopScan = () => {
//     clearInterval(scanMailBox);
// };

/*

const enterUserData = (item) => {
    let credentialsData = document.querySelectorAll("input");
    credentialsData[5].value = "jiganov andrei";
    credentialsData[6].value = "!!!Halley1";
    document.querySelectorAll("button")[1].click();
};

const scanMailBox = setInterval(() => {
        let messages = document.querySelectorAll(".HR_bold .hListHDataContainer");
        if (messages != undefined) {
            for (let i = 0; i < messages.length; i += 8) {
                try {
                    console.log(messages[4 + i].innerText);
                    console.log(messages[5 + i].innerText);
                } catch {
                    console.log("No Unreaded Messages");
                }
            }
        }
    }, 600000);

const stopScan = () => {
    clearInterval(scanMailBox);

};

*/

/*

let messages = document.querySelectorAll(".HR_bold .hListHDataContainer");
    if (messages != undefined) {
        for (let i = 0; i < messages.length; i += 8) {
            try {
                console.log(messages[4 + i].innerText);
                console.log(messages[5 + i].innerText);
            } catch (error) {
                console.log(error);
            }
        }
    }

for (let i = 0; i <= messages.length; i += 8) {
                try {
                    if (i + 8 >= messages.length) break;
                    console.log(messages[4 + i].innerText);
                    console.log(messages[5 + i].innerText);
                } catch {
                    console.log("No Unreaded Messages");
                }
            }

*/
