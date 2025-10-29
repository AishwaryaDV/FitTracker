import { useState } from 'react'

// Mock data for notifications
const mockNotifications = {
  workoutReminders: true,
  mealReminders: true,
  goalAchievements: true,
  weeklyReports: false,
  emailNotifications: true,
  pushNotifications: true,
}

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState(mockNotifications)

  const handleToggle = (field: string) => {
    setNotifications({
      ...notifications,
      [field]: !notifications[field as keyof typeof notifications],
    })
  }

  return (
    <div className="notifications-tab">
      <h2 className="tab-title">Notification Preferences</h2>
      <p className="tab-subtitle">Choose what notifications you want to receive</p>

      <div className="notification-list">
        <div className="notification-item">
          <div className="notification-info">
            <h3>Workout Reminders</h3>
            <p>Get reminded about your scheduled workout sessions</p>
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
            <h3>Meal Reminders</h3>
            <p>Receive reminders to log your meals</p>
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
            <h3>Goal Achievements</h3>
            <p>Celebrate when you reach your fitness goals</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.goalAchievements}
              onChange={() => handleToggle('goalAchievements')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h3>Weekly Reports</h3>
            <p>Get a summary of your weekly progress</p>
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

        <div className="notification-item">
          <div className="notification-info">
            <h3>Email Notifications</h3>
            <p>Receive notifications via email</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h3>Push Notifications</h3>
            <p>Get real-time push notifications</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.pushNotifications}
              onChange={() => handleToggle('pushNotifications')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default NotificationsTab
