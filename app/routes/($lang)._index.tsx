import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' }
  ]
}

export default function Index () {
  return (
    <div className="font-sans h-screen bg-slate-900">
      <header className='h-36 bg-black'>
        <nav className='h-full w-4/5 mx-auto'>
          <ul>
            <li className='text-white'>
              <Link to='/en/posts'>posts</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}
