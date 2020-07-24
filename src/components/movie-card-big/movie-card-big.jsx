import React from 'react';
import {connect} from 'react-redux';

import MovieInfo from '../movie-info/movie-info';
import PageHeader from '../page-header/page-header';
import {openFullScreenPlayer} from '../../store/actions';
import {promoMovieType} from '../../types';
import {func} from 'prop-types';

const MovieCardBig = ({promoMovie, onPlayButtonClick}) => {
  const {image, title, genre, releaseDate} = promoMovie;
  return (
    <section className="movie-card">
      <PageHeader
        imagePath={`img/bg-${image}.jpg`}
        title={title}
      />
      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={`img/${image}-poster.jpg`} alt={title} width="218" height="327" />
          </div>
          <MovieInfo
            title={title}
            genre={genre}
            releaseDate={releaseDate}
            isLogged={false}
            onPlayButtonClick={onPlayButtonClick}
          />
        </div>
      </div>
    </section>
  );
};

MovieCardBig.propTypes = {
  promoMovie: promoMovieType.isRequired,
  onPlayButtonClick: func.isRequired,
};

const mapStateToProps = ({promoMovie}) => ({promoMovie});

const mapDispatchToProps = (dispatch) => ({
  onPlayButtonClick() {
    dispatch(openFullScreenPlayer());
  }
});


export {MovieCardBig};
export default connect(mapStateToProps, mapDispatchToProps)(MovieCardBig);
