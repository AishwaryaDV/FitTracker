import { useState } from 'react'
import {
  MdShowChart,
  MdFileDownload,
  MdTrendingDown,
  MdLocalFireDepartment,
  MdFitnessCenter,
  MdEmojiEvents,
  MdTimeline,
  MdTrendingUp,
} from 'react-icons/md'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts'
import './Analytics.scss'

const Analytics = () => {
  const [graphPeriod, setGraphPeriod] = useState<
    '1 Week' | '6 Weeks' | '1 Month' | '3 Months' | '1 Year'
  >('6 Weeks')

  const handleGraphExport = () => {
    // Graph export functionality to be implemented
    console.log('Export graph data clicked')
  }

  // Mock data for the graph - changes based on selected period
  const getGraphData = () => {
    const weekData = [
      { week: 'Week 1', bodyweight: 75, benchpress: 60, deadlift: 100, squat: 80 },
      { week: 'Week 2', bodyweight: 74.5, benchpress: 62.5, deadlift: 105, squat: 85 },
      { week: 'Week 3', bodyweight: 74, benchpress: 65, deadlift: 110, squat: 87.5 },
      { week: 'Week 4', bodyweight: 73.5, benchpress: 67.5, deadlift: 115, squat: 90 },
      { week: 'Week 5', bodyweight: 73, benchpress: 70, deadlift: 117.5, squat: 92.5 },
      { week: 'Week 6', bodyweight: 72.5, benchpress: 72.5, deadlift: 120, squat: 95 },
    ]

    // For now, return the same data - you can customize based on graphPeriod later
    return weekData
  }

  // Custom tooltip component for line chart
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean
    payload?: Array<{ name: string; value: number; color: string }>
    label?: string
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value} kg
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // Pie chart data for workout consistency
  const workoutData = [
    { name: 'Completed', value: 24 },
    { name: 'Missed', value: 4 },
  ]

  const CHART_COLORS = ['#8b5cf6', '#d1d5db'] // Purple for Completed, Grey for Missed

  // Bar chart data for muscle group volume
  // Volume calculation: weight × reps for each completed set, summed across 6 weeks
  // Example: Bench Press 3 sets (60kg×8 + 65kg×8 + 70kg×6) = 1,420 kg per workout
  // In real implementation, this will calculate from workout logs using:
  // Volume = sum of (weight × reps) for all completed sets in muscle group over 6 weeks
  const muscleVolumeData = [
    { muscle: 'Chest', volume: 8500 }, // e.g., Bench Press, Incline Press, Flyes
    { muscle: 'Back', volume: 12000 }, // e.g., Deadlifts, Rows, Pull-ups
    { muscle: 'Legs', volume: 15000 }, // e.g., Squats, Leg Press, Lunges
    { muscle: 'Arms', volume: 6500 }, // e.g., Curls, Tricep Extensions
  ]

  // Custom label for pie chart
  const renderCustomLabel = (props: unknown) => {
    const { name, value } = props as { name: string; value: number }
    return `${name} (${value})`
  }

  // Recent Personal Records data
  // IMPORTANT: This is MOCK DATA for development
  // In production, this will be DYNAMIC based on:
  // 1. Exercises tracked in workout logs
  // 2. Automatic PR detection when user beats previous best
  // 3. Only shows exercises where PRs were achieved
  // 4. Calculated from workout history: if current max > previous max, it's a PR
  const personalRecords = [
    {
      exercise: 'Bench Press',
      change: 2.5,
      currentPR: '72.5 kg',
      timeAgo: '2 days ago',
    },
    {
      exercise: 'Squat',
      change: 5,
      currentPR: '92.5 kg',
      timeAgo: '5 days ago',
    },
    {
      exercise: 'Deadlift',
      change: 5,
      currentPR: '125 kg',
      timeAgo: '1 week ago',
    },
    {
      exercise: 'Overhead Press',
      change: 2.5,
      currentPR: '45 kg',
      timeAgo: '1 week ago',
    },
    {
      exercise: 'Pull-ups',
      change: 5,
      currentPR: 'Bodyweight + 10kg',
      timeAgo: '2 weeks ago',
    },
    {
      exercise: 'Plank',
      change: 30,
      currentPR: '3:30 min',
      timeAgo: '3 weeks ago',
      isTime: true,
    },
  ]

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div className="header-content">
          <div className="header-title-wrapper">
            <div className="icon-wrapper">
              <MdShowChart className="page-icon" />
            </div>
            <h1>Analytics & Progress</h1>
          </div>
          <p>Track your fitness journey and celebrate your wins</p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="overview-section">
        <div className="overview-card">
          <div className="card-content">
            <h3>Total Weight Lost</h3>
            <div className="card-value">2.5 kg</div>
            <p className="card-subtitle">In 6 weeks</p>
          </div>
          <MdTrendingDown className="card-icon" />
        </div>

        <div className="overview-card">
          <div className="card-content">
            <h3>Workout Consistency</h3>
            <div className="card-value">85%</div>
            <p className="card-subtitle">24/28 planned workouts</p>
          </div>
          <MdLocalFireDepartment className="card-icon" />
        </div>

        <div className="overview-card">
          <div className="card-content">
            <h3>Strength Gains</h3>
            <div className="card-value">+20%</div>
            <p className="card-subtitle">Average across all lifts</p>
          </div>
          <MdFitnessCenter className="card-icon" />
        </div>

        <div className="overview-card">
          <div className="card-content">
            <h3>Personal Records</h3>
            <div className="card-value">7</div>
            <p className="card-subtitle">New PRs this month</p>
          </div>
          <MdEmojiEvents className="card-icon" />
        </div>
      </div>

      {/* Weight & Strength Progress Graph */}
      <div className="graph-section">
        <div className="graph-header">
          <div className="graph-title-wrapper">
            <div className="icon-wrapper">
              <MdTimeline className="section-icon" />
            </div>
            <div>
              <h2>Weight & Strength Progress</h2>
              <p className="graph-subtitle">Track your body weight and major lift progression</p>
            </div>
          </div>
          <div className="graph-controls">
            <select
              className="graph-period-selector"
              value={graphPeriod}
              onChange={e => setGraphPeriod(e.target.value as typeof graphPeriod)}
            >
              <option value="1 Week">1 Week</option>
              <option value="6 Weeks">6 Weeks</option>
              <option value="1 Month">1 Month</option>
              <option value="3 Months">3 Months</option>
              <option value="1 Year">1 Year</option>
            </select>
            <button className="graph-export-btn" onClick={handleGraphExport}>
              <MdFileDownload /> Export Data
            </button>
          </div>
        </div>

        <div className="graph-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={getGraphData()} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" style={{ fontSize: '0.75rem' }} />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: '0.75rem' }}
                label={{
                  value: 'kg',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: '0.75rem' },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '0.75rem', paddingTop: '15px' }} iconType="line" />
              <Line
                type="monotone"
                dataKey="bodyweight"
                stroke="#8b5cf6"
                strokeWidth={2}
                name="Body Weight"
                dot={{ fill: '#8b5cf6', r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="benchpress"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Bench Press"
                dot={{ fill: '#3b82f6', r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="deadlift"
                stroke="#10b981"
                strokeWidth={2}
                name="Deadlift"
                dot={{ fill: '#10b981', r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="squat"
                stroke="#f59e0b"
                strokeWidth={2}
                name="Squat"
                dot={{ fill: '#f59e0b', r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Charts Section */}
      <div className="secondary-charts">
        {/* Workout Consistency Pie Chart */}
        <div className="chart-card">
          <div className="chart-card-header">
            <h3>Workout Consistency</h3>
            <p className="chart-subtitle">Your attendance rate this month</p>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={workoutData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  innerRadius={50}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {workoutData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              <div className="legend-item">
                <div className="legend-color" style={{ background: '#8b5cf6' }}></div>
                <span>Completed (24)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: '#d1d5db' }}></div>
                <span>Missed (4)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Volume by Muscle Group Bar Chart */}
        <div className="chart-card">
          <div className="chart-card-header">
            <h3>Volume by Muscle Group</h3>
            <p className="chart-subtitle">Total training volume over the past 6 weeks</p>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={muscleVolumeData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="muscle" stroke="#6b7280" style={{ fontSize: '0.7rem' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '0.7rem' }} />
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                  }}
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <Bar dataKey="volume" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Personal Records Section */}
      <div className="pr-section">
        <div className="pr-header">
          <h2>Recent Personal Records</h2>
          <p className="pr-subtitle">Celebrate your achievements!</p>
        </div>
        <div className="pr-grid">
          {personalRecords.map((pr, index) => (
            <div key={index} className="pr-card">
              <div className="pr-card-header">
                <h4>{pr.exercise}</h4>
                <div className="pr-change">
                  <MdTrendingUp className="pr-icon" />
                  <span>
                    +{pr.change} {pr.isTime ? 'sec' : 'kg'}
                  </span>
                </div>
              </div>
              <div className="pr-value">{pr.currentPR}</div>
              <div className="pr-time">{pr.timeAgo}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analytics
