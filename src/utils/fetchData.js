import axios from "axios"
const BASE_URL = 'https://exercisedb.p.rapidapi.com'

const options = {
    params: {
        limit: '1000',
        offset: '0'
      },
    headers: {
        'x-rapidapi-key': import.meta.env.VITE_APP_RAPIDAPI_KEY,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    };

export const fetchData = async (url) => {
    try {
        const {data} = await axios.get(`${BASE_URL}/${url}`, options);
    return data
    } catch (error) {
        console.error("Error fetching data", error);
    }
    
}