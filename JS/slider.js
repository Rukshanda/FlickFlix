import {api_key, fetchDataFromServer } from "./api.js";

 
 export function sidebar(){
    const genreList = {};

    fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, function ({genres}) {
        for(const {id , name} of genres){
            genreList[id] = name;
        }
        genreLink();
    });

    const sidebarInner = document.createElement("div");

    sidebarInner.classList.add("sidebar--container");

    sidebarInner.innerHTML =  `
        <h3 id="genreheading">Genre</h3>
    <div class="sidebar-list">

     
  </div>
 

    `;

    const genreLink = function () {
        for (const [genreId, genreName] of Object.entries 
            (genreList)){
                const link = document.createElement("a");
                link.classList.add("genre-list" , "flex-row");
                link.setAttribute("href" , "./movielist.html");
                link.setAttribute("menu-close" , "");
                link.setAttribute("onclick" , `getMovieList("with_genres=${genreId}", "${genreName}")`);
                 link.textContent = genreName;
                  
                 sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
                }

        const sidebar = document.querySelector(".sidebar");
        sidebar.appendChild(sidebarInner);
      
    }
 }
