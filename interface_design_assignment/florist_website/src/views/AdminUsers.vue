<template>
  <div class="space-y-5">
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div v-for="s in userStats" :key="s.label"
           class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-cream-200 shadow-xs transition-all hover:bg-white/90">
        <p class="text-[10px] font-bold uppercase tracking-wider text-ink/40 mb-1">{{ s.label }}</p>
        <p class="font-serif text-xl font-bold text-ink leading-none" :class="s.color">{{ s.value }}</p>
      </div>
    </div>

    <div class="bg-white/40 backdrop-blur-sm border border-cream-200/60 rounded-3xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
      
      <div class="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div class="relative flex-1 min-w-[200px]">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
          </svg>
          <input v-model="search" type="text" placeholder="Search customer by name or email..."
            class="pl-9 pr-4 py-2 text-sm bg-white border border-cream-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CE8280]/30 w-full shadow-2xs" />
        </div>

        <div class="flex bg-cream-100/50 p-1 rounded-xl border border-cream-200/30 gap-1 overflow-x-auto hide-scrollbar">
          <button v-for="f in ['All', 'VIP', 'Staff', 'Banned']" :key="f"
            @click="filterMode = f === 'VIP' ? 'VIP Customers' : f"
            class="px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all text-center whitespace-nowrap"
            :class="(filterMode === (f === 'VIP' ? 'VIP Customers' : f)) ? 'bg-[#CE8280] text-white shadow-xs' : 'text-ink/50 hover:text-ink'">
            {{ f }}
          </button>
        </div>
      </div>

      <button @click="fetchUsers" class="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full border border-cream-300 bg-white text-ink/60 text-xs font-bold uppercase tracking-wider hover:bg-cream-100 transition-all shadow-2xs h-9 flex-shrink-0">
        <span>🔄</span> Sync Records
      </button>
    </div>

    <div class="flex items-center justify-between px-1 text-xs text-ink/50">
      <span class="font-semibold">✨ Showing {{ filteredUsers.length }} accounts of {{ users.length }} total records</span>
      <span class="text-[10px] font-bold uppercase tracking-widest text-ink/30 hidden sm:inline">CRM Analytics Center</span>
    </div>

    <!-- Mobile Card View -->
    <div class="md:hidden space-y-3">
      <div v-for="user in filteredUsers" :key="user.id"
           class="bg-white/60 backdrop-blur-sm rounded-2xl border border-cream-200 p-4 shadow-sm"
           :class="user.isBanned ? 'border-rose-200 bg-rose-50/30' : ''">
        
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-inner flex-shrink-0 transition-all border" 
               :class="Number(user.analytics?.totalSpend) >= 1000 ? 'border-[#CE8280] ring-4 ring-[#CE8280]/10 scale-105' : 'border-transparent'"
               :style="{ background: avatarColor(user.name) }">
            {{ user.name?.[0]?.toUpperCase() || '?' }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1.5">
              <p class="font-bold text-ink text-sm truncate" :class="user.isBanned ? 'line-through text-rose-500/70' : ''">{{ user.name }}</p>
              <span v-if="Number(user.analytics?.totalSpend) >= 1000" class="px-1.5 py-0.5 bg-[#CE8280] text-white text-[8px] font-black tracking-wider rounded">VIP</span>
            </div>
            <p class="text-[10px] text-ink/50 truncate">{{ user.email }}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="font-bold text-ink text-sm" :class="Number(user.analytics?.totalSpend) >= 1000 ? 'text-[#CE8280]' : ''">RM {{ user.analytics.totalSpend.toFixed(2) }}</p>
            <p class="text-[10px] text-ink/40">{{ user.analytics.orderCount }} orders</p>
          </div>
        </div>

        <div class="flex items-center gap-2 flex-wrap mb-3">
          <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border" :class="roleBadge(user.role)">{{ user.role }}</span>
          <span v-if="user.isBanned" class="px-2 py-0.5 rounded bg-rose-100 text-rose-600 border border-rose-200 text-[9px] font-bold uppercase">Banned</span>
          <span v-else class="px-2 py-0.5 rounded bg-[#9DB6A0]/20 text-[#486B4C] border border-[#9DB6A0]/30 text-[9px] font-bold uppercase">Active</span>
        </div>
        <p v-if="user.isBanned" class="text-[10px] text-rose-500 mb-3 truncate">Reason: {{ user.banReason }}</p>

        <div v-if="currentUser.role === 'admin' && user.id !== currentUser.id && user.role !== 'admin'" class="flex gap-2 pt-2 border-t border-cream-100">
          <button v-if="user.role === 'customer'" @click="updateRole(user, 'staff')"
            class="flex-1 py-1.5 rounded-xl bg-[#D4C2FC]/20 text-[#6B4C9A] hover:bg-[#D4C2FC]/50 text-[10px] font-bold uppercase tracking-widest transition-colors border border-[#D4C2FC]/30">
            Promote to Staff
          </button>
          <button v-if="user.role === 'staff'" @click="updateRole(user, 'customer')"
            class="flex-1 py-1.5 rounded-xl bg-cream-200 text-ink/60 hover:bg-cream-300 text-[10px] font-bold uppercase tracking-widest transition-colors">
            Revoke Staff
          </button>
          <button v-if="canManageBan(user) && !user.isBanned" @click="openBanModal(user)"
            class="flex-1 py-1.5 rounded-xl border border-rose-200 text-rose-500 hover:bg-rose-50 text-[10px] font-bold uppercase tracking-widest transition-colors">
            Ban ✕
          </button>
          <button v-if="canManageBan(user) && user.isBanned" @click="toggleBan(user, false, '')"
            class="flex-1 py-1.5 rounded-xl bg-[#9DB6A0] text-white hover:bg-[#7D9E81] text-[10px] font-bold uppercase tracking-widest transition-colors shadow-sm">
            Unban ✓
          </button>
        </div>
      </div>

      <div v-if="filteredUsers.length === 0" class="text-center py-12 text-ink/40 text-sm font-bold uppercase tracking-widest bg-white/60 rounded-3xl border border-cream-200">
        <span class="text-3xl block mb-2 opacity-50">🍃</span>No users found.
      </div>
    </div>

    <!-- Desktop Table View -->
    <div class="hidden md:block bg-white/60 backdrop-blur-sm rounded-3xl border border-cream-200 overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead>
            <tr class="border-b border-cream-200 bg-cream-50/50">
              <th class="px-5 py-4 text-[10px] font-bold text-ink/50 uppercase tracking-widest">User Profile</th>
              <th class="px-5 py-4 text-[10px] font-bold text-ink/50 uppercase tracking-widest">Role & Status</th>
              <th class="px-5 py-4 text-[10px] font-bold text-ink/50 uppercase tracking-widest text-right">Value (LTV)</th>
              <th class="px-5 py-4 text-[10px] font-bold text-ink/50 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-cream-100">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-white/80 transition-colors group" :class="user.isBanned ? 'bg-rose-50/30' : ''">
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-inner flex-shrink-0 transition-all border" 
                       :class="Number(user.analytics?.totalSpend) >= 1000 ? 'border-[#CE8280] ring-4 ring-[#CE8280]/15 scale-105 font-black' : 'border-transparent'"
                       :style="{ background: avatarColor(user.name) }">
                    {{ user.name?.[0]?.toUpperCase() || '?' }}
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <p class="font-bold text-ink" :class="user.isBanned ? 'line-through text-rose-500/70' : ''">{{ user.name }}</p>
                      <span v-if="Number(user.analytics?.totalSpend) >= 1000" class="px-2 py-0.5 bg-[#CE8280]/20 text-[#CE8280] text-[8px] font-black tracking-widest rounded-full uppercase animate-pulse border border-[#CE8280]/30">VIP</span>
                    </div>
                    <p class="text-[10px] text-ink/50 font-medium truncate max-w-[180px]">{{ user.email }}</p>
                    <p class="text-[10px] text-ink/40 mt-0.5">{{ user.phone || '—' }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4 space-y-1.5">
                <div class="inline-flex">
                  <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border" :class="roleBadge(user.role)">{{ user.role }}</span>
                </div>
                <div v-if="user.isBanned">
                  <span class="px-2 py-0.5 rounded bg-rose-100 text-rose-600 border border-rose-200 text-[9px] font-bold uppercase tracking-widest">Banned</span>
                  <p class="text-[9px] text-rose-500 font-bold uppercase mt-1 line-clamp-1" :title="user.banReason">Reason: {{ user.banReason }}</p>
                </div>
                <div v-else>
                  <span class="px-2 py-0.5 rounded bg-[#9DB6A0]/20 text-[#486B4C] border border-[#9DB6A0]/30 text-[9px] font-bold uppercase tracking-widest">Active</span>
                </div>
              </td>
              <td class="px-5 py-4 text-right">
                <p class="font-serif text-lg font-bold" :class="Number(user.analytics?.totalSpend) >= 1000 ? 'text-[#CE8280]' : 'text-ink'">RM {{ user.analytics.totalSpend.toFixed(2) }}</p>
                <p class="text-[10px] text-ink/50 uppercase font-bold tracking-widest mt-0.5">{{ user.analytics.orderCount }} Orders</p>
                <p v-if="user.analytics.orderCount > 0" class="text-[9px] text-ink/30 mt-1">AOV: RM {{ user.analytics.aov.toFixed(2) }}</p>
              </td>
              <td class="px-5 py-4 text-right space-y-2">
                <div v-if="currentUser.role === 'admin' && user.id !== currentUser.id && user.role !== 'admin'" class="flex justify-end">
                  <button v-if="user.role === 'customer'" @click="updateRole(user, 'staff')" class="text-[9px] px-3 py-1 rounded bg-[#D4C2FC]/30 text-[#6B4C9A] hover:bg-[#D4C2FC] transition-colors font-bold uppercase tracking-widest">Promote to Staff</button>
                  <button v-if="user.role === 'staff'" @click="updateRole(user, 'customer')" class="text-[9px] px-3 py-1 rounded bg-cream-200 text-ink/60 hover:bg-cream-300 transition-colors font-bold uppercase tracking-widest">Revoke Staff</button>
                </div>
                <div v-if="canManageBan(user)" class="flex justify-end">
                  <button v-if="!user.isBanned" @click="openBanModal(user)" class="text-[9px] px-3 py-1 rounded border border-rose-200 text-rose-500 hover:bg-rose-50 transition-colors font-bold uppercase tracking-widest">Ban User ✕</button>
                  <button v-else @click="toggleBan(user, false, '')" class="text-[9px] px-3 py-1 rounded bg-[#9DB6A0] text-white hover:bg-[#7D9E81] transition-colors font-bold uppercase tracking-widest shadow-sm">Unban User ✓</button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredUsers.length === 0">
              <td colspan="4" class="text-center py-12 text-ink/40 text-sm font-bold uppercase tracking-widest">
                <span class="text-3xl block mb-2 opacity-50">🍃</span>No users found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Ban Modal -->
    <Transition name="fade">
      <div v-if="banModal.show" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
        <div class="absolute inset-0 bg-ink/40 backdrop-blur-sm" @click="banModal.show = false" />
        <div class="relative bg-white/90 backdrop-blur-xl rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.1)] max-w-sm w-full animate-fade-up">
          <h3 class="font-serif text-xl font-bold text-rose-600 mb-1 text-center">Ban {{ banModal.user.name }}?</h3>
          <p class="text-xs text-ink/50 font-medium mb-6 text-center">They will be immediately logged out and blocked from placing orders.</p>
          
          <div class="mb-6">
            <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/60 mb-2">Ban Reason *</label>
            <input v-model="banModal.reason" type="text" placeholder="e.g. Spamming comments" class="w-full px-4 py-3 bg-white/80 border border-cream-200 rounded-xl text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all shadow-inner" />
          </div>

          <div class="flex gap-3">
            <button @click="banModal.show = false" class="flex-1 py-3 rounded-full border border-cream-200 text-ink/60 text-xs font-bold uppercase tracking-widest hover:bg-cream-50 transition-colors">Cancel</button>
            <button @click="confirmBan" :disabled="!banModal.reason" class="flex-1 py-3 rounded-full bg-rose-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-rose-600 transition-all shadow-sm disabled:opacity-50">Confirm Ban</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="toast.show" class="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white shadow-lg flex items-center gap-2" :style="{ background: toast.type === 'success' ? '#9DB6A0' : '#CE8280' }">
        {{ toast.type === 'success' ? '✓' : '⚠️' }} {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/useUserStore'

const userStore = useUserStore()
const currentUser = computed(() => userStore.user)

const users = ref([])
const loading = ref(true)
const search = ref('')
const filterMode = ref('All')

const banModal = ref({ show: false, user: null, reason: '' })
const toast = ref({ show: false, message: '', type: 'success' })

function showToast(message, type = 'success') {
  toast.value = { show: true, message, type }; setTimeout(() => toast.value.show = false, 3000)
}

async function fetchUsers() {
  loading.value = true
  try {
    const res = await fetch(`/api/users?_t=${Date.now()}`)
    if (res.ok) users.value = (await res.json()).data || []
  } catch (err) {
    showToast('Failed to sync users', 'error')
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)

// RBAC Logic
function canManageBan(targetUser) {
  if (targetUser.id === currentUser.value.id) return false
  if (targetUser.role === 'admin') return false
  if (currentUser.value.role === 'staff' && targetUser.role === 'staff') return false
  return true
}

// Actions
async function updateRole(user, newRole) {
  if (!confirm(`Are you sure you want to change ${user.name}'s role to ${newRole.toUpperCase()}?`)) return
  try {
    const res = await fetch(`/api/users/${user.id}/role`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole })
    })
    if (!res.ok) throw new Error('Role update failed')
    user.role = newRole
    showToast(`Successfully changed role to ${newRole}`)
  } catch (err) { showToast(err.message, 'error') }
}

function openBanModal(user) {
  banModal.value = { show: true, user, reason: '' }
}

async function confirmBan() {
  await toggleBan(banModal.value.user, true, banModal.value.reason)
  banModal.value.show = false
}

async function toggleBan(user, isBanned, reason) {
  try {
    const res = await fetch(`/api/users/${user.id}/ban`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isBanned, reason })
    })
    if (!res.ok) throw new Error(isBanned ? 'Ban failed' : 'Unban failed')
    user.isBanned = isBanned
    user.banReason = isBanned ? reason : null
    showToast(isBanned ? `${user.name} has been banned.` : `${user.name} access restored.`)
  } catch (err) { showToast(err.message, 'error') }
}

// Computed & Helpers
const filteredUsers = computed(() => {
  let res = users.value
  
  // VIP threshold locked at RM 1000
  if (filterMode.value === 'VIP Customers') res = res.filter(u => Number(u.analytics?.totalSpend) >= 1000)
  if (filterMode.value === 'Staff') res = res.filter(u => u.role === 'staff')
  if (filterMode.value === 'Banned') res = res.filter(u => u.isBanned)

  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    res = res.filter(u => u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q))
  }
  return res.sort((a, b) => Number(b.analytics?.totalSpend) - Number(a.analytics?.totalSpend))
})

const userStats = computed(() => {
  // VIP count synchronized to RM 1000 threshold
  const vips = users.value.filter(u => Number(u.analytics?.totalSpend) >= 1000).length
  const totalRev = users.value.reduce((sum, u) => sum + Number(u.analytics?.totalSpend || 0), 0)
  return [
    { label: 'Total Users', value: users.value.length },
    { label: 'VIP (RM1000+)', value: vips, color: 'text-[#CE8280]' },
    { label: 'Total LTV', value: `RM ${totalRev.toFixed(0)}`, color: 'text-[#9DB6A0]' },
    { label: 'Banned Accounts', value: users.value.filter(u => u.isBanned).length, color: 'text-rose-500' },
  ]
})

function roleBadge(role) {
  const map = {
    admin: 'bg-ink text-white border-ink',
    staff: 'bg-[#D4C2FC]/20 text-[#6B4C9A] border-[#D4C2FC]/40',
    customer: 'bg-cream-100 text-ink/50 border-cream-200'
  }
  return map[role] || map.customer
}

function avatarColor(name) {
  const colors = ['#CE8280', '#9DB6A0', '#D4C2FC', '#E8D08A', '#7D9E81', '#C97A79']
  return colors[(name?.charCodeAt(0) || 0) % colors.length]
}
</script>

<style scoped>
.toast-enter-active { transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { transition: all 0.2s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(16px); }
.animate-fade-up { animation: fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>