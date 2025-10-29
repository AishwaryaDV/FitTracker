import { useState } from 'react'
import { MdSettings } from 'react-icons/md'
import ProfileTab from '../components/settings/ProfileTab'
import GoalsTab from '../components/settings/GoalsTab'
import NotificationsTab from '../components/settings/NotificationsTab'
import PrivacyTab from '../components/settings/PrivacyTab'

type TabType = 'profile' | 'goals' | 'notifications' | 'privacy'

const Settings = () => {
  const [activeTab, setActiveTab] = useState<TabType>('profile')

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile' },
    { id: 'goals' as TabType, label: 'Goals' },
    { id: 'notifications' as TabType, label: 'Notifications' },
    { id: 'privacy' as TabType, label: 'Privacy' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />
      case 'goals':
        return <GoalsTab />
      case 'notifications':
        return <NotificationsTab />
      case 'privacy':
        return <PrivacyTab />
      default:
        return <ProfileTab />
    }
  }

  const handleSaveChanges = () => {
    // TODO: Implement save logic with API calls
    console.log('Saving changes...')
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <div className="header-content">
          <div className="header-title-wrapper">
            <div className="settings-icon-wrapper">
              <MdSettings className="settings-icon" />
            </div>
            <h1>Settings and Profile</h1>
          </div>
          <p>Customise your experience and set your goals</p>
        </div>
        <button className="gradient-button" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>

      <div className="settings-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="settings-content">{renderTabContent()}</div>
    </div>
  )
}

export default Settings
