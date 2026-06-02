import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

// Layouts
const DefaultLayout = () => import('@/layout/DefaultLayout.vue')
const AdminLayout   = () => import('@/layout/AdminLayout.vue')

// Views
const Home           = () => import('@/views/Home.vue')
const Catalog        = () => import('@/views/Catalog.vue')
const ProductDetail  = () => import('@/views/ProductDetail.vue')
const Customizer     = () => import('@/views/Customizer.vue')
const Login          = () => import('@/views/Login.vue')
const Dashboard      = () => import('@/views/Dashboard.vue')
const OrderHistory   = () => import('@/views/OrderHistory.vue')
const Checkout       = () => import('@/views/Checkout.vue')
const AdminInventory = () => import('@/views/AdminInventory.vue')
const AdminProducts  = () => import('@/views/AdminProducts.vue')
const AdminOrders    = () => import('@/views/Adminorders.vue')
const AdminReviews   = () => import('@/views/AdminReviews.vue')
const AdminOverview  = () => import('@/views/AdminOverview.vue')
const AdminUsers     = () => import('@/views/AdminUsers.vue')

// 🔥 新增的静态展示页面
const Process        = () => import('@/views/Process.vue')
const Sustainability = () => import('@/views/Sustainability.vue')
const Contact        = () => import('@/views/Contact.vue')

const routes = [
  // ── Public + Customer routes (DefaultLayout) ────────────────────
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: { title: 'FloraLab — Luxury Botanical Studio' },
      },
      {
        path: 'catalog',
        name: 'Catalog',
        component: Catalog,
        meta: { title: 'Catalog — FloraLab' },
      },
      {
        path: 'product/:id',
        name: 'ProductDetail',
        component: ProductDetail,
        meta: { title: 'Product — FloraLab' },
        props: true,
      },
      {
        path: 'customizer',
        name: 'Customizer',
        component: Customizer,
        meta: { title: 'Design Your Bouquet — FloraLab' },
      },
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: { title: 'Sign In — FloraLab', guestOnly: true },
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: 'My Dashboard — FloraLab', requiresAuth: true },
      },
      {
        path: 'orders',
        name: 'OrderHistory',
        component: OrderHistory,
        meta: { title: 'Order History — FloraLab', requiresAuth: true },
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: Checkout,
        meta: { title: 'Checkout — FloraLab' },
      },
      // 🔥 注册新页面
      {
        path: 'process',
        name: 'Process',
        component: Process,
        meta: { title: 'Our Process — FloraLab' },
      },
      {
        path: 'sustainability',
        name: 'Sustainability',
        component: Sustainability,
        meta: { title: 'Sustainability — FloraLab' },
      },
      {
        path: 'contact',
        name: 'Contact',
        component: Contact,
        meta: { title: 'Contact Us — FloraLab' },
      },
    ],
  },

  // ── Admin routes (AdminLayout) ──────────────────────────────────
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: '',
        name: 'AdminOverview', 
        component: AdminOverview,
        meta: { title: 'Overview — FloraLab Admin' },
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: AdminProducts,
        meta: { title: 'Products — FloraLab Admin' },
      },
      {
        path: 'inventory',
        name: 'AdminInventory',
        component: AdminInventory,
        meta: { title: 'Inventory — FloraLab Admin' },
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: AdminOrders,
        meta: { title: 'Orders — FloraLab Admin' },
      },
      {
        path: 'reviews',
        name: 'AdminReviews',
        component: AdminReviews,
        meta: { title: 'Reviews — FloraLab Admin' },
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: AdminUsers,
        meta: { title: 'Users — FloraLab Admin' },
      },
    ],
  },

  // ── Catch-all ───────────────────────────────────────────────────
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

// Navigation guards
router.beforeEach((to, _from, next) => {
  document.title = to.meta.title || 'FloraLab'

  const userStore = useUserStore()
  const loggedIn  = userStore.isAuthenticated
  const isAdmin   = userStore.isAdmin

  // Check auth on the matched route chain (includes parent meta)
  const requiresAuth  = to.matched.some(r => r.meta.requiresAuth)
  const requiresAdmin = to.matched.some(r => r.meta.requiresAdmin)
  const guestOnly     = to.matched.some(r => r.meta.guestOnly)

  if (requiresAuth && !loggedIn) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }
  if (requiresAdmin && !isAdmin) {
    return next({ name: 'Home' })
  }
  if (guestOnly && loggedIn) {
    return next(isAdmin ? { name: 'AdminOverview' } : { name: 'Dashboard' })
  }

  next()
})

export default router