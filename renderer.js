import settings from "./settings.json" assert { type: "json" };
import settings_default from "./settings_default.json" assert { type: "json" };

const signInBtn = document.querySelector(".signInBtn");
const showPassBtn = document.querySelector(".showPassBtn");

showPassBtn.addEventListener("mousedown", () => {
    showPassBtn.style = "background-color: #acacac";
    document.querySelector(".passwordInput").type = "text";
});
showPassBtn.addEventListener("mouseup", () => {
    document.querySelector(".passwordInput").type = "password";
    showPassBtn.style = "background-color: #333333";
});

signInBtn.addEventListener("click", () => {
    transferUserData();
});

const getUserData = () => {
    const loginData = document.querySelector(".loginInput").value;
    const passwordData = document.querySelector(".passwordInput").value;
    const autoRun = document.querySelector(".autoRun").checked;

    const userData = {
        enteredUserData: true,
        autoRun: autoRun,
        login: loginData,
        password: passwordData,
        halleyMail:
            "https://www.halley.it//include/ihbxw.php?ente=H&amp;x=2d5a7596d0d3d5964ca8817dd36a98d8",
    };
    return userData;
};

const transferUserData = () => {
    window.electronAPI.setUserData(getUserData());
};
