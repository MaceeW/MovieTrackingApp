import { NextResponse } from 'next/server'
import { getMovieInfo } from '@/lib/movieInfo'

// API endpoint to fetch movie information from TMDb
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, tmdbId } = body || {};
    
    if (!title && !tmdbId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Provide movie title or TMDb ID' 
      }, { status: 400 });
    }
    
    // Call TMDb API to get movie details
    const result = await getMovieInfo({ title, tmdbId });
    
    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }
    
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      error: err.message || String(err) 
    }, { status: 500 });
  }
}
