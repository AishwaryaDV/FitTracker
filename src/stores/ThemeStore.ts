import { makeAutoObservable } from 'mobx'

export type Theme = 'light' | 'dark'

class ThemeStore {
  theme: Theme = 'light'

  constructor() {
    makeAutoObservable(this)
    this.loadTheme()
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) {
      this.theme = savedTheme
    }
    this.applyTheme()
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
    this.applyTheme()
    localStorage.setItem('theme', this.theme)
  }

  private applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme)
  }
}

export const themeStore = new ThemeStore()
