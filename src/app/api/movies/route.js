import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { prisma } from '@/lib/prisma'

// GET endpoint - fetches all movies for the authenticated user
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const movies = await prisma.movie.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(movies)
  } catch (error) {
    console.error('Error fetching movies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    )
  }
}

// POST endpoint - creates a new movie
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, director, releaseYear, genre, runtime, tmdbId, status, poster_url, rating, notes } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    const validStatuses = ['To Watch', 'Watching', 'Watched']
    const movieStatus = status || 'To Watch'
    
    if (!validStatuses.includes(movieStatus)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be: To Watch, Watching, or Watched' },
        { status: 400 }
      )
    }

    const movie = await prisma.movie.create({
      data: {
        title: title.trim(),
        director: director?.trim() || null,
        releaseYear: releaseYear ? parseInt(releaseYear) : null,
        genre: genre?.trim() || null,
        runtime: runtime ? parseInt(runtime) : null,
        tmdbId: tmdbId?.toString() || null,
        status: movieStatus,
        poster_url: poster_url?.trim() || null,
        rating: rating ? parseFloat(rating) : null,
        notes: notes?.trim() || null,
        userId: session.user.id
      }
    })

    return NextResponse.json(movie, { status: 201 })
  } catch (error) {
    console.error('Error creating movie:', error)
    return NextResponse.json(
      { error: 'Failed to create movie' },
      { status: 500 }
    )
  }
}
