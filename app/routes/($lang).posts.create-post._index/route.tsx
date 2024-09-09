import useI18n from '@/hooks/useI18n'
import { createPost } from '@/services/post'
import { NAMESPACES } from '@/utils/enums'
import { ActionFunctionArgs } from '@remix-run/node'
import { Form, json, redirect, useActionData, useNavigation } from '@remix-run/react'

interface CreatePostErrors {
  title?: string
  slug?: string
  content?: string
}

export async function action ({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const lang = formData.get('lang') as string

  const errors: CreatePostErrors = {}

  if (!title) {
    errors.title = 'Title is required'
  }

  if (!slug) {
    errors.slug = 'Slug is required'
  }

  if (!content) {
    errors.content = 'Content is required'
  }

  if (Object.values(errors).some(Boolean)) return json({ errors }, { status: 400 })

  await createPost({ title, slug, content })

  return redirect(`/${lang}/posts/${slug}`)
}

const CreatePost = () => {
  const errors = useActionData<typeof action>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  const { texts, language, loading } = useI18n({ ns: NAMESPACES.POSTS })

  if (loading) return <div>Loading...</div>

  return (
    <main className='bg-slate-900 min-h-dvh flex flex-col gap-y-4'>
      <h1 className='p-4 font-semibold text-white text-3xl text-center'>{texts.createPost}</h1>
      <Form method="post" className="flex flex-col gap-y-6 items-center">
        <input type="hidden" name="lang" value={language} />
        <label className='w-5/6 flex flex-col text-white gap-y-2'>
          {texts.title}
          <input placeholder={texts.title} className="w-full text-black" type="text" name="title" />
          {errors?.errors?.title && <p className="text-red-500">{errors?.errors.title}</p>}
        </label>

        <label className='w-5/6 flex flex-col text-white gap-y-2'>
          {texts.slug}
          <input placeholder={texts.slug} className="w-full text-black" type="text" name="slug" />
          {errors?.errors?.slug && <p className="text-red-500">{errors?.errors.slug}</p>}
        </label>

        <label className='w-5/6 flex flex-col text-white gap-y-2'>
          {texts.content}
          <textarea placeholder={texts.content} className="w-full text-black" name="content" rows={20} />
          {errors?.errors?.content && <p className="text-red-500">{errors?.errors.content}</p>}
        </label>
        <button disabled={isSubmitting} type="submit" className="w-1/4 bg-white border border-black rounded-md text-black disabled:opacity-60">
          {
            isSubmitting
              ? texts.creating
              : texts.create
          }
        </button>
      </Form>
    </main>
  )
}
export default CreatePost
