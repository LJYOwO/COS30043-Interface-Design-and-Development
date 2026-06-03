<template>
  <div class="min-h-screen py-10" style="background: linear-gradient(160deg, #FDFBF7 0%, #F9E5E5 40%, #EAE2FE 100%);">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-up">
      
      <div class="flex items-center justify-between mb-8">
        <div>
          <p class="text-xs text-[#9DB6A0] uppercase tracking-widest mb-1 font-bold">My Account</p>
          <h1 class="font-serif text-4xl text-ink font-bold drop-shadow-sm">Order History</h1>
        </div>
        <RouterLink to="/catalog" class="px-5 py-2.5 rounded-full border border-white/60 bg-white/40 backdrop-blur-sm text-xs font-bold uppercase tracking-wider text-ink/60 hover:bg-[#CE8280] hover:text-white transition-all shadow-sm">
          Shop Again →
        </RouterLink>
      </div>

      <div class="flex flex-wrap gap-2 mb-8 bg-white/40 backdrop-blur-md p-2 rounded-2xl border border-white/50 w-fit shadow-sm">
        <button
          v-for="filter in statusFilters"
          :key="filter"
          class="px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all"
          :class="activeFilter === filter
            ? 'bg-white text-[#CE8280] shadow-sm'
            : 'text-ink/50 hover:text-ink hover:bg-white/50'"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>

      <div v-if="loading" class="space-y-6">
        <div v-for="n in 3" :key="n" class="h-40 rounded-3xl animate-pulse bg-white/50 border border-white/50"></div>
      </div>

      <div v-else-if="filteredOrders.length === 0" class="text-center py-20 bg-white/60 backdrop-blur-md rounded-3xl border border-white/50 shadow-sm">
        <span class="text-5xl block mb-4 opacity-80 drop-shadow-sm">📦</span>
        <h3 class="font-serif text-xl font-bold text-ink">No orders found</h3>
        <p class="text-sm text-ink/50 mt-2 font-medium">You don't have any {{ activeFilter !== 'All' ? activeFilter.toLowerCase() : '' }} orders yet.</p>
      </div>

      <div v-else class="space-y-6">
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          class="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow duration-300"
        >
          <div class="flex justify-between items-start border-b border-gray-200/50 pb-4 mb-4">
            <div>
              <div class="flex items-center gap-3 flex-wrap">
                <p class="text-[11px] text-ink/50 font-bold uppercase tracking-widest">Order #{{ order.id }}</p>
                <span v-if="order.isGift" class="px-2 py-0.5 rounded bg-rose-100 text-rose-500 text-[9px] font-bold uppercase tracking-widest">Gift</span>
              </div>
              <p class="text-sm font-bold text-ink mt-1">{{ formatDate(order.createdAt) }}</p>
            </div>
            <div class="flex flex-col items-end gap-2">
              <span class="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm" :class="statusClass(order.status)">
                {{ order.status }}
              </span>
              <button 
                v-if="order.status === 'processing' || order.status === 'prepared'"
                @click="cancelOrder(order.id)" 
                :disabled="cancellingId === order.id"
                class="px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-all active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none"
              >
                <span v-if="cancellingId === order.id" class="inline-block w-3 h-3 border-2 border-rose-600/30 border-t-rose-600 rounded-full animate-spin mr-1"></span>
                Cancel Order
              </button>
            </div>
          </div>

          <div class="space-y-4">
            <div v-for="item in order.items" :key="item.productId" class="flex items-center gap-4 bg-white/50 p-3 rounded-2xl border border-cream-100 shadow-sm">
              <div class="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-xs border border-cream-50 flex-shrink-0">
                {{ item.emoji || '🌸' }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-ink truncate">{{ item.name }}</p>
                <p class="text-[10px] text-ink/50 font-bold uppercase tracking-widest mt-0.5">Qty: {{ item.qty || 1 }} · RM {{ parseFloat(item.price).toFixed(2) }}</p>
              </div>
              
              <!-- Rate It Button -->
              <button
                v-if="order.status.toLowerCase() === 'delivered' && !String(item.productId).startsWith('custom')"
                @click="openReview(order.id, item)"
                class="px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 flex-shrink-0"
                :class="item.reviewed 
                  ? 'bg-[#9DB6A0]/20 border-[#9DB6A0] text-[#486B4C] cursor-not-allowed opacity-60' 
                  : 'bg-[#CE8280]/10 border-[#CE8280]/20 text-[#CE8280] hover:bg-[#CE8280] hover:text-white shadow-sm'"
                :disabled="item.reviewed"
              >
                {{ item.reviewed ? '✓ Reviewed' : '★ Rate It' }}
              </button>
            </div>
          </div>

          <div class="border-t border-gray-200/50 mt-4 pt-4 flex justify-between items-center">
            <div>
              <p class="text-[10px] text-ink/50 font-bold uppercase tracking-widest">Delivery To</p>
              <p class="text-xs font-bold text-ink mt-0.5 truncate max-w-[200px] sm:max-w-xs">{{ order.customerName }}</p>
            </div>
            <div class="text-right">
              <p class="text-[10px] text-ink/50 font-bold uppercase tracking-widest">Total Paid</p>
              <p class="text-lg font-serif font-bold text-[#CE8280]">RM {{ parseFloat(order.total).toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Review Modal -->
    <Transition name="fade">
      <div v-if="showReviewModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-ink/40 backdrop-blur-sm" @click="closeReviewModal" />
        <div class="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.1)] max-w-md w-full animate-fade-up">
          
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-sm border border-cream-100 mx-auto mb-4">
              {{ reviewTarget?.emoji || '🌸' }}
            </div>
            <h3 class="font-serif text-2xl font-bold text-ink mb-1">Rate your bloom</h3>
            <p class="text-xs text-ink/50 font-medium">How did you like the <strong>{{ reviewTarget?.productName }}</strong>?</p>
          </div>

          <div class="flex items-center justify-center gap-2 mb-6">
            <button
              v-for="star in 5" :key="star"
              @click="reviewForm.rating = star"
              class="text-4xl transition-transform hover:scale-110 focus:outline-none drop-shadow-sm"
              :class="star <= reviewForm.rating ? 'text-[#CE8280] scale-110' : 'text-cream-200 grayscale hover:text-[#CE8280]/50'"
            >
              ★
            </button>
          </div>

          <textarea
            v-model="reviewForm.comment"
            rows="3"
            placeholder="Share your thoughts with other flower lovers..."
            class="w-full px-4 py-3 bg-white/80 border border-transparent rounded-xl text-sm focus:outline-none focus:border-[#CE8280]/40 focus:ring-2 focus:ring-[#CE8280]/10 transition-all shadow-inner resize-none mb-6 text-ink/80"
          ></textarea>

          <div class="flex gap-3">
            <button @click="closeReviewModal" class="flex-1 py-3 rounded-full border border-cream-200 text-ink/60 text-xs font-bold uppercase tracking-widest hover:bg-cream-50 transition-colors">Cancel</button>
            <button @click="submitReview" :disabled="submittingReview" class="flex-1 py-3 rounded-full bg-[#CE8280] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#B87472] transition-all shadow-petal disabled:opacity-50 flex items-center justify-center gap-2">
              <span v-if="submittingReview" class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              {{ submittingReview ? 'Submitting...' : 'Submit Review' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="toast.show" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white shadow-xl flex items-center gap-2" :style="{ background: toast.type === 'success' ? '#9DB6A0' : '#CE8280' }">
        {{ toast.type === 'success' ? '✓' : '⚠️' }} {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

const userStore = useUserStore()

// ── State ─────────────────────────────────────────────────────────────────
const loading = ref(true)
const allOrders = ref([])
const activeFilter = ref('All')
const statusFilters = ['All', 'Processing', 'Prepared', 'Dispatched', 'Delivered', 'Cancelled']

// Cancel order state
const cancellingId = ref(null)

const toast = ref({ show: false, message: '', type: 'success' })

// Review state
const showReviewModal = ref(false)
const submittingReview = ref(false)
const reviewTarget = ref(null)
const reviewForm = ref({ rating: 5, comment: '' })

// ── Fetch Orders with Review Status ──────────────────────────────────────
async function fetchOrders() {
  if (!userStore.user?.id) return
  loading.value = true
  try {
    const res = await fetch(`/api/orders?userId=${userStore.user.id}`)
    if (res.ok) {
      const json = await res.json()
      const ordersData = json.data || []
      
      // 🔥 CRITICAL FIX: Fetch user's existing reviews to mark already reviewed items
      try {
        const revRes = await fetch(`/api/reviews?userId=${userStore.user.id}`)
        if (revRes.ok) {
          const revJson = await revRes.json()
          const myReviews = revJson.data || []
          
          console.log('[DEBUG] Found reviews:', myReviews.length)
          
          // 🔥 Iterate through orders and mark reviewed items
          for (const order of ordersData) {
            if (order.items && Array.isArray(order.items)) {
              for (const item of order.items) {
                // Check if this specific order item has already been reviewed
                const alreadyReviewed = myReviews.some(review => 
                  review.orderId === order.id && 
                  review.productId === item.productId
                )
                item.reviewed = alreadyReviewed
                
                if (alreadyReviewed) {
                  console.log(`[DEBUG] Marked as reviewed: Order ${order.id}, Product ${item.productId}`)
                }
              }
            }
          }
        }
      } catch (e) {
        console.error('[REVIEWS_FETCH_ERROR]', e)
      }

      allOrders.value = ordersData
    }
  } catch (err) {
    console.error('[FETCH_ORDERS_ERROR]', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchOrders)

// ── Cancel Order Function ────────────────────────────────────────────────
const cancelOrder = async (orderId) => {
  const confirmCancel = confirm("Are you sure you want to cancel this order? This action cannot be undone.")
  if (!confirmCancel) return

  cancellingId.value = orderId
  try {
    const res = await fetch(`/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'cancelled' })
    })

    const result = await res.json()
    if (!res.ok) {
      throw new Error(result.error || 'Failed to cancel order')
    }

    const orderIndex = allOrders.value.findIndex(o => o.id === orderId)
    if (orderIndex !== -1) {
      allOrders.value[orderIndex].status = 'cancelled'
    }
    
    showToast('Order cancelled successfully!', 'success')
  } catch (err) {
    console.error('[CANCEL_ORDER_ERROR]', err)
    showToast(err.message, 'error')
  } finally {
    cancellingId.value = null
  }
}

// ── Computed & Filters ────────────────────────────────────────────────────
const filteredOrders = computed(() => {
  if (activeFilter.value === 'All') return allOrders.value
  return allOrders.value.filter(o => (o.status || '').toLowerCase() === activeFilter.value.toLowerCase())
})

// ── Helpers ───────────────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })
}

function statusClass(status) {
  const map = {
    'delivered':  'bg-[#9DB6A0]/20 text-[#486B4C] border-[#9DB6A0]/30',
    'in_transit': 'bg-[#D4C2FC]/30 text-[#6B4C9A] border-[#D4C2FC]/40',
    'dispatched': 'bg-[#D4C2FC]/30 text-[#6B4C9A] border-[#D4C2FC]/40',
    'processing': 'bg-amber-100 text-amber-700 border-amber-200',
    'prepared':   'bg-blue-100 text-blue-700 border-blue-200',
    'cancelled':  'bg-rose-100 text-rose-700 border-rose-200',
  }
  return map[(status || '').toLowerCase()] || 'bg-cream-200 text-ink/50 border-cream-300'
}

function showToast(message, type = 'success') {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, 3500)
}

// ── Review Functions ──────────────────────────────────────────────────────
function openReview(orderId, item) {
  reviewTarget.value = {
    orderId: orderId,
    productId: item.productId,
    productName: item.name,
    emoji: item.emoji
  }
  reviewForm.value = { rating: 5, comment: '' }
  showReviewModal.value = true
}

function closeReviewModal() {
  if (submittingReview.value) return
  showReviewModal.value = false
  reviewTarget.value = null
}

async function submitReview() {
  if (!reviewForm.value.comment.trim()) {
    showToast('Please share your thoughts in the comment section.', 'error')
    return
  }

  submittingReview.value = true
  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: reviewTarget.value.productId,
        orderId: reviewTarget.value.orderId,
        userId: userStore.user.id,
        userName: userStore.displayName || userStore.user.name || 'Anonymous',
        rating: reviewForm.value.rating,
        comment: reviewForm.value.comment
      })
    })
    
    const json = await res.json()
    
    if (!res.ok) {
      if (res.status === 409) throw new Error('You have already reviewed this item.')
      throw new Error(json.error || 'Failed to submit review.')
    }

    // 🔥 CRITICAL: Update local state to mark the item as reviewed immediately
    const order = allOrders.value.find(o => o.id === reviewTarget.value.orderId)
    if (order) {
      const item = order.items.find(i => i.productId === reviewTarget.value.productId)
      if (item) {
        item.reviewed = true
        console.log(`[DEBUG] Marked as reviewed: Order ${order.id}, Product ${item.productId}`)
      }
    }

    showToast('Review submitted successfully! Your feedback is now live. 🌸')
    
    // 🔥 FIX: Auto-close modal after showing toast
    // Wait a moment for the user to see the success state, then close
    setTimeout(() => {
      closeReviewModal()
    }, 1500) // Closes after 1.5 seconds

  } catch (err) {
    console.error('[SUBMIT_REVIEW_ERROR]', err)
    showToast(err.message, 'error')
    // Don't auto-close on error - let user fix the issue
  } finally {
    submittingReview.value = false
  }
}
</script>

<style scoped>
.toast-enter-active { transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { transition: all 0.2s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(20px); }

.animate-fade-up {
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>