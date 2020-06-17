import React from 'react';
import PropTypes from 'prop-types';


const SmallMovieCard = ({movie: {title, url}, onMovieTitleClick, onMovieTitleHover}) => {
  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={`img/${url}.jpg`} alt={title} width="280" height="175" />
      </div>
      <h3
        className="small-movie-card__title">
        <a
          className="small-movie-card__link"
          href="movie-page.html"
          onClick={onMovieTitleClick}
          onMouseOver={onMovieTitleHover}
        >
          {title}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
  onMovieTitleHover: PropTypes.func.isRequired,
};


export default SmallMovieCard;
