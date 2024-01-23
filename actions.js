// Get Credentionals
signInBtn = document.querySelector(".signInBtn");
signInBtn.addEventListener("click", () => {
    loginData = document.querySelector(".loginInput").value;
    passwordData = document.querySelector(".passwordInput").value;

    console.log(`Login: ${loginData}, Password: ${passwordData}`);
});

showPassBtn.addEventListener("click", () => {
    passwordInput;
});

window
    .open(
        "https://www.halley.it//include/ihbxw.php?ente=H&amp;x=2d5a7596d0d3d5964ca8817dd36a98d8",
        "modal",
        "frame=false,nodeIntegration=no"
    )
    .then(() => {
        document.addEventListener("DOMContentLoaded", () => {
            enterUserData();
        });
    });

const enterUserData = () => {
    let credentialsData = document.querySelectorAll("input");
    credentialsData[5].value = "jiganov andrei";
    credentialsData[6].value = "!!!Halley1";
    document.querySelectorAll("button")[1].click();
};

document.addEventListener("DOMContentLoaded", () => {
    enterUserData();
});

// let credentialsData = document.querySelectorAll("input");
// credentialsData[5].value = "jiganov andrei";
// credentialsData[6].value = "!!!Halley1";
// let signIn = document.querySelectorAll("button");
// singIn[2].click();

// 4 12 Sender
// 5 13 Message TOTAL 16 Elements

setInterval(() => {
    console.log("clear");
}, 10000);

/*

unreadedMessages[4].innerText
unreadedMessages[5].innerText

unreadedMessages[4+8].innerText
unreadedMessages[5+8].innerText

unreadedMessages[4+16].innerText
unreadedMessages[5+16].innerText

*/

const getUnreadedMessages = () => {};
