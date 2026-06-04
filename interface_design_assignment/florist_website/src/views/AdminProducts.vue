<template>
  <div class="space-y-5">
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div v-for="s in stats" :key="s.label"
           class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-cream-200 shadow-xs transition-all hover:bg-white/90">
        <p class="text-[10px] font-bold uppercase tracking-wider text-ink/40 mb-1">{{ s.label }}</p>
        <p class="font-serif text-xl font-bold text-ink leading-none">{{ s.value }}</p>
      </div>
    </div>

    <div class="bg-white/40 backdrop-blur-sm border border-cream-200/60 rounded-3xl p-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shadow-xs">
      
      <div class="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div class="relative flex-1 min-w-[200px]">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
          </svg>
          <input v-model="search" type="text" placeholder="Search products…"
            class="pl-9 pr-4 py-2 text-sm bg-white border border-cream-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CE8280]/30 w-full shadow-2xs" />
        </div>

        <select v-model="filterCategory" 
          class="text-xs bg-white border border-cream-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#CE8280]/30 cursor-pointer shadow-2xs font-bold text-ink/60">
          <option value="">All Categories</option>
          <option v-for="cat in CATEGORIES" :key="cat" :value="cat">{{ cat }}</option>
        </select>

        <select v-model="filterStatus" 
          class="text-xs bg-white border border-cream-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#CE8280]/30 cursor-pointer shadow-2xs font-bold text-ink/60">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div class="flex items-center justify-between lg:justify-end gap-3 border-t lg:border-t-0 pt-2 lg:pt-0 border-cream-100 flex-shrink-0">
<div class="relative bg-cream-100/80 rounded-xl p-1 flex items-center border border-cream-200/80 h-9 select-none overflow-hidden">
          
          <div
            class="absolute top-1 bottom-1 rounded-lg bg-[#CE8280] shadow-2xs transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)"
            :class="viewMode === 'grid' ? 'left-1 w-8' : 'left-9 w-8'"
          ></div>

          <button
            class="relative z-10 w-8 h-7 flex items-center justify-center rounded-lg transition-colors duration-300"
            :class="viewMode === 'grid' ? 'text-white' : 'text-ink/40 hover:text-ink/70'"
            @click="viewMode = 'grid'"
            title="Grid View"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
          </button>

          <button
            class="relative z-10 w-8 h-7 flex items-center justify-center rounded-lg transition-colors duration-300"
            :class="viewMode === 'list' ? 'text-white' : 'text-ink/40 hover:text-ink/70'"
            @click="viewMode = 'list'"
            title="List View"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
          </button>
        </div>

        <button
          class="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#CE8280] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B87472] transition-all shadow-petal h-9 flex-shrink-0"
          @click="openModal(null)"
        >
          <span>＋</span> Add Product
        </button>
      </div>
    </div>

    <div class="flex items-center justify-between px-1 text-xs text-ink/50">
      <span class="font-semibold">✨ Total of {{ filteredProducts.length }} products found</span>
      <span class="text-[10px] font-bold uppercase tracking-widest text-ink/30 hidden sm:inline">Product Catalogue System</span>
    </div>

    <!-- ── Rest of the template remains the same (Grid View, List View, Modal, etc.) ── -->
    <!-- Grid View -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-white/60 backdrop-blur-sm rounded-3xl border border-cream-200 overflow-hidden group hover:shadow-glass-lg transition-all"
      >
        <div class="relative h-44 flex items-center justify-center overflow-hidden" :style="{ background: product.bg || 'linear-gradient(135deg,#fde8e8,#f9d4d4)' }">
          <img v-if="product.imageUrl" :src="product.imageUrl" class="w-full h-full object-cover" :alt="product.name" />
          <span v-else class="text-5xl">{{ product.emoji || '🌸' }}</span>
          <div class="absolute top-3 left-3">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-medium" :class="statusBadge(product.status)">
              {{ product.status || 'active' }}
            </span>
          </div>
          <div class="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button class="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-cream transition-colors text-sm" title="Edit" @click="openModal(product)">✏️</button>
            <button class="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-cream transition-colors text-sm" title="Duplicate" @click="duplicateProduct(product)">📋</button>
            <button class="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-red-50 transition-colors text-sm" title="Delete" @click="confirmDelete(product)">🗑️</button>
          </div>
        </div>
        <div class="p-4 space-y-2">
          <div class="flex items-start justify-between gap-2">
            <div>
              <p class="font-serif font-semibold text-ink text-sm leading-tight">{{ product.name }}</p>
              <p class="text-[11px] text-ink/50 mt-0.5">{{ product.category }}</p>
            </div>
            <p class="font-bold text-sm text-[#CE8280] flex-shrink-0">${{ product.price }}</p>
          </div>
          <div class="flex flex-wrap gap-1">
            <span v-for="tag in (product.tags || []).slice(0, 3)" :key="tag" class="px-1.5 py-0.5 bg-lavender/20 text-lavender-400 rounded-md text-[10px] font-medium">
              {{ tag }}
            </span>
          </div>
          <div class="flex items-center justify-between text-xs text-ink/50 pt-1 border-t border-cream-100">
            <span>Stock: {{ product.stock ?? '—' }}</span>
            <span>{{ (product.gallery && product.gallery.length) || 0 }} gallery assets</span>
          </div>
        </div>
      </div>
      <div v-if="filteredProducts.length === 0" class="col-span-full text-center py-16 text-ink/40">
        <span class="text-4xl block mb-2">🌾</span>
        <p class="font-serif text-lg">No products found</p>
      </div>
    </div>

    <!-- List / Table View -->
    <div v-else class="bg-white/60 backdrop-blur-sm rounded-3xl border border-cream-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-cream-200 bg-cream/50">
              <th class="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wide w-12">
                <input type="checkbox" class="rounded border-[#9DB6A0]/40" @change="toggleSelectAll" />
              </th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wide">Product</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wide">Category</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wide">Price</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wide">Stock</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wide">Status</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wide">Gallery</th>
              <th class="text-right px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-cream-100">
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-cream/40 transition-colors group">
              <td class="px-4 py-3">
                <input type="checkbox" class="rounded border-[#9DB6A0]/40" :value="product.id" v-model="selected" />
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden" :style="{ background: product.bg || 'linear-gradient(135deg,#fde8e8,#f9d4d4)' }">
                    <img v-if="product.imageUrl" :src="product.imageUrl" class="w-full h-full object-cover" />
                    <span v-else class="text-lg">{{ product.emoji || '🌸' }}</span>
                  </div>
                  <div>
                    <p class="font-medium text-ink text-sm">{{ product.name }}</p>
                    <p class="text-[11px] text-ink/40 truncate max-w-[180px]">{{ product.desc || product.description }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full bg-cream-200 text-xs text-ink/60">{{ product.category }}</span></td>
              <td class="px-4 py-3 font-semibold text-ink">${{ product.price }}</td>
              <td class="px-4 py-3 text-ink/70">{{ product.stock ?? '—' }}</td>
              <td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-[11px] font-medium" :class="statusBadge(product.status)">{{ product.status || 'active' }}</span></td>
              <td class="px-4 py-3">
                <span class="text-xs text-ink/50">{{ (product.gallery && product.gallery.length) || 0 }} images</span>
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button class="p-1.5 rounded-lg hover:bg-lavender/20 text-ink/50 hover:text-ink transition-colors" @click="openModal(product)" title="Edit">✏️</button>
                  <button class="p-1.5 rounded-lg hover:bg-[#9DB6A0]/20 text-ink/50 hover:text-[#486B4C] transition-colors" @click="duplicateProduct(product)" title="Duplicate">📋</button>
                  <button class="p-1.5 rounded-lg hover:bg-red-50 text-ink/50 hover:text-red-400 transition-colors" @click="confirmDelete(product)" title="Delete">🗑️</button>
                </div>
              </td>
             </tr>
            <tr v-if="filteredProducts.length === 0">
              <td colspan="8" class="text-center py-12 text-ink/40 text-sm">
                <span class="text-3xl block mb-2">🌾</span> No products match your filters.
               </td>
             </tr>
          </tbody>
         </table>
      </div>
      <div class="flex items-center justify-between px-5 py-3 border-t border-cream-100 text-xs text-ink/50 flex-wrap gap-3">
        <div class="flex items-center gap-3">
          <span>{{ filteredProducts.length }} of {{ products.length }} products</span>
          <template v-if="selected.length > 0">
            <span class="text-[#CE8280] font-medium">{{ selected.length }} selected</span>
            <button class="text-red-400 hover:text-red-500 font-medium" @click="bulkDelete">Delete selected</button>
            <button class="text-[#9DB6A0] hover:text-[#486B4C] font-medium" @click="bulkSetStatus('archived')">Archive selected</button>
          </template>
        </div>
        <div class="flex gap-1">
          <button class="px-3 py-1 rounded-lg hover:bg-cream-200 transition-colors">← Prev</button>
          <button class="px-3 py-1 rounded-lg bg-[#CE8280]/10 text-[#CE8280] font-medium">1</button>
          <button class="px-3 py-1 rounded-lg hover:bg-cream-200 transition-colors">Next →</button>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════════════════════
         ADD / EDIT PRODUCT MODAL (Full Schema)
    ═══════════════════════════════════════════════════════════════════════ -->
    <Transition name="modal">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
        <div class="absolute inset-0 bg-[#1a1a1a]/40 backdrop-blur-sm" @click="closeModal"></div>

        <div class="relative bg-white rounded-t-3xl sm:rounded-3xl border border-cream-100 shadow-2xl max-w-4xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-5 sm:p-6 animate-fadeIn">
          <div class="flex justify-between items-start mb-6 border-b border-cream-200 pb-4">
            <div>
              <h3 class="font-serif text-xl font-bold text-ink">{{ editingProduct ? 'Edit Botanical Masterpiece' : 'Introduce New Creation' }}</h3>
              <p class="text-xs text-ink/50 mt-1 uppercase tracking-widest">Complete DB Schema Specification</p>
            </div>
            <button @click="closeModal" class="p-2 bg-cream-50 hover:bg-cream-100 rounded-full text-ink/50 transition">✕</button>
          </div>

          <form @submit.prevent="saveProduct" class="space-y-8">
            <!-- Section 1: Core Identity -->
            <section>
              <h4 class="text-xs font-bold uppercase tracking-widest text-[#CE8280] mb-3 border-l-2 border-[#CE8280] pl-2">1. Core Identity</h4>
              <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-cream-50/30 p-4 rounded-2xl border border-cream-100">
                <div class="sm:col-span-2">
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Product Name *</label>
                  <input type="text" v-model="form.name" required class="w-full px-3 py-2 bg-white border border-cream-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Category *</label>
                  <select v-model="form.category" required class="w-full px-3 py-2 bg-white border border-cream-200 rounded-xl text-sm">
                    <option v-for="c in CATEGORIES" :key="c" :value="c">{{ c }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Inventory Status</label>
                  <select v-model="form.status" class="w-full px-3 py-2 bg-white border border-cream-200 rounded-xl text-sm">
                    <option value="active">Active (Visible)</option>
                    <option value="draft">Draft (Hidden)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Base Price (RM) *</label>
                  <input type="number" step="0.01" v-model="form.price" required class="w-full px-3 py-2 bg-white border border-cream-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Stock Qty *</label>
                  <input type="number" v-model="form.stock" class="w-full px-3 py-2 bg-white border border-cream-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Emoji (Avatar)</label>
                  <input type="text" v-model="form.emoji" class="w-full px-3 py-2 bg-white border border-cream-200 rounded-xl text-sm" />
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">CSS Background</label>
                  <select v-model="form.bg" class="w-full px-3 py-2 bg-white border border-cream-200 rounded-xl text-sm">
                    <option v-for="bg in BG_PRESETS" :key="bg.label" :value="bg.value">{{ bg.label }}</option>
                  </select>
                </div>
              </div>
            </section>

            <!-- Section 2: Story & Details -->
            <section>
              <h4 class="text-xs font-bold uppercase tracking-widest text-[#CE8280] mb-3 border-l-2 border-[#CE8280] pl-2">2. Story & Details</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-cream-50/30 p-4 rounded-2xl border border-cream-100">
                <div>
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Short Description *</label>
                  <textarea v-model="form.desc" required rows="3" class="w-full px-3 py-2 bg-white border border-cream-200 rounded-xl text-sm"></textarea>
                </div>
                <div>
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Full Story (Long Desc)</label>
                  <textarea v-model="form.fullDesc" rows="3" class="w-full px-3 py-2 bg-white border border-cream-200 rounded-xl text-sm"></textarea>
                </div>
                <div>
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Care Instructions</label>
                  <textarea v-model="form.care" rows="2" placeholder="Trim stems at 45°..." class="w-full px-3 py-2 bg-white border border-cream-200 rounded-xl text-sm"></textarea>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Vase Life</label>
                    <input type="text" v-model="form.vaseLife" placeholder="e.g. 10-14 days" class="w-full px-3 py-2 bg-white border border-cream-200 rounded-xl text-sm" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Scent Profile</label>
                    <input type="text" v-model="form.scent" placeholder="e.g. Strongly Fragrant" class="w-full px-3 py-2 bg-white border border-cream-200 rounded-xl text-sm" />
                  </div>
                </div>
              </div>
            </section>

            <!-- Section 3: Taxonomy & Tags -->
            <section>
              <h4 class="text-xs font-bold uppercase tracking-widest text-[#CE8280] mb-3 border-l-2 border-[#CE8280] pl-2">3. Taxonomy & Tags</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-cream-50/30 p-4 rounded-2xl border border-cream-100">
                <div>
                  <span class="text-[10px] uppercase text-ink/50 mb-2 block font-bold">Occasions</span>
                  <div class="flex flex-wrap gap-2">
                    <button type="button" v-for="occ in ['Wedding', 'Anniversary', 'Birthday', 'Corporate', 'Self-Care']" :key="occ"
                      @click="toggleArrayItem('occasions', occ)"
                      :class="form.occasions.includes(occ) ? 'bg-[#CE8280] text-white border-[#CE8280]' : 'bg-white text-ink/60 border-cream-300'"
                      class="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full border shadow-sm transition-all">
                      {{ occ }}
                    </button>
                  </div>
                </div>
                
                <div>
                  <span class="text-[10px] uppercase text-ink/50 mb-2 block font-bold">Colors</span>
                  <div class="flex flex-wrap gap-2">
                    <button type="button" v-for="color in PRODUCT_COLORS" :key="color.name"
                      @click="toggleArrayItem('colors', color.name)"
                      :class="form.colors.includes(color.name) ? 'border-[#CE8280] shadow-md bg-white' : 'border-transparent bg-white/50 opacity-70 hover:opacity-100 hover:bg-white hover:border-cream-300'"
                      class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border-2 transition-all">
                      <span class="w-3 h-3 rounded-full border border-cream-200" :style="{ backgroundColor: color.hex }"></span>
                      <span class="text-[10px] font-bold uppercase tracking-widest text-ink/70">{{ color.name }}</span>
                    </button>
                  </div>
                </div>
                
                <div>
                  <span class="text-[10px] uppercase text-ink/50 mb-2 block font-bold">Seasons</span>
                  <div class="flex flex-wrap gap-2">
                    <button type="button" v-for="season in ['Spring', 'Summer', 'Autumn', 'Winter']" :key="season"
                      @click="toggleArrayItem('seasons', season)"
                      :class="form.seasons.includes(season) ? 'bg-amber-400 text-white border-amber-400' : 'bg-white text-ink/60 border-cream-300'"
                      class="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full border shadow-sm transition-all">
                      {{ season }}
                    </button>
                  </div>
                </div>
                <div>
                  <span class="text-[10px] uppercase text-ink/50 mb-2 block font-bold">Custom Tags (Searchable)</span>
                  <div class="flex gap-2 mb-2">
                    <input v-model="newTagInput" @keydown.enter.prevent="addCustomTag" placeholder="e.g. romantic..." class="flex-1 px-3 py-1 bg-white border border-cream-300 rounded-lg text-xs" />
                    <button type="button" @click="addCustomTag" class="px-3 py-1 bg-slate-200 rounded-lg text-xs font-bold">Add</button>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="(tag, idx) in form.tags" :key="idx" class="px-2 py-1 bg-white border border-cream-200 text-[10px] font-bold tracking-wider rounded-md flex items-center gap-1 shadow-xs">
                      #{{ tag }} <button type="button" @click="form.tags.splice(idx, 1)" class="text-rose-500 ml-1">✕</button>
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <!-- Section 4: Recipe & Variants -->
            <section>
              <h4 class="text-xs font-bold uppercase tracking-widest text-[#CE8280] mb-3 border-l-2 border-[#CE8280] pl-2">4. Recipe & Variants</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-cream-50/30 p-4 rounded-2xl border border-cream-100">
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <label class="text-[10px] font-bold uppercase tracking-wider text-ink/50">Size Variants Pricing</label>
                    <button type="button" @click="addSize" class="text-xs text-[#CE8280] font-bold hover:underline">+ Add Size</button>
                  </div>
                  <div v-for="(s, idx) in form.sizes" :key="idx" class="flex gap-2 items-center bg-white p-2 rounded-xl border border-cream-200">
                    <input type="text" v-model="s.name" placeholder="Name" class="w-1/3 px-2 py-1.5 bg-cream-50 rounded-lg text-xs" />
                    <input type="text" v-model="s.stemRange" placeholder="Stems (e.g. 15-20)" class="flex-1 px-2 py-1.5 bg-cream-50 rounded-lg text-xs" />
                    <input type="number" v-model="s.price" placeholder="RM" class="w-20 px-2 py-1.5 bg-cream-50 rounded-lg text-xs" />
                    <button type="button" @click="removeSize(idx)" class="text-rose-500 hover:text-rose-700 px-1">✕</button>
                  </div>
                </div>

                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <label class="text-[10px] font-bold uppercase tracking-wider text-ink/50">Floral Composition (Stems)</label>
                    <button type="button" @click="addStem" class="text-xs text-[#CE8280] font-bold hover:underline">+ Add Flower</button>
                  </div>
                  <div v-for="(st, idx) in form.stems" :key="idx" class="flex gap-2 items-center bg-white p-2 rounded-xl border border-cream-200">
                    <input type="text" v-model="st.emoji" placeholder="🌸" class="w-20 text-2xl text-center px-3 py-2 bg-cream-50 border border-cream-200 rounded-lg focus:border-[#CE8280] focus:outline-none" />
                    <input type="text" v-model="st.name" placeholder="Flower Name (e.g., Peony)" class="flex-1 px-3 py-2 bg-cream-50 border border-cream-200 rounded-lg text-sm font-medium focus:border-[#CE8280] focus:outline-none" />
                    <button type="button" @click="removeStem(idx)" class="text-rose-500 hover:text-rose-700 px-2 font-bold transition-colors">✕</button>
                  </div>
                  <p v-if="!form.stems.length" class="text-xs text-ink/40 italic">No stems configured. Click "+ Add Flower" to add.</p>
                </div>
              </div>
            </section>

            <!-- Section 5: Media Assets -->
            <section>
              <h4 class="text-xs font-bold uppercase tracking-widest text-[#CE8280] mb-3 border-l-2 border-[#CE8280] pl-2">5. Media Assets</h4>
              <div class="bg-cream-50/30 p-4 rounded-2xl border border-cream-100 space-y-6">
                <div class="flex items-center gap-4">
                  <div class="w-16 h-16 rounded-xl bg-white border border-cream-300 overflow-hidden flex-shrink-0">
                    <img v-if="form.imageUrl" :src="form.imageUrl" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-xl text-ink/20">🌸</div>
                  </div>
                  <div>
                    <button type="button" @click="triggerPrimaryUpload" class="px-4 py-2 bg-[#CE8280] text-white text-xs font-bold rounded-full">Primary Cover</button>
                    <input ref="primaryInputRef" type="file" @change="uploadPrimaryImage" accept="image/*" class="hidden" />
                  </div>
                </div>
                <div>
                  <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1.5">Video URL (Optional)</label>
                  <input type="text" v-model="form.videoUrl" placeholder="https://youtube.com/..." class="w-full px-3 py-2 bg-white border border-cream-200 rounded-xl text-sm" />
                </div>
                <div>
                  <button type="button" @click="triggerGalleryUpload" :disabled="galleryUploading" class="px-4 py-2 bg-[#CE8280] text-white text-xs font-bold rounded-full mb-3 disabled:opacity-50">
                    {{ galleryUploading ? 'Uploading Streams...' : 'Browse Gallery Files (Multi-Select)' }}
                  </button>
                  <input ref="galleryInputRef" type="file" @change="uploadMultipleGalleryImages" multiple accept="image/*" class="hidden" />
                  <div v-if="form.gallery.length > 0" class="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    <div v-for="(url, idx) in form.gallery" :key="idx" class="relative aspect-square rounded-xl overflow-hidden group border border-cream-300">
                      <img :src="url" class="w-full h-full object-cover" />
                      <button type="button" @click="form.gallery.splice(idx, 1)" class="absolute inset-0 bg-rose-900/80 text-white text-[10px] opacity-0 group-hover:opacity-100 flex items-center justify-center font-bold tracking-widest">REMOVE</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Section 6: Marketing & SEO -->
            <section>
              <h4 class="text-xs font-bold uppercase tracking-widest text-[#CE8280] mb-3 border-l-2 border-[#CE8280] pl-2">6. Marketing & SEO</h4>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-cream-50/30 p-4 rounded-2xl border border-cream-100">
                <div class="sm:col-span-1 space-y-4">
                  <div class="flex items-center gap-2.5">
                    <input type="checkbox" v-model="form.isFeatured" id="featured" class="w-4 h-4 rounded text-[#CE8280]" />
                    <label for="featured" class="text-xs font-bold text-ink/70">Show on Homepage (Featured)</label>
                  </div>
                  <div class="flex items-center gap-2.5">
                    <input type="checkbox" v-model="form.isBestseller" id="bestseller" class="w-4 h-4 rounded text-[#CE8280]" />
                    <label for="bestseller" class="text-xs font-bold text-ink/70">⭐ Mark as Bestseller</label>
                  </div>
                  <div class="flex items-center gap-2.5">
                    <input type="checkbox" v-model="form.isNew" id="isNew" class="w-4 h-4 rounded text-[#CE8280]" />
                    <label for="isNew" class="text-xs font-bold text-ink/70">🆕 Mark as 'New' Arrival</label>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1">Sort Order</label>
                    <input type="number" v-model="form.sortOrder" class="w-24 px-3 py-1.5 bg-white border border-cream-200 rounded-lg text-sm" />
                  </div>
                </div>
                <div class="sm:col-span-2 space-y-3">
                  <div>
                    <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1">SEO Title</label>
                    <input type="text" v-model="form.seoTitle" placeholder="Custom Browser Title" class="w-full px-3 py-1.5 bg-white border border-cream-200 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1">SEO Description</label>
                    <textarea v-model="form.seoDesc" rows="2" placeholder="Search Engine Snippet" class="w-full px-3 py-1.5 bg-white border border-cream-200 rounded-lg text-sm"></textarea>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-1">URL Slug</label>
                    <input type="text" v-model="form.slug" placeholder="auto-generated-from-name" class="w-full px-3 py-1.5 bg-white border border-cream-200 rounded-lg text-sm" />
                  </div>
                </div>
              </div>
            </section>

            <!-- Footer Buttons -->
            <div class="flex justify-end gap-3 pt-6 border-t border-cream-200 sticky bottom-0 bg-white p-4 -mx-6 -mb-6 rounded-b-3xl">
              <button type="button" @click="closeModal" class="px-6 py-2.5 rounded-full border border-cream-300 text-ink/60 text-sm font-bold tracking-wider hover:bg-cream-50 transition">CANCEL</button>
              <button type="submit" class="px-6 py-2.5 rounded-full bg-[#CE8280] text-white text-sm font-bold tracking-wider hover:bg-[#B87472] transition shadow-petal" :disabled="saving">
                {{ saving ? 'SAVING...' : (editingProduct ? 'SAVE SPECIFICATIONS' : 'DEPLOY TO CATALOG') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Delete Confirm -->
    <Transition name="fade">
      <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-[#1a1a1a]/40 backdrop-blur-sm" @click="showDeleteConfirm = false" />
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center">
          <div class="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-2xl mx-auto mb-4">🗑️</div>
          <h3 class="font-serif text-lg font-bold text-ink mb-2">Delete "{{ deletingProduct?.name }}"?</h3>
          <p class="text-sm text-ink/60 mb-6 leading-relaxed">This will permanently remove this product from your catalogue and cannot be undone.</p>
          <div class="flex gap-3">
            <button class="flex-1 py-2.5 rounded-full border border-cream-200 text-sm text-ink/60 hover:bg-cream-200 transition-colors" @click="showDeleteConfirm = false">Cancel</button>
            <button class="flex-1 py-2.5 rounded-full bg-red-400 text-white text-sm font-medium hover:bg-red-500 transition-colors" @click="deleteProduct">Delete</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Toast Notification -->
    <Transition name="fade">
      <div v-if="toast.show" class="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium" :class="toast.type === 'success' ? 'bg-[#9DB6A0] text-white' : 'bg-rose-500 text-white'">
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

// ── Constants ────────────────────────────────────────────────────────────
const CATEGORIES = ['Roses & Peonies', 'Greenery', 'Lavender Collection', 'Seasonal', 'Wedding', 'Romance', 'Modern', 'Exotic']
const BG_PRESETS = [
  { label: 'Blush', value: 'linear-gradient(135deg,#fde8e8,#f9d4d4)' },
  { label: 'Sage', value: 'linear-gradient(135deg,#e8f0e9,#d6e4d8)' },
  { label: 'Lavender', value: 'linear-gradient(135deg,#ede8fd,#d4c2fc)' },
  { label: 'Ivory', value: 'linear-gradient(135deg,#fafafa,#f0ebe0)' },
  { label: 'Gold', value: 'linear-gradient(135deg,#fffbe8,#f9f0c4)' },
  { label: 'Sky', value: 'linear-gradient(135deg,#e8f4fd,#c2e0fc)' },
  { label: 'Coral', value: 'linear-gradient(135deg,#fdeee0,#f5c9a0)' },
  { label: 'Ink', value: 'linear-gradient(135deg,#2c2c2c,#4a4a4a)' },
]

const PRODUCT_COLORS = [
  { name: 'Pink', hex: '#F9D4D4' },
  { name: 'White', hex: '#FDFBF7' },
  { name: 'Green', hex: '#D6E4D8' },
  { name: 'Purple', hex: '#D4C2FC' },
  { name: 'Yellow', hex: '#F9F0C4' },
  { name: 'Red', hex: '#E9A6A6' },
  { name: 'Peach', hex: '#FDEEE0' },
  { name: 'Blue', hex: '#C2E0FC' },
  { name: 'Orange', hex: '#F5C9A0' },
  { name: 'Burgundy', hex: '#7A3B4C' }
]

// ── State ────────────────────────────────────────────────────────────────
const products = ref([])
const loading = ref(false)
const saving = ref(false)
const error = ref('')
const search = ref('')
const filterCategory = ref('')
const filterStatus = ref('')
const viewMode = ref('grid')
const selected = ref([])
const showModal = ref(false)
const showDeleteConfirm = ref(false)
const editingProduct = ref(null)
const deletingProduct = ref(null)
const imagePreview = ref(null)
const galleryUploading = ref(false)
const uploadedCount = ref(0)
const totalUploadCount = ref(0)
const toast = ref({ show: false, message: '', type: 'success' })
const newTagInput = ref('')

const primaryInputRef = ref(null)
const galleryInputRef = ref(null)

// Form data
const form = reactive({
  name: '',
  category: '',
  price: null,
  stock: 0,
  status: 'active',
  desc: '',
  fullDesc: '',
  imageUrl: '',
  videoUrl: '',
  gallery: [],
  emoji: '🌸',
  bg: BG_PRESETS[0].value,
  isBestseller: false,
  isNew: false,
  isFeatured: false,
  tags: [],
  occasions: [],
  seasons: [],
  colors: [],
  sizes: [],
  stems: [],
  care: '',
  vaseLife: '',
  scent: '',
  seoTitle: '',
  seoDesc: '',
  slug: '',
  sortOrder: 0
})

// ── Helper functions ─────────────────────────────────────────────────────
const toggleArrayItem = (arrayName, item) => {
  if (!form[arrayName]) form[arrayName] = []
  const index = form[arrayName].indexOf(item)
  if (index === -1) form[arrayName].push(item)
  else form[arrayName].splice(index, 1)
}

const addCustomTag = () => {
  const tag = newTagInput.value.trim().toLowerCase()
  if (tag && !form.tags.includes(tag)) form.tags.push(tag)
  newTagInput.value = ''
}

const stats = computed(() => [
  { label: 'Total Products', value: products.value.length },
  { label: 'Active', value: products.value.filter(p => (p.status || 'active') === 'active').length },
  { label: 'Featured', value: products.value.filter(p => p.isFeatured).length },
  { label: 'Drafts', value: products.value.filter(p => p.status === 'draft').length }
])

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchSearch = !search.value || p.name.toLowerCase().includes(search.value.toLowerCase()) || 
                        (p.desc && p.desc.toLowerCase().includes(search.value.toLowerCase()))
    const matchCategory = !filterCategory.value || p.category === filterCategory.value
    const matchStatus = !filterStatus.value || (p.status || 'active') === filterStatus.value
    return matchSearch && matchCategory && matchStatus
  })
})

function showToast(message, type = 'success') {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, 3000)
}

async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`)
  return json
}

async function fetchProducts() {
  loading.value = true
  error.value = ''
  try {
    const json = await apiFetch('/api/products')
    products.value = json.data || []
  } catch (e) {
    error.value = e.message
    showToast('Failed to load products: ' + e.message, 'error')
  } finally {
    loading.value = false
  }
}

onMounted(fetchProducts)

function triggerPrimaryUpload() {
  if (primaryInputRef.value) primaryInputRef.value.click()
}

function triggerGalleryUpload() {
  if (galleryInputRef.value) galleryInputRef.value.click()
}

function openModal(product) {
  imagePreview.value = null
  editingProduct.value = product
  
  if (product) {
    Object.assign(form, {
      name: product.name || '',
      category: product.category || '',
      price: product.price || null,
      stock: product.stock ?? 0,
      status: product.status || 'active',
      desc: product.desc || '',
      fullDesc: product.fullDesc || '',
      imageUrl: product.imageUrl || '',
      videoUrl: product.videoUrl || '',
      gallery: Array.isArray(product.gallery) ? [...product.gallery] : [],
      emoji: product.emoji || '🌸',
      bg: product.bg || BG_PRESETS[0].value,
      isBestseller: product.isBestseller || false,
      isNew: product.isNew || false,
      isFeatured: product.isFeatured || false,
      tags: Array.isArray(product.tags) ? [...product.tags] : [],
      occasions: Array.isArray(product.occasions) ? [...product.occasions] : [],
      seasons: Array.isArray(product.seasons) ? [...product.seasons] : [],
      colors: Array.isArray(product.colors) ? [...product.colors] : [],
      sizes: Array.isArray(product.sizes) ? JSON.parse(JSON.stringify(product.sizes)) : [],
      stems: Array.isArray(product.stems) ? JSON.parse(JSON.stringify(product.stems)) : [],
      care: product.care || '',
      vaseLife: product.vaseLife || '',
      scent: product.scent || '',
      seoTitle: product.seoTitle || '',
      seoDesc: product.seoDesc || '',
      slug: product.slug || '',
      sortOrder: product.sortOrder || 0
    })
  } else {
    Object.assign(form, {
      name: '', category: '', price: null, stock: 0, status: 'active',
      desc: '', fullDesc: '', imageUrl: '', videoUrl: '', gallery: [],
      emoji: '🌸', bg: BG_PRESETS[0].value,
      isBestseller: false, isNew: false, isFeatured: false,
      tags: [], occasions: [], seasons: [], colors: [], sizes: [], stems: [],
      care: '', vaseLife: '', scent: '', seoTitle: '', seoDesc: '', slug: '', sortOrder: 0
    })
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingProduct.value = null
  imagePreview.value = null
  galleryUploading.value = false
}

async function uploadPrimaryImage(event) {
  const file = event.target.files[0]
  if (!file) return
  if (!file.type.startsWith('image/')) { showToast('Please select an image file', 'error'); return }
  if (file.size > 5 * 1024 * 1024) { showToast('Image exceeds 5MB limit', 'error'); return }
  
  const uploadData = new FormData()
  uploadData.append('image', file)
  
  try {
    const res = await fetch('/api/upload', { method: 'POST', body: uploadData })
    if (!res.ok) throw new Error('Upload failed')
    const payload = await res.json()
    if (payload.url) {
      form.imageUrl = payload.url
      showToast('Primary image uploaded successfully', 'success')
    }
  } catch (err) {
    console.error('[PRIMARY_UPLOAD_ERROR]', err)
    showToast('Failed to upload primary image', 'error')
  } finally {
    if (primaryInputRef.value) primaryInputRef.value.value = ''
  }
}

async function uploadMultipleGalleryImages(event) {
  const files = event.target.files
  if (!files || files.length === 0) return
  
  galleryUploading.value = true
  uploadedCount.value = 0
  totalUploadCount.value = files.length
  
  try {
    if (!Array.isArray(form.gallery)) form.gallery = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
        uploadedCount.value++
        continue
      }
      const uploadData = new FormData()
      uploadData.append('image', file)
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: uploadData })
        if (res.ok) {
          const payload = await res.json()
          if (payload.url && !form.gallery.includes(payload.url)) form.gallery.push(payload.url)
        }
      } catch (uploadErr) { console.error(`[UPLOAD_ERROR] ${file.name}:`, uploadErr) }
      uploadedCount.value++
    }
    showToast(`Uploaded ${form.gallery.length} gallery images`, 'success')
  } catch (err) {
    console.error('[BATCH_UPLOAD_ERROR]', err)
    showToast('Batch upload failed', 'error')
  } finally {
    galleryUploading.value = false
    uploadedCount.value = 0
    totalUploadCount.value = 0
    if (galleryInputRef.value) galleryInputRef.value.value = ''
  }
}

async function saveProduct() {
  if (!form.name || !form.category || !form.price) {
    showToast('Please fill in all required fields', 'error')
    return
  }
  if (galleryUploading.value) {
    showToast('Please wait for gallery uploads to complete', 'error')
    return
  }
  
  saving.value = true
  try {
    const payload = {
      name: form.name, category: form.category, price: form.price, stock: form.stock,
      status: form.status, desc: form.desc, fullDesc: form.fullDesc, imageUrl: form.imageUrl,
      videoUrl: form.videoUrl, gallery: form.gallery, emoji: form.emoji, bg: form.bg,
      isBestseller: form.isBestseller, isNew: form.isNew, isFeatured: form.isFeatured,
      tags: form.tags, occasions: form.occasions, seasons: form.seasons, colors: form.colors,
      sizes: form.sizes, stems: form.stems, care: form.care, vaseLife: form.vaseLife,
      scent: form.scent, seoTitle: form.seoTitle, seoDesc: form.seoDesc, slug: form.slug,
      sortOrder: form.sortOrder
    }
    
    let responseData
    if (editingProduct.value) {
      responseData = await apiFetch(`/api/products/${editingProduct.value.id}`, {
        method: 'PATCH', body: JSON.stringify(payload)
      })
      const idx = products.value.findIndex(p => p.id === editingProduct.value.id)
      if (idx !== -1) products.value[idx] = responseData.data
      showToast(`"${responseData.data.name}" updated successfully`)
    } else {
      responseData = await apiFetch('/api/products', { method: 'POST', body: JSON.stringify(payload) })
      products.value.push(responseData.data)
      showToast(`"${responseData.data.name}" added to catalogue`)
    }
    closeModal()
  } catch (e) {
    console.error('[SAVE_ERROR]', e)
    showToast('Save failed: ' + e.message, 'error')
  } finally {
    saving.value = false
  }
}

function confirmDelete(product) {
  deletingProduct.value = product
  showDeleteConfirm.value = true
}

async function deleteProduct() {
  try {
    await apiFetch(`/api/products/${deletingProduct.value.id}`, { method: 'DELETE' })
    products.value = products.value.filter(p => p.id !== deletingProduct.value.id)
    showDeleteConfirm.value = false
    showToast(`"${deletingProduct.value.name}" deleted`)
    deletingProduct.value = null
  } catch (e) {
    showToast('Delete failed: ' + e.message, 'error')
  }
}

async function duplicateProduct(product) {
  try {
    const uniqueHash = Math.random().toString(36).substring(2, 6)
    const newName = `${product.name} (Copy ${uniqueHash})`
    const payload = {
      name: newName, category: product.category, price: product.price, stock: 0,
      status: 'draft', desc: product.desc, fullDesc: product.fullDesc, imageUrl: product.imageUrl,
      videoUrl: product.videoUrl || '', gallery: Array.isArray(product.gallery) ? [...product.gallery] : [],
      emoji: product.emoji || '🌸', bg: product.bg, isBestseller: false, isNew: false,
      isFeatured: false, tags: product.tags || [], occasions: product.occasions || [],
      seasons: product.seasons || [], colors: product.colors || [], sizes: product.sizes || [],
      stems: product.stems || [], care: product.care || '', vaseLife: product.vaseLife || '',
      scent: product.scent || '', seoTitle: product.seoTitle || '', seoDesc: product.seoDesc || '',
      sortOrder: (product.sortOrder || 0) + 1
    }
    const json = await apiFetch('/api/products', { method: 'POST', body: JSON.stringify(payload) })
    products.value.push(json.data)
    showToast(`"${json.data.name}" duplicated as draft`, 'success')
  } catch (e) {
    console.error('[DUPLICATION_ERROR]', e)
    showToast('Duplicate failed: ' + e.message, 'error')
  }
}

function toggleSelectAll(e) {
  selected.value = e.target.checked ? filteredProducts.value.map(p => p.id) : []
}

async function bulkDelete() {
  if (!confirm(`Delete ${selected.value.length} products? This cannot be undone.`)) return
  try {
    await Promise.all(selected.value.map(id => apiFetch(`/api/products/${id}`, { method: 'DELETE' })))
    products.value = products.value.filter(p => !selected.value.includes(p.id))
    showToast(`${selected.value.length} products deleted`)
    selected.value = []
  } catch (e) {
    showToast('Bulk delete failed: ' + e.message, 'error')
  }
}

async function bulkSetStatus(status) {
  try {
    await Promise.all(selected.value.map(id => apiFetch(`/api/products/${id}`, {
      method: 'PATCH', body: JSON.stringify({ status })
    })))
    products.value.forEach(p => { if (selected.value.includes(p.id)) p.status = status })
    showToast(`${selected.value.length} products set to "${status}"`)
    selected.value = []
  } catch (e) {
    showToast('Bulk update failed: ' + e.message, 'error')
  }
}

function addSize() { form.sizes.push({ name: '', stemRange: '', price: null }) }
function removeSize(i) { form.sizes.splice(i, 1) }
function addStem() { form.stems.push({ emoji: '🌸', name: '' }) }
function removeStem(i) { form.stems.splice(i, 1) }

function statusBadge(status) {
  const map = { active: 'bg-[#9DB6A0]/20 text-[#486B4C]', draft: 'bg-amber-100 text-amber-600', archived: 'bg-ink/10 text-ink/40' }
  return map[status || 'active'] || map.active
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>