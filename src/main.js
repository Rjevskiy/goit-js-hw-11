// main.js
import { fetchImages } from './js/pixabay-api.js';
import { displayImages } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox"; // Импорт SimpleLightbox
import "simplelightbox/dist/simple-lightbox.min.css"; // Импорт стилей SimpleLightbox

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const loader = document.getElementById('loader'); // Индикатор загрузки
let lightbox;

// Инициализация SimpleLightbox
lightbox = new SimpleLightbox('.gallery-item a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = input.value.trim();

    // Проверка на пустой запрос
    if (!query) {
        iziToast.warning({
            title: "Warning",
            message: "Please enter a search query!",
            position: 'topRight'
        });
        return;
    }

    try {
        loader.style.display = 'block'; // Показать индикатор загрузки
        const images = await fetchImages(query);

        // Проверка на пустой массив
        if (images.length === 0) {
            iziToast.info({
                title: "Sorry",
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: 'topRight'
            });
            return;
        }

        displayImages(images);
        lightbox.refresh(); // Обновить SimpleLightbox после добавления новых изображений
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: "Failed to fetch images. Please try again later.",
            position: 'topRight'
        });
    } finally {
        loader.style.display = 'none'; // Скрыть индикатор загрузки
    }
});
