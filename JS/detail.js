import { api_key , imageBaseURL , fetchDataFromServer } from "./api.js";

import { sidebar } from "./slider.js";
import { createSliderMovieCard } from "./slidermovie_card.js";
import { search } from "./search.js";


const movieId = window.localStorage.getItem("movieId");

const bodySection1 = document.querySelector(".body-section--1");
const bodySection2 = document.querySelector("body-section--2");

sidebar();

const getGenres = function(genreList){
    const newGenreList = [];

    for(const {name} of genreList) newGenreList.push(name);

    return newGenreList.join(", ");
}

const getCasts = function (castList){
    const newCastList = [];

    for(let i = 0, len = castList.length; i < len && i < 10; i++){
        const {name} = castList[i];
        newCastList.push(name)
    }
    return newCastList.join(", ")
}

const getDirectors = function(crewList){
    const directors = crewList.filter(({job})=> job === "Director");

    const directorList = [];
    for (const {name} of directors) directorList.push(name);

    return directorList.join(", ");
}

const filterVideos = function(videoList) {
    return videoList.filter(({type , site})=> (type === "Trailer" || type === "Teaser") && site === "Youtbe");
}



 fetchDataFromServer(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&append_to_response=credits,videos,images`,function(movie){
  
  const {
    backdrop_path,
    poster_path,
    title,
    release_date,
    runtime,
    vote_average,
    genres,
    overview,
    credits : {cast , crew},
    videos: {results: videos}    
  } = movie;
 
  document.title = `${title} - FlickFlix`;

  const movieDetail = document.createElement("section");
  movieDetail.classList.add("movie-page-banner" , "flex-row");

  movieDetail.innerHTML = `
  
  <div class="movie-page-banner--img">
  <img src="${imageBaseURL}w342${poster_path}" alt="">
</div>
<div class="movie-page-banner--details">
  <div class="movie-page-banner--detailsbox-1">

 
  <h1 class="movieDetails-heading">
      ${title}
  </h1>
  <div class="movieDetails-info flex-row">
      <div class="rating-box flex-row">
          <span class="star-icon">
              <img src="./images/star.png" alt="">
          </span>
          <span class="rating">
          ${vote_average.toFixed(1)}
          </span>
      </div>
       <span>.</span>
       <div class="time">
          <p>${runtime}m</p>
       </div>
       <span>.</span>
       <div class="year">
          <p>${release_date.split("-")[0]} </p>
       </div>
  </div>
  <div class="movieGenre">
      ${getGenres(genres)}
  </div>
  <div class="movie-description">
      ${overview}
  </div>
  <div class="starring flex-row">
      <p style="width:108%;">Starring</p>
      <p>
        ${getCasts(cast)}      
      </p>
  </div>
  <div class="directed flex-row">
      <p>Directed By</p>
      <p class="desc">${getDirectors(crew)}</p>
  </div>
</div>
 
</div>
  `;


  for (const {key , name} of filterVideos(videos)){
  

     const videoCard =  document.createElement("div");
     videoCard.classList.add("video-card");

     videoCard.innerHTML = `
      <iframe width="500" height="249" src="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0"frameborder="0"allowfullscreen="1" title="${name}" class="img-cover" loading = "lazy"></iframe>
     `;

     console.log(videoCard);
     const movieViewBox = document.querySelector(".movie-video--box");
     movieViewBox.appendChild(videoCard);
   }


  bodySection1.appendChild(movieDetail);

  fetchDataFromServer(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${api_key}&page=1`, 
  addSuggestedMovies)


 });




 const addSuggestedMovies = function({
    results:movieList }, title
){
    
    const movieListBody = document.querySelector(".body-section--2")
    const movieListElem = document.createElement("section")
    movieListElem.classList.add('movie-section' , "previousOne"); 
    movieListElem.ariaLabel = `${title}`;

    movieListElem.innerHTML=`
    <div class="movie-section--heading">
    <h3>You May Also Like </h3>
  </div>
  <ul class="movie-container flex-row movieContainer" id="movieContainer">
 

  </ul>
    `;
    for (const movie of movieList){
        const movieCard = createSliderMovieCard(movie);
        
        movieListElem.querySelector(".movie-container").appendChild(movieCard)
    }

    movieListBody.appendChild(movieListElem);
}

search();