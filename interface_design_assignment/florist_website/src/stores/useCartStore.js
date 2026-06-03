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
  const count = computed(() => items.value.reduce((n, i) => n + i.quantity, 0))
  const subtotal = computed(() => items.value.reduce((s, i) => s + i.price * i.quantity, 0))
  const formattedSubtotal = computed(() => `RM ${subtotal.value.toFixed(2)}`)

  // ── Helper function to generate item key ─────────────────────────────────
  function generateItemKey(productId, customization = null) {
    if (customization) {
      // For customized bouquets, create a unique key based on flower composition
      const customKey = customization.flowers?.map(f => `${f.id}-${f.slotId}`).join(',') || Date.now().toString()
      return `${productId}-custom-${customKey}`
    }
    return String(productId)
  }

  // ── 🔥 FIXED: Smart add with quantity merging  ─────────────
  function addItem(product, quantity = 1, customization = null) {
    // 1. Generate a unique key for this item
    const key = generateItemKey(product.id, customization)
    
    // 2. 🔥 CRITICAL FIX: Check if this exact item already exists in the cart
    const existingItem = items.value.find(i => i.key === key)
    
    if (existingItem) {
      // 3. Item exists → merge quantities 
      existingItem.quantity += quantity
      console.log(`[CART] Updated quantity for ${product.name}: ${existingItem.quantity}`)
    } else {
      // 4. New item → add to cart with quantity property
      const newItem = { 
        key, 
        ...product, 
        quantity: quantity  
      }
      items.value.push(newItem)
      console.log(`[CART] Added new item: ${product.name} × ${quantity}`)
    }
    
    // 5. Open cart drawer
    isOpen.value = true
  }

  // ── Remove item completely from cart ─────────────────────────────────────
  function removeItem(key) {
    items.value = items.value.filter(i => i.key !== key)
    console.log(`[CART] Removed item with key: ${key}`)
  }

  // ── Update quantity (or remove if quantity < 1) ──────────────────────────
  function updateQuantity(key, quantity) {
    if (quantity < 1) {
      removeItem(key)
      return
    }
    const item = items.value.find(i => i.key === key)
    if (item) {
      item.quantity = quantity
      console.log(`[CART] Updated quantity for ${item.name}: ${quantity}`)
    }
  }

  // ── Clear entire cart ────────────────────────────────────────────────────
  function clearCart() {
    items.value = []
    localStorage.removeItem(STORAGE_KEY)
    console.log('[CART] Cleared all items')
  }

  // ── Toggle cart drawer visibility ───────────────────────────────────────
  function toggleCart() {
    isOpen.value = !isOpen.value
  }

  return {
    items,
    isOpen,
    count,
    subtotal,
    formattedSubtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
  }
})