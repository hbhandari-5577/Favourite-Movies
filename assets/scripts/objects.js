const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movies = [];

const renderMovies = (filter = "") => {
    const movieList= document.getElementById("movie-list");

    if (movies.length === 0) {
        movieList.classList.remove("visible");
        return;
    }
    else {
        movieList.classList.add("visible");
    }

    movieList.innerHTML = "";

    /* if filter is empty (falsy), then render all movies
    if filter is not empty (truthy), then render filtered movies for given string */
    const filteredMovies = !filter ? movies : movies.filter((movie) => {
        return movie.info.title.includes(filter);
    });

    filteredMovies.forEach((movie) => {
        const movieEl = document.createElement("li");
        let text = movie.info.title + " - ";

        // as value in extraName will be entered at runtime, looping will give us the dynamic property
        for (const key in movie.info) {
            if (key !== "title") {
                text = text + `${key}: ${movie.info[key]}`;
            }
        }
        movieEl.textContent = text;
        movieList.appendChild(movieEl);
    });
};

const addMovieHandler = () => {
    const title = document.getElementById("title").value;
    const extraName = document.getElementById("extra-name").value;
    const extraValue = document.getElementById("extra-value").value;

    if (title.trim() === "" || extraName.trim() === "" || extraValue.trim() === "") {
        return;
    }

    const newMovie = {
        info: {
            title: title,
            [extraName]: extraValue
        },
        id: Math.random()
    };

    movies.push(newMovie);
    renderMovies();
};

const searchMovieHandler = () => {
    const filterTerm = document.getElementById("filter-title").value;
    renderMovies(filterTerm);
};

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler);
