import { useState } from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Workouts from './pages/Workouts'
import Analytics from './pages/Analytics'
import Calories from './pages/Calories'
import Settings from './pages/Settings'
import './App.scss'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />
      case 'workouts':
        return <Workouts />
      case 'analytics':
        return <Analytics />
      case 'calories':
        return <Calories />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <Layout activePage={activePage} onNavigate={setActivePage}>
      {renderPage()}
    </Layout>
  )
}

export default App
