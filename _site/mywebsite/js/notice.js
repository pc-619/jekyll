const notice = document.getElementsByClassName("notice")[0];
const noticeBtn = document.getElementById("notice-button");
const noticeCBox = document.getElementById("disableNotice");
// const anchor    = document.getElementById("notice-anchor");
const hasSeenNotice = localStorage.getItem("hasSeenNotice");
// localStorage.clear("hasSeenNotice");
console.log(localStorage.getItem("hasSeenNotice"));

const versionBtn = document.getElementById("version-button");
const versionInfo = document.getElementById("version-screen");
if (localStorage.getItem("hasSeenNotice") === "true") {
    console.log("notice button already clicked!");

    setTimeout(() => {
        versionBtn.style.opacity = 1;
        console.log("revealed version button");
    }, 1000);
}
else {
    notice.style.display = "grid";

    noticeBtn.addEventListener("click", function() {
        if(noticeCBox.checked){
            localStorage.setItem("hasSeenNotice", "true");
            console.log("checkbox is checked");
        }
        else{
            localStorage.setItem("hasSeenNotice", "false");
            console.log("checkbox is NOT checked");
        }
        notice.classList.add("fadeOut");
        setTimeout(() => {
            notice.style.display = "none";
        }, 500);
        setTimeout(() => {
            versionBtn.style.opacity = 1;
            console.log("revealed version button");
        }, 1000);
    });
}

function revealVersionInfo() {
    versionInfo.style.display = "flex";
    versionInfo.style.opacity = 1;
}

function hideVersionInfo() {
    versionInfo.style.opacity = 0;
    setTimeout(() => {
        versionInfo.style.display = "none";
    }, 1500);
}