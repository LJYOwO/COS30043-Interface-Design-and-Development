<template>
  <div class="sustain-page min-h-screen relative overflow-hidden">
    <div class="bg-orbs" aria-hidden="true">
      <div class="orb orb-1"/><div class="orb orb-2"/><div class="orb orb-3"/>
    </div>

    <div class="sustain-hero reveal-sustain">
      <div class="hero-content">
        <p class="eyebrow">Our Commitment</p>
        <h1 class="hero-title">Rooted in<br><em>Nature</em></h1>
        <p class="hero-sub">We believe beautiful flowers shouldn't cost the earth. Every decision we make is guided by our zero-waste charter.</p>
        <div class="hero-cta-row">
          <div class="impact-pill">🌱 Carbon neutral since 2024</div>
          <div class="impact-pill">♻️ 100% plastic-free</div>
        </div>
      </div>
      
      <div class="hero-visual" aria-hidden="true">
        <div class="leaf-ring relative overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop" 
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            alt="Eco Friendly Concept"
          />
          <div class="absolute bottom-4 inset-x-4 bg-white/70 backdrop-blur-md py-2 px-3 rounded-xl border border-white/40 text-center shadow-sm">
            <span class="ring-label">🌿 Eco Studio</span>
          </div>
        </div>
      </div>
    </div>

    <div class="pillars-section">
      <div class="pillar-card pillar-green reveal-sustain">
        <div class="pillar-icon-wrap">
          <span class="pillar-icon">♻️</span>
        </div>
        <div class="pillar-body">
          <div class="pillar-tag">Packaging</div>
          <h3>100% Biodegradable</h3>
          <p>We have completely eliminated single-use plastics. Our wraps are made from recycled unbleached kraft paper, tied with natural jute twine.</p>
          <div class="pillar-stat">
            <span class="stat-val">0</span>
            <span class="stat-unit">g of plastic per order</span>
          </div>
        </div>
      </div>

      <div class="pillar-card pillar-rose reveal-sustain">
        <div class="pillar-icon-wrap">
          <span class="pillar-icon">👩‍🌾</span>
        </div>
        <div class="pillar-body">
          <div class="pillar-tag">Sourcing</div>
          <h3>Fair Trade Certified</h3>
          <p>We strictly source from farms that guarantee fair wages and safe working conditions for every agricultural worker in the supply chain.</p>
          <div class="pillar-stat">
            <span class="stat-val">15+</span>
            <span class="stat-unit">certified partner farms</span>
          </div>
        </div>
      </div>

      <div class="pillar-card pillar-lavender reveal-sustain">
        <div class="pillar-icon-wrap">
          <span class="pillar-icon">🌱</span>
        </div>
        <div class="pillar-body">
          <div class="pillar-tag">Waste</div>
          <h3>Composting Program</h3>
          <p>All green waste from the studio is composted and donated to local community gardens — turning yesterday's blooms into tomorrow's soil.</p>
          <div class="pillar-stat">
            <span class="stat-val">100%</span>
            <span class="stat-unit">of clippings composted</span>
          </div>
        </div>
      </div>
    </div>

    <div class="manifesto-strip reveal-sustain">
      <div class="manifesto-inner">
        <div class="manifesto-quote">
          <span class="quote-mark">"</span>
          <p>The most sustainable bouquet is one grown with respect — for the land, for the farmer, and for the person who receives it.</p>
          <span class="quote-attr">— The FloraLab Charter</span>
        </div>
        <div class="manifesto-actions">
          <div class="action-item">
            <span class="action-icon">🌍</span>
            <div>
              <strong>Carbon Offsetting</strong>
              <p>Every delivery is offset through verified reforestation partners in Borneo.</p>
            </div>
          </div>
          <div class="action-item">
            <span class="action-icon">💧</span>
            <div>
              <strong>Water Stewardship</strong>
              <p>Our studio uses rainwater harvesting and drip-irrigation for all in-house growing.</p>
            </div>
          </div>
          <div class="action-item">
            <span class="action-icon">📦</span>
            <div>
              <strong>Returnable Vessels</strong>
              <p>Return your FloraLab vase for a RM5 credit — we clean and re-use every one.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cert-row">
      <p class="cert-label">Recognised by</p>
      <div class="cert-badges">
        <div class="cert-badge">🏅 Rainforest Alliance</div>
        <div class="cert-badge">🌐 Fair Trade Intl.</div>
        <div class="cert-badge">♻️ Zero Waste Cert.</div>
        <div class="cert-badge">🇲🇾 SIRIM Eco-Label</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { 
    threshold: 0.1 // 露头 10% 即可触发，体验更丝滑
  })

  document.querySelectorAll('.reveal-sustain').forEach(el => observer.observe(el))
})
</script>

<style scoped>
/* ── Shell ──────────────────────────────────────────────── */
.sustain-page {
  background: linear-gradient(160deg, #FDFBF7 0%, #EAF4EC 40%, #EAE2FE 80%, #F9E5E5 100%);
  padding-bottom: 5rem;
}

/* Background orbs */
.bg-orbs { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
}
.orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(157,182,160,0.2) 0%, transparent 70%); top: -100px; left: -100px; }
.orb-2 { width: 380px; height: 380px; background: radial-gradient(circle, rgba(212,194,252,0.18) 0%, transparent 70%); bottom: 5%; right: -60px; }
.orb-3 { width: 280px; height: 280px; background: radial-gradient(circle, rgba(249,229,229,0.3) 0%, transparent 70%); top: 40%; left: 30%; }

/* ── Hero ───────────────────────────────────────────────── */
.sustain-hero {
  position: relative;
  z-index: 1;
  max-width: 72rem;
  margin: 0 auto;
  padding: 6rem 1.5rem 3rem; /* 🔥 移动端：更紧凑、精神的间距 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
}
@media (min-width: 768px) {
  .sustain-hero {
    padding: 8rem 1.5rem 4rem; /* 🔥 桌面端：恢复原本的大气大气间距 */
  }
}
.hero-content { flex: 1; }
.eyebrow {
  display: inline-block;
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #486B4C;
  background: rgba(157,182,160,0.15);
  border: 1px solid rgba(157,182,160,0.3);
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  margin-bottom: 1rem;
}
.hero-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2.25rem, 7vw, 4.5rem); 
  font-weight: 700;
  color: #1a2e1f;
  line-height: 1.05;
  margin-bottom: 1.25rem;
}
.hero-title em { font-style: italic; color: #486B4C; }
.hero-sub {
  font-size: 0.9rem;
  color: rgba(26,46,31,0.65);
  max-width: 44ch;
  line-height: 1.75;
  font-weight: 500;
  margin-bottom: 1.5rem;
}
.hero-cta-row { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.impact-pill {
  font-size: 0.72rem;
  font-weight: 700;
  color: #486B4C;
  background: rgba(157,182,160,0.18);
  border: 1px solid rgba(157,182,160,0.35);
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
}


.hero-visual { flex-shrink: 0; display: none; }
@media (min-width: 768px) { .hero-visual { display: flex; } }
.leaf-ring {
  width: 280px; height: 280px; /* 放大长宽 */
  border-radius: 50%;
  border: 4px solid white;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  box-shadow: 0 12px 48px rgba(72,107,76,0.15), 0 0 0 6px rgba(255,255,255,0.4);
}
.ring-label {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #486B4C;
}

.reveal-sustain {
  opacity: 0;
  transform: translateY(45px) scale(0.97);
  transition: opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1),
              transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.reveal-sustain.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* ── Pillars ────────────────────────────────────────────── */
.pillars-section {
  position: relative; z-index: 1;
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}
@media (min-width: 640px) { .pillars-section { grid-template-columns: repeat(3, 1fr); } }

.pillars-section .reveal-sustain:nth-child(1) { transition-delay: 0.05s; }
.pillars-section .reveal-sustain:nth-child(2) { transition-delay: 0.15s; }
.pillars-section .reveal-sustain:nth-child(3) { transition-delay: 0.25s; }

.pillar-card {
  border-radius: 2rem;
  padding: 2.25rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border: 1.5px solid transparent;
  backdrop-filter: blur(18px);
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 32px rgba(72,107,76,0.04);
}
.pillar-card:hover { 
  transform: translateY(-6px) scale(1.01); 
  box-shadow: 0 16px 48px rgba(72,107,76,0.12); 
}

.pillar-green { background: rgba(234,244,236,0.85); border-color: rgba(157,182,160,0.4); }
.pillar-rose  { background: rgba(253,240,240,0.85); border-color: rgba(206,130,128,0.3); }
.pillar-lavender { background: rgba(243,240,253,0.85); border-color: rgba(212,194,252,0.4); }

.pillar-icon-wrap {
  width: 3.5rem; height: 3.5rem;
  border-radius: 1rem;
  background: rgba(255,255,255,0.7);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.6rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
}
.pillar-tag {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(26,46,31,0.45);
  margin-bottom: 0.3rem;
}
.pillar-body h3 {
  font-family: Georgia, serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a2e1f;
  margin-bottom: 0.6rem;
}
.pillar-body p {
  font-size: 0.8rem;
  color: rgba(26,46,31,0.65);
  line-height: 1.75;
  font-weight: 500;
  margin-bottom: 1rem;
}
.pillar-stat {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(26,46,31,0.08);
}
.stat-val {
  font-family: Georgia, serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #486B4C;
  line-height: 1;
}
.stat-unit {
  font-size: 0.72rem;
  font-weight: 600;
  color: rgba(26,46,31,0.5);
}

/* ── Manifesto strip ────────────────────────────────────── */
.manifesto-strip {
  position: relative; z-index: 1;
  max-width: 72rem;
  margin: 3.5rem auto 0;
  padding: 0 1.5rem;
}
.manifesto-inner {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.95);
  border-radius: 2.5rem;
  padding: 1.75rem 1.25rem; /* 🔥 移动端：大幅缩小内边距，解放文字横向空间 */
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  box-shadow: 0 8px 32px rgba(72,107,76,0.08);
}
@media (min-width: 768px) {
  .manifesto-inner {
    padding: 3rem; 
  }
}


.manifesto-quote { padding-right: 1rem; }
.quote-mark {
  display: block;
  font-family: Georgia, serif;
  font-size: 5rem;
  line-height: 0.8;
  color: rgba(72,107,76,0.15);
  margin-bottom: 0.5rem;
}
.manifesto-quote p {
  font-family: Georgia, serif;
  font-style: italic;
  font-size: 1.15rem;
  color: #1a2e1f;
  line-height: 1.65;
  margin-bottom: 1rem;
}
.quote-attr {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #486B4C;
}

.manifesto-actions { display: flex; flex-direction: column; gap: 1.25rem; }
.action-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
.action-icon {
  font-size: 1.4rem;
  width: 2.5rem; height: 2.5rem;
  display: flex; align-items: center; justify-content: center;
  background: rgba(157,182,160,0.18);
  border-radius: 0.75rem;
  flex-shrink: 0;
}
.action-item strong {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #1a2e1f;
  margin-bottom: 0.2rem;
}
.action-item p {
  font-size: 0.78rem;
  color: rgba(26,46,31,0.65);
  line-height: 1.6;
  font-weight: 500;
}

/* ── Certification row ──────────────────────────────────── */
.cert-row {
  position: relative; z-index: 1;
  max-width: 72rem;
  margin: 3.5rem auto 0;
  padding: 0 1.5rem;
  text-align: center;
}
.cert-label {
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(26,46,31,0.35);
  margin-bottom: 1rem;
}
.cert-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}
.cert-badge {
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(26,46,31,0.6);
  background: rgba(255,255,255,0.7);
  border: 1px solid rgba(157,182,160,0.3);
  backdrop-filter: blur(8px);
  padding: 0.5rem 1.1rem;
  border-radius: 999px;
}
</style>