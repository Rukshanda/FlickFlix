
import { sidebar } from "./JS/slider.js";
import { api_key , imageBaseURL , fetchDataFromServer } from "./JS/api.js";
import { createSliderMovieCard } from "./JS/slidermovie_card.js";
import { search } from "./JS/search.js";


window.onload = function() {
    const body = document.querySelector(".body-section--1");
    sidebar();
    
    
    //Home page sections {Upcoming Movies , Trending Movies , Top Rated Movies}
    
    const homePageSections = [
        {
            title: "Upcoming Movies",
            path: "/movie/upcoming"
        },
        {
            title: "Weekly Trending Movies",
            path: "/trending/movie/week"
        },
        {
            title: "Top Rated Movies",
            path: "/movie/top_rated"
        }
    ]
    
    
    const heroBanner = function ({results: movieList}){
        const banner = document.createElement("section");
        banner.classList.add("carousel");
        banner.ariaLabel = "Popular Movies";
    
        banner.innerHTML =   `
        <!-- list item -->
        <div class="list"></div>
        <!-- list thumbnail -->
        <div class="thumbnail"></div>
        <!-- next prev -->
        <div class="arrows">
            <button id="prev"><</button>
            <button id="next">></button>
        </div>
        <!-- time running -->
        <div class="time"></div>
        `;
        for (const [index, movie] of movieList.entries()){
            const {
                backdrop_path,
                title,
                release_date,
                genre_ids,
                overview,
                poster_path,
                vote_average,
                id
    
            } = movie;
    
    
            const sliderItem = document.createElement("div");
            sliderItem.classList.add("item");
            sliderItem.setAttribute("item" , "");
    
            sliderItem.innerHTML = `
    
            <img src="${imageBaseURL}w1280${backdrop_path}" alt = "${title}">
            <div class="content">
                <div class="title">${title}</div>
                <div class="content-details">
                  <div class="info flex-row">
                    <span class="year">${release_date.split("-")[0]}</span>
                    <span class="ratting">${vote_average.toFixed(1)} </span>
                  </div>
                  <div class="genre">
                    <p class="genre-text">
                    ${genreList.asString(genre_ids)}
                    </p>
                  </div>
                </div>
                <div class="des">
                    <!-- lorem 50 -->
                    ${overview}            </div>
                <div class="buttons">
                <a href="./detail.html" onclick="getMovieDetail(${id})">
                    <button><i class="fa-solid fa-circle-play"></i> 
                     <span>
                     Watch Video
                     </span>
                    </button>
                    </a>
                </div>
            </div>
    
        
            `
    
            banner.querySelector(".list").appendChild(sliderItem);
    
    
            const controlItem = document.createElement("div");
            controlItem.classList.add("next-box");
    
            controlItem.innerHTML = `
            <img src="${imageBaseURL}w154${poster_path}" alt="Slide to ${title}"
            loading="lazy" draggable="false">
            <div class="content">
                <div class="title">
                   ${title}
                </div>
            </div>
            `;
    
            banner.querySelector(".thumbnail").appendChild(controlItem);
    
            
           // Get references to the list and thumbnail elements
        const listElement = banner.querySelector(".list");
        const thumbnailElement = banner.querySelector(".thumbnail");
    
        if (!listElement || !thumbnailElement) {
            console.error("Unable to find list or thumbnail elements.");
            return;
        }
    
        for (const [index, movie] of movieList.entries()){
            // ... (rest of your code remains unchanged)
            // Append items to the list and thumbnail elements after creating them
            listElement.appendChild(sliderItem);
            thumbnailElement.appendChild(controlItem);
        }
    
         }
          
    
         body.appendChild(banner)
    
        //  fetch data for home page sections (top rated, upcoming , trending)
    
        for(const {title, path} of homePageSections){
            fetchDataFromServer(`https://api.themoviedb.org/3${path}?api_key=${api_key}&page=1`, createMovieList , title)
        }
    }
    
    
    const genreList = {
    
        // create genre string from genre_id eg:[23 , 23] -> "Actions , Romance"
     
        asString(genreIdList){
            let newGenreList = [];
    
            for(const genreId of genreIdList){
                this[genreId] && newGenreList.push(this[genreId]);
                //this === genreList
            }
            return newGenreList.join(", ");
        }
    };
    
    
    
        fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, function ({genres}) {
            for(const {id , name} of genres){
                genreList[id] = name;
            }
            
            fetchDataFromServer(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=1` , heroBanner);
        });
    
    
    
    
    
    
    // createMovieList functions
    
    const createMovieList = function({
        results:movieList }, title
    ){
        
        const movieListBody = document.querySelector(".body-section--2")
        const movieListElem = document.createElement("section")
        movieListElem.classList.add('movie-section'); 
        movieListElem.ariaLabel = `${title}`;
    
        movieListElem.innerHTML=`
        <div class="movie-section--heading">
        <h3>${title}</h3>
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
    
    
    
    
    
    
    
    
    
    
    
    
    
     };










     search();