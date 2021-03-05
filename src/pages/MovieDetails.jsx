import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';
import './MovieDetails.css';

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      movie: {},
      shouldRedirect: false,
    };
    this._Mounted = false;
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this._Mounted = true;
    this.fetchMovie();
  }

  componentWillUnmount() {
    this._Mounted = false;
  }

  async handleDelete() {
    const { movie: { id } } = this.state;
    if (this._Mounted) {
      await movieAPI.deleteMovie(id);
      this.setState({ shouldRedirect: true });
    }
  }

  fetchMovie() {
    const { match: { params: { id } } } = this.props;

    if (this._Mounted) {
      this.setState({ isLoading: true }, async () => {
        const movie = await movieAPI.getMovie(id);
        this.setState({ movie, isLoading: false });
      });
    }
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
          <Link to="/" onClick={ this.handleDelete }>DELETAR</Link>
        </div>
      </div>
    );
  }

  render() {
    const { isLoading, shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/" />;
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
