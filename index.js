// Напишіть функцію або клас, яка виконуватиме запити до API Pixabay, передаючи необхідні параметри, такі як API-ключ, тип
//  запиту та номер сторінки.
//Використайте отримані дані для відображення зображень на сторінці.
//Встановіть обмеження кількості зображень, які будуть відображатись на одній сторінці.
//Реалізуйте пагінацію, яка включатиме кнопку "Завантажити ще" 
//При кліці на кнопку "Завантажити ще" виконайте відповідний запит до API Pixabay і оновіть список зображень на новій 
// сторінці.
const api_key = '49388392-02e817ef61ae4618fbf814ce7';;
const imageGallery = document.querySelector('#image-gallery');
const loadMoreBtn = document.querySelector('#load-more-btn');
let page = 1;
let query = '';
imageGallery.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;       
    query = event.target.searchQuery.value;
    fetchImages();
});
loadMoreBtn.addEventListener('click', () => {   
    page++;       
    fetchImages();
});
async function fetchImages() {
    try {       
        const response = await fetch(`https://pixabay.com/api/?key=${api_key}&q=${query}&page=${page}&per_page=40`);
        const data = await response.json();
        displayImages(data.hits);
        if (page === 1) {
            loadMoreBtn.style.display = 'block';
        } else if (data.hits.length < 40) {
            loadMoreBtn.style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}
function displayImages(images) {
    imageGallery.innerHTML = '';
    images.forEach(image => {
        const imageElement = document.createElement('img');
        imageElement.src = image.webformatURL;
        imageElement.alt = image.tags;
        imageGallery.appendChild(imageElement);
    });
}
fetchImages();
