<template>
  <div class="overflow-hidden">
    <!-- ── Hero ──────────────────────────────────────────────────────────── -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden" style="background: linear-gradient(160deg, #FDFBF7 0%, #F9E5E5 40%, #EAE2FE 100%);">
      <!-- Floating petals (CSS only decorations) -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-16 left-8 w-32 h-32 rounded-full bg-[#CE8280]/10 blur-2xl animate-float" />
        <div class="absolute top-32 right-12 w-48 h-48 rounded-full bg-[#D4C2FC]/20 blur-3xl animate-float-slow" />
        <div class="absolute bottom-24 left-1/4 w-40 h-40 rounded-full bg-[#9DB6A0]/15 blur-2xl animate-float" style="animation-delay: 2s" />
        <div class="absolute top-1/2 right-8 text-5xl opacity-20 animate-float-slow select-none">🌸</div>
        <div class="absolute top-1/4 left-16 text-3xl opacity-15 animate-float select-none" style="animation-delay: 1s">🌿</div>
        <div class="absolute bottom-1/3 right-1/4 text-4xl opacity-20 animate-float select-none" style="animation-delay: 3s">✿</div>
      </div>

      <div class="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 animate-fade-up">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CE8280]/10 border border-[#CE8280]/20 text-[#CE8280] text-xs font-bold mb-6 tracking-widest uppercase shadow-sm">
          <span class="w-1.5 h-1.5 rounded-full bg-[#CE8280] animate-pulse"></span>
          Botanical Lab · Est. 2024
        </div>

        <h1 class="font-serif text-5xl sm:text-6xl lg:text-8xl text-ink font-bold leading-[1.05] mb-6 drop-shadow-sm">
          Where Blooms<br/>
          <em class="not-italic text-[#CE8280]">Meet</em> Science
        </h1>

        <p class="text-base sm:text-lg text-ink/60 max-w-xl mx-auto mb-10 leading-relaxed font-medium">
          Design your bespoke bouquet with our slot-based customizer. Every petal, hand-selected for enduring beauty.
        </p>

        <!-- Button area -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink
            to="/customizer"
            class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#CE8280] text-white font-bold text-sm tracking-wider uppercase hover:bg-[#B87472] transition-all shadow-petal hover:shadow-petal-lg hover:-translate-y-0.5"
          >
            🌹 Start Customizing
          </RouterLink>
          <RouterLink
            to="/catalog"
            class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/90 backdrop-blur-sm text-ink font-bold text-sm tracking-wider uppercase hover:bg-white hover:text-[#CE8280] hover:border-[#CE8280]/40 transition-all border border-cream-200 hover:-translate-y-0.5 shadow-sm"
          >
            Browse Catalog →
          </RouterLink>
        </div>
      </div>

      <!-- Scroll hint -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink/30 animate-bounce">
        <span class="text-[10px] font-bold tracking-widest uppercase text-ink/40">Scroll</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </section>

    <!-- ── Mood Strip ─────────────────────────────────────────────────── -->
    <section class="bg-ink py-4 overflow-hidden border-y border-ink/80 shadow-lg">
      <div class="flex gap-12 animate-[scroll_20s_linear_infinite] whitespace-nowrap">
        <template v-for="n in 3" :key="n">
          <span v-for="tag in moodTags" :key="tag + n" class="text-sm text-white/60 font-bold tracking-widest uppercase inline-block">
            {{ tag }} <span class="text-[#CE8280] mx-4">✦</span>
          </span>
        </template>
      </div>
    </section>

    <!-- ── Featured Products ──────────────────────────────────────────── -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" style="background-color: #FDFBF7;">
      <div class="text-center mb-12">
        <p class="text-[10px] font-bold text-[#9DB6A0] uppercase tracking-widest mb-3">Curated Selections</p>
        <h2 class="font-serif text-4xl sm:text-5xl text-ink font-bold">Featured Bouquets</h2>
      </div>

      <!-- Loading skeleton -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
        <div v-for="n in 3" :key="n" class="bg-white rounded-3xl h-96 border border-cream-200 shadow-sm"></div>
      </div>

      <!-- Dynamic product grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <RouterLink 
          v-for="item in featuredProducts" 
          :key="item.id" 
          :to="'/product/' + item.id"
          class="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-cream-200 block"
        >
          <div class="absolute top-4 right-4 z-10">
            <span class="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-ink shadow-sm border border-cream-100">
              {{ item.isFeatured ? 'Featured' : 'Bestseller' }}
            </span>
          </div>

          <div class="aspect-square rounded-2xl mb-4 flex items-center justify-center overflow-hidden relative border-b border-cream-100" :style="{ background: item.bg || '#f9f9f9' }">
            <img 
              v-if="item.imageUrl && item.imageUrl.trim() !== ''" 
              :src="item.imageUrl" 
              :alt="item.name" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div v-else class="text-7xl transition-transform duration-500 group-hover:scale-110">
              {{ item.emoji || '🌸' }}
            </div>
          </div>

          <div class="p-5 pt-0 space-y-2">
            <div class="flex justify-between items-start gap-2">
              <h3 class="font-serif text-xl font-bold text-ink leading-tight group-hover:text-[#CE8280] transition-colors">{{ item.name }}</h3>
              <span class="font-bold text-ink whitespace-nowrap">RM {{ parseFloat(item.price).toFixed(2) }}</span>
            </div>
            <p class="text-xs text-ink/60 line-clamp-2 leading-relaxed font-medium">{{ item.desc || item.description }}</p>
          </div>
        </RouterLink>
      </div>

      <div class="text-center mt-12">
        <RouterLink
          to="/catalog"
          class="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-ink/60 hover:text-[#CE8280] transition-colors border-b-2 border-transparent hover:border-[#CE8280] pb-1"
        >
          View all bouquets →
        </RouterLink>
      </div>
    </section>

    <!-- ── How It Works ───────────────────────────────────────────────── -->
    <section class="py-24 border-y border-cream-200" style="background: linear-gradient(160deg, #FDFBF7 0%, #EAE2FE 50%, #F9E5E5 100%);">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-[10px] font-bold text-[#9DB6A0] uppercase tracking-widest mb-3">The Process</p>
        <h2 class="font-serif text-4xl sm:text-5xl text-ink font-bold mb-16">How FloraLab Works</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10">
          <div v-for="(step, i) in steps" :key="i" class="flex flex-col items-center bg-white/40 backdrop-blur-sm p-6 rounded-3xl border border-cream-100 shadow-sm">
            <div class="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-3xl mb-6 hover:scale-110 transition-transform">
              {{ step.icon }}
            </div>
            <h3 class="font-serif text-xl font-bold text-ink mb-3">{{ step.title }}</h3>
            <p class="text-sm text-ink/70 leading-relaxed max-w-xs font-medium">{{ step.desc }}</p>
          </div>
        </div>

        <div class="mt-16">
          <RouterLink
            to="/customizer"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#CE8280] text-white font-bold tracking-wider uppercase text-sm hover:bg-[#B87472] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            🌿 Try the Lab →
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════════
         🔥 NEW: Explore FloraLab (Brand Story Section)
         Guides users to Process, Sustainability, and Contact pages
    ═══════════════════════════════════════════════════════════════════════ -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" style="background-color: #FDFBF7;">
      <div class="text-center mb-16">
        <p class="text-[10px] font-bold text-[#9DB6A0] uppercase tracking-widest mb-3">Explore FloraLab</p>
        <h2 class="font-serif text-4xl sm:text-5xl text-ink font-bold">Beyond the Blooms</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Process Card - Purple theme for Science -->
        <RouterLink 
          to="/process" 
          class="group block bg-white/70 backdrop-blur-md p-10 rounded-3xl border border-cream-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 text-center"
        >
          <div class="w-16 h-16 mx-auto rounded-2xl bg-[#EAE2FE]/60 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
            🔬
          </div>
          <h3 class="font-serif text-2xl font-bold text-ink mb-3">The Floral Science</h3>
          <p class="text-sm text-ink/65 mb-8 font-medium leading-relaxed">
            Discover how we condition, hydrate, and hand-tie every stem for maximum vase life.
          </p>
          <span class="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#CE8280] group-hover:text-[#B87472] transition-colors border-b border-transparent group-hover:border-[#B87472] pb-0.5">
            Read More →
          </span>
        </RouterLink>

        <!-- Sustainability Card - Green theme -->
        <RouterLink 
          to="/sustainability" 
          class="group block bg-white/70 backdrop-blur-md p-10 rounded-3xl border border-cream-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 text-center"
        >
          <div class="w-16 h-16 mx-auto rounded-2xl bg-[#EAF4EC]/80 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
            🌿
          </div>
          <h3 class="font-serif text-2xl font-bold text-ink mb-3">Our Commitment</h3>
          <p class="text-sm text-ink/65 mb-8 font-medium leading-relaxed">
            100% plastic-free, carbon neutral, and strictly sourced from ethical fair-trade farms.
          </p>
          <span class="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#9DB6A0] group-hover:text-[#7A9E7E] transition-colors border-b border-transparent group-hover:border-[#7A9E7E] pb-0.5">
            Learn How →
          </span>
        </RouterLink>

        <!-- Contact Card - Blush theme -->
        <RouterLink 
          to="/contact" 
          class="group block bg-white/70 backdrop-blur-md p-10 rounded-3xl border border-cream-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 text-center"
        >
          <div class="w-16 h-16 mx-auto rounded-2xl bg-[#F9E5E5]/80 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
            ✉️
          </div>
          <h3 class="font-serif text-2xl font-bold text-ink mb-3">Get in Touch</h3>
          <p class="text-sm text-ink/65 mb-8 font-medium leading-relaxed">
            Planning a bespoke wedding arch or have a question about your order? Let's talk blooms.
          </p>
          <span class="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#CE8280] group-hover:text-[#B87472] transition-colors border-b border-transparent group-hover:border-[#B87472] pb-0.5">
            Contact Us →
          </span>
        </RouterLink>

      </div>
    </section>

    <!-- ── Testimonials ───────────────────────────────────────────────── -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto" style="background-color: #FDFBF7;">
      <div class="text-center mb-16">
        <p class="text-[10px] font-bold text-[#9DB6A0] uppercase tracking-widest mb-3">Kind Words</p>
        <h2 class="font-serif text-4xl text-ink font-bold">From Our Garden</h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="review in testimonials"
          :key="review.name"
          class="bg-white rounded-3xl p-8 border border-cream-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex gap-1 mb-4">
            <span v-for="n in 5" :key="n" class="text-[#CE8280] text-lg drop-shadow-sm">★</span>
          </div>
          <p class="text-sm text-ink/80 leading-relaxed mb-6 italic font-medium">"{{ review.text }}"</p>
          
          <div class="flex items-center gap-4 pt-4 border-t border-cream-100">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-inner" :style="{ background: review.color }">
              {{ review.name[0] }}
            </div>
            <div>
              <p class="text-sm font-bold text-ink">{{ review.name }}</p>
              <p class="text-[10px] font-bold text-ink/40 uppercase tracking-widest mt-0.5">{{ review.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

// ── Static UI Assets ──────────────────────────────────────────────────────
const moodTags = ['Botanical', 'Bespoke', 'Sustainable', 'Artisanal', 'Fresh', 'Dreamy', 'Curated']

const steps = [
  { icon: '🎨', title: 'Choose a Mood', desc: 'Tell us the feeling — romantic, wild, or minimalist. Browse our curated collections by occasion and season.' },
  { icon: '🌹', title: 'Slot Your Blooms', desc: 'Pick stem by stem with our 2D slot-based customizer. Every slot, your choice.' },
  { icon: '🚚', title: 'Delivered Fresh', desc: 'Cut fresh on order day, wrapped in our signature paper, at your door by noon.' },
]

const testimonials = [
  { name: 'Sophie R.',  text: "The customizer is unlike anything I've seen. I designed my wedding arch flowers from my phone. Absolutely magical.", date: 'March 2026', color: '#fde8e8' },
  { name: 'James T.',   text: 'Ordered for my anniversary. The bouquet was exactly what my wife loves — stunning quality and beautifully wrapped. Will never use another florist.', date: 'April 2026', color: '#e8f0e9' },
  { name: 'Mei L.',     text: 'Stunning quality. The Violet Dream bouquet lasted 16 days. The packaging alone is worth the price.', date: 'Feb 2026', color: '#ede8fd' },
  { name: 'Carlos M.',  text: 'Ordered for a corporate event. 200 arrangements, every one perfect. The FloraLab team is extraordinary.', date: 'March 2026', color: '#fff8e8' },
]

// ── Dynamic Database State ──────────────────────────────────────────────
const featuredProducts = ref([])
const loading = ref(true)

/**
 * Fetch catalog and smartly allocate 3 display slots for the homepage
 * Bulletproof logic that handles API response structure safely
 */
const fetchFeaturedProducts = async () => {
  try {
    const res = await fetch('/api/products')
    if (!res.ok) throw new Error(`Gateway rejected catalog request: ${res.status}`)
    const result = await res.json()
    
    // 🔥 Safely extract the products array from response
    const allProducts = Array.isArray(result) ? result : (result.data || [])
    
    // Filter only active products
    const activeProducts = allProducts.filter(p => p.status === 'active')
    
    // 1. First priority: Products explicitly marked as "isFeatured" by Admin
    const featuredItems = activeProducts.filter(p => p.isFeatured === true)
    
    // 2. Second priority: Products marked as "isBestseller"
    const bestsellerItems = activeProducts.filter(p => p.isBestseller === true && !p.isFeatured)
    
    // 3. Third priority: All other active products
    const otherItems = activeProducts.filter(p => !p.isFeatured && !p.isBestseller)
    
    // Combine in priority order
    let showcase = [...featuredItems, ...bestsellerItems, ...otherItems]
    
    // Ensure we have exactly 3 items for the grid
    featuredProducts.value = showcase.slice(0, 3)
    
  } catch (err) {
    console.error('[HOME_SYNC_ERROR]', err)
    featuredProducts.value = []
  } finally {
    loading.value = false
  }
}

// Initialize synchronization pipeline on mount
onMounted(() => {
  fetchFeaturedProducts()
})
</script>

<style scoped>
@keyframes scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-33.333%); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
.animate-float-slow {
  animation: float 8s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}
</style>