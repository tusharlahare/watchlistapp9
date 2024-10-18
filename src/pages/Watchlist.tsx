"use client"

import React from 'react'
import { Link } from 'react-router-dom'
import { useMovie } from '../contexts/MovieContext'
import { useAuth } from '../contexts/AuthContext'

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useMovie()
  const { user } = useAuth()

  if (!user) {
    return <div>Please log in to view your watchlist.</div>
  }

  const userWatchlist = watchlist[user] || []

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Watchlist</h2>
      {userWatchlist.length === 0 ? (
        <p>Your watchlist is empty. Start by <Link to="/search" className="text-blue-600 hover:underline">searching for movies</Link>.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userWatchlist.map((movie) => (
            <div key={movie.imdbID} className="border p-4 rounded">
              <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover mb-2" />
              <h3 className="font-bold">{movie.Title}</h3>
              <p>{movie.Year}</p>
              <Link to={`/movie/${movie.imdbID}`} className="text-blue-600 hover:underline">
                View Details
              </Link>
              <button
                onClick={() => removeFromWatchlist(user, movie.imdbID)}
                className="mt-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                Remove from Watchlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}