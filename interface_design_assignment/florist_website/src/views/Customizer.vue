<template>
  <div class="min-h-screen flex flex-col" style="background: linear-gradient(160deg, #FDFBF7 0%, #F9E5E5 40%, #EAE2FE 100%);">

    <!-- ── Header ─────────────────────────────────────────────────────── -->
    <div class="sticky top-0 z-30 backdrop-blur-md border-b border-white/40 bg-white/85">
      <div class="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-3 overflow-x-auto hide-scrollbar">
        
        <div class="flex items-center gap-2 flex-shrink-0">
          <span class="text-xl">💐</span>
          <div class="hidden sm:block">
            <p class="font-serif font-bold text-ink text-sm leading-none">Bouquet Studio</p>
            <p class="text-[10px] text-ink/40 mt-0.5">{{ filledCount }} of {{ currentVase.slots }} stems · RM {{ totalPrice }}</p>
          </div>
        </div>

        <div class="flex items-center gap-1.5 flex-shrink-0">
          <span class="text-[10px] text-ink/40 mr-1 hidden sm:inline">Vessel:</span>
          <button
            v-for="v in vaseStyles"
            :key="v.id"
            class="px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-all border"
            :class="currentVase.id === v.id
              ? 'bg-[#CE8280] text-white border-transparent shadow-sm'
              : 'border-cream-200 text-ink/60 hover:border-[#CE8280]/40 hover:text-ink'"
            @click="switchVase(v)"
          >
            {{ v.icon }} <span class="hidden sm:inline">{{ v.name }}</span>
          </button>
        </div>

        <div class="flex items-center gap-1.5 flex-shrink-0">
          <button
            class="px-3 py-1.5 rounded-full text-[10px] sm:text-xs border border-cream-200 text-ink/50 hover:text-ink hover:border-[#CE8280]/40 transition-all"
            @click="resetBouquet"
          >
            Reset
          </button>
          <button
            class="px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-white transition-all shadow-petal flex items-center gap-1"
            style="background-color:#CE8280;"
            :class="filledCount === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#B87472]'"
            :disabled="filledCount === 0"
            @click="addToCart"
          >
            🛒 <span class="hidden sm:inline">Add · </span> RM {{ totalPrice }}
          </button>
        </div>
      </div>
    </div>

    <!-- ── Main Layout ─────────────────────────────────────────────────── -->
    <div class="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-6 gap-6">

      <!-- ══ LEFT: Canvas ═══════════════════════════════════════════════ -->
      <div class="flex-1 flex flex-col items-center justify-start overflow-hidden">

        <!-- 🔥 FIXED: Responsive Wrapper - Centered on mobile -->
      <div class="w-full relative min-h-[420px] sm:min-h-[550px] overflow-hidden">
          <div
            class="absolute left-1/2 top-4 sm:top-1/2 -translate-x-1/2 sm:-translate-y-1/2 select-none transform scale-[0.75] sm:scale-100 origin-top sm:origin-center transition-transform"
            :style="{ width: canvasW + 'px', height: canvasH + 'px' }"
          >
            <!-- ═══ LAYER 1 — Vase BACK body (z:1) ══════════ -->
<svg :width="canvasW" :height="canvasH" viewBox="0 0 400 520"
                 class="absolute inset-0" style="z-index:1">
              <defs>
                <linearGradient id="vaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   style="stop-color:#E9C1C0;stop-opacity:1" />
                  <stop offset="50%"  style="stop-color:#FDFBF7;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#E9C1C0;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="neckGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   style="stop-color:#D4C2FC;stop-opacity:0.6" />
                  <stop offset="100%" style="stop-color:#E9C1C0;stop-opacity:0.6" />
                </linearGradient>
                <linearGradient id="wideGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   style="stop-color:#9DB6A0;stop-opacity:1" />
                  <stop offset="50%"  style="stop-color:#D6E4D8;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#9DB6A0;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="posyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   style="stop-color:#F5E6A3;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#E8D08A;stop-opacity:1" />
                </linearGradient>
              </defs>

              <template v-if="currentVase.id === 'classic'">
                <ellipse cx="200" cy="430" rx="95" ry="18" fill="#D4B5B4" opacity="0.5"/>
                <ellipse cx="200" cy="260" rx="80" ry="8" fill="#C97A79" opacity="0.2"/>
              </template>

              <template v-if="currentVase.id === 'wide'">
                <ellipse cx="200" cy="445" rx="115" ry="16" fill="#7D9E81" opacity="0.4"/>
                <ellipse cx="200" cy="278" rx="115" ry="10" fill="#5F7A63" opacity="0.2"/>
              </template>

              <template v-if="currentVase.id === 'posy'">
                <ellipse cx="200" cy="460" rx="80" ry="12" fill="#D4C494" opacity="0.4"/>
                <ellipse cx="200" cy="260" rx="70" ry="6" fill="#A8831A" opacity="0.15"/>
              </template>
            </svg>

            <!-- ═══ LAYER 2 — Flower Slots (z:10–50) ═ -->
            <div
              v-for="(slot, i) in slots"
              :key="i"
              class="absolute"
              :style="{ ...slotStyle(i), zIndex: 10 + i }"
            >
              <div
                class="relative transition-transform duration-150"
                :class="dragOverSlot === i ? 'scale-110' : ''"
                :style="{ width: SLOT_SIZE + 'px', height: SLOT_SIZE + 'px' }"
                @dragover.prevent="dragOverSlot = i"
                @dragleave="dragOverSlot = null"
                @drop.prevent="dropOnSlot(i)"
                @click="clickSlot(i)"
              >
                <!-- Empty ring -->
                <div
                  v-if="!slot.flower"
                  class="absolute inset-0 rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-200"
                  :class="dragOverSlot === i
                    ? 'border-[#CE8280] bg-[#CE8280]/20'
                    : 'border-cream-300 hover:border-[#CE8280]/50 hover:bg-[#CE8280]/5 cursor-pointer'"
                >
                  <span
                    class="text-base font-light leading-none"
                    :class="dragOverSlot === i ? 'text-[#CE8280]/60' : 'text-ink/20'"
                    :style="{ transform: `rotate(${-slotAngle(i)}deg)`, display: 'block' }"
                  >+</span>
                </div>

                <!-- Flower -->
                <Transition name="bloom">
                  <div
                    v-if="slot.flower"
                    :key="slot.animKey"
                    class="absolute bottom-0 inset-x-0 flex flex-col-reverse items-center cursor-pointer group"
                    style="transform-origin: bottom center;"
                    @click.stop="removeFlower(i)"
                  >
                    <template v-if="slot.flower.imageUrl">
                      <img
                        :src="slot.flower.imageUrl"
                        :alt="slot.flower.name"
                        class="flex-shrink-0 drop-shadow-md transition-transform duration-200 group-hover:scale-105"
                        :style="{
                          width: Math.round(flowerImgWidth(i)) + 'px',
                          height: Math.round(flowerImgHeight(i)) + 'px',
                          objectFit: 'contain',
                          objectPosition: 'bottom center',
                          position: 'relative',
                          bottom: '0',
                        }"
                      />
                    </template>

                    <template v-else>
                      <div
                        class="rounded-full flex-shrink-0"
                        :style="{
                          width: '3px',
                          height: stemHeight(i) + 'px',
                          background: 'linear-gradient(to top, #4a7c50, #8fbc8f)',
                        }"
                      />
                      <div
                        class="flex items-center justify-center rounded-full shadow-md transition-transform duration-200 group-hover:scale-110 flex-shrink-0"
                        :style="{
                          width: flowerHeadSize(i) + 'px',
                          height: flowerHeadSize(i) + 'px',
                          background: slot.flower.bg || 'linear-gradient(135deg,#fde8e8,#f9d4d4)',
                        }"
                      >
                        <span :style="{ fontSize: Math.round(flowerHeadSize(i) * 0.55) + 'px' }">
                          {{ slot.flower.emoji }}
                        </span>
                      </div>
                    </template>

                    <div
                      class="absolute opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-white/80 backdrop-blur-sm text-[#CE8280] border border-white/60 shadow-sm font-bold tracking-widest uppercase text-[8px] px-2 py-1 rounded-full whitespace-nowrap"
                      :style="{
                        bottom: (slot.flower.imageUrl
                          ? Math.round(flowerImgHeight(i))
                          : stemHeight(i) + flowerHeadSize(i)) + 8 + 'px',
                        left: '50%',
                        zIndex: 200,
                        transform: `translateX(-50%) rotate(${-slotAngle(i)}deg)`,
                      }"
                    >
                      Remove ✕
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- ═══ LAYER 3 — Vase FRONT rim/neck (z:100) ═ -->
<svg :width="canvasW" :height="canvasH" viewBox="0 0 400 520"
                 class="absolute inset-0 pointer-events-none" style="z-index:100">

              <template v-if="currentVase.id === 'classic'">
                <path d="M120,260 L280,260 Q285,285 285,310 Q295,420 270,445 Q200,465 130,445 Q105,420 115,310 Q115,285 120,260 Z"
                      fill="url(#vaseGrad)" stroke="#C97A79" stroke-width="1.5"/>
                <path d="M130,330 Q125,380 135,420" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
                
                <path d="M120,260 L280,260 Q285,285 285,310 Q200,332 115,310 Q115,285 120,260 Z"
                      fill="url(#neckGrad)" stroke="#C97A79" stroke-width="1.5"/>
                <line x1="120" y1="260" x2="280" y2="260" stroke="#C97A79" stroke-width="1.5"/>
                <rect x="124" y="261" width="152" height="10" fill="#AED6F1" opacity="0.45" rx="2"/>
              </template>

              <template v-if="currentVase.id === 'wide'">
                <path d="M85,278 L315,278 L315,295 Q320,430 300,448 Q200,470 100,448 Q80,430 85,295 Z"
                      fill="url(#wideGrad)" stroke="#7D9E81" stroke-width="1.5"/>
                <path d="M105,330 Q100,390 108,430" stroke="white" stroke-width="5" stroke-linecap="round" opacity="0.4"/>
                
                <path d="M85,278 L315,278 L315,295 Q200,315 85,295 Z"
                      fill="url(#wideGrad)" stroke="#7D9E81" stroke-width="1.5"/>
                <line x1="85" y1="278" x2="315" y2="278" stroke="#7D9E81" stroke-width="1.5"/>
                <rect x="90" y="279" width="220" height="11" fill="#AED6F1" opacity="0.40" rx="2"/>
              </template>

              <template v-if="currentVase.id === 'posy'">
                <path d="M148,368 L120,460 Q200,475 280,460 L252,368 Z"
                      fill="url(#posyGrad)" stroke="#C9A227" stroke-width="1"/>
                
                <path d="M130,260 L270,260 L252,372 Q200,380 148,372 Z"
                      fill="url(#posyGrad)" stroke="#C9A227" stroke-width="1.5"/>
                <line x1="130" y1="260" x2="148" y2="372" stroke="#C9A227" stroke-width="1" opacity="0.4"/>
                <line x1="270" y1="260" x2="252" y2="372" stroke="#C9A227" stroke-width="1" opacity="0.4"/>
                <line x1="130" y1="260" x2="270" y2="260" stroke="#C9A227" stroke-width="1.5"/>
                <rect x="134" y="261" width="132" height="10" fill="#AED6F1" opacity="0.42" rx="2"/>
                <path d="M132,362 Q200,376 268,362" stroke="#8B6914" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M132,370 Q200,384 268,370" stroke="#8B6914" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.5"/>
                <path d="M186,356 Q176,342 186,347 Q200,352 214,347 Q224,342 214,356" fill="none" stroke="#8B6914" stroke-width="2" stroke-linecap="round"/>
                <circle cx="200" cy="359" r="4" fill="#8B6914"/>
              </template>
            </svg>
          </div>
        </div>

        <!-- Progress bar (hidden on mobile) -->
        <div class="w-full max-w-sm mt-0 sm:mt-6 hidden sm:block">
          <div class="flex justify-between text-xs text-ink/40 mb-1.5">
            <span>{{ filledCount }} stems added</span>
            <span>{{ currentVase.slots - filledCount }} slots remaining</span>
          </div>
          <div class="h-1.5 rounded-full overflow-hidden" style="background:#F5EFE2">
            <div
              class="h-full rounded-full transition-all duration-500"
              style="background: linear-gradient(90deg, #E9C1C0, #D4C2FC)"
              :style="{ width: `${(filledCount / currentVase.slots) * 100}%` }"
            />
          </div>
        </div>
      </div>

      <!-- ══ RIGHT: Flower Picker ════════════════════════════════════════ -->
      <div class="w-full lg:w-72 xl:w-80 flex flex-col gap-4">

        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="cat in categories"
            :key="cat"
            class="px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all border shadow-sm"
            :class="activeCategory === cat
              ? 'bg-[#CE8280] text-white border-[#CE8280]'
              : 'border-cream-200 bg-white/50 text-ink/60 hover:border-[#CE8280]/40 hover:text-ink'"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <div v-if="flowersLoading" class="space-y-2">
          <div v-for="n in 6" :key="n" class="h-16 rounded-2xl animate-pulse" style="background:#FAF6EE" />
        </div>

        <div v-else-if="flowersError" class="text-center py-6 rounded-2xl text-xs text-ink/50" style="background:#FAF6EE">
          <p class="mb-2">⚠️ {{ flowersError }}</p>
          <button class="text-sage underline" @click="fetchFlowers">Retry</button>
        </div>

        <div v-else class="flex flex-col gap-2 overflow-y-auto pr-1" style="max-height:420px">
          <div
            v-for="flower in filteredFlowers"
            :key="flower.id"
            class="flex items-center gap-3 p-3 rounded-2xl border transition-all group"
            :class="selectedFlower?.id === flower.id
              ? 'border-[#CE8280]/50 shadow-petal'
              : 'border-cream-200 hover:border-[#CE8280]/40 hover:shadow-glass cursor-grab active:cursor-grabbing'"
            style="background:rgba(255,255,255,0.7)"
            draggable="true"
            @dragstart="startDrag(flower)"
            @dragend="dragOverSlot = null"
            @click="selectFlower(flower)"
          >
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 overflow-hidden"
              :style="flower.imageUrl ? { background: 'transparent' } : { background: flower.bg }"
            >
              <img
                v-if="flower.imageUrl"
                :src="flower.imageUrl"
                :alt="flower.name"
                class="w-full h-full object-cover object-top"
              />
              <span v-else class="text-xl">{{ flower.emoji }}</span>
            </div>

            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-ink leading-tight">{{ flower.name }}</p>
              <p class="text-[10px] text-ink/40 mt-0.5">{{ flower.vaseLife }} · {{ flower.scent }}</p>
            </div>

            <div class="flex flex-col items-end gap-1.5">
              <span class="text-xs font-bold" style="color:#CE8280">RM {{ flower.price }}</span>
              <button
                class="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-all"
                :style="selectedFlower?.id === flower.id
                  ? 'background:#CE8280; color:white;'
                  : 'background:#FAF6EE; color:#8A8A8A;'"
                @click.stop="quickAdd(flower)"
              >
                +
              </button>
            </div>
          </div>

          <p v-if="!flowersLoading && filteredFlowers.length === 0" class="text-center text-xs text-ink/40 py-6">
            No flowers in this category
          </p>
        </div>

        <p class="text-[10px] text-ink/30 text-center leading-relaxed">
          Click <strong>+</strong> to quick-add · Drag flower onto a slot · Click a placed flower to remove it
        </p>

        <div class="rounded-3xl p-4 border border-cream-200 space-y-3 mt-auto shadow-sm" style="background:rgba(255,255,255,0.85)">
          <h4 class="font-serif text-sm font-semibold text-ink">Your Bouquet</h4>

          <div class="space-y-1 max-h-32 overflow-y-auto hide-scrollbar">
            <div
              v-for="(count, name) in flowerCounts"
              :key="name"
              class="flex items-center justify-between text-xs text-ink/60"
            >
              <span>{{ flowerEmoji(name) }} {{ name }}</span>
              <span class="font-medium">×{{ count }}</span>
            </div>
            <p v-if="filledCount === 0" class="text-xs text-ink/30 italic text-center py-2">
              Add flowers to see your bouquet
            </p>
          </div>

          <div class="border-t border-cream-200 pt-2.5 space-y-1">
            <div class="flex justify-between text-xs text-ink/50">
              <span>Vessel ({{ currentVase.name }})</span>
              <span>RM 25.00</span>
            </div>
            <div class="flex justify-between text-xs text-ink/50">
              <span>Flowers ({{ filledCount }} stems)</span>
              <span>RM {{ flowerTotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm font-bold text-ink pt-1.5 border-t border-cream-200">
              <span>Total</span>
              <span style="color:#CE8280">RM {{ totalPrice }}</span>
            </div>
          </div>

          <button
            class="w-full py-3 rounded-full text-sm font-bold tracking-wider uppercase text-white transition-all"
            style="background:#CE8280"
            :class="filledCount === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#B87472] hover:-translate-y-0.5 shadow-petal'"
            :disabled="filledCount === 0"
            @click="addToCart"
          >
            🛒 Add Bouquet to Cart
          </button>
        </div>
      </div>
    </div>

    <Transition name="toast">
      <div
        v-if="toast.show"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full text-sm font-medium text-white shadow-lg flex items-center gap-2 whitespace-nowrap"
        :style="{ background: toast.type === 'success' ? '#9DB6A0' : '#CE8280' }"
      >
        {{ toast.type === 'success' ? '✓' : '✕' }} {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/useCartStore'

const cartStore = useCartStore()

// ── Canvas dimensions ─────────────────────────────────────────────────────
const canvasW   = 420
const canvasH   = 520
const SLOT_SIZE = 72

// Flower image dimensions
const FLOWER_IMG_WIDTH = 70
const FLOWER_IMG_HEIGHT = 140

// ── Vase styles with two rows of slots ────────────────────────────────────
const vaseStyles = [
  {
    id:      'classic',
    name:    'Classic',
    icon:    '🏺',
    slots:   18,
    rimYPct: 50,
    slotPositions: [
      // Upper row
      [50, 57,   0], [43, 50, -12], [57, 50,  12],
      [40, 50, -22], [60, 50,  22], [46, 57,  -6],
      [54, 57,   6], [44, 50, -16], [56, 50,  16],
      // Lower row - one head shorter
      [50, 67,   0], [43, 60, -10], [57, 60,  10],
      [40, 60, -18], [60, 60,  18], [46, 67,  -5],
      [54, 67,   5], [44, 60, -12], [56, 60,  12],
    ],
  },
  {
    id:      'wide',
    name:    'Wide',
    icon:    '🪣',
    slots:   24,
    rimYPct: 53.5,
    slotPositions: [
      // Upper row
      [50, 53.5,   0], [43, 53.5, -10], [57, 53.5,  10],
      [35, 53.5, -22], [65, 53.5,  22], [28, 53.5, -34],
      [72, 53.5,  34], [46, 53.5,  -5], [54, 53.5,   5],
      [39, 53.5, -16], [61, 53.5,  16], [50, 53.5,   0],
      // Lower row - one head shorter
      [50, 65,   0], [43, 65,  -8], [57, 65,   8],
      [35, 65, -18], [65, 65,  18], [28, 65, -28],
      [72, 65,  28], [46, 65,  -4], [54, 65,   4],
      [39, 65, -12], [61, 65,  12], [50, 65,   0],
    ],
  },
  {
    id:      'posy',
    name:    'Posy',
    icon:    '💝',
    slots:   14,
    rimYPct: 50,
    slotPositions: [
      // Upper row
      [50, 50,   0], [44, 50, -14], [56, 50,  14],
      [40, 50, -26], [60, 50,  26], [47, 50,  -7],
      [53, 50,   7],
      // Lower row - one head shorter
      [50, 62,   0], [44, 62, -12], [56, 62,  12],
      [40, 62, -22], [60, 62,  22], [47, 62,  -6],
      [53, 62,   6],
    ],
  },
]

const currentVase = ref(vaseStyles[0])

// ── Slots ─────────────────────────────────────────────────────────────────
const slots = ref(
  vaseStyles[0].slotPositions.map(() => ({ flower: null, animKey: 0 }))
)

function getRimPx() {
  return ((currentVase.value.rimYPct ?? 50) / 100) * canvasH
}

function slotStyle(i) {
  const [xPct, rawYPct, angle = 0] = currentVase.value.slotPositions[i] ?? [50, 50, 0]
  
  const rimPx = getRimPx() // 获取当前花瓶的瓶口 Y 坐标物理高度（经典款约为 260px）

  // 【核心机制 1】：将巨大的百分比差距，缩小为柔和的“像素下沉量” (乘以 2.5 倍数)
  // 这样第二排依然会比第一排矮，但绝对不会掉进深渊
  const dropAmount = (rawYPct - (currentVase.value.rimYPct || 50)) * 2.5

  // 【核心机制 2】：强制锚定花的底部 (Bottom)
  // 让所有的花，其茎部最底端刚好插进瓶口往下 15 像素（刚好被瓶口遮住一点点，防止悬空穿帮）
  const bottomPx = rimPx + 15 + dropAmount

  // 因为插槽 div 自身的高度是 SLOT_SIZE (72)，推算出最终的 Top
  const topPx = bottomPx - SLOT_SIZE

  return {
    left: `${(xPct / 100) * canvasW - SLOT_SIZE / 2}px`,
    top: `${topPx}px`,
    width: `${SLOT_SIZE}px`,
    height: `${SLOT_SIZE}px`,
    zIndex: 10 + i,
    transform: `rotate(${angle}deg)`,
    transformOrigin: 'bottom center',
  }
}

function stemHeight(i) {
  const [, rawYPct, angle = 0] = currentVase.value.slotPositions[i] ?? [50, 50, 0]
  const angleMag = Math.abs(angle)
  const rimPx    = getRimPx()

  const baseStem = Math.round(80 - angleMag * 0.5)
  const rawTopPx = (rawYPct / 100) * canvasH - SLOT_SIZE / 2
  const maxTopPx = rimPx - SLOT_SIZE
  const clampGap = Math.max(0, rawTopPx - maxTopPx)

  return baseStem + Math.round(clampGap)
}

function flowerHeadSize(i) {
  const angle = Math.abs(currentVase.value.slotPositions[i]?.[2] ?? 0)
  return angle > 20 ? 44 : angle > 10 ? 48 : 52
}

function flowerImgHeight(i) {
  return FLOWER_IMG_HEIGHT
}

function flowerImgWidth(i) {
  return FLOWER_IMG_WIDTH
}

function slotAngle(i) {
  return currentVase.value.slotPositions[i]?.[2] ?? 0
}

// ── Flowers from API ──────────────────────────────────────────────────────
const allFlowers     = ref([])
const flowersLoading = ref(false)
const flowersError   = ref('')
const activeCategory = ref('All')

const BG_MAP = {
  Roses:    'linear-gradient(135deg,#fde8e8,#f9d4d4)',
  Seasonal: 'linear-gradient(135deg,#fde8f5,#f9c4e4)',
  Foliage:  'linear-gradient(135deg,#e8f0e9,#d6e4d8)',
  Delicate: 'linear-gradient(135deg,#fff8e8,#fde9c4)',
  Exotic:   'linear-gradient(135deg,#f0e8fd,#d8bef9)',
  Filler:   'linear-gradient(135deg,#fafafa,#f0ebe0)',
}

async function fetchFlowers() {
  flowersLoading.value = true
  flowersError.value   = ''
  try {
    const res  = await fetch('/api/flowers')
    if (!res.ok) throw new Error(`Server error ${res.status}`)
    const json = await res.json()
    allFlowers.value = (json.data || []).map(f => ({
      ...f,
      bg: BG_MAP[f.category] || 'linear-gradient(135deg,#fde8e8,#f9d4d4)',
    }))
  } catch (e) {
    flowersError.value = e.message
  } finally {
    flowersLoading.value = false
  }
}

onMounted(fetchFlowers)

const categories = computed(() => {
  const cats = [...new Set(allFlowers.value.map(f => f.category))]
  return ['All', ...cats]
})

const filteredFlowers = computed(() =>
  activeCategory.value === 'All'
    ? allFlowers.value
    : allFlowers.value.filter(f => f.category === activeCategory.value)
)

// ── Selection & drag ──────────────────────────────────────────────────────
const selectedFlower = ref(null)
const dragOverSlot   = ref(null)
const draggingFlower = ref(null)

function selectFlower(flower) {
  selectedFlower.value = selectedFlower.value?.id === flower.id ? null : flower
}

function startDrag(flower) {
  draggingFlower.value = flower
  selectedFlower.value = flower
}

function dropOnSlot(i) {
  dragOverSlot.value = null
  if (!draggingFlower.value) return
  assignToSlot(i, draggingFlower.value)
  draggingFlower.value = null
}

function clickSlot(i) {
  if (slots.value[i].flower) return
  if (!selectedFlower.value) {
    showToast('Select a flower from the panel first', 'error')
    return
  }
  assignToSlot(i, selectedFlower.value)
}

function quickAdd(flower) {
  selectedFlower.value = flower
  const empty = slots.value.findIndex(s => !s.flower)
  if (empty === -1) {
    showToast('All slots are full — remove a flower first', 'error')
    return
  }
  assignToSlot(empty, flower)
}

function assignToSlot(i, flower) {
  slots.value[i].flower   = { ...flower }
  slots.value[i].animKey += 1
}

function removeFlower(i) {
  slots.value[i].flower = null
}

function switchVase(vase) {
  const existing = slots.value.filter(s => s.flower).map(s => s.flower)
  currentVase.value = vase
  slots.value = vase.slotPositions.map((_, i) => ({
    flower:  existing[i] ?? null,
    animKey: existing[i] ? 1 : 0,
  }))
}

function resetBouquet() {
  slots.value          = slots.value.map(() => ({ flower: null, animKey: 0 }))
  selectedFlower.value = null
}

// ── Computed ──────────────────────────────────────────────────────────────
const filledCount = computed(() => slots.value.filter(s => s.flower).length)
const flowerTotal = computed(() =>
  slots.value.reduce((sum, s) => sum + (s.flower?.price ?? 0), 0)
)
const totalPrice = computed(() => (25 + flowerTotal.value).toFixed(2))

const flowerCounts = computed(() => {
  const c = {}
  slots.value.forEach(s => {
    if (s.flower) c[s.flower.name] = (c[s.flower.name] || 0) + 1
  })
  return c
})

function flowerEmoji(name) {
  return allFlowers.value.find(f => f.name === name)?.emoji || '🌸'
}

function addToCart() {
  if (filledCount.value === 0) return
  const desc = Object.entries(flowerCounts.value)
    .map(([n, c]) => `${n} ×${c}`)
    .join(', ')
  cartStore.addItem({
    id:    `custom-${Date.now()}`,
    name:  `Custom ${currentVase.value.name} Bouquet (${filledCount.value} stems)`,
    price: parseFloat(totalPrice.value),
    emoji: '💐',
    desc,
  })
  showToast('Bouquet added to cart! 🌸')
}

// ── Toast ─────────────────────────────────────────────────────────────────
const toast = ref({ show: false, message: '', type: 'success' })

function showToast(message, type = 'success') {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, 2800)
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.bloom-enter-active {
  animation: bloomIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  transform-origin: bottom center;
}
.bloom-leave-active {
  animation: bloomOut 0.22s ease forwards;
  transform-origin: bottom center;
}
@keyframes bloomIn {
  0%   { opacity: 0; transform: scale(0); }
  60%  { transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes bloomOut {
  0%   { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0); }
}

.toast-enter-active { transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active  { transition: all 0.2s ease; }
.toast-enter-from,
.toast-leave-to      { opacity: 0; transform: translateX(-50%) translateY(16px); }
</style>