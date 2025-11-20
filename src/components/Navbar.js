'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          📚 Reading Tracker
        </Link>

        <div className={styles.navLinks}>
          {session ? (
            <>
              <Link href="/add-book" className={styles.link}>
                Add a Book
              </Link>
              <span className={styles.email}>{session.user?.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                className={styles.signOutButton}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/signin" className={styles.link}>
                Sign In
              </Link>
              <Link href="/auth/signup" className={styles.linkButton}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
