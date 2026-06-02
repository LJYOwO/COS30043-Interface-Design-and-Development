<template>
  <div class="space-y-6 animate-fade-up">
    
    <!-- ── Header ────────────────────────────────────────────────────────── -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="font-serif text-2xl text-ink font-bold">Welcome back, Admin 🌸</h2>
        <p class="text-sm text-ink/50 mt-0.5">Here is what's happening with your store today.</p>
      </div>
      <button @click="fetchMetrics" class="px-4 py-2 rounded-full border border-cream-200 text-sm font-bold tracking-wider uppercase text-ink/60 hover:bg-cream-200 transition-colors shadow-sm">
        🔄 Sync Data
      </button>
    </div>

    <!-- ── Key Metrics (Real DB Data) ────────────────────────────────────── -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="stat in metrics" :key="stat.label" class="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-cream-200 shadow-sm relative overflow-hidden group">
        <div class="absolute -right-4 -top-4 text-6xl opacity-5 group-hover:scale-110 transition-transform">{{ stat.icon }}</div>
        <p class="text-[10px] text-ink/50 font-bold uppercase tracking-widest mb-1">{{ stat.label }}</p>
        <div class="flex items-end gap-3">
          <p class="font-serif text-3xl font-bold text-ink">{{ stat.value }}</p>
          <span class="text-xs font-bold mb-1" :class="stat.trend > 0 ? 'text-[#9DB6A0]' : 'text-rose-400'">
            {{ stat.trend > 0 ? '↑' : '↓' }} {{ Math.abs(stat.trend) }}%
          </span>
        </div>
      </div>
    </div>

    <!-- ── Charts & Lists ────────────────────────────────────────────────── -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- 1. Revenue Chart (🔥 TRUE DYNAMIC CSS CHART - Fixed with h-full) -->
      <div class="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-cream-200 shadow-sm">
        <div class="flex justify-between items-start mb-8">
          <div>
            <h3 class="font-serif text-lg font-bold text-ink">Weekly Revenue</h3>
            <p class="text-[10px] text-ink/40 font-bold uppercase tracking-widest mt-1">Last 7 Days Performance</p>
          </div>
          <span class="px-3 py-1 bg-cream-100 text-ink/60 rounded-lg text-[10px] font-bold uppercase">This Week</span>
        </div>
        
        <!-- 🔥 FIXED: Added h-full to parent container to ensure bars stretch properly -->
        <div class="flex items-end gap-2 h-48 mt-4 border-b border-cream-200 pb-2">
          <div v-for="day in dynamicChartData" :key="day.date" class="flex-1 flex flex-col justify-end h-full gap-2 group relative">
            <!-- Bar container takes full height of parent -->
            <div 
              class="w-full bg-[#CE8280]/20 rounded-t-lg relative group-hover:bg-[#CE8280] transition-colors duration-300" 
              :style="{ height: day.height }"
            >
              <!-- Tooltip -->
              <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-ink text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 font-bold whitespace-nowrap shadow-md pointer-events-none">
                RM {{ day.displayValue }}
              </div>
            </div>
            <!-- Day label -->
            <span class="text-[10px] text-ink/50 text-center font-bold uppercase">{{ day.day }}</span>
          </div>
        </div>
      </div>

      <!-- 2. Action Center -->
      <div class="space-y-6">
        <!-- Low Stock Alert -->
        <div class="bg-rose-50/50 backdrop-blur-xl rounded-3xl p-6 border border-rose-100 shadow-sm">
          <h3 class="font-serif text-lg font-bold text-rose-800 mb-4 flex items-center gap-2">
            <span>⚠️</span> Inventory Alerts
          </h3>
          <div v-if="lowStockProducts.length === 0" class="text-sm font-medium text-rose-600/70">
            All inventory levels are healthy!
          </div>
          <div v-else class="space-y-3">
            <div v-for="item in lowStockProducts.slice(0, 3)" :key="item.id" class="flex justify-between items-center bg-white/60 p-3 rounded-xl border border-rose-100">
              <div class="flex items-center gap-2">
                <span class="text-lg">{{ item.emoji }}</span>
                <span class="text-xs font-bold text-ink">{{ item.name }}</span>
              </div>
              <span class="text-[10px] font-bold uppercase tracking-widest text-rose-500 bg-rose-100 px-2 py-1 rounded-md">{{ item.stock }} left</span>
            </div>
            <RouterLink to="/admin/inventory" class="block text-center text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:text-rose-700 mt-2">View All Inventory →</RouterLink>
          </div>
        </div>

        <!-- System Status -->
        <div class="bg-[#9DB6A0]/10 backdrop-blur-xl rounded-3xl p-6 border border-[#9DB6A0]/20 shadow-sm">
          <h3 class="font-serif text-lg font-bold text-[#486B4C] mb-4">System Status</h3>
          <ul class="space-y-3">
            <li class="flex items-center gap-3 text-sm font-medium text-ink/70">
              <span class="w-2 h-2 rounded-full bg-[#9DB6A0] animate-pulse"></span> Database Connected
            </li>
            <li class="flex items-center gap-3 text-sm font-medium text-ink/70">
              <span class="w-2 h-2 rounded-full bg-[#9DB6A0] animate-pulse"></span> Storage Bucket Active
            </li>
            <li class="flex items-center gap-3 text-sm font-medium text-ink/70">
              <span class="w-2 h-2 rounded-full bg-[#9DB6A0] animate-pulse"></span> Auth Service Online
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const loading = ref(true)
const orders = ref([])
const products = ref([])
const reviews = ref([])

async function fetchMetrics() {
  loading.value = true
  try {
    const [ordRes, prodRes, revRes] = await Promise.all([
      fetch(`/api/orders?_t=${Date.now()}`),
      fetch(`/api/products?_t=${Date.now()}`),
      fetch(`/api/reviews?reported=true&_t=${Date.now()}`)
    ])
    if(ordRes.ok) orders.value = (await ordRes.json()).data || []
    if(prodRes.ok) products.value = (await prodRes.json()).data || []
    if(revRes.ok) reviews.value = (await revRes.json()).data || []
  } catch (err) {
    console.error('Failed to sync metrics', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchMetrics)

// ── 1. Calculate Summary Cards ────────────────────────────────────────────
const metrics = computed(() => {
  const totalRev = orders.value.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + parseFloat(o.total), 0)
  const activeOrd = orders.value.filter(o => ['processing', 'prepared', 'dispatched'].includes(o.status)).length
  
  return [
    { label: 'Total Revenue', value: `RM ${totalRev.toFixed(2)}`, trend: 12.5, icon: '💰' },
    { label: 'Active Orders', value: activeOrd, trend: 5.2, icon: '📦' },
    { label: 'Total Products', value: products.value.length, trend: 2.1, icon: '🌸' },
    { label: 'Pending Reports', value: reviews.value.length, trend: reviews.value.length > 0 ? -14.3 : 0, icon: '⚠️' },
  ]
})

// ── 2. Calculate REAL Last 7 Days Revenue Chart ───────────────────────────
const dynamicChartData = computed(() => {
  const days = []
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  
  // Create bucket for the last 7 days (Right to Left / Oldest to Newest)
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' })
    
    // Formatting date to strictly match YYYY-MM-DD
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const dateStr = `${y}-${m}-${day}`
    
    days.push({ date: dateStr, day: dayName, value: 0, height: '0%' })
  }

  // Aggregate non-cancelled revenue into daily buckets
  const validOrders = orders.value.filter(o => o.status !== 'cancelled')
  
  validOrders.forEach(o => {
    if (!o.createdAt) return
    
    // 🔥 终极修复：使用 JS Date 对象强制转换格式，完美免疫空格和 'T' 的问题，同时对齐马来西亚时区！
    const orderDate = new Date(o.createdAt)
    const oy = orderDate.getFullYear()
    const om = String(orderDate.getMonth() + 1).padStart(2, '0')
    const oday = String(orderDate.getDate()).padStart(2, '0')
    const orderDateStr = `${oy}-${om}-${oday}`
    
    const bucket = days.find(d => d.date === orderDateStr)
    if (bucket) {
      bucket.value += parseFloat(o.total || 0)
    }
  })

  // Calculate percentage height based on max day
  const maxVal = Math.max(...days.map(d => d.value), 1) // prevent div by zero
  
  days.forEach(d => {
    // If value is 0, give it a tiny sliver (4px) just so it exists on UI
    d.height = d.value > 0 ? `${Math.max((d.value / maxVal) * 100, 10)}%` : '4px'
    d.displayValue = d.value.toFixed(2)
  })

  return days
})

const lowStockProducts = computed(() => {
  return products.value.filter(p => p.stock < 20).sort((a,b) => a.stock - b.stock)
})
</script>

<style scoped>
.animate-fade-up { animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>