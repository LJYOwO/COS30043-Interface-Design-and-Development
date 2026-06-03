<template>
  <div class="process-page">
    <div class="bg-mesh" aria-hidden="true"/>

    <section class="hero">
      <div class="hero-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="hero-text">
          <p class="eyebrow">Behind the Bouquet</p>
          <h1 class="hero-title">The Floral<br><em>Science</em></h1>
          <p class="hero-sub">How we bring the world's finest stems directly to your vase — from farm to florist.</p>
        </div>
        <div class="hero-deco" aria-hidden="true">
          <div class="deco-ring">
            <svg viewBox="0 0 120 120" class="deco-svg">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#CE8280" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.3"/>
              <circle cx="60" cy="60" r="40" fill="rgba(249,229,229,0.4)"/>
              <text x="60" y="52" text-anchor="middle" font-size="28" dominant-baseline="middle">🔬</text>
              <text x="60" y="78" text-anchor="middle" font-size="8" font-family="Georgia,serif" fill="#CE8280" letter-spacing="2" font-weight="bold">SCIENCE</text>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <section class="timeline-section max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="centre-rule" aria-hidden="true"/>

      <div class="step reveal-step">
        <div class="step-spacer relative overflow-hidden rounded-3xl shadow-sm h-64 sm:h-auto sm:self-stretch">
          <img src="/images/flower_farm.png" 
               class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105" alt="Flower Farm">
        </div>
        <div class="step-node">
          <div class="node-dot" style="background:linear-gradient(135deg,#9DB6A0,#7A9E7E)">01</div>
        </div>
        <div class="step-card">
          <div class="step-tag" style="color:#486B4C;background:#EEF5EF">Sourcing</div>
          <h3>Global Sourcing</h3>
          <p>We partner with ethical, sustainable farms from the Cameron Highlands to the hills of Colombia to source rare, seasonal blooms.</p>
          <div class="step-chips">
            <span>🌍 15+ farm partners</span>
            <span>📅 Year-round sourcing</span>
          </div>
        </div>
      </div>

      <div class="step step-flip reveal-step">
        <div class="step-spacer relative overflow-hidden rounded-3xl shadow-sm h-64 sm:h-auto sm:self-stretch">
          <img src="/images/c_lab.png" 
               class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105" alt="Conditioning Lab">
        </div>
        <div class="step-node">
          <div class="node-dot" style="background:linear-gradient(135deg,#CE8280,#B87472)">02</div>
        </div>
        <div class="step-card">
          <div class="step-tag" style="color:#A06060;background:#FDF0F0">Lab</div>
          <h3>The Conditioning Lab</h3>
          <p>Upon arrival, every stem undergoes a strict 24-hour hydration and temperature-acclimation process to maximize vase life.</p>
          <div class="step-chips">
            <span>🌡️ Precision-controlled</span>
            <span>⏱️ 24-hr acclimation</span>
          </div>
        </div>
      </div>

      <div class="step reveal-step">
        <div class="step-spacer relative overflow-hidden rounded-3xl shadow-sm h-64 sm:h-auto sm:self-stretch">
          <img src="/images/artisan_design.png" 
               class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105" alt="Artisan Design">
        </div>
        <div class="step-node">
          <div class="node-dot" style="background:linear-gradient(135deg,#D4C2FC,#B8A4F0)">03</div>
        </div>
        <div class="step-card">
          <div class="step-tag" style="color:#7360B4;background:#F3F0FD">Design</div>
          <h3>Artisan Design</h3>
          <p>Our florists hand-tie your custom selections using signature spiraling techniques, wrapped in biodegradable craft paper.</p>
          <div class="step-chips">
            <span>✂️ Hand-tied always</span>
            <span>🌿 Zero plastic wrap</span>
          </div>
        </div>
      </div>

      <div class="step step-flip reveal-step">
        <div class="step-spacer relative overflow-hidden rounded-3xl shadow-sm h-64 sm:h-auto sm:self-stretch">
          <img src="/images/same_day_dispatch.png" 
               class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105" alt="Same-Day Dispatch">
        </div>
        <div class="step-node">
          <div class="node-dot" style="background:linear-gradient(135deg,#F5C78E,#E8A857)">04</div>
        </div>
        <div class="step-card">
          <div class="step-tag" style="color:#8B6220;background:#FDF6EC">Delivery</div>
          <h3>Same-Day Dispatch</h3>
          <p>Arrangements leave the studio within hours of completion, kept at optimal temperature throughout delivery to your door.</p>
          <div class="step-chips">
            <span>🚚 Same-day delivery</span>
            <span>❄️ Cold-chain logistics</span>
          </div>
        </div>
      </div>

    </section>

    <section class="promise-section max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div class="promise-inner">
        <div class="promise-item">
          <span class="pnum">98%</span>
          <span class="plabel">Customer satisfaction</span>
        </div>
        <div class="pdivider"/>
        <div class="promise-item">
          <span class="pnum">7–14</span>
          <span class="plabel">Days guaranteed vase life</span>
        </div>
        <div class="pdivider"/>
        <div class="promise-item">
          <span class="pnum">48hr</span>
          <span class="plabel">Farm to florist freshness</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 创建交叉观察器
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // 当组件进入视口（露出15%以上）时触发
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { 
    threshold: 0.15 // 灵敏度设定：露出15%就开始播放动画
  })

  // 抓取并观察所有的步骤条目
  document.querySelectorAll('.reveal-step').forEach(el => observer.observe(el))
})
</script>

<style scoped>
/* ── Page shell ─────────────────────────────────────────── */
.process-page {
  min-height: 100vh;
  background: linear-gradient(170deg, #FDFBF7 0%, #EAE2FE 50%, #F9E5E5 100%);
  overflow-x: hidden;
}
.bg-mesh {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background:
    radial-gradient(circle at 15% 20%, rgba(157,182,160,0.13) 0%, transparent 50%),
    radial-gradient(circle at 85% 75%, rgba(212,194,252,0.13) 0%, transparent 50%);
}

/* ── Hero ───────────────────────────────────────────────── */
.hero {
  position: relative; z-index: 1;
  padding: 7rem 0 4rem;
}
.hero-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
}
.hero-text { flex: 1; }
.eyebrow {
  display: inline-block;
  font-size: 0.6rem; font-weight: 800;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: #9DB6A0;
  background: rgba(157,182,160,0.12);
  border: 1px solid rgba(157,182,160,0.28);
  padding: 0.3rem 0.85rem; border-radius: 999px;
  margin-bottom: 1rem;
}
.hero-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2.75rem, 6vw, 5rem);
  font-weight: 700; color: #1a1a2e; line-height: 1.05;
  margin-bottom: 1.25rem;
}
.hero-title em { font-style: italic; color: #CE8280; }
.hero-sub {
  font-size: 0.9rem; color: rgba(26,26,46,0.6);
  max-width: 44ch; line-height: 1.75; font-weight: 500;
}
.hero-deco { flex-shrink: 0; }
.deco-ring { width: 160px; height: 160px; }
.deco-svg  { width: 100%; height: 100%; }
@media (max-width: 640px) { .hero-deco { display: none; } }

/* ── Timeline section ───────────────────────────────────── */
.timeline-section {
  position: relative; z-index: 1;
  display: flex; flex-direction: column;
  gap: 0;
  padding-bottom: 2rem;
}

/* Centre vertical rule — only visible ≥768px */
.centre-rule {
  display: none;
  position: absolute;
  left: 50%; top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom,
    rgba(157,182,160,0.6) 0%,
    rgba(206,130,128,0.4) 50%,
    transparent 100%);
  transform: translateX(-50%);
  pointer-events: none;
}
@media (min-width: 768px) { .centre-rule { display: block; } }

/* ── Step row ───────────────────────────────────────────── */
.step {
  display: flex;
  align-items: center;
  gap: 0;
  position: relative;
  padding: 2rem 0;
}

/* 🔥 新增：核心“蹦出来”动画 CSS 特效控制 */
.reveal-step {
  opacity: 0;
  /* 初始状态：向下偏移 50px，并且轻微缩小，处于潜伏状态 */
  transform: translateY(50px) scale(0.96); 
  /* 核心：使用了弹簧缓动贝塞尔曲线 cubic-bezier(0.34, 1.56, 0.64, 1) */
  /* 这会让组件在到达目标位置时，产生一个极其微妙、舒适的高级“果冻回弹”感，也就是你说的蹦出来！ */
  transition: opacity 0.85s cubic-bezier(0.34, 1.56, 0.64, 1),
              transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 激活状态：当滚动条滚到对应位置，JS 会加上 visible 类名 */
.reveal-step.visible {
  opacity: 1;
  transform: translateY(0) scale(1); /* 完美归位 */
}

/* Mobile: all steps full-width, number left */
@media (max-width: 767px) {
  .step, .step.step-flip {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem 0;
  }
  
  .step-spacer { 
    display: block; 
    width: 100%; 
    order: 0; 
  }
  
  .step-node {
    order: -1;
    width: auto; flex: none;
    display: flex; align-items: center;
  }
  .step-card {
    width: 100%;
  }
}

/* Desktop: true alternating left/right */
@media (min-width: 768px) {
  .step         { flex-direction: row; }
  .step.step-flip { flex-direction: row-reverse; }

  .step-spacer {
    flex: 1;
  }

  .step-node {
    flex: 0 0 auto;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  .step-card {
    flex: 1;
    max-width: calc(50% - 2rem);
  }
}

/* Node dot */
.node-dot {
  width: 3rem; height: 3rem;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: Georgia, serif;
  font-size: 0.9rem; font-weight: 700;
  color: white;
  border: 3px solid white;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18), 0 0 0 4px rgba(255,255,255,0.6);
  position: relative; z-index: 3;
  flex-shrink: 0;
}

/* Card */
.step-card {
  background: rgba(255,255,255,0.82);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.95);
  border-radius: 1.75rem;
  padding: 1.75rem 2rem;
  box-shadow: 0 4px 32px rgba(157,182,160,0.1), 0 1px 0 rgba(255,255,255,0.8) inset;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.step-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 44px rgba(157,182,160,0.18);
}

.step-tag {
  display: inline-block;
  font-size: 0.6rem; font-weight: 800;
  letter-spacing: 0.14em; text-transform: uppercase;
  padding: 0.25rem 0.7rem; border-radius: 999px;
  margin-bottom: 0.75rem;
}
.step-card h3 {
  font-family: Georgia, serif;
  font-size: 1.25rem; font-weight: 700;
  color: #1a1a2e; margin-bottom: 0.6rem;
}
.step-card p {
  font-size: 0.84rem; color: rgba(26,26,46,0.65);
  line-height: 1.75; font-weight: 500; margin-bottom: 1rem;
}
.step-chips {
  display: flex; flex-wrap: wrap; gap: 0.45rem;
}
.step-chips span {
  font-size: 0.7rem; font-weight: 600;
  color: rgba(26,26,46,0.5);
  background: rgba(26,26,46,0.04);
  border: 1px solid rgba(26,26,46,0.07);
  padding: 0.22rem 0.65rem; border-radius: 999px;
}

/* ── Promise banner ─────────────────────────────────────── */
.promise-section { position: relative; z-index: 1; }
.promise-inner {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.95);
  border-radius: 2rem;
  padding: 2.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1.5rem;
  box-shadow: 0 8px 32px rgba(157, 182, 160, 0.12);
}
.promise-item { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; text-align: center; }
.pnum {
  font-family: Georgia, serif;
  font-size: 2.5rem; font-weight: 700;
  color: #CE8280; line-height: 1;
}
.plabel {
  font-size: 0.68rem; font-weight: 700;
  color: rgba(26, 26, 46, 0.65); 
  text-transform: uppercase; letter-spacing: 0.1em;
}
.pnum em { font-style: italic; color: #CE8280; }
.pdivider {
  width: 1px; height: 3.5rem;
  background: rgba(26, 26, 46, 0.1);
}
@media (max-width: 600px) { .pdivider { display: none; } }
</style>