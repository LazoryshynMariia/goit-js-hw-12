import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const ul = document.querySelector(".gallery");
const lightBox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250
});
const loader = document.querySelector(".loader");
const loadMore = document.querySelector(".load-btn");

export function createGallery(images) {
    const imageslist = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
  <li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}">
      <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
    </a>
    <div class="info">
      <p class ="info-item"><span>Likes:</span> ${likes}</p>
      <p class ="info-item"><span>Views:</span> ${views}</p>
      <p class ="info-item"><span>Comments:</span> ${comments}</p>
      <p class ="info-item"><span>Downloads:</span> ${downloads}</p>
    </div>
  </li>
`).join('');
    
    ul.insertAdjacentHTML("beforeend", imageslist);
    
    lightBox.refresh();
};

export function clearGallery() {
    ul.innerHTML = '';
};

export function showLoader() {
    loader.classList.remove("hidden");
};

export function hideLoader() {
    loader.classList.add("hidden");
};

export function showLoadMoreButton() {
    loadMore.classList.remove("hidden");
};

export function hideLoadMoreButton() {
    loadMore.classList.add("hidden");
}
