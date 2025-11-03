import { makeAutoObservable } from 'mobx'

export interface UserProfile {
  fullName: string
  email: string
  age: number
  height: number
  currentWeight: number
  gender: 'male' | 'female' | 'other'
  activityLevel: string
}

export interface UserGoals {
  primaryGoal: string
  targetWeight: number
  weeklyWeightChange: string
  dailyCalorieGap: number
  workoutsPerWeek: string
  protein: number
  carbs: number
  fat: number
  water: number
  targetDailyCalories: number
  targetTimeFrame: number // in weeks
}

class UserStore {
  profile: UserProfile = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    age: 25,
    height: 175,
    currentWeight: 75,
    gender: 'male',
    activityLevel: 'moderate',
  }

  goals: UserGoals = {
    primaryGoal: 'weight-loss',
    targetWeight: 70,
    weeklyWeightChange: '-0.5',
    dailyCalorieGap: 500,
    workoutsPerWeek: '4',
    protein: 150,
    carbs: 200,
    fat: 60,
    water: 8,
    targetDailyCalories: 2000,
    targetTimeFrame: 12,
  }

  constructor() {
    makeAutoObservable(this)
  }

  updateProfile(field: keyof UserProfile, value: string | number) {
    // Type-safe assignment to observable object
    switch (field) {
      case 'fullName':
      case 'email':
      case 'activityLevel':
        this.profile[field] = value as string
        break
      case 'age':
      case 'height':
      case 'currentWeight':
        this.profile[field] = value as number
        break
      case 'gender':
        this.profile[field] = value as 'male' | 'female' | 'other'
        break
    }
  }

  updateGoals(field: keyof UserGoals, value: string | number) {
    // Type-safe assignment to observable object
    switch (field) {
      case 'primaryGoal':
      case 'weeklyWeightChange':
      case 'workoutsPerWeek':
        this.goals[field] = value as string
        break
      case 'targetWeight':
      case 'dailyCalorieGap':
      case 'protein':
      case 'carbs':
      case 'fat':
      case 'water':
      case 'targetDailyCalories':
      case 'targetTimeFrame':
        this.goals[field] = value as number
        break
    }
  }

  // Activity level multipliers for TDEE calculation
  private getActivityMultiplier(): number {
    const multipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      'very-active': 1.9,
    }
    return multipliers[this.profile.activityLevel] || 1.55
  }

  // Calculate BMR using Mifflin-St Jeor equation
  get bmr(): number {
    const { currentWeight, height, age, gender } = this.profile

    if (gender === 'male') {
      return 10 * currentWeight + 6.25 * height - 5 * age + 5
    } else {
      return 10 * currentWeight + 6.25 * height - 5 * age - 161
    }
  }

  // Calculate TDEE (Total Daily Energy Expenditure)
  get tdee(): number {
    return Math.round(this.bmr * this.getActivityMultiplier())
  }

  // Calculate recommended daily calories based on goal
  get recommendedCalories(): number {
    const weeklyChange = parseFloat(this.goals.weeklyWeightChange)
    // 1 kg of body weight = approximately 7700 calories
    const dailyCalorieAdjustment = (weeklyChange * 7700) / 7
    return Math.round(this.tdee + dailyCalorieAdjustment)
  }

  // Calculate estimated time to reach goal (in weeks)
  get estimatedTimeToGoal(): number {
    const { currentWeight } = this.profile
    const { targetWeight, weeklyWeightChange } = this.goals
    const weeklyChange = parseFloat(weeklyWeightChange)

    if (weeklyChange === 0) {
      return 0 // Maintenance mode
    }

    const totalWeightChange = targetWeight - currentWeight
    const weeks = Math.abs(totalWeightChange / weeklyChange)

    return Math.round(weeks)
  }

  // Get formatted time to goal
  get formattedTimeToGoal(): string {
    const weeks = this.estimatedTimeToGoal

    if (weeks === 0) {
      return 'Maintenance'
    }

    if (weeks < 4) {
      return `${weeks} weeks`
    } else {
      const months = Math.round(weeks / 4)
      return `${months} ${months === 1 ? 'month' : 'months'}`
    }
  }
}

export const userStore = new UserStore()
