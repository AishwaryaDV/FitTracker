import { useState } from 'react'
import { MdLock } from 'react-icons/md'
import './PrivacyTab.scss'

// Mock data for privacy settings
const mockPrivacy = {
  shareProgress: false,
  analytics: true,
  marketingCommunications: false,
}

const PrivacyTab = () => {
  const [privacy, setPrivacy] = useState(mockPrivacy)

  const handleToggle = (field: string) => {
    setPrivacy({ ...privacy, [field]: !privacy[field as keyof typeof privacy] })
  }

  const handleDataExport = () => {
    console.log('Exporting user data...')
    // TODO: Implement data export logic
  }

  const handleAccountDeletion = () => {
    if (
      window.confirm('Are you sure you want to delete your account? This action cannot be undone.')
    ) {
      console.log('Deleting account...')
      // TODO: Implement account deletion logic
    }
  }

  return (
    <div className="privacy-tab">
      <div className="section-header">
        <MdLock className="section-icon" />
        <h2 className="tab-title">Privacy & Data</h2>
      </div>
      <p className="tab-subtitle">Manage your data and privacy settings</p>

      <div className="privacy-section">
        <div className="data-export-section">
          <div className="data-section-content">
            <h3>Data Export</h3>
            <p>Download all your data including workouts, nutrition logs, and progress photos.</p>
          </div>
          <button className="export-button" onClick={handleDataExport}>
            Export My Data
          </button>
        </div>

        <div className="account-deletion-section">
          <div className="data-section-content">
            <h3>Account Deletion</h3>
            <p>
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>
          <button className="danger-button" onClick={handleAccountDeletion}>
            Delete Account
          </button>
        </div>

        <div className="privacy-settings-section">
          <h3 className="section-title">Privacy Settings</h3>
          <div className="notification-list">
            <div className="notification-item">
              <div className="notification-info">
                <h3>Share Progress</h3>
                <p>Allow others to see your workout achievements</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={privacy.shareProgress}
                  onChange={() => handleToggle('shareProgress')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <h3>Analytics</h3>
                <p>Help improve the app by sharing usage data</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={privacy.analytics}
                  onChange={() => handleToggle('analytics')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <h3>Marketing Communications</h3>
                <p>Receive tips, updates, and special offers</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={privacy.marketingCommunications}
                  onChange={() => handleToggle('marketingCommunications')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyTab
