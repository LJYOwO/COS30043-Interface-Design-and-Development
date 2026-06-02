<template>
  <div class="space-y-6">

    <!-- ── Header ────────────────────────────────────────────────────────── -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="font-serif text-2xl text-ink font-bold">Community Moderation</h2>
        <p class="text-sm text-ink/50 mt-0.5">Review reported comments and manage community guidelines.</p>
      </div>
      <button
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cream-200 text-sm font-bold tracking-wider uppercase text-ink/60 hover:bg-[#CE8280] hover:text-white transition-all shadow-sm"
        @click="fetchReviews"
      >
        🔄 Refresh
      </button>
    </div>

    <!-- ── Stats Cards ────────────────────────────────────────────────────── -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div v-for="s in reviewStats" :key="s.label"
           class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-cream-200 shadow-sm">
        <p class="text-xs text-ink/50 mb-1 font-bold uppercase tracking-widest">{{ s.label }}</p>
        <p class="font-serif text-xl font-bold text-[#CE8280]">{{ s.value }}</p>
      </div>
    </div>

    <!-- ── Filter Tabs ────────────────────────────────────────────────────── -->
    <div class="flex flex-wrap bg-white/40 p-1.5 rounded-2xl border border-cream-100 shadow-sm w-fit gap-1">
      <button 
        v-for="f in ['Reported (Action Required)', 'All Comments']" 
        :key="f"
        @click="filterMode = f"
        class="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all"
        :class="filterMode === f ? 'bg-white text-[#CE8280] shadow-sm' : 'text-ink/50 hover:text-ink hover:bg-white/50'">
        {{ f }}
      </button>
    </div>

    <!-- ── Loading State ──────────────────────────────────────────────────── -->
    <div v-if="loading" class="space-y-4">
      <div v-for="n in 3" :key="n" class="h-32 rounded-3xl animate-pulse bg-cream-200/50 border border-cream-200" />
    </div>

    <!-- ── Error State ────────────────────────────────────────────────────── -->
    <div v-else-if="error" class="text-center py-12 text-rose-500 font-medium bg-rose-50 rounded-2xl border border-rose-100">
      ⚠️ {{ error }}
    </div>

    <!-- ── Empty State ────────────────────────────────────────────────────── -->
    <div v-else-if="reviews.length === 0" class="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl border border-cream-200 shadow-sm">
      <span class="text-5xl block mb-4 opacity-50">✨</span>
      <h3 class="font-serif text-xl font-bold text-ink">All Clear!</h3>
      <p class="text-sm text-ink/50 mt-2 font-medium">No reported comments require your attention.</p>
    </div>

    <!-- ── Reviews List ───────────────────────────────────────────────────── -->
    <div v-else class="grid grid-cols-1 gap-4">
      <div v-for="review in reviews" :key="review.id" class="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all" :class="review.isReported ? 'border-rose-300' : 'border-cream-200'">
        
        <!-- Review Header -->
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-inner" :style="{ background: avatarColor(review.userName), color: 'white' }">
              {{ review.userName?.[0]?.toUpperCase() || 'A' }}
            </div>
            <div>
              <p class="font-bold text-ink">{{ review.userName }}</p>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-[10px] text-ink/40 font-bold uppercase tracking-widest">{{ formatDate(review.createdAt) }}</span>
                <span v-if="review.isVerified" class="text-[8px] px-1.5 py-0.5 bg-[#9DB6A0]/20 text-[#486B4C] rounded font-bold uppercase tracking-widest">
                  Verified Buyer ✓
                </span>
              </div>
            </div>
          </div>
          <!-- Rating Stars -->
          <div v-if="review.rating" class="text-[#CE8280] text-sm tracking-widest">
            <span v-for="n in review.rating" :key="n">★</span>
          </div>
        </div>

        <!-- Report Reason Banner (if reported) -->
        <div v-if="review.isReported" class="mb-4 bg-rose-50 border border-rose-200 p-3 rounded-xl flex items-start gap-3">
          <span class="text-rose-500 mt-0.5 text-base">⚠️</span>
          <div>
            <p class="text-[10px] font-bold uppercase tracking-widest text-rose-600 mb-0.5">Reported for:</p>
            <p class="text-sm text-rose-800 font-medium">{{ review.reportReason || 'No reason provided' }}</p>
          </div>
        </div>

        <!-- Comment Content -->
        <div class="bg-cream-50/50 p-4 rounded-2xl border border-cream-100">
          <p class="text-sm text-ink/80 leading-relaxed font-medium">"{{ review.comment }}"</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-between mt-5 pt-4 border-t border-cream-100">
          <p class="text-[10px] text-ink/40 font-bold uppercase tracking-widest">Product ID: #{{ review.productId }}</p>
          <div class="flex gap-3">
            <!-- Dismiss Report Button (only for reported reviews) -->
            <button 
              v-if="review.isReported" 
              @click="dismissReport(review)" 
              class="px-4 py-2 rounded-full border border-cream-200 bg-white text-ink/60 text-[10px] font-bold uppercase tracking-widest hover:bg-[#9DB6A0] hover:text-white hover:border-[#9DB6A0] transition-colors shadow-sm">
              Dismiss Report ✓
            </button>
            <!-- Delete Button -->
            <button 
              @click="deleteReview(review.id)" 
              class="px-4 py-2 rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-colors shadow-sm">
              Delete Comment ✕
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Toast Notification ──────────────────────────────────────────────── -->
    <Transition name="toast">
      <div v-if="toast.show" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white shadow-lg flex items-center gap-2" :style="{ background: toast.type === 'success' ? '#9DB6A0' : '#CE8280' }">
        {{ toast.type === 'success' ? '✓' : '⚠️' }} {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'

// ── State ─────────────────────────────────────────────────────────────────
const reviews = ref([])
const loading = ref(true)
const error = ref('')
const filterMode = ref('Reported (Action Required)')
const toast = ref({ show: false, message: '', type: 'success' })

// ── Toast Helper ──────────────────────────────────────────────────────────
function showToast(message, type = 'success') {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, 3000)
}

// ── Fetch Reviews (with cache-busting) ────────────────────────────────────
async function fetchReviews() {
  loading.value = true
  error.value = ''
  try {
    // 🔥 If "Reported" mode is selected, only fetch reviews marked as reported
    const isReported = filterMode.value === 'Reported (Action Required)'
    const url = isReported 
      ? `/api/reviews?reported=true&_t=${Date.now()}`
      : `/api/reviews?status=all&_t=${Date.now()}`
    
    const res = await fetch(url, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    reviews.value = json.data || []
  } catch (e) {
    error.value = 'Failed to load reviews: ' + e.message
  } finally {
    loading.value = false
  }
}

// Watch for filter mode changes and refresh data
watch(filterMode, () => fetchReviews())
onMounted(fetchReviews)

// ── Computed Stats ────────────────────────────────────────────────────────
const reviewStats = computed(() => [
  { label: 'Reported', value: reviews.value.filter(r => r.isReported).length },
  { label: 'All Reviews', value: reviews.value.length },
  { label: 'Pending Reviews', value: reviews.value.filter(r => r.status === 'pending').length },
  { label: 'Avg Rating', value: (() => {
    const approved = reviews.value.filter(r => r.status === 'approved' && r.rating)
    if (!approved.length) return '—'
    return (approved.reduce((s, r) => s + r.rating, 0) / approved.length).toFixed(1)
  })() },
])

// ── Dismiss Report (clears reported flag) ─────────────────────────────────
async function dismissReport(review) {
  try {
    const res = await fetch(`/api/reviews/${review.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dismissReport: true }) // Backend supports this special field
    })
    if (!res.ok) throw new Error('Failed to dismiss report.')
    
    // If currently in "Reported" view, remove from list
    if (filterMode.value === 'Reported (Action Required)') {
      reviews.value = reviews.value.filter(r => r.id !== review.id)
    } else {
      review.isReported = false
      review.reportReason = null
    }
    showToast('Report dismissed. Comment restored.', 'success')
  } catch (err) {
    showToast(err.message, 'error')
  }
}

// ── Delete Review (permanently) ───────────────────────────────────────────
async function deleteReview(id) {
  if (!confirm('Are you sure you want to permanently delete this comment? This action cannot be undone.')) return
  
  try {
    const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Delete failed.')
    reviews.value = reviews.value.filter(r => r.id !== id)
    showToast('Comment permanently deleted.', 'success')
  } catch (err) {
    showToast(err.message, 'error')
  }
}

// ── Helper Functions ──────────────────────────────────────────────────────
function avatarColor(name) {
  const colors = ['#CE8280', '#9DB6A0', '#D4C2FC', '#E8D08A', '#7D9E81', '#C97A79']
  return colors[(name?.charCodeAt(0) || 0) % colors.length]
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-MY', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.toast-enter-active { transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { transition: all 0.2s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(16px); }
</style>