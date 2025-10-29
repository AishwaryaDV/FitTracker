import { useState } from 'react'
import { themeStore } from '../../stores/ThemeStore'
import { userStore } from '../../stores/UserStore'
import { observer } from 'mobx-react-lite'
import { MdPerson, MdLightMode, MdDarkMode, MdDevices } from 'react-icons/md'

const ProfileTab = observer(() => {
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'system'>(
    themeStore.theme as 'light' | 'dark'
  )

  const handleInputChange = (field: string, value: string | number) => {
    userStore.updateProfile(field as any, value)
  }

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setSelectedTheme(newTheme)
    if (newTheme === 'light' || newTheme === 'dark') {
      if (themeStore.theme !== newTheme) {
        themeStore.toggleTheme()
      }
    } else if (newTheme === 'system') {
      // TODO: Implement system theme detection
      console.log('System theme selected')
    }
  }

  return (
    <div className="profile-tab">
      <div className="section-header">
        <MdPerson className="section-icon" />
        <h2 className="tab-title">Personal Information</h2>
      </div>
      <p className="tab-subtitle">Update your personal details and preferences</p>

      <div className="form-grid">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={userStore.profile.fullName}
            onChange={e => handleInputChange('fullName', e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={userStore.profile.email}
            onChange={e => handleInputChange('email', e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            value={userStore.profile.age}
            onChange={e => handleInputChange('age', parseInt(e.target.value))}
            placeholder="Enter your age"
          />
        </div>

        <div className="form-group">
          <label>Height (cm)</label>
          <input
            type="number"
            value={userStore.profile.height}
            onChange={e => handleInputChange('height', parseInt(e.target.value))}
            placeholder="Enter your height in cm"
          />
        </div>

        <div className="form-group">
          <label>Current Weight (kg)</label>
          <input
            type="number"
            value={userStore.profile.currentWeight}
            onChange={e => handleInputChange('currentWeight', parseInt(e.target.value))}
            placeholder="Enter your current weight"
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            value={userStore.profile.gender}
            onChange={e => handleInputChange('gender', e.target.value)}
            className="purple-select"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Activity Level</label>
          <select
            value={userStore.profile.activityLevel}
            onChange={e => handleInputChange('activityLevel', e.target.value)}
            className="purple-select"
          >
            <option value="sedentary">Sedentary (1-2 days/week)</option>
            <option value="light">Light (2-3 days/week)</option>
            <option value="moderate">Moderate (3-5 days/week)</option>
            <option value="active">Active (5-6 days/week)</option>
            <option value="very-active">Very Active (6-7 days/week)</option>
          </select>
        </div>
      </div>

      <div className="theme-section">
        <h3 className="theme-section-title">Theme Preference</h3>
        <p className="theme-section-subtitle">Choose your preferred theme</p>
        <div className="theme-buttons">
          <button
            className={`theme-button ${selectedTheme === 'light' ? 'active' : ''}`}
            onClick={() => handleThemeChange('light')}
          >
            <MdLightMode className="theme-icon" />
            <span>Light</span>
          </button>
          <button
            className={`theme-button ${selectedTheme === 'dark' ? 'active' : ''}`}
            onClick={() => handleThemeChange('dark')}
          >
            <MdDarkMode className="theme-icon" />
            <span>Dark</span>
          </button>
          <button
            className={`theme-button ${selectedTheme === 'system' ? 'active' : ''}`}
            onClick={() => handleThemeChange('system')}
          >
            <MdDevices className="theme-icon" />
            <span>System</span>
          </button>
        </div>
      </div>
    </div>
  )
})

export default ProfileTab
