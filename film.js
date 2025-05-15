const TMDB_API_KEY = "c8d2a5be394f106d0d73cdbf5f13d927";
const API_BASE = "https://api.themoviedb.org/3";

const params = new URLSearchParams(window.location.search);
const filmId = params.get("id");

const details = document.getElementById("filmDetails");
const modal = document.getElementById("modal");
const fakePlay = document.getElementById("fakePlay");

async function loadFilm() {
  const res = await fetch(\`\${API_BASE}/movie/\${filmId}?api_key=\${TMDB_API_KEY}&language=pl-PL\`);
  const data = await res.json();

  const ytRes = await fetch(\`\${API_BASE}/movie/\${filmId}/videos?api_key=\${TMDB_API_KEY}&language=en-US\`);
  const ytData = await ytRes.json();
  const trailer = ytData.results.find(v => v.site === "YouTube");

  details.innerHTML = \`
    <img src="https://image.tmdb.org/t/p/w500\${data.poster_path}" alt="\${data.title}" />
    <h2>\${data.title} (\${data.release_date?.split('-')[0]})</h2>
    <p>\${data.overview}</p>
    \${trailer ? \`<iframe width="560" height="315" src="https://www.youtube.com/embed/\${trailer.key}" frameborder="0" allowfullscreen></iframe>\` : "<p>Trailer niedostępny.</p>"}
    <button onclick="modal.classList.remove('hidden')">▶ Oglądaj film</button>
  \`;
}

fakePlay.addEventListener("click", () => {
  alert("Aby obejrzeć film, wykonaj wymagane działanie...");
  modal.classList.add("hidden");
});

loadFilm();