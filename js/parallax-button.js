window.onload = function () {
    this.document.body.classList.add("fadeIn");
    this.document.body.style.visibility = "visible";
    // reveal scroll-down button on hero banner after 1 second
    const scroller = document.getElementById("call-to-scroll");
    setTimeout(() => {
        scroller.classList.add("parallaxTextFadeIn");
    }, 2500);
}