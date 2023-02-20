import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from "./components/MovieList";
import './App.css'
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavs from "./components/AddFavs";
import RemoveFavs from "./components/RemoveFavs";

// Main function
const App = () => {
  // State object to hold movies 
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  
  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=d69b8696`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search) {
      setMovies(responseJson.Search);
    }
    
  };

  useEffect(()=>{
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'));

    setFavourites(movieFavourites);
  }, [])
  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  }
  
  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie]
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((favorite)=> favorite.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
  };
  return (
    <div className='container-fluid movie-app'>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading = 'Movies'/>
        <SearchBox searchValue = {searchValue} setSearchValue = {setSearchValue}/>
      </div>
			<div className='row'>
        <MovieList handleFavouritesClick={addFavouriteMovie} favoriteComponent = {AddFavs} movies={movies} />
			</div>

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading = 'Favourites'/>
      </div>
      <div className='row'>
        <MovieList handleFavouritesClick={removeFavouriteMovie} favoriteComponent = {RemoveFavs} movies={favourites} />
			</div>
		</div>
  )
}

export default App;