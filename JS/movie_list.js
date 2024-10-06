

import {api_key, fetchDataFromServer } from "./api.js";
import { sidebar } from "./slider.js";
import { createMovieCard } from "./movie_card.js";
import { search } from "./search.js";

const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");
const bodySection1 = document.querySelector(".body-section--1");



sidebar();

let currentPage = 1;
let totalPages = 0;
const fetchUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`

fetchDataFromServer(fetchUrl,
function({results: movieList, total_pages}){

    totalPages = total_pages;
    document.title =   `${genreName} Movies - FlickFlix`;

    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movies-section" ,"movielist");

    movieListElem.ariaLabel = `${genreName} Movies`;

    movieListElem.innerHTML =  `
    
    <div class="movie-section--heading">
    <h3>All ${genreName} Movies</h3>
  </div>
  <ul class="searchmovie-container flex-row ">
      
  </ul>

  <button class = "btn load-more"> Load More </button>
    `;


    for (const movie of movieList) {
        const movieCard = createMovieCard(movie);

        movieListElem.querySelector('.searchmovie-container').appendChild(movieCard);


    }
    
    bodySection1.appendChild(movieListElem);


    document.querySelector(".load-more").addEventListener("click" , function(){
        if(currentPage >= totalPages) {
            this.style.display = "none";
            return;
        }
        
        currentPage++;
        this.style.display = "block";

        fetchDataFromServer(fetchUrl, ({results: movieList})=> {
            this.style.display= "none";
          
            for (const movie of movieList){
                const movieCard = createMovieCard(movie);
                movieListElem.querySelector('.searchmovie-container').appendChild(movieCard);
            }
        })
    })

});

search();