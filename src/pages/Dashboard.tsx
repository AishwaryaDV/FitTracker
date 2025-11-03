import { observer } from 'mobx-react-lite'
import {
  MdWavingHand,
  MdCalendarToday,
  MdRestaurant,
  MdFitnessCenter,
  MdMonitorWeight,
  MdLocalFireDepartment,
  MdTimeline,
  MdEmojiEvents,
  MdTrendingUp,
  MdDonutLarge,
  MdBarChart,
  MdStickyNote2,
  MdSentimentVeryDissatisfied,
  MdSentimentNeutral,
  MdSentimentSatisfied,
  MdSentimentVerySatisfied,
  MdMood,
} from 'react-icons/md'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts'
import { caloriesStore } from '../stores/CaloriesStore'
import { workoutsStore } from '../stores/WorkoutsStore'
import { activityLogStore } from '../stores/ActivityLogStore'
import './Dashboard.scss'

const Dashboard = observer(() => {
  // TODO: Replace with actual user data from UserStore/signup details when implemented
  const userName = 'Aishwarya' // This should come from user authentication/signup data

  // Get data from CaloriesStore
  const caloriesConsumed = caloriesStore.consumed.calories
  const caloriesGoal = caloriesStore.goals.calories
  const caloriesLeft = caloriesStore.caloriesLeft

  // Nutrition data from CaloriesStore
  const nutritionData = {
    dailyGoals: {
      calories: caloriesStore.goals.calories,
      protein: caloriesStore.goals.protein,
      carbs: caloriesStore.goals.carbs,
      fats: caloriesStore.goals.fat,
    },
    consumed: {
      calories: caloriesStore.consumed.calories,
      protein: caloriesStore.consumed.protein,
      carbs: caloriesStore.consumed.carbs,
      fats: caloriesStore.consumed.fat,
    },
    meals: caloriesStore.meals.map(meal => ({
      name: meal.name,
      calories: caloriesStore.getMealCalories(meal.name),
    })),
    weeklyData: caloriesStore.weeklyCalorieData,
  }

  // Check if we have nutrition data
  const hasNutritionData = nutritionData && nutritionData.consumed

  // Get data from WorkoutsStore
  const workoutData = {
    todayWorkout: {
      completed: workoutsStore.todayWorkout.completed,
      duration: workoutsStore.todayWorkout.duration,
      type: workoutsStore.todayWorkout.type,
    },
    weeklyConsistency: workoutsStore.weeklyConsistency,
    topMuscleGroup: workoutsStore.topMuscleGroup,
    averageStats: workoutsStore.averageStats,
  }

  // Check if we have workout data
  const hasWorkoutData = workoutData && workoutData.todayWorkout

  // Goals and Progress data - from combined stores
  const goalsProgressData = {
    weightGoal: {
      current: 63,
      goal: 58,
      unit: 'kg',
    },
    weeklySummary: {
      avgCalories: caloriesStore.averageWeeklyCalories,
      workoutsCompleted: workoutsStore.weeklySummary.workoutsCompleted,
      personalRecords: workoutsStore.weeklySummary.personalRecords,
      weightChange: -0.8,
    },
    achievement: workoutsStore.achievement,
    streaks: {
      workout: workoutsStore.workoutStreak,
      foodLogging: caloriesStore.foodLoggingStreak,
      waterGoal: 7, // TODO: Add water streak tracking to CaloriesStore
    },
    lastWorkoutNote: workoutsStore.lastWorkoutNote,
  }

  // Check if we have goals and progress data
  const hasGoalsData = goalsProgressData && goalsProgressData.weightGoal
  const hasStreaksData = goalsProgressData && goalsProgressData.streaks
  const hasAchievement = goalsProgressData && goalsProgressData.achievement
  const hasLastNote = goalsProgressData && goalsProgressData.lastWorkoutNote

  // Calculate weight progress
  const weightProgress =
    hasGoalsData && goalsProgressData.weightGoal.goal > 0
      ? Math.round(
          ((goalsProgressData.weightGoal.goal /
            goalsProgressData.weightGoal.current) *
            100)
        )
      : 0
  const weightToGo =
    hasGoalsData
      ? Math.abs(
          goalsProgressData.weightGoal.current -
            goalsProgressData.weightGoal.goal
        )
      : 0

  // Calculate derived values from workoutData
  const workoutCompleted = workoutData.todayWorkout.completed
  const workoutDuration = workoutData.todayWorkout.duration
  const workoutType = workoutData.todayWorkout.type

  // TODO: Replace with actual data from WeightStore when implemented
  const currentWeight = 63
  const startingWeight = 70
  const weightChange = currentWeight - startingWeight

  // TODO: Replace with actual data from StreakStore when implemented
  const currentStreak = 12
  const longestStreak = 18

  // TODO: Replace with actual weight tracking data from WeightStore when implemented
  const weightProgressData = [
    { week: 'Week 1', weight: 70 },
    { week: 'Week 2', weight: 68.5 },
    { week: 'Week 3', weight: 67 },
    { week: 'Week 4', weight: 66 },
    { week: 'Week 5', weight: 64.5 },
    { week: 'Week 6', weight: 63 },
  ]

  // Get Personal Records from WorkoutsStore
  const personalRecords = workoutsStore.recentPRs
  const hasRecentPRs = personalRecords.length > 0

  // Prepare macro data from nutritionData
  const macroData = hasNutritionData
    ? [
        { name: 'Protein', value: nutritionData.consumed.protein, color: '#8b5cf6' }, // Purple
        { name: 'Carbs', value: nutritionData.consumed.carbs, color: '#10b981' }, // Green
        { name: 'Fats', value: nutritionData.consumed.fats, color: '#f59e0b' }, // Orange
      ]
    : []

  // Prepare today's meals data from nutritionData
  const todayMealsData = hasNutritionData
    ? nutritionData.meals.map((meal) => ({
        meal: meal.name,
        calories: meal.calories,
      }))
    : []

  // Check for low macros based on nutritionData
  const proteinGoal = nutritionData.dailyGoals.protein
  const currentProtein = nutritionData.consumed.protein
  const isLowProtein = currentProtein < proteinGoal * 0.8 // Less than 80% of goal

  // Prepare weekly calorie data from nutritionData
  const weeklyCalorieData = hasNutritionData ? nutritionData.weeklyData : []

  // Get current date
  const today = new Date()
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }
  const formattedDate = today.toLocaleDateString('en-US', dateOptions)

  return (
    <div className="page dashboard-page">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1 className="greeting">
            Hey <span className="username-gradient">{userName}</span>{' '}
            <MdWavingHand className="wave-icon" />
          </h1>
          <p className="subheader">Your fitness overview at a glance</p>
        </div>
        <div className="date-section">
          <MdCalendarToday className="calendar-icon" />
          <span className="date">{formattedDate}</span>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="dashboard-section">

        <div className="overview-section">
          {/* Calories Card */}
          <div className="overview-card">
            <div className="card-content">
              <h3>Calories Left</h3>
              <div className="card-value">{caloriesLeft} kcal</div>
              <div className="card-subtitle">
                {caloriesConsumed} / {caloriesGoal} goal
              </div>
            </div>
            <MdRestaurant className="card-icon" />
          </div>

          {/* Workout Card */}
          <div className="overview-card">
            <div className="card-content">
              <h3>Workout Today</h3>
              <div className={`card-value ${workoutCompleted ? 'completed' : 'pending'}`}>
                {workoutCompleted ? 'Done ✓' : 'Not Done'}
              </div>
              {workoutCompleted && (
                <div className="card-subtitle">
                  {workoutDuration} min • {workoutType}
                </div>
              )}
            </div>
            <MdFitnessCenter className="card-icon" />
          </div>

          {/* Weight Card */}
          <div className="overview-card">
            <div className="card-content">
              <h3>Current Weight</h3>
              <div className="card-value">{currentWeight} kg</div>
              <div className="card-subtitle">
                {weightChange >= 0 ? '+' : ''}
                {weightChange} kg from start
              </div>
            </div>
            <MdMonitorWeight className="card-icon" />
          </div>

          {/* Streak Card */}
          <div className="overview-card">
            <div className="card-content">
              <h3>Active Streak</h3>
              <div className="card-value">
                <MdLocalFireDepartment className="streak-fire" /> {currentStreak} days
              </div>
              <div className="card-subtitle">Longest: {longestStreak} days</div>
            </div>
            <MdLocalFireDepartment className="card-icon streak-icon" />
          </div>
        </div>

        {/* Progress & PRs Section */}
        <div className="progress-prs-section">
          {/* Weight Progress Graph */}
          <div className="graph-section">
            <div className="graph-header">
              <div className="graph-title-wrapper">
                <div className="icon-wrapper">
                  <MdTimeline className="section-icon" />
                </div>
                <div>
                  <h2>Weight Progress</h2>
                  <p className="graph-subtitle">Your weight journey this week</p>
                </div>
              </div>
            </div>

            <div className="graph-content">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weightProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="week" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" domain={[55, 75]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="url(#weightGradient)"
                    strokeWidth={3}
                    dot={{ fill: 'var(--gradient-start)', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                  <defs>
                    <linearGradient id="weightGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--gradient-start)" />
                      <stop offset="100%" stopColor="var(--gradient-end)" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Personal Records List */}
          <div className="pr-section">
            <div className="pr-header">
              <div className="pr-title-wrapper">
                <div className="icon-wrapper">
                  <MdEmojiEvents className="section-icon" />
                </div>
                <div>
                  <h2>Recent Personal Records</h2>
                  <p className="pr-subtitle">Your latest achievements</p>
                </div>
              </div>
            </div>

            <div className="pr-content">
              {!hasRecentPRs || personalRecords.length === 0 ? (
                <div className="no-prs">
                  <MdEmojiEvents className="no-prs-icon" />
                  <p>No recent PRs. Start tracking your workouts!</p>
                </div>
              ) : (
                <div className="pr-list">
                  {personalRecords.map((pr, index) => (
                    <div key={index} className="pr-item">
                      <div className="pr-item-header">
                        <span className="pr-exercise">{pr.exercise}</span>
                        <span className="pr-change">
                          <MdTrendingUp className="pr-trend-icon" />+{pr.change} kg
                        </span>
                      </div>
                      <div className="pr-item-details">
                        <span className="pr-current">{pr.currentPR}</span>
                        <span className="pr-time">{pr.timeAgo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Nutritional Highlights Section */}
        <div className="section-divider">
          <h3 className="section-header">Nutritional Highlights</h3>
        </div>

        {/* Nutrition Section */}
        <div className="nutrition-section">
          {/* Macro Breakdown - Left */}
          <div className="macro-section">
            <div className="macro-header">
              <div className="macro-title-wrapper">
                <div className="icon-wrapper">
                  <MdDonutLarge className="section-icon" />
                </div>
                <div>
                  <h2>Macro Breakdown</h2>
                  <p className="macro-subtitle">Today's macronutrients</p>
                </div>
              </div>
            </div>

            <div className="macro-content">
              {!hasNutritionData || macroData.length === 0 ? (
                <div className="no-data-placeholder">
                  <MdRestaurant className="no-data-icon" />
                  <p>No data to show</p>
                  <span className="no-data-hint">Start logging your meals in the Calories section</span>
                </div>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={macroData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {macroData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="macro-legend">
                    {macroData.map((macro, index) => (
                      <div key={index} className="macro-legend-item">
                        <div className="macro-legend-color" style={{ backgroundColor: macro.color }} />
                        <div className="macro-legend-info">
                          <span className="macro-legend-value">{macro.value}g</span>
                          <span className="macro-legend-label">{macro.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Meals & Weekly - Right */}
          <div className="meals-weekly-section">
            {/* Today's Meals */}
            <div className="meals-section">
              <div className="meals-header">
                <div className="meals-title-wrapper">
                  <div className="icon-wrapper">
                    <MdRestaurant className="section-icon" />
                  </div>
                  <div>
                    <h2>Today's Meals</h2>
                  </div>
                </div>
                {isLowProtein && <span className="low-indicator">Low protein</span>}
              </div>

              <div className="meals-content">
                {!hasNutritionData || todayMealsData.length === 0 ? (
                  <div className="no-data-placeholder">
                    <MdRestaurant className="no-data-icon" />
                    <p>No data to show</p>
                    <span className="no-data-hint">Log your meals to see breakdown</span>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={todayMealsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                      <XAxis dataKey="meal" stroke="var(--text-secondary)" fontSize={12} />
                      <YAxis stroke="var(--text-secondary)" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="calories" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Weekly Calorie Intake */}
            <div className="weekly-section">
              <div className="weekly-header">
                <div className="weekly-title-wrapper">
                  <div className="icon-wrapper">
                    <MdBarChart className="section-icon" />
                  </div>
                  <div>
                    <h2>Weekly Calorie Intake</h2>
                    <p className="weekly-subtitle">Last 7 days</p>
                  </div>
                </div>
              </div>

              <div className="weekly-content">
                {!hasNutritionData || weeklyCalorieData.length === 0 ? (
                  <div className="no-data-placeholder">
                    <MdBarChart className="no-data-icon" />
                    <p>No data to show</p>
                    <span className="no-data-hint">Weekly data will appear after logging meals</span>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={weeklyCalorieData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                      <XAxis dataKey="day" stroke="var(--text-secondary)" fontSize={12} />
                      <YAxis stroke="var(--text-secondary)" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="calories" fill="#10b981" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Workout Insights Section */}
        <div className="section-divider">
          <h3 className="section-header">Workout Insights</h3>
        </div>

        {/* Workout Stats Grid */}
        <div className="workout-stats-section">
          {/* Weekly Consistency */}
          <div className="workout-stat-card">
            <div className="stat-header">
              <div className="stat-title-wrapper">
                <div className="icon-wrapper">
                  <MdLocalFireDepartment className="section-icon" />
                </div>
                <h3>Weekly Consistency</h3>
              </div>
              {hasWorkoutData && workoutData.weeklyConsistency && (
                <div className="stat-days">
                  {workoutData.weeklyConsistency.completed}/{workoutData.weeklyConsistency.planned}
                </div>
              )}
            </div>
            <div className="stat-content">
              {!hasWorkoutData || !workoutData.weeklyConsistency ? (
                <div className="no-data-placeholder-small">
                  <p>No data yet</p>
                  <span className="no-data-hint">
                    Track your workouts to see your consistency
                  </span>
                </div>
              ) : (
                <>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${(workoutData.weeklyConsistency.completed / workoutData.weeklyConsistency.planned) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="stat-message">
                    {workoutData.weeklyConsistency.completed === workoutData.weeklyConsistency.planned
                      ? 'Amazing! You hit your goal! 🎉'
                      : workoutData.weeklyConsistency.completed === 0
                        ? "Let's get started! 💪"
                        : workoutData.weeklyConsistency.completed >= workoutData.weeklyConsistency.planned - 1
                          ? `Almost there! ${workoutData.weeklyConsistency.planned - workoutData.weeklyConsistency.completed} more to hit your goal`
                          : `Keep going! ${workoutData.weeklyConsistency.planned - workoutData.weeklyConsistency.completed} more workouts to reach your goal`}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Top Muscle Group */}
          <div className="workout-stat-card">
            <div className="stat-header">
              <div className="stat-title-wrapper">
                <div className="icon-wrapper">
                  <MdFitnessCenter className="section-icon" />
                </div>
                <h3>Top Muscle Group</h3>
              </div>
              {hasWorkoutData && workoutData.topMuscleGroup && (
                <div className="stat-pill">
                  {workoutData.topMuscleGroup.sessions} sessions
                </div>
              )}
            </div>
            <div className="stat-content">
              {!hasWorkoutData || !workoutData.topMuscleGroup ? (
                <div className="no-data-placeholder-small">
                  <p>No data yet</p>
                  <span className="no-data-hint">Your most trained muscle group will appear here</span>
                </div>
              ) : (
                <>
                  <div className="stat-value-large">{workoutData.topMuscleGroup.name}</div>
                  <div className="stat-detail">{workoutData.topMuscleGroup.period}</div>
                </>
              )}
            </div>
          </div>

          {/* Average Reps */}
          <div className="workout-stat-card">
            <div className="stat-header">
              <div className="stat-title-wrapper">
                <div className="icon-wrapper">
                  <MdTrendingUp className="section-icon" />
                </div>
                <h3>Average Reps</h3>
              </div>
            </div>
            <div className="stat-content">
              {!hasWorkoutData || !workoutData.averageStats ? (
                <div className="no-data-placeholder-small">
                  <p>No data yet</p>
                  <span className="no-data-hint">Log exercises to see your average reps</span>
                </div>
              ) : (
                <>
                  <div className="stat-value-large">{workoutData.averageStats.reps} reps</div>
                  <div className="stat-detail">Per exercise</div>
                </>
              )}
            </div>
          </div>

          {/* Average Sets */}
          <div className="workout-stat-card">
            <div className="stat-header">
              <div className="stat-title-wrapper">
                <div className="icon-wrapper">
                  <MdBarChart className="section-icon" />
                </div>
                <h3>Average Sets</h3>
              </div>
            </div>
            <div className="stat-content">
              {!hasWorkoutData || !workoutData.averageStats ? (
                <div className="no-data-placeholder-small">
                  <p>No data yet</p>
                  <span className="no-data-hint">Track your sets to see averages</span>
                </div>
              ) : (
                <>
                  <div className="stat-value-large">{workoutData.averageStats.sets} sets</div>
                  <div className="stat-detail">Per workout</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Goals and Progress Section */}
        <div className="section-divider">
          <h3 className="section-header">Goals and Progress</h3>
        </div>

        {/* Bento Grid Layout */}
        <div className="bento-grid">
          {/* Weight Goal Progress */}
          <div className="bento-card weight-goal-card">
            <div className="bento-card-header">
              <div className="icon-wrapper">
                <MdMonitorWeight className="section-icon" />
              </div>
              <h3>Weight Goal Progress</h3>
            </div>
            <div className="bento-card-content">
              {!hasGoalsData ? (
                <div className="no-data-placeholder-small">
                  <p>No weight goal set</p>
                  <span className="no-data-hint">Set your goal in Settings</span>
                </div>
              ) : (
                <>
                  <div className="weight-stats">
                    <div className="weight-stat">
                      <div className="weight-value">
                        {goalsProgressData.weightGoal.current} {goalsProgressData.weightGoal.unit}
                      </div>
                      <div className="weight-label">Current weight</div>
                    </div>
                    <div className="weight-stat">
                      <div className="weight-value">
                        {goalsProgressData.weightGoal.goal} {goalsProgressData.weightGoal.unit}
                      </div>
                      <div className="weight-label">Goal</div>
                    </div>
                  </div>
                  <div className="progress-section">
                    <div className="progress-label">Progress to goal</div>
                    <div className="progress-bar-container">
                      <div className="progress-bar-fill" style={{ width: `${weightProgress}%` }} />
                    </div>
                    <div className="progress-stats">
                      <span className="progress-percentage">{weightProgress}% complete</span>
                      <span className="progress-remaining">{weightToGo} kg to go! Keep pushing! 💪</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Weekly Summary */}
          <div className="bento-card weekly-summary-card">
            <div className="bento-card-header">
              <div className="icon-wrapper">
                <MdTimeline className="section-icon" />
              </div>
              <h3>Weekly Summary</h3>
            </div>
            <div className="bento-card-content">
              {!hasGoalsData ? (
                <div className="no-data-placeholder-small">
                  <p>No data yet</p>
                  <span className="no-data-hint">Start tracking to see your summary</span>
                </div>
              ) : (
                <div className="summary-grid">
                  <div className="summary-item">
                    <div className="summary-label">Average Calories</div>
                    <div className="summary-value">
                      {goalsProgressData.weeklySummary.avgCalories} kcal/day
                    </div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-label">Workouts Completed</div>
                    <div className="summary-value">
                      {goalsProgressData.weeklySummary.workoutsCompleted} sessions
                    </div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-label">Personal Records</div>
                    <div className="summary-value">
                      {goalsProgressData.weeklySummary.personalRecords} PRs hit
                    </div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-label">Weight Lost</div>
                    <div className="summary-value">
                      {goalsProgressData.weeklySummary.weightChange} kg
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Achievement Unlocked */}
          <div className="bento-card achievement-card">
            <div className="bento-card-header">
              <div className="icon-wrapper">
                <MdEmojiEvents className="section-icon" />
              </div>
              <h3>Achievement Unlocked</h3>
            </div>
            <div className="bento-card-content">
              {!hasAchievement ? (
                <div className="no-data-placeholder-small">
                  <p>No achievements yet</p>
                  <span className="no-data-hint">Keep working to unlock achievements!</span>
                </div>
              ) : (
                <div className="achievement-content">
                  <p>
                    {goalsProgressData.achievement.title} {goalsProgressData.achievement.icon}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Active Streaks */}
          <div className="bento-card streaks-card">
            <div className="bento-card-header">
              <div className="icon-wrapper">
                <MdLocalFireDepartment className="section-icon" />
              </div>
              <h3>Active Streaks</h3>
            </div>
            <div className="bento-card-content">
              {!hasStreaksData ? (
                <div className="no-data-placeholder-small">
                  <p>No streaks yet</p>
                  <span className="no-data-hint">Start building your streaks!</span>
                </div>
              ) : (
                <div className="streaks-list">
                  <div className="streak-item">
                    <span className="streak-icon">🏋️</span>
                    <div className="streak-info">
                      <div className="streak-name">Workout Streak</div>
                      <div className="streak-days">{goalsProgressData.streaks.workout} days</div>
                    </div>
                  </div>
                  <div className="streak-item">
                    <span className="streak-icon">🍽️</span>
                    <div className="streak-info">
                      <div className="streak-name">Food Logging</div>
                      <div className="streak-days">{goalsProgressData.streaks.foodLogging} days</div>
                    </div>
                  </div>
                  <div className="streak-item">
                    <span className="streak-icon">💧</span>
                    <div className="streak-info">
                      <div className="streak-name">Water Goal</div>
                      <div className="streak-days">{goalsProgressData.streaks.waterGoal} days</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* How do you feel today? */}
          <div className="bento-card mood-card">
            <div className="bento-card-header">
              <div className="icon-wrapper">
                <MdMood className="section-icon" />
              </div>
              <h3>How do you feel today?</h3>
            </div>
            <div className="bento-card-content">
              <div className="mood-selector">
                <button className="mood-btn" title="Tired">
                  <MdSentimentVeryDissatisfied />
                  <span>Tired</span>
                </button>
                <button className="mood-btn" title="Okay">
                  <MdSentimentNeutral />
                  <span>Okay</span>
                </button>
                <button className="mood-btn" title="Good">
                  <MdSentimentSatisfied />
                  <span>Good</span>
                </button>
                <button className="mood-btn" title="Great">
                  <MdSentimentVerySatisfied />
                  <span>Great</span>
                </button>
                <button className="mood-btn" title="Pumped">
                  <MdMood />
                  <span>Pumped</span>
                </button>
              </div>
            </div>
          </div>

          {/* Last Workout Note */}
          <div className="bento-card workout-note-card">
            <div className="bento-card-header">
              <div className="icon-wrapper">
                <MdStickyNote2 className="section-icon" />
              </div>
              <h3>Last Workout Note</h3>
            </div>
            <div className="bento-card-content">
              {!hasLastNote || !goalsProgressData.lastWorkoutNote ? (
                <div className="no-data-placeholder-small">
                  <p>No notes yet</p>
                  <span className="no-data-hint">Add notes to your workouts!</span>
                </div>
              ) : (
                <div className="workout-note-content">
                  <p className="note-text">"{goalsProgressData.lastWorkoutNote.text}"</p>
                  <div className="note-meta">
                    {goalsProgressData.lastWorkoutNote.date} •{' '}
                    {goalsProgressData.lastWorkoutNote.workoutType}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Today's Goals */}
          <div className="bento-card todays-goals-card">
            <div className="bento-card-header">
              <div className="icon-wrapper">
                <MdEmojiEvents className="section-icon" />
              </div>
              <div>
                <h3>Today's Goals</h3>
                <p className="card-subtitle">Keep up the great work!</p>
              </div>
            </div>
            <div className="bento-card-content">
              <div className="goals-list">
                {/* Calories Goal */}
                <div className="goal-item">
                  <div className="goal-header">
                    <span className="goal-label">Calories</span>
                    <span className="goal-value">
                      {caloriesConsumed} / {caloriesGoal}
                    </span>
                  </div>
                  <div className="goal-progress-bar">
                    <div
                      className="goal-progress-fill"
                      style={{
                        width: `${Math.min((caloriesConsumed / caloriesGoal) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Protein Goal */}
                <div className="goal-item">
                  <div className="goal-header">
                    <span className="goal-label">Protein</span>
                    <span className="goal-value">
                      {nutritionData.consumed.protein}g / {nutritionData.dailyGoals.protein}g
                    </span>
                  </div>
                  <div className="goal-progress-bar">
                    <div
                      className="goal-progress-fill"
                      style={{
                        width: `${Math.min((nutritionData.consumed.protein / nutritionData.dailyGoals.protein) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Water Goal */}
                <div className="goal-item">
                  <div className="goal-header">
                    <span className="goal-label">Water</span>
                    <span className="goal-value">
                      {caloriesStore.waterCups} / {caloriesStore.goals.water} cups
                    </span>
                  </div>
                  <div className="goal-progress-bar">
                    <div
                      className="goal-progress-fill"
                      style={{
                        width: `${(caloriesStore.waterCups / caloriesStore.goals.water) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Workout Goal */}
                <div className="goal-item">
                  <div className="goal-header">
                    <span className="goal-label">Workout</span>
                    <span className="goal-value">
                      {workoutCompleted ? 'Completed' : 'Not started'}
                    </span>
                  </div>
                  <div className="goal-progress-bar">
                    <div
                      className="goal-progress-fill"
                      style={{
                        width: workoutCompleted ? '100%' : '0%',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="section-divider">
          <h3 className="section-header">Recent Activity</h3>
        </div>

        <div className="recent-activity-section">
          <div className="activity-header">
            <p className="activity-subtitle">Your latest workouts and meals</p>
          </div>
          <div className="activity-list">
            {activityLogStore.sortedActivities.length === 0 ? (
              <div className="no-activity">
                <p>No recent activity</p>
                <span className="no-activity-hint">
                  Start logging workouts and meals to see your activity here
                </span>
              </div>
            ) : (
              activityLogStore.sortedActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <div className="activity-title">{activity.title}</div>
                    {activity.subtitle && (
                      <div className="activity-meta">{activity.subtitle}</div>
                    )}
                  </div>
                  <div className="activity-time">
                    {activityLogStore.getTimeAgo(activity.timestamp)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

export default Dashboard
