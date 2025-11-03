import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import {
  MdRestaurant,
  MdAdd,
  MdRemove,
  MdSearch,
  MdLocalDrink,
  MdDeleteOutline,
  MdEdit,
  MdClose,
} from 'react-icons/md'
import { caloriesStore } from '../stores/CaloriesStore'
import type { FoodItem, Meal } from '../stores/CaloriesStore'
import './Calories.scss'

const Calories = observer(() => {
  const [activeMealTab, setActiveMealTab] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks'>(
    'Breakfast'
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<{
    mealName: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks'
    item: FoodItem
  } | null>(null)
  const [editFormData, setEditFormData] = useState<FoodItem>({
    id: '',
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  })
  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false)
  const [addFoodMode, setAddFoodMode] = useState<'custom' | 'search'>('custom')
  const [selectedMealType, setSelectedMealType] = useState<
    'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | ''
  >('')
  const [newFoodData, setNewFoodData] = useState<FoodItem>({
    id: '',
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  })
  const [quickSearchQuery, setQuickSearchQuery] = useState('')

  // Get data from store
  const goals = caloriesStore.goals
  const consumed = caloriesStore.consumed
  const meals = caloriesStore.meals
  const waterCups = caloriesStore.waterCups

  // Mock food suggestions for quick search
  const foodSuggestions = [
    { id: 's1', name: 'Grilled Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { id: 's2', name: 'Brown Rice (1 cup)', calories: 216, protein: 5, carbs: 45, fat: 1.8 },
    { id: 's3', name: 'Scrambled Eggs (2 eggs)', calories: 182, protein: 13, carbs: 2, fat: 14 },
    { id: 's4', name: 'Greek Yogurt (1 cup)', calories: 100, protein: 17, carbs: 6, fat: 0 },
  ]

  const getMealCalories = (meal: Meal) => {
    return meal.items.reduce((sum, item) => sum + item.calories, 0)
  }

  const remaining = caloriesStore.caloriesLeft

  const getMacroPercentage = (consumed: number, goal: number) => {
    return Math.round((consumed / goal) * 100)
  }

  const getCaloriePercentage = () => {
    return Math.round((consumed.calories / goals.calories) * 100)
  }

  const handleWaterChange = (increment: boolean) => {
    if (increment) {
      caloriesStore.incrementWater()
    } else {
      caloriesStore.decrementWater()
    }
  }

  const removeFoodItem = (
    mealName: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks',
    itemId: string
  ) => {
    caloriesStore.removeFoodItem(mealName, itemId)
  }

  const openEditModal = (mealName: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks', item: FoodItem) => {
    setEditingItem({ mealName, item })
    setEditFormData({ ...item })
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setEditingItem(null)
    setEditFormData({
      id: '',
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    })
  }

  const handleEditFormChange = (field: keyof FoodItem, value: string | number) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const saveEditedItem = () => {
    if (!editingItem) return

    caloriesStore.updateFoodItem(editingItem.mealName, editingItem.item.id, editFormData)

    closeEditModal()
  }

  const openAddFoodModal = () => {
    setIsAddFoodModalOpen(true)
    setAddFoodMode('custom')
    setSelectedMealType('')
  }

  const closeAddFoodModal = () => {
    setIsAddFoodModalOpen(false)
    setNewFoodData({
      id: '',
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    })
    setQuickSearchQuery('')
  }

  const handleNewFoodChange = (field: keyof FoodItem, value: string | number) => {
    setNewFoodData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const addCustomFood = () => {
    if (!selectedMealType) return

    const newItem = {
      ...newFoodData,
      id: Date.now().toString(),
    }
    caloriesStore.addFoodItem(selectedMealType, newItem)

    closeAddFoodModal()
  }

  const addFoodFromSearch = (food: FoodItem) => {
    if (!selectedMealType) return

    const newItem = {
      ...food,
      id: Date.now().toString() + Math.random(),
    }
    caloriesStore.addFoodItem(selectedMealType, newItem)
  }

  // Calculate macro percentages for pie chart display
  const totalMacroGrams = consumed.protein + consumed.carbs + consumed.fat
  const proteinPercent = Math.round((consumed.protein / totalMacroGrams) * 100)
  const carbsPercent = Math.round((consumed.carbs / totalMacroGrams) * 100)
  const fatPercent = Math.round((consumed.fat / totalMacroGrams) * 100)

  // Generate smart suggestions based on current progress
  const generateSuggestions = () => {
    const suggestions: string[] = []
    const proteinGoalPercent = (consumed.protein / goals.protein) * 100

    // Protein suggestions
    if (proteinGoalPercent >= 90) {
      suggestions.push("Excellent! You've hit your protein goal for the day.")
    } else if (proteinGoalPercent >= 70) {
      suggestions.push(
        `You need ${Math.round(goals.protein - consumed.protein)}g more protein to reach your goal.`
      )
    } else {
      suggestions.push(
        `Focus on protein-rich foods - you still need ${Math.round(goals.protein - consumed.protein)}g.`
      )
    }

    // Calorie suggestions
    if (remaining > 500) {
      suggestions.push(`You have ${remaining} calories remaining - don't forget to eat enough!`)
    } else if (remaining > 0) {
      suggestions.push(`${remaining} calories left - perfect for a healthy snack.`)
    } else if (remaining < 0) {
      suggestions.push(
        `You're ${Math.abs(remaining)} calories over your goal. Consider lighter meals tomorrow.`
      )
    }

    // Water suggestions
    const waterRemaining = goals.water - waterCups
    if (waterRemaining > 0) {
      suggestions.push(
        `Drink ${waterRemaining} more cup${waterRemaining > 1 ? 's' : ''} of water to stay hydrated.`
      )
    } else {
      suggestions.push('Great job staying hydrated today!')
    }

    // Macro balance suggestions
    if (proteinPercent < 20) {
      suggestions.push('Try to increase your protein intake for better muscle recovery.')
    }
    if (carbsPercent > 50) {
      suggestions.push('Your carb intake is high - consider balancing with more protein and fats.')
    }

    return suggestions.slice(0, 3) // Return max 3 suggestions
  }

  return (
    <div className="calories-page">
      <div className="calories-header">
        <div className="header-content">
          <div className="header-title-wrapper">
            <div className="icon-wrapper">
              <MdRestaurant className="page-icon" />
            </div>
            <h1>Calorie Tracker</h1>
            <button className="quick-add-header-btn" onClick={openAddFoodModal}>
              <MdAdd /> Quick Add
            </button>
          </div>
          <p>Track your nutrition and reach your goals</p>
        </div>
      </div>

      {/* Macro Overview */}
      <div className="macro-overview">
        <div className="macro-card calories-card">
          <h3>Calories</h3>
          <div className="macro-value">
            <span className="current">{consumed.calories}</span>
            <span className="separator">of</span>
            <span className="goal">{goals.calories}</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${Math.min(getCaloriePercentage(), 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="macro-card">
          <h3>Protein</h3>
          <div className="macro-value">
            <span className="current">{consumed.protein}g</span>
            <span className="separator">of</span>
            <span className="goal">{goals.protein}g</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(getMacroPercentage(consumed.protein, goals.protein), 100)}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="macro-card">
          <h3>Carbs</h3>
          <div className="macro-value">
            <span className="current">{consumed.carbs}g</span>
            <span className="separator">of</span>
            <span className="goal">{goals.carbs}g</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(getMacroPercentage(consumed.carbs, goals.carbs), 100)}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="macro-card">
          <h3>Fat</h3>
          <div className="macro-value">
            <span className="current">{consumed.fat}g</span>
            <span className="separator">of</span>
            <span className="goal">{goals.fat}g</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(getMacroPercentage(consumed.fat, goals.fat), 100)}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="macro-card water-card">
          <h3>
            <MdLocalDrink /> Water
          </h3>
          <div className="macro-value">
            <span className="current">{waterCups}</span>
            <span className="separator">of</span>
            <span className="goal">{goals.water} cups</span>
          </div>
          <div className="water-controls">
            <button
              className="water-btn"
              onClick={() => handleWaterChange(false)}
              disabled={waterCups === 0}
            >
              <MdRemove />
            </button>
            <button
              className="water-btn"
              onClick={() => handleWaterChange(true)}
              disabled={waterCups === goals.water}
            >
              <MdAdd />
            </button>
          </div>
        </div>
      </div>

      {/* Food Database */}
      <div className="food-database">
        <div className="search-section">
          <h2>Add Food</h2>
          <p className="search-subtitle">Search our database of over 1M foods</p>
          <div className="search-bar">
            <MdSearch className="search-icon" />
            <input
              type="text"
              placeholder="rice"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button className="search-button">Search</button>
          </div>
        </div>
      </div>

      {/* Meals Section with Tabs */}
      <div className="meals-section">
        <h2>Meals</h2>
        <div className="meal-tabs">
          <div
            className="tab-indicator"
            style={{
              transform: `translateX(${meals.findIndex(m => m.name === activeMealTab) * 100}%)`,
            }}
          />
          {meals.map(meal => (
            <button
              key={meal.name}
              className={`meal-tab-button ${activeMealTab === meal.name ? 'active' : ''}`}
              onClick={() => setActiveMealTab(meal.name as typeof activeMealTab)}
            >
              {meal.name}
            </button>
          ))}
        </div>

        <div className="meal-content">
          {meals
            .filter(meal => meal.name === activeMealTab)
            .map(meal => (
              <div key={meal.name} className="meal-card">
                <div className="meal-title-section">
                  <div className="meal-info">
                    <h3>{meal.name}</h3>
                    <p className="meal-calories">{getMealCalories(meal)} cal</p>
                  </div>
                  <button className="add-food-btn">
                    <MdAdd /> Add Food
                  </button>
                </div>

                <div className="meal-items">
                  {meal.items.length === 0 ? (
                    <p className="no-items">No items added yet</p>
                  ) : (
                    meal.items.map(item => (
                      <div key={item.id} className="food-item">
                        <div className="food-info">
                          <h4>{item.name}</h4>
                          <div className="food-macros">
                            <span>{item.calories} cal</span>
                            <span>{item.protein}g protein</span>
                            <span>{item.carbs}g carbs</span>
                            <span>{item.fat}g fat</span>
                          </div>
                        </div>
                        <div className="food-item-actions">
                          <button
                            className="edit-btn"
                            onClick={() => openEditModal(activeMealTab, item)}
                          >
                            <MdEdit />
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => removeFoodItem(activeMealTab, item.id)}
                          >
                            <MdDeleteOutline />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Daily Summary */}
      <div className="summary-section">
        <div className="summary-card">
          <h2>Daily Summary</h2>
          <p className="summary-subtitle">How you're doing today</p>

          <div className="summary-grid">
            {/* Calorie Breakdown */}
            <div className="summary-item">
              <h3>Calorie Breakdown</h3>
              <div className="stat-row">
                <span className="stat-label">Remaining:</span>
                <span className="stat-value highlight">{remaining} calories</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Base Goal:</span>
                <span className="stat-value">{goals.calories} calories</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Food:</span>
                <span className="stat-value">{consumed.calories} calories</span>
              </div>
            </div>

            {/* Macro Breakdown */}
            <div className="summary-item">
              <h3>Macro Breakdown</h3>
              <div className="stat-row">
                <span className="stat-label">Protein:</span>
                <span className="stat-value">{proteinPercent}%</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Carbs:</span>
                <span className="stat-value">{carbsPercent}%</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Fat:</span>
                <span className="stat-value">{fatPercent}%</span>
              </div>
            </div>
          </div>

          {/* Gradient Suggestions Box */}
          <div className="suggestions-box">
            <h3>Today's Suggestions</h3>
            <ul>
              {generateSuggestions().map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Add Food Modal */}
      {isAddFoodModalOpen && (
        <div className="modal-overlay" onClick={closeAddFoodModal}>
          <div className="modal-content add-food-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>Add Food</h2>
                <p className="modal-subtitle">Search our food database or add custom food items</p>
              </div>
              <button className="modal-close-btn" onClick={closeAddFoodModal}>
                <MdClose />
              </button>
            </div>

            <div className="modal-body">
              {/* Meal Type Selector */}
              <div className="form-group meal-type-selector">
                <label htmlFor="mealType">
                  Meal Type <span className="required">*</span>
                </label>
                <select
                  id="mealType"
                  value={selectedMealType}
                  onChange={e => setSelectedMealType(e.target.value as typeof selectedMealType)}
                  className={!selectedMealType ? 'placeholder' : ''}
                >
                  <option value="" disabled>
                    Select a meal type
                  </option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snacks">Snacks</option>
                </select>
              </div>

              {/* Mode Tabs */}
              <div className="add-food-tabs">
                <button
                  className={`add-food-tab ${addFoodMode === 'custom' ? 'active' : ''}`}
                  onClick={() => setAddFoodMode('custom')}
                >
                  Custom Food
                </button>
                <button
                  className={`add-food-tab ${addFoodMode === 'search' ? 'active' : ''}`}
                  onClick={() => setAddFoodMode('search')}
                >
                  Quick Search
                </button>
              </div>

              {/* Custom Food Mode */}
              {addFoodMode === 'custom' && (
                <>
                  <div className="form-group">
                    <label htmlFor="newFoodName">Food Name</label>
                    <input
                      id="newFoodName"
                      type="text"
                      value={newFoodData.name}
                      onChange={e => handleNewFoodChange('name', e.target.value)}
                      placeholder="Enter food name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newCalories">Calories</label>
                    <input
                      id="newCalories"
                      type="number"
                      value={newFoodData.calories}
                      onChange={e => handleNewFoodChange('calories', Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newProtein">Protein (g)</label>
                    <input
                      id="newProtein"
                      type="number"
                      value={newFoodData.protein}
                      onChange={e => handleNewFoodChange('protein', Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newCarbs">Carbs (g)</label>
                    <input
                      id="newCarbs"
                      type="number"
                      value={newFoodData.carbs}
                      onChange={e => handleNewFoodChange('carbs', Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newFat">Fat (g)</label>
                    <input
                      id="newFat"
                      type="number"
                      value={newFoodData.fat}
                      onChange={e => handleNewFoodChange('fat', Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                </>
              )}

              {/* Quick Search Mode */}
              {addFoodMode === 'search' && (
                <>
                  <div className="quick-search-bar">
                    <MdSearch className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search for food..."
                      value={quickSearchQuery}
                      onChange={e => setQuickSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="food-suggestions-list">
                    {foodSuggestions.map(food => (
                      <div key={food.id} className="suggestion-item">
                        <div className="suggestion-info">
                          <h4>{food.name}</h4>
                          <div className="suggestion-macros">
                            <span>{food.calories} cal</span>
                            <span>{food.protein}g protein</span>
                            <span>{food.carbs}g carbs</span>
                            <span>{food.fat}g fat</span>
                          </div>
                        </div>
                        <button
                          className="btn-add-suggestion"
                          onClick={() => addFoodFromSearch(food)}
                          disabled={!selectedMealType}
                        >
                          <MdAdd />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {addFoodMode === 'custom' && (
              <div className="modal-footer">
                <button className="btn-cancel" onClick={closeAddFoodModal}>
                  Cancel
                </button>
                <button className="btn-save" onClick={addCustomFood} disabled={!selectedMealType}>
                  Add Custom Food
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>Edit Food Item</h2>
                <p className="modal-subtitle">
                  Update the nutritional information for this food item
                </p>
              </div>
              <button className="modal-close-btn" onClick={closeEditModal}>
                <MdClose />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="foodName">Food Name</label>
                <input
                  id="foodName"
                  type="text"
                  value={editFormData.name}
                  onChange={e => handleEditFormChange('name', e.target.value)}
                  placeholder="Enter food name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="calories">Calories</label>
                <input
                  id="calories"
                  type="number"
                  value={editFormData.calories}
                  onChange={e => handleEditFormChange('calories', Number(e.target.value))}
                  placeholder="Enter calories"
                />
              </div>

              <div className="form-group">
                <label htmlFor="protein">Protein (g)</label>
                <input
                  id="protein"
                  type="number"
                  value={editFormData.protein}
                  onChange={e => handleEditFormChange('protein', Number(e.target.value))}
                  placeholder="Enter protein in grams"
                />
              </div>

              <div className="form-group">
                <label htmlFor="carbs">Carbs (g)</label>
                <input
                  id="carbs"
                  type="number"
                  value={editFormData.carbs}
                  onChange={e => handleEditFormChange('carbs', Number(e.target.value))}
                  placeholder="Enter carbs in grams"
                />
              </div>

              <div className="form-group">
                <label htmlFor="fat">Fat (g)</label>
                <input
                  id="fat"
                  type="number"
                  value={editFormData.fat}
                  onChange={e => handleEditFormChange('fat', Number(e.target.value))}
                  placeholder="Enter fat in grams"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeEditModal}>
                Cancel
              </button>
              <button className="btn-save" onClick={saveEditedItem}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

export default Calories
