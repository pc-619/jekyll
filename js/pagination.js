const imgGallery = document.getElementById("image-gallery");
const imgGalleryHead = document.getElementById("image-gallery-header");
const imgGalleryBody = document.getElementById("image-gallery-body");
const imgGalleryCtrls = document.getElementById("image-gallery-pagination");
const imgGalleryPageCounter = document.getElementById("image-gallery-numPages");
const imgGalleryNoContent = document.getElementById("image-gallery-no-content");

// IMPORTANT: js can't find this value on its own without a server backend - so, you MUST update this value with every change to the # of images in /images/media/gallery/.
const NUMBER_OF_ITEMS = 34;
const ITEMS_PER_PAGE = 16;

// console.log("Populating array with images...");
const arrImagesJPG = [];
const arrImagesWebP = [];

try {
    for (let i = 0; i < NUMBER_OF_ITEMS; i++) {
        let counter = i + 1;
        const newItemJPG = "H" + counter + ".JPG";
        const newItemWebP = "H" + counter + ".webp";
        // console.log(newItem); 
        arrImagesJPG.push(newItemJPG);
        arrImagesWebP.push(newItemWebP);
    }
} catch (error) {
    console.error("Failed to find images:", error);
}

// console.log("ARRAY:", arrImagesJPG);

const imgGalleryItems = Array.from(document.getElementsByClassName("gallery-item"));

// console.log("Number of images in gallery:", NUMBER_OF_ITEMS);
var numPages = Math.ceil(NUMBER_OF_ITEMS / ITEMS_PER_PAGE);
// console.log("Expected number of pages (hasn't been generated yet):", numPages);

function displayPage(page) {
    var activePage;
    for (let i = 0; i < imgGalleryPages.length; i++) {
        if (imgGalleryPages[i].classList.contains("active")) {
            console.log("active page found; resuming function");
            console.log("active page number:", i);
            activePage = imgGalleryPages[i];
            imgGalleryPageBtns[i].classList.toggle("greyout");
            imgGalleryPageBtns[i].removeAttribute("disabled");
            console.log("re-enabling", imgGalleryPageBtns[i]);
            break;
        }
    }
    
    const desiredPage = "pg-" + page;
    console.log(page);
    console.log("ACTIVE PAGE:", activePage);
    console.log("DESIRED PAGE:", desiredPage);

    for (let i = 0; i < imgGalleryPages.length; i++) {
        if (imgGalleryPages[i].classList.contains(desiredPage)) {
            console.log("desired page found");
            activePage.classList.toggle("active");
            imgGalleryPageBtns[i].classList.toggle("greyout");
            imgGalleryPageBtns[i].disabled = "true";
            console.log("disabling", imgGalleryPageBtns[i]);

            imgGalleryPages[i].classList.toggle("active");
            break;
        }
    }
}

// generate pages and page buttons 
// console.log("Adding pages...");
for (let i = 0; i < numPages; i++) {
    let counter = i + 1;
    
    // PAGES
    const page = document.createElement("div");
    let currentPageClassName = "image-gallery-page active pg-";
    let pageClassName = "image-gallery-page pg-";
    
    // PAGE BUTTONS
    const pageItem = document.createElement("button");
    pageItem.onclick = function() {
        displayPage(counter);
    };
    
    pageItem.textContent = counter.toString();
    
    // add classes to PAGES and PAGE BUTTONS
    if (i == 0) {
        page.className = currentPageClassName + counter;
        pageItem.className = "image-gallery-option active greyout"
    } else {
        page.className = pageClassName + counter;
        pageItem.className = "image-gallery-option";
    }
    
    imgGalleryBody.appendChild(page);
    imgGalleryPageCounter.appendChild(pageItem);
    
    // PICTURE + CHILDREN IMAGES PER PAGE
    for (let j = 0; j < ITEMS_PER_PAGE; j++) {
        const picture = document.createElement("picture");
        picture.className = "gallery-item";
        page.appendChild(picture);
        const pictureSource = document.createElement("source");
        pictureSource.srcset = "/images/media/gallery/" + arrImagesWebP[j + (i * ITEMS_PER_PAGE)];
        pictureSource.type = "image/webp";
        const pictureImg = document.createElement("img");
        pictureImg.classList.add("rendered-img");
        pictureImg.src = "/images/media/gallery/" + arrImagesJPG[j + (i * ITEMS_PER_PAGE)];
        pictureImg.loading = "lazy";

        //////// ERROR HANDLING (FOR BROKEN LINKS) ////////
        if (pictureImg.complete) {
            if (pictureImg == 0) {
                console.log("Image failed to load. (broken link)");
                imgGalleryCtrls.classList.add("hidden");
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
                imgGalleryCtrls.classList.add("hidden");
                page.classList.add("hidden");
                imgGalleryNoContent.style.display = "flex";
                
            })
        }

        picture.append(pictureSource);
        picture.append(pictureImg);

        if ((j + (i * ITEMS_PER_PAGE)) == arrImagesJPG.length - 1) {
            break;
        }
    }
}

const imgGalleryPages = Array.from(document.getElementsByClassName("image-gallery-page"));
const imgGalleryPageBtns = Array.from(document.getElementsByClassName("image-gallery-option"));

// for (let i = 0; i < imgGalleryPages.length; i++){
//     console.log(i);
// }
// console.log(imgGalleryPages[imgGalleryPages.length - 1]);

// divide array of imgs into ITEMS_PER_PAGE imgs per page

// IF there are n amount of images in the gallery, hide the gallery button controls
// (for n = ITEMS_PER_PAGE)
if (NUMBER_OF_ITEMS <= ITEMS_PER_PAGE) {
    imgGalleryCtrls.classList.add("hidden");
}
// IF there are >n amount of images in the gallery, show gallery button controls
// (for n = ITEMS_PER_PAGE)
else if (NUMBER_OF_ITEMS > ITEMS_PER_PAGE) {
    imgGalleryCtrls.classList.remove("hidden");

    
}

//////// IMAGE ENLARGE FEATURE ////////

const modal = document.getElementById("image-gallery-enlarged");
const closeBtn = document.getElementsByClassName("image-gallery-closebtn")[0];

closeBtn.onclick = function () {
    modal.style.display = "none";
}

const images = document.getElementsByClassName("rendered-img");
const modalImg = document.getElementById("img01");
for (let i = 0; i < images.length; i++) {
    images[i].onclick = function () {
        modal.style.display = "flex";
        console.log(images);
        console.log(modalImg.src);
        modalImg.src = this.src;
        // modalImg.alt = this.alt;

    }
}

imgGalleryCtrls.addEventListener("click", (event) => {
    if (event.target.matches(".image-gallery-controls") || event.target.matches(".image-gallery-option")) {
        console.log("page button pressed");
        const topAnchor = document.getElementById("call-to-scroll");

        topAnchor.scrollIntoView({ behavior: "smooth" });
    }
});