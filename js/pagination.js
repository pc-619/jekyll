const imgGalleryBody = document.getElementById("image-gallery-body");
const imgGalleryCtrlBtnsContainer = document.getElementById("image-gallery-pagination");
const imgGalleryCtrlBtns = document.getElementsByClassName("image-gallery-controls");
const imgGalleryPageBtnsContainer = document.getElementById("image-gallery-numPages");
const imgGalleryNoContent = document.getElementById("image-gallery-no-content");
const pageCounter = document.getElementsByClassName("page-counter")[0];

// IMPORTANT: js can't find this value on its own without a server backend - so, this gallery was designed to dynamically create items.
// You MUST update this value with every change to the # of images in /images/media/gallery/.
// e.g. if you want 50 images in the gallery --> set NUMBER_OF_ITEMS to 50.
const NUMBER_OF_ITEMS = 34;
// controls # of images shown per page
const ITEMS_PER_PAGE = 16;
imgGalleryCtrlBtnsContainer.style.display = ITEMS_PER_PAGE > 0 ? "flex" : "none";

const arrImagesJPG = [];
const arrImagesHDWebP = [];

try {
    for (let i = 0; i < NUMBER_OF_ITEMS; i++) {
        let counter = i + 1;
        const newItemJPG = "H" + counter + "-thumb.webp";
        const newItemHDWebP = "H" + counter + ".webp";
        arrImagesJPG.push(newItemJPG);
        arrImagesHDWebP.push(newItemHDWebP);
    }
} catch (error) {
    console.error("Failed to find images:", error);
}

const imgGalleryItems = Array.from(document.getElementsByClassName("gallery-item"));

var numPages = ITEMS_PER_PAGE > 0 ? Math.ceil(NUMBER_OF_ITEMS / ITEMS_PER_PAGE) : 0;


function displayPage(page) {

    // left button
    if (page == -2 && !imgGalleryCtrlBtns[0].classList.contains("greyout")) {

        for (let i = 0; i < imgGalleryPages.length; i++) {
            if (imgGalleryPageBtns[i].classList.contains("greyout")) {

                displayPage(i);
                break;
            }
        }
        return;
    } 
    // right button
    else if (page == -1 && !imgGalleryCtrlBtns[1].classList.contains("greyout")) {
        for (let i = 0; i < imgGalleryPages.length; i++) {
            if (imgGalleryPageBtns[i].classList.contains("greyout")) {
                displayPage(i+2);
                break;
            }
        }
        return;
    }

    if (imgGalleryPages.length <= 1) {
        // imgGalleryCtrlBtns.style.display = "none";
    }

    var activePage;
    for (let i = 0; i < imgGalleryPages.length; i++) {
        if (imgGalleryPages[i].classList.contains("active")) {
            // console.log("active page found; resuming function");
            // console.log("active page number:", i);
            activePage = imgGalleryPages[i];
            // console.log("active page should not contain active:", activePage.classList);
            imgGalleryPageBtns[i].classList.remove("greyout");
            imgGalleryPageBtns[i].removeAttribute("disabled");
            // console.log("re-enabling", imgGalleryPageBtns[i]);
            break;
        }
    }
    
    const desiredPage = "pg-" + page;
    // console.log("ACTIVE PAGE:", activePage);
    // console.log("EVIDENCE:", activePage.classList);
    activePage.classList.remove("active");
    // console.log("AND NOW:", activePage.classList);
    // console.log("DESIRED PAGE:", desiredPage);

    for (let i = 0; i < imgGalleryPages.length; i++) {
        if (imgGalleryPages[i].classList.contains(desiredPage)) {
            // console.log("desired page found");
            activePage.classList.remove("active");
            imgGalleryPageBtns[i].classList.add("greyout");
            imgGalleryPageBtns[i].disabled = "true";
            // console.log("disabling", imgGalleryPageBtns[i]);

            // console.log(desiredPage);
            // console.log(imgGalleryPages[i]);
            imgGalleryPages[i].classList.add("active");
            break;
        }
    }

    // disable left button if 1st page is active
    if (imgGalleryPages[0].classList.contains("active")) {
        // console.log("First page is active; disable left btn.");
        imgGalleryCtrlBtns[0].classList.add("greyout");
        imgGalleryCtrlBtns[0].disabled = "true";
        // console.log(imgGalleryCtrlBtns[0].classList);
    } else {
        imgGalleryCtrlBtns[0].classList.remove("greyout");
        imgGalleryCtrlBtns[0].removeAttribute("disabled");
    }
    // disable right button if last page is active
    if (imgGalleryPages[imgGalleryPages.length - 1].classList.contains("active")) {
        // console.log("Last page is active; disable right btn.");
        imgGalleryCtrlBtns[1].classList.add("greyout");
        imgGalleryCtrlBtns[1].disabled = "true";
    } else {
        imgGalleryCtrlBtns[1].classList.remove("greyout");
        imgGalleryCtrlBtns[1].removeAttribute("disabled");
    }

    // for (let i = 0; i < imgGalleryPages.length; i++) {
    //     if (i > imgGalleryPages.length) {

    //     }
    // }

    pageCounter.textContent = (1 + ITEMS_PER_PAGE * (page - 1)) + "-" + ((ITEMS_PER_PAGE * (page - 1)) + imgGalleryPages[page-1].childElementCount) + " of " + NUMBER_OF_ITEMS;

    truncatePageBtns(page);
    return;
}

const delta = 1;
function truncatePageBtns(currentPage) {
    let arrHiddenPageBtnsLower = [];
    let arrHiddenPageBtnsUpper = [];
    let arrVisiblePageBtns     = [];
    if (imgGalleryPageBtnsContainer.querySelector(".lower-ellipsis")) {
        imgGalleryPageBtnsContainer.querySelector(".lower-ellipsis").remove();
    }
    if (imgGalleryPageBtnsContainer.querySelector(".upper-ellipsis")) {
        imgGalleryPageBtnsContainer.querySelector(".upper-ellipsis").remove();
    }

    const lowerEllipsisBtn = document.createElement("button");
    const upperEllipsisBtn = document.createElement("button");

    for (let i = 0; i < imgGalleryPageBtns.length; i++) {
        if (i == 0 || i == imgGalleryPageBtns.length - 1 || i >= currentPage - delta - 1 && i <= currentPage + delta - 1) {
            imgGalleryPageBtns[i].classList.remove("hidden");
            arrVisiblePageBtns.push(imgGalleryPageBtns[i]);
            continue;
        } else {
            if (i <= currentPage - delta) {
                arrHiddenPageBtnsLower.push(imgGalleryPageBtns[i]);
            } else {
                arrHiddenPageBtnsUpper.push(imgGalleryPageBtns[i]);
            }
            // console.log(imgGalleryPageBtns[i]);
            imgGalleryPageBtns[i].classList.add("hidden");
        }
    }
    var arrLowerLength = arrHiddenPageBtnsLower.length;
    var arrUpperLength = arrHiddenPageBtnsUpper.length;
    var arrTotalLength = imgGalleryPageBtns.length;

    // if (imgGalleryPageBtnsContainer.querySelector(".lower-ellipsis")) {
        
    // }
    
    if (arrHiddenPageBtnsLower.length > 0 && !imgGalleryPageBtnsContainer.querySelector(".lower-ellipsis")) {
        lowerEllipsisBtn.className = "image-gallery-option lower-ellipsis";
        lowerEllipsisBtn.innerHTML = "\u2026";
        arrVisiblePageBtns[0].after(lowerEllipsisBtn);
        lowerEllipsisBtn.onclick = function() {
            displayPage(2*delta + Math.floor(arrLowerLength/2));
            lowerEllipsisBtn.remove();
        }
    }

    if (arrHiddenPageBtnsUpper.length > 0 && !imgGalleryPageBtnsContainer.querySelector(".upper-ellipsis")) {
        upperEllipsisBtn.className = "image-gallery-option upper-ellipsis";
        upperEllipsisBtn.innerHTML = "\u2026";
        arrVisiblePageBtns[arrVisiblePageBtns.length - 1].before(upperEllipsisBtn);
        upperEllipsisBtn.onclick = function() {
            displayPage(arrTotalLength - delta*2 - Math.floor(arrUpperLength/2) + 1);
            upperEllipsisBtn.remove();
        }
    }



    return;
}

var firstPageBtn = 0;
// generate pages and page buttons 
// console.log("Adding pages...");
for (let i = 0; i < numPages; i++) {
    let counter = i + 1;
    
    // PAGES
    const page = document.createElement("div");
    let activePageClassName = "image-gallery-page active pg-";
    let pageClassName = "image-gallery-page pg-";
    
    // PAGE BUTTONS
    const pageItem = document.createElement("button");
    pageItem.onclick = function() {
        displayPage(counter);
    };
    
    pageItem.textContent = counter.toString();
    
    // add classes to PAGES and PAGE BUTTONS
    if (i == 0) {
        page.className = activePageClassName + counter;
        pageItem.className = "image-gallery-option active greyout pg-" + counter.toString();
        firstPageBtn = counter.toString();
    } else {
        page.className = pageClassName + counter;
        pageItem.className = "image-gallery-option pg-" + counter.toString();
    }
    
    imgGalleryBody.appendChild(page);
    imgGalleryPageBtnsContainer.appendChild(pageItem);
    
    // PICTURE + CHILDREN IMAGES PER PAGE
    for (let j = 0; j < ITEMS_PER_PAGE; j++) {
        const picture = document.createElement("picture");
        picture.className = "gallery-item";
        page.appendChild(picture);

        const pictureImg = document.createElement("img");
        pictureImg.media = "(min-width: 501px)";
        pictureImg.classList.add("rendered-img");
        pictureImg.src = "/images/media/gallery-thumb/" + arrImagesJPG[j + (i * ITEMS_PER_PAGE)];
        pictureImg.loading = "lazy";
        


        //////// ERROR HANDLING (FOR BROKEN LINKS) ////////
        if (pictureImg.complete) {
            if (pictureImg == 0) {
                console.log("Image failed to load. (broken link)");
                imgGalleryCtrlBtnsContainer.classList.add("hidden");
                page.classList.add("hidden");
                imgGalleryNoContent.style.display = "flex";
                
            } else {
                console.log("Image successfully loaded.");
            }
        } else {
            pictureImg.addEventListener("load", () => {
                console.log("Image successfully loaded.");
            });
            pictureImg.addEventListener("error", () => {
                console.error("Image failed to load. (broken link)");
                imgGalleryCtrlBtnsContainer.classList.add("hidden");
                page.classList.add("hidden");
                imgGalleryNoContent.style.display = "flex";
                
            })
        }
        picture.append(pictureImg);

        if ((j + (i * ITEMS_PER_PAGE)) == arrImagesJPG.length - 1) {
            break;
        }
    }
}


const imgGalleryPages = Array.from(document.getElementsByClassName("image-gallery-page"));
const imgGalleryPageBtns = Array.from(document.getElementsByClassName("image-gallery-option"));

truncatePageBtns(1);

pageCounter.textContent = firstPageBtn + "-" + ITEMS_PER_PAGE + " of " + NUMBER_OF_ITEMS;


// for (let i = 0; i < imgGalleryPages.length; i++){
//     console.log(i);
// }
// console.log(imgGalleryPages[imgGalleryPages.length - 1]);

// divide array of imgs into ITEMS_PER_PAGE imgs per page

// IF there are n amount of images in the gallery, hide the gallery button controls
// (for n = ITEMS_PER_PAGE)
if (NUMBER_OF_ITEMS <= ITEMS_PER_PAGE) {
    imgGalleryCtrlBtnsContainer.classList.add("hidden");
}
// IF there are >n amount of images in the gallery, show gallery button controls
// (for n = ITEMS_PER_PAGE)
else if (NUMBER_OF_ITEMS > ITEMS_PER_PAGE) {
    imgGalleryCtrlBtnsContainer.classList.remove("hidden");

    
}

//////// IMAGE ENLARGE FEATURE ////////

const modal = document.getElementById("image-gallery-enlarged");
const loadingText = document.getElementById("load-text");
const images = document.getElementsByClassName("rendered-img");
const modalImg = document.getElementById("img01");
for (let i = 0; i < images.length; i++) {
    images[i].onclick = function () {
        loadingText.textContent = "Loading...";
        loadingText.classList.remove("hidden");
        console.log("width and height:", window.innerWidth, "x", window.innerHeight);
        if (images[i].naturalWidth > images[i].naturalHeight &&
            window.innerWidth < window.innerHeight              ){
            console.log("Landscape photo detected -- rotating.");
            modalImg.classList.add("landscape");
            modalImg.classList.remove("portrait");
            // modalImg.style.display = "block";
        } else {
            modalImg.classList.remove("landscape");
            modalImg.classList.add("portrait");
            // modalImg.style.removeProperty("transform");
            // modalImg.style.width = "75%";
            // modalImg.style.height = "75%";
        }
        modal.style.display = "flex";
        // console.log(images);
        modalImg.src = "/images/media/gallery/" + arrImagesHDWebP[i];
        // console.log(modalImg.src);
        // modalImg.alt = this.alt;

    }
}

if (modalImg.complete && modalImg.naturalWidth > 0) {
    loadingText.classList.add("hidden");
} else {
    modalImg.addEventListener("load", function () {
        loadingText.classList.add("hidden");
    });

    modalImg.addEventListener("error", () => {
        loadingText.textContent = "Failed to load image.";
    });
}

document.addEventListener("mousedown", function(event) {
    if (event.buttons == 1 && window.getComputedStyle(modal).display == "flex") {
        modal.style.display = "none";
    }
})

//////// SCROLL BACK TO TOP OF LIST AFTER CLICKING ON PAGE
//////// CTRLS ////////

imgGalleryCtrlBtnsContainer.addEventListener("click", (event) => {
    if (event.target.matches(".image-gallery-controls") || event.target.matches(".image-gallery-option")) {
        const topAnchor = document.getElementById("call-to-scroll");

        topAnchor.scrollIntoView({ behavior: "smooth" });
    }
});

//////// GALLERY CONTROLS COSMETIC STYLING ////////
const observer = new IntersectionObserver(([entry]) => {
    const isStuck = entry.intersectionRatio < 1 && entry.boundingClientRect.bottom >= entry.rootBounds.bottom;
    imgGalleryCtrlBtnsContainer.classList.toggle("is-stuck", isStuck);
    },
    { threshold: [1.0],
      rootMargin: '0px 0px -21px 0px'
    }
);

observer.observe(imgGalleryCtrlBtnsContainer);