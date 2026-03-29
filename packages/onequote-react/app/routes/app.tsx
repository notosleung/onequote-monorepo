import type { Route } from './+types/app'
import { Outlet } from 'react-router'
import Footer from '~/components/footer'
import Header from '~/components/header'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'OneQuote-React' },
  ]
}

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="body-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
