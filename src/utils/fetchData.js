import axios from "axios";

// Environment variable for API key
const API_KEY = import.meta.env.VITE_APP_RAPIDAPI_KEY;

// Common headers for both APIs
const headers = {
  'x-rapidapi-key': API_KEY,
};

// Base URLs for the APIs
const BASE_URL_EXERCISE_DB = 'https://exercisedb.p.rapidapi.com';
const BASE_URL_YOU_TUBE = 'https://youtube-search-and-download.p.rapidapi.com';

// Options for exercise API
const exerciseOptions = {
  params: {
    limit: '1000',
    offset: '0',
  },
  headers: {
    ...headers,
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
  },
};

// Function to fetch data from exercise API
export const fetchData = async (url) => {
  try {
    const { data } = await axios.get(`${BASE_URL_EXERCISE_DB}/${url}`, exerciseOptions);
    return data;
  } catch (error) {
    console.error("Error fetching exercise data", error);
  }
};

// Function to fetch data from YouTube API
export const fetchDataYouTube = async (url) => {
  try {
    const { data } = await axios.get(`${BASE_URL_YOU_TUBE}/${url}`, {
      headers: {
        ...headers,
        'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com',
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching YouTube data", error);
  }
};
