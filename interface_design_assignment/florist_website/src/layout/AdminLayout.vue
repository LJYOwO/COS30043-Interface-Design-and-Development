<template>
  <div class="min-h-screen flex" style="background: #FDFBF7;">

    <!-- ── Desktop Sidebar (hidden on mobile) ─────────────────────────────── -->
    <aside
      :class="[
        'fixed top-0 left-0 h-full z-40 flex-col bg-[#CE8280] text-white transition-all duration-300 shadow-xl',
        'hidden md:flex',
        sidebarCollapsed ? 'w-16' : 'w-60'
      ]"
    >
      <div class="flex items-center gap-3 px-4 py-5 border-b border-[#B87472]">
        <span class="text-xl flex-shrink-0">✿</span>
        <Transition name="fade-text">
          <span v-if="!sidebarCollapsed" class="font-serif text-lg font-bold text-white whitespace-nowrap overflow-hidden tracking-wide">
            FloraLab
          </span>
        </Transition>
      </div>

      <nav class="flex-1 py-4 overflow-y-auto">
        <ul class="space-y-1 px-2">
          <li v-for="item in adminNav" :key="item.name">
            <RouterLink
              :to="item.to"
              :title="item.name"
              :class="[
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group font-bold tracking-wider',
                sidebarCollapsed ? 'justify-center' : '',
                $route.path === item.to
                  ? 'bg-[#B87472] text-white shadow-inner'
                  : 'text-white/70 hover:bg-[#B87472]/60 hover:text-white'
              ]"
            >
              <span class="text-lg flex-shrink-0" :aria-label="item.name">{{ item.icon }}</span>
              <Transition name="fade-text">
                <span v-if="!sidebarCollapsed" class="text-xs uppercase whitespace-nowrap">{{ item.name }}</span>
              </Transition>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="border-t border-[#B87472] p-3 space-y-2">
        <div v-if="!sidebarCollapsed" class="flex items-center gap-2 px-1">
          <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-[#CE8280] flex-shrink-0 shadow-sm">
            {{ userStore.displayName[0] }}
          </div>
          <div class="overflow-hidden">
            <p class="text-xs font-bold text-white truncate">{{ userStore.displayName }}</p>
            <p class="text-[10px] uppercase tracking-widest text-white/70 font-bold mt-0.5">{{ userStore.user?.role }}</p>
          </div>
        </div>
        <button
          @click="sidebarCollapsed = !sidebarCollapsed"
          class="w-full flex items-center justify-center p-2 rounded-xl hover:bg-[#B87472] text-white/70 hover:text-white transition-colors"
          :title="sidebarCollapsed ? 'Expand' : 'Collapse'"
        >
          <svg :class="['w-4 h-4 transition-transform', sidebarCollapsed ? 'rotate-180' : '']" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
          </svg>
        </button>
      </div>
    </aside>

    <!-- ── Main content area ──────────────────────────────────────────────── -->
    <div 
      class="flex-1 flex flex-col min-w-0 transition-all duration-300"
      :class="sidebarCollapsed ? 'md:ml-16' : 'md:ml-60'"
    >

      <!-- ── Top Header ──────────────────────────────────────────────────── -->
      <header class="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-cream-200 px-4 md:px-6 py-3 flex items-center justify-between gap-4 shadow-sm">
        <div>
          <h1 class="font-serif text-base md:text-lg font-bold text-ink">{{ pageTitle }}</h1>
          <p class="text-[10px] font-bold uppercase tracking-widest text-ink/40 hidden sm:block">{{ breadcrumb }}</p>
        </div>
        <div class="flex items-center gap-3">
          <button class="relative p-2 rounded-full hover:bg-cream-100 transition-colors">
            <svg class="w-5 h-5 text-ink/50" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
            </svg>
            <span class="absolute top-1 right-1 w-2.5 h-2.5 bg-[#CE8280] border-2 border-white rounded-full"></span>
          </button>
            <RouterLink
            to="/"
            class="px-2.5 sm:px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-ink/60 bg-cream-100 hover:bg-cream-200/80 hover:text-ink/90 border border-cream-200/70 transition-all duration-200 flex items-center gap-1.5 shadow-2xs"
            title="View Main Site"
          >
            <span class="text-xs">🌐</span> <span class="hidden sm:inline">View Site</span>
          </RouterLink>
        </div>
      </header>

      <!-- ── Page Content ────────────────────────────────────────────────── -->
      <!-- pb-24 on mobile leaves room above the bottom nav bar -->
      <main class="flex-1 p-4 md:p-6 overflow-y-auto pb-24 md:pb-6">
        <RouterView />
      </main>
    </div>

    <!-- ── Mobile Bottom Tab Bar (visible only on mobile) ─────────────────── -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-cream-200 shadow-[0_-4px_24px_rgba(0,0,0,0.07)]">
      <ul class="flex items-stretch">
        <li v-for="item in adminNav" :key="item.name" class="flex-1">
          <RouterLink
            :to="item.to"
            :class="[
              'flex flex-col items-center justify-center gap-0.5 py-2.5 w-full transition-colors',
              $route.path === item.to
                ? 'text-[#CE8280]'
                : 'text-ink/40 active:text-[#CE8280]'
            ]"
          >
            <!-- Active indicator dot -->
            <span
              :class="[
                'w-1 h-1 rounded-full mb-0.5 transition-all duration-200',
                $route.path === item.to ? 'bg-[#CE8280] scale-100' : 'bg-transparent scale-0'
              ]"
            ></span>
            <span class="text-xl leading-none">{{ item.icon }}</span>
            <span class="text-[9px] font-bold uppercase tracking-wider leading-none mt-0.5">{{ item.name }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const sidebarCollapsed = ref(false)

const adminNav = [
  { name: 'Overview',    to: '/admin',            icon: '⬡' },
  { name: 'Inventory',   to: '/admin/inventory',  icon: '✾' },
  { name: 'Products',    to: '/admin/products',   icon: '🛍️' },
  { name: 'Orders',      to: '/admin/orders',     icon: '📦' },
  { name: 'Reviews',     to: '/admin/reviews',    icon: '★'  },
  { name: 'Users',       to: '/admin/users',      icon: '👥' },
]

const pageTitle = computed(() => {
  const map = {
    '/admin/products':  'Product Catalogue',
    '/admin/inventory': 'Flower Inventory',
    '/admin/orders':    'Orders',
    '/admin/reviews':   'Reviews',
    '/admin/users':     'User Management',
    '/admin':           'Executive Overview',
  }
  return map[route.path] || 'Admin'
})
const breadcrumb = computed(() => `FloraLab Admin › ${pageTitle.value}`)

function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.fade-text-enter-active, .fade-text-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-text-leave-to { opacity: 0; }
</style>