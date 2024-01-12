import axios from 'axios';

const API_URL = 'https://wallhaven.cc/api/v1/search';

const fetchWallpapers = async (query, sorting, order, resolution) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        q: query,
        sorting: sorting,
        order: order,
        resolution: resolution,
      },
    });

    return response.data.data; 
  } catch (error) {
    console.error('Error fetching wallpapers:', error);
    throw error;
  }
};

export default fetchWallpapers;
