import * as React from 'react';
import {connect} from 'react-redux';

import MovieInfo from '../movie-info/movie-info';
import PageHeader from '../page-header/page-header';
import {getAuthorizationStatus, getUser} from '../../store/user/selectors';
import {Operation as MoviesOperation} from '../../store/movies/actions';
import {MovieType, UserDataType} from '../../types';
import {AuthorizationStatus} from '../../utils/consts';

interface MovieCardProps {
  currentPage: string;
  promoMovie: MovieType;
  authorizationStatus: string;
  user: UserDataType;
  onIsFavoriteButtonClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  currentPage, promoMovie, authorizationStatus, user, onIsFavoriteButtonClick
}: MovieCardProps) => {
  const {id, poster, backgroundImage, title, genre, releaseDate, isFavorite} = promoMovie;
  const isAuth: boolean = authorizationStatus === AuthorizationStatus.AUTH;
  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={backgroundImage} alt={title} />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <PageHeader
        isAuth={isAuth}
        currentPage={currentPage}
        user={user}
      />
      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={poster} alt={title} width="218" height="327" />
          </div>
          <MovieInfo
            currentPage={currentPage}
            id={id}
            title={title}
            genre={genre}
            releaseDate={releaseDate}
            isFavorite={isFavorite}
            onIsFavoriteButtonClick={onIsFavoriteButtonClick}
            isAuth={isAuth}
          />
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  onIsFavoriteButtonClick() {
    const {id, isFavorite} = props.promoMovie;
    dispatch(MoviesOperation.sendFavoriteMovie(id, isFavorite));
  },
});


export {MovieCard};
export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
