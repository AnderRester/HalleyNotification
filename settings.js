import settings from "./settings.json" assert { type: "json" };
import settings_default from "./settings_default.json" assert { type: "json" };

// console.log((let sound = settings.sound.split("/")));

// document.addEventListener("DOMContentLoaded", () => {
//     document.querySelector(".changeSoundContainer span").textContent = `${
//         settings.sound.split("/")[settings.sound.split("/").length - 1]
//     }`;
// });

const volumeSlider = document.querySelector(".volumeSlider>input");
const intervalSlider = document.querySelector(".intervalSlider>input");
volumeSlider.addEventListener("change", () => {
    console.log(volumeSlider.value);
});
intervalSlider.addEventListener("change", () => {
    console.log(intervalSlider.value);
});

const transferUserSettings = () => {
    window.electronAPI.setUserSettings(settings);
};
const transferRestoredUserSettings = () => {
    window.electronAPI.restoreUserSettings(getUserData(settings_default));
};
