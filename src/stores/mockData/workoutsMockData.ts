import type { WorkoutSession, PersonalRecord } from '../WorkoutsStore'

export const mockTodayWorkout: WorkoutSession = {
  id: 'w1',
  date: new Date().toISOString().split('T')[0],
  type: 'Push Day',
  duration: 45,
  completed: true,
  exercises: [
    { id: 'e1', name: 'Bench Press', sets: 4, reps: 8, weight: 72.5, muscleGroup: 'Chest' },
    {
      id: 'e2',
      name: 'Incline Dumbbell Press',
      sets: 3,
      reps: 10,
      weight: 25,
      muscleGroup: 'Chest',
    },
    { id: 'e3', name: 'Shoulder Press', sets: 3, reps: 10, weight: 20, muscleGroup: 'Shoulders' },
    { id: 'e4', name: 'Tricep Dips', sets: 3, reps: 12, muscleGroup: 'Triceps' },
  ],
  notes:
    'Felt strong today! Hit a new PR on bench press. Energy levels were high throughout the session. 💪',
}

export const mockWeeklyPlannedWorkouts = 6
export const mockWeeklyCompletedWorkouts = 5

export const mockPersonalRecords: PersonalRecord[] = [
  {
    exercise: 'Bench Press',
    change: 2.5,
    currentPR: '72.5 kg',
    timeAgo: '2 days ago',
    date: '2024-11-29',
  },
  {
    exercise: 'Squat',
    change: 5,
    currentPR: '92.5 kg',
    timeAgo: '5 days ago',
    date: '2024-11-26',
  },
  {
    exercise: 'Deadlift',
    change: 5,
    currentPR: '125 kg',
    timeAgo: '1 week ago',
    date: '2024-11-24',
  },
]

export const mockWorkoutHistory: WorkoutSession[] = [
  {
    id: 'w2',
    date: '2024-11-30',
    type: 'Leg Day',
    duration: 60,
    completed: true,
    exercises: [
      { id: 'e5', name: 'Squat', sets: 4, reps: 8, weight: 92.5, muscleGroup: 'Legs' },
      { id: 'e6', name: 'Leg Press', sets: 3, reps: 12, weight: 120, muscleGroup: 'Legs' },
    ],
  },
  {
    id: 'w3',
    date: '2024-11-29',
    type: 'Push Day',
    duration: 45,
    completed: true,
    exercises: [
      { id: 'e7', name: 'Bench Press', sets: 4, reps: 8, weight: 70, muscleGroup: 'Chest' },
    ],
    notes: 'Good session, felt pumped!',
  },
]

export const mockWorkoutStreak = 12

export const mockAchievement = {
  title: "You've improved your bench press by 8% this month!",
  icon: '🎉',
}
