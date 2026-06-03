<template>
  <div class="contact-page min-h-screen py-24 relative overflow-hidden">
    <!-- Decorative background blobs -->
    <div class="blob blob-1" aria-hidden="true"/>
    <div class="blob blob-2" aria-hidden="true"/>
    <div class="blob blob-3" aria-hidden="true"/>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <!-- Hero header -->
      <div class="text-center mb-20">
        <p class="eyebrow">Get in Touch</p>
        <h1 class="page-title">Let's Talk<br><em>Blooms</em></h1>
        <p class="page-subtitle">Whether it's a bespoke wedding arrangement or a question about your order, our artisans are here.</p>
        <div class="title-ornament">
          <span>✦</span><span class="line"/><span>✿</span><span class="line"/><span>✦</span>
        </div>
      </div>

      <!-- Two-column layout -->
      <div class="contact-grid">

        <!-- LEFT: Form -->
        <div class="form-card">
          <div class="form-card-header">
            <span class="card-pill">✉️ Send a Message</span>
          </div>
          <form @submit.prevent="submitForm" class="space-y-6 mt-6">
            <div class="field-row">
              <div class="field">
                <label>Name</label>
                <input type="text" required placeholder="Your full name" />
              </div>
              <div class="field">
                <label>Email</label>
                <input type="email" required placeholder="hello@example.com" />
              </div>
            </div>
            <div class="field">
              <label>Subject</label>
              <select>
                <option>Wedding / Event Enquiry</option>
                <option>Order Question</option>
                <option>Custom Bouquet</option>
                <option>General Enquiry</option>
              </select>
            </div>
            <div class="field">
              <label>Message</label>
              <textarea rows="5" required placeholder="Tell us how we can help you…"></textarea>
            </div>
            <button type="submit" class="submit-btn">
              <span>Send Message</span>
              <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
          </form>
        </div>

        <!-- RIGHT: Info cards -->
        <div class="info-column">

          <div class="info-card">
            <div class="info-icon">📍</div>
            <div>
              <h3>Flagship Studio</h3>
              <p>FloraLab Botanical Studio<br>Jalan Simpang Tiga<br>93350 Kuching, Sarawak<br>Malaysia</p>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon">🕐</div>
            <div>
              <h3>Operating Hours</h3>
              <div class="hours-grid">
                <span class="day">Mon – Fri</span><span class="time">9:00 AM – 6:00 PM</span>
                <span class="day">Sat – Sun</span><span class="time">10:00 AM – 4:00 PM</span>
              </div>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon">📞</div>
            <div>
              <h3>Direct Contact</h3>
              <p>
                <a href="mailto:hello@floralab.com.my">hello@floralab.com.my</a><br>
                <a href="tel:+60821234567">+60 82-123 456</a>
              </p>
            </div>
          </div>

          <!-- Social strip -->
          <div class="social-strip">
            <span class="social-label">Follow the studio</span>
            <a href="#" class="social-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>

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

<style scoped>
/* ── Page shell ─────────────────────────────────────────── */
.contact-page {
  background: linear-gradient(160deg, #FDFBF7 0%, #EAE2FE 45%, #F9E5E5 100%);
}

/* Background blobs */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}
.blob-1 {
  width: 420px; height: 420px;
  background: radial-gradient(circle, #F9E5E5 0%, transparent 70%);
  top: -100px; right: -80px; opacity: 0.6;
}
.blob-2 {
  width: 320px; height: 320px;
  background: radial-gradient(circle, #D4C2FC 0%, transparent 70%);
  bottom: 100px; left: -60px; opacity: 0.5;
}
.blob-3 {
  width: 240px; height: 240px;
  background: radial-gradient(circle, #9DB6A0 0%, transparent 70%);
  top: 40%; left: 40%; opacity: 0.2;
}

/* ── Hero typography ────────────────────────────────────── */
.eyebrow {
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #9DB6A0;
  margin-bottom: 0.75rem;
}
.page-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.1;
  margin-bottom: 1rem;
}
.page-title em {
  font-style: italic;
  color: #CE8280;
}
.page-subtitle {
  font-size: 0.9rem;
  color: rgba(26,26,46,0.6);
  max-width: 38ch;
  margin: 0 auto 1.5rem;
  line-height: 1.7;
  font-weight: 500;
}
.title-ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: #CE8280;
  opacity: 0.5;
  font-size: 0.6rem;
}
.title-ornament .line {
  display: block;
  width: 48px;
  height: 1px;
  background: currentColor;
}

/* ── Layout grid ────────────────────────────────────────── */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 768px) {
  .contact-grid {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 3rem;
    align-items: start;
  }
}

/* ── Form card ──────────────────────────────────────────── */
.form-card {
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.9);
  border-radius: 2rem;
  padding: 2.25rem;
  box-shadow: 0 4px 40px rgba(206,130,128,0.08), 0 1px 0 rgba(255,255,255,0.9) inset;
}
.form-card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.card-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #F9E5E5;
  color: #CE8280;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  border: 1px solid rgba(206,130,128,0.2);
}

/* ── Form fields ────────────────────────────────────────── */
.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.field label {
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(26,26,46,0.5);
}
.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255,255,255,0.9);
  border: 1.5px solid rgba(206,130,128,0.12);
  border-radius: 0.875rem;
  font-size: 0.875rem;
  color: #1a1a2e;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  font-family: inherit;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04) inset;
}
.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: rgba(206,130,128,0.45);
  box-shadow: 0 0 0 3px rgba(206,130,128,0.1);
}
.field textarea { resize: none; }
.field select { cursor: pointer; }

/* ── Submit button ──────────────────────────────────────── */
.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.9rem 2rem;
  background: linear-gradient(135deg, #CE8280, #B87472);
  color: white;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
  box-shadow: 0 4px 20px rgba(206,130,128,0.4);
}
.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(206,130,128,0.45);
}
.submit-btn:active { transform: translateY(0); }
.btn-arrow {
  width: 1.1rem; height: 1.1rem;
  transition: transform 0.2s;
}
.submit-btn:hover .btn-arrow { transform: translateX(4px); }

/* ── Info column ────────────────────────────────────────── */
.info-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: rgba(255,255,255,0.65);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.85);
  border-radius: 1.5rem;
  padding: 1.4rem 1.6rem;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 20px rgba(157,182,160,0.08);
}
.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(157,182,160,0.14);
}
.info-icon {
  font-size: 1.5rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F9E5E5;
  border-radius: 0.75rem;
  flex-shrink: 0;
}
.info-card h3 {
  font-family: Georgia, serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.4rem;
}
.info-card p {
  font-size: 0.8rem;
  color: rgba(26,26,46,0.65);
  line-height: 1.7;
  font-weight: 500;
}
.info-card a {
  color: #CE8280;
  text-decoration: none;
  transition: color 0.15s;
}
.info-card a:hover { color: #B87472; }

.hours-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.2rem 1rem;
  font-size: 0.8rem;
}
.day { color: rgba(26,26,46,0.5); font-weight: 600; }
.time { color: rgba(26,26,46,0.8); font-weight: 500; }

/* ── Social strip ───────────────────────────────────────── */
.social-strip {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.6rem;
  background: rgba(255,255,255,0.4);
  border: 1px solid rgba(255,255,255,0.7);
  border-radius: 1.5rem;
}
.social-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(26,26,46,0.4);
  flex: 1;
}
.social-btn {
  width: 2.25rem; height: 2.25rem;
  display: flex; align-items: center; justify-content: center;
  background: #CE8280;
  color: white;
  border-radius: 50%;
  transition: transform 0.2s, background 0.2s;
}
.social-btn svg { width: 1rem; height: 1rem; }
.social-btn:hover { background: #B87472; transform: scale(1.1); }
</style>