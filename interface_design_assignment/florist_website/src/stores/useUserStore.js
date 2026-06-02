import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // ── State ─────────────────────────────────────────────────────────────
  // Hydrate from localStorage on startup so refresh doesn't lose the session
  const user = ref(JSON.parse(localStorage.getItem('flora_user') || 'null'))

  // ── Getters ───────────────────────────────────────────────────────────
  const isLoggedIn      = computed(() => !!user.value)
  const isAuthenticated = computed(() => !!user.value) // Alias used by router guards
  const isAdmin         = computed(() => user.value?.role === 'admin' || user.value?.role === 'staff')
  const displayName     = computed(() => user.value?.name || 'Guest')
  const userRole        = computed(() => user.value?.role || 'guest')

  // ── Actions ───────────────────────────────────────────────────────────
  
  /**
   * Authenticate against the Node.js Express backend
   */
  async function login(email, password) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Authentication failed.')
      }

      // Safely persist the verified profile object to client memory
      user.value = data.user || data
      localStorage.setItem('flora_user', JSON.stringify(user.value))
      
      return { success: true }
    } catch (err) {
      console.error('[AUTH_LOGIN_ERROR]', err)
      return { success: false, error: err.message }
    }
  }

  /**
   * Register a new customer profile via the Express gateway
   */
  async function register(name, email, password) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Registration rejected.')
      }

      // Automatically log the user in after successful registration
      user.value = data.user || data
      localStorage.setItem('flora_user', JSON.stringify(user.value))
      
      return { success: true }
    } catch (err) {
      console.error('[AUTH_REGISTER_ERROR]', err)
      return { success: false, error: err.message }
    }
  }

  /**
   * Purge the active session from client memory
   */
  function logout() {
    user.value = null
    localStorage.removeItem('flora_user')
  }

  function updateProfile(updates) {
    if (!user.value) return
    user.value = { ...user.value, ...updates }
    localStorage.setItem('flora_user', JSON.stringify(user.value))
  }

  return {
    user,
    isLoggedIn,
    isAuthenticated,
    isAdmin,
    displayName,
    userRole,
    login,
    register,
    logout,
    updateProfile,
  }
})