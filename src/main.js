import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions"

let searchWord = document.querySelector('input[name=search-text]');
let images;
document.querySelector(".form").addEventListener("submit", (e) => {
    e.preventDefault();
    showLoader();
    clearGallery();
    if (searchWord.value != "") {
        getImagesByQuery(searchWord.value)
            .then((data) => {
                images = data;
                createGallery(images);
                hideLoader();
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }
    
})
document.querySelector(".open").addEventListener("click", () => {
    showLoader()
})
document.querySelector('.close').addEventListener("click", () => {
    hideLoader()
})