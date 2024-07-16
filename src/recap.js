import { getMovieReviewData } from "./data.js";

function init(){
    const movieReviewData = getMovieReviewData();
    
    paintStatistics(movieReviewData);
    paintMovieData(movieReviewData);
}

function paintStatistics(movieReviewData){
    const flatReviewData = movieReviewData.flat();

    //console.log(flatReviewData);

    const totalMovie = movieReviewData.length;
    const totalReview = flatReviewData.length;
    const totalRating = flatReviewData.reduce((acc, item)=>{
        return acc + item.rating;
    }, 0)

    const avgRating = (totalRating/totalReview).toFixed(2);

    const totalMovieEl = document.getElementById('tMoviesId');
    addStat(totalMovieEl, totalMovie)

    const avgRatingEl = document.getElementById('tAvgRatingId');
    addStat(avgRatingEl, avgRating)

    const totalReviewEl = document.getElementById('tReviewId');
    addStat(totalReviewEl, totalMovie)



};

function addStat(ele, value){
    const spanEl = document.createElement('span');
    spanEl.classList.add('text-6xl')
    spanEl.innerText = value;
    ele.appendChild(spanEl)
}

function paintMovieData(movieReviewData){
    const flatReviewData = movieReviewData.flat();
    const movieListEl = document.querySelector("#movieListId UL")

    flatReviewData.map((movie)=>{
        console.log(movie);
        const liElem = document.createElement('li');
        liElem.classList.add("card", "p-2", "my-2")

        const titleElem = document.createElement('p');
        titleElem.classList.add('mb-2', 'text-xl');
        titleElem.innerText = `${movie.title} - ${movie.rating}`;
        liElem.appendChild(titleElem);
        

        const reviewElem = document.createElement('p');
        reviewElem.classList.add('mb-2', 'mx-2');
        reviewElem.innerText = movie.content;
        liElem.appendChild(reviewElem);

        const byElem = document.createElement('p');
        byElem.classList.add('mb-2', 'mx-2');
        byElem.innerText = `By ${movie.by} - ${new Intl.DateTimeFormat('en-BD').format(movie.on)}`;
        liElem.appendChild(byElem)

        movieListEl.appendChild(liElem)

        
    })
}

init()