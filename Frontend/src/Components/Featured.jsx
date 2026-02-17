import { ArrowRight } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import { dummyShowsData } from "../assets/assets.js";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "./Loading.jsx";

const Featured = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getMovies=async()=>{
      try{
         const res= await fetch(" http://localhost:3000/api/movies/",
         { credentials: "include"}
         )
          if (res.status === 401) {
            navigate("/login");
        return;
      }
        const data = await res.json();
        setMovies(data)

      }catch(e){
          console.error(e);
      }

    }
    getMovies()
  }, []);

  if (isLoading) {
    <Loading />;
  }
  return (
    <div className="my-12 sm:my-16 md:my-20 ">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10">
        <h1 className="text-lg px-4 sm:px-6 sm:text-xl md:px-10 md:text-2xl lg:text-2xl">
          Now Showing
        </h1>
        <Link to="/movies">
          <h1 className="text-xl px-5 flex items-center text-gray-500 hover:text-white transition cursor-pointer mr-10">
            View All <ArrowRight />
          </h1>
        </Link>
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start gap-5 sm:gap-6 mt-8 px-4 sm:px-6 md:px-10">
        {movies.slice(0, 4).map((show) => (
          <MovieCard key={show._id} movie={show} />
        ))}
      </div>
      <div className=" flex justify-center mt-12 sm:mt-16 ">
        <button
          onClick={() => {
            (navigate("/movies"), scrollTo(0, 0));
          }}
          className="px-10 py-3 text-sm bg-red-500 hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default Featured;
