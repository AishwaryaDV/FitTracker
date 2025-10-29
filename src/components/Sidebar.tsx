import { observer } from 'mobx-react-lite'
import { CgGym } from 'react-icons/cg'
import {
  MdHome,
  MdFitnessCenter,
  MdTrendingUp,
  MdRestaurant,
  MdSettings,
  MdLightMode,
  MdDarkMode,
} from 'react-icons/md'
import { themeStore } from '../stores/ThemeStore'

interface SidebarProps {
  activePage: string
  onNavigate: (page: string) => void
}

const Sidebar = observer(({ activePage, onNavigate }: SidebarProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MdHome },
    { id: 'workouts', label: 'Workouts', icon: MdFitnessCenter },
    { id: 'analytics', label: 'Analytics', icon: MdTrendingUp },
    { id: 'calories', label: 'Calories', icon: MdRestaurant },
    { id: 'settings', label: 'Settings', icon: MdSettings },
  ]

  return (
    <div className="sidebar">
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
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
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
  )
})

export default Sidebar
