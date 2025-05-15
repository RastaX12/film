const TMDB_API_KEY = "c8d2a5be394f106d0d73cdbf5f13d927";
const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=" + TMDB_API_KEY;

const container = document.getElementById("movieContainer");

async function loadMovies() {
  const res = await fetch(API_URL);
  const data = await res.json();

  container.innerHTML = "";
  data.results.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = \`
      <img src="https://image.tmdb.org/t/p/w500\${movie.poster_path}" alt="\${movie.title}" />
      <h3>\${movie.title}</h3>
      <p>\${movie.release_date?.split('-')[0]}</p>
      <a href="film.html?id=\${movie.id}">Szczegóły</a>
    \`;
    container.appendChild(card);
  });
}

loadMovies();