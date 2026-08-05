import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, PlayCircleIcon, StarIcon,ArrowLeft } from "lucide-react";
import timeFormat from "../Libary/timeFormat";
import MovieCard from "../Components/MovieCard";
import Loading from "../Components/Loading";
import toast from "react-hot-toast";
import { BackendUrl } from "../config";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`${BackendUrl}/api/movies/${id}`, {
          credentials: "include",
        });

        if (res.status === 401) {
          navigate("/login");
          return;
        }
        let movieData;

        if (!res.ok) {
          // Check coming soon movies endpoint if not found in normal movies
          const comingSoonRes = await fetch(`${BackendUrl}/api/coming-soon-movies/${id}`, {
            credentials: "include",
          });

          if (!comingSoonRes.ok) {
            toast.error("Movie not found");
            navigate("/movies");
            return;
          }

          movieData = await comingSoonRes.json();
        } else {
          movieData = await res.json();
        }

        setMovie(movieData);
        const favRes = await fetch(`${BackendUrl}/api/favourites`, {
          credentials: "include",
        });

        const favData = await favRes.json();

        setIsFavourite(favData.some((fav) => fav._id === movieData._id));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [id, navigate]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(`${BackendUrl}/api/movies`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.status === 401) {
          navigate("/login");
          return;
        }
        setRelatedMovies(data.filter((m) => m._id !== id).slice(6, 10));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [id]);
  const toggleFavourite = async (movieId) => {
    try {
      const res = await fetch(`${BackendUrl}/api/favourites/toggle`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId }),
      });

      if (!res.ok) return;

      setIsFavourite(!isFavourite);

      if (!isFavourite) {
        toast.success("Movie added to favourites ❤️");
      } else {
        toast("Removed from favourites ❌");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!movie) return <Loading />;

  return (
    <div className="px-6 md:px-16 lg:px-20 ">
      <div className="relative z-20 px-6 md:px-16 lg:px-36 pt-32 md:pt-40">
        <button 
            onClick={() => {navigate(-1),scrollTo(0, 0)}}
            className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
            <ArrowLeft className="w-5 h-5" /> Back
        </button>
        </div>
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto lg:pt-5">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="rounded-xl h-96 sm:h-150 object-cover"
        />

        <div className="flex flex-col gap-3 lg:p-20 sm:p-15 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
          <h1 className="text-4xl font-semibold">{movie.title}</h1>

         <div className="flex items-center w-25 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 font-semibold">
                <StarIcon className="w-15 h-4.5 fill-yellow-500" />
                {movie.vote_average?.toFixed(1)}
              </div>

          <p className="text-gray-400">{movie.overview}</p>

          <p className="text-sm">
            {timeFormat(movie.runtime)} •{" "}
            {movie.genres.map((g) => g.name).filter(name => name && name.trim()).join(", ")} •{" "}
            {movie.release_date.split("-")[0]}
          </p>

          <div className="flex gap-4 mt-4 flex-wrap">
           
              {movie.trailerUrl && (
                <a 
                  href={movie.trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                >
                  <PlayCircleIcon className="w-5 h-5" />
                  Watch Trailer
                </a>
              )}

            <button
              onClick={() => {
                navigate(`/select-show/${movie._id}`);
                scrollTo(0, 0);
              }}
              className="px-8 py-3 bg-primary hover:bg-primary-dull text-white font-bold rounded-full shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              Buy Tickets
            </button>

            <button
              onClick={() => toggleFavourite(movie._id)}
              className={`p-3 rounded-full transition-all duration-300 cursor-pointer ${
                isFavourite
                  ? "bg-red-600 scale-110"
                  : "bg-gray-700 cursor-pointer"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavourite ? "text-white fill-white" : "text-red-500"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
      {movie.casts?.length > 0 && (
        <div className="flex flex-col lg:ml-25 mt-20">
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Cast</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-transparent rounded-full" />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {movie.casts.slice(0, 8).map((cast, index) => (
              <div key={index} className="text-center flex-shrink-0">
                {cast.profile_path ? (
                  <img
                    src={cast.profile_path}
                    alt={cast.name}
                    className="rounded-full h-20 w-20 object-cover"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-gray-700 flex items-center justify-center text-white text-xl font-bold border border-gray-600">
                    {cast.name ? cast.name.charAt(0) : "?"}
                  </div>
                )}
                <p className="text-xs mt-2 w-20 truncate">{cast.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="lg:ml-25 mt-20 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">You May Like</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full" />
      </div>
      <div className="flex flex-wrap gap-8 justify-center lg:ml-25">
        {relatedMovies.map((movie) => (
          <div className="lg:ml-15">
          <MovieCard key={movie._id} movie={movie} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="px-10 py-3 bg-primary hover:bg-primary-dull text-white font-bold rounded-full shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
