import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form"); 
const input = document.querySelector(".form-input");
const loadMore = document.querySelector(".load-btn")

form.addEventListener("submit", handleSubmit);
loadMore.addEventListener("click", onLoadMore);
let page = 0;
const per_page = 15;
let currentQuery = "";
let totalPages = 0;

async function handleSubmit(event) {
    event.preventDefault();

    const query = input.value.trim();
    currentQuery = query;
    page = 1;

    if (query === "") {
        iziToast.error({
            message: "Please enter a search term",
            backgroundColor: '#ef4040',
            position: 'topRight'
        });
        return;
    }

    clearGallery();
    hideLoadMoreButton();
    showLoader();
   
    try {
        const res = await getImagesByQuery(query, page);
    
        if (res.hits.length === 0) {
                iziToast.error({
                    message: `❌ Sorry, there are no images matching your search query. Please try again!`,
                    backgroundColor: '#ef4040',
                    position: 'topRight'
                })
            return;
        }

        totalPages = Math.ceil(res.totalHits / per_page);

        createGallery(res.hits);

        if (page < totalPages) {
            showLoadMoreButton();
        }
        
    } catch (error) {
        iziToast.error({
            message: "Something went wrong. Please try again!",
            backgroundColor: '#ef4040',
            position: 'topRight',
            icon: null
        });
    } finally {
        hideLoader();
        input.value = "";
    }
    
}

async function onLoadMore() {
    page++;
    showLoader();
    hideLoadMoreButton();

    try {
        const data = await getImagesByQuery(currentQuery, page);

        createGallery(data.hits);

        totalPages = Math.ceil(data.totalHits / per_page);

        if (page >= totalPages) {
            hideLoadMoreButton();
               iziToast.info({
                   message: "We're sorry, but you've reached the end of search results!",
                   backgroundColor: "rgba(4, 158, 255, 0.5)",
                   position: 'topRight',
                });
        } else {
            showLoadMoreButton();
        }

        const card = document.querySelector(".gallery-item");

         const cardHeight = card.getBoundingClientRect().height;
          if (cardHeight) { window.scrollBy({
                left: 0,
                top: cardHeight * 2,
                behavior: "smooth"
            })}
    } catch (error) {
        iziToast.error({
                message: "Something went wrong. Please try again!",
                backgroundColor: '#ef4040',
                position: 'topRight',
                icon: null
        })
        showLoadMoreButton();
    } finally {
        hideLoader();
    }
    
}
