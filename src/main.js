
import { fetchImages } from './js/pixabay-api.js';
import { displayImages } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox"; 
import "simplelightbox/dist/simple-lightbox.min.css"; 

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const loader = document.getElementById('loader'); 

let lightbox;

// Инициализация SimpleLightbox
lightbox = new SimpleLightbox('.gallery-item a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 150
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = input.value.trim();

// Проверяем на пустой запрос
    if (!query) {
        iziToast.warning({
            title: "Warning",
            message: "Please enter a search query!",
            position: 'topRight'
        });
        return;
    }
// Показываем индикатор загрузки
    try {
        loader.style.display = 'block'; 
        const images = await fetchImages(query);

// Проверяем пустой массив
        if (images.length === 0) {
            iziToast.info({
                title: "Sorry",
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: 'topRight'
            });
            return;
        }
// Обновить SimpleLightbox после добавления новых img
        displayImages(images);
        lightbox.refresh(); 
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: "Failed to fetch images. Please try again later.",
            position: 'topRight'
        });
// Удаляем индикатор загрузки
    } finally {
        loader.style.display = 'none'; 
    }
});
