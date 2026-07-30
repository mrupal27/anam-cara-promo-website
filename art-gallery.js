//Collects all artwork images that can be opened
const galleryImages = document.querySelectorAll(".gallery-row img");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeButton = document.getElementById("lightbox-close");

let previouslyFocusedElement = null;

//Displays the selected image in the larger popout
function openLightbox(selectedImage) {
  previouslyFocusedElement = document.activeElement;

  lightboxImage.src = selectedImage.src;
  lightboxImage.alt = selectedImage.alt;
  lightboxCaption.textContent = selectedImage.alt;

  lightbox.hidden = false;
  lightbox.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  closeButton.focus();
}

//Closes the popout and resets the image information
function closeLightbox() {
  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");

  lightboxImage.src = "";
  lightboxImage.alt = "";
  lightboxCaption.textContent = "";

  document.body.classList.remove("modal-open");

  //Returns keyboard focus to the image that was previously selected
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
  }
}

galleryImages.forEach((image) => {
  image.tabIndex = 0;
  image.setAttribute("role", "button");
  image.setAttribute(
    "aria-label",
    `${image.alt}. Open a larger version.`
  );

  image.addEventListener("click", () => {
    openLightbox(image);
  });

  //Also allows images to be opened using keyboard controls
  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(image);
    }
  });
});

closeButton.addEventListener("click", closeLightbox);

//Clicking the dark space outside the artwork also closes it
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

//Escape gives another quick way of closing the enlarged artwork
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});