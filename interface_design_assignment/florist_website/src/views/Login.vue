<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style="background: linear-gradient(160deg, #FDFBF7 0%, #F9E5E5 40%, #EAE2FE 100%);">
    
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#CE8280]/10 blur-3xl" />
      <div class="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-[#D4C2FC]/20 blur-3xl" />
    </div>

    <div class="relative max-w-md w-full animate-fadeIn">
      <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 border border-cream-200">
        
        <div class="text-center mb-8">
          <span class="text-4xl mb-3 block drop-shadow-sm">🌸</span>
          <h2 class="font-serif text-3xl text-ink font-bold tracking-tight">FloraLab</h2>
          <p class="text-xs text-[#CE8280] mt-2 uppercase tracking-widest font-bold">
            {{ isSignUp ? 'Create your account' : 'Welcome back' }}
          </p>
        </div>

        <transition name="slide-down">
          <div v-if="error" class="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2">
            ⚠️ {{ error }}
          </div>
        </transition>

        <form class="space-y-5" @submit.prevent="handleSubmit">
          <div v-if="isSignUp" class="space-y-1.5 animate-fadeIn">
            <label class="text-[10px] font-bold text-ink/50 uppercase tracking-widest pl-1">Full Name</label>
            <input 
              v-model="form.name"
              type="text" 
              required 
              class="w-full px-5 py-3.5 bg-white/90 border border-cream-200 rounded-2xl text-sm font-medium placeholder-ink/30 focus:outline-none focus:border-[#CE8280] focus:ring-4 focus:ring-[#CE8280]/5 transition-all shadow-sm"
              placeholder="Jia Yi Lim"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-[10px] font-bold text-ink/50 uppercase tracking-widest pl-1">Email Address</label>
            <input 
              v-model="form.email"
              type="email" 
              required 
              class="w-full px-5 py-3.5 bg-white/90 border border-cream-200 rounded-2xl text-sm font-medium placeholder-ink/30 focus:outline-none focus:border-[#CE8280] focus:ring-4 focus:ring-[#CE8280]/5 transition-all shadow-sm"
              placeholder="hello@floralab.com"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-[10px] font-bold text-ink/50 uppercase tracking-widest pl-1">Password</label>
            <div class="relative flex items-center">
              <input 
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'" 
                required 
                class="w-full px-5 pr-12 py-3.5 bg-white/90 border border-cream-200 rounded-2xl text-sm font-medium placeholder-ink/30 focus:outline-none focus:border-[#CE8280] focus:ring-4 focus:ring-[#CE8280]/5 transition-all shadow-sm"
                placeholder="••••••••"
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 p-1 rounded-lg text-ink/30 hover:text-[#CE8280] hover:bg-cream-50 focus:outline-none transition-colors"
                title="Toggle password visibility"
              >
                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.025 10.025 0 014.132-5.4M9.9 4.24a9.122 9.122 0 012.1-.24c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.4M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9.75 9.75l15.5-15.5" />
                </svg>
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full flex justify-center py-4 px-4 rounded-2xl bg-gradient-to-r from-[#CE8280] to-[#B87472] text-white text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-md shadow-[#CE8280]/10 mt-2"
          >
            <span v-if="loading" class="inline-block animate-spin mr-2">⏳</span>
            {{ isSignUp ? 'Register Account' : 'Sign In' }}
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-cream-100 text-center">
          <button 
            @click="toggleMode"
            class="text-xs font-bold tracking-wide text-ink/40 hover:text-[#CE8280] transition-colors"
          >
            {{ isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Create one" }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/useUserStore'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const isSignUp = ref(false)
const loading = ref(false)
const error = ref('')

// 🔥 NEW STATE FOR TOGGLING PASSWORD VISIBILITY
const showPassword = ref(false)

const form = ref({
  name: '',
  email: '',
  password: ''
})

function toggleMode() {
  isSignUp.value = !isSignUp.value
  error.value = ''
  form.value.password = ''
  showPassword.value = false // Reset eye on toggle
}

async function handleSubmit() {
  error.value = ''
  loading.value = true

  try {
    let result;

    if (isSignUp.value) {
      if (!form.value.name.trim()) throw new Error('Please enter your full name.')
      if (form.value.password.length < 6) throw new Error('Password must be at least 6 characters.')
      
      result = await userStore.register(form.value.name, form.value.email, form.value.password)
    } else {
      result = await userStore.login(form.value.email, form.value.password)
    }

    if (!result.success) {
      throw new Error(result.error || 'Authentication failed. Please try again.')
    }

    const redirectPath = route.query.redirect || (userStore.isAdmin ? '/admin/products' : '/dashboard')
    router.push(redirectPath)

  } catch (err) {
    error.value = err.message || 'Authentication failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.slide-down-enter-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.slide-down-leave-active { transition: all 0.2s ease; }
.slide-down-enter-from, .slide-down-leave-to { 
  opacity: 0;
  transform: translateY(-8px);
}
</style>