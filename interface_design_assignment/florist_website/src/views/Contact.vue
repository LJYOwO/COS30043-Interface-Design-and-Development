<template>
<div class="min-h-screen py-20" style="background: linear-gradient(160deg, #FDFBF7 0%, #F9E5E5 60%, #F9E5E5 100%);">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-up">
      <div class="text-center mb-16">
        <p class="text-[10px] font-bold text-[#9DB6A0] uppercase tracking-widest mb-3">Get in Touch</p>
        <h1 class="font-serif text-4xl sm:text-5xl text-ink font-bold mb-4">Let's Talk Blooms</h1>
        <p class="text-sm text-ink/60 max-w-md mx-auto font-medium">Whether it's a bespoke wedding arrangement or a question about your order, we're here to help.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-cream-200 shadow-glass">
        <!-- 联络表单 -->
        <form @submit.prevent="submitForm" class="space-y-5">
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/60 mb-1.5">Name</label>
            <input type="text" required placeholder="Your name" class="w-full px-4 py-3 bg-white/80 border border-transparent rounded-xl text-sm focus:outline-none focus:border-[#CE8280]/40 focus:ring-2 focus:ring-[#CE8280]/10 transition-all shadow-inner" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/60 mb-1.5">Email</label>
            <input type="email" required placeholder="hello@example.com" class="w-full px-4 py-3 bg-white/80 border border-transparent rounded-xl text-sm focus:outline-none focus:border-[#CE8280]/40 focus:ring-2 focus:ring-[#CE8280]/10 transition-all shadow-inner" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-ink/60 mb-1.5">Message</label>
            <textarea rows="4" required placeholder="How can we help?" class="w-full px-4 py-3 bg-white/80 border border-transparent rounded-xl text-sm focus:outline-none focus:border-[#CE8280]/40 focus:ring-2 focus:ring-[#CE8280]/10 transition-all shadow-inner resize-none"></textarea>
          </div>
          <button type="submit" class="w-full py-3.5 rounded-full bg-[#CE8280] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#B87472] transition-all shadow-petal hover:-translate-y-0.5">
            Send Message ✉️
          </button>
        </form>

        <!-- 旗舰店地址信息 -->
        <div class="flex flex-col justify-center border-t md:border-t-0 md:border-l border-cream-200 pt-8 md:pt-0 md:pl-12">
          <h3 class="font-serif text-xl font-bold text-ink mb-2">Flagship Studio</h3>
          <p class="text-sm text-ink/70 leading-relaxed mb-8 font-medium">
            FloraLab Botanical Studio<br>
            Jalan Simpang Tiga<br>
            93350 Kuching, Sarawak<br>
            Malaysia
          </p>

          <h3 class="font-serif text-xl font-bold text-ink mb-2">Operating Hours</h3>
          <p class="text-sm text-ink/70 leading-relaxed mb-8 font-medium">
            Mon - Fri: 9:00 AM - 6:00 PM<br>
            Sat - Sun: 10:00 AM - 4:00 PM
          </p>

          <h3 class="font-serif text-xl font-bold text-ink mb-2">Direct Contact</h3>
          <p class="text-sm text-ink/70 leading-relaxed font-medium">
            hello@floralab.com.my<br>
            +60 82-123 456
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
function submitForm() {
  alert('Thank you for reaching out! A FloraLab artisan will get back to you shortly. 🌸')
}
</script>