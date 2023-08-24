import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2I5YTFlNjg2ZTNlMDE0NGQxMTIzZmQ1ZWRiMTIxZiIsInN1YiI6IjY0ZTA0NzAyMzcxMDk3MDBmZmJhMGM0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.34iyBrKoL6jC_VaDkFczMcUmwprhvh2O0il8p-YIW7Q'

const headers= {
    Authorization:"bearer " + TMDB_TOKEN,
};


export const fetchDataFromApi = async (url, params) =>{
    try {
        const {data} = await axios.get(BASE_URL + url,{
            headers,
            params
        })
        return data;
        
    } catch (error) {
        console.log(error);
        return error;
    }
}