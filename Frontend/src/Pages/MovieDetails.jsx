import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
import timeFormat from "../Libary/timeFormat";
import MovieCard from "../Components/MovieCard";
import Loading from "../Components/Loading";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/movies/${id}`, {
          credentials: "include",
        });

        if (res.status === 401) {
          navigate("/login");
          return;
        }
        const data = await res.json();
        setMovie(data);
        const favRes = await fetch("http://localhost:3000/api/favourites", {
          credentials: "include",
        });

        const favData = await favRes.json();

        setIsFavourite(favData.some((fav) => fav._id === data._id));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [id, navigate]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/movies", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.status === 401) {
          navigate("/login");
          return;
        }
        setRelatedMovies(data.filter((m) => m._id !== id).slice(6, 13));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [id]);
  const toggleFavourite = async (movieId) => {
    try {
      const res = await fetch("http://localhost:3000/api/favourites/toggle", {
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
    <div className="px-6 md:px-16 lg:px-40 pt-28">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="rounded-xl h-96 object-cover"
        />

        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold">{movie.title}</h1>

          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-red-500 fill-red-500" />
            {movie.vote_average.toFixed(1)} User Rating
          </div>

          <p className="text-gray-400">{movie.overview}</p>

          <p className="text-sm">
            {timeFormat(movie.runtime)} •{" "}
            {movie.genres.map((g) => g.name).join(", ")} •{" "}
            {movie.release_date.split("-")[0]}
          </p>

          <div className="flex gap-4 mt-4 flex-wrap">
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-md">
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>

            <button
              onClick={() => {
                navigate(`/select-show/${movie._id}`);
                scrollTo(0, 0);
              }}
              className="px-8 py-3 bg-red-600 rounded-md cursor-pointer"
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
        <>
          <p className="text-lg font-medium mt-20">Your Favourite Cast</p>
          <div className="flex gap-4 mt-6 overflow-x-auto">
            {movie.casts.slice(0, 8).map((cast, index) => (
              <div key={index} className="text-center">
                <img
                  src={cast.profile_path}
                  alt={cast.name}
                  className="rounded-full h-20 w-20 object-cover"
                />
                <p className="text-xs mt-2">{cast.name}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="text-lg font-medium mt-20 mb-8">You May Like</p>
      <div className="flex flex-wrap gap-8 justify-center md:justify-start">
        {relatedMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="px-10 py-3 bg-red-600 rounded-md"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
