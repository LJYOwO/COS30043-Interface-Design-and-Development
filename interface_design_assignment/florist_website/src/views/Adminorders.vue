<template>
  <div class="space-y-6">

    <!-- ── Header ────────────────────────────────────────────────────────── -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="font-serif text-2xl text-ink font-bold">Orders</h2>
        <p class="text-sm text-ink/50 mt-0.5">Manage customer orders and update delivery status.</p>
      </div>
      <button
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cream-200 text-sm text-ink/60 hover:bg-cream-200 transition-colors"
        @click="fetchOrders"
      >
        🔄 Refresh
      </button>
    </div>

    <!-- ── Stats Cards (includes Delivered count) ────────────────────────── -->
    <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
      <div v-for="s in orderStats" :key="s.label"
           class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-cream-200">
        <p class="text-xs text-ink/50 mb-1">{{ s.label }}</p>
        <p class="font-serif text-xl font-bold text-ink">{{ s.value }}</p>
      </div>
    </div>

    <!-- ── Toolbar ────────────────────────────────────────────────────────── -->
    <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div class="flex items-center gap-3 flex-wrap">
        <!-- Search -->
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
          </svg>
          <input v-model="search" type="text" placeholder="Search orders…"
            class="pl-9 pr-4 py-2 text-sm bg-white/70 border border-cream-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CE8280]/30 w-52"/>
        </div>

        <!-- Status Filter with Delivered option -->
        <select v-model="statusFilter"
          class="text-xs bg-white/70 border border-cream-200 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CE8280]/30 cursor-pointer">
          <option value="">All Status</option>
          <option value="processing">🟡 Processing</option>
          <option value="prepared">🔵 Prepared</option>
          <option value="dispatched">🟣 Dispatched</option>
          <option value="delivered">✅ Delivered</option>
          <option value="cancelled">❌ Cancelled</option>
        </select>
      </div>
      <p class="text-xs text-ink/40">{{ filteredOrders.length }} orders</p>
    </div>

    <!-- ── Loading ────────────────────────────────────────────────────────── -->
    <div v-if="loading" class="space-y-3">
      <div v-for="n in 5" :key="n" class="h-24 rounded-3xl animate-pulse bg-cream-200"/>
    </div>

    <!-- ── Error ─────────────────────────────────────────────────────────── -->
    <div v-else-if="error" class="text-center py-12 rounded-3xl bg-white/60 border border-cream-200">
      <p class="text-4xl mb-2">⚠️</p>
      <p class="text-sm text-ink/50 mb-3">{{ error }}</p>
      <button class="text-xs text-sage underline" @click="fetchOrders">Retry</button>
    </div>

    <!-- ── Orders list ────────────────────────────────────────────────────── -->
    <div v-else class="space-y-4">
      <div
        v-for="order in filteredOrders"
        :key="order.id"
        class="bg-white/60 backdrop-blur-sm rounded-3xl border border-cream-200 overflow-hidden hover:shadow-glass transition-all"
      >
        <!-- Order header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-cream-100">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0"
                 style="background:linear-gradient(135deg,#fde8e8,#f9d4d4)">
              💐
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <p class="font-serif font-semibold text-ink text-sm">Order #{{ order.id }}</p>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-medium" :class="statusBadge(order.status)">
                  {{ statusLabel(order.status) }}
                </span>
                <span v-if="order.isGift" class="px-2 py-0.5 rounded-full bg-lavender/20 text-lavender-400 text-[10px] font-medium">
                  🎁 Gift
                </span>
              </div>
              <p class="text-xs text-ink/50 mt-0.5">
                {{ order.customerName }} · {{ order.email }}
                <span v-if="order.phone" class="ml-1">· {{ order.phone }}</span>
              </p>
            </div>
          </div>

          <div class="flex items-center gap-4 flex-wrap">
            <div class="text-right">
              <p class="text-sm font-bold text-ink">RM {{ order.total?.toFixed(2) }}</p>
              <p class="text-[10px] text-ink/40">{{ formatDate(order.createdAt) }}</p>
            </div>

            <!-- Status update dropdown (disabled for Delivered and Cancelled) -->
            <div class="flex items-center gap-2">
              <select
                :value="order.status"
                class="text-xs border border-cream-200 rounded-full px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#CE8280]/30 cursor-pointer"
                :disabled="order.status === 'delivered' || order.status === 'cancelled' || updatingId === order.id"
                @change="updateStatus(order, $event.target.value)"
              >
                <option value="processing">🟡 Processing</option>
                <option value="prepared">🔵 Prepared</option>
                <option value="dispatched">🟣 Dispatched</option>
                <option value="delivered">✅ Delivered</option>
                <option value="cancelled">❌ Cancelled</option>
              </select>
              <span v-if="updatingId === order.id" class="w-4 h-4 border-2 border-sage/30 border-t-sage rounded-full animate-spin flex-shrink-0"/>
            </div>
          </div>
        </div>

        <!-- Order body: items + delivery info -->
        <div class="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">

          <!-- Items -->
          <div>
            <p class="text-[10px] text-ink/40 uppercase tracking-wide font-semibold mb-2">Items</p>
            <div class="space-y-1.5">
              <div v-for="item in order.items" :key="item.productId || item.name"
                   class="flex items-center justify-between text-xs text-ink/70">
                <span>{{ item.emoji || '🌸' }} {{ item.name }}</span>
                <span class="font-medium">× {{ item.qty }} · RM {{ (item.price * item.qty).toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Delivery info -->
          <div class="space-y-2">
            <p class="text-[10px] text-ink/40 uppercase tracking-wide font-semibold">Delivery</p>
            <div class="text-xs text-ink/70 space-y-1">
              <p>📍 {{ order.address }}</p>
              <p v-if="order.deliveryDate">📅 {{ order.deliveryDate }} · {{ order.deliverySlot }}</p>
              <p v-if="order.notes">📝 {{ order.notes }}</p>
              <p v-if="order.giftMessage" class="text-lavender-400 italic">🎁 "{{ order.giftMessage }}"</p>
              <p>💳 {{ paymentLabel(order.payment) }}</p>
            </div>
          </div>
        </div>

        <!-- Tracking timeline -->
        <div v-if="order.status !== 'cancelled'" class="px-5 pb-5">
          <div class="flex items-center gap-1 overflow-x-auto pb-1">
            <template v-for="(step, i) in TRACKING_STEPS" :key="step.key">

              <!-- Step circle + label -->
              <div class="flex flex-col items-center gap-1 flex-shrink-0">
                <div
                  class="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all shadow-sm"
                  :style="stepCircleStyle(order.status, i)"
                >
                  {{ isStepDone(order.status, i) ? '✓' : i + 1 }}
                </div>
                <span
                  class="text-[10px] whitespace-nowrap font-medium transition-colors"
                  :style="{ color: isStepActive(order.status, i) || isStepDone(order.status, i) ? '#2C2C2C' : 'rgba(44,44,44,0.35)' }"
                >
                  {{ step.label }}
                </span>
              </div>

              <!-- Connector line between steps -->
              <div
                v-if="i < TRACKING_STEPS.length - 1"
                class="flex-1 h-0.5 min-w-6 rounded-full transition-all mt-[-14px]"
                :style="{ background: isStepDone(order.status, i) ? '#9DB6A0' : '#F5EFE2' }"
              />
            </template>
          </div>
        </div>

        <div v-else class="px-5 pb-4">
          <span class="text-xs font-medium px-3 py-1 rounded-full" style="background:#fee2e2; color:#ef4444;">
            ✕ Order Cancelled
          </span>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="filteredOrders.length === 0 && !loading" class="text-center py-16 rounded-3xl bg-white/60 border border-cream-200">
        <span class="text-4xl block mb-3">📦</span>
        <p class="font-serif text-xl text-ink/40">No orders found</p>
      </div>
    </div>

    <!-- ── Toast ──────────────────────────────────────────────────────────── -->
    <Transition name="toast">
      <div v-if="toast.show"
           class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full text-sm font-medium text-white shadow-lg flex items-center gap-2 whitespace-nowrap"
           :style="{ background: toast.type === 'success' ? '#9DB6A0' : '#CE8280' }">
        {{ toast.type === 'success' ? '✓' : '✕' }} {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// ── Constants ─────────────────────────────────────────────────────────────
const TRACKING_STEPS = [
  { key: 'processing', label: 'Ordered'    },
  { key: 'prepared',   label: 'Prepared'   },
  { key: 'dispatched', label: 'Dispatched' },
  { key: 'delivered',  label: 'Delivered'  },
]
const STEP_MAP = { processing: 0, prepared: 1, dispatched: 2, delivered: 3, cancelled: -1 }

// ── State ─────────────────────────────────────────────────────────────────
const orders      = ref([])
const loading     = ref(false)
const error       = ref('')
const search      = ref('')
const statusFilter = ref('')
const updatingId  = ref(null)
const toast       = ref({ show: false, message: '', type: 'success' })

// ── Toast ─────────────────────────────────────────────────────────────────
function showToast(message, type = 'success') {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, 3000)
}

// ── API ───────────────────────────────────────────────────────────────────
async function apiFetch(url, options = {}) {
  const res  = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`)
  return json
}

// 🔥 CORE FIX: Cache-Busting with timestamp and no-cache headers
async function fetchOrders() {
  loading.value = true
  error.value   = ''
  try {
    // Add timestamp query parameter to force fresh request
    // Also add cache-control headers to prevent browser caching
    const res = await fetch(`/api/orders?_t=${Date.now()}`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    orders.value = (json.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    console.log('[Admin Orders] Synced:', orders.value.length, 'orders')
  } catch (e) {
    error.value = 'Failed to load orders: ' + e.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchOrders)

// ── Computed ──────────────────────────────────────────────────────────────
const filteredOrders = computed(() =>
  orders.value.filter(o => {
    const matchSearch = !search.value ||
      String(o.id).includes(search.value) ||
      o.customerName?.toLowerCase().includes(search.value.toLowerCase()) ||
      o.email?.toLowerCase().includes(search.value.toLowerCase())
    const matchStatus = !statusFilter.value || o.status === statusFilter.value
    return matchSearch && matchStatus
  })
)

// 🔥 Updated stats cards with Delivered count
const orderStats = computed(() => [
  { label: 'Total Orders',   value: orders.value.length },
  { label: 'Processing',     value: orders.value.filter(o => o.status === 'processing').length },
  { label: 'Prepared',       value: orders.value.filter(o => o.status === 'prepared').length },
  { label: 'Dispatched',     value: orders.value.filter(o => o.status === 'dispatched').length },
  { label: '✅ Delivered',   value: orders.value.filter(o => o.status === 'delivered').length },
])

// ── Update order status ───────────────────────────────────────────────────
async function updateStatus(order, newStatus) {
  if (order.status === newStatus) return
  updatingId.value = order.id
  try {
    const json = await apiFetch(`/api/orders/${order.id}/status`, {
      method: 'PATCH',
      body:   JSON.stringify({ status: newStatus }),
    })
    // Update locally
    const idx = orders.value.findIndex(o => o.id === order.id)
    if (idx !== -1) orders.value[idx] = { ...orders.value[idx], ...json.data }
    showToast(`Order #${order.id} marked as "${statusLabel(newStatus)}"`)
  } catch (e) {
    showToast('Update failed: ' + e.message, 'error')
  } finally {
    updatingId.value = null
  }
}

// ── Tracking step helpers ─────────────────────────────────────────────────
function trackingStep(status) { return STEP_MAP[status] ?? 0 }

// Step i is fully DONE (green) — current step index is PAST i
function isStepDone(status, i) {
  const current = STEP_MAP[status] ?? 0
  // For 'delivered' (step 3), all steps including 3 are done
  return status === 'delivered' ? true : current > i
}

// Step i is the CURRENT active step (blush/pink)
function isStepActive(status, i) {
  if (status === 'delivered') return false // all done, none "active"
  return (STEP_MAP[status] ?? 0) === i
}

// Returns inline style object for the step circle
function stepCircleStyle(status, i) {
  if (isStepDone(status, i)) {
    // Completed — sage green
    return { background: '#9DB6A0', color: 'white', boxShadow: '0 1px 4px rgba(157,182,160,0.4)' }
  }
  if (isStepActive(status, i)) {
    // Current — blush pink
    return { background: '#CE8280', color: 'white', boxShadow: '0 1px 6px rgba(206,130,128,0.45)' }
  }
  // Pending — light grey
  return { background: '#F5EFE2', color: 'rgba(44,44,44,0.35)' }
}

function statusLabel(status) {
  const map = {
    processing: 'Processing',
    prepared:   'Prepared',
    dispatched: 'Dispatched',
    delivered:  'Delivered',
    cancelled:  'Cancelled',
    in_transit: 'In Transit',
  }
  return map[status] || status
}

function statusBadge(status) {
  const map = {
    processing: 'bg-amber-100 text-amber-600',
    prepared:   'bg-lavender/30 text-lavender-400',
    dispatched: 'bg-blue-100 text-blue-500',
    delivered:  'bg-sage/20 text-sage-500',
    cancelled:  'bg-red-100 text-red-500',
    in_transit: 'bg-blue-100 text-blue-500',
  }
  return map[status] || 'bg-cream-200 text-ink/50'
}

function paymentLabel(payment) {
  const map = {
    online_banking: '🏦 Online Banking',
    card:           '💳 Card',
    ewallet:        '📱 e-Wallet',
    cod:            '💵 Cash on Delivery',
  }
  return map[payment] || payment || '—'
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-MY', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}
</script>

<style scoped>
.toast-enter-active { transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1); }
.toast-leave-active  { transition: all 0.2s ease; }
.toast-enter-from,
.toast-leave-to      { opacity: 0; transform: translateX(-50%) translateY(16px); }
</style>