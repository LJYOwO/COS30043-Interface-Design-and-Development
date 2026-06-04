<template>
  <div class="min-h-screen flex flex-col" style="background: #FDFBF7;">
    <div class="fixed inset-0 bg-petal-mesh opacity-60 pointer-events-none" aria-hidden="true" />

    <!-- ── Header ───────────────────────────────────────────────────────────── -->
    <header class="fixed top-0 inset-x-0 z-50 transition-all duration-500 pt-3 px-3 sm:px-5">
      <nav
        :class="[
          'max-w-7xl mx-auto h-14 flex items-center justify-between gap-4 rounded-2xl px-4 sm:px-6 transition-all duration-500',
          scrolled
            ? 'bg-white/85 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] border border-cream-200'
            : 'bg-white/20 backdrop-blur-md border border-white/40'
        ]"
      >
        <RouterLink to="/" class="flex items-center gap-2 group" aria-label="FloraLab Home">
          <span class="text-2xl select-none">✿</span>
          <span class="font-serif text-xl font-semibold text-[#CE8280] tracking-wide group-hover:text-[#B87472] transition-colors">
            FloraLab
          </span>
        </RouterLink>

        <ul class="hidden md:flex items-center gap-1">
          <li v-for="link in navLinks" :key="link.name">
            <RouterLink
              :to="link.to"
              class="px-4 py-2 rounded-full text-sm font-sans text-ink/70 hover:bg-[#CE8280]/10 hover:text-[#CE8280] transition-all duration-200"
              active-class="bg-[#CE8280]/10 text-[#CE8280] font-bold"
            >
              {{ link.name }}
            </RouterLink>
          </li>
        </ul>

        <div class="flex items-center gap-2">
          <!-- Cart button -->
          <button
            @click="cartStore.toggleCart()"
            class="relative p-2.5 rounded-full hover:bg-blush-100/60 transition-colors"
            aria-label="Open cart"
          >
            <svg class="w-5 h-5 text-ink/70" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"/>
            </svg>
            <span
              v-if="cartStore.count > 0"
              class="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 flex items-center justify-center text-2xs font-bold bg-[#CE8280] text-white rounded-full"
            >
              {{ cartStore.count }}
            </span>
          </button>

          <!-- Auth buttons -->
          <template v-if="userStore.isAuthenticated">
            <RouterLink
              v-if="userStore.isAdmin"
              to="/admin/products"
              class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink/5 hover:bg-ink/10 text-ink text-xs font-bold transition-all border border-ink/10"
            >
              <span>⚙️</span>
              <span>Admin</span>
            </RouterLink>

            <RouterLink
              to="/dashboard"
              class="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#CE8280]/10 hover:bg-[#CE8280]/20 text-[#CE8280] text-sm font-bold transition-all"
            >
              <span>{{ userStore.displayName }}</span>
            </RouterLink>
          </template>
          <template v-else>
            <RouterLink
              to="/login"
              class="px-4 py-2 rounded-full bg-[#CE8280] hover:bg-[#B87472] text-white text-sm font-bold transition-all shadow-petal"
            >
              Sign in
            </RouterLink>
          </template>

          <!-- Mobile menu button -->
          <button
            @click="mobileOpen = !mobileOpen"
            class="md:hidden p-2.5 rounded-full hover:bg-cream-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg class="w-5 h-5 text-ink/70" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </nav>

      <!-- Mobile dropdown -->
      <Transition name="slide-down">
        <div v-if="mobileOpen" class="md:hidden mx-3 mt-1 bg-white/95 backdrop-blur-xl border border-cream-200 rounded-2xl shadow-lg px-3 pb-3">
          <ul class="flex flex-col gap-1 pt-2">
            <li v-for="link in navLinks" :key="link.name">
              <RouterLink
                :to="link.to"
                @click="mobileOpen = false"
                class="block px-4 py-2.5 rounded-xl text-sm text-ink/70 hover:bg-cream-50 transition-colors"
                active-class="bg-[#CE8280]/10 text-[#CE8280] font-bold"
              >
                {{ link.name }}
              </RouterLink>
            </li>
            
            <!-- 🔥 ADDED: My Account / Dashboard link for mobile -->
            <li v-if="userStore.isAuthenticated">
              <RouterLink
                to="/dashboard"
                @click="mobileOpen = false"
                class="block px-4 py-2.5 rounded-xl text-sm text-ink/70 hover:bg-[#CE8280]/10 transition-colors"
                active-class="bg-[#CE8280]/10 text-[#CE8280] font-bold"
              >
                👤 My Account / Dashboard
              </RouterLink>
            </li>
            <li v-else>
              <RouterLink
                to="/login"
                @click="mobileOpen = false"
                class="block px-4 py-2.5 rounded-xl text-sm text-ink/70 hover:bg-[#CE8280]/10 transition-colors"
                active-class="bg-[#CE8280]/10 text-[#CE8280] font-bold"
              >
                🔑 Sign In
              </RouterLink>
            </li>
            
            <!-- 🔥 ADDED: Admin Panel for mobile -->
            <li v-if="userStore.isAdmin">
              <RouterLink
                to="/admin/products"
                @click="mobileOpen = false"
                class="block px-4 py-2.5 rounded-xl text-sm text-ink/70 hover:bg-ink/5 transition-colors font-bold"
              >
                ⚙️ Admin Panel
              </RouterLink>
            </li>
            
            <!-- 🔥 ADDED: Logout button for mobile -->
            <li v-if="userStore.isAuthenticated" class="pt-2 mt-1 border-t border-cream-100">
              <button 
                @click="handleLogout" 
                class="w-full text-left block px-4 py-2.5 rounded-xl text-sm text-rose-600 hover:bg-rose-50 transition-colors font-medium"
              >
                🚪 Sign Out
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </header>

    <!-- ── Cart Sidebar ─────────────────────────────────────────────────────── -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="cartStore.isOpen"
          class="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
          @click.self="cartStore.isOpen = false"
        >
          <Transition name="slide-right">
            <aside class="absolute right-0 top-0 h-full w-full max-w-sm backdrop-blur-md shadow-glass-lg flex flex-col" style="background-color: #FDFBF7;">
              <div class="flex items-center justify-between px-6 py-4 border-b border-cream-200">
                <h2 class="font-serif text-lg text-ink font-bold">Your Blooms</h2>
                <button @click="cartStore.isOpen = false" class="p-1.5 rounded-full hover:bg-cream-100 transition-colors">
                  <svg class="w-5 h-5 text-ink/50" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                <div v-if="cartStore.items.length === 0" class="flex flex-col items-center justify-center h-40 text-ink/40 gap-2">
                  <span class="text-4xl">✿</span>
                  <p class="text-sm font-sans">Your cart is empty</p>
                </div>
                <div
                  v-for="item in cartStore.items" :key="item.key"
                  class="flex gap-3 p-3 rounded-2xl bg-white border border-cream-200 shadow-sm"
                >
                  <div class="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden bg-cream-50 flex-shrink-0 border border-cream-100">
                    <img v-if="item.image && item.image !== '/images/placeholder.jpg'" :src="item.image" class="w-full h-full object-cover" />
                    <span v-else class="text-2xl">{{ item.emoji || '🌸' }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-ink truncate">{{ item.name }}</p>
                    <p class="text-xs text-ink/60 font-sans font-medium">RM {{ item.price?.toFixed(2) }}</p>
                    <div class="flex items-center gap-2 mt-1.5">
                      <button @click="cartStore.updateQuantity(item.key, item.quantity - 1)" class="w-5 h-5 rounded-full bg-cream-100 text-ink text-xs flex items-center justify-center hover:bg-cream-200 transition-colors">−</button>
                      <span class="text-xs text-ink w-4 text-center font-bold">{{ item.quantity }}</span>
                      <button @click="cartStore.updateQuantity(item.key, item.quantity + 1)" class="w-5 h-5 rounded-full bg-cream-100 text-ink text-xs flex items-center justify-center hover:bg-cream-200 transition-colors">+</button>
                    </div>
                  </div>
                  <button @click="cartStore.removeItem(item.key)" class="text-rose-400 hover:text-rose-600 transition-colors self-start mt-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="px-6 py-4 border-t border-cream-200 bg-white space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-ink/60 font-bold uppercase tracking-wider text-[10px]">Subtotal</span>
                  <span class="font-serif text-ink text-lg font-bold">{{ cartStore.formattedSubtotal }}</span>
                </div>
                <RouterLink
                  v-if="userStore.isLoggedIn"
                  to="/checkout"
                  class="w-full py-3.5 rounded-full bg-[#CE8280] hover:bg-[#B87472] text-white font-bold text-sm tracking-wider uppercase transition-all shadow-petal text-center block"
                  @click="cartStore.toggleCart()"
                >
                  Proceed to Checkout →
                </RouterLink>
                <div v-else class="space-y-2">
                  <RouterLink
                    to="/login?redirect=/checkout"
                    class="w-full py-3.5 rounded-full bg-[#CE8280] hover:bg-[#B87472] text-white font-bold text-sm tracking-wider uppercase transition-all shadow-petal text-center block"
                    @click="cartStore.toggleCart()"
                  >
                    Sign In to Checkout
                  </RouterLink>
                  <p class="text-[10px] text-center text-ink/40 font-bold uppercase tracking-widest">
                    Account required for purchase
                  </p>
                </div>
              </div>
            </aside>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <!-- ── Main content ─────────────────────────────────────────────────────── -->
    <main class="flex-1 pt-20">
      <RouterView />
    </main>

    <!-- ── Footer ─────────────────────────────────────────────────────────── -->
    <footer class="relative bg-[#CE8280] text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
          <!-- Brand Column -->
          <div class="md:col-span-2 space-y-4">
            <div class="flex items-center gap-2">
              <span class="text-2xl">✿</span>
              <span class="font-serif text-2xl font-bold text-white">FloraLab</span>
            </div>
            <p class="text-sm text-white/80 font-sans leading-relaxed max-w-xs">
              Where botanical science meets artisan craft. Every arrangement is a living experiment in beauty.
            </p>
            <div class="flex gap-3 pt-2">
              <a href="#" aria-label="Instagram" class="w-9 h-9 rounded-full bg-[#B87472] hover:bg-[#A36664] flex items-center justify-center transition-colors shadow-sm">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 class="font-serif text-sm font-bold text-white mb-4 tracking-widest uppercase">Shop</h3>
            <ul class="space-y-2 text-sm font-sans text-white/80">
              <li><RouterLink to="/catalog" class="hover:text-white transition-colors">All Blooms</RouterLink></li>
              <li><RouterLink to="/customizer" class="hover:text-white transition-colors">Design Your Own</RouterLink></li>
              <li><RouterLink to="/catalog" class="hover:text-white transition-colors">Seasonal Picks</RouterLink></li>
            </ul>
          </div>

          <div>
            <h3 class="font-serif text-sm font-bold text-white mb-4 tracking-widest uppercase">Studio</h3>
            <ul class="space-y-2 text-sm font-sans text-white/80">
              <li><RouterLink to="/process" class="hover:text-white transition-colors">Our Process</RouterLink></li>
              <li><RouterLink to="/sustainability" class="hover:text-white transition-colors">Sustainability</RouterLink></li>
              <li><RouterLink to="/contact" class="hover:text-white transition-colors">Contact</RouterLink></li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="mt-12 pt-6 border-t border-[#B87472] flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/70 font-sans font-medium">
          <span>© 2026 FloraLab. All blooms reserved.</span>
          <span>Grown with ✿ and science</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import { useCartStore } from '@/stores/useCartStore'

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()
const scrolled  = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { name: 'Home',      to: '/'          },
  { name: 'Catalog',   to: '/catalog'   },
  { name: 'Design',    to: '/customizer'},
  { name: 'Process',   to: '/process'   },
  { name: 'Eco',       to: '/sustainability' },
  { name: 'Contact',   to: '/contact'   },
]

function onScroll() { 
  scrolled.value = window.scrollY > 20 
}

// 🔥 ADDED: Logout handler
async function handleLogout() {
  await userStore.logout()
  mobileOpen.value = false
  router.push('/')
}

onMounted(()  => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.25s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-8px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-right-enter-active, .slide-right-leave-active { transition: transform 0.35s cubic-bezier(0.4,0,0.2,1); }
.slide-right-enter-from, .slide-right-leave-to { transform: translateX(100%); }

.text-2xs { font-size: 0.625rem; line-height: 0.875rem; }
.w-4\.5 { width: 1.125rem; }
.h-4\.5 { height: 1.125rem; }
</style>