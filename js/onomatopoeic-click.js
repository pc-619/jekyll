document.addEventListener('click', (event) => {
    const clickDiv = document.createElement("div");
    clickDiv.classList.add("clickDiv");

    clickDiv.setAttribute("style", "display: block");
    clickDiv.style.left = event.clientX + "px";
    clickDiv.style.top = event.clientY + window.scrollY + "px";
    document.body.appendChild(clickDiv);
    clickDiv.classList.add("clickFadeOut");
    setTimeout(() => {
        clickDiv.setAttribute("style", "display: none");
        clickDiv.remove();
    }, 500);
});