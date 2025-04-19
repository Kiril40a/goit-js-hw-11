import axios from 'axios';
import iziToast from 'izitoast';
export function getImagesByQuery(query) {
    return axios.get('https://pixabay.com/api/', {
        params: {
            key: '49815618-f39b281f22944c1de1a6cd368',
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true'
        }
    })
        .then(response => {
            if (response.data.hits.length === 0) {
                iziToast.show({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                    backgroundColor: 'rgba(255, 0, 0, .6)'
                });
            }
            return response.data.hits;
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });
}
