import type { ReactNode } from 'react'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode
  activePage: string
  onNavigate: (page: string) => void
}

const Layout = ({ children, activePage, onNavigate }: LayoutProps) => {
  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <main className="main-content">{children}</main>
    </div>
  )
}

export default Layout
