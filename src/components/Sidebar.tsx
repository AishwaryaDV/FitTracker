import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate, useLocation } from 'react-router-dom'
import { CgGym } from 'react-icons/cg'
import {
  MdHome,
  MdFitnessCenter,
  MdTrendingUp,
  MdRestaurant,
  MdSettings,
  MdLightMode,
  MdDarkMode,
  MdMenu,
  MdClose,
} from 'react-icons/md'
import { themeStore } from '../stores/ThemeStore'

const Sidebar = observer(() => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MdHome, path: '/dashboard' },
    { id: 'workouts', label: 'Workouts', icon: MdFitnessCenter, path: '/workouts' },
    { id: 'analytics', label: 'Analytics', icon: MdTrendingUp, path: '/analytics' },
    { id: 'calories', label: 'Calories', icon: MdRestaurant, path: '/calories' },
    { id: 'settings', label: 'Settings', icon: MdSettings, path: '/settings' },
  ]

  const isActive = (path: string) => location.pathname === path

  const handleNavigation = (path: string) => {
    navigate(path)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="logo-section">
          <div className="logo-icon-wrapper">
            <CgGym className="logo-icon" />
          </div>
          <div className="logo-text">
            <h1>FitTracker</h1>
            <p>Your Fitness Journey</p>
          </div>
        </div>

        <div className="navigation">
          <h2 className="nav-header">Navigation</h2>
          <nav className="nav-items">
            {navItems.map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <Icon className="nav-icon" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="theme-toggle">
          <button className="theme-toggle-btn" onClick={() => themeStore.toggleTheme()}>
            {themeStore.theme === 'light' ? (
              <>
                <MdDarkMode className="nav-icon" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <MdLightMode className="nav-icon" />
                <span>Light Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  )
})

export default Sidebar
