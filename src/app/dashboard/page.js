import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import MovieList from '@/components/MovieList'
import styles from '@/styles/dashboard.module.css'

export const dynamic = 'force-dynamic'

export default async function DashboardPage({ searchParams }) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  const where = {
    userId: session.user.id
  }

  const status = searchParams?.status
  const search = searchParams?.search

  if (status && status !== 'all') {
    where.status = status
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { director: { contains: search, mode: 'insensitive' } }
    ]
  }

  const movies = await prisma.movie.findMany({
    where,
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Movie Watchlist</h1>
        <p className={styles.subtitle}>
          {movies.length} {movies.length === 1 ? 'movie' : 'movies'} in your collection
        </p>
      </div>
      
      <MovieList movies={movies} />
    </div>
  )
}
