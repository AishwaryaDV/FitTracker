import { useState } from 'react'

// Mock data for privacy settings
const mockPrivacy = {
  profileVisibility: 'public',
  activitySharing: true,
  dataCollection: true,
  twoFactorAuth: false,
}

const PrivacyTab = () => {
  const [privacy, setPrivacy] = useState(mockPrivacy)

  const handleToggle = (field: string) => {
    setPrivacy({ ...privacy, [field]: !privacy[field as keyof typeof privacy] })
  }

  const handleVisibilityChange = (value: string) => {
    setPrivacy({ ...privacy, profileVisibility: value })
  }

  return (
    <div className="privacy-tab">
      <h2 className="tab-title">Privacy & Security</h2>
      <p className="tab-subtitle">Manage your privacy settings and data preferences</p>

      <div className="privacy-section">
        <div className="form-group">
          <label>Profile Visibility</label>
          <select
            value={privacy.profileVisibility}
            onChange={e => handleVisibilityChange(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
          <p className="help-text">Control who can see your profile and activity</p>
        </div>

        <div className="notification-list">
          <div className="notification-item">
            <div className="notification-info">
              <h3>Activity Sharing</h3>
              <p>Share your workouts and progress with others</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={privacy.activitySharing}
                onChange={() => handleToggle('activitySharing')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="notification-item">
            <div className="notification-info">
              <h3>Data Collection</h3>
              <p>Allow us to collect data to improve your experience</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={privacy.dataCollection}
                onChange={() => handleToggle('dataCollection')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="notification-item">
            <div className="notification-info">
              <h3>Two-Factor Authentication</h3>
              <p>Add an extra layer of security to your account</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={privacy.twoFactorAuth}
                onChange={() => handleToggle('twoFactorAuth')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="danger-zone">
          <h3>Danger Zone</h3>
          <button className="danger-button">Delete Account</button>
          <p className="help-text">Permanently delete your account and all associated data</p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyTab
