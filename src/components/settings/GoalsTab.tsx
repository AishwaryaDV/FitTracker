import { useState } from 'react'

// Mock data for goals
const mockGoals = {
  targetWeight: 70,
  weeklyWorkouts: 4,
  dailyCalories: 2000,
  dailyWaterIntake: 8,
  goalType: 'weight-loss',
}

const GoalsTab = () => {
  const [goals, setGoals] = useState(mockGoals)

  const handleInputChange = (field: string, value: string | number) => {
    setGoals({ ...goals, [field]: value })
  }

  return (
    <div className="goals-tab">
      <h2 className="tab-title">Fitness Goals</h2>
      <p className="tab-subtitle">Set and track your fitness objectives</p>

      <div className="form-grid">
        <div className="form-group">
          <label>Goal Type</label>
          <select
            value={goals.goalType}
            onChange={e => handleInputChange('goalType', e.target.value)}
          >
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
            <option value="endurance">Build Endurance</option>
          </select>
        </div>

        <div className="form-group">
          <label>Target Weight (kg)</label>
          <input
            type="number"
            value={goals.targetWeight}
            onChange={e => handleInputChange('targetWeight', parseInt(e.target.value))}
            placeholder="Enter target weight"
          />
        </div>

        <div className="form-group">
          <label>Weekly Workout Sessions</label>
          <input
            type="number"
            value={goals.weeklyWorkouts}
            onChange={e => handleInputChange('weeklyWorkouts', parseInt(e.target.value))}
            placeholder="Number of workouts per week"
          />
        </div>

        <div className="form-group">
          <label>Daily Calorie Target</label>
          <input
            type="number"
            value={goals.dailyCalories}
            onChange={e => handleInputChange('dailyCalories', parseInt(e.target.value))}
            placeholder="Daily calorie goal"
          />
        </div>

        <div className="form-group">
          <label>Daily Water Intake (glasses)</label>
          <input
            type="number"
            value={goals.dailyWaterIntake}
            onChange={e => handleInputChange('dailyWaterIntake', parseInt(e.target.value))}
            placeholder="Number of glasses"
          />
        </div>
      </div>
    </div>
  )
}

export default GoalsTab
