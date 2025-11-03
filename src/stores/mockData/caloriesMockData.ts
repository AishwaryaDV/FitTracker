import type { Meal, NutritionGoals, DailyNutritionData } from '../CaloriesStore'

export const mockNutritionGoals: NutritionGoals = {
  calories: 2200,
  protein: 120,
  carbs: 250,
  fat: 80,
  water: 8,
}

export const mockMeals: Meal[] = [
  {
    name: 'Breakfast',
    items: [
      {
        id: '1',
        name: 'Oatmeal with Berries',
        calories: 320,
        protein: 12,
        carbs: 58,
        fat: 6,
      },
      {
        id: '2',
        name: 'Greek Yogurt',
        calories: 100,
        protein: 15,
        carbs: 6,
        fat: 0,
      },
    ],
  },
  {
    name: 'Lunch',
    items: [
      {
        id: '3',
        name: 'Grilled Chicken Salad',
        calories: 450,
        protein: 38,
        carbs: 35,
        fat: 15,
      },
    ],
  },
  {
    name: 'Dinner',
    items: [
      {
        id: '4',
        name: 'Salmon with Vegetables',
        calories: 577,
        protein: 24,
        carbs: 55,
        fat: 31,
      },
    ],
  },
  {
    name: 'Snacks',
    items: [],
  },
]

export const mockWeeklyHistory: DailyNutritionData[] = [
  { date: '2024-11-25', calories: 2100, protein: 115, carbs: 240, fat: 70, water: 8 },
  { date: '2024-11-26', calories: 1950, protein: 105, carbs: 230, fat: 65, water: 7 },
  { date: '2024-11-27', calories: 2200, protein: 125, carbs: 250, fat: 75, water: 8 },
  { date: '2024-11-28', calories: 1847, protein: 110, carbs: 220, fat: 68, water: 6 },
  { date: '2024-11-29', calories: 2050, protein: 118, carbs: 245, fat: 72, water: 7 },
  { date: '2024-11-30', calories: 1900, protein: 108, carbs: 235, fat: 67, water: 8 },
  { date: '2024-12-01', calories: 2300, protein: 130, carbs: 260, fat: 80, water: 8 },
]

export const mockWaterCups = 6
export const mockFoodLoggingStreak = 15
