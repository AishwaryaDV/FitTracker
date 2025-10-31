import { useState } from 'react'
import { MdNotifications } from 'react-icons/md'
import './NotificationsTab.scss'

// Mock data for notifications
const mockNotifications = {
  workoutReminders: true,
  mealReminders: true,
  progressUpdates: true,
  weeklyReports: false,
  workoutReminderTime: '18:00',
  mealReminderTime: '12:00',
}

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState(mockNotifications)

  const handleToggle = (field: string) => {
    setNotifications({
      ...notifications,
      [field]: !notifications[field as keyof typeof notifications],
    })
  }

  const handleTimeChange = (field: string, value: string) => {
    setNotifications({
      ...notifications,
      [field]: value,
    })
  }

  return (
    <div className="notifications-tab">
      <div className="section-header">
        <MdNotifications className="section-icon" />
        <h2 className="tab-title">Notification Preferences</h2>
      </div>
      <p className="tab-subtitle">Choose when and how you'd like to be reminded</p>

      <div className="notification-list">
        <div className="notification-item">
          <div className="notification-info">
            <h3>Workout Reminders</h3>
            <p>Get notified when it's time for your scheduled workout</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.workoutReminders}
              onChange={() => handleToggle('workoutReminders')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h3>Meal Logging Reminders</h3>
            <p>Reminders to log your meals and stay on track</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.mealReminders}
              onChange={() => handleToggle('mealReminders')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h3>Progress Updates</h3>
            <p>Celebrate your achievements and milestones</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.progressUpdates}
              onChange={() => handleToggle('progressUpdates')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h3>Weekly Reports</h3>
            <p>Summary of your week's progress via email</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.weeklyReports}
              onChange={() => handleToggle('weeklyReports')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="reminder-times-section">
        <h3 className="section-title">Reminder Times</h3>
        <div className="time-pickers-grid">
          <div className="form-group">
            <label>Workout Reminder</label>
            <input
              type="time"
              value={notifications.workoutReminderTime}
              onChange={e => handleTimeChange('workoutReminderTime', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Meal Logging Reminder</label>
            <input
              type="time"
              value={notifications.mealReminderTime}
              onChange={e => handleTimeChange('mealReminderTime', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationsTab
