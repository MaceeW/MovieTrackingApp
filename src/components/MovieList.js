'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Filters from './Filters'
import styles from '@/styles/MovieList.module.css'

export default function MovieList({ movies: initialMovies }) {
  const [movies] = useState(initialMovies)

  const statusColors = {
    'To Watch': '#6c757d',
    'Watching': '#ffc107',
    'Watched': '#28a745'
  }

  return (
    <>
      <Filters />
      
      {movies.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎬</div>
          <h2 className={styles.emptyTitle}>No movies found</h2>
          <p className={styles.emptyText}>
            Try adjusting your filters or search terms, or add a new movie to your library.
          </p>
          <Link href="/add-movie" className={styles.addButton}>
            Add a Movie
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {movies.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id} className={styles.card}>
            {movie.poster_url ? (
              <div className={styles.posterContainer}>
                <Image 
                  src={movie.poster_url} 
                  alt={`${movie.title} poster`}
                  width={200}
                  height={300}
                  className={styles.poster}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  priority={movies.indexOf(movie) < 4}
                />
              </div>
            ) : (
              <div className={styles.posterPlaceholder}>
                <span className={styles.placeholderIcon}>🎬</span>
              </div>
            )}
            <div className={styles.content}>
              <h3 className={styles.title}>{movie.title}</h3>
              <p className={styles.director}>
                {movie.director ? `Directed by ${movie.director}` : 'Director Unknown'}
              </p>
              {movie.releaseYear && (
                <p className={styles.year}>{movie.releaseYear}</p>
              )}
              <div className={styles.footer}>
                <span 
                  className={styles.status}
                  style={{ backgroundColor: statusColors[movie.status] }}
                >
                  {movie.status}
                </span>
                {movie.rating && (
                  <span className={styles.rating}>⭐ {movie.rating.toFixed(1)}</span>
                )}
              </div>
            </div>
          </Link>
          ))}
        </div>
      )}
    </>
  )
}
