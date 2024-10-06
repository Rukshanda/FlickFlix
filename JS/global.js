 

// store movieId in 'localStorage'
// when you click any movie card

const getMovieDetail = function(movieId) {
    window.localStorage.setItem("movieId" , String(movieId));
}

const getMovieList = function (urlParam , genreName){
    window.localStorage.setItem("urlParam" , urlParam);
    window.localStorage.setItem("genreName" , genreName);
}