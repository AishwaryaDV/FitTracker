import { makeAutoObservable } from 'mobx'
import {
  mockTodayWorkout,
  mockWeeklyPlannedWorkouts,
  mockWeeklyCompletedWorkouts,
  mockPersonalRecords,
  mockWorkoutHistory,
  mockWorkoutStreak,
  mockAchievement,
} from './mockData/workoutsMockData'
import { activityLogStore } from './ActivityLogStore'
import { MdFitnessCenter } from 'react-icons/md'

export interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  weight?: number
  muscleGroup: string
}

export interface WorkoutSession {
  id: string
  date: string
  type: string
  duration: number
  exercises: Exercise[]
  completed: boolean
  notes?: string
}

export interface PersonalRecord {
  exercise: string
  change: number
  currentPR: string
  timeAgo: string
  date: string
}

export interface MuscleGroupStats {
  name: string
  sessions: number
  period: string
}

class WorkoutsStore {
  // Today's workout
  // TODO: When backend is ready, fetch from API endpoint: GET /api/workouts/today
  todayWorkout: WorkoutSession = mockTodayWorkout

  // Weekly planned vs completed
  // TODO: When backend is ready, fetch from API endpoint: GET /api/workouts/weekly-plan
  weeklyPlannedWorkouts = mockWeeklyPlannedWorkouts
  weeklyCompletedWorkouts = mockWeeklyCompletedWorkouts

  // Personal Records
  // TODO: When backend is ready, fetch from API endpoint: GET /api/personal-records
  personalRecords: PersonalRecord[] = mockPersonalRecords

  // Workout history (last 30 days)
  // TODO: When backend is ready, fetch from API endpoint: GET /api/workouts/history?days=30
  workoutHistory: WorkoutSession[] = mockWorkoutHistory

  // Streak tracking
  // TODO: When backend is ready, fetch from API endpoint: GET /api/streaks/workout
  workoutStreak = mockWorkoutStreak

  // Achievement tracking
  // TODO: When backend is ready, fetch from API endpoint: GET /api/achievements/latest
  achievement = mockAchievement

  constructor() {
    makeAutoObservable(this)
  }

  // Computed values
  get weeklyConsistency() {
    return {
      completed: this.weeklyCompletedWorkouts,
      planned: this.weeklyPlannedWorkouts,
    }
  }

  get topMuscleGroup(): MuscleGroupStats {
    // Calculate from workout history
    const muscleGroupCount: { [key: string]: number } = {}

    // Count from today's workout
    if (this.todayWorkout.completed) {
      this.todayWorkout.exercises.forEach(exercise => {
        muscleGroupCount[exercise.muscleGroup] = (muscleGroupCount[exercise.muscleGroup] || 0) + 1
      })
    }

    // Count from history
    this.workoutHistory.forEach(workout => {
      if (workout.completed) {
        workout.exercises.forEach(exercise => {
          muscleGroupCount[exercise.muscleGroup] =
            (muscleGroupCount[exercise.muscleGroup] || 0) + 1
        })
      }
    })

    // Find the most trained muscle group
    const topGroup = Object.entries(muscleGroupCount).reduce(
      (max, [muscle, count]) => (count > max.count ? { muscle, count } : max),
      { muscle: 'Chest', count: 0 }
    )

    return {
      name: topGroup.muscle,
      sessions: topGroup.count,
      period: 'This month',
    }
  }

  get averageStats() {
    const allExercises: Exercise[] = []

    if (this.todayWorkout.completed) {
      allExercises.push(...this.todayWorkout.exercises)
    }

    this.workoutHistory.forEach(workout => {
      if (workout.completed) {
        allExercises.push(...workout.exercises)
      }
    })

    if (allExercises.length === 0) {
      return { reps: 0, sets: 0 }
    }

    const totalReps = allExercises.reduce((sum, ex) => sum + ex.reps, 0)
    const totalSets = allExercises.reduce((sum, ex) => sum + ex.sets, 0)

    return {
      reps: Math.round(totalReps / allExercises.length),
      sets: Math.round((totalSets / allExercises.length) * 10) / 10, // One decimal place
    }
  }

  get lastWorkoutNote() {
    if (this.todayWorkout.notes) {
      return {
        text: this.todayWorkout.notes,
        date: 'Today',
        workoutType: this.todayWorkout.type,
      }
    }

    // Find most recent workout with notes
    const workoutWithNotes = [...this.workoutHistory]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .find(w => w.notes)

    if (workoutWithNotes && workoutWithNotes.notes) {
      const daysAgo = Math.floor(
        (new Date().getTime() - new Date(workoutWithNotes.date).getTime()) / (1000 * 60 * 60 * 24)
      )
      return {
        text: workoutWithNotes.notes,
        date: daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`,
        workoutType: workoutWithNotes.type,
      }
    }

    return null
  }

  get recentPRs() {
    // Get PRs from last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    return this.personalRecords.filter(pr => new Date(pr.date) >= thirtyDaysAgo)
  }

  get weeklySummary() {
    return {
      workoutsCompleted: this.weeklyCompletedWorkouts,
      personalRecords: this.recentPRs.length,
    }
  }

  // Actions
  // TODO: When backend is ready, call API: PUT /api/workouts/today/complete
  completeWorkout(workout: WorkoutSession) {
    this.todayWorkout = { ...workout, completed: true }
    // Log activity
    activityLogStore.addActivity({
      type: 'workout',
      title: `Completed ${workout.type} Workout`,
      subtitle: `${workout.duration} min • ${workout.exercises.length} exercise${workout.exercises.length > 1 ? 's' : ''}`,
      icon: <MdFitnessCenter />,
    })
    // TODO: await api.put('/api/workouts/today/complete', workout)
  }

  // TODO: When backend is ready, call API: POST /api/workouts/today/exercises
  addExercise(exercise: Exercise) {
    if (!this.todayWorkout.exercises) {
      this.todayWorkout.exercises = []
    }
    this.todayWorkout.exercises.push(exercise)
    // Log activity
    activityLogStore.addActivity({
      type: 'exercise',
      title: `Logged ${exercise.name}`,
      subtitle: `${exercise.sets} set${exercise.sets > 1 ? 's' : ''} • ${exercise.muscleGroup}`,
      icon: <MdFitnessCenter />,
    })
    // TODO: await api.post('/api/workouts/today/exercises', exercise)
  }

  // TODO: When backend is ready, call API: DELETE /api/workouts/today/exercises/{exerciseId}
  removeExercise(exerciseId: string) {
    this.todayWorkout.exercises = this.todayWorkout.exercises.filter(ex => ex.id !== exerciseId)
    // TODO: await api.delete(`/api/workouts/today/exercises/${exerciseId}`)
  }

  // TODO: When backend is ready, call API: PUT /api/workouts/today/notes
  updateWorkoutNotes(notes: string) {
    this.todayWorkout.notes = notes
    // TODO: await api.put('/api/workouts/today/notes', { notes })
  }

  // TODO: When backend is ready, call API: POST /api/personal-records
  addPersonalRecord(pr: PersonalRecord) {
    this.personalRecords.unshift(pr)
    // TODO: await api.post('/api/personal-records', pr)
  }

  incrementWeeklyCompleted() {
    if (this.weeklyCompletedWorkouts < this.weeklyPlannedWorkouts) {
      this.weeklyCompletedWorkouts++
      // TODO: await api.post('/api/workouts/weekly-completed/increment')
    }
  }

  // TODO: When backend is ready, call API: PUT /api/workouts/weekly-plan
  setWeeklyPlannedWorkouts(count: number) {
    this.weeklyPlannedWorkouts = count
    // TODO: await api.put('/api/workouts/weekly-plan', { count })
  }
}

// Create singleton instance
export const workoutsStore = new WorkoutsStore()
