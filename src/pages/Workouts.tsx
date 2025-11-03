import { useState, useEffect, useRef } from 'react'
import {
  MdFitnessCenter,
  MdFolderOpen,
  MdAccessTime,
  MdFitnessCenter as MdExercise,
  MdSearch,
  MdAdd,
} from 'react-icons/md'
import './Workouts.scss'

type WorkoutType = 'Push Day' | 'Pull Day' | 'Upper Body' | 'Lower Body' | 'Full Body' | 'Cardio' | 'Custom'

const Workouts = () => {
  const [isWorkoutActive, setIsWorkoutActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [workoutType, setWorkoutType] = useState<WorkoutType>('Custom')
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [totalVolume, setTotalVolume] = useState(0)
  const [exercisesCount, setExercisesCount] = useState(0)
  const [exerciseSearchQuery, setExerciseSearchQuery] = useState('')
  const [workoutNotes, setWorkoutNotes] = useState('')
  const timerRef = useRef<number | null>(null)

  const popularExercises = ['Bench Press', 'Squats', 'Deadlift', 'Overhead Press', 'Pull-ups']

  // Timer effect
  useEffect(() => {
    if (isWorkoutActive && !isPaused) {
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds(prev => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isWorkoutActive, isPaused])

  const handleStartWorkout = () => {
    setIsWorkoutActive(true)
    setIsPaused(false)
    setStartTime(new Date())
    setElapsedSeconds(0)
  }

  const handleResumeOrPause = () => {
    setIsPaused(!isPaused)
  }

  const handleFinishWorkout = () => {
    setIsWorkoutActive(false)
    setIsPaused(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    // Reset for next workout
    setElapsedSeconds(0)
    setStartTime(null)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  }

  const formatElapsedTime = (seconds: number) => {
    return Math.floor(seconds / 60)
  }

  const handleTemplates = () => {
    console.log('Templates clicked')
  }

  const handleSaveTemplate = () => {
    console.log('Save Template clicked')
  }

  const handleAddExercise = () => {
    console.log('Add exercise:', exerciseSearchQuery)
    // TODO: Implement exercise search and add functionality
  }

  const handlePopularExerciseClick = (exercise: string) => {
    console.log('Add popular exercise:', exercise)
    // TODO: Implement adding popular exercise
  }

  const handleSaveNotes = () => {
    console.log('Save notes:', workoutNotes)
    // TODO: Implement save workout notes functionality
  }

  return (
    <div className="page workouts-page">
      <div className="workouts-header">
        <div className="header-content">
          <div className="header-title-wrapper">
            <div className="icon-wrapper">
              <MdFitnessCenter className="page-icon" />
            </div>
            <h1>Workout Tracker</h1>

            <div className="header-actions">
              <button className="action-btn templates-btn" onClick={handleTemplates}>
                <MdFolderOpen className="btn-icon" />
                Templates
              </button>
              <button className="action-btn save-template-btn" onClick={handleSaveTemplate}>
                Save Template
              </button>

              {!isWorkoutActive ? (
                <button className="action-btn start-btn" onClick={handleStartWorkout}>
                  Start Workout
                </button>
              ) : (
                <>
                  <button className="action-btn resume-pause-btn" onClick={handleResumeOrPause}>
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                  <button className="action-btn finish-btn" onClick={handleFinishWorkout}>
                    Finish Workout
                  </button>
                </>
              )}
            </div>
          </div>
          <p>Log your exercises and track your progress</p>
        </div>
      </div>

      {/* Workout Overview */}
      <div className="workout-overview">
        <div className="overview-header">
          <h2>Today's Workout</h2>
          <div className="workout-type-selector">
            <span className="workout-type-label-text">Workout Type</span>
            <select
              className="workout-type-dropdown"
              value={workoutType}
              onChange={(e) => setWorkoutType(e.target.value as WorkoutType)}
            >
              <option value="Push Day">Push Day</option>
              <option value="Pull Day">Pull Day</option>
              <option value="Upper Body">Upper Body</option>
              <option value="Lower Body">Lower Body</option>
              <option value="Full Body">Full Body</option>
              <option value="Cardio">Cardio</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        </div>

        <div className="overview-stats">
          <div className="stat-item">
            <div className="stat-value">{formatElapsedTime(elapsedSeconds)}</div>
            <div className="stat-label">
              <MdAccessTime className="stat-icon" />
              Minutes
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-value">{totalVolume.toLocaleString()}</div>
            <div className="stat-label">kg Total Volume</div>
          </div>

          <div className="stat-item">
            <div className="stat-value">{exercisesCount}</div>
            <div className="stat-label">
              <MdExercise className="stat-icon" />
              Exercises
            </div>
          </div>
        </div>
      </div>

      {/* Add Exercise Section */}
      <div className="add-exercise-container">
        <div className="add-exercise-header">
          <h3>Add Exercise</h3>
        </div>

        <div className="exercise-search">
          <div className="search-input-wrapper">
            <MdSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search exercises..."
              value={exerciseSearchQuery}
              onChange={(e) => setExerciseSearchQuery(e.target.value)}
              className="exercise-search-input"
            />
          </div>
          <button className="add-exercise-btn" onClick={handleAddExercise}>
            <MdAdd className="btn-icon" />
            Add
          </button>
        </div>

        <div className="popular-exercises">
          <h4>Popular Exercises</h4>
          <div className="exercise-pills">
            {popularExercises.map((exercise) => (
              <button
                key={exercise}
                className="exercise-pill"
                onClick={() => handlePopularExerciseClick(exercise)}
              >
                {exercise}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Workout Notes Section */}
      <div className="workout-notes-container">
        <div className="notes-header">
          <h3>Workout Notes</h3>
          <p className="notes-subtitle">How did you feel? Any observations?</p>
        </div>

        <div className="notes-content">
          <textarea
            className="notes-textarea"
            placeholder="Great energy today, felt strong on bench press..."
            value={workoutNotes}
            onChange={(e) => setWorkoutNotes(e.target.value)}
            rows={4}
          />
          <button className="save-notes-btn" onClick={handleSaveNotes}>
            Save
          </button>
        </div>
      </div>

      {/* TODO: Exercise list will go here */}
    </div>
  )
}

export default Workouts
