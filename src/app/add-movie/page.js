"use client"

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import styles from '@/styles/AddMovie.module.css'

export default function AddMoviePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    releaseYear: '',
    genre: '',
    runtime: '',
    tmdbId: '',
    status: 'To Watch',
    rating: '',
    notes: '',
    poster_url: ''
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

  const [fetchingInfo, setFetchingInfo] = useState(false)

  const fetchMovieInfo = async () => {
    const { title, tmdbId } = formData
    if (!title && !tmdbId) {
      setError('Provide a movie title to fetch info')
      return
    }

    setFetchingInfo(true)
    setError('')

    try {
      const res = await fetch('/api/movie-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: title || undefined, 
          tmdbId: tmdbId || undefined 
        })
      })
      const payload = await res.json()
      if (!res.ok || !payload.success) {
        throw new Error(payload.error || 'Failed to fetch movie info')
      }
      const info = payload.data || {}
      setFormData(prev => ({
        ...prev,
        title: info.title || prev.title,
        director: info.director || prev.director,
        releaseYear: info.releaseYear || prev.releaseYear,
        genre: info.genre || prev.genre,
        runtime: info.runtime || prev.runtime,
        tmdbId: info.tmdbId || prev.tmdbId,
        poster_url: info.posterUrl || prev.poster_url,
        notes: prev.notes || (info.description || '')
      }))
    } catch (err) {
      setError(err.message)
    } finally {
      setFetchingInfo(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add movie')
      }

      router.push('/dashboard')
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
        <h1 className={styles.title}>Add a New Movie</h1>
        
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Movie Title *
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={styles.input}
                required
                placeholder="Enter movie title"
              />
              <button
                type="button"
                onClick={fetchMovieInfo}
                disabled={fetchingInfo}
                className={styles.submitButton}
                style={{ padding: '8px 12px', height: '40px', whiteSpace: 'nowrap' }}
              >
                {fetchingInfo ? 'Fetching...' : 'Search TMDb'}
              </button>
            </div>
            <p className={styles.helpText}>
              Enter a movie title and click "Search TMDb" to auto-fill details from The Movie Database
            </p>
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
              placeholder="Enter director name"
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
                className={styles.input}
                placeholder="2024"
                min="1800"
                max="2100"
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
                className={styles.input}
                placeholder="120"
                min="1"
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
              className={styles.input}
              placeholder="e.g., Action, Drama, Comedy"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status" className={styles.label}>
              Watch Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
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
              className={styles.input}
              placeholder="8.5"
              min="0"
              max="10"
              step="0.1"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="poster_image" className={styles.label}>
              Poster Image (Optional)
            </label>
            <input
              type="file"
              id="poster_image"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.input}
              disabled={uploading}
            />
            {uploading && <p className={styles.uploadingText}>Uploading image...</p>}
            {formData.poster_url && (
              <div className={styles.imagePreview}>
                <Image
                  src={formData.poster_url}
                  alt="Movie poster preview"
                  width={120}
                  height={180}
                  style={{ objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, poster_url: '' }))}
                  className={styles.removeImageButton}
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="notes" className={styles.label}>
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className={styles.textarea}
              rows="5"
              placeholder="Add your thoughts, review, or notes about this movie..."
            />
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? 'Adding Movie...' : 'Add Movie'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
