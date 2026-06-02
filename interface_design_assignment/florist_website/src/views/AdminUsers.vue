<template>
  <div class="space-y-6 animate-fade-up">

    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="font-serif text-2xl text-ink font-bold">User Management</h2>
        <p class="text-sm text-ink/50 mt-0.5">Analyze customer value, assign staff roles, and manage community access.</p>
      </div>
      <button @click="fetchUsers" class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cream-200 text-sm font-bold tracking-wider uppercase text-ink/60 hover:bg-[#CE8280] hover:text-white transition-all shadow-sm">
        🔄 Refresh
      </button>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div v-for="s in userStats" :key="s.label" class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-cream-200 shadow-sm relative overflow-hidden">
        <p class="text-[10px] text-ink/50 font-bold uppercase tracking-widest mb-1">{{ s.label }}</p>
        <p class="font-serif text-2xl font-bold" :class="s.color || 'text-ink'">{{ s.value }}</p>
      </div>
    </div>

    <div class="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
      <div class="flex flex-wrap bg-white/40 p-1.5 rounded-2xl border border-cream-100 shadow-sm gap-1">
        <button v-for="f in ['All', 'VIP Customers', 'Staff', 'Banned']" :key="f"
          @click="filterMode = f"
          class="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all"
          :class="filterMode === f ? 'bg-white text-[#CE8280] shadow-sm' : 'text-ink/50 hover:text-ink hover:bg-white/50'">
          {{ f }}
        </button>
      </div>
      <div class="relative w-full xl:w-72">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input v-model="search" type="text" placeholder="Search name or email..."
          class="w-full pl-9 pr-4 py-2.5 text-sm bg-white/70 border border-cream-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CE8280]/30 transition-all shadow-inner" />
      </div>
    </div>

    <div class="bg-white/60 backdrop-blur-sm rounded-3xl border border-cream-200 overflow-hidden shadow-sm">
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
                  <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-inner flex-shrink-0" :style="{ background: avatarColor(user.name) }">
                    {{ user.name?.[0]?.toUpperCase() || '?' }}
                  </div>
                  <div>
                    <p class="font-bold text-ink" :class="user.isBanned ? 'line-through text-rose-500/70' : ''">{{ user.name }}</p>
                    <p class="text-[10px] text-ink/50 font-medium truncate max-w-[180px]">{{ user.email }}</p>
                    <p class="text-[10px] text-ink/40 mt-0.5">{{ user.phone || '—' }}</p>
                  </div>
                </div>
              </td>

              <td class="px-5 py-4 space-y-1.5">
                <div class="inline-flex">
                  <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border" :class="roleBadge(user.role)">
                    {{ user.role }}
                  </span>
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
                <p class="font-serif text-lg font-bold text-ink">RM {{ user.analytics.totalSpend.toFixed(2) }}</p>
                <p class="text-[10px] text-ink/50 uppercase font-bold tracking-widest mt-0.5">{{ user.analytics.orderCount }} Orders</p>
                <p v-if="user.analytics.orderCount > 0" class="text-[9px] text-ink/30 mt-1">AOV: RM {{ user.analytics.aov.toFixed(2) }}</p>
              </td>

              <td class="px-5 py-4 text-right space-y-2">
                
                <div v-if="currentUser.role === 'admin' && user.id !== currentUser.id && user.role !== 'admin'" class="flex justify-end">
                  <button v-if="user.role === 'customer'" @click="updateRole(user, 'staff')" class="text-[9px] px-3 py-1 rounded bg-[#D4C2FC]/30 text-[#6B4C9A] hover:bg-[#D4C2FC] transition-colors font-bold uppercase tracking-widest">
                    Promote to Staff
                  </button>
                  <button v-if="user.role === 'staff'" @click="updateRole(user, 'customer')" class="text-[9px] px-3 py-1 rounded bg-cream-200 text-ink/60 hover:bg-cream-300 transition-colors font-bold uppercase tracking-widest">
                    Revoke Staff
                  </button>
                </div>

                <div v-if="canManageBan(user)" class="flex justify-end">
                  <button v-if="!user.isBanned" @click="openBanModal(user)" class="text-[9px] px-3 py-1 rounded border border-rose-200 text-rose-500 hover:bg-rose-50 transition-colors font-bold uppercase tracking-widest">
                    Ban User ✕
                  </button>
                  <button v-else @click="toggleBan(user, false, '')" class="text-[9px] px-3 py-1 rounded bg-[#9DB6A0] text-white hover:bg-[#7D9E81] transition-colors font-bold uppercase tracking-widest shadow-sm">
                    Unban User ✓
                  </button>
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

    <Transition name="fade">
      <div v-if="banModal.show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-ink/40 backdrop-blur-sm" @click="banModal.show = false" />
        <div class="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.1)] max-w-sm w-full animate-fade-up">
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

    <Transition name="toast">
      <div v-if="toast.show" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white shadow-lg flex items-center gap-2" :style="{ background: toast.type === 'success' ? '#9DB6A0' : '#CE8280' }">
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

// ── RBAC Logic ───────────────────────────────────────────────────────────
function canManageBan(targetUser) {
  // Admin can ban Customer and Staff. Staff can only ban Customer. Cannot ban Admin or Self.
  if (targetUser.id === currentUser.value.id) return false
  if (targetUser.role === 'admin') return false
  if (currentUser.value.role === 'staff' && targetUser.role === 'staff') return false
  return true
}

// ── Actions ──────────────────────────────────────────────────────────────
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

// ── Computed & Helpers ───────────────────────────────────────────────────
const filteredUsers = computed(() => {
  let res = users.value
  
  if (filterMode.value === 'VIP Customers') res = res.filter(u => u.analytics.totalSpend >= 100)
  if (filterMode.value === 'Staff') res = res.filter(u => u.role === 'staff')
  if (filterMode.value === 'Banned') res = res.filter(u => u.isBanned)

  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    res = res.filter(u => u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q))
  }
  return res
})

const userStats = computed(() => {
  const vips = users.value.filter(u => u.analytics.totalSpend >= 100).length
  const totalRev = users.value.reduce((sum, u) => sum + u.analytics.totalSpend, 0)
  return [
    { label: 'Total Users', value: users.value.length },
    { label: 'VIP Customers', value: vips, color: 'text-[#D4C2FC]' },
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
</style>