import { getPost, Post } from "@/services/post"
import { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params
  if (slug) {
    const post = await getPost(slug)
    return { post }
  }

  return null
}

const PostById = () => {
  const {post} = useLoaderData<{ post: Post & { content: TrustedHTML } }>()


  return (
    <div>
      Post detail {post.slug}
      <div dangerouslySetInnerHTML={{__html: post.content}} />
    </div>
  )
}

export default PostById
