

export async function fetchImages(query) {
    const API_KEY = '46859112-8db04929d193e6e9d044d366e';
    const BASE_URL = 'https://pixabay.com/api/';
    const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`; // Используйте обратные кавычки

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Ошибка при получении данных');
    }
    const data = await response.json();
    return data.hits; 
}
