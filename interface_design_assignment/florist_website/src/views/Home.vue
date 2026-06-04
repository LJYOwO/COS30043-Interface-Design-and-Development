<template>
  <div class="overflow-hidden bg-[#FDFBF7]">

    <!-- ══════════════════════════════════════════════════════════════════════
         HERO  —  full-bleed editorial split
    ══════════════════════════════════════════════════════════════════════ -->
    <section class="relative min-h-screen flex items-center overflow-hidden hero-bg">

      <!-- Ambient glows -->
      <div class="absolute inset-0 pointer-events-none z-0">
        <div class="absolute top-0 left-0 w-[56rem] h-[56rem] rounded-full bg-[#F9E5E5]/80 blur-[120px] -translate-x-1/3 -translate-y-1/4" />
        <div class="absolute bottom-0 right-0 w-[40rem] h-[40rem] rounded-full bg-[#EAE2FE]/60 blur-[100px] translate-x-1/4 translate-y-1/4" />
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-[#9DB6A0]/10 blur-[80px]" />
      </div>

      <!-- Decorative botanical SVG backdrop -->
      <svg class="absolute right-0 top-0 h-full w-auto opacity-[0.04] pointer-events-none z-0 select-none" viewBox="0 0 600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="300" cy="450" r="280" stroke="#CE8280" stroke-width="1"/>
        <circle cx="300" cy="450" r="200" stroke="#CE8280" stroke-width="0.5"/>
        <circle cx="300" cy="450" r="120" stroke="#9DB6A0" stroke-width="1"/>
        <line x1="300" y1="0" x2="300" y2="900" stroke="#CE8280" stroke-width="0.5"/>
        <line x1="0" y1="450" x2="600" y2="450" stroke="#CE8280" stroke-width="0.5"/>
        <line x1="100" y1="100" x2="500" y2="800" stroke="#9DB6A0" stroke-width="0.3"/>
        <line x1="500" y1="100" x2="100" y2="800" stroke="#9DB6A0" stroke-width="0.3"/>
      </svg>

      <!-- Floating botanicals -->
      <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <span class="absolute top-[18%] right-[12%] text-[7rem] opacity-[0.12] animate-float-slow select-none leading-none">🌸</span>
        <span class="absolute bottom-[20%] left-[8%]  text-[5rem] opacity-[0.10] animate-float select-none leading-none" style="animation-delay:1.5s">🌿</span>
        <span class="absolute top-[55%] right-[30%]  text-[4rem] opacity-[0.08] animate-float-slow select-none leading-none" style="animation-delay:3s">✿</span>
      </div>

      <!-- Content grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20 pb-16">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center min-h-[82vh]">

          <!-- LEFT copy -->
          <div class="lg:col-span-7 space-y-8 reveal-home text-center lg:text-left">

            <!-- Eyebrow pill -->
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CE8280]/10 border border-[#CE8280]/25 text-[#CE8280] text-[10px] font-black tracking-[0.2em] uppercase shadow-inner">
              <span class="w-1.5 h-1.5 rounded-full bg-[#CE8280] animate-pulse flex-shrink-0"></span>
              Botanical Lab · Est. 2024
            </div>

            <!-- Headline -->
            <h1 class="font-serif leading-[1.02] tracking-tight text-ink">
              <span class="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black hero-line-1">Where Blooms</span>
              <span class="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black relative hero-line-2">
                <em class="not-italic text-[#CE8280] relative inline-block">
                  Meet
                  <svg class="absolute -bottom-1 left-0 w-full" height="10" viewBox="0 0 120 10" fill="none" preserveAspectRatio="none">
                    <path d="M2 8 Q30 2 60 6 Q90 10 118 4" stroke="#CE8280" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.4"/>
                  </svg>
                </em>
                <span> Science</span>
              </span>
            </h1>

            <!-- Sub -->
            <p class="text-sm sm:text-base text-ink/55 max-w-lg mx-auto lg:mx-0 leading-[1.8] font-medium">
              Design your bespoke bouquet with our slot-based 2D customizer. Every single stem is hand-selected and chemically conditioned for enduring artisan beauty.
            </p>

            <!-- Metrics strip -->
            <div class="flex items-center gap-8 justify-center lg:justify-start pt-2">
              <div class="text-center lg:text-left">
                <p class="font-serif text-2xl font-black text-ink">2,400+</p>
                <p class="text-[9px] font-black text-ink/40 uppercase tracking-widest">Bouquets Made</p>
              </div>
              <div class="w-px h-8 bg-cream-200"></div>
              <div class="text-center lg:text-left">
                <p class="font-serif text-2xl font-black text-ink">16 days</p>
                <p class="text-[9px] font-black text-ink/40 uppercase tracking-widest">Avg. Vase Life</p>
              </div>
              <div class="w-px h-8 bg-cream-200"></div>
              <div class="text-center lg:text-left">
                <p class="font-serif text-2xl font-black text-[#CE8280]">4.9 ★</p>
                <p class="text-[9px] font-black text-ink/40 uppercase tracking-widest">Customer Rating</p>
              </div>
            </div>

            <!-- CTAs -->
            <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <RouterLink to="/customizer"
                class="group inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-[#CE8280] text-white font-black text-[11px] tracking-[0.15em] uppercase hover:bg-[#B87472] transition-all shadow-petal hover:scale-[1.03] hover:shadow-xl">
                <span class="group-hover:rotate-12 transition-transform text-base">🌹</span>
                Start Customizing
              </RouterLink>
              <RouterLink to="/catalog"
                class="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-white/80 backdrop-blur-md text-ink font-black text-[11px] tracking-[0.15em] uppercase hover:bg-white hover:text-[#CE8280] transition-all border border-cream-200 shadow-sm hover:scale-[1.03]">
                Browse Catalog
                <span class="text-[#CE8280]">→</span>
              </RouterLink>
            </div>

            <!-- Trust badges -->
            <div class="flex items-center gap-4 justify-center lg:justify-start pt-1">
              <span class="text-[10px] text-ink/35 font-bold uppercase tracking-widest flex items-center gap-1.5"><span class="text-[#9DB6A0]">✓</span> Plastic-free</span>
              <span class="text-[10px] text-ink/35 font-bold uppercase tracking-widest flex items-center gap-1.5"><span class="text-[#9DB6A0]">✓</span> Same-day Kuching</span>
              <span class="text-[10px] text-ink/35 font-bold uppercase tracking-widest flex items-center gap-1.5"><span class="text-[#9DB6A0]">✓</span> Eco Farms</span>
            </div>
          </div>

          <!-- RIGHT image -->
          <div class="lg:col-span-5 flex justify-center items-center relative reveal-home" style="transition-delay:0.25s">
            <!-- Layered glow rings -->
            <div class="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-[#F9E5E5] to-[#EAE2FE] blur-3xl opacity-60 animate-pulse"></div>
            <div class="absolute w-64 h-64 rounded-full border-2 border-[#CE8280]/10 border-dashed animate-spin-slow"></div>
            <div class="absolute w-48 h-48 rounded-full border border-[#9DB6A0]/20"></div>

            <!-- Image card with glass frame -->
            <div class="relative p-5 rounded-[2.5rem] bg-white/30 backdrop-blur-sm border border-white/60 shadow-glass-lg animate-float">
              <!-- Corner accents -->
              <div class="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#CE8280]/40 rounded-tl-lg"></div>
              <div class="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#CE8280]/40 rounded-tr-lg"></div>
              <div class="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#CE8280]/40 rounded-bl-lg"></div>
              <div class="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#CE8280]/40 rounded-br-lg"></div>

              <img
                src="/images/hero-flowers.png"
                alt="FloraLab Masterpiece"
                class="max-h-[46vh] lg:max-h-[55vh] w-auto object-contain drop-shadow-botanical hover:scale-105 transition-transform duration-700 cursor-pointer"
                @error="handleImgError"
              />
            </div>


          </div>
        </div>
      </div>

      <!-- Scroll cue -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce z-10">
        <span class="text-[9px] font-black tracking-[0.2em] uppercase text-ink/30">Scroll</span>
        <div class="w-px h-8 bg-gradient-to-b from-ink/20 to-transparent"></div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════════════
         MARQUEE STRIP
    ══════════════════════════════════════════════════════════════════════ -->
    <section class="relative bg-[#CE8280] py-4 overflow-hidden">
      <!-- Grain overlay -->
      <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%221%22/%3E%3C/svg%3E')"></div>
      <div class="flex gap-12 animate-marquee whitespace-nowrap">
        <div class="flex flex-shrink-0 gap-12">
          <span v-for="tag in moodTags" :key="tag" class="text-[10px] text-white font-black tracking-[0.2em] uppercase inline-flex items-center gap-4">
            {{ tag }}<span class="text-white/30 text-xs">✦</span>
          </span>
        </div>
        <div class="flex flex-shrink-0 gap-12" aria-hidden="true">
          <span v-for="tag in moodTags" :key="tag + '-dup'" class="text-[10px] text-white font-black tracking-[0.2em] uppercase inline-flex items-center gap-4">
            {{ tag }}<span class="text-white/30 text-xs">✦</span>
          </span>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════════════
         FEATURED PRODUCTS
    ══════════════════════════════════════════════════════════════════════ -->
    <section class="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 reveal-home">
        <div>
          <p class="text-[10px] font-black text-[#9DB6A0] uppercase tracking-[0.2em] mb-3">Curated Selections</p>
          <h2 class="font-serif text-4xl sm:text-5xl text-ink font-bold leading-tight">Featured<br/>Bouquets</h2>
        </div>
        <RouterLink to="/catalog"
          class="self-start sm:self-end inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-ink/40 hover:text-[#CE8280] transition-colors border-b border-transparent hover:border-[#CE8280] pb-0.5 whitespace-nowrap">
          View All →
        </RouterLink>
      </div>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="n in 3" :key="n" class="bg-cream-100/60 rounded-3xl h-[420px] animate-pulse border border-cream-200"></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <RouterLink
          v-for="(item, idx) in featuredProducts"
          :key="item.id"
          :to="'/product/' + item.id"
          class="group product-card bg-white rounded-3xl overflow-hidden border border-cream-200 block reveal-home"
          :style="{ 'transition-delay': `${idx * 0.12}s` }"
        >
          <!-- Image -->
          <div class="relative overflow-hidden m-3 mb-0 rounded-2xl aspect-[4/3]" :style="{ background: item.bg || '#fde8e8' }">
            <!-- Index number -->
            <span class="absolute top-3 left-3 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[10px] font-black text-ink/50 border border-cream-100 shadow-sm">
              {{ String(idx + 1).padStart(2, '0') }}
            </span>
            <!-- Badge -->
            <span class="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[9px] font-black uppercase tracking-wider text-ink shadow-sm border border-cream-100">
              {{ item.isFeatured ? 'Featured' : 'Bestseller' }}
            </span>

            <img
              v-if="item.imageUrl && item.imageUrl.trim() !== ''"
              :src="item.imageUrl"
              :alt="item.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-6xl transition-transform duration-500 group-hover:scale-110">
              {{ item.emoji || '🌸' }}
            </div>

            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <!-- Info -->
          <div class="p-5 pt-4 space-y-2">
            <div class="flex justify-between items-start gap-2">
              <h3 class="font-serif text-lg font-bold text-ink leading-tight group-hover:text-[#CE8280] transition-colors">{{ item.name }}</h3>
              <span class="font-black text-[#CE8280] text-sm whitespace-nowrap">RM {{ parseFloat(item.price).toFixed(2) }}</span>
            </div>
            <p class="text-xs text-ink/45 line-clamp-2 leading-relaxed font-medium">{{ item.desc || item.description }}</p>
            <!-- CTA hint -->
            <div class="pt-2 flex items-center gap-1.5 text-[10px] font-black text-[#CE8280] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>View bouquet</span><span>→</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════════════
         HOW IT WORKS
    ══════════════════════════════════════════════════════════════════════ -->
    <section class="relative py-28 overflow-hidden" style="background: linear-gradient(140deg, #FDFBF7 0%, #EAE2FE 45%, #F9E5E5 100%);">
      <!-- Grid texture -->
      <div class="absolute inset-0 opacity-[0.025] pointer-events-none" style="background-image: linear-gradient(rgba(26,26,46,1) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,46,1) 1px, transparent 1px); background-size: 48px 48px;"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-20 reveal-home">
          <p class="text-[10px] font-black text-[#CE8280] uppercase tracking-[0.2em] mb-3">The Workflow</p>
          <h2 class="font-serif text-4xl sm:text-5xl text-ink font-bold">How FloraLab Works</h2>
          <div class="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#CE8280] to-transparent mx-auto mt-5"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
          <!-- Connector line (desktop) -->
          <div class="hidden sm:block absolute top-10 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px bg-gradient-to-r from-[#CE8280]/20 via-[#CE8280]/50 to-[#CE8280]/20 z-0"></div>

          <div
            v-for="(step, i) in steps"
            :key="i"
            class="relative flex flex-col items-center bg-white/50 backdrop-blur-md p-8 pt-10 rounded-3xl border border-white/80 shadow-sm hover:shadow-glass-lg transition-all duration-500 hover:-translate-y-2 reveal-home"
            :style="{ 'transition-delay': `${i * 0.15}s` }"
          >
            <!-- Step number -->
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#CE8280] text-white flex items-center justify-center text-[11px] font-black border-4 border-[#FDFBF7] shadow-md z-10">
              {{ String(i + 1).padStart(2, '0') }}
            </div>

            <div class="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl mb-6 border border-cream-100">
              {{ step.icon }}
            </div>
            <h3 class="font-serif text-xl font-bold text-ink mb-3 text-center">{{ step.title }}</h3>
            <p class="text-xs text-ink/55 leading-relaxed max-w-xs text-center font-medium">{{ step.desc }}</p>
          </div>
        </div>

        <div class="mt-16 text-center reveal-home" style="transition-delay:0.4s">
          <RouterLink to="/customizer"
            class="group inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-[#CE8280] text-white font-black tracking-[0.15em] uppercase text-[11px] hover:bg-[#B87472] transition-all shadow-petal hover:scale-[1.03] hover:shadow-xl">
            <span class="group-hover:rotate-12 transition-transform">🌱</span>
            Open the Customizer Lab →
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════════════
         BEYOND THE BLOOMS  —  editorial asymmetric
    ══════════════════════════════════════════════════════════════════════ -->
    <section class="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#F2F7F4]">
      <!-- Giant background letter -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[26rem] font-black text-[#9DB6A0]/[0.04] pointer-events-none select-none leading-none z-0">F</div>

      <!-- Floating greenery -->
      <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <span class="absolute top-12 left-[8%]  text-5xl opacity-20 animate-float-slow select-none rotate-12">🌿</span>
        <span class="absolute bottom-16 left-[4%]  text-4xl opacity-15 animate-float select-none -rotate-12" style="animation-delay:1s">🍃</span>
        <span class="absolute top-1/3 right-[6%]  text-6xl opacity-10 animate-float-slow select-none rotate-45" style="animation-delay:2s">🌱</span>
        <span class="absolute bottom-12 right-[14%] text-4xl opacity-20 animate-float select-none -rotate-12" style="animation-delay:0.5s">🌿</span>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="flex flex-col lg:flex-row items-start gap-16 mb-16">
          <div class="reveal-home lg:w-1/3">
            <p class="text-[10px] font-black text-[#9DB6A0] uppercase tracking-[0.2em] mb-3">Explore FloraLab</p>
            <h2 class="font-serif text-4xl sm:text-5xl font-bold text-ink leading-tight">Beyond<br/>the Blooms</h2>
            <div class="w-12 h-0.5 bg-[#9DB6A0] mt-5 rounded-full"></div>
            <p class="mt-6 text-sm text-ink/50 leading-relaxed font-medium max-w-xs">
              From the science behind each stem to our commitment to the earth — every petal has a story.
            </p>
          </div>

          <div class="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-5">
            <RouterLink to="/process"
              class="group explore-card bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-white/80 hover:bg-white hover:shadow-glass-lg transition-all duration-500 hover:-translate-y-2 flex flex-col reveal-home"
              style="transition-delay:0.1s">
              <div class="w-12 h-12 rounded-2xl bg-[#EAE2FE]/60 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform duration-500 border border-white shadow-sm">🔬</div>
              <h3 class="font-serif text-lg font-bold mb-3 text-ink">The Floral Science</h3>
              <p class="text-xs text-ink/55 mb-6 font-medium leading-relaxed flex-1">Discover how we condition, hydrate, and hand-tie every stem for maximum botanical vase life.</p>
              <span class="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase text-[#CE8280] border-b border-[#CE8280]/30 group-hover:border-[#CE8280] pb-0.5 w-fit transition-colors">Read More →</span>
            </RouterLink>

            <RouterLink to="/sustainability"
              class="group explore-card bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-white/80 hover:bg-white hover:shadow-glass-lg transition-all duration-500 hover:-translate-y-2 flex flex-col reveal-home"
              style="transition-delay:0.2s">
              <div class="w-12 h-12 rounded-2xl bg-[#9DB6A0]/25 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform duration-500 border border-white shadow-sm">🌿</div>
              <h3 class="font-serif text-lg font-bold mb-3 text-ink">Our Commitment</h3>
              <p class="text-xs text-ink/55 mb-6 font-medium leading-relaxed flex-1">100% plastic-free wrapping, carbon neutral execution, and strictly sourced from Sarawak eco farms.</p>
              <span class="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase text-[#9DB6A0] border-b border-[#9DB6A0]/30 group-hover:border-[#9DB6A0] pb-0.5 w-fit transition-colors">Learn How →</span>
            </RouterLink>

            <RouterLink to="/contact"
              class="group explore-card bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-white/80 hover:bg-white hover:shadow-glass-lg transition-all duration-500 hover:-translate-y-2 flex flex-col reveal-home"
              style="transition-delay:0.3s">
              <div class="w-12 h-12 rounded-2xl bg-[#F9E5E5]/80 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform duration-500 border border-white shadow-sm">✉️</div>
              <h3 class="font-serif text-lg font-bold mb-3 text-ink">Get in Touch</h3>
              <p class="text-xs text-ink/55 mb-6 font-medium leading-relaxed flex-1">Planning a bespoke wedding layout or have a question about an order? Let's formulate your idea.</p>
              <span class="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase text-[#CE8280] border-b border-[#CE8280]/30 group-hover:border-[#CE8280] pb-0.5 w-fit transition-colors">Contact Us →</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════════════
         TESTIMONIALS  —  editorial magazine layout
    ══════════════════════════════════════════════════════════════════════ -->
    <section class="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div class="text-center mb-16 reveal-home">
        <p class="text-[10px] font-black text-[#9DB6A0] uppercase tracking-[0.2em] mb-3">Kind Words</p>
        <h2 class="font-serif text-4xl sm:text-5xl text-ink font-bold">From Our Garden</h2>
        <div class="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#CE8280] to-transparent mx-auto mt-5"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          v-for="(review, idx) in testimonials"
          :key="review.name"
          class="relative bg-white rounded-3xl p-8 border border-cream-200 shadow-xs hover:shadow-md transition-all duration-500 hover:-translate-y-0.5 reveal-home overflow-hidden"
          :style="{ 'transition-delay': `${idx * 0.1}s` }"
        >
          <!-- Giant quote mark -->
          <span class="absolute top-4 right-6 font-serif text-[7rem] leading-none text-[#CE8280]/[0.07] pointer-events-none select-none font-black">"</span>

          <!-- Stars -->
          <div class="flex gap-0.5 mb-5">
            <span v-for="n in 5" :key="n" class="text-[#CE8280] text-sm">★</span>
          </div>

          <p class="text-sm text-ink/75 leading-relaxed mb-8 font-medium italic relative z-10">"{{ review.text }}"</p>

          <div class="flex items-center gap-3 pt-4 border-t border-cream-100">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-ink/70 shadow-sm ring-2 ring-[#CE8280]/20 flex-shrink-0"
                 :style="{ background: review.color }">
              {{ review.name[0] }}
            </div>
            <div>
              <p class="text-xs font-black text-ink">{{ review.name }}</p>
              <p class="text-[9px] font-bold text-ink/35 uppercase tracking-widest mt-0.5">{{ review.date }}</p>
            </div>
            <div class="ml-auto flex gap-0.5 opacity-30">
              <span v-for="n in 5" :key="n" class="text-[#CE8280] text-[10px]">★</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA nudge - Soft, elegant back to top button -->
      <div class="text-center mt-16 reveal-home">
        <p class="text-[9px] text-ink/30 font-bold uppercase tracking-[0.2em] mb-4">—— Continue the journey ——</p>
        <button @click="scrollToTop"
          class="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/70 backdrop-blur-sm border border-cream-200 text-ink/60 font-black text-[10px] tracking-widest uppercase hover:bg-[#CE8280] hover:text-white hover:border-[#CE8280] transition-all shadow-sm hover:shadow-petal outline-none cursor-pointer">
          <svg class="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
          </svg>
          <span>Back to Top</span>
        </button>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { RouterLink } from 'vue-router'

const moodTags = ['Botanical Science', 'Bespoke Design', 'Sustainable Pack', 'Artisanal Craft', 'Fresh Stems', 'Dreamy Aesthetic', 'Curated Lab']

const steps = [
  { icon: '🎨', title: 'Choose a Mood',   desc: 'Tell us the organic feeling — romantic, wild, or minimalist. Browse our seasonal templates.' },
  { icon: '🌹', title: 'Slot Your Blooms', desc: 'Pick stem by stem with our fully responsive 2D slot-based engine. Your choice, verified.' },
  { icon: '🚚', title: 'Delivered Fresh',  desc: 'Harvested fresh on order day, engineered in secure wrap, at your Kuching door by noon.' },
]

const testimonials = [
  { name: 'Sophie R.',  text: "The customizer is unlike anything I've seen. I designed my wedding arch flowers from my phone. Absolutely magical.", date: 'June 2026', color: '#fde8e8' },
  { name: 'James T.',   text: 'Ordered for my anniversary. The bouquet was exactly what my wife loves — stunning quality and beautifully wrapped. Will never use another florist.', date: 'May 2026', color: '#e8f0e9' },
  { name: 'Mei L.',     text: 'Stunning quality. The Violet Dream bouquet lasted 16 days. The packaging alone is worth the price.', date: 'April 2026', color: '#ede8fd' },
  { name: 'Carlos M.',  text: 'Ordered for a corporate event. 200 arrangements, every one perfect. The FloraLab team is extraordinary.', date: 'March 2026', color: '#fff8e8' },
]

const featuredProducts = ref([])
const loading = ref(true)

// Smooth scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const initScrollAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible')
    })
  }, { threshold: 0.07 })
  document.querySelectorAll('.reveal-home:not(.visible)').forEach(el => observer.observe(el))
}

const fetchFeaturedProducts = async () => {
  try {
    const res = await fetch('/api/products')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const result = await res.json()
    const allProducts = Array.isArray(result) ? result : (result.data || [])
    const activeProducts = allProducts.filter(p => p.status === 'active')
    const featuredItems  = activeProducts.filter(p => p.isFeatured === true)
    const bestsellerItems = activeProducts.filter(p => p.isBestseller === true && !p.isFeatured)
    const otherItems     = activeProducts.filter(p => !p.isFeatured && !p.isBestseller)
    featuredProducts.value = [...featuredItems, ...bestsellerItems, ...otherItems].slice(0, 3)
  } catch (err) {
    console.error('[HOME_SYNC_ERROR]', err)
    featuredProducts.value = []
  } finally {
    loading.value = false
    nextTick(() => initScrollAnimations())
  }
}

onMounted(() => {
  fetchFeaturedProducts()
  initScrollAnimations()
})

function handleImgError() {
  console.warn('[IMAGE_LOAD_FAIL] hero-flowers.png missing from public/images/')
}
</script>

<style scoped>
/* Hero bg */
.hero-bg {
  background:
    radial-gradient(ellipse 80% 60% at 50% -10%, rgba(249,229,229,0.9) 0%, rgba(253,251,247,0) 70%),
    radial-gradient(ellipse 50% 40% at 90% 80%, rgba(234,226,254,0.5) 0%, transparent 60%),
    #FDFBF7;
}

/* Marquee */
.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee 28s linear infinite;
}
.animate-marquee:hover { animation-play-state: paused; }
@keyframes marquee {
  0%   { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

/* Reveal system */
.reveal-home {
  opacity: 0;
  transform: translateY(32px) scale(0.98);
  transition: opacity 0.9s cubic-bezier(0.215, 0.61, 0.355, 1),
              transform 0.9s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.reveal-home.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Floats */
.animate-float      { animation: float 6s ease-in-out infinite; }
.animate-float-slow { animation: float 9s ease-in-out infinite; }
@keyframes float {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-14px); }
}

/* Slow spin for ring */
.animate-spin-slow { animation: spin 30s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Product cards */
.product-card {
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.45s ease;
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 60px rgba(206,130,128,0.14), 0 6px 20px rgba(0,0,0,0.05);
}

/* Botanical drop shadow for hero image */
.drop-shadow-botanical {
  filter: drop-shadow(0 24px 48px rgba(206,130,128,0.22)) drop-shadow(0 8px 16px rgba(0,0,0,0.08));
}

/* Glass shadow */
.shadow-glass-lg {
  box-shadow: 0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(206,130,128,0.1), inset 0 1px 0 rgba(255,255,255,0.8);
}

/* Hero line stagger */
.hero-line-1 { animation: slideUp 0.9s cubic-bezier(0.215, 0.61, 0.355, 1) 0.1s both; }
.hero-line-2 { animation: slideUp 0.9s cubic-bezier(0.215, 0.61, 0.355, 1) 0.25s both; }
@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>