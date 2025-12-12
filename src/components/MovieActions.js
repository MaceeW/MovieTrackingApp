'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import styles from '@/styles/MovieActions.module.css'

export default function MovieActions({ movieId }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this movie?')) {
      return
    }

    setDeleting(true)

    try {
      const response = await fetch(`/api/movies/${movieId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete movie')
      }

      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      alert('Failed to delete movie. Please try again.')
      setDeleting(false)
    }
  }

  return (
    <div className={styles.actions}>
      <Link href={`/movie/${movieId}/edit`} className={styles.editButton}>
        Edit
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className={styles.deleteButton}
      >
        {deleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  )
}
