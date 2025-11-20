'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import styles from './Filters.module.css'

export default function Filters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams?.get('search') || '')
  const [status, setStatus] = useState(searchParams?.get('status') || 'all')

  useEffect(() => {
    const params = new URLSearchParams()
    
    if (search) {
      params.set('search', search)
    }
    
    if (status && status !== 'all') {
      params.set('status', status)
    }

    const queryString = params.toString()
    router.push(queryString ? `/?${queryString}` : '/')
  }, [search, status, router])

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <label htmlFor="search" className={styles.label}>
          Search
        </label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by title or author..."
          className={styles.searchInput}
        />
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="status" className={styles.label}>
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
          className={styles.select}
        >
          <option value="all">All Books</option>
          <option value="To Read">To Read</option>
          <option value="Reading">Reading</option>
          <option value="Finished">Finished</option>
        </select>
      </div>
    </div>
  )
}
