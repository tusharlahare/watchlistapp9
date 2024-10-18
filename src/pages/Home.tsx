"use client"

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useMovie, Movie } from '../contexts/MovieContext'

export default function Home() {
  const { user } = useAuth()
  const { searchMovies } = useMovie()
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])

  useEffect(() => {
    const fetchPopularMovies = async () => {
      // Fetch a few popular movies
      const movies = await searchMovies('avengers')
      setPopularMovies(movies.slice(0, 36))
    }

    fetchPopularMovies()
  }, [searchMovies])

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Movie Watchlist</h1>
      
      {user ? (
        <p className="text-xl mb-8 text-center">
          Hello, {user}! <Link to="/search" className="text-red-600 hover:underline">Search for movies</Link> or <Link to="/watchlist" className="text-blue-600 hover:underline">view your watchlist</Link>.
        </p>
      ) : (
        <p className="text-xl mb-8 text-center">
          <Link to="/login" className="text-red-600 hover:underline">Log in</Link> to start creating your watchlist!
        </p>
      )}

      <h2 className="text-2xl font-semibold mb-4">Popular Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {popularMovies.map((movie) => (
          <div key={movie.imdbID} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{movie.Title}</h3>
              <p className="text-gray-600 mb-2">{movie.Year}</p>
              <Link 
                to={`/movie/${movie.imdbID}`} 
                className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}