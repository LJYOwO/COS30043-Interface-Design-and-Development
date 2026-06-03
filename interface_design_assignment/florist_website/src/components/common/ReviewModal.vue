<template>
  <Transition name="modal">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-ink/30 backdrop-blur-sm" @click="closeModal"/>

      <div class="relative rounded-3xl shadow-glass-lg w-full max-w-md animate-bloom overflow-hidden" style="background:#FDFBF7">

        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-cream-200">
          <div>
            <h3 class="font-serif text-lg font-bold text-ink">Write a Review</h3>
            <p class="text-xs text-ink/50 mt-0.5">{{ productName }}</p>
          </div>
          <button class="p-1.5 rounded-full hover:bg-cream-200 transition-colors text-ink/40"
                  @click="closeModal">✕</button>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-5">

          <!-- Star rating picker -->
          <div>
            <label class="block text-xs font-semibold text-ink/60 mb-3">Your Rating *</label>
            <div class="flex items-center gap-2">
              <button
                v-for="n in 5"
                :key="n"
                class="text-3xl transition-transform hover:scale-110 focus:outline-none"
                :style="{ color: n <= hoverRating || n <= form.rating ? '#CE8280' : '#EDE3CF' }"
                @mouseenter="hoverRating = n"
                @mouseleave="hoverRating = 0"
                @click="form.rating = n"
              >★</button>
              <span class="text-sm text-ink/50 ml-2">
                {{ ratingLabel }}
              </span>
            </div>
          </div>

          <!-- Comment -->
          <div>
            <label class="block text-xs font-semibold text-ink/60 mb-1.5">Your Review *</label>
            <textarea
              v-model="form.comment"
              rows="4"
              :placeholder="commentPlaceholder"
              maxlength="500"
              class="w-full px-3 py-2.5 rounded-2xl text-sm resize-none transition-all"
              style="background:rgba(255,255,255,0.7); border:1px solid #FAF6EE; color:#2C2C2C"
              @focus="e => e.target.style.boxShadow='0 0 0 2px rgba(233,193,192,0.3)'"
              @blur="e => e.target.style.boxShadow='none'"
            />
            <p class="text-[10px] text-ink/30 mt-1 text-right">{{ form.comment.length }}/500</p>
          </div>

          <!-- Display name -->
          <div>
            <label class="block text-xs font-semibold text-ink/60 mb-1.5">
              Display Name <span class="text-ink/30 font-normal">(shown publicly)</span>
            </label>
            <input
              v-model="form.displayName"
              type="text"
              placeholder="e.g. Sophie R."
              maxlength="40"
              class="w-full px-3 py-2 rounded-xl text-sm transition-all"
              style="background:rgba(255,255,255,0.7); border:1px solid #FAF6EE; color:#2C2C2C"
            />
          </div>

          <!-- 🔥 UPDATED: Info note matching Direct-Publish logic (Blush theme) -->
          <div class="flex items-start gap-2 px-3 py-2.5 rounded-2xl text-xs text-ink/60 leading-relaxed"
               style="background:rgba(249,229,229,0.4); border:1px solid rgba(206,130,128,0.2)">
            <span class="flex-shrink-0 mt-0.5">🌸</span>
            <span>Your thoughts are shared instantly with our floral community. Thank you for helping us bloom!</span>
          </div>

          <!-- Error -->
          <p v-if="error" class="text-xs text-red-500 bg-red-50 rounded-xl px-3 py-2">{{ error }}</p>
        </div>

        <!-- Footer -->
        <div class="flex gap-3 px-6 py-4 border-t border-cream-200">
          <button
            class="flex-1 py-2.5 rounded-full text-sm text-ink/60 transition-colors"
            style="border:1px solid #EDE3CF"
            @click="closeModal"
          >Cancel</button>
          <button
            class="flex-1 py-2.5 rounded-full text-white text-sm font-medium transition-all flex items-center justify-center gap-2"
            style="background:#CE8280; box-shadow:0 2px 12px rgba(233,193,192,0.4)"
            :style="submitting ? { opacity: '0.7' } : {}"
            :disabled="submitting"
            @click="submitReview"
          >
            <span v-if="submitting" class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
            {{ submitting ? 'Submitting…' : 'Submit Review ★' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useUserStore } from '@/stores/useUserStore'

const props = defineProps({
  modelValue:  { type: Boolean, default: false },
  productId:   { type: [Number, String], required: true },
  productName: { type: String, default: 'Product' },
  orderId:     { type: [Number, String, null], default: null },
})

const emit = defineEmits(['update:modelValue', 'submitted'])

const userStore  = useUserStore()
const hoverRating = ref(0)
const submitting  = ref(false)
const error       = ref('')

const form = ref({ rating: 0, comment: '', displayName: userStore.user?.name || '' })

// Reset form when modal opens
watch(() => props.modelValue, (val) => {
  if (val) {
    form.value = { rating: 0, comment: '', displayName: userStore.user?.name || '' }
    error.value = ''
    hoverRating.value = 0
  }
})

const ratingLabel = computed(() => {
  const labels = { 0: 'Select a rating', 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Great', 5: 'Excellent!' }
  return labels[hoverRating.value || form.value.rating] || 'Select a rating'
})

const commentPlaceholder = computed(() => {
  const placeholders = {
    5: 'Tell us what made it exceptional…',
    4: 'What did you enjoy most?',
    3: 'What was good and what could be better?',
    2: 'What disappointed you?',
    1: 'What went wrong? We want to improve.',
    0: 'Share your experience with this product…',
  }
  return placeholders[form.value.rating] || placeholders[0]
})

// Unified modal closing function
function closeModal() {
  emit('update:modelValue', false)
}

/**
 * Submit review to backend
 * 🔥 FIXED: Automatically closes the modal on successful submission
 */
async function submitReview() {
  error.value = ''
  
  // Validation
  if (!form.value.rating) { 
    error.value = 'Please select a star rating.'  
    return 
  }
  if (!form.value.comment.trim()) { 
    error.value = 'Please write a review comment.' 
    return 
  }
  if (form.value.comment.length < 10) { 
    error.value = 'Review must be at least 10 characters.' 
    return 
  }

  submitting.value = true
  
  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId:  props.productId,
        orderId:    props.orderId,
        userId:     userStore.user?.id,
        userName:   form.value.displayName || userStore.user?.name || 'Anonymous',
        rating:     form.value.rating,
        comment:    form.value.comment.trim(),
      }),
    })
    
    const json = await res.json()
    
    if (!res.ok) {
      throw new Error(json.error || 'Submission failed')
    }

    // Emit submitted event to parent component
    emit('submitted', json.data)
    
    // 🔥 CRITICAL: Close the modal automatically on success
    // This makes the modal disappear right after successful submission
    closeModal()
    
  } catch (e) {
    error.value = e.message
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.modal-enter-active { transition: opacity 0.25s ease; }
.modal-leave-active  { transition: opacity 0.2s ease; }
.modal-enter-from,
.modal-leave-to      { opacity: 0; }
</style>