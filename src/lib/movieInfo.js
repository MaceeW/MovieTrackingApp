// Fetch movie information from The Movie Database (TMDb) API
// You'll need to sign up for a free API key at https://www.themoviedb.org/settings/api

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

// Search for movies by title
async function searchMoviesByTitle(title) {
  try {
    if (!TMDB_API_KEY) {
      console.error('TMDB_API_KEY is not set in environment variables');
      return null;
    }

    const res = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&include_adult=false`
    );
    
    if (!res.ok) return null;
    
    const data = await res.json();
    const movie = data.results && data.results[0];
    
    if (!movie) return null;

    // Get additional details for the first result
    return await fetchMovieById(movie.id);
  } catch (err) {
    console.error('Error searching movies by title:', err);
    return null;
  }
}

// Fetch detailed movie information by TMDb ID
async function fetchMovieById(movieId) {
  try {
    if (!TMDB_API_KEY) {
      console.error('TMDB_API_KEY is not set in environment variables');
      return null;
    }

    const res = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=credits`
    );
    
    if (!res.ok) return null;
    
    const movie = await res.json();

    // Extract director from credits
    const director = movie.credits?.crew?.find(person => person.job === 'Director')?.name || null;

    // Extract genres
    const genres = movie.genres?.map(g => g.name).join(', ') || null;

    // Build poster URL
    const posterUrl = movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : null;

    return {
      source: 'tmdb',
      tmdbId: movie.id.toString(),
      title: movie.title || null,
      director,
      releaseYear: movie.release_date ? parseInt(movie.release_date.split('-')[0]) : null,
      genre: genres,
      runtime: movie.runtime || null,
      posterUrl,
      description: movie.overview || null,
      raw: movie,
    };
  } catch (err) {
    console.error('Error fetching movie by ID:', err);
    return null;
  }
}

// Main function to fetch movie info - searches by title
export async function getMovieInfo({ title, tmdbId }) {
  if (!TMDB_API_KEY) {
    return {
      success: false,
      error: 'TMDb API key not configured. Please add TMDB_API_KEY to your environment variables.',
    };
  }

  try {
    let result = null;

    // If TMDb ID is provided, fetch directly
    if (tmdbId) {
      result = await fetchMovieById(tmdbId);
    }
    // Otherwise search by title
    else if (title) {
      result = await searchMoviesByTitle(title);
    }

    if (!result) {
      return {
        success: false,
        error: 'Movie not found. Please try a different search term.',
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (err) {
    console.error('Error in getMovieInfo:', err);
    return {
      success: false,
      error: 'An error occurred while fetching movie information.',
    };
  }
}
