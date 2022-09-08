import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const gallery = document.querySelector(".gallery");
const imgMarkup = createGalleryItems(galleryItems);
gallery.insertAdjacentHTML("beforeend", imgMarkup);

function createGalleryItems(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <a class="gallery__item" 
      href="${original}">
  <img class="gallery__image" 
  src="${preview}" 
  alt="${description}" />
</a>`;
    })
    .join("");
}

var lightbox = new SimpleLightbox(".gallery a", {
  captionDelay: 250,
  captionPosition: "bottom",
  captionsData: "alt",
  overlayOpacity: "1",
  doubleTapZoom: "2",
});

console.log(galleryItems);
