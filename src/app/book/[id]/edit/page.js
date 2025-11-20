import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import EditBookForm from '@/components/EditBookForm'

export default async function EditBookPage({ params }) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  const bookId = parseInt(params.id)
  
  if (isNaN(bookId)) {
    notFound()
  }

  const book = await prisma.book.findUnique({
    where: {
      id: bookId
    }
  })

  if (!book) {
    notFound()
  }

  if (book.userId !== session.user.id) {
    redirect('/')
  }

  return <EditBookForm book={book} />
}
