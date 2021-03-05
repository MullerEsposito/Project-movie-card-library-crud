import React, { Component } from 'react';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

import * as movieAPI from '../services/movieAPI';
import './MovieList.css';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    await this.fetchMovies();
  }

  async fetchMovies() {
    this.setState({ isLoading: true }, async () => {
      const movies = await movieAPI.getMovies();
      this.setState({ movies, isLoading: false });
    });
  }

  render() {
    const { movies, isLoading } = this.state;

    return (

      <div className="container-movie-list" data-testid="movie-list">
        {isLoading && <Loading />}
        {isLoading || movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
      </div>
    );
  }
}

export default MovieList;
