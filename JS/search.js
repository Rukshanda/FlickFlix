import { api_key , fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./movie_card.js";


export function search(){
    console.log("Search")
    const anotherContainer = document.querySelector(".body-section--1");
    const previousOne  = document.querySelectorAll(".movie-section")
    const searchWrapper = document.querySelector(".search-bar");

    const searchField = document.querySelector(".search-field");

    const searchResultModel = document.createElement("div");

    searchResultModel.classList.add(".searchRes");

    document.querySelector(".body-section--2").appendChild(searchResultModel);

    let searchTimeout;

    searchField.addEventListener("input" , function(){
        if(!searchField.value.trim()){
            searchResultModel.style.display = "none";
            clearTimeout(searchTimeout);
            anotherContainer.style.display = "flex";
            document.querySelectorAll(".movie-section").forEach(el => el.style.display = "block" );
            return;
        }
        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(() => {
             fetchDataFromServer(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchField.value}&page=1&include_adult=false` , function ({results: movieList}){

             searchWrapper.classList.remove('searching');
             searchResultModel.style.display = "block";
             anotherContainer.style.display = "none";
             document.querySelectorAll(".movie-section").forEach(el => el.style.display = "none" );
           
             searchResultModel.innerHTML = "";

             searchResultModel.innerHTML = `
             
             



             <p style="    margin-top: 10px;
             font-size: 1.2rem;
             font-weight: 800;">Results for</p>
              
    <div class="movie-section--heading">
    <h3 style="font-size: 2rem;
    font-weight: 800;
    text-transform: capitalize;">${searchField.value}</h3>
  </div>
  <ul class="searchmovie-container flex-row ">
   
  </ul>
             `;


             for(const movie of movieList) {
                const movieCard = createMovieCard(movie);
                searchResultModel.querySelector(".searchmovie-container").appendChild(movieCard);
             }




             })
        }, 500);

    })
}