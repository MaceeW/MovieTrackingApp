import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import EditMovieForm from '@/components/EditMovieForm'

export default async function EditMoviePage({ params }) {
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

  return <EditMovieForm movie={movie} />
}
