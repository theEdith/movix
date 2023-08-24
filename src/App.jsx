import {React, useEffect} from 'react';
import {fetchDataFromApi} from './utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, getGenres} from './store/homeSlice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import HeroBanner from './pages/home/heroBanner/HeroBanner';
import SearchResult from './pages/searchResult/SearchResult';
import Header from './components/header/Header';
import Explore from './pages/explore/Explore';
import Footer from './components/footer/Footer';
import Details from './pages/details/Details';



function App() {
  const dispatch = useDispatch();
  const {url} = useSelector((state)=> state.home);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);


  const fetchApiConfig = () =>{
    fetchDataFromApi('/configuration')
    .then((res) =>{
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      }

      dispatch(getApiConfiguration(url));
    })
  }

  const genresCall = async () =>{
    let promises = [];
    let endPoints = ['tv','movie'];
    let allGenres = {}

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises);
    data.map(({genres})=>{
      return genres.map((item)=> (allGenres[item.id] = item))
    });

    dispatch(getGenres(allGenres));
  }

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/> 
      <Route path='/search/:query' element={<SearchResult/>}   />
      <Route path='/explore/:mediaType' element={<Explore/>}/>
      <Route path="/:mediaType/:id" element={<Details />} />
      <Route path='/search/:query' element={<SearchResult/>}/>
      <Route path='/explore/:mediaType' element={<Explore/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
