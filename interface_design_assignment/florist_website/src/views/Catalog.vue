<template>
  <div class="min-h-screen" style="background: linear-gradient(160deg, #FDFBF7 0%, #F9E5E5 40%, #EAE2FE 100%);">
    
    <div class="border-b border-[#CE8280]/20 py-12 px-4 sm:px-6 relative overflow-hidden" style="background: rgba(253,251,247,0.6); backdrop-filter: blur(12px);">
      <div class="absolute top-0 right-0 w-64 h-64 bg-[#CE8280]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div class="absolute bottom-0 left-0 w-48 h-48 bg-[#9DB6A0]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      
      <div class="max-w-7xl mx-auto relative z-10">
        <p class="text-[10px] text-[#9DB6A0] font-bold uppercase tracking-widest mb-2">FloraLab Collection</p>
        <h1 class="font-serif text-4xl sm:text-5xl text-ink font-bold drop-shadow-sm">Bloom Catalog</h1>
        <p class="mt-3 text-ink/60 text-sm max-w-md font-medium leading-relaxed">Discover our seasonal selection of botanically curated bouquets, handcrafted for every moment.</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex flex-col lg:flex-row gap-8">
        
        <aside class="w-full lg:w-56 flex-shrink-0">
          <div class="bg-white/70 backdrop-blur-xl rounded-3xl p-4 border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto hide-scrollbar space-y-4">
            
            <div>
              <h3 class="font-serif text-sm font-bold text-ink mb-1.5 text-[#CE8280]">Occasion</h3>
              <label v-for="occ in occasions" :key="occ" class="flex items-center gap-2.5 mb-1 cursor-pointer group">
                <input 
                  type="checkbox" 
                  :value="occ" 
                  v-model="filters.occasions" 
                  class="rounded w-3.5 h-3.5 border-gray-300 text-[#CE8280] focus:ring-[#CE8280]/30 transition-all" 
                />
                <span class="text-xs text-ink/70 font-medium group-hover:text-ink transition-colors">{{ occ }}</span>
              </label>
            </div>

            <div>
              <h3 class="font-serif text-sm font-bold text-ink mb-1.5 text-[#CE8280]">Season</h3>
              <label v-for="season in seasons" :key="season" class="flex items-center gap-2.5 mb-1 cursor-pointer group">
                <input 
                  type="checkbox" 
                  :value="season" 
                  v-model="filters.seasons" 
                  class="rounded w-3.5 h-3.5 border-gray-300 text-[#CE8280] focus:ring-[#CE8280]/30 transition-all" 
                />
                <span class="text-xs text-ink/70 font-medium group-hover:text-ink transition-colors">{{ season }}</span>
              </label>
            </div>

            <div>
              <h3 class="font-serif text-sm font-bold text-ink mb-1.5 text-[#CE8280]">Price Range</h3>
              <div class="space-y-1">
                <label v-for="range in priceRanges" :key="range.value" class="flex items-center gap-2.5 cursor-pointer group">
                  <input 
                    type="radio" 
                    :value="range.value" 
                    v-model="filters.price" 
                    name="priceRange" 
                    class="w-3.5 h-3.5 text-[#CE8280] focus:ring-[#CE8280]/30 transition-all" 
                  />
                  <span class="text-xs text-ink/70 font-medium group-hover:text-ink transition-colors">{{ range.label }}</span>
                </label>
              </div>
            </div>

            <div>
              <h3 class="font-serif text-sm font-bold text-ink mb-1.5 text-[#CE8280]">Color Palette</h3>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="color in colors" 
                  :key="color"
                  class="w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 shadow-sm"
                  :style="{ backgroundColor: colorMap[color], borderColor: filters.color === color ? '#CE8280' : 'transparent' }"
                  :title="color"
                  @click="filters.color = filters.color === color ? '' : color"
                ></button>
              </div>
            </div>

            <div class="pt-2 border-t border-gray-200/50">
              <button 
                @click="resetFilters" 
                class="w-full py-2 rounded-full border border-[#CE8280]/30 text-[#CE8280] text-[10px] font-bold uppercase tracking-wider hover:bg-[#CE8280] hover:text-white transition-all"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </aside>

        <main class="flex-1">
          
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-white/50 backdrop-blur-sm p-3 px-5 rounded-full border border-white/50 shadow-sm">
            <div class="relative w-full sm:w-72">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                v-model="search"
                type="text"
                placeholder="Search blooms, vibes, colors..."
                class="w-full pl-9 pr-4 py-2 bg-white/80 border border-transparent rounded-full text-sm focus:outline-none focus:border-[#CE8280]/40 focus:ring-2 focus:ring-[#CE8280]/10 transition-all shadow-inner"
              />
            </div>

            <div class="flex items-center gap-3">
              <span class="text-[10px] text-ink/40 font-bold uppercase tracking-widest">Sort By</span>
              <select 
                v-model="sortBy" 
                class="bg-white/80 border border-transparent rounded-full px-4 py-2 text-sm text-ink/80 focus:outline-none focus:border-[#CE8280]/40 focus:ring-2 focus:ring-[#CE8280]/10 font-medium cursor-pointer shadow-sm"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            <div v-for="n in 6" :key="n" class="bg-white/50 rounded-3xl h-80 border border-white/50"></div>
          </div>

          <div v-else-if="error" class="text-center py-20 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/50 shadow-sm">
            <span class="text-5xl block mb-4 opacity-50">⚠️</span>
            <h3 class="font-serif text-xl font-bold text-ink">Connection Error</h3>
            <p class="text-sm text-ink/50 mt-2 mb-4">{{ error }}</p>
            <button 
              @click="fetchProducts" 
              class="px-6 py-2 rounded-full bg-[#CE8280]/20 text-[#CE8280] text-sm font-medium hover:bg-[#CE8280] hover:text-white transition-colors"
            >
              Retry
            </button>
          </div>

          <div v-else-if="filteredProducts.length === 0" class="text-center py-20 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/50 shadow-sm">
            <span class="text-5xl block mb-4 opacity-50">🥀</span>
            <h3 class="font-serif text-xl font-bold text-ink">No blooms found</h3>
            <p class="text-sm text-ink/50 mt-2">Try adjusting your filters or search terms.</p>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <RouterLink
              v-for="item in filteredProducts"
              :key="item.id"
              :to="'/product/' + item.id"
              class="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-white/50 flex flex-col"
            >
              <div class="absolute top-4 right-4 z-10 flex flex-col gap-1.5 items-end">
                <span v-if="item.isFeatured" class="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[9px] font-bold uppercase tracking-widest text-ink shadow-sm">Featured</span>
                <span v-if="item.isNew" class="px-2.5 py-1 rounded-full bg-[#9DB6A0] text-white text-[9px] font-bold uppercase tracking-widest shadow-sm">New</span>
              </div>

              <div class="aspect-square relative overflow-hidden bg-gray-50 flex items-center justify-center border-b border-white/50" :style="{ background: item.bg || '#FDFBF7' }">
                <img 
                  v-if="item.imageUrl" 
                  :src="item.imageUrl" 
                  :alt="item.name" 
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <span v-else class="text-7xl transition-transform duration-500 group-hover:scale-110">{{ item.emoji || '🌸' }}</span>
              </div>

              <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <h3 class="font-serif text-lg font-bold text-ink leading-tight group-hover:text-[#CE8280] transition-colors">{{ item.name }}</h3>
                    <span class="font-bold text-ink whitespace-nowrap text-sm">RM {{ parseFloat(item.price).toFixed(2) }}</span>
                  </div>
                  <p class="text-xs text-ink/50 line-clamp-2 mt-1.5 font-medium leading-relaxed">{{ item.desc }}</p>
                </div>
                
                <button
                  @click.prevent="quickAdd(item)"
                  class="mt-5 w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                  :class="item.stock > 0 
                    ? 'bg-[#FDFBF7] text-[#CE8280] border border-[#CE8280]/20 hover:bg-[#CE8280] hover:text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'"
                  :disabled="item.stock <= 0"
                >
                  {{ item.stock > 0 ? 'Quick Add' : 'Sold Out' }}
                </button>
              </div>
            </RouterLink>
          </div>
        </main>
      </div>
    </div>
    
    <Transition name="toast">
      <div 
        v-if="toast.show" 
        class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white shadow-xl flex items-center gap-2" 
        :style="{ background: toast.type === 'success' ? '#9DB6A0' : '#CE8280' }"
      >
        {{ toast.type === 'success' ? '✓' : '⚠️' }} {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/useCartStore'

const cartStore = useCartStore()

// ── State ─────────────────────────────────────────────────────────────────
const loading = ref(true)
const error = ref('')
const products = ref([])
const search = ref('')
const sortBy = ref('featured')
const filters = ref({ occasions: [], seasons: [], price: '', color: '' })

// ── Filter Options ────────────────────────────────────────────────────────
const occasions = ['Wedding', 'Anniversary', 'Birthday', 'Corporate', 'Self-Care']
const seasons = ['Spring', 'Summer', 'Autumn', 'Winter']

const priceRanges = [
  { label: 'All Prices', value: '' },
  { label: 'Under RM 50', value: '0-50' },
  { label: 'RM 50 – RM 100', value: '50-100' },
  { label: 'RM 100 – RM 150', value: '100-150' },
  { label: 'Over RM 150', value: '150-9999' },
]

// Expanded Colors Array
const colors = ['Pink', 'White', 'Green', 'Purple', 'Yellow', 'Red', 'Peach', 'Blue', 'Orange', 'Burgundy']
const colorMap = {
  Pink: '#F9D4D4', 
  White: '#FDFBF7', 
  Green: '#D6E4D8',
  Purple: '#D4C2FC', 
  Yellow: '#F9F0C4', 
  Red: '#E9A6A6',
  Peach: '#FDEEE0',
  Blue: '#C2E0FC',
  Orange: '#F5C9A0',
  Burgundy: '#7A3B4C'
}

// ── Toast Helper ──────────────────────────────────────────────────────────
const toast = ref({ show: false, message: '', type: 'success' })
function showToast(message, type = 'success') {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, 2500)
}

// ── Quick Add to Cart ─────────────────────────────────────────────────────
function quickAdd(item) {
  cartStore.addItem({ 
    id: item.id, 
    name: item.name, 
    price: item.price, 
    image: item.imageUrl || '/images/placeholder.jpg', 
    emoji: item.emoji || '🌸' 
  }, 1)
  showToast('Added to cart! 🌸')
}

// ── Fetch Products from API ───────────────────────────────────────────────
async function fetchProducts() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch('/api/products')
    if (res.ok) {
      const data = await res.json()
      products.value = data.data || data || []
    } else {
      throw new Error('Failed to fetch products')
    }
  } catch (err) { 
    console.error('[CATALOG_FETCH_ERROR]', err)
    error.value = 'Unable to load products. Please check your connection.'
  } finally { 
    loading.value = false 
  }
}

onMounted(fetchProducts)

// ── Price Filter Helper ───────────────────────────────────────────────────
function matchesPrice(price, rangeStr) {
  if (!rangeStr) return true
  const [min, max] = rangeStr.split('-').map(Number)
  return price >= min && price <= max
}

// ── Reset All Filters ─────────────────────────────────────────────────────
function resetFilters() {
  filters.value = { occasions: [], seasons: [], price: '', color: '' }
  search.value = ''
  sortBy.value = 'featured'
}

// ── Computed: Filtered & Sorted Products ──────────────────────────────────
const filteredProducts = computed(() => {
  let result = [...products.value]

  // Search filter
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    result = result.filter(p =>
      p.name?.toLowerCase().includes(q) ||
      p.desc?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.tags?.some(t => t.toLowerCase().includes(q))
    )
  }

  // Occasion filter
  if (filters.value.occasions.length) {
    result = result.filter(p => p.occasions?.some(o => filters.value.occasions.includes(o)))
  }

  // Season filter
  if (filters.value.seasons.length) {
    result = result.filter(p => p.seasons?.some(s => filters.value.seasons.includes(s)))
  }

  // Price filter
  if (filters.value.price) {
    result = result.filter(p => matchesPrice(p.price, filters.value.price))
  }

  // Color filter
  if (filters.value.color) {
    result = result.filter(p => p.colors?.includes(filters.value.color))
  }

  // Sorting
  if (sortBy.value === 'price-asc')  result.sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price-desc') result.sort((a, b) => b.price - a.price)
  if (sortBy.value === 'name')       result.sort((a, b) => a.name.localeCompare(b.name))
  if (sortBy.value === 'newest')     result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  if (sortBy.value === 'featured') {
    result.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1
      if (!a.isFeatured && b.isFeatured) return 1
      return (a.sortOrder ?? 99) - (b.sortOrder ?? 99)
    })
  }

  return result
})
</script>

<style scoped>
/* 隐藏侧边栏原生滚动条，保留滑动手感 */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.toast-enter-active { transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { transition: all 0.2s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(20px); }
</style>