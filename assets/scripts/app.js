const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const listRoot = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
};

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = "block";
    }
    else {
        entryTextSection.style.display = "none";
    }
};

const closeMovieDeletionModal = ()  => {
    toggleBackdrop();
    deleteMovieModal.classList.remove("visible");
};

const deleteMovie = (movieId) => {
    let moiveIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        moiveIndex++;
    }
    movies.splice(moiveIndex, 1);
    listRoot.removeChild(listRoot.children[moiveIndex]);
    closeMovieDeletionModal();
    updateUI();
};

const startDeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add("visible");
    toggleBackdrop();
    const cancelDeletionButton = deleteMovieModal.querySelector(".btn--passive");
    let confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");
    
    // replaced confirmDeletionButton add listener with its clone in-order to remove the old reference (dealt with error).
    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true)); // true -> deep clone is required to get everything.
    //get access to new button as old one won't work.
    confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");
    
    cancelDeletionButton.removeEventListener("click", closeMovieDeletionModal);

    cancelDeletionButton.addEventListener("click", closeMovieDeletionModal);
    confirmDeletionButton.addEventListener("click", deleteMovie.bind(null, movieId));
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement("li");
    newMovieElement.className = "movie-element";
    newMovieElement.innerHTML = `
        <div class="${newMovieElement.className}__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="${newMovieElement.className}__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    `;
    newMovieElement.addEventListener("click", startDeleteMovieHandler.bind(null, id));
    listRoot.appendChild(newMovieElement);
};

const closeMovieModal = () => {
    addMovieModal.classList.remove("visible");
};

const showMovieModal = () => {
    addMovieModal.classList.add("visible");
    toggleBackdrop();
};

const clearMovieInput = () => {
    for (const usrInput of userInputs) {
        usrInput.value = "";
    }
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (titleValue.trim() === "" || imageUrlValue.trim() === "" || ratingValue.trim() === "" || +ratingValue < 1 || +ratingValue > 5) {
        alert("Please enter valid values");
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };

    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInput();
};

startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
