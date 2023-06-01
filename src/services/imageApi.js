import axios from 'axios';

const API_KEY = '30754633-49a4360a1de811b7fe1cb3ed9';

export const fetchImages = async (page, value) => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      q: value,
      page: page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: '12',
      safesearch: true,
    },
  });
  return response.data;
};
