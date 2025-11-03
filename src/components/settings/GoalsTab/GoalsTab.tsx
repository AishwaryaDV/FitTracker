import { observer } from 'mobx-react-lite'
import { userStore } from '../../../stores/UserStore'
import { MdTrackChanges } from 'react-icons/md'
import './GoalsTab.scss'

const GoalsTab = observer(() => {
  const handleInputChange = (field: string, value: string | number) => {
    userStore.updateGoals(field as keyof typeof userStore.goals, value)
  }

  return (
    <div className="goals-tab">
      <div className="section-header">
        <MdTrackChanges className="section-icon" />
        <h2 className="tab-title">Fitness Goals</h2>
      </div>
      <p className="tab-subtitle">Set your targets and let us help you achieve them</p>

      <div className="form-grid">
        <div className="form-group">
          <label>Primary Goal</label>
          <select
            value={userStore.goals.primaryGoal}
            onChange={e => handleInputChange('primaryGoal', e.target.value)}
          >
            <option value="muscle-gain">Muscle Gain</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="maintenance">Maintenance</option>
            <option value="strength-building">Strength Building</option>
            <option value="endurance">Endurance</option>
          </select>
        </div>

        <div className="form-group">
          <label>Target Weight (kg)</label>
          <input
            type="number"
            value={userStore.goals.targetWeight}
            onChange={e => handleInputChange('targetWeight', parseInt(e.target.value))}
            placeholder="Enter target weight"
          />
        </div>

        <div className="form-group">
          <label>Weekly Weight Change (kg)</label>
          <select
            value={userStore.goals.weeklyWeightChange}
            onChange={e => handleInputChange('weeklyWeightChange', e.target.value)}
          >
            <option value="+0.5">+0.5kg (Moderate Gain)</option>
            <option value="+0.25">+0.25kg (Slow Gain)</option>
            <option value="+0.75">+0.75kg (Fast Gain)</option>
            <option value="0">0kg (Maintenance)</option>
            <option value="-0.25">-0.25kg (Slow Loss)</option>
            <option value="-0.5">-0.5kg (Moderate Loss)</option>
            <option value="-0.75">-0.75kg (Fast Loss)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Daily Calorie Gap</label>
          <input
            type="number"
            value={userStore.goals.dailyCalorieGap}
            onChange={e => handleInputChange('dailyCalorieGap', parseInt(e.target.value))}
            placeholder="Calorie surplus/deficit"
          />
        </div>

        <div className="form-group">
          <label>Workouts per Week</label>
          <select
            value={userStore.goals.workoutsPerWeek}
            onChange={e => handleInputChange('workoutsPerWeek', e.target.value)}
          >
            <option value="1">1 workout/week</option>
            <option value="2">2 workouts/week</option>
            <option value="3">3 workouts/week</option>
            <option value="4">4 workouts/week</option>
            <option value="5">5 workouts/week</option>
            <option value="6">6 workouts/week</option>
            <option value="7">7 workouts/week</option>
          </select>
        </div>

        <div className="form-group">
          <label>Target Daily Calories</label>
          <input
            type="number"
            value={userStore.goals.targetDailyCalories}
            onChange={e => handleInputChange('targetDailyCalories', parseInt(e.target.value))}
            placeholder="Your calorie goal per day"
          />
        </div>

        <div className="form-group">
          <label>Target Time Frame (weeks)</label>
          <input
            type="number"
            value={userStore.goals.targetTimeFrame}
            onChange={e => handleInputChange('targetTimeFrame', parseInt(e.target.value))}
            placeholder="How many weeks to reach goal"
          />
        </div>
      </div>

      <div className="macro-section">
        <h3 className="section-title">Macronutrient Goals</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Protein (g)</label>
            <input
              type="number"
              value={userStore.goals.protein}
              onChange={e => handleInputChange('protein', parseInt(e.target.value))}
              placeholder="Daily protein goal"
            />
          </div>

          <div className="form-group">
            <label>Carbs (g)</label>
            <input
              type="number"
              value={userStore.goals.carbs}
              onChange={e => handleInputChange('carbs', parseInt(e.target.value))}
              placeholder="Daily carbs goal"
            />
          </div>

          <div className="form-group">
            <label>Fat (g)</label>
            <input
              type="number"
              value={userStore.goals.fat}
              onChange={e => handleInputChange('fat', parseInt(e.target.value))}
              placeholder="Daily fat goal"
            />
          </div>

          <div className="form-group">
            <label>Water (cups)</label>
            <input
              type="number"
              value={userStore.goals.water}
              onChange={e => handleInputChange('water', parseInt(e.target.value))}
              placeholder="Daily water intake"
            />
          </div>
        </div>
      </div>

      <div className="recommendations-section">
        <h3 className="section-title">Calculated Recommendations</h3>
        <p className="recommendations-subtitle">
          Based on your profile (age, height, weight, gender, activity level) and goals
        </p>
        <div className="recommendations-grid">
          <div className="recommendation-item">
            <span className="recommendation-title">BMR</span>
            <span className="recommendation-value">
              {Math.round(userStore.bmr).toLocaleString()} cal/day
            </span>
            <span className="recommendation-description">Basal Metabolic Rate</span>
          </div>
          <div className="recommendation-item">
            <span className="recommendation-title">TDEE</span>
            <span className="recommendation-value">{userStore.tdee.toLocaleString()} cal/day</span>
            <span className="recommendation-description">Total Daily Energy</span>
          </div>
          <div className="recommendation-item">
            <span className="recommendation-title">Recommended Calories</span>
            <span className="recommendation-value">
              {userStore.recommendedCalories.toLocaleString()} cal/day
            </span>
            <span className="recommendation-description">To meet your goal</span>
          </div>
          <div className="recommendation-item">
            <span className="recommendation-title">Time to Goal</span>
            <span className="recommendation-value">{userStore.formattedTimeToGoal}</span>
            <span className="recommendation-description">Estimated timeline</span>
          </div>
        </div>
      </div>
    </div>
  )
})

export default GoalsTab
