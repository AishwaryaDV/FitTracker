import { makeAutoObservable } from 'mobx'
import type { IconType } from 'react-icons'
import { mockActivityLog } from './mockData/activityLogMockData'

export interface ActivityLogEntry {
  id: string
  type: 'workout' | 'meal' | 'weight' | 'water' | 'exercise'
  title: string
  subtitle?: string
  timestamp: Date
  icon: IconType
}

class ActivityLogStore {
  // Recent activities (last 20)
  // TODO: When backend is ready, fetch from API endpoint: GET /api/activity-log
  activities: ActivityLogEntry[] = mockActivityLog

  constructor() {
    makeAutoObservable(this, {
      activities: true,
    })
  }

  // Add a new activity to the log
  addActivity(activity: Omit<ActivityLogEntry, 'id' | 'timestamp'>) {
    const newActivity: ActivityLogEntry = {
      ...activity,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
    }

    // Add to beginning of array (most recent first)
    this.activities.unshift(newActivity)

    // Keep only last 20 activities
    if (this.activities.length > 20) {
      this.activities = this.activities.slice(0, 20)
    }
  }

  // Get activities sorted by time
  get sortedActivities() {
    return [...this.activities].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  // Get time ago string
  getTimeAgo(timestamp: Date): string {
    const now = new Date()
    const diffMs = now.getTime() - timestamp.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return timestamp.toLocaleDateString()
  }

  // Clear all activities
  clearActivities() {
    this.activities = []
  }
}

// Create singleton instance
export const activityLogStore = new ActivityLogStore()
