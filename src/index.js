import { getMovieReviewData } from "./data.js";

function init() {
    const movieReviewData = getMovieReviewData();

    paintStatistics(movieReviewData);
}

function paintStatistics(movieReviewData){
    const flatReviewData = movieReviewData.flat();

    const totalMovies = movieReviewData.length;
    const totalReviews = flatReviewData.length;
    const totalRating = flatReviewData.reduce((acc, item)=> {
        return acc + item.rating;
    },0);
    const avgRating = (totalRating/totalReviews).toFixed(2);

    const totalMoviesEl = document.getElementById("tMoviesId");
    addStat(totalMoviesEl, totalMovies);

    const avgRatingEl = document.getElementById("tAvgRatingId");
    addStat(avgRatingEl, avgRating);

    const totalReviewEl = document.getElementById("tReviewId");
    addStat(totalReviewEl, totalReviews);
    
}

function addStat(elem, value){
    const spanEl = document.createElement("span");
    spanEl.classList.add("text-6xl")
    spanEl.innerText = value;
    elem.appendChild(spanEl)
}

init()