

import { imageBaseURL } from "./api.js";


// movie card

export function createSliderMovieCard(movie){
    const{
        poster_path,
        title,
        vote_average,
        release_date,
        id
    } = movie ;

    const card = document.createElement("li");
    card.classList.add("slidermovie_card");

    card.innerHTML = `
    <a href="./detail.html" onclick="getMovieDetail(${id})">
    <img src="${imageBaseURL}w342${poster_path}" alt="${title}"
   
   class="slidermovie_card--img">
      <p class="slidermovie_card--title">
        ${title}
      </p>
      <div class="movie-details flex-row">
        <div class="rating-box flex-row">
          <span class="star-icon">
            <img src="./images/star.png" alt="">
          </span>
          <span class="ratting">${vote_average.toFixed(1)}</span>
        </div>
        <div class="movie-year">
          <p>${release_date.split("-")[0]}</p>
        </div>
      </div> 
      </a>
    `;

    return card;
    
}