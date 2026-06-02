<template>
  <div class="min-h-screen py-10" style="background: linear-gradient(160deg, #FDFBF7 0%, #F9E5E5 40%, #EAE2FE 100%);">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Breadcrumb Navigation -->
      <nav class="flex items-center gap-2 text-xs text-ink/40 mb-8 font-bold uppercase tracking-widest">
        <RouterLink to="/" class="hover:text-[#CE8280] transition-colors">Home</RouterLink>
        <span>/</span>
        <RouterLink to="/catalog" class="hover:text-[#CE8280] transition-colors">Catalog</RouterLink>
        <span>/</span>
        <span class="text-[#CE8280]">{{ product?.name ?? '…' }}</span>
      </nav>

      <!-- ── Loading skeleton ─────────────────────────────────────────── -->
      <div v-if="loading" class="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
        <div class="space-y-4">
          <div class="rounded-3xl h-96 lg:h-[500px] bg-white/40 border border-white/50" />
        </div>
        <div class="space-y-4 pt-4">
          <div class="h-4 bg-white/40 rounded-full w-1/4" />
          <div class="h-8 bg-white/40 rounded-full w-3/4" />
          <div class="h-24 bg-white/40 rounded-2xl w-full mt-8" />
        </div>
      </div>

      <!-- ── Error state ──────────────────────────────────────────────── -->
      <div v-else-if="error" class="text-center py-24">
        <span class="text-5xl block mb-4">🌾</span>
        <p class="font-serif text-xl text-ink/50 mb-2">{{ error }}</p>
        <RouterLink to="/catalog" class="text-sm text-blush hover:text-blush-500 transition-colors underline">
          Back to Catalog
        </RouterLink>
      </div>

      <!-- ── Product content ──────────────────────────────────────────── -->
      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        <!-- Image / Visual Section -->
        <div class="space-y-4">
          <div class="aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60 relative bg-white/40 backdrop-blur-sm flex items-center justify-center">
            <img v-if="currentImage" :src="currentImage" class="w-full h-full object-cover transition-opacity duration-500" />
            <span v-else class="text-9xl">{{ product.emoji || '🌸' }}</span>
            <span class="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest text-ink shadow-sm">
              {{ product.category }}
            </span>
          </div>

          <div v-if="validImages.length > 1" class="grid grid-cols-5 gap-3">
            <button 
              v-for="(img, idx) in validImages" :key="idx" 
              @click="currentImage = img"
              class="aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-white/40"
              :class="currentImage === img ? 'border-[#CE8280] shadow-md scale-105' : 'border-transparent hover:border-[#CE8280]/40 opacity-70 hover:opacity-100'"
            >
              <img :src="img" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="flex flex-col pt-2">
          <h1 class="text-4xl sm:text-5xl font-serif font-bold text-ink mb-4 leading-tight drop-shadow-sm">{{ product.name }}</h1>
          
          <div class="flex items-center gap-4 mb-6">
            <span class="text-3xl font-bold text-[#CE8280]">RM {{ parseFloat(product.price).toFixed(2) }}</span>
            <span v-if="product.stock > 0" class="px-3 py-1.5 bg-[#9DB6A0]/20 text-[#486B4C] border border-[#9DB6A0]/30 text-[10px] rounded-full font-bold uppercase tracking-wider shadow-sm">
              In Stock ({{ product.stock }})
            </span>
            <span v-else class="px-3 py-1.5 bg-rose-100/50 text-rose-600 border border-rose-200 text-[10px] rounded-full font-bold uppercase tracking-wider shadow-sm">
              Sold Out
            </span>
          </div>

          <p class="text-ink/70 text-sm leading-relaxed mb-6 font-medium">{{ product.desc }}</p>

          <!-- Tags & Metadata -->
          <div class="flex flex-wrap gap-2 mb-8">
            <span v-for="tag in product.tags" :key="tag" class="px-3 py-1 bg-white/60 border border-white/50 text-ink/60 text-[10px] uppercase font-bold tracking-widest rounded-lg shadow-sm">#{{ tag }}</span>
            <span v-for="season in product.seasons" :key="season" class="px-3 py-1 bg-[#CE8280]/10 border border-[#CE8280]/20 text-[#CE8280] text-[10px] uppercase font-bold tracking-widest rounded-lg shadow-sm">{{ season }}</span>
          </div>

          <!-- Stem Composition -->
          <div v-if="product.stems?.length" class="bg-white/60 backdrop-blur-xl p-5 rounded-2xl border border-white/50 mb-6">
            <h3 class="font-serif text-sm font-semibold text-ink mb-3 text-[#9DB6A0]">Stem Composition</h3>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="stem in product.stems" :key="stem.name" class="flex items-center gap-2 bg-white/80 p-2 rounded-xl">
                <span class="text-xl">{{ stem.emoji || '🌸' }}</span>
                <span class="text-xs font-medium text-ink/80">{{ stem.name }}</span>
              </div>
            </div>
          </div>

          <!-- Size selection -->
          <div v-if="product.sizes?.length" class="mb-6">
            <h3 class="font-serif text-sm font-semibold text-ink mb-2">Choose Size</h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="size in product.sizes"
                :key="size.name"
                @click="selectedSize = size.name"
                class="px-4 py-2 rounded-full text-sm font-medium transition-all border"
                :class="selectedSize === size.name 
                  ? 'bg-[#CE8280] text-white border-[#CE8280]' 
                  : 'bg-white/60 text-ink/70 border-white/50 hover:bg-white/80'"
              >
                {{ size.name }} - RM {{ size.price }}
              </button>
            </div>
          </div>

          <!-- Add to Cart -->
          <div class="bg-white/60 backdrop-blur-xl p-5 rounded-2xl border border-white/50 mb-6">
            <div class="flex items-center gap-4">
              <div class="flex items-center bg-white/80 rounded-full border border-cream-200">
                <button @click="qty = Math.max(1, qty - 1)" class="w-10 h-10 flex items-center justify-center text-ink/50 hover:text-[#CE8280] transition-colors font-bold">−</button>
                <span class="w-8 text-center text-sm font-bold text-ink">{{ qty }}</span>
                <button @click="qty++" class="w-10 h-10 flex items-center justify-center text-ink/50 hover:text-[#CE8280] transition-colors font-bold">+</button>
              </div>
              
              <button 
                @click="addToCart" 
                class="flex-1 py-3 rounded-full bg-[#CE8280] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#B87472] transition-all shadow-petal hover:-translate-y-0.5"
              >
                Add to Cart 🌸
              </button>
            </div>
          </div>

          <!-- Product Story -->
          <div v-if="product.fullDesc" class="p-5 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50">
            <h4 class="font-bold text-[10px] uppercase tracking-widest text-[#9DB6A0] mb-2">The Story</h4>
            <p class="text-sm text-ink/70 leading-relaxed">{{ product.fullDesc }}</p>
          </div>
        </div>
      </div>

      <!-- ════════════════════════════════════════════════════════════════════
           COMMUNITY REVIEWS SECTION
      ════════════════════════════════════════════════════════════════════════ -->
      <div v-if="product" class="mt-20 pt-16 border-t border-[#CE8280]/20">
        <div class="text-center mb-10">
          <p class="text-[10px] font-bold text-[#9DB6A0] uppercase tracking-widest mb-2">Community Voice</p>
          <h2 class="font-serif text-3xl font-bold text-ink">Reviews & Stories</h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <!-- ── Review Submission Form ───────────────────────────────────── -->
          <div class="lg:col-span-1">
            <div class="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sticky top-24">
              <h3 class="font-serif text-lg font-bold text-ink mb-2">Leave a Note</h3>
              <p class="text-xs text-ink/50 font-medium mb-6">Bought this bloom? Leave a rating. Just browsing? Feel free to drop a comment!</p>
              
              <!-- Rating Stars -->
              <div class="mb-4">
                <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/60 mb-2">Rating (Verified Only)</label>
                <div class="flex gap-1">
                  <button v-for="star in 5" :key="star" @click="reviewDraft.rating = star"
                    class="text-2xl transition-transform hover:scale-110 focus:outline-none"
                    :class="star <= reviewDraft.rating ? 'text-[#CE8280]' : 'text-white drop-shadow-none'">
                    ★
                  </button>
                </div>
              </div>

              <!-- Comment Input -->
              <div class="mb-5">
                <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/60 mb-2">Your Story *</label>
                <textarea v-model="reviewDraft.comment" rows="4" placeholder="Beautiful arrangement, smells amazing..."
                  class="w-full px-4 py-3 bg-white/80 border border-transparent rounded-xl text-sm focus:outline-none focus:border-[#CE8280]/40 focus:ring-2 focus:ring-[#CE8280]/10 transition-all shadow-inner resize-none text-ink/80 font-medium"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button @click="submitReview" :disabled="submitting"
                class="w-full py-3.5 rounded-full bg-[#CE8280] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#B87472] transition-all shadow-petal disabled:opacity-50 flex items-center justify-center gap-2">
                <span v-if="submitting" class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Post Comment
              </button>
            </div>
          </div>

          <!-- ── Reviews List ───────────────────────────────────────────────── -->
          <div class="lg:col-span-2 space-y-4">
            <div v-if="reviewsLoading" class="h-40 bg-white/40 rounded-3xl animate-pulse border border-white/50"></div>
            
            <div v-else-if="reviews.length === 0" class="text-center py-16 bg-white/40 rounded-3xl border border-white/50">
              <span class="text-4xl block mb-2 opacity-50">🍃</span>
              <p class="text-sm font-bold text-ink/50 uppercase tracking-widest">No stories yet. Be the first!</p>
            </div>
            
            <div v-else v-for="review in reviews" :key="review.id" class="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-sm hover:shadow-md transition-shadow">
              
              <!-- Review Header -->
              <div class="flex justify-between items-start mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-[#CE8280]/10 flex items-center justify-center text-[#CE8280] font-bold shadow-inner">
                    {{ review.userName?.[0]?.toUpperCase() || 'A' }}
                  </div>
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <p class="text-sm font-bold text-ink">{{ review.userName }}</p>
                      <span v-if="review.isVerified" class="bg-[#9DB6A0]/20 text-[#486B4C] text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded shadow-sm border border-[#9DB6A0]/30">
                        Verified Buyer ✓
                      </span>
                    </div>
                    <div v-if="review.rating" class="flex text-[#CE8280] text-xs mt-0.5">
                      <span v-for="n in review.rating" :key="n">★</span>
                    </div>
                  </div>
                </div>
                <p class="text-[10px] text-ink/40 font-bold uppercase tracking-widest">{{ formatDate(review.createdAt) }}</p>
              </div>

              <!-- Edit Mode or Display Mode -->
              <div v-if="editingId === review.id" class="mb-4">
                <textarea v-model="editDraft" rows="2" class="w-full px-3 py-2 bg-white/80 border border-[#CE8280]/40 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#CE8280] transition-all shadow-inner resize-none text-ink/80 font-medium"></textarea>
                <div class="flex gap-2 mt-2 justify-end">
                  <button @click="editingId = null" class="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-ink/50 hover:bg-white/50">Cancel</button>
                  <button @click="saveEdit(review)" class="px-3 py-1.5 rounded-full bg-[#9DB6A0] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">Save</button>
                </div>
              </div>
              <p v-else class="text-sm text-ink/70 leading-relaxed font-medium mb-4">{{ review.comment }}</p>

              <!-- Review Actions (Like, Edit, Delete, Report) -->
              <div class="flex items-center justify-between border-t border-cream-100 pt-3">
                
                <!-- 🔥 Like Button with Real API Call -->
                <button @click="toggleLike(review)" class="flex items-center gap-1.5 text-xs font-bold transition-colors" :class="review._liked ? 'text-rose-500' : 'text-ink/40 hover:text-rose-400'">
                  <span class="text-base transition-transform" :class="review._liked ? 'scale-110 animate-bounce' : ''">{{ review._liked ? '♥' : '♡' }}</span>
                  <span>{{ review._likesCount }}</span>
                </button>

                <!-- Owner Actions (Edit/Delete) -->
                <div v-if="userStore.user?.id === review.userId" class="flex gap-3">
                  <button @click="startEdit(review)" class="text-[10px] font-bold uppercase tracking-widest text-ink/40 hover:text-[#CE8280] transition-colors">Edit</button>
                  <button @click="deleteReview(review.id)" class="text-[10px] font-bold uppercase tracking-widest text-ink/40 hover:text-rose-500 transition-colors">Delete</button>
                </div>
                
                <!-- Report Button (for other users) -->
                <div v-else-if="userStore.isLoggedIn">
                  <button @click="openReport(review.id)" class="text-[10px] font-bold uppercase tracking-widest text-ink/30 hover:text-rose-500 transition-colors">⚠ Report</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Report Modal ────────────────────────────────────────────────────── -->
    <Transition name="fade">
      <div v-if="reportModal.show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-ink/40 backdrop-blur-sm" @click="reportModal.show = false" />
        <div class="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.1)] max-w-sm w-full animate-fade-up">
          <h3 class="font-serif text-xl font-bold text-ink mb-1 text-center">Report Comment</h3>
          <p class="text-xs text-ink/50 font-medium mb-6 text-center">Please select a reason for reporting.</p>
          
          <div class="space-y-2 mb-6">
            <label v-for="reason in reportReasons" :key="reason" class="flex items-center gap-3 p-3 rounded-xl border border-cream-200 cursor-pointer hover:bg-white/50 transition-colors" :class="reportModal.reason === reason ? 'border-rose-400 bg-rose-50/50' : ''">
              <input type="radio" :value="reason" v-model="reportModal.reason" class="text-rose-500 focus:ring-rose-500/30" />
              <span class="text-sm font-bold text-ink/70">{{ reason }}</span>
            </label>
          </div>

          <div class="flex gap-3">
            <button @click="reportModal.show = false" class="flex-1 py-3 rounded-full border border-cream-200 text-ink/60 text-xs font-bold uppercase tracking-widest hover:bg-cream-50 transition-colors">Cancel</button>
            <button @click="submitReport" :disabled="!reportModal.reason" class="flex-1 py-3 rounded-full bg-rose-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-rose-600 transition-all shadow-sm disabled:opacity-50">Report</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ── Toast Notification ──────────────────────────────────────────────── -->
    <Transition name="toast">
      <div v-if="toast.show" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white shadow-xl flex items-center gap-2" :style="{ background: toast.type === 'success' ? '#9DB6A0' : '#CE8280' }">
        {{ toast.type === 'success' ? '✓' : '⚠️' }} {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/useCartStore'
import { useUserStore } from '../stores/useUserStore'

const route = useRoute()
const cartStore = useCartStore()
const userStore = useUserStore()

// ── Product State ─────────────────────────────────────────────────────────
const product = ref(null)
const loading = ref(true)
const error = ref('')
const currentImage = ref(null)
const qty = ref(1)
const selectedSize = ref(null)

// ── Review State ──────────────────────────────────────────────────────────
const reviews = ref([])
const reviewsLoading = ref(true)
const avgRating = ref(null)
const submitting = ref(false)
const reviewDraft = ref({ rating: 0, comment: '' })
const editingId = ref(null)
const editDraft = ref('')
const toast = ref({ show: false, message: '', type: 'success' })

// ── Report State ──────────────────────────────────────────────────────────
const reportReasons = ['Spam / Advertising', 'Inappropriate Language', 'Off-topic', 'Harassment', 'Other']
const reportModal = ref({ show: false, reviewId: null, reason: '' })

// ── Image Gallery ─────────────────────────────────────────────────────────
const validImages = computed(() => {
  if (!product.value) return []
  const rawArray = [product.value.imageUrl, ...(product.value.gallery || [])]
  return rawArray.filter(url => typeof url === 'string' && url.trim().length > 0)
})

watch(() => product.value, (newVal) => {
  if (newVal && validImages.value.length > 0) {
    currentImage.value = validImages.value[0]
  }
}, { immediate: true })

// ── API Calls ─────────────────────────────────────────────────────────────
async function fetchProduct(id) {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch(`/api/products/${id}`)
    if (res.status === 404) {
      error.value = 'Product not found.'
      return
    }
    if (!res.ok) throw new Error(`Server error ${res.status}`)
    const json = await res.json()
    product.value = json.data
    if (json.data.sizes?.length) {
      selectedSize.value = json.data.sizes[0]?.name
    }
  } catch (err) {
    error.value = err.message
    console.error('[PRODUCT_FETCH_ERROR]', err)
  } finally {
    loading.value = false
  }
}

async function fetchReviews() {
  reviewsLoading.value = true
  try {
    const res = await fetch(`/api/reviews?productId=${route.params.id}`)
    if (res.ok) {
      const json = await res.json()
      // Map API data with local UI state for likes
      reviews.value = (json.data || []).map(r => ({
        ...r,
        _liked: userStore.user?.id ? (r.likedBy || []).includes(userStore.user.id) : false,
        _likesCount: r.likesCount || 0
      }))
      avgRating.value = json.avgRating
    }
  } catch (err) {
    console.error('[REVIEWS_FETCH_ERROR]', err)
  } finally {
    reviewsLoading.value = false
  }
}

// ── Display Helpers ───────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })
}

// ── Cart ──────────────────────────────────────────────────────────────────
function addToCart() {
  if (!product.value) return
  const price = selectedSize.value 
    ? product.value.sizes?.find(s => s.name === selectedSize.value)?.price 
    : product.value.price
  cartStore.addItem({
    id: product.value.id,
    name: product.value.name,
    price: price || product.value.price,
    image: product.value.imageUrl || '/images/placeholder.jpg',
    emoji: product.value.emoji || '🌸'
  }, qty.value)
  showToast('Added to cart! 🌸')
}

// ── Review CRUD Operations ─────────────────────────────────────────────────
async function submitReview() {
  if (!userStore.isLoggedIn) {
    showToast('Please sign in to leave a review.', 'error')
    return
  }
  if (!reviewDraft.value.comment.trim()) {
    showToast('Please write a comment.', 'error')
    return
  }

  submitting.value = true
  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.value.id,
        userId: userStore.user.id,
        userName: userStore.displayName,
        rating: reviewDraft.value.rating || null,
        comment: reviewDraft.value.comment
      })
    })
    const json = await res.json()
    
    if (!res.ok) {
      if (res.status === 403) {
        reviewDraft.value.rating = 0
        throw new Error('Only verified buyers can leave a star rating. Your comment has been submitted without stars!')
      }
      throw new Error(json.error || 'Submission failed')
    }
    
    showToast('Your review has been posted! 🌸')
    reviewDraft.value = { rating: 0, comment: '' }
    await fetchReviews()
  } catch (err) {
    showToast(err.message, 'error')
  } finally {
    submitting.value = false
  }
}

function startEdit(review) {
  editingId.value = review.id
  editDraft.value = review.comment
}

async function saveEdit(review) {
  try {
    const res = await fetch(`/api/reviews/${review.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment: editDraft.value })
    })
    if (!res.ok) throw new Error('Failed to update review')
    review.comment = editDraft.value
    editingId.value = null
    showToast('Review updated successfully')
  } catch (err) {
    showToast(err.message, 'error')
  }
}

async function deleteReview(id) {
  if (!confirm('Are you sure you want to delete this review?')) return
  try {
    const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete review')
    reviews.value = reviews.value.filter(r => r.id !== id)
    showToast('Review deleted successfully')
  } catch (err) {
    showToast(err.message, 'error')
  }
}

// 🔥 Toggle Like with Real API Call
async function toggleLike(review) {
  if (!userStore.isLoggedIn) {
    showToast('Sign in to like comments.', 'error')
    return
  }
  
  // Optimistic UI update
  const originalLiked = review._liked
  const originalLikesCount = review._likesCount
  review._liked = !review._liked
  review._likesCount += review._liked ? 1 : -1

  try {
    const res = await fetch(`/api/reviews/${review.id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userStore.user.id })
    })
    if (!res.ok) throw new Error('Failed to toggle like')
    
    const json = await res.json()
    // Sync with server response to ensure accuracy
    review._liked = (json.data.likedBy || []).includes(userStore.user.id)
    review._likesCount = json.data.likesCount
  } catch (err) {
    // Revert optimistic update on failure
    review._liked = originalLiked
    review._likesCount = originalLikesCount
    showToast('Network error, please try again.', 'error')
  }
}

function openReport(reviewId) {
  reportModal.value = { show: true, reviewId, reason: '' }
}

async function submitReport() {
  if (!reportModal.value.reason) {
    showToast('Please select a reason', 'error')
    return
  }
  try {
    const res = await fetch(`/api/reviews/${reportModal.value.reviewId}/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: reportModal.value.reason })
    })
    if (!res.ok) throw new Error('Failed to submit report')
    showToast('Report submitted. Admin will review this.')
    reportModal.value.show = false
  } catch (err) {
    showToast(err.message, 'error')
  }
}

// ── Toast Helper ──────────────────────────────────────────────────────────
function showToast(message, type = 'success') {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, 3500)
}

// ── Lifecycle ─────────────────────────────────────────────────────────────
onMounted(() => {
  fetchProduct(route.params.id)
  fetchReviews()
})
</script>

<style scoped>
.toast-enter-active { transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { transition: all 0.2s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(20px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.animate-fade-up { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>