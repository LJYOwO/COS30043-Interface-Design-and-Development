<template>
  <div class="space-y-6">

    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="font-serif text-2xl text-ink font-bold">Flower Inventory</h2>
        <p class="text-sm text-ink/50 mt-0.5">Manage stems available in the Bouquet Customizer.</p>
      </div>
      <button
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#CE8280] text-white text-sm font-medium hover:bg-[#B87472] transition-all shadow-petal"
        @click="openModal(null)"
      >
        + Add Flower
      </button>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div v-for="s in inventoryStats" :key="s.label"
           class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-cream-200">
        <p class="text-xs text-ink/50 mb-1">{{ s.label }}</p>
        <p class="font-serif text-xl font-bold text-ink">{{ s.value }}</p>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div class="flex items-center gap-3 flex-wrap">
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
          </svg>
          <input v-model="search" type="text" placeholder="Search flowers…"
            class="pl-9 pr-4 py-2 text-sm bg-white/70 border border-cream-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CE8280]/30 w-48"/>
        </div>
        <select v-model="categoryFilter"
          class="text-xs bg-white/70 border border-cream-200 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CE8280]/30 cursor-pointer">
          <option value="">All Categories</option>
          <option v-for="cat in CATEGORIES" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
      <div class="flex items-center gap-4 text-xs text-ink/50">
        <span class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-red-400 inline-block"></span>Low Stock ({{ lowStockCount }})
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-[#9DB6A0] inline-block"></span>In Stock ({{ inStockCount }})
        </span>
      </div>
    </div>

    <div v-if="loading" class="space-y-2">
      <div v-for="n in 8" :key="n" class="h-14 rounded-2xl animate-pulse bg-cream-200"/>
    </div>

    <div v-else-if="error" class="text-center py-12 rounded-3xl bg-white/60 border border-cream-200">
      <p class="text-4xl mb-2">⚠️</p>
      <p class="text-sm text-ink/50 mb-3">{{ error }}</p>
      <button class="text-xs text-[#9DB6A0] underline" @click="fetchFlowers">Retry</button>
    </div>

    <div v-else class="bg-white/60 backdrop-blur-sm rounded-3xl border border-cream-200 overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-cream-200 bg-cream-50">
              <th class="text-left px-5 py-3 text-[10px] font-bold text-ink/50 uppercase tracking-widest">Flower</th>
              <th class="text-left px-4 py-3 text-[10px] font-bold text-ink/50 uppercase tracking-widest">Category</th>
              <th class="text-left px-4 py-3 text-[10px] font-bold text-ink/50 uppercase tracking-widest">Origin</th>
              <th class="text-left px-4 py-3 text-[10px] font-bold text-ink/50 uppercase tracking-widest">Price/Stem</th>
              <th class="text-left px-4 py-3 text-[10px] font-bold text-ink/50 uppercase tracking-widest">Stock</th>
              <th class="text-left px-4 py-3 text-[10px] font-bold text-ink/50 uppercase tracking-widest">Status</th>
              <th class="text-left px-4 py-3 text-[10px] font-bold text-ink/50 uppercase tracking-widest">Vase Life</th>
              <th class="text-left px-4 py-3 text-[10px] font-bold text-ink/50 uppercase tracking-widest">Scent</th>
              <th class="text-right px-5 py-3 text-[10px] font-bold text-ink/50 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-cream-100">
            <tr v-for="flower in filteredInventory" :key="flower.id"
                class="hover:bg-white transition-colors group">

              <td class="px-5 py-3.5">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 shadow-xs border border-cream-100"
                       :style="{ background: flower.bg || bgMap[flower.category] || BG_PRESETS[0].value }">
                    <img v-if="flower.imageUrl" :src="flower.imageUrl" class="w-full h-full object-contain drop-shadow-sm p-1" />
                    <span v-else>{{ flower.emoji }}</span>
                  </div>
                  <div>
                    <p class="font-bold text-ink text-sm">{{ flower.name }}</p>
                    <p class="text-[10px] text-ink/40 font-mono">id: {{ flower.id }}</p>
                  </div>
                </div>
              </td>

              <td class="px-4 py-3.5">
                <span class="px-2.5 py-1 rounded-md border border-cream-200 text-[10px] font-bold tracking-wider uppercase text-ink/60">{{ flower.category }}</span>
              </td>

              <td class="px-4 py-3.5 text-xs text-ink/60 font-medium">{{ flower.origin || '—' }}</td>

              <td class="px-4 py-3.5 font-bold text-ink">RM {{ flower.price?.toFixed(2) }}</td>

              <td class="px-4 py-3.5">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-ink text-sm w-6">{{ flower.stock }}</span>
                  <div class="w-14 h-1.5 rounded-full bg-cream-200 overflow-hidden">
                    <div class="h-full rounded-full transition-all"
                         :class="flower.stock < 20 ? 'bg-red-400' : flower.stock < 50 ? 'bg-amber-400' : 'bg-[#9DB6A0]'"
                         :style="{ width: `${Math.min(100, (flower.stock / 150) * 100)}%` }"/>
                  </div>
                </div>
              </td>

              <td class="px-4 py-3.5">
                <span class="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border" :class="statusBadge(flower.stock)">
                  {{ stockLabel(flower.stock) }}
                </span>
              </td>

              <td class="px-4 py-3.5 text-xs text-ink/60">{{ flower.vaseLife || '—' }}</td>
              <td class="px-4 py-3.5 text-xs text-ink/60">{{ flower.scent || '—' }}</td>

              <td class="px-5 py-3.5">
                <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button class="p-1.5 rounded-lg bg-cream-50 hover:bg-cream-200 text-ink/50 hover:text-ink transition-colors border border-cream-100"
                          title="Edit" @click="openModal(flower)">✏️</button>
                  <button class="p-1.5 rounded-lg bg-cream-50 hover:bg-[#9DB6A0]/20 text-ink/50 hover:text-[#9DB6A0] transition-colors border border-cream-100"
                          title="Quick restock +50" @click="quickRestock(flower)">📦</button>
                  <button class="p-1.5 rounded-lg bg-cream-50 hover:bg-red-50 text-ink/50 hover:text-red-500 transition-colors border border-cream-100"
                          title="Delete" @click="confirmDelete(flower)">🗑️</button>
                </div>
              </td>
            </tr>

            <tr v-if="filteredInventory.length === 0">
              <td colspan="9" class="text-center py-12 text-ink/40 text-sm">
                <span class="text-3xl block mb-2">🌾</span>No flowers match your search.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-between px-5 py-3 border-t border-cream-100 text-xs text-ink/50 font-medium">
        <span>{{ filteredInventory.length }} of {{ inventory.length }} flowers</span>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-ink/30 backdrop-blur-sm" @click="closeModal"/>
        <div class="relative rounded-3xl shadow-glass-lg w-full max-w-lg overflow-hidden bg-white">

          <div class="flex items-center justify-between px-6 py-4 border-b border-cream-200 bg-cream-50">
            <h3 class="font-serif text-lg font-bold text-ink">
              {{ editingFlower ? `Edit — ${editingFlower.name}` : 'Add New Flower' }}
            </h3>
            <button class="p-1.5 rounded-full hover:bg-cream-200 transition-colors text-ink/40"
                    @click="closeModal">✕</button>
          </div>

          <div class="p-6 space-y-4 max-h-[68vh] overflow-y-auto">

            <div class="grid grid-cols-3 gap-3">
              <div class="col-span-2">
                <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Flower Name *</label>
                <input v-model="modalForm.name" type="text" placeholder="e.g. Garden Rose" class="flora-input"/>
              </div>
              <div>
                <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Emoji *</label>
                <input v-model="modalForm.emoji" type="text" placeholder="🌹" class="flora-input text-center text-xl"/>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Category *</label>
                <select v-model="modalForm.category" class="flora-input">
                  <option v-for="cat in CATEGORIES" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>
              <div>
                <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Origin Country</label>
                <input v-model="modalForm.origin" type="text" placeholder="e.g. Colombia" class="flora-input"/>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Price per Stem (RM) *</label>
                <input v-model.number="modalForm.price" type="number" step="0.5" min="0" class="flora-input"/>
              </div>
              <div>
                <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Stock (stems) *</label>
                <input v-model.number="modalForm.stock" type="number" min="0" class="flora-input"/>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Vase Life</label>
                <input v-model="modalForm.vaseLife" type="text" placeholder="e.g. 10–14 days" class="flora-input"/>
              </div>
              <div>
                <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Scent Level</label>
                <select v-model="modalForm.scent" class="flora-input">
                  <option value="">Not specified</option>
                  <option>None</option>
                  <option>Mild</option>
                  <option>Sweet</option>
                  <option>Aromatic</option>
                  <option>Herbal</option>
                  <option>Earthy</option>
                  <option>Subtle</option>
                  <option>Fragrant</option>
                  <option>Strongly Fragrant</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-2">Season Availability</label>
              <div class="flex flex-wrap gap-2">
                <label v-for="season in SEASONS" :key="season.name"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border cursor-pointer transition-all text-xs font-bold uppercase tracking-wider select-none shadow-sm"
                  :class="modalForm.seasons.includes(season.name)
                    ? 'border-[#CE8280] bg-[#CE8280] text-white'
                    : 'border-cream-200 text-ink/50 hover:border-[#CE8280]/40'">
                  <input type="checkbox" :value="season.name" v-model="modalForm.seasons" class="hidden"/>
                  {{ season.icon }} {{ season.name }}
                </label>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-2">
                Flower Image <span class="text-[#CE8280]">(Uploaded directly to Bucket)</span>
              </label>

              <div
                class="border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all mb-2"
                :class="imageDragOver ? 'border-[#CE8280] bg-[#CE8280]/5' : 'border-cream-200 hover:border-[#CE8280]/40 bg-cream-50/50'"
                @dragover.prevent="imageDragOver = true"
                @dragleave="imageDragOver = false"
                @drop.prevent="handleImageDrop"
                @click="$refs.imgFileInput.click()"
              >
                <input ref="imgFileInput" type="file" accept="image/png,image/webp,image/jpeg" class="hidden" @change="handleImageFile"/>
                
                <div v-if="imageUploading" class="py-4 flex flex-col items-center justify-center text-[#CE8280]">
                  <span class="w-6 h-6 border-2 border-[#CE8280]/30 border-t-[#CE8280] rounded-full animate-spin mb-2"/>
                  <p class="text-xs font-bold tracking-wider">Streaming to Bucket...</p>
                </div>
                <div v-else-if="modalForm.imageUrl" class="flex items-center justify-center gap-3">
                  <img :src="modalForm.imageUrl" class="h-16 w-16 object-contain rounded-xl border border-cream-200 bg-white shadow-sm p-1" :alt="modalForm.name"/>
                  <div class="text-left">
                    <p class="text-xs font-bold text-[#486B4C]">Asset secured in Cloud ✓</p>
                    <p class="text-[10px] text-ink/40 font-bold uppercase tracking-wider mt-1">Click to replace</p>
                  </div>
                </div>
                <div v-else>
                  <p class="text-2xl mb-1">🖼️</p>
                  <p class="text-xs font-bold text-ink/60">Drop PNG here or click to browse</p>
                  <p class="text-[10px] text-ink/40 mt-1 uppercase tracking-widest font-bold">PNG with transparent bg</p>
                </div>
              </div>

              <div class="flex gap-2 items-center mt-2">
                <span class="text-[10px] text-ink/30 font-bold uppercase tracking-wider flex-shrink-0">or URL:</span>
                <input
                  v-model="modalForm.imageUrl"
                  type="url"
                  placeholder="https://your-bucket-url.supabase.co/..."
                  class="flora-input flex-1 text-xs"
                />
                <button
                  v-if="modalForm.imageUrl"
                  class="text-[10px] text-red-500 font-bold uppercase tracking-wider hover:text-red-700 flex-shrink-0"
                  @click="modalForm.imageUrl = ''"
                >Clear</button>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-2">
                Card Background (shown in customizer)
              </label>
              <div class="flex flex-wrap gap-2 items-center">
                <button v-for="bg in BG_PRESETS" :key="bg.label"
                  class="w-8 h-8 rounded-xl border-2 transition-all hover:scale-110 flex-shrink-0"
                  :style="{ background: bg.value }"
                  :class="modalForm.bg === bg.value ? 'border-ink scale-110 shadow-md' : 'border-white shadow-sm'"
                  :title="bg.label"
                  @click="modalForm.bg = bg.value"/>
                <div class="ml-2 flex items-center gap-2 px-3 py-1.5 rounded-xl shadow-sm border border-cream-100"
                     :style="{ background: modalForm.bg }">
                  <span class="text-xl">{{ modalForm.emoji || '🌸' }}</span>
                  <span class="text-xs text-ink/70 font-bold">{{ modalForm.name || 'Preview' }}</span>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Care Notes</label>
              <textarea v-model="modalForm.notes" rows="2"
                placeholder="Seasonal notes, care tips, supplier info…"
                class="flora-input resize-none"/>
            </div>

            <p v-if="formError" class="text-xs font-bold text-red-600 bg-red-50 rounded-xl px-4 py-3 border border-red-100">
              ⚠️ {{ formError }}
            </p>
          </div>

          <div class="flex gap-3 px-6 py-4 border-t border-cream-200 bg-cream-50">
            <button class="flex-1 py-2.5 rounded-full border border-cream-300 text-sm font-bold tracking-wider text-ink/60 uppercase hover:bg-cream-200 transition-colors"
                    @click="closeModal">Cancel</button>
            <button
              class="flex-1 py-2.5 rounded-full bg-[#CE8280] text-white text-sm font-bold tracking-wider uppercase hover:bg-[#B87472] transition-all shadow-petal flex items-center justify-center gap-2"
              :disabled="saving || imageUploading"
              @click="saveFlower">
              <span v-if="saving" class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
              {{ saving ? 'Saving…' : (editingFlower ? 'Save Changes' : 'Add Flower') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-ink/30 backdrop-blur-sm" @click="showDeleteConfirm = false"/>
        <div class="relative rounded-3xl shadow-glass-lg max-w-sm w-full p-6 text-center bg-white border border-cream-200">
          <div class="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-2xl mx-auto mb-4">🗑️</div>
          <h3 class="font-serif text-lg font-bold text-ink mb-2">Remove "{{ deletingFlower?.name }}"?</h3>
          <p class="text-sm text-ink/60 mb-6 leading-relaxed">
            This flower will be removed from inventory and will no longer appear in the Customizer.
          </p>
          <div class="flex gap-3">
            <button class="flex-1 py-2.5 rounded-full border border-cream-200 text-sm font-bold tracking-wider uppercase text-ink/60 hover:bg-cream-50 transition-colors"
                    @click="showDeleteConfirm = false">Cancel</button>
            <button class="flex-1 py-2.5 rounded-full bg-red-500 text-white text-sm font-bold tracking-wider uppercase hover:bg-red-600 transition-colors shadow-sm"
                    @click="deleteFlower">Delete</button>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="toast">
      <div v-if="toast.show"
           class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-full text-sm font-bold tracking-wider uppercase text-white shadow-lg border border-white/20 flex items-center gap-2 whitespace-nowrap"
           :style="{ background: toast.type === 'success' ? '#9DB6A0' : '#CE8280' }">
        {{ toast.type === 'success' ? '✓' : '⚠️' }} {{ toast.message }}
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

// ── Constants ────────────────────────────────────────────────────────────
const CATEGORIES = ['Roses', 'Seasonal', 'Foliage', 'Exotic', 'Delicate', 'Filler']
const SEASONS    = [
  { name: 'Spring', icon: '🌸' },
  { name: 'Summer', icon: '☀️' },
  { name: 'Autumn', icon: '🍂' },
  { name: 'Winter', icon: '❄️' },
]
const BG_PRESETS = [
  { label: 'Blush',    value: 'linear-gradient(135deg,#fde8e8,#f9d4d4)' },
  { label: 'Sage',     value: 'linear-gradient(135deg,#e8f0e9,#d6e4d8)' },
  { label: 'Lavender', value: 'linear-gradient(135deg,#ede8fd,#d4c2fc)' },
  { label: 'Ivory',    value: 'linear-gradient(135deg,#fafafa,#f0ebe0)'  },
  { label: 'Gold',     value: 'linear-gradient(135deg,#fffbe8,#f9f0c4)'  },
  { label: 'Pink',     value: 'linear-gradient(135deg,#fde8f5,#f9c4e4)'  },
  { label: 'Peach',    value: 'linear-gradient(135deg,#fff8e8,#fde9c4)'  },
  { label: 'Mauve',    value: 'linear-gradient(135deg,#f0e8fd,#d8bef9)'  },
]
const bgMap = {
  Roses:    'linear-gradient(135deg,#fde8e8,#f9d4d4)',
  Seasonal: 'linear-gradient(135deg,#fde8f5,#f9c4e4)',
  Foliage:  'linear-gradient(135deg,#e8f0e9,#d6e4d8)',
  Delicate: 'linear-gradient(135deg,#fff8e8,#fde9c4)',
  Exotic:   'linear-gradient(135deg,#f0e8fd,#d8bef9)',
  Filler:   'linear-gradient(135deg,#fafafa,#f0ebe0)',
}

// ── State ────────────────────────────────────────────────────────────────
const inventory         = ref([])
const loading           = ref(false)
const saving            = ref(false)
const imageUploading    = ref(false) // NEW: Upload lock state
const error             = ref('')
const formError         = ref('')
const search            = ref('')
const categoryFilter    = ref('')
const showModal         = ref(false)
const showDeleteConfirm = ref(false)
const editingFlower     = ref(null)
const deletingFlower    = ref(null)
const toast             = ref({ show: false, message: '', type: 'success' })
const imageDragOver     = ref(false)
const imgFileInput      = ref(null)

function emptyForm() {
  return {
    name: '', emoji: '🌸', category: 'Roses', origin: '',
    price: 4.5, stock: 100,
    vaseLife: '10–12 days', scent: '',
    seasons: [], bg: BG_PRESETS[0].value,
    imageUrl: '', notes: '',
  }
}
const modalForm = reactive(emptyForm())

// ── API helpers ───────────────────────────────────────────────────────────
async function apiFetch(url, options = {}) {
  const res  = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`)
  return json
}

// ── 🔥 FIX: Cloud Bucket Image Upload Handlers ────────────────────────────
async function uploadFlowerImage(file) {
  if (!file.type.startsWith('image/')) {
    formError.value = 'Please upload a valid image file.'
    return
  }
  imageUploading.value = true
  formError.value = ''
  const data = new FormData()
  data.append('image', file)
  
  try {
    const res = await fetch('/api/upload', { method: 'POST', body: data })
    if (!res.ok) throw new Error('Cloud storage rejected the file payload.')
    const payload = await res.json()
    modalForm.imageUrl = payload.url // Save the true bucket URL!
    showToast('Asset secured in cloud bucket', 'success')
  } catch (err) {
    formError.value = 'Upload Failed: ' + err.message
  } finally {
    imageUploading.value = false
  }
}

function handleImageFile(e) {
  const file = e.target.files[0]
  if (file) uploadFlowerImage(file)
  if (imgFileInput.value) imgFileInput.value.value = '' // reset input
}

function handleImageDrop(e) {
  imageDragOver.value = false
  const file = e.dataTransfer.files[0]
  if (file) uploadFlowerImage(file)
}

// ── Toast ─────────────────────────────────────────────────────────────────
function showToast(message, type = 'success') {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, 3000)
}

async function fetchFlowers() {
  loading.value = true
  error.value   = ''
  try {
    const json = await apiFetch('/api/flowers')
    inventory.value = (json.data || []).map(f => ({
      ...f,
      seasons: f.seasons ?? [],
      bg:      f.bg ?? bgMap[f.category] ?? BG_PRESETS[0].value,
    }))
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchFlowers)

// ── Computed ──────────────────────────────────────────────────────────────
const filteredInventory = computed(() =>
  inventory.value.filter(f => {
    const matchSearch   = !search.value || f.name.toLowerCase().includes(search.value.toLowerCase())
    const matchCategory = !categoryFilter.value || f.category === categoryFilter.value
    return matchSearch && matchCategory
  })
)
const lowStockCount = computed(() => inventory.value.filter(f => f.stock < 20).length)
const inStockCount  = computed(() => inventory.value.filter(f => f.stock >= 20).length)
const inventoryStats = computed(() => [
  { label: 'Total Flowers',  value: inventory.value.length },
  { label: 'Total Stems',    value: inventory.value.reduce((s, f) => s + (f.stock ?? 0), 0) },
  { label: 'Low Stock',      value: lowStockCount.value },
  { label: 'Avg Price/Stem', value: inventory.value.length
      ? `RM ${(inventory.value.reduce((s, f) => s + (f.price ?? 0), 0) / inventory.value.length).toFixed(2)}`
      : 'RM 0.00' },
])

// ── Helpers ───────────────────────────────────────────────────────────────
function stockLabel(stock) {
  if (stock === 0) return 'Out of Stock'
  if (stock < 20)  return 'Low Stock'
  if (stock < 50)  return 'Medium'
  return 'In Stock'
}
function statusBadge(stock) {
  if (stock === 0) return 'border-red-200 bg-red-50 text-red-600'
  if (stock < 20)  return 'border-amber-200 bg-amber-50 text-amber-600'
  if (stock < 50)  return 'border-lavender/30 bg-lavender/10 text-lavender-500'
  return 'border-[#9DB6A0]/30 bg-[#9DB6A0]/10 text-[#486B4C]'
}

// ── Modal ─────────────────────────────────────────────────────────────────
function openModal(flower) {
  formError.value     = ''
  editingFlower.value = flower
  if (flower) {
    Object.assign(modalForm, {
      ...emptyForm(),
      ...JSON.parse(JSON.stringify(flower)),
      seasons: flower.seasons ?? [],
      bg:      flower.bg ?? bgMap[flower.category] ?? BG_PRESETS[0].value,
    })
  } else {
    Object.assign(modalForm, emptyForm())
  }
  showModal.value = true
}
function closeModal() {
  if(imageUploading.value) return // Prevent closing while uploading
  showModal.value     = false
  editingFlower.value = null
  formError.value     = ''
}

// ── Save ─────────────────────────────────────────────────────────────────
async function saveFlower() {
  formError.value = ''
  if (!modalForm.name.trim()) { formError.value = 'Flower name is required.'; return }
  if (!modalForm.category)    { formError.value = 'Category is required.';    return }
  if (modalForm.price < 0)    { formError.value = 'Price must be 0 or above.'; return }
  if (modalForm.stock < 0)    { formError.value = 'Stock must be 0 or above.'; return }

  saving.value = true
  try {
    const payload = { ...modalForm }

    if (editingFlower.value) {
      const json = await apiFetch(`/api/flowers/${editingFlower.value.id}`, {
        method: 'PATCH',
        body:   JSON.stringify(payload),
      })
      const idx = inventory.value.findIndex(f => f.id === editingFlower.value.id)
      if (idx !== -1) inventory.value[idx] = {
        ...inventory.value[idx],
        ...json.data,
        seasons: json.data.seasons ?? [],
        bg:      json.data.bg ?? bgMap[json.data.category] ?? BG_PRESETS[0].value,
      }
      showToast(`"${json.data.name}" updated`)
    } else {
      const json = await apiFetch('/api/flowers', {
        method: 'POST',
        body:   JSON.stringify(payload),
      })
      inventory.value.push({
        ...json.data,
        seasons: json.data.seasons ?? [],
        bg:      json.data.bg ?? bgMap[json.data.category] ?? BG_PRESETS[0].value,
      })
      showToast(`"${json.data.name}" added to inventory`)
    }
    closeModal()
  } catch (e) {
    formError.value = 'Save failed: ' + e.message
  } finally {
    saving.value = false
  }
}

// ── Quick Restock ─────────────────────────────────────────────────────────
async function quickRestock(flower) {
  try {
    const newStock = (flower.stock ?? 0) + 50
    await apiFetch(`/api/flowers/${flower.id}`, {
      method: 'PATCH',
      body:   JSON.stringify({ stock: newStock }),
    })
    flower.stock = newStock
    showToast(`${flower.name} restocked to ${newStock} stems`)
  } catch (e) {
    showToast('Restock failed: ' + e.message, 'error')
  }
}

// ── Delete ────────────────────────────────────────────────────────────────
function confirmDelete(flower) {
  deletingFlower.value    = flower
  showDeleteConfirm.value = true
}
async function deleteFlower() {
  try {
    await apiFetch(`/api/flowers/${deletingFlower.value.id}`, { method: 'DELETE' })
    inventory.value         = inventory.value.filter(f => f.id !== deletingFlower.value.id)
    showDeleteConfirm.value = false
    showToast(`"${deletingFlower.value.name}" removed from inventory`)
    deletingFlower.value    = null
  } catch (e) {
    showToast('Delete failed: ' + e.message, 'error')
  }
}
</script>

<style scoped>
.flora-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  background-color: #FFFFFF;
  border: 1px solid #E5E7EB;
  font-size: 0.75rem;
  color: #1F2937;
  font-weight: 500;
  transition: all 0.2s ease;
}
.flora-input:focus {
  outline: none;
  border-color: #CE8280;
  box-shadow: 0 0 0 3px rgba(206,130,128,0.15);
}
.flora-input::placeholder { color: #9CA3AF; font-weight: 400; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,   .fade-leave-to     { opacity: 0; }

.toast-enter-active { transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1); }
.toast-leave-active  { transition: all 0.2s ease; }
.toast-enter-from,
.toast-leave-to      { opacity: 0; transform: translateX(-50%) translateY(16px); }
</style>