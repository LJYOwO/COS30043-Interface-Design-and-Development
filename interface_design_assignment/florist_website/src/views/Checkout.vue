<template>
  <div class="min-h-screen bg-gradient-to-br from-cream via-blush/5 to-lavender/10 py-10">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <nav class="flex items-center gap-2 text-xs text-ink/40 mb-8">
        <RouterLink to="/" class="hover:text-ink transition-colors">Home</RouterLink>
        <span>/</span>
        <span class="text-ink">Checkout</span>
      </nav>

      <div v-if="!userStore.isLoggedIn" class="max-w-md mx-auto text-center py-20">
        <div class="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
             style="background:linear-gradient(135deg,#fde8e8,#f9d4d4)">🔒</div>
        <h1 class="font-serif text-3xl text-ink font-bold mb-3">Sign in to Checkout</h1>
        <p class="text-sm text-ink/60 mb-8 leading-relaxed">
          You need an account to place an order. It only takes a moment!
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <RouterLink
            to="/login?redirect=/checkout"
            class="px-8 py-3 rounded-full text-white font-medium text-sm transition-all"
            style="background:#CE8280; box-shadow:0 2px 16px rgba(233,193,192,0.4)"
          >
            Sign In
          </RouterLink>
          <RouterLink
            to="/catalog"
            class="px-8 py-3 rounded-full text-sm font-medium transition-colors"
            style="border:1px solid #EDE3CF; color:rgba(44,44,44,0.6);"
          >
            Continue Shopping
          </RouterLink>
        </div>
      </div>

      <div v-else-if="cartStore.items.length === 0 && !orderSuccess"
           class="max-w-md mx-auto text-center py-20">
        <div class="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
             style="background:linear-gradient(135deg,#fde8e8,#f9d4d4)">🛒</div>
        <h1 class="font-serif text-3xl text-ink font-bold mb-3">Your cart is empty</h1>
        <p class="text-sm text-ink/60 mb-8">Add some beautiful blooms before checking out.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <RouterLink
            to="/catalog"
            class="px-8 py-3 rounded-full text-white font-medium text-sm transition-all"
            style="background:#CE8280; box-shadow:0 2px 16px rgba(233,193,192,0.4)"
          >
            Browse Catalog 🌸
          </RouterLink>
          <RouterLink
            to="/customizer"
            class="px-8 py-3 rounded-full text-sm font-medium transition-colors"
            style="border:1px solid #EDE3CF; color:rgba(44,44,44,0.6);"
          >
            Design a Bouquet
          </RouterLink>
        </div>
      </div>

      <div v-else-if="orderSuccess" class="max-w-lg mx-auto text-center py-16 animate-fade-up">
        <div class="w-20 h-20 rounded-full bg-[#9DB6A0]/20 flex items-center justify-center text-4xl mx-auto mb-6 animate-bloom">
          🌸
        </div>
        <h1 class="font-serif text-4xl text-ink font-bold mb-3">Order Placed!</h1>
        <p class="text-sm text-ink/60 mb-2 leading-relaxed">
          Thank you, <strong>{{ userStore.displayName }}</strong>! Your bouquet is being prepared.
        </p>
        <p class="text-xs text-ink/40 mb-8">Order #{{ placedOrderId }} · A confirmation will be sent to {{ form.email }}</p>

        <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-cream-200 text-left mb-8 space-y-2">
          <h3 class="font-serif text-sm font-semibold text-ink mb-3">Order Summary</h3>
          <div v-for="item in successItems" :key="item.key" class="flex justify-between text-sm text-ink/70">
            <span>{{ item.emoji || '🌸' }} {{ item.name }} × {{ item.quantity }}</span>
            <span>RM {{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
          <div class="border-t border-cream-200 pt-2 flex justify-between text-sm font-bold text-ink">
            <span>Total</span>
            <span>RM {{ successTotal }}</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <RouterLink
            to="/orders"
            class="px-8 py-3 rounded-full text-white font-medium text-sm transition-all text-center"
            style="background:#9DB6A0; box-shadow:0 2px 12px rgba(157,182,160,0.3)"
          >
            Track My Order →
          </RouterLink>
          <RouterLink
            to="/catalog"
            class="px-8 py-3 rounded-full text-sm font-medium transition-colors text-center"
            style="border:1px solid #EDE3CF; color:rgba(44,44,44,0.6)"
          >
            Continue Shopping
          </RouterLink>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div class="lg:col-span-2 space-y-6">
          <h1 class="font-serif text-3xl text-ink font-bold">Checkout</h1>

          <div class="bg-white/60 backdrop-blur-sm rounded-3xl border border-cream-200 p-6 space-y-4">
            <h2 class="font-serif text-base font-semibold text-ink">Contact Information</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-ink/60 mb-1.5">Full Name *</label>
                <input v-model="form.name" type="text" placeholder="Sophie Reeves" class="checkout-input" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-ink/60 mb-1.5">Email *</label>
                <input v-model="form.email" type="email" placeholder="sophie@example.com" class="checkout-input" />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-xs font-semibold text-ink/60 mb-1.5">Phone Number</label>
                <input v-model="form.phone" type="tel" placeholder="+60 12 345 6789" class="checkout-input" />
              </div>
            </div>
          </div>

          <div class="bg-white/60 backdrop-blur-sm rounded-3xl border border-cream-200 p-6 space-y-4">
            <div class="flex justify-between items-center">
              <h2 class="font-serif text-base font-semibold text-ink">Delivery Address</h2>
              <span v-if="isLoadingProfile" class="text-xs text-[#CE8280] font-bold animate-pulse">Auto-filling...</span>
            </div>
            <div>
              <label class="block text-xs font-semibold text-ink/60 mb-1.5">Street Address *</label>
              <input v-model="form.address" type="text" placeholder="123 Garden Street" class="checkout-input" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-semibold text-ink/60 mb-1.5">City *</label>
                <input v-model="form.city" type="text" placeholder="Kuala Lumpur" class="checkout-input" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-ink/60 mb-1.5">Postcode *</label>
                <input v-model="form.postcode" type="text" placeholder="50000" class="checkout-input" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-ink/60 mb-1.5">State *</label>
                <select v-model="form.state" class="checkout-input">
                  <option value="">Select state</option>
                  <option v-for="s in MY_STATES" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-ink/60 mb-1.5">Delivery Notes</label>
              <textarea v-model="form.notes" rows="2" placeholder="Leave at door, ring bell, etc…" class="checkout-input resize-none" />
            </div>
          </div>

          <div class="bg-white/60 backdrop-blur-sm rounded-3xl border border-cream-200 p-6 space-y-4">
            <h2 class="font-serif text-base font-semibold text-ink">Delivery Slot</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-ink/60 mb-1.5">Preferred Date *</label>
                <input v-model="form.deliveryDate" type="date" :min="minDate" class="checkout-input" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-ink/60 mb-1.5">Time Slot *</label>
                <select v-model="form.deliverySlot" class="checkout-input">
                  <option value="">Select slot</option>
                  <option value="09:00–12:00">Morning  09:00 – 12:00</option>
                  <option value="12:00–15:00">Noon     12:00 – 15:00</option>
                  <option value="15:00–18:00">Afternoon 15:00 – 18:00</option>
                  <option value="18:00–21:00">Evening  18:00 – 21:00</option>
                </select>
              </div>
            </div>
          </div>

          <div class="bg-white/60 backdrop-blur-sm rounded-3xl border border-cream-200 p-6 space-y-3">
            <div class="flex items-center gap-3">
              <input type="checkbox" id="isGift" v-model="form.isGift" class="rounded border-[#9DB6A0]/40 text-[#CE8280] focus:ring-[#CE8280]/30" />
              <label for="isGift" class="font-serif text-base font-semibold text-ink cursor-pointer">Add Gift Message</label>
            </div>
            <Transition name="slide-down">
              <div v-if="form.isGift">
                <label class="block text-xs font-semibold text-ink/60 mb-1.5">Your Message</label>
                <textarea v-model="form.giftMessage" rows="3" placeholder="Happy Birthday! Wishing you a wonderful day…" class="checkout-input resize-none" />
                <p class="text-[10px] text-ink/30 mt-1">{{ form.giftMessage.length }}/200 characters</p>
              </div>
            </Transition>
          </div>

          <div class="bg-white/60 backdrop-blur-sm rounded-3xl border border-cream-200 p-6">
            <h2 class="font-serif text-base font-semibold text-ink mb-4">Payment Method</h2>
              <div class="space-y-2">
              <label
                v-for="method in paymentMethods"
                :key="method.id"
                class="flex items-center gap-3 p-3 rounded-2xl border-2 cursor-pointer transition-all"
                :style="form.payment === method.id
                  ? 'border-color:#CE8280; background:rgba(206,130,128,0.05);'
                  : 'border-color:#EDE3CF;'"
              >
                <input type="radio" :value="method.id" v-model="form.payment" class="text-[#CE8280] focus:ring-[#CE8280]/30" />
                <span class="text-lg">{{ method.icon }}</span>
                <div>
                  <p class="text-sm font-medium text-ink">{{ method.name }}</p>
                  <p class="text-[10px] text-ink/40">{{ method.desc }}</p>
                </div>
              </label>
            </div>
          </div>

          <p v-if="formError" class="text-sm text-red-500 bg-red-50 rounded-2xl px-4 py-3 border border-red-100 font-bold">
            ⚠️ {{ formError }}
          </p>
        </div>

        <div class="space-y-4">
          <div class="bg-white/70 backdrop-blur-sm rounded-3xl border border-cream-200 p-5 sticky top-20 space-y-4 shadow-sm">
            <h2 class="font-serif text-base font-semibold text-ink">Order Summary</h2>

            <div class="space-y-3 max-h-64 overflow-y-auto pr-2">
              <div v-for="item in cartStore.items" :key="item.key" class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                     style="background:linear-gradient(135deg,#fde8e8,#f9d4d4)">
                  {{ item.emoji || '🌸' }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-ink truncate">{{ item.name }}</p>
                  <p class="text-[10px] text-ink/50 font-bold">× {{ item.quantity }}</p>
                </div>
                <span class="text-xs font-bold text-ink">RM {{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>

            <div class="border-t border-cream-200 pt-3 space-y-2">
              <div class="flex justify-between text-xs text-ink/50 font-bold uppercase tracking-wider">
                <span>Subtotal</span>
                <span>RM {{ cartStore.subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-xs text-ink/50 font-bold uppercase tracking-wider">
                <span>Delivery</span>
                <span>RM 8.50</span>
              </div>
              <div v-if="form.isGift" class="flex justify-between text-xs text-ink/50 font-bold uppercase tracking-wider">
                <span>Gift wrapping</span>
                <span>RM 5.00</span>
              </div>
              <div class="flex justify-between text-lg font-bold text-ink pt-2 mt-2 border-t border-cream-200">
                <span>Total</span>
                <span style="color:#CE8280">RM {{ orderTotal.toFixed(2) }}</span>
              </div>
            </div>

            <button
              class="w-full py-3.5 rounded-full text-white font-bold tracking-wider uppercase text-sm transition-all flex items-center justify-center gap-2"
              style="background:#CE8280; box-shadow:0 4px 14px rgba(206,130,128,0.4)"
              :style="placing ? { opacity: '0.7', cursor: 'not-allowed' } : {}"
              :disabled="placing"
              @click="placeOrder"
            >
              <span v-if="placing" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {{ placing ? 'Processing Payment…' : `Place Order · RM ${orderTotal.toFixed(2)}` }}
            </button>

            <p class="text-[9px] text-ink/30 text-center leading-relaxed uppercase tracking-widest font-bold">
              By placing your order you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue' // 🔥 THE FIX: Added onMounted
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import { useCartStore } from '@/stores/useCartStore'

const userStore = useUserStore()
const cartStore = useCartStore()
const router    = useRouter()

// ── Constants ─────────────────────────────────────────────────────────────
const MY_STATES = [
  'Johor','Kedah','Kelantan','Melaka','Negeri Sembilan',
  'Pahang','Perak','Perlis','Pulau Pinang','Sabah',
  'Sarawak','Selangor','Terengganu','W.P. Kuala Lumpur',
  'W.P. Labuan','W.P. Putrajaya',
]

const paymentMethods = [
  { id: 'online_banking', icon: '🏦', name: 'Online Banking (FPX)',  desc: 'Maybank, CIMB, Public Bank and more' },
  { id: 'card',           icon: '💳', name: 'Credit / Debit Card',   desc: 'Visa, Mastercard, American Express'  },
  { id: 'ewallet',        icon: '📱', name: 'e-Wallet',              desc: 'Touch \'n Go, GrabPay, Boost'       },
  { id: 'cod',            icon: '💵', name: 'Cash on Delivery',      desc: 'Pay when your bouquet arrives'       },
]

// ── State ─────────────────────────────────────────────────────────────────
const placing          = ref(false)
const isLoadingProfile = ref(false) // Gives a visual cue that auto-fill is working
const formError        = ref('')
const orderSuccess     = ref(false)
const placedOrderId    = ref(null)
const successItems     = ref([])
const successTotal     = ref('0.00')

const form = reactive({
  name:         userStore.user?.name  || '',
  email:        userStore.user?.email || '',
  phone:        '',
  address:      '',
  city:         '',
  postcode:     '',
  state:        '',
  notes:        '',
  deliveryDate: '',
  deliverySlot: '',
  isGift:       false,
  giftMessage:  '',
  payment:      'online_banking',
})

// Minimum delivery date = tomorrow
const minDate = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
})

const orderTotal = computed(() => {
  let total = cartStore.subtotal + 8.50
  if (form.isGift) total += 5.00
  return total
})

// ── 🔥 AUTO-FILL: Fetch Saved Profile Data on Page Load ───────────────────
onMounted(async () => {
  if (userStore.user?.id) {
    isLoadingProfile.value = true
    try {
      const res = await fetch(`/api/profiles/${userStore.user.id}`)
      if (res.ok) {
        const { data } = await res.json()
        
        // Populate personal details
        if (data.name) form.name = data.name
        if (data.phone) form.phone = data.phone
        
        // Safely extract the structured JSON address we saved in Dashboard.vue
        const savedAddress = data.addresses?.[0]
        if (savedAddress && typeof savedAddress === 'object') {
          form.address = savedAddress.street || ''
          form.city = savedAddress.city || ''
          form.postcode = savedAddress.postcode || ''
          form.state = savedAddress.state || ''
        }
      }
    } catch (e) {
      console.error('[CHECKOUT_AUTOFILL_ERROR]', e)
    } finally {
      isLoadingProfile.value = false
    }
  }
})

// ── Validation ────────────────────────────────────────────────────────────
function validate() {
  if (!form.name.trim())         return 'Full name is required.'
  if (!form.email.trim())        return 'Email is required.'
  if (!form.address.trim())      return 'Delivery address is required.'
  if (!form.city.trim())         return 'City is required.'
  if (!form.postcode.trim())     return 'Postcode is required.'
  if (!form.state)               return 'State is required.'
  if (!form.deliveryDate)        return 'Please select a delivery date.'
  if (!form.deliverySlot)        return 'Please select a delivery time slot.'
  if (!form.payment)             return 'Please select a payment method.'
  if (form.isGift && form.giftMessage.length > 200) return 'Gift message must be under 200 characters.'
  return null
}

// ── Place Order ───────────────────────────────────────────────────────────
async function placeOrder() {
  formError.value = ''
  const err = validate()
  if (err) { formError.value = err; return }

  placing.value = true
  try {
    const payload = {
      userId:       userStore.user?.id,
      customerName: form.name,
      email:        form.email,
      phone:        form.phone,
      address:      `${form.address}, ${form.city}, ${form.postcode}, ${form.state}`,
      deliveryDate: form.deliveryDate,
      deliverySlot: form.deliverySlot,
      isGift:       form.isGift,
      giftMessage:  form.giftMessage,
      payment:      form.payment,
      notes:        form.notes,
      items:        cartStore.items.map(i => ({
        productId: i.id,
        name:      i.name,
        qty:       i.quantity,
        price:     i.price,
        emoji:     i.emoji || '🌸',
      })),
    }

    const res  = await fetch('/api/orders', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Order failed')

    // Save snapshot for success screen, then clear cart
    successItems.value  = [...cartStore.items]
    successTotal.value  = orderTotal.value.toFixed(2)
    placedOrderId.value = json.data.id
    cartStore.clearCart()
    orderSuccess.value = true

  } catch (e) {
    formError.value = 'Failed to place order: ' + e.message
  } finally {
    placing.value = false
  }
}
</script>

<style scoped>
.checkout-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  background-color: rgba(255,255,255,0.9);
  border: 1px solid #E5E7EB;
  font-size: 0.875rem;
  color: #1F2937;
  font-weight: 500;
  transition: all 0.2s ease;
}
.checkout-input:focus {
  outline: none;
  border-color: #CE8280;
  box-shadow: 0 0 0 3px rgba(206,130,128,0.15);
  background-color: #FFFFFF;
}
.checkout-input::placeholder { color: #9CA3AF; font-weight: 400; }

.slide-down-enter-active { transition: all 0.3s ease; }
.slide-down-leave-active  { transition: all 0.2s ease; }
.slide-down-enter-from,
.slide-down-leave-to      { opacity: 0; transform: translateY(-8px); }
</style>