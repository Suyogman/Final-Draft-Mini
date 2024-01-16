const URLL = 'http://localhost:5000/books';
async function AddtoFav(title) {
    console.log("Title", title);
    const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const myuserId = user["id"];
    console.log(myuserId);

    try {
        const response = await axios.get(`http://localhost:5000/users/${myuserId}`);
        const userData = response.data;

        if (!userData.favourites) {
            userData.favourites = [];
        }

       
        if (userData.favourites.includes(title)) {
            alert(`${title} is already in favorites!`);
            return; 
        }

        userData.favourites.push(title);

        await axios.patch(`http://localhost:5000/users/${myuserId}`, userData);
        alert("Successfully added to Favourites");
        console.log("Added to favorites:", title);
        displayFavorites(myuserId);
    } catch (error) {
        console.error("Error adding to favorites:", error);
    }
}

async function removeFavorite(title) {
    const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const myuserId = user["id"];

    try {
        const response = await axios.get(`http://localhost:5000/users/${myuserId}`);
        const userData = response.data;

        if (!userData.favourites) {
            userData.favourites = [];
        }

        const index = userData.favourites.indexOf(title);
        if (index !== -1) {
            
            userData.favourites.splice(index, 1);
            await axios.patch(`http://localhost:5000/users/${myuserId}`, userData);
            console.log("Removed from favorites:", title);
            displayFavorites(myuserId);
            alert(`Removed ${title} from favorites!`);
        } else {
            alert(`${title} is not in favorites.`);
        }
    } catch (error) {
        console.error("Error removing from favorites:", error);
    }
}

async function displayFavorites(myuserId) {
    
    try {
        const userResponse = await axios.get(`http://localhost:5000/users/${myuserId}`);
        const userData = userResponse.data;

        if (userData.favourites && userData.favourites.length > 0) {
            
            const moviesResponse = await axios.get(URLL);
            const movies = moviesResponse.data;
            // console.log(userData);
            const favoriteMovies = movies.filter(movie => userData.favourites.includes(movie.title));
            console.log(favoriteMovies);
            const favoriteContainer = document.getElementById('favorite-container');
            favoriteContainer.innerHTML = '';

            favoriteMovies.forEach(function (item) {
                const card = document.createElement('div');
                card.innerHTML = `
                <div class="col-lg-12">
          <div class="latest-inside">
            <img src="${item.image}" class="img-fluid" alt="${item.author}">
            <h5 class="card-title">${item.author}</h5>
            <p class="card-text">${item.language}</p>
            <button class="btn btn-warning" data-toggle="modal" data-target="#videoModal" data-audio-link="${item.audioLink}">
              Play Audio
            </button>
            <button type="button" class="btn btn-danger" onclick="removeFavorite('${item.title}')">
                  Remove
                  </button>
          </div>
        </div>
                `;
                favoriteContainer.appendChild(card);
            });
        }
    } catch (error) {
        console.error("Error fetching user's favorites:", error);
    }
}

const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
const myuserId = user["id"];
displayFavorites(myuserId);