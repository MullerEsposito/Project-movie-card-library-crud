import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';
import './MovieDetails.css';

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      movie: {},
    };
  }

  componentDidMount() {
    this.fetchMovie();
  }

  fetchMovie() {
    const { match: { params: { id } } } = this.props;

    this.setState({ isLoading: true }, async () => {
      const movie = await movieAPI.getMovie(id);
      this.setState({ movie, isLoading: false });
    });
  }

  renderMovieCard() {
    const { movie } = this.state;
    return (
      <div className="container-movie-details" data-testid="movie-details">
        <div className="container-img">
          <img alt="Movie Cover" src={ `../${movie.imagePath}` } />
          <h1>{`${movie.title}`}</h1>
        </div>
        <p>{ `Subtitle: ${movie.subtitle}` }</p>
        <p>{ `Storyline: ${movie.storyline}` }</p>
        <p>{ `Genre: ${movie.genre}` }</p>
        <p>{ `Rating: ${movie.rating}` }</p>
        <div className="container-buttons">
          <Link to={ `/movies/${movie.id}/edit` }>EDITAR</Link>
          <Link to="/">VOLTAR</Link>
        </div>
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <Loading />;

    return this.renderMovieCard();
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  }).isRequired,
};

export default MovieDetails;
