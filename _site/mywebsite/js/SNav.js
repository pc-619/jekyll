var snavIcon = document.getElementById("sm-navbar-icon");
var snavMenu = document.getElementById("sm-navbar");
var snavOpen = false;
function SNavMenu () {
    if (snavMenu.style.visibility == "hidden") {
        snavMenu.setAttribute("style", "visibility: visible");
        snavMenu.classList.remove("snavSlideUp");
        snavMenu.classList.add("snavSlideDown");
        snavOpen = true;

    }
    else {
        snavMenu.classList.remove("snavSlideDown");
        snavMenu.classList.add("snavSlideUp");
        setTimeout(() => {
            snavMenu.setAttribute("style", "visibility: hidden");
        }, 500);
        snavOpen = false;
        
    }
    
}

window.onscroll = function(e) {
  // print "false" if direction is down and "true" if up
  if ((e) && (snavOpen == true)) {
    SNavMenu();
  }  
//   console.log(this.oldScroll > this.scrollY);
  let scrollDown = this.oldScroll = this.scrollY;
    // console.log(scrollDown);
    // if ((scrollDown == true) && (snavOpen == true)) {
    //     console.log('scrolldown detected --> close sm-navbar');
    //     SNavMenu();
    // }
}