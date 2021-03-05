import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './MovieCard.css';

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    const { movie } = this.props;

    this.state = {
      movie,
    };
  }

  renderMovieCard() {
    const { movie } = this.state;
    return (
      <div className="container-movie-card" data-testid="movie-card">
        <div className="container-img">
          <img src={ movie.imagePath } alt="" />
          <h1>{ movie.title }</h1>
        </div>
        <p>{`${movie.storyline}`}</p>
        <div className="container-buttons">
          <Link className="button" to={ `movies/${movie.id}` }>
            VER DETALHES
          </Link>
        </div>
      </div>
    );
  }

  render() {
    return this.renderMovieCard();
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    storyline: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    imagePath: PropTypes.string,
    bookmarked: PropTypes.bool,
    genre: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
