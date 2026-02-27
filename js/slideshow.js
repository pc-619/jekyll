// const slideshow = document.getElementById("slideshow");
// const slideshowImgs = document.getElementsByClassName("slideshowImgs");
// const slideDuration = 3000;

// for (let i = 0; i < slideshowImgs.length; i++) {
//     if (!slideshowImgs[i].classList.contains("ssCurrent")){
//         slideshowImgs[i].setAttribute("style", "display: none");
//     }
// }

// function startProgBar () {
//   const elem = document.getElementById("slideshow-progress-bar");
//   elem.setAttribute("style", `width: ${0}%`);
//   let width = 0;
//   const duration = 3000; // 3 seconds in milliseconds
//   const intervalTime = 10; // Update every 30ms for smoothness
//   const increments = duration / intervalTime; // Total steps
//   const incrementAmount = 100 / increments; // Percentage per step

//   const id = setInterval(frame, intervalTime);

//   function frame() {
//     if (width >= 100) {
//       clearInterval(id);
//     //   elem.textContent = "100%";
//     } else {
//       width += incrementAmount;
//       if (width > 100) width = 100; // Cap at 100%
//     //   console.log(width);
//       elem.setAttribute("style", `width: ${width}%`);
//     //   elem.textContent = Math.round(width) + "%";
//     }
//   }
// }

// function ssLeft() {
//     for (let i = 0; i < slideshowImgs.length; i++) {
//         if (slideshowImgs[i].classList.contains("ssCurrent")) {
//             slideshowImgs[i].classList.remove("ssCurrent");
//             // slideshowImgs[i].setAttribute("style", "animation: 0.5s fadeOut");
//             startProgBar();

//             // setTimeout(function () {
//                 slideshowImgs[i].setAttribute("style", "display: none");
//                 const prevIndex = (i - 1 + slideshowImgs.length) % slideshowImgs.length;
//                 slideshowImgs[prevIndex].classList.add("ssCurrent");
//                 slideshowImgs[prevIndex].setAttribute("style", "display: block");
//                 slideshowImgs[prevIndex].setAttribute("style", "animation: 0.5s fadeIn");
//             // }, 500);
//             break;
//         }
//     }
// }

// function ssRight() {

//     for (let i = 0; i < slideshowImgs.length; i++) {
//         if (slideshowImgs[i].classList.contains("ssCurrent")) {
//             slideshowImgs[i].classList.remove("ssCurrent");
//             // slideshowImgs[i].setAttribute("style", "animation: 0.5s fadeOut");
//             startProgBar();

//             // setTimeout(function () {
//                 slideshowImgs[i].setAttribute("style", "display: none");
//                 const nextIndex = (i + 1) % slideshowImgs.length;
//                 slideshowImgs[nextIndex].classList.add("ssCurrent");
//                 slideshowImgs[nextIndex].setAttribute("style", "display: block");
//                 slideshowImgs[nextIndex].setAttribute("style", "animation: 0.5s fadeIn");
//             // }, 500);

//             break;
//         }
//     }
// }

// let isHovering = false;
// var autoRight = setInterval(function () {
//     ssRight();
// }, slideDuration);
// slideshow.addEventListener("mouseover", () => {
//     console.log("mouseover, ABORT");
//     isHovering = true;
//     clearInterval(autoRight);
// })

// slideshow.addEventListener("mouseout", () => {
//     console.log("mouseout, CONTINUE");
//     isHovering = false;
//     autoRight = setInterval(function () {
//         ssRight();
//     }, slideDuration);
// })

const dots = document.getElementsByClassName("slideshow-dot");
const imgs = document.getElementsByClassName("slideshowImgs");
const caps = document.getElementsByClassName("slideshow-caption");
const slideshow = document.getElementById("slideshow-media");

var autoSlide = setInterval(() => {
    slide(1);
    console.log("slideshow resumed");
}, 3000);

slideshow.addEventListener("mouseenter", function () {
    if(autoSlide !== null) {
        clearInterval(autoSlide);
    }
    console.log("slideshow halted");
})
slideshow.addEventListener("mouseleave", function () {
    autoSlide = null;
    autoSlide = setInterval(() => {
        slide(1);
        console.log("slideshow resumed");
    }, 3000);
    console.log("slideshow resuming in 3 seconds...")
})



function slide(num) {
    let activeDot = document.getElementsByClassName("activedot")[0];
    let nextDot = activeDot.nextElementSibling;
    let prevDot = activeDot.previousElementSibling;

    let activeImg = document.getElementsByClassName("ssCurrent")[0];
    let nextImg = activeImg.nextElementSibling;
    let prevImg = activeImg.previousElementSibling;

    let activeCap = document.getElementsByClassName("activecap")[0];
    let nextCap = activeCap.nextElementSibling;
    let prevCap = activeCap.previousElementSibling;

    // slide right
    if (num === 1 && nextDot) {
        console.log("right, haven't reached end of slideshow");
        // shift dot to new position
        activeDot.classList.remove("activedot");
        nextDot.classList.add("activedot");
        // hide old img, display new img
        activeImg.classList.remove("ssCurrent");
        nextImg.classList.add("ssCurrent");
        // hide old cap, display new cap
        activeCap.classList.remove("activecap");
        nextCap.classList.add("activecap");

    }
    else if (num === 1 && !nextDot) {
        console.log("right, end of slideshow");
        // shift dot to new position
        activeDot.classList.remove("activedot");
        dots[0].classList.add("activedot");
        // hide old img, display new img
        activeImg.classList.remove("ssCurrent");
        imgs[0].classList.add("ssCurrent");
        // hide old cap, display new cap
        activeCap.classList.remove("activecap");
        caps[0].classList.add("activecap")
    }

    // slide left
    else if (num === -1 && prevDot) {
        console.log("left, haven't reached start of slideshow");
        // shift dot to new position
        activeDot.classList.remove("activedot");
        prevDot.classList.add("activedot");
        // hide old img, display new img
        activeImg.classList.remove("ssCurrent");
        prevImg.classList.add("ssCurrent");
        // hide old cap, display new cap
        activeCap.classList.remove("activecap");
        prevCap.classList.add("activecap");

    }
    else if (num === -1 && !prevDot) {
        console.log("left, start of slideshow");
        // shift dot to new position
        activeDot.classList.remove("activedot");
        dots[dots.length - 1].classList.add("activedot");
        // hide old img, display new img
        activeImg.classList.remove("ssCurrent");
        imgs[imgs.length - 1].classList.add("ssCurrent");
        // hide old cap, display new cap
        activeCap.classList.remove("activecap");
        caps[caps.length - 1].classList.add("activecap");
    }


}