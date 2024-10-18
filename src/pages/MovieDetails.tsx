"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMovie } from '../contexts/MovieContext'
import { useAuth } from '../contexts/AuthContext'

interface MovieDetails {
  imdbID: string
  Title: string
  Year: string
  Poster: string
  Plot: string
}

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>()
  const { getMovieDetails, addToWatchlist, removeFromWatchlist, watchlist } = useMovie()
  const { user } = useAuth()
  const [movie, setMovie] = useState<MovieDetails | null>(null)

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        const data = await getMovieDetails(id)
        setMovie(data)
      }
    }
    fetchMovie()
  }, [id, getMovieDetails])

  if (!movie) {
    return <div>Loading...</div>
  }

  const isInWatchlist = user && watchlist[user]?.some((m) => m.imdbID === movie.imdbID)

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} className="w-full h-96 object-cover mb-4" />
      <p className="mb-2">
        <strong>Year:</strong> {movie.Year}
      </p>
      <p className="mb-2">
        <strong>Plot:</strong> {movie.Plot}
      </p>
      {user && (
        <button
          onClick={() => (isInWatchlist ? removeFromWatchlist(user, movie.imdbID) : addToWatchlist(user, movie))}
          className={`mt-4 ${
            isInWatchlist ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          } text-white px-4 py-2 rounded`}
        >
          {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </button>
      )}
    </div>
  )
}