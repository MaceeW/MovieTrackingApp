# Movie Tracker App - Setup Guide

## 🎬 Your Book Tracker is now a Movie Tracker!

I've successfully converted your reading tracker into a movie tracking application with TMDb integration.

## What's Changed

### 1. **Database Schema** (Prisma)
- Changed from `Book` model to `Movie` model
- Updated fields:
  - `author` → `director`
  - `cover_url` → `poster_url`
  - Added: `releaseYear`, `genre`, `runtime`, `tmdbId`, `rating`
  - Status options: "To Watch", "Watching", "Watched"

### 2. **TMDb API Integration**
- New file: `src/lib/movieInfo.js` - Fetches movie data from TMDb
- Automatic movie information lookup by title
- Auto-populates director, year, genre, runtime, and poster

### 3. **Updated Files**
- All components renamed and updated (BookList → MovieList, etc.)
- All pages updated (add-book → add-movie, book/[id] → movie/[id])
- API routes updated (/api/books → /api/movies)
- Navigation and branding updated throughout

### 4. **New Features**
- Personal movie ratings (0-10 scale)
- Genre and runtime tracking
- Release year display
- TMDb integration for easy movie adding

## 🚀 Setup Instructions

### Step 1: Get a TMDb API Key

1. Go to https://www.themoviedb.org/signup and create a free account
2. Navigate to https://www.themoviedb.org/settings/api
3. Request an API key (choose "Developer" option)
4. Copy your API key (v3 auth)

### Step 2: Update Environment Variables

Add this to your `.env` file:
```env
TMDB_API_KEY=your_tmdb_api_key_here
```

Make sure you also have:
- `DATABASE_URL` - Your PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Usually http://localhost:3000
- Cloudinary credentials (if using image uploads)

### Step 3: Create New Database Migration

Since the database schema changed significantly, you have two options:

**Option A: Fresh Start (Recommended for development)**
```bash
# Drop existing database and recreate
npx prisma migrate reset

# This will:
# 1. Drop the database
# 2. Create a new database
# 3. Apply all migrations
# 4. Run seed file (if you have one)
```

**Option B: Create Migration (If you want to keep existing data)**
```bash
# Create a new migration
npx prisma migrate dev --name convert_book_to_movie

# Note: This will attempt to migrate existing Book data to Movie format
# You may need to manually adjust the migration SQL if you have existing data
```

### Step 4: Generate Prisma Client

```bash
npx prisma generate
```

### Step 5: Install Dependencies (if needed)

```bash
npm install
```

### Step 6: Run the Application

```bash
npm run dev
```

Visit http://localhost:3000 and your movie tracker should be running!

## 📁 File Structure Changes

### New Files Created:
- `src/lib/movieInfo.js` - TMDb API integration
- `src/components/MovieList.js`
- `src/components/MovieActions.js`
- `src/components/EditMovieForm.js`
- `src/app/add-movie/page.js`
- `src/app/movie/[id]/page.js`
- `src/app/movie/[id]/edit/page.js`
- `src/app/api/movies/route.js`
- `src/app/api/movies/[id]/route.js`
- `src/app/api/movie-info/route.js`
- `src/styles/MovieList.module.css`
- `src/styles/MovieActions.module.css`
- `src/styles/EditMovieForm.module.css`
- `src/styles/Movie.module.css`
- `src/styles/AddMovie.module.css`
- `.env.example`
- `README.md` (updated)

### Files You Can Delete (Old Book Files):
After confirming everything works, you can delete:
- `src/lib/bookInfo.js`
- `src/lib/isbn.js`
- `src/components/BookList.js`
- `src/components/BookActions.js`
- `src/components/EditBookForm.js`
- `src/app/add-book/`
- `src/app/book/`
- `src/app/api/books/`
- `src/app/api/book-info/`
- `src/styles/BookList.module.css`
- `src/styles/BookActions.module.css`
- `src/styles/EditBookForm.module.css`
- `src/styles/Book.module.css`
- `src/styles/AddBook.module.css`

## 🎯 How to Use

1. **Sign up/Sign in** to your account
2. **Add a movie** by clicking "Add Movie" in the navbar
3. **Search TMDb**: Enter a movie title and click "Search TMDb" to auto-fill details
4. **Track status**: Mark movies as "To Watch", "Watching", or "Watched"
5. **Rate movies**: Add personal ratings from 0-10
6. **Add notes**: Write reviews and thoughts about each movie
7. **Search & Filter**: Use the dashboard filters to find movies

## 🐛 Troubleshooting

**TMDb API not working?**
- Check that `TMDB_API_KEY` is set in your `.env` file
- Verify your API key is valid at https://www.themoviedb.org/settings/api
- Check browser console for error messages

**Database errors?**
- Run `npx prisma migrate reset` to start fresh
- Make sure PostgreSQL is running
- Check `DATABASE_URL` in your `.env` file

**Images not uploading?**
- Verify Cloudinary credentials in `.env`
- Check image file size (must be under 5MB)

## 📚 API Documentation

### TMDb API Integration
The app uses TMDb API v3 to fetch movie information:
- Search movies by title
- Get movie details (director, year, genre, runtime)
- Fetch movie posters automatically

Rate limits: TMDb has a generous free tier (thousands of requests per day)

## 🎉 Next Steps

Consider adding:
- Cast and crew information
- Movie trailers (YouTube integration)
- Advanced search (by genre, year, etc.)
- Social features (share movies with friends)
- Recommendation system
- Export watchlist to CSV/JSON
- Dark mode

Enjoy your new Movie Tracker app! 🍿🎬
