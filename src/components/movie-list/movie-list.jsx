import React from 'react';
import MovieCard from '../movie-card/movie-card';
import {arrayOf, func} from 'prop-types';
import {cardMovieType} from '../../types';
import withVideo from '../../hocs/with-video/with-video';


const WrappedMovieCard = withVideo(MovieCard);

const MovieList = ({movies, onMovieTitleClick}) => (
  <div className="catalog__movies-list">
    {movies.map((movie) => {
      const {id, title, poster, preview} = movie;
      return (
        <WrappedMovieCard
          key={id}
          title={title}
          src={preview}
          poster={poster}
          onMovieTitleClick={() => onMovieTitleClick(movie)}
        />
      );
    })}
  </div>
);

MovieList.propTypes = {
  movies: arrayOf(cardMovieType.isRequired).isRequired,
  onMovieTitleClick: func.isRequired,
};

export default MovieList;
