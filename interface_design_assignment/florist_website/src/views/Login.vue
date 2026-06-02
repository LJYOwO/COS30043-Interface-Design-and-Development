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

        <div class="flex bg-cream-50 p-1.5 rounded-full mb-8 border border-cream-200/60 shadow-inner">
          <button
            @click="isSignUp = false; error = ''"
            class="flex-1 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all"
            :class="!isSignUp ? 'bg-white text-[#CE8280] shadow-sm' : 'text-ink/40 hover:text-[#CE8280]'"
          >
            Sign In
          </button>
          <button
            @click="isSignUp = true; error = ''"
            class="flex-1 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all"
            :class="isSignUp ? 'bg-white text-[#CE8280] shadow-sm' : 'text-ink/40 hover:text-[#CE8280]'"
          >
            Create Account
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          
          <Transition name="slide-down">
            <div v-if="isSignUp">
              <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/60 mb-1.5">Full Name</label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="e.g. Sophie Reeves"
                class="w-full px-4 py-3.5 bg-white border border-cream-200 rounded-xl text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-[#CE8280] focus:ring-2 focus:ring-[#CE8280]/20 transition-all shadow-sm"
              />
            </div>
          </Transition>

          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/60 mb-1.5">Email Address</label>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="sophie@example.com"
              class="w-full px-4 py-3.5 bg-white border border-cream-200 rounded-xl text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-[#CE8280] focus:ring-2 focus:ring-[#CE8280]/20 transition-all shadow-sm"
            />
          </div>

          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/60 mb-1.5">Password</label>
            <input
              v-model="form.password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full px-4 py-3.5 bg-white border border-cream-200 rounded-xl text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-[#CE8280] focus:ring-2 focus:ring-[#CE8280]/20 transition-all shadow-sm"
            />
          </div>

          <div v-if="error" class="p-3 bg-rose-50 border border-rose-100 rounded-xl animate-fade-in">
            <p class="text-xs text-rose-600 font-bold text-center">⚠️ {{ error }}</p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-4 rounded-full text-white text-sm font-bold uppercase tracking-widest transition-all shadow-petal flex items-center justify-center gap-2 mt-4"
            :class="loading ? 'bg-[#B87472] opacity-70 cursor-not-allowed' : 'bg-[#CE8280] hover:bg-[#B87472] hover:-translate-y-0.5'"
          >
            <span v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            {{ loading ? 'Processing...' : (isSignUp ? 'Join FloraLab' : 'Sign In') }}
          </button>
        </form>

        <div class="mt-8 text-center">
          <p class="text-[9px] text-ink/30 font-bold uppercase tracking-widest">
            Protected by FloraLab Security
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/useUserStore'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const isSignUp = ref(false)
const loading = ref(false)
const error = ref('')

const form = ref({
  name: '',
  email: '',
  password: ''
})

async function handleSubmit() {
  error.value = ''
  loading.value = true

  try {
    let result;

    if (isSignUp.value) {
      // Execute Registration Pipeline
      if (!form.value.name.trim()) throw new Error('Please enter your full name.')
      if (form.value.password.length < 6) throw new Error('Password must be at least 6 characters.')
      
      result = await userStore.register(form.value.name, form.value.email, form.value.password)
    } else {
      // Execute Login Pipeline
      result = await userStore.login(form.value.email, form.value.password)
    }

    if (!result.success) {
      throw new Error(result.error || 'Authentication failed. Please try again.')
    }

    // Success routing fallback to original destination or admin dashboard
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
  transform: translateY(-10px); 
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>