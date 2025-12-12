import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import styles from '@/styles/page.module.css'

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            🎬 Track Your Movies 
          </h1>
          <p className={styles.heroSubtitle}>
            Organize your watchlist and track your movie viewing journey
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/auth/signup" className={styles.primaryButton}>
              Get Started Free
            </Link>
            <Link href="/auth/signin" className={styles.secondaryButton}>
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.features}>
        <h2 className={styles.featuresTitle}>Everything You Need to Track Your Movies</h2>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎬</div>
            <h3 className={styles.featureTitle}>Organize Your Watchlist</h3>
            <p className={styles.featureDescription}>
              Add movies with posters, director details, and personal ratings. Keep all your movies in one place.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>✅</div>
            <h3 className={styles.featureTitle}>Track Watch Status</h3>
            <p className={styles.featureDescription}>
              Mark movies as "To Watch", "Watching", or "Watched". Always know what's next on your list.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔍</div>
            <h3 className={styles.featureTitle}>Search & Filter</h3>
            <p className={styles.featureDescription}>
              Quickly find any movie by title or director. Filter by watch status to focus on what matters.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📝</div>
            <h3 className={styles.featureTitle}>Add Personal Reviews</h3>
            <p className={styles.featureDescription}>
              Write reviews, rate movies, and add your thoughts. Remember why each movie was special to you.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🖼️</div>
            <h3 className={styles.featureTitle}>Beautiful Movie Posters</h3>
            <p className={styles.featureDescription}>
              Automatically fetch posters from TMDb or upload your own to make your library visually appealing.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔒</div>
            <h3 className={styles.featureTitle}>Private & Secure</h3>
            <p className={styles.featureDescription}>
              Your watchlist is completely private. Only you can see and manage your movies.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3 className={styles.stepTitle}>Create Your Account</h3>
            <p className={styles.stepDescription}>
              Sign up for free in seconds. No credit card required.
            </p>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3 className={styles.stepTitle}>Add Your Movies</h3>
            <p className={styles.stepDescription}>
              Search movies from TMDb database or manually add with details and posters.
            </p>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3 className={styles.stepTitle}>Track Your Progress</h3>
            <p className={styles.stepDescription}>
              Update watch status as you go and build your personal movie collection.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.cta}>
        <h2 className={styles.ctaTitle}>Ready to Start Tracking?</h2>
        <p className={styles.ctaText}>
          Join movie enthusiasts who are organizing their viewing journey with Movie Tracker.
        </p>
        <Link href="/auth/signup" className={styles.ctaButton}>
          Create Your Free Account
        </Link>
      </div>
    </div>
  )
}
