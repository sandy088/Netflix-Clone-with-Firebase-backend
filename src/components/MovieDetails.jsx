import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { MdCancel } from 'react-icons/md';
import { UserAuth } from '../context/AuthContext';
import {BsFillStarFill} from 'react-icons/bs'


const API_KEY = process.env.REACT_APP_IMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const MovieDetails = ({ movieId = 550, setShowDetails, item }) => {

    const [trailerUrl, setTrailerUrl] = useState('');
    const {truncateString} =  UserAuth()


    useEffect(() => {
        const fetchTrailerUrl = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
                );
                const videos = response.data.results;
                const trailer = videos.find(video => video.type === 'Trailer');
                if (trailer) {
                    const trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
                    setTrailerUrl(trailerUrl);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchTrailerUrl();
    }, [movieId]);

    function onclickHandler() {
        setShowDetails(false)
    }

    return (
        <div className="fixed z-40 top-0 left-0 w-full  h-full overflow-y-auto bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-gray-900 relative w-full max-w-screen-sm mx-auto rounded-lg shadow-lg">
            <div className="absolute right-2 top-2">
              <button className="text-white hover:scale-125 text-2xl" onClick={onclickHandler}>
                <MdCancel />
              </button>
            </div>
            {trailerUrl && (
              <div className="aspect-w-16 h-[40vh]">
                <iframe
                  className="w-full h-full"
                  src={trailerUrl}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}
            <div className="w-full px-4 md:px-8 py-6 md:py-10">
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center whitespace-normal break-words">
                {item.title}
              </h2>
              <div className="flex items-center justify-center md:justify-between mb-4">
                <div className="flex items-center bg-red-600 rounded-lg px-2 py-1 mr-4">
                  <span className="text-white font-bold text-sm mr-1">{item.vote_average}</span>
                  <BsFillStarFill/>
                </div>
                <p className="text-gray-400">{item.release_date}</p>
              </div>
              <div className="text-gray-300 mb-4 max-w-[400px] whitespace-normal break-words text-center mx-auto">
              {truncateString(item?.overview, 300)}
              </div>
              <div className="flex flex-wrap justify-center">
                {item.genre_ids &&
                  item.genre_ids.map((genre) => (
                    <div
                      key={genre.id}
                      className="bg-gray-800 text-gray-300 px-2 py-1 mr-2 mb-2 rounded-lg text-sm"
                    >
                      {genre.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      );
      
      
}
