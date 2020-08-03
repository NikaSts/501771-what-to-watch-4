import React from 'react';
import {connect} from 'react-redux';
import {string, bool, shape, number} from 'prop-types';

import MovieInfo from '../movie-info/movie-info';
import PageHeader from '../page-header/page-header';
import {promoMovieType} from '../../types';
import {getPromoMovie} from '../../store/movies/selectors';
import {getAuthorizationStatus, getUserData} from '../../store/user/selectors';
import {AuthorizationStatus} from '../../utils/consts';


const MovieCard = ({
  promoMovie, authorizationStatus, isMain, userData
}) => {
  const {id, poster, backgroundImage, title, genre, releaseDate} = promoMovie;
  const isAuth = authorizationStatus === AuthorizationStatus.AUTH;
  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={backgroundImage} alt={title} />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <PageHeader
        isAuth={isAuth}
        isMain={isMain}
        userData={userData}
      />
      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={poster} alt={title} width="218" height="327" />
          </div>
          <MovieInfo
            isMain={isMain}
            id={id}
            title={title}
            genre={genre}
            releaseDate={releaseDate}
          />
        </div>
      </div>
    </section>
  );
};

MovieCard.propTypes = {
  id: number.isRequired,
  promoMovie: promoMovieType.isRequired,
  authorizationStatus: string.isRequired,
  isMain: bool.isRequired,
  userData: shape({
    id: number.isRequired,
    name: string.isRequired,
    email: string.isRequired,
    avatar: string.isRequired,
  })
};

const mapStateToProps = (state) => ({
  promoMovie: getPromoMovie(state),
  authorizationStatus: getAuthorizationStatus(state),
  userData: getUserData(state),
});


export {MovieCard};
export default connect(mapStateToProps)(MovieCard);
