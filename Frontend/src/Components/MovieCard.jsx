import { StarIcon, Ticket } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import timeFormat from "../Libary/timeFormat";
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  if (!movie) {
    return null;
  }
  console.log(movie.title);
  return (
    <div
      onClick={() => {
        navigate(`/movies/${movie._id}`);
        scrollTo(0, 0);
      }}
      className="group relative w-[280px] sm:w-[240px] md:w-[260px] lg:w-[280px] h-[420px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2"
    >
      <img
        src={movie.backdrop_path}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-bg)] via-black/50 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

      <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end h-full">
        <div className="absolute top-4 right-4 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-yellow-500">
            <StarIcon className="w-3 h-3 fill-yellow-500" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>

        <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
          <h3 className="font-bold text-xl leading-tight mb-2 text-white drop-shadow-md line-clamp-2 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-gray-300 mb-4 opacity-80">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            {movie.genres && movie.genres.length > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-gray-500" />
                <span className="truncate max-w-[120px]">
                  {movie.genres
                    .slice(0, 2)
                    .map((g) => g.name)
                    .filter((name) => name && name.trim())
                    .join(", ")}
                </span>
              </>
            )}
            <span className="w-1 h-1 rounded-full bg-gray-500" />
            <span>{timeFormat(movie.runtime)}</span>
          </div>

          <div className="h-0 overflow-hidden group-hover:h-[50px] transition-[height] duration-500 ease-in-out">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/movies/${movie._id}`);
                scrollTo(0, 0);
              }}
              className="w-full py-3 bg-gradient-to-r cursor-pointer from-primary to-primary-dull rounded-xl text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              Buy Tickets
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 border-2 border-white/0 rounded-3xl group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
    </div>
  );
};

export default MovieCard;
