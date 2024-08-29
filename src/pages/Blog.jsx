import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { PostList } from '../components/PostList'
import { CreatePost } from '../components/CreatePost'
import { PostFilter } from '../components/PostFilter'
import { PostSorting } from '../components/PostSorting'
import { Header } from '../components/Header'
import { getPosts } from '../api/posts.js'

export function Blog() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const postQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  })
  const posts = postQuery.data ?? []

  return (
    <div style={{ padding: 8 }}>
      <Header />
      <br />
      <hr />
      <br />
      <CreatePost />
      <br />
      <hr />
      FilterBy:
      <PostFilter field='author' onChange={(value) => setAuthor(value)} />
      <br />
      <PostSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
