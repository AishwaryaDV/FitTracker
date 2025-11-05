import { useState, useEffect, useRef } from 'react'
import {
  MdFitnessCenter,
  MdFolderOpen,
  MdAccessTime,
  MdFitnessCenter as MdExercise,
  MdSearch,
  MdAdd,
  MdDelete,
} from 'react-icons/md'
import './Workouts.scss'

type WorkoutType = 'Push Day' | 'Pull Day' | 'Upper Body' | 'Lower Body' | 'Full Body' | 'Cardio' | 'Custom'

type SetType = 'Warmup' | 'Working' | 'Drop' | 'Failure'

interface ExerciseSet {
  id: string
  setNumber: number
  type: SetType
  weight: number
  reps: number
  rpe: number
  status: 'pending' | 'completed'
}

interface Exercise {
  id: string
  name: string
  sets: ExerciseSet[]
}

interface WorkoutTemplate {
  id: string
  name: string
  description?: string
  exercises: string[]
  isDefault: boolean
}

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
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [templateName, setTemplateName] = useState('')
  const [customTemplates, setCustomTemplates] = useState<WorkoutTemplate[]>([])
  const [isLoadedFromTemplate, setIsLoadedFromTemplate] = useState(false)
  const [loadedTemplateId, setLoadedTemplateId] = useState<string | null>(null)
  const [showTemplates, setShowTemplates] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const timerRef = useRef<number | null>(null)

  const popularExercises = ['Bench Press', 'Squats', 'Deadlift', 'Overhead Press', 'Pull-ups']

  const defaultTemplates: WorkoutTemplate[] = [
    {
      id: 'default-biceps-1',
      name: 'Biceps Blast',
      description: 'Focused bicep workout for maximum pump',
      exercises: ['Barbell Curl', 'Hammer Curl', 'Preacher Curl', 'Cable Curl', 'Concentration Curl'],
      isDefault: true,
    },
    {
      id: 'default-back-1',
      name: 'Back Attack',
      description: 'Complete back development workout',
      exercises: ['Deadlift', 'Pull-ups', 'Bent Over Row', 'Lat Pulldown', 'Seated Cable Row', 'Face Pulls'],
      isDefault: true,
    },
    {
      id: 'default-glutes-1',
      name: 'Glute Builder',
      description: 'Target glutes for strength and shape',
      exercises: ['Hip Thrust', 'Bulgarian Split Squat', 'Romanian Deadlift', 'Glute Kickback', 'Cable Pull Through', 'Walking Lunges'],
      isDefault: true,
    },
    {
      id: 'default-core-1',
      name: 'Core Crusher',
      description: 'Comprehensive core strengthening routine',
      exercises: ['Plank', 'Russian Twist', 'Bicycle Crunch', 'Leg Raises', 'Mountain Climbers', 'Ab Wheel Rollout'],
      isDefault: true,
    },
    {
      id: 'default-biceps-2',
      name: 'Biceps Blast',
      description: 'Focused bicep workout for maximum pump',
      exercises: ['Barbell Curl', 'Hammer Curl', 'Preacher Curl', 'Cable Curl', 'Concentration Curl'],
      isDefault: true,
    },
    {
      id: 'default-back-2',
      name: 'Back Attack',
      description: 'Complete back development workout',
      exercises: ['Deadlift', 'Pull-ups', 'Bent Over Row', 'Lat Pulldown', 'Seated Cable Row', 'Face Pulls'],
      isDefault: true,
    },
    {
      id: 'default-glutes-2',
      name: 'Glute Builder',
      description: 'Target glutes for strength and shape',
      exercises: ['Hip Thrust', 'Bulgarian Split Squat', 'Romanian Deadlift', 'Glute Kickback', 'Cable Pull Through', 'Walking Lunges'],
      isDefault: true,
    },
    {
      id: 'default-core-2',
      name: 'Core Crusher',
      description: 'Comprehensive core strengthening routine',
      exercises: ['Plank', 'Russian Twist', 'Bicycle Crunch', 'Leg Raises', 'Mountain Climbers', 'Ab Wheel Rollout'],
      isDefault: true,
    },
  ]

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
    setShowTemplates(!showTemplates)
  }

  const handleLoadTemplate = (template: WorkoutTemplate) => {
    // Clear existing exercises
    setExercises([])
    setExercisesCount(0)

    // Add exercises from template
    const newExercises: Exercise[] = template.exercises.map((exerciseName, index) => ({
      id: `exercise-${Date.now()}-${index}`,
      name: exerciseName,
      sets: [],
    }))

    setExercises(newExercises)
    setExercisesCount(template.exercises.length)
    setIsLoadedFromTemplate(template.isDefault)
    setLoadedTemplateId(template.id)
    setTemplateName(template.name)
    setHasUnsavedChanges(false)

    // Hide templates view and show workout content
    setShowTemplates(false)
  }

  const showToastNotification = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  const handleSaveTemplate = () => {
    const name = templateName.trim() || workoutType
    const exerciseNames = exercises.map(ex => ex.name)

    const newTemplate: WorkoutTemplate = {
      id: `custom-${Date.now()}`,
      name,
      exercises: exerciseNames,
      isDefault: false,
    }

    setCustomTemplates(prev => [...prev, newTemplate])
    setHasUnsavedChanges(false)
    showToastNotification(`Template "${name}" saved successfully!`)
    console.log('Template saved:', newTemplate)
    // TODO: Persist to localStorage or backend
  }

  const handleDeleteCustomTemplate = (templateId: string) => {
    const deletedTemplate = customTemplates.find(t => t.id === templateId)
    setCustomTemplates(prev => prev.filter(t => t.id !== templateId))
    if (deletedTemplate) {
      showToastNotification(`Template "${deletedTemplate.name}" deleted successfully!`)
    }
  }

  const addExercise = (exerciseName: string) => {
    const newExercise: Exercise = {
      id: `exercise-${Date.now()}-${Math.random()}`,
      name: exerciseName,
      sets: [],
    }
    setExercises(prev => [...prev, newExercise])
    setExercisesCount(prev => prev + 1)
    setHasUnsavedChanges(true)
    // Reset template tracking when manually adding exercises
    if (isLoadedFromTemplate) {
      setIsLoadedFromTemplate(false)
      setLoadedTemplateId(null)
    }
  }

  const handleAddExercise = () => {
    if (exerciseSearchQuery.trim()) {
      addExercise(exerciseSearchQuery.trim())
      setExerciseSearchQuery('')
    }
  }

  const handlePopularExerciseClick = (exercise: string) => {
    addExercise(exercise)
  }

  const handleDeleteExercise = (exerciseId: string) => {
    // Prevent deleting exercises from default templates
    if (isLoadedFromTemplate) {
      return
    }
    setExercises(prev => prev.filter(ex => ex.id !== exerciseId))
    setExercisesCount(prev => Math.max(0, prev - 1))
    setHasUnsavedChanges(true)
  }

  const handleAddSet = (exerciseId: string) => {
    setExercises(prev =>
      prev.map(exercise => {
        if (exercise.id === exerciseId) {
          const newSet: ExerciseSet = {
            id: `set-${Date.now()}-${Math.random()}`,
            setNumber: exercise.sets.length + 1,
            type: 'Working',
            weight: 0,
            reps: 0,
            rpe: 0,
            status: 'pending',
          }
          return { ...exercise, sets: [...exercise.sets, newSet] }
        }
        return exercise
      })
    )
  }

  const handleDeleteSet = (exerciseId: string, setId: string) => {
    setExercises(prev =>
      prev.map(exercise => {
        if (exercise.id === exerciseId) {
          const updatedSets = exercise.sets
            .filter(set => set.id !== setId)
            .map((set, index) => ({ ...set, setNumber: index + 1 }))
          return { ...exercise, sets: updatedSets }
        }
        return exercise
      })
    )
  }

  const handleSetChange = (
    exerciseId: string,
    setId: string,
    field: keyof ExerciseSet,
    value: string | number
  ) => {
    setExercises(prev =>
      prev.map(exercise => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.map(set => {
              if (set.id === setId) {
                return { ...set, [field]: value }
              }
              return set
            }),
          }
        }
        return exercise
      })
    )
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
              <button
                className="action-btn save-template-btn"
                onClick={handleSaveTemplate}
                disabled={exercises.length === 0 || isLoadedFromTemplate || !hasUnsavedChanges}
              >
                Save Template
              </button>

              {!isWorkoutActive ? (
                <button
                  className="action-btn start-btn"
                  onClick={handleStartWorkout}
                  disabled={showTemplates}
                >
                  Start Workout
                </button>
              ) : (
                <>
                  <button
                    className="action-btn resume-pause-btn"
                    onClick={handleResumeOrPause}
                    disabled={showTemplates}
                  >
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                  <button
                    className="action-btn finish-btn"
                    onClick={handleFinishWorkout}
                    disabled={showTemplates}
                  >
                    Finish Workout
                  </button>
                </>
              )}
            </div>
          </div>
          <p>Log your exercises and track your progress</p>
        </div>
      </div>

      {/* Templates Section */}
      {showTemplates ? (
        <div className="templates-section">
          <div className="templates-header">
            <h2>Workout Templates</h2>
            <p>Choose a template to get started quickly</p>
          </div>

          <div className="templates-grid">
            {/* Default Templates */}
            {defaultTemplates.map(template => (
              <div
                key={template.id}
                className="template-card"
                onClick={() => handleLoadTemplate(template)}
              >
                <div className="template-card-header">
                  <h3>{template.name}</h3>
                  <span className="template-badge default">Default</span>
                </div>
                <p className="template-description">{template.description}</p>
                <div className="template-meta">
                  <span className="exercise-count">{template.exercises.length} exercises</span>
                </div>
              </div>
            ))}

            {/* Custom Templates */}
            {customTemplates.map(template => (
              <div key={template.id} className="template-card custom">
                <div className="template-card-header">
                  <h3>{template.name}</h3>
                  <button
                    className="delete-template-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteCustomTemplate(template.id)
                    }}
                  >
                    <MdDelete />
                  </button>
                </div>
                <div className="template-meta">
                  <span className="exercise-count">{template.exercises.length} exercises</span>
                </div>
                <button
                  className="load-template-btn"
                  onClick={() => handleLoadTemplate(template)}
                >
                  Load Template
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
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
              disabled={isLoadedFromTemplate}
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

          {exercises.length > 0 && (
            <div className="template-name-input-wrapper">
              <span className="template-name-label">Template Name</span>
              <input
                type="text"
                className="template-name-input"
                placeholder={`e.g., My ${workoutType}, Morning Routine...`}
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </div>
          )}
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

      {/* Exercise Tracker Section */}
      {exercises.map(exercise => (
        <div key={exercise.id} className="exercise-tracker-container">
          <div className="exercise-header">
            <h3>{exercise.name}</h3>
            {!isLoadedFromTemplate && (
              <button
                className="delete-exercise-btn"
                onClick={() => handleDeleteExercise(exercise.id)}
              >
                <MdDelete className="delete-icon" />
                Delete Exercise
              </button>
            )}
          </div>

          {exercise.sets.length > 0 && (
            <div className="sets-table-wrapper">
              <table className="sets-table">
                <thead>
                  <tr>
                    <th>Set</th>
                    <th>Type</th>
                    <th>Weight (kg)</th>
                    <th>Reps</th>
                    <th>RPE</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exercise.sets.map(set => (
                    <tr key={set.id}>
                      <td>{set.setNumber}</td>
                      <td>
                        <select
                          value={set.type}
                          onChange={(e) =>
                            handleSetChange(exercise.id, set.id, 'type', e.target.value as SetType)
                          }
                          disabled={!isWorkoutActive}
                          className="set-input"
                        >
                          <option value="Warmup">Warmup</option>
                          <option value="Working">Working</option>
                          <option value="Drop">Drop</option>
                          <option value="Failure">Failure</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          value={set.weight || ''}
                          onChange={(e) =>
                            handleSetChange(exercise.id, set.id, 'weight', parseFloat(e.target.value) || 0)
                          }
                          disabled={!isWorkoutActive}
                          className="set-input"
                          placeholder="0"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={set.reps || ''}
                          onChange={(e) =>
                            handleSetChange(exercise.id, set.id, 'reps', parseInt(e.target.value) || 0)
                          }
                          disabled={!isWorkoutActive}
                          className="set-input"
                          placeholder="0"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={set.rpe || ''}
                          onChange={(e) =>
                            handleSetChange(exercise.id, set.id, 'rpe', parseInt(e.target.value) || 0)
                          }
                          disabled={!isWorkoutActive}
                          className="set-input"
                          placeholder="0"
                          min="0"
                          max="10"
                        />
                      </td>
                      <td>
                        <select
                          value={set.status}
                          onChange={(e) =>
                            handleSetChange(exercise.id, set.id, 'status', e.target.value)
                          }
                          disabled={!isWorkoutActive}
                          className="set-input status-select"
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="delete-set-btn"
                          onClick={() => handleDeleteSet(exercise.id, set.id)}
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button className="add-set-btn" onClick={() => handleAddSet(exercise.id)}>
            <MdAdd className="btn-icon" />
            Add Set
          </button>
        </div>
      ))}

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
        </>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          <div className="toast-content">
            <span className="toast-message">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Workouts
