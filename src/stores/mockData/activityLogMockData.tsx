import type { ActivityLogEntry } from '../ActivityLogStore'
import { MdFitnessCenter, MdRestaurant, MdMonitorWeight } from 'react-icons/md'

// Mock activity log entries with realistic timestamps
const now = new Date()
const hoursAgo = (hours: number) => new Date(now.getTime() - hours * 60 * 60 * 1000)
const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

export const mockActivityLog: ActivityLogEntry[] = [
  {
    id: '1',
    type: 'exercise',
    title: 'Logged Bench Press',
    subtitle: '3 sets • Chest',
    timestamp: hoursAgo(2),
    icon: MdFitnessCenter,
  },
  {
    id: '2',
    type: 'meal',
    title: 'Added Paneer Wrap',
    subtitle: '350 kcal • Lunch',
    timestamp: hoursAgo(3),
    icon: MdRestaurant,
  },
  {
    id: '3',
    type: 'weight',
    title: 'Updated weight to 63 kg',
    timestamp: daysAgo(1),
    icon: MdMonitorWeight,
  },
  {
    id: '4',
    type: 'workout',
    title: 'Completed Push Day Workout',
    subtitle: '45 min • 6 exercises',
    timestamp: daysAgo(1),
    icon: MdFitnessCenter,
  },
  {
    id: '5',
    type: 'meal',
    title: 'Added Oatmeal with berries',
    subtitle: '420 kcal • Breakfast',
    timestamp: new Date(),
    icon: MdRestaurant,
  },
]
