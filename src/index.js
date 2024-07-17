import { getMovieReviewData } from "./data.js";

let sortDesc = false;

function init() {
    const movieReviewData = getMovieReviewData();

    registerHandlers(movieReviewData)
    paintStatistics(movieReviewData);
    paintMovieData(movieReviewData);
}

function paintStatistics(movieReviewData){
    const flatReviewData = movieReviewData.flat();
    //console.log(flatReviewData);

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
};


function paintMovieData(movieReviewData){
    const flatReviewData = movieReviewData.flat();

    const sorted = flatReviewData.toSorted((a, b)=> b.on - a.on);

    const movieListEl = document.querySelector('#movieListId UL');

    console.log(movieListEl);
    
    addMovieReviewData(movieListEl, sorted)
}

function registerHandlers(movieReviewData){
    const sortBtn = document.getElementById("srtBtnId");

    sortBtn.addEventListener("click", () => sortByReview(movieReviewData))
}

function sortByReview(movieReviewData){
    const flatReviewData = movieReviewData.flat();
    sortDesc = !sortDesc;
    //console.log(flatReviewData);

    let sortReviewData = sortDesc 
    ? flatReviewData.toSorted((a,b) => b.rating - a.rating) 
    : flatReviewData.toSorted((a,b) => a.rating - b.rating);

    const movieListEl = document.querySelector('#movieListId UL');

    removeAllChildNodes(movieListEl);
    addMovieReviewData(movieListEl, sortReviewData);
}

function addMovieReviewData(movieListEl, movieReview){
    movieReview.map((movie)=>{
        console.log(movie);
    
        const liElem = document.createElement('li');
        liElem.classList.add("card", "p-2", "my-2")

        const titleElem = document.createElement('p');
        titleElem.classList.add('text-xl', 'mb-2');
        titleElem.innerText = `${movie.title} - ${movie.rating}`;
        liElem.appendChild(titleElem);

        const reviewElem = document.createElement('p');
        reviewElem.classList.add('mx-2', 'mb-2');
        reviewElem.innerText = movie.content
        liElem.appendChild(reviewElem);

        const byElem = document.createElement('p');
        byElem.classList.add('mx-2', 'mb-2');
        byElem.innerText = `By ${movie.by} - ${new Intl.DateTimeFormat('en-BD').format(movie.on)}`;
        liElem.appendChild(byElem);

        movieListEl.appendChild(liElem);

    })
}

function removeAllChildNodes(parent){
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

init();