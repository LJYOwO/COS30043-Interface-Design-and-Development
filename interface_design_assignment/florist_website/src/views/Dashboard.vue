<template>
  <div class="min-h-screen py-10" style="background: linear-gradient(160deg, #FDFBF7 0%, #F9E5E5 40%, #EAE2FE 100%);">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-up">
      
      <div class="flex items-start justify-between mb-8">
        <div>
          <p class="text-xs text-[#9DB6A0] uppercase tracking-widest mb-1 font-bold">My Account</p>
          <h1 class="font-serif text-4xl text-ink font-bold drop-shadow-sm">
            Hello, {{ profileForm.name || userStore.displayName }} 🌸
          </h1>
          <p class="text-sm text-ink/50 mt-1 font-medium">Here's a look at your FloraLab activity.</p>
        </div>
        <button
          class="px-5 py-2.5 rounded-full border border-white/60 bg-white/40 backdrop-blur-sm text-xs font-bold uppercase tracking-wider text-ink/60 hover:bg-rose-50 hover:text-rose-500 transition-all shadow-sm hover:shadow-md"
          @click="handleLogout"
        >
          Sign out →
        </button>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div v-for="stat in dynamicStats" :key="stat.label" class="bg-white/60 backdrop-blur-xl rounded-3xl p-5 border border-white/50 text-center shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform duration-300">
          <p class="text-3xl mb-2 drop-shadow-sm">{{ stat.icon }}</p>
          <p class="font-serif text-2xl font-bold text-ink">{{ stat.value }}</p>
          <p class="text-[10px] uppercase tracking-widest text-[#9DB6A0] font-bold mt-1">{{ stat.label }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div class="lg:col-span-2">
          <div class="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <div class="mb-6 border-b border-gray-200/50 pb-4">
              <h2 class="font-serif text-2xl font-bold text-ink">Personal Details</h2>
              <p class="text-xs text-ink/50 mt-1 font-medium">Save your details here for a seamless, 1-click checkout experience.</p>
            </div>

            <form @submit.prevent="saveProfile" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/60 mb-1.5">Full Name</label>
                  <input type="text" v-model="profileForm.name" class="w-full px-4 py-3 bg-white/80 border border-transparent rounded-xl text-sm focus:outline-none focus:border-[#CE8280]/40 focus:ring-2 focus:ring-[#CE8280]/10 transition-all shadow-inner" />
                </div>
                <div>
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/60 mb-1.5">Phone Number</label>
                  <input type="tel" v-model="profileForm.phone" placeholder="+60 12-345 6789" class="w-full px-4 py-3 bg-white/80 border border-transparent rounded-xl text-sm focus:outline-none focus:border-[#CE8280]/40 focus:ring-2 focus:ring-[#CE8280]/10 transition-all shadow-inner" />
                </div>
              </div>

              <div class="space-y-4 border-t border-gray-200/50 pt-6 mt-6">
                <h3 class="font-serif text-base font-bold text-ink">Default Delivery Address</h3>
                <div>
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/60 mb-1.5">Street Address</label>
                  <input type="text" v-model="profileForm.address" placeholder="123 Garden Street" class="w-full px-4 py-3 bg-white/80 border border-transparent rounded-xl text-sm focus:outline-none focus:border-[#CE8280]/40 focus:ring-2 focus:ring-[#CE8280]/10 transition-all shadow-inner" />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/60 mb-1.5">City</label>
                    <input type="text" v-model="profileForm.city" placeholder="Kuala Lumpur" class="w-full px-4 py-3 bg-white/80 border border-transparent rounded-xl text-sm focus:outline-none focus:border-[#CE8280]/40 focus:ring-2 focus:ring-[#CE8280]/10 transition-all shadow-inner" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/60 mb-1.5">Postcode</label>
                    <input type="text" v-model="profileForm.postcode" placeholder="50000" class="w-full px-4 py-3 bg-white/80 border border-transparent rounded-xl text-sm focus:outline-none focus:border-[#CE8280]/40 focus:ring-2 focus:ring-[#CE8280]/10 transition-all shadow-inner" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/60 mb-1.5">State</label>
                    <select v-model="profileForm.state" class="w-full px-4 py-3 bg-white/80 border border-transparent rounded-xl text-sm focus:outline-none focus:border-[#CE8280]/40 focus:ring-2 focus:ring-[#CE8280]/10 transition-all shadow-inner cursor-pointer text-ink/80 font-medium">
                      <option value="">Select state</option>
                      <option v-for="s in MY_STATES" :key="s" :value="s">{{ s }}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="flex justify-end pt-4">
                <button type="submit" :disabled="saving" class="px-8 py-3 rounded-full bg-[#CE8280] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B87472] transition-all shadow-petal hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-50">
                  <span v-if="saving" class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  {{ saving ? 'Saving...' : 'Update Details' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="space-y-4">
          <RouterLink
            v-for="action in quickActions"
            :key="action.name"
            :to="action.to"
            class="flex items-center justify-between p-4 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 hover:border-[#CE8280]/40 hover:shadow-md transition-all duration-300 group"
          >
            <div class="flex items-center gap-4">
              <span class="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-sm border border-gray-100">
                {{ action.icon }}
              </span>
              <span class="font-bold text-sm text-ink group-hover:text-[#CE8280] transition-colors">{{ action.name }}</span>
            </div>
            <span class="text-ink/30 group-hover:text-[#CE8280] transition-colors group-hover:translate-x-1 font-bold">→</span>
          </RouterLink>
        </div>
      </div>

    </div>

    <Transition name="toast">
      <div v-if="toast.show" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white shadow-xl flex items-center gap-2" :style="{ background: toast.type === 'success' ? '#9DB6A0' : '#CE8280' }">
        {{ toast.type === 'success' ? '✓' : '⚠️' }} {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '../stores/useUserStore'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(true)
const saving = ref(false)
const toast = ref({ show: false, message: '', type: 'success' })
const userOrders = ref([])

const MY_STATES = [
  'Johor','Kedah','Kelantan','Melaka','Negeri Sembilan',
  'Pahang','Perak','Perlis','Pulau Pinang','Sabah',
  'Sarawak','Selangor','Terengganu','W.P. Kuala Lumpur',
  'W.P. Labuan','W.P. Putrajaya',
]

const profileForm = reactive({
  name: '', phone: '', address: '', city: '', postcode: '', state: ''
})

// 🔥 Calculate real stats based on database orders
const dynamicStats = computed(() => {
  const orders = userOrders.value
  const totalSpend = orders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0)
  
  // Count total bouquets bought inside the orders
  const totalItems = orders.reduce((sum, o) => {
    return sum + (o.items ? o.items.reduce((s, item) => s + (item.qty || 1), 0) : 0)
  }, 0)

  return [
    { icon: '📦', value: orders.length.toString(), label: 'Total Orders' },
    { icon: '🌸', value: totalItems.toString(), label: 'Bouquets Bought' },
    { icon: '⭐', value: '5.0', label: 'Top Customer' },
    { icon: '💰', value: `RM ${totalSpend.toFixed(2)}`, label: 'Total Spend' },
  ]
})

const quickActions = [
  { icon: '🌹', name: 'Browse Catalog',   to: '/catalog'    },
  { icon: '🎨', name: 'Customizer Lab',   to: '/customizer' },
  { icon: '📦', name: 'Order History',    to: '/orders'     },
  { icon: '🛒', name: 'Checkout',         to: '/checkout'   },
]

async function fetchProfile() {
  if (!userStore.user?.id) return
  try {
    // 1. Fetch Profile
    const res = await fetch(`/api/profiles/${userStore.user.id}`)
    if (res.ok) {
      const { data } = await res.json()
      profileForm.name = data.name || ''
      profileForm.phone = data.phone || ''
      const savedAddress = (data.addresses && data.addresses.length > 0) ? data.addresses[0] : {}
      profileForm.address = savedAddress.street || ''
      profileForm.city = savedAddress.city || ''
      profileForm.postcode = savedAddress.postcode || ''
      profileForm.state = savedAddress.state || ''
    }

    // 2. Fetch Orders to populate dynamic dashboard stats
    const orderRes = await fetch(`/api/orders?userId=${userStore.user.id}`)
    if (orderRes.ok) {
      const { data } = await orderRes.json()
      userOrders.value = data || []
    }

  } catch (err) {
    console.error('[DASHBOARD_SYNC_ERROR]', err)
  } finally {
    loading.value = false
  }
}

async function saveProfile() {
  if (!userStore.user?.id) return
  saving.value = true
  try {
    const res = await fetch(`/api/profiles/${userStore.user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: profileForm.name,
        phone: profileForm.phone,
        address: {
          street: profileForm.address, city: profileForm.city,
          postcode: profileForm.postcode, state: profileForm.state
        }
      })
    })

    if (!res.ok) throw new Error('Failed to update details')
    userStore.updateProfile({ name: profileForm.name })
    showToast('Profile updated successfully! 🌸')
  } catch (err) {
    showToast(err.message, 'error')
  } finally {
    saving.value = false
  }
}

function handleLogout() {
  userStore.logout()
  router.push('/login')
}

function showToast(message, type = 'success') {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, 3000)
}

onMounted(() => {
  fetchProfile()
})
</script>

<style scoped>
.toast-enter-active { transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { transition: all 0.2s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(20px); }
.animate-fade-up { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>