import { useState } from 'react'
import { MdFitnessCenter, MdFolderOpen } from 'react-icons/md'
import './Workouts.scss'

const Workouts = () => {
  const [isWorkoutActive, setIsWorkoutActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const handleStartWorkout = () => {
    setIsWorkoutActive(true)
    setIsPaused(false)
  }

  const handleResumeOrPause = () => {
    setIsPaused(!isPaused)
  }

  const handleFinishWorkout = () => {
    setIsWorkoutActive(false)
    setIsPaused(false)
  }

  const handleTemplates = () => {
    console.log('Templates clicked')
  }

  const handleSaveTemplate = () => {
    console.log('Save Template clicked')
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

      {/* Workout content will go here */}
      <div className="workouts-content">
        <p>Workout content coming soon...</p>
      </div>
    </div>
  )
}

export default Workouts
