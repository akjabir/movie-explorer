import { useEffect, useState } from "react";
import "./App.css";

const API = "https://api.tvmaze.com";

function Navbar({ onMoviesClick }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-5">
        <div className="text-xl font-extrabold">
          🎬 Movie<span className="text-red-600">Explorer</span>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="#home"
            className="text-sm text-gray-300 transition hover:text-red-500"
          >
            Home
          </a>

          <button
            onClick={onMoviesClick}
            className="text-sm text-gray-300 transition hover:text-red-500"
          >
            Movies
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero({ onExplore }) {
  return (
    <section
      id="home"
      className="relative min-h-[650px] overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=2000&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 pt-48">
        <p className="mb-5 text-sm font-bold tracking-[4px] text-red-600">
          WELCOME TO MOVIE EXPLORER
        </p>

        <h1 className="max-w-4xl text-5xl font-extrabold leading-tight sm:text-6xl md:text-7xl">
          Discover Your Next
          <br />
          <span className="text-red-600">Favorite Show</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-gray-300 md:text-lg">
          Explore thousands of amazing TV shows, discover new stories,
          and find something perfect to watch tonight.
        </p>

        <button
          onClick={onExplore}
          className="mt-8 rounded-lg bg-red-600 px-7 py-3.5 font-bold transition hover:-translate-y-1 hover:bg-red-700"
        >
          Explore Movies →
        </button>
      </div>
    </section>
  );
}

function MovieCard({ movie, onDetails }) {
  const show = movie.show || movie;

  const image =
    show.image?.original ||
    show.image?.medium ||
    "https://via.placeholder.com/500x700?text=No+Image";

  const year = show.premiered
    ? new Date(show.premiered).getFullYear()
    : "N/A";

  const rating = show.rating?.average || "N/A";

  return (
    <article className="group overflow-hidden rounded-xl border border-white/10 bg-[#111218] transition duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-2xl">
      <div className="relative h-[360px] overflow-hidden">
        <img
          src={image}
          alt={show.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute right-3 top-3 rounded-md bg-black/80 px-3 py-1.5 text-sm font-bold">
          ⭐ {rating}
        </div>
      </div>

      <div className="p-5">
        <h3 className="truncate text-lg font-bold">
          {show.name}
        </h3>

        <div className="mt-3 flex items-center justify-between gap-2 text-xs text-gray-500">
          <span>📅 {year}</span>
          <span>🎬 {show.genres?.[0] || "Drama"}</span>
        </div>

        <button
          onClick={() => onDetails(show)}
          className="mt-5 w-full rounded-md border border-white/15 py-2.5 text-sm font-semibold transition hover:border-red-600 hover:bg-red-600"
        >
          See Details
        </button>
      </div>
    </article>
  );
}

function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  const image =
    movie.image?.original ||
    movie.image?.medium ||
    "https://via.placeholder.com/800x450?text=No+Image";

  const year = movie.premiered
    ? new Date(movie.premiered).getFullYear()
    : "N/A";

  const rating = movie.rating?.average || "N/A";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-white/10 bg-[#111218]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-lg hover:bg-red-600"
        >
          ✕
        </button>

        <img
          src={image}
          alt={movie.name}
          className="h-[280px] w-full object-cover sm:h-[380px]"
        />

        <div className="p-6 sm:p-8">
          <h2 className="text-3xl font-bold">
            {movie.name}
          </h2>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-300">
            <span>⭐ {rating}</span>
            <span>📅 {year}</span>
            <span>
              🎭 {movie.genres?.join(", ") || "N/A"}
            </span>
          </div>

          <div className="mt-7">
            <h3 className="mb-2 text-lg font-bold">
              Overview
            </h3>

            <p
              className="leading-7 text-gray-400"
              dangerouslySetInnerHTML={{
                __html:
                  movie.summary ||
                  "No description available.",
              }}
            />
          </div>

          <div className="mt-7 grid grid-cols-2 gap-5 border-y border-white/10 py-5 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase text-gray-600">
                Status
              </p>
              <p className="mt-1 text-sm text-gray-300">
                {movie.status || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-600">
                Language
              </p>
              <p className="mt-1 text-sm text-gray-300">
                {movie.language || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-600">
                Runtime
              </p>
              <p className="mt-1 text-sm text-gray-300">
                {movie.runtime
                  ? `${movie.runtime} min`
                  : "N/A"}
              </p>
            </div>
          </div>
          <div className="flex justify-end mb-4">
            <button onClick={onClose} className="mt-4 rounded-md bg-red-600 px-6 py-2.5 text-sm font-bold hover:bg-red-700">
              Close
            </button>
          </div>
         
        </div>
      </div>
    </div>
  );
}

function Movies({ onDetails }) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API}/shows`);

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      setMovies(data);
    } catch {
      setError("Unable to load movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value.trim()) {
      fetchMovies();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API}/search/shows?q=${encodeURIComponent(value)}`
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      setMovies(data);
    } catch {
      setError("Search failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="movies"
      className="mx-auto max-w-7xl px-5 py-20"
    >
      <div>
        <p className="text-sm font-bold tracking-[3px] text-red-600">
          EXPLORE
        </p>

        <h2 className="mt-3 text-4xl font-extrabold">
          Find Your{" "}
          <span className="text-red-600">
            Favorite Shows
          </span>
        </h2>

        <p className="mt-3 text-gray-500">
          Search and discover shows from around the world.
        </p>
      </div>

      <div className="mt-10 flex h-14 items-center gap-3 rounded-lg border border-white/10 bg-[#111218] px-5 focus-within:border-red-600">
        <span className="text-lg">🔍</span>

        <input
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for a movie or show..."
          className="w-full bg-transparent text-white outline-none placeholder:text-gray-600"
        />

        {search && (
          <button
            onClick={() => handleSearch("")}
            className="text-gray-500 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {loading && (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-red-600" />
          <p className="text-gray-500">
            Loading movies...
          </p>
        </div>
      )}

      {error && !loading && (
        <div className="py-20 text-center">
          <p className="text-gray-500">{error}</p>

          <button
            onClick={fetchMovies}
            className="mt-5 rounded-md bg-red-600 px-5 py-2"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <p className="mt-6 text-sm text-gray-600">
            {search
              ? `Search results for "${search}"`
              : `Showing ${movies.length} shows`}
          </p>

          {movies.length === 0 ? (
            <div className="py-24 text-center">
              <div className="text-5xl">🎬</div>

              <h3 className="mt-4 text-xl font-bold">
                No shows found
              </h3>

              <p className="mt-2 text-gray-600">
                Try searching for another title.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.show?.id || movie.id}
                  movie={movie}
                  onDetails={onDetails}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-12">
      <div className="mx-auto max-w-7xl text-center">
        <div className="text-xl font-extrabold">
          🎬 Movie<span className="text-red-600">Explorer</span>
        </div>

        <p className="mt-3 text-sm text-gray-600">
          Discover amazing movies and shows from around
          the world.
        </p>

        <div className="my-7 h-px bg-white/10" />

        <p className="text-xs text-gray-700">
          © 2026 MovieExplorer. Built with React.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const scrollToMovies = () => {
    document
      .getElementById("movies")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-white">
      <Navbar onMoviesClick={scrollToMovies} />

      <Hero onExplore={scrollToMovies} />

      <Movies onDetails={setSelectedMovie} />

      <Footer />

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}