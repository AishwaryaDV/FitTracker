import { makeAutoObservable } from 'mobx'
import {
  mockNutritionGoals,
  mockMeals,
  mockWeeklyHistory,
  mockWaterCups,
  mockFoodLoggingStreak,
} from './mockData/caloriesMockData'
import { activityLogStore } from './ActivityLogStore'
import { MdRestaurant, MdWaterDrop } from 'react-icons/md'

export interface FoodItem {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface Meal {
  name: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks'
  items: FoodItem[]
}

export interface NutritionGoals {
  calories: number
  protein: number
  carbs: number
  fat: number
  water: number
}

export interface DailyNutritionData {
  date: string
  calories: number
  protein: number
  carbs: number
  fat: number
  water: number
}

class CaloriesStore {
  // Goals
  // TODO: When backend is ready, fetch from API endpoint: GET /api/user/nutrition-goals
  goals: NutritionGoals = mockNutritionGoals

  // Current day meals
  // TODO: When backend is ready, fetch from API endpoint: GET /api/meals/today
  meals: Meal[] = mockMeals

  // Water tracking
  // TODO: When backend is ready, fetch from API endpoint: GET /api/water/today
  waterCups = mockWaterCups

  // Weekly history (last 7 days)
  // TODO: When backend is ready, fetch from API endpoint: GET /api/nutrition/history?days=7
  weeklyHistory: DailyNutritionData[] = mockWeeklyHistory

  // Streak tracking
  // TODO: When backend is ready, fetch from API endpoint: GET /api/streaks/food-logging
  foodLoggingStreak = mockFoodLoggingStreak

  constructor() {
    makeAutoObservable(this)
  }

  // Computed values
  get consumed() {
    const totalCalories = this.meals.reduce(
      (sum, meal) => sum + meal.items.reduce((mealSum, item) => mealSum + item.calories, 0),
      0
    )
    const totalProtein = this.meals.reduce(
      (sum, meal) => sum + meal.items.reduce((mealSum, item) => mealSum + item.protein, 0),
      0
    )
    const totalCarbs = this.meals.reduce(
      (sum, meal) => sum + meal.items.reduce((mealSum, item) => mealSum + item.carbs, 0),
      0
    )
    const totalFat = this.meals.reduce(
      (sum, meal) => sum + meal.items.reduce((mealSum, item) => mealSum + item.fat, 0),
      0
    )

    return {
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
    }
  }

  get caloriesLeft() {
    return this.goals.calories - this.consumed.calories
  }

  get weeklyCalorieData() {
    return this.weeklyHistory.map(day => {
      const date = new Date(day.date)
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      return {
        day: dayNames[date.getDay()],
        calories: day.calories,
      }
    })
  }

  get averageWeeklyCalories() {
    if (this.weeklyHistory.length === 0) return 0
    const total = this.weeklyHistory.reduce((sum, day) => sum + day.calories, 0)
    return Math.round(total / this.weeklyHistory.length)
  }

  // Actions
  // TODO: When backend is ready, call API: POST /api/meals/{mealName}/items
  addFoodItem(mealName: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks', item: FoodItem) {
    const meal = this.meals.find(m => m.name === mealName)
    if (meal) {
      meal.items.push(item)
      // Log activity
      activityLogStore.addActivity({
        type: 'meal',
        title: `Added ${item.name}`,
        subtitle: `${item.calories} kcal • ${mealName}`,
        icon: <MdRestaurant />,
      })
      // TODO: await api.post(`/api/meals/${mealName}/items`, item)
    }
  }

  // TODO: When backend is ready, call API: DELETE /api/meals/{mealName}/items/{itemId}
  removeFoodItem(mealName: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks', itemId: string) {
    const meal = this.meals.find(m => m.name === mealName)
    if (meal) {
      meal.items = meal.items.filter(item => item.id !== itemId)
      // TODO: await api.delete(`/api/meals/${mealName}/items/${itemId}`)
    }
  }

  // TODO: When backend is ready, call API: PUT /api/meals/{mealName}/items/{itemId}
  updateFoodItem(
    mealName: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks',
    itemId: string,
    updatedItem: FoodItem
  ) {
    const meal = this.meals.find(m => m.name === mealName)
    if (meal) {
      const index = meal.items.findIndex(item => item.id === itemId)
      if (index !== -1) {
        meal.items[index] = updatedItem
        // TODO: await api.put(`/api/meals/${mealName}/items/${itemId}`, updatedItem)
      }
    }
  }

  // TODO: When backend is ready, call API: PUT /api/water/today
  setWaterCups(cups: number) {
    if (cups >= 0 && cups <= this.goals.water) {
      this.waterCups = cups
      // TODO: await api.put('/api/water/today', { cups })
    }
  }

  incrementWater() {
    if (this.waterCups < this.goals.water) {
      this.waterCups++
      // Log activity
      activityLogStore.addActivity({
        type: 'water',
        title: `Logged water`,
        subtitle: `${this.waterCups} cup${this.waterCups > 1 ? 's' : ''}`,
        icon: <MdWaterDrop />,
      })
      // TODO: await api.post('/api/water/increment')
    }
  }

  decrementWater() {
    if (this.waterCups > 0) {
      this.waterCups--
      // TODO: await api.post('/api/water/decrement')
    }
  }

  // TODO: When backend is ready, call API: PUT /api/user/nutrition-goals
  updateGoals(goals: Partial<NutritionGoals>) {
    this.goals = { ...this.goals, ...goals }
    // TODO: await api.put('/api/user/nutrition-goals', this.goals)
  }

  getMealCalories(mealName: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks') {
    const meal = this.meals.find(m => m.name === mealName)
    if (!meal) return 0
    return meal.items.reduce((sum, item) => sum + item.calories, 0)
  }
}

// Create singleton instance
export const caloriesStore = new CaloriesStore()
