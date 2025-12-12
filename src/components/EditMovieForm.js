'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import styles from '@/styles/EditMovieForm.module.css'

export default function EditMovieForm({ movie }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: movie.title,
    director: movie.director || '',
    releaseYear: movie.releaseYear || '',
    genre: movie.genre || '',
    runtime: movie.runtime || '',
    status: movie.status,
    rating: movie.rating || '',
    notes: movie.notes || '',
    poster_url: movie.poster_url || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB')
      return
    }

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image')
      }

      setFormData(prev => ({
        ...prev,
        poster_url: data.url
      }))
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`/api/movies/${movie.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update movie')
      }

      router.push(`/movie/${movie.id}`)
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Edit Movie</h1>
        
        {error && (
          <div className={styles.error}>{error}</div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="director" className={styles.label}>
              Director
            </label>
            <input
              type="text"
              id="director"
              name="director"
              value={formData.director}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="releaseYear" className={styles.label}>
                Release Year
              </label>
              <input
                type="number"
                id="releaseYear"
                name="releaseYear"
                value={formData.releaseYear}
                onChange={handleChange}
                min="1800"
                max="2100"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="runtime" className={styles.label}>
                Runtime (minutes)
              </label>
              <input
                type="number"
                id="runtime"
                name="runtime"
                value={formData.runtime}
                onChange={handleChange}
                min="1"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="genre" className={styles.label}>
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="e.g., Action, Drama, Comedy"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status" className={styles.label}>
              Status *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="To Watch">To Watch</option>
              <option value="Watching">Watching</option>
              <option value="Watched">Watched</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="rating" className={styles.label}>
              Your Rating (0-10)
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.1"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="poster_url" className={styles.label}>
              Poster URL
            </label>
            <input
              type="url"
              id="poster_url"
              name="poster_url"
              value={formData.poster_url}
              onChange={handleChange}
              placeholder="https://..."
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="poster" className={styles.label}>
              Upload Custom Poster
            </label>
            <input
              type="file"
              id="poster"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className={styles.fileInput}
            />
            {uploading && <p className={styles.uploading}>Uploading...</p>}
          </div>

          {formData.poster_url && (
            <div className={styles.posterPreview}>
              <Image
                src={formData.poster_url}
                alt="Movie poster preview"
                width={200}
                height={300}
                className={styles.posterImage}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="notes" className={styles.label}>
              Personal Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Your thoughts about this movie..."
              className={styles.textarea}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => router.back()}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
