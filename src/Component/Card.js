import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { movieDetail } from '../Redux/movieSlice';
import { useState } from 'react';
import './card.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonLoader from './SkeletonLoader';
const Card = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector(state => state.movies);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    dispatch(movieDetail(page));
  }, [dispatch, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // if (loading) {
  //   return <h3>loading</h3>
    
  //   ;
  // }

  if (error) {
    return <h2 >Error: {error}</h2>;
  }

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
<SkeletonTheme baseColor="#f2f2f2" highlightColor="#f9f9f9">
{
      loading ? 
      <div className='movie-container'>
       {(
          Array.from({ length: 6 }).map((_, index) => (
               <SkeletonLoader key={index}/>
          ))
        )}
      </div>
      
     :

      <div className="movie-container">
      {filteredMovies.map((movie) => (
        <div className="card shadow-lg w-80" key={movie.id} onClick={() => setSelectedMovie(movie)}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`${movie.title} poster`} />
          <div className='content'>
            <div className='flex justify-between'>
              <h5 className='title'>{movie.title}</h5>
              <p className='rating'>Rating: {movie.vote_average}</p>
            </div>
            <p className="description">{movie.overview || <Skeleton />}</p>
          </div>
        </div>
      ))
      }
      {selectedMovie && (
        <div className="modal" onClick={() => setSelectedMovie(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={() => setSelectedMovie(null)}>&times;</span>
            <h2>{selectedMovie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`} alt={selectedMovie.title} />
            <p>{selectedMovie.overview}</p>
          </div>
        </div>
      )}
    </div>
    }

</SkeletonTheme>

    
  );
};

export default Card;
