const api_key = 'b4f5626156c4ded244a49f3897814e0b' ;
const imageBaseURL = "http://image.tmdb.org/t/p/" ;

const fetchDataFromServer = function (url, callback, 
    optionalParam) {
    fetch(url)
    .then(response => response.json())
    .then(data => callback(data, optionalParam));
    }
    export {imageBaseURL, api_key, fetchDataFromServer };