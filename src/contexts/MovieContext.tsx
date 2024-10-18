"use client"

import React, { createContext, useState, useContext, useEffect } from 'react'

export interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

export interface MovieDetails extends Movie {
  Plot: string
}

interface MovieContextType {
  watchlist: { [email: string]: Movie[] }
  addToWatchlist: (email: string, movie: Movie) => void
  removeFromWatchlist: (email: string, movieId: string) => void
  searchMovies: (query: string) => Promise<Movie[]>
  getMovieDetails: (id: string) => Promise<MovieDetails>
}

const MovieContext = createContext<MovieContextType | undefined>(undefined)

const API_KEY = '2853c232'

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<{ [email: string]: Movie[] }>({})

  useEffect(() => {
    const storedWatchlist = localStorage.getItem('watchlist')
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist))
    }
  }, [])

  const addToWatchlist = (email: string, movie: Movie) => {
    setWatchlist((prev) => {
      const newWatchlist = {
        ...prev,
        [email]: [...(prev[email] || []), movie],
      }
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist))
      return newWatchlist
    })
  }

  const removeFromWatchlist = (email: string, movieId: string) => {
    setWatchlist((prev) => {
      const newWatchlist = {
        ...prev,
        [email]: prev[email].filter((movie) => movie.imdbID !== movieId),
      }
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist))
      return newWatchlist
    })
  }

  const searchMovies = async (query: string): Promise<Movie[]> => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
    const data = await response.json()
    return data.Search || []
  }

  const getMovieDetails = async (id: string): Promise<MovieDetails> => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
    const data = await response.json()
    return data as MovieDetails
  }

  return (
    <MovieContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, searchMovies, getMovieDetails }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export const useMovie = () => {
  const context = useContext(MovieContext)
  if (context === undefined) {
    throw new Error('useMovie must be used within a MovieProvider')
  }
  return context
}