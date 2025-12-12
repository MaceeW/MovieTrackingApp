import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import Image from 'next/image'
import MovieActions from '@/components/MovieActions'
import styles from '@/styles/Movie.module.css'

export default async function MoviePage({ params }) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  const movieId = parseInt(params.id)
  
  if (isNaN(movieId)) {
    notFound()
  }

  const movie = await prisma.movie.findUnique({
    where: {
      id: movieId
    }
  })

  if (!movie) {
    notFound()
  }

  if (movie.userId !== session.user.id) {
    redirect('/')
  }

  const statusColors = {
    'To Watch': '#6c757d',
    'Watching': '#ffc107',
    'Watched': '#28a745'
  }

  return (
    <div className={styles.container}>
      <div className={styles.movieCard}>
        {movie.poster_url ? (
          <div className={styles.posterContainer}>
            <Image 
              src={movie.poster_url} 
              alt={`${movie.title} poster`}
              width={300}
              height={450}
              className={styles.poster}
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        ) : (
          <div className={styles.posterPlaceholder}>
            <span className={styles.placeholderIcon}>🎬</span>
          </div>
        )}
        
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>{movie.title}</h1>
            <MovieActions movieId={movie.id} />
          </div>
          
          {movie.director && (
            <p className={styles.director}>Directed by {movie.director}</p>
          )}

          <div className={styles.metadata}>
            {movie.releaseYear && (
              <span className={styles.metaItem}>📅 {movie.releaseYear}</span>
            )}
            {movie.runtime && (
              <span className={styles.metaItem}>⏱️ {movie.runtime} min</span>
            )}
            {movie.genre && (
              <span className={styles.metaItem}>🎭 {movie.genre}</span>
            )}
          </div>
          
          <div className={styles.statusContainer}>
            <span 
              className={styles.status}
              style={{ backgroundColor: statusColors[movie.status] }}
            >
              {movie.status}
            </span>
            {movie.rating && (
              <span className={styles.rating}>⭐ {movie.rating.toFixed(1)}/10</span>
            )}
          </div>

          {movie.notes && (
            <div className={styles.notesSection}>
              <h2 className={styles.notesTitle}>Notes</h2>
              <p className={styles.notes}>{movie.notes}</p>
            </div>
          )}

          <div className={styles.dateMetadata}>
            <p className={styles.date}>
              Added: {new Date(movie.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            {movie.updatedAt !== movie.createdAt && (
              <p className={styles.date}>
                Updated: {new Date(movie.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
