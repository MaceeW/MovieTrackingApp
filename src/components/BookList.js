'use client'

import { useState } from 'react'
import Link from 'next/link'
import Filters from './Filters'
import styles from './BookList.module.css'

export default function BookList({ books: initialBooks }) {
  const [books] = useState(initialBooks)

  const statusColors = {
    'To Read': '#6c757d',
    'Reading': '#ffc107',
    'Finished': '#28a745'
  }

  if (books.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📚</div>
        <h2 className={styles.emptyTitle}>No books yet</h2>
        <p className={styles.emptyText}>
          Start building your reading list by adding your first book!
        </p>
        <Link href="/add-book" className={styles.addButton}>
          Add Your First Book
        </Link>
      </div>
    )
  }

  return (
    <>
      <Filters />
      
      <div className={styles.grid}>
        {books.map((book) => (
          <Link href={`/book/${book.id}`} key={book.id} className={styles.card}>
            {book.cover_url && (
              <div className={styles.coverContainer}>
                <img 
                  src={book.cover_url} 
                  alt={`${book.title} cover`}
                  className={styles.cover}
                />
              </div>
            )}
            <div className={styles.content}>
              <h3 className={styles.title}>{book.title}</h3>
              <p className={styles.author}>by {book.author}</p>
              <div className={styles.footer}>
                <span 
                  className={styles.status}
                  style={{ backgroundColor: statusColors[book.status] }}
                >
                  {book.status}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
