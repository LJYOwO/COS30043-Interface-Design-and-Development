import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'flora_cart'

export const useCartStore = defineStore('cart', () => {
  // ── Hydrate from localStorage on startup ────────────────────────────────
  const stored = localStorage.getItem(STORAGE_KEY)
  const items  = ref(stored ? JSON.parse(stored) : [])
  const isOpen = ref(false)

  // ── Persist to localStorage on every change ─────────────────────────────
  watch(items, (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }, { deep: true })

  // ── Computed ──────────────────────────────────────────────────────────────
  const count            = computed(() => items.value.reduce((n, i) => n + i.quantity, 0))
  const subtotal         = computed(() => items.value.reduce((s, i) => s + i.price * i.quantity, 0))
  const formattedSubtotal = computed(() => `RM ${subtotal.value.toFixed(2)}`)

  // ── Actions ───────────────────────────────────────────────────────────────
  function addItem(product, quantity = 1, customization = null) {
    const key      = customization ? `${product.id}-custom-${Date.now()}` : String(product.id)
    const existing = items.value.find(i => i.key === key)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ key, ...product, quantity, customization })
    }
    isOpen.value = true
  }

  function removeItem(key) {
    items.value = items.value.filter(i => i.key !== key)
  }

  function updateQuantity(key, quantity) {
    if (quantity < 1) { removeItem(key); return }
    const item = items.value.find(i => i.key === key)
    if (item) item.quantity = quantity
  }

  function clearCart() {
    items.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  function toggleCart() {
    isOpen.value = !isOpen.value
  }

  return {
    items, isOpen, count, subtotal, formattedSubtotal,
    addItem, removeItem, updateQuantity, clearCart, toggleCart,
  }
})