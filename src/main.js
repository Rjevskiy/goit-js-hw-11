import { fetchImages } from './js/pixabay-api.js';
import { displayImages } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const loader = document.getElementById('loader');
const gallery = document.getElementById('gallery');
let lightbox = new SimpleLightbox('.gallery-item a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = input.value.trim();

    if (!query) {
        iziToast.warning({
            title: "Warning",
            message: "Please enter a search query!",
            position: 'topRight'
        });
        return;
    }

// Показать индикатор загрузки и очистить предыдущие результаты
    loader.style.display = 'block';
    gallery.innerHTML = '';

    fetchImages(query)
        .then(images => {
            if (images.length === 0) {
                iziToast.info({
                    title: "Sorry",
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: 'topRight'
                });
                return;
            }
// Обновляем SimpleLightbox 
            displayImages(images);
            lightbox.refresh(); 
        })
        .catch(error => {
            iziToast.error({
                title: "Error",
                message: "Failed to fetch images. Please try again later.",
                position: 'topRight'
            });
        })
// Скрываем индикатор загрузки        
        .finally(() => {
            loader.style.display = 'none'; 
        });
});
