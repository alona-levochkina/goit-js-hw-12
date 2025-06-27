import axios from 'axios';

const API_KEY = '50849139-d21d04a61911bfdf6ebb62f1b';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('catch error', error);
    throw error;
  }
}
