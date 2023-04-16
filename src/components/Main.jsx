import axios from 'axios';
import React, { useEffect, useState } from 'react';
import requests from '../Requests';
import {FaPlay} from 'react-icons/fa'
import { useContext } from 'react';
import { UserAuth } from '../context/AuthContext';
import { MovieDetails } from './MovieDetails';

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [showDetails, setShowDetails] = useState(false)

  const {truncateString} =  UserAuth()

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);
  //   console.log(movie);

  

  return (
    <div className='w-full h-[600px] text-white'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[600px] bg-gradient-to-r from-black'></div>
        <img
          className='w-full h-full object-cover'
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className='absolute w-full top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
          <div className='my-4'>
          <p className='text-gray-400 text-sm'>
            Released: {movie?.release_date}
          </p>
          <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200 mb-4'>
            {truncateString(movie?.overview, 150)}
          </p>
            <button className=' border bg-gray-300 text-black border-gray-300 py-2 px-5 rounded-sm'>
              <div className='flex justify-center items-center gap-2'  onClick={() => setShowDetails(true)}>
                <FaPlay/>
              Play
              </div> 
            </button>
            <button className='border text-white border-gray-300 py-2 px-5 ml-4'>
              
              Watch Later
            </button>
          </div>
          
        </div>
      </div>
      {showDetails && (
    <MovieDetails movieId={movie?.id}  setShowDetails={setShowDetails} item={movie}/>
  )}
    </div>
  );
};

export default Main;
