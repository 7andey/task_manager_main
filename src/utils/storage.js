const STORAGE_KEY = 'taskManagerTasks'

export const getTasksFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch (e) {
    console.error("Failed to parse localStorage:", e)
    return []
  }
}

export const saveTasksToStorage = (tasks) => {
  try {
    const stringified = JSON.stringify(tasks)
    localStorage.setItem(STORAGE_KEY, stringified)
  } catch (e) {
    console.error("Failed to save tasks to localStorage:", e)
  }
}
