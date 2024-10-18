"use client"

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMovie } from '../contexts/MovieContext'
import { useAuth } from '../contexts/AuthContext'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Movie[]>([])
  const { searchMovies, addToWatchlist, watchlist } = useMovie()
  const { user } = useAuth()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const movies = await searchMovies(query)
    setResults(movies)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search Movies</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title"
          className="w-full px-3 py-2 border rounded"
        />
        <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((movie) => (
          <div key={movie.imdbID} className="border p-4 rounded">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover mb-2" />
            <h3 className="font-bold">{movie.Title}</h3>
            <p>{movie.Year}</p>
            <Link to={`/movie/${movie.imdbID}`} className="text-blue-600 hover:underline">
              View Details
            </Link>
            {user && (
              <button
                onClick={() => addToWatchlist(user, movie)}
                disabled={watchlist[user]?.some((m) => m.imdbID === movie.imdbID)}
                className="mt-2 bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 disabled:bg-gray-400"
              >
                {watchlist[user]?.some((m) => m.imdbID === movie.imdbID) ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}