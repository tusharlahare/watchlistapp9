"use client"

import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-red-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Movie Watchlist
        </Link>
        <div className="space-x-4">
          <Link to="/search" className="text-white hover:text-blue-200">
            Search
          </Link>
          {user ? (
            <>
              <Link to="/watchlist" className="text-white hover:text-blue-200">
                My Watchlist
              </Link>
              <button onClick={logout} className="text-white hover:text-blue-200">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white hover:text-blue-200">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}