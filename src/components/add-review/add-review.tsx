import * as React from 'react';
import {connect} from 'react-redux';

import {getMovie} from '../../store/movies/selectors';
import {getSendingStatus} from '../../store/app-state/selectors';
import {getAuthorizationStatus, getUser} from '../../store/user/selectors';
import {MovieType, UserDataType} from '../../types';
import {
  TEXTAREA_COLOR, AuthorizationStatus, Page, ReviewLength
} from '../../utils/consts';
import PageHeader from '../page-header/page-header';
import BreadCrumbs from '../bread-crumbs/bread-crumbs';

interface AddReviewProps {
  authorizationStatus: string;
  id: number;
  user: UserDataType;
  movie: MovieType;
  onFormSubmit: () => void;
  onCommentChange: () => void;
  onRatingChange: () => void;
  isValid: boolean;
  isSending: boolean;
}


const AddReview: React.FC<AddReviewProps> = ({
  authorizationStatus, id, movie, user, onFormSubmit, onCommentChange, onRatingChange,
  isValid, isSending
}: AddReviewProps) => {
  const isAuth: boolean = authorizationStatus === AuthorizationStatus.AUTH;
  const {backgroundColor, backgroundImage, title, poster} = movie;
  const isDisabled: boolean = !isValid || isSending;
  return (
    <section className="movie-card movie-card--full"
      style={{backgroundColor: `${backgroundColor}`}}>
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <PageHeader
          currentPage={Page.REVIEW}
          isAuth={isAuth}
          user={user}>
          <BreadCrumbs
            id={id}
            title={title}
          />
        </PageHeader>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={poster} alt={`${title} poster`}
            width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form"
          onSubmit={onFormSubmit}>

          <div className="rating">
            <div
              onChange={onRatingChange}
              className="rating__stars">
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1"
                disabled={isSending} />
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2"
                disabled={isSending} />
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3"
                disabled={isSending} defaultChecked />
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4"
                disabled={isSending} />
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5"
                disabled={isSending} />
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          <div
            className="add-review__text"
            style={{backgroundColor: TEXTAREA_COLOR}}>
            <textarea
              minLength={ReviewLength.MIN}
              maxLength={ReviewLength.MAX}
              onInput={onCommentChange}
              className="add-review__textarea" name="review-text" id="review-text"
              placeholder="Review text"></textarea>
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                disabled={isDisabled}>Post
              </button>
            </div>

          </div>
        </form>
      </div>
    </section>
  );
};

const mapStateToProps = (state, props) => ({
  movie: getMovie(state, props.id),
  authorizationStatus: getAuthorizationStatus(state),
  user: getUser(state),
  isSending: getSendingStatus(state),
});

export {AddReview};
export default connect(mapStateToProps)(AddReview);
