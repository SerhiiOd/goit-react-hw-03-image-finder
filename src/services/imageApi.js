import axios from 'axios';

const API_KEY = '35615645-417b36a892fa045cf3834200a';

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
