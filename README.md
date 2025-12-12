# Movie Tracker App

A full-stack movie tracking application built with Next.js 14, Prisma, and PostgreSQL. Track your movie watchlist, rate movies, and get automatic movie information from The Movie Database (TMDb) API.

## Features

- 🎬 **Movie Management**: Add, edit, and delete movies from your watchlist
- 🔍 **TMDb Integration**: Automatically fetch movie details, posters, and metadata from TMDb
- ⭐ **Personal Ratings**: Rate movies on a scale of 0-10
- 📝 **Notes & Reviews**: Add personal notes and reviews for each movie
- 🎯 **Watch Status Tracking**: Track movies as "To Watch", "Watching", or "Watched"
- 🔐 **User Authentication**: Secure sign-up and sign-in with NextAuth.js
- 🖼️ **Image Uploads**: Upload custom movie posters via Cloudinary
- 🔍 **Search & Filter**: Search by title/director and filter by watch status
- 📱 **Responsive Design**: Beautiful UI that works on all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: CSS Modules
- **Image Storage**: Cloudinary
- **Movie Data**: The Movie Database (TMDb) API

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Cloudinary account (for image uploads)
- TMDb API key (free at https://www.themoviedb.org/settings/api)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd movie-tracker-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

   Required environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL`: Your app URL (http://localhost:3000 for development)
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: From your Cloudinary dashboard
   - `TMDB_API_KEY`: Your TMDb API key

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Getting a TMDb API Key

1. Create a free account at [The Movie Database](https://www.themoviedb.org/signup)
2. Go to your [API Settings](https://www.themoviedb.org/settings/api)
3. Request an API key (choose "Developer" option)
4. Copy your API key and add it to your `.env` file as `TMDB_API_KEY`

## Project Structure

```
movie-tracker-app/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   ├── add-movie/         # Add movie page
│   │   ├── movie/[id]/        # Movie detail & edit pages
│   │   ├── dashboard/         # Main dashboard
│   │   └── auth/              # Auth pages
│   ├── components/            # React components
│   ├── lib/                   # Utilities (TMDb, Prisma, etc.)
│   └── styles/                # CSS modules
├── public/                    # Static assets
└── .env.example              # Environment variables template
```

## Database Schema

The app uses a PostgreSQL database with two main models:

- **User**: Stores user accounts and authentication data
- **Movie**: Stores movie information with fields for:
  - Title, director, release year, genre, runtime
  - TMDb ID for API integration
  - Watch status (To Watch, Watching, Watched)
  - Personal rating (0-10)
  - Poster URL and personal notes
  - User relationship for data privacy

## API Routes

- `GET/POST /api/movies` - List and create movies
- `GET/PUT/DELETE /api/movies/[id]` - Get, update, and delete specific movie
- `POST /api/movie-info` - Fetch movie details from TMDb
- `POST /api/upload` - Upload images to Cloudinary
- `/api/auth/*` - NextAuth.js authentication endpoints

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
