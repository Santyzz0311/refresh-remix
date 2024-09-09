import { Link, useLoaderData } from '@remix-run/react'
import { getPosts, Post } from '@/services/post'
import useI18n from '@/hooks/useI18n'
import { NAMESPACES } from '@/utils/enums'

export const loader = async () => {
  return await getPosts()
}

const Posts = () => {
  const { texts, loading } = useI18n({ ns: NAMESPACES.POSTS })
  const posts = useLoaderData<Post[]>()

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>{texts.welcome}</h1>
      {
        posts.map(post => (
          <div key={post.slug}>
            <Link to={`/posts/${post.slug}`}>
              <h2>{post.title ?? post.slug}</h2>
            </Link>
          </div>
        ))
      }
    </div>
  )
}
export default Posts
