/**
 * FloraLab Backend — server.js
 * Stack: Node.js · Express · Supabase (PostgreSQL + GoTrue Auth + Storage)
 *
 * Routes:
 *   POST   /api/auth/login
 *   POST   /api/auth/register
 *   POST   /api/upload                    (image upload to Supabase Storage)
 *   GET    /api/users                     (admin - user management with analytics)
 *   PATCH  /api/users/:id/role            (admin - change user role)
 *   PATCH  /api/users/:id/ban             (admin - ban/unban user)
 *   GET    /api/profiles/:id              (get user profile)
 *   PATCH  /api/profiles/:id              (update user profile)
 *   GET    /api/products
 *   GET    /api/products/:id
 *   POST   /api/products          (admin)
 *   PATCH  /api/products/:id      (admin)
 *   DELETE /api/products/:id      (admin)
 *   GET    /api/flowers
 *   POST   /api/flowers           (admin)
 *   PATCH  /api/flowers/:id       (admin)
 *   DELETE /api/flowers/:id       (admin)
 *   GET    /api/orders
 *   GET    /api/orders/:id
 *   POST   /api/orders
 *   PATCH  /api/orders/:id/status (admin)
 *   GET    /api/reviews
 *   POST   /api/reviews
 *   POST   /api/reviews/:id/like  (toggle like)
 *   PATCH  /api/reviews/:id       (admin)
 *   DELETE /api/reviews/:id       (admin)
 *   GET    /api/health
 */

import express from 'express'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import multer from 'multer'

// INITIALIZE ENV CONFIGURATION BEFORE CALLING PROCESS.ENV
dotenv.config()

// ── Supabase client ───────────────────────────────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY
const PORT = process.env.PORT || 3001

// Ensure backend crashes early with a clear log if variables are missing
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('[CRITICAL] Missing SUPABASE_URL or SUPABASE_KEY in .env file.')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ── Express setup ─────────────────────────────────────────────────────────
const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'] }))
app.use(express.json({ limit: '10mb' }))

app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// ============================================================================
// ── FILE UPLOAD ENDPOINT (Multer + Supabase Storage) ────────────────────────
// ============================================================================

// Configure multer to hold the uploaded file in memory temporarily
const upload = multer({ storage: multer.memoryStorage() })

app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image file provided in the request payload.' })
    }

    // 1. Generate a unique filename using timestamp and random hash
    const fileExtension = req.file.originalname.split('.').pop()
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`

    // 2. Upload the raw buffer to Supabase Storage bucket
    const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'floralab-assets'
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(uniqueFileName, req.file.buffer, {
        contentType: req.file.mimetype,
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('[STORAGE_UPLOAD_ERROR]', uploadError)
      return res.status(500).json({ success: false, error: 'Failed to stream file to Supabase cloud storage.' })
    }

    // 3. Retrieve the permanent public URL for the newly uploaded asset
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(uniqueFileName)

    // 4. Return the cloud URL back to the Vue frontend
    res.json({
      success: true,
      url: publicUrlData.publicUrl
    })

  } catch (err) {
    console.error('[UPLOAD_CRASH]', err)
    res.status(500).json({ success: false, error: 'Internal gateway error during file processing.' })
  }
})

// ── Column mappers (snake_case DB → camelCase API) ────────────────────────
function mapProduct(p) {
  if (!p) return null
  return {
    id: p.id, name: p.name, slug: p.slug, category: p.category,
    price: parseFloat(p.price), stock: p.stock, status: p.status,
    emoji: p.emoji, bg: p.bg,
    imageUrl: p.image_url || '',
    videoUrl: p.video_url || '',
    gallery: p.gallery || [],
    desc: p.desc || '',
    fullDesc: p.full_desc || '',
    stems: p.stems || [],
    sizes: p.sizes || [],
    tags: p.tags || [],
    occasions: p.occasions || [],
    seasons: p.seasons || [],
    colors: p.colors || [],
    care: p.care || '',
    vaseLife: p.vase_life || '',
    scent: p.scent || '',
    isBestseller: p.is_bestseller,
    isNew: p.is_new,
    seoTitle: p.seo_title || '',
    seoDesc: p.seo_desc || '',
    sortOrder: p.sort_order,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  }
}

function mapFlower(f) {
  if (!f) return null
  return {
    id: f.id, name: f.name, emoji: f.emoji, category: f.category,
    origin: f.origin || '',
    price: parseFloat(f.price),
    stock: f.stock,
    vaseLife: f.vase_life || '',
    scent: f.scent || '',
    seasons: f.seasons || [],
    bg: f.bg || '',
    imageUrl: f.image_url || '',
    notes: f.notes || '',
    createdAt: f.created_at,
    updatedAt: f.updated_at,
  }
}

function mapOrder(o) {
  if (!o) return null
  return {
    id: o.id, userId: o.user_id,
    customerName: o.customer_name,
    email: o.email, phone: o.phone || '',
    items: o.items || [],
    subtotal: parseFloat(o.subtotal),
    shipping: parseFloat(o.shipping),
    giftExtra: parseFloat(o.gift_extra),
    total: parseFloat(o.total),
    status: o.status,
    trackingStep: o.tracking_step,
    address: o.address,
    deliveryDate: o.delivery_date || '',
    deliverySlot: o.delivery_slot || '',
    isGift: o.is_gift,
    giftMessage: o.gift_message || '',
    payment: o.payment || '',
    notes: o.notes || '',
    createdAt: o.created_at,
    updatedAt: o.updated_at,
  }
}

function mapReview(r) {
  if (!r) return null
  const likedBy = r.liked_by || []
  return {
    id: r.id, productId: r.product_id, orderId: r.order_id,
    userId: r.user_id, userName: r.user_name,
    rating: r.rating, comment: r.comment,
    status: r.status, createdAt: r.created_at, updatedAt: r.updated_at,
    isVerified: r.is_verified_purchase,
    isReported: r.is_reported,
    reportReason: r.report_reason,
    likedBy: likedBy,
    likesCount: likedBy.length
  }
}

// ============================================================================
// ── AUTHENTICATION ROUTES (Login & Register) ────────────────────────────────
// ============================================================================

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  try {
    // 1. Verify credentials with Supabase GoTrue Auth API
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      return res.status(401).json({ success: false, error: authError.message })
    }

    // 2. Fetch extended profile metadata (Role, Name, Ban status, etc.) from the profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (profileError) {
      return res.status(500).json({ success: false, error: 'Profile metadata missing or corrupted.' })
    }

    // 🔥 NEW: Check if account is banned
    if (profile.is_banned) {
      return res.status(403).json({ 
        success: false, 
        error: `Account suspended. Reason: ${profile.ban_reason || 'Violation of terms.'}` 
      })
    }

    // 3. Return unified user session object to the Vue frontend Pinia store
    res.json({
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name: profile.name,
        role: profile.role
      }
    })
  } catch (err) {
    console.error('[LOGIN_CRASH]', err)
    res.status(500).json({ success: false, error: 'Internal Auth Gateway Error' })
  }
})

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body
  try {
    // Register the user. (A Supabase database trigger will auto-create the public.profile)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name: name }
      }
    })

    if (authError) {
      return res.status(400).json({ success: false, error: authError.message })
    }

    res.json({
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name: name,
        role: 'customer' // Default fallback before trigger verification
      }
    })
  } catch (err) {
    console.error('[REGISTER_CRASH]', err)
    res.status(500).json({ success: false, error: 'Internal Registration Error' })
  }
})

// ============================================================================
// ── USER MANAGEMENT & ANALYTICS (🔥 NEW RBAC ENGINE) ────────────────────────
// ============================================================================

// Get all users with spending analytics (VIP ranking)
app.get('/api/users', async (req, res) => {
  try {
    // Fetch all profiles
    const { data: profiles, error: profErr } = await supabase.from('profiles').select('*')
    if (profErr) throw profErr

    // Fetch all non-cancelled orders for spending calculation
    const { data: orders, error: ordErr } = await supabase
      .from('orders')
      .select('user_id, total')
      .neq('status', 'cancelled')
    if (ordErr) throw ordErr

    // Calculate analytics for each user
    const usersAnalytics = profiles.map(profile => {
      const userOrders = orders.filter(o => o.user_id === profile.id)
      const totalSpend = userOrders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0)
      const orderCount = userOrders.length
      const avgOrderValue = orderCount > 0 ? (totalSpend / orderCount) : 0

      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        role: profile.role || 'customer',
        isBanned: profile.is_banned,
        banReason: profile.ban_reason,
        createdAt: profile.created_at,
        analytics: {
          totalSpend: totalSpend,
          orderCount: orderCount,
          aov: avgOrderValue
        }
      }
    })

    // Sort by total spend descending (Top spenders first)
    usersAnalytics.sort((a, b) => b.analytics.totalSpend - a.analytics.totalSpend)

    res.json({ success: true, data: usersAnalytics, total: usersAnalytics.length })
  } catch (e) {
    console.error('[GET_USERS_ERROR]', e)
    res.status(500).json({ success: false, error: e.message })
  }
})

// Update user role (Admin only)
app.patch('/api/users/:id/role', async (req, res) => {
  const { role } = req.body
  const validRoles = ['customer', 'staff', 'admin']
  
  if (!validRoles.includes(role)) {
    return res.status(400).json({ success: false, error: 'Invalid role. Must be customer, staff, or admin.' })
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', req.params.id)
      .select()
      .single()
    
    if (error) throw error
    res.json({ success: true, data })
  } catch (e) {
    console.error('[UPDATE_ROLE_ERROR]', e)
    res.status(500).json({ success: false, error: e.message })
  }
})

// Ban / Unban user
app.patch('/api/users/:id/ban', async (req, res) => {
  const { isBanned, reason } = req.body
  
  if (typeof isBanned !== 'boolean') {
    return res.status(400).json({ success: false, error: 'isBanned must be a boolean value.' })
  }

  try {
    const updates = {
      is_banned: isBanned,
      ban_reason: isBanned ? (reason || 'No reason provided') : null
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', req.params.id)
      .select()
      .single()
    
    if (error) throw error
    res.json({ success: true, data })
  } catch (e) {
    console.error('[BAN_USER_ERROR]', e)
    res.status(500).json({ success: false, error: e.message })
  }
})

// ============================================================================
// ── PROFILES (User Dashboard & Checkout Auto-fill) ──────────────────────────
// ============================================================================

// Get user profile by ID
app.get('/api/profiles/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.params.id)
      .single()
    
    if (error) {
      return res.status(404).json({ success: false, error: 'Profile not found' })
    }
    
    res.json({ success: true, data })
  } catch (e) {
    console.error('[GET_PROFILE_ERROR]', e)
    res.status(500).json({ success: false, error: e.message })
  }
})

// Update user profile (name, phone, address)
app.patch('/api/profiles/:id', async (req, res) => {
  try {
    const { name, phone, address } = req.body
    const updates = {}
    
    if (name !== undefined) updates.name = name
    if (phone !== undefined) updates.phone = phone
    
    if (address !== undefined) {
      updates.addresses = [address]
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', req.params.id)
      .select()
      .single()
    
    if (error) {
      console.error('[UPDATE_PROFILE_ERROR]', error)
      return res.status(400).json({ success: false, error: error.message })
    }
    
    res.json({ success: true, data })
  } catch (e) {
    console.error('[PATCH_PROFILE_ERROR]', e)
    res.status(500).json({ success: false, error: e.message })
  }
})

// ── Health ────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'FloraLab API v2 (Supabase)' })
})

// ═══════════════════════════════════════════════════════════════════════════
// PRODUCTS
// ═══════════════════════════════════════════════════════════════════════════

app.get('/api/products', async (req, res) => {
  try {
    const { category, search, sort } = req.query
    let q = supabase.from('products').select('*').eq('status', 'active')
    if (category) q = q.ilike('category', category)
    if (search) q = q.ilike('name', `%${search}%`)
    if (sort === 'price-asc') q = q.order('price', { ascending: true })
    else if (sort === 'price-desc') q = q.order('price', { ascending: false })
    else q = q.order('sort_order', { ascending: true })
    const { data, error } = await q
    if (error) throw error
    const products = (data || []).map(mapProduct)
    res.json({ success: true, data: products, total: products.length })
  } catch (e) { res.status(500).json({ success: false, error: e.message }) }
})

app.get('/api/products/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('products').select('*').eq('id', req.params.id).single()
    if (error) return res.status(404).json({ success: false, error: 'Product not found' })
    res.json({ success: true, data: mapProduct(data) })
  } catch (e) { res.status(500).json({ success: false, error: e.message }) }
})

app.post('/api/products', async (req, res) => {
  const { name, category, price } = req.body
  if (!name || !category || price === undefined) {
    return res.status(400).json({ success: false, error: 'Missing: name, category, price' })
  }
  try {
    const { data, error } = await supabase.from('products').insert({
      name, category,
      slug: req.body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      price: parseFloat(price),
      stock: parseInt(req.body.stock ?? 0),
      status: req.body.status || 'active',
      emoji: req.body.emoji || '🌸',
      bg: req.body.bg || 'linear-gradient(135deg,#fde8e8,#f9d4d4)',
      image_url: req.body.imageUrl || '',
      video_url: req.body.videoUrl || '',
      gallery: req.body.gallery || [],
      desc: req.body.desc || '',
      full_desc: req.body.fullDesc || '',
      stems: req.body.stems || [],
      sizes: req.body.sizes || [],
      tags: req.body.tags || [],
      occasions: req.body.occasions || [],
      seasons: req.body.seasons || [],
      colors: req.body.colors || [],
      care: req.body.care || '',
      vase_life: req.body.vaseLife || '',
      scent: req.body.scent || '',
      is_bestseller: req.body.isBestseller || false,
      is_new: req.body.isNew || false,
      seo_title: req.body.seoTitle || '',
      seo_desc: req.body.seoDesc || '',
      sort_order: req.body.sortOrder ?? 0,
    }).select().single()
    if (error) throw error
    res.status(201).json({ success: true, data: mapProduct(data) })
  } catch (e) { res.status(500).json({ success: false, error: e.message }) }
})

app.patch('/api/products/:id', async (req, res) => {
  try {
    const fieldMap = {
      name: 'name', slug: 'slug', category: 'category', price: 'price',
      stock: 'stock', status: 'status', emoji: 'emoji', bg: 'bg',
      imageUrl: 'image_url', videoUrl: 'video_url', gallery: 'gallery',
      desc: 'desc', fullDesc: 'full_desc', stems: 'stems', sizes: 'sizes',
      tags: 'tags', occasions: 'occasions', seasons: 'seasons', colors: 'colors',
      care: 'care', vaseLife: 'vase_life', scent: 'scent',
      isBestseller: 'is_bestseller', isNew: 'is_new',
      seoTitle: 'seo_title', seoDesc: 'seo_desc', sortOrder: 'sort_order',
    }
    const updates = {}
    for (const [camel, snake] of Object.entries(fieldMap)) {
      if (req.body[camel] !== undefined) updates[snake] = req.body[camel]
    }

    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', req.params.id)
      .select()

    if (error) {
      console.error('[SUPABASE PATCH ERROR]', error)
      return res.status(400).json({ success: false, error: error.message })
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        error: `Product with ID ${req.params.id} does not exist in the database.`
      })
    }

    res.json({ success: true, data: mapProduct(data[0]) })
  } catch (e) {
    console.error('[PATCH_ROUTE_CRASH]', e)
    res.status(500).json({ success: false, error: e.message })
  }
})

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('products').delete().eq('id', req.params.id)
    if (error) return res.status(404).json({ success: false, error: 'Product not found' })
    res.json({ success: true, message: 'Product deleted' })
  } catch (e) { res.status(500).json({ success: false, error: e.message }) }
})

// ═══════════════════════════════════════════════════════════════════════════
// FLOWERS
// ═══════════════════════════════════════════════════════════════════════════

app.get('/api/flowers', async (req, res) => {
  try {
    let q = supabase.from('flowers').select('*').order('name', { ascending: true })
    if (req.query.category) q = q.eq('category', req.query.category)
    const { data, error } = await q
    if (error) throw error
    res.json({ success: true, data: (data || []).map(mapFlower), total: data.length })
  } catch (e) { res.status(500).json({ success: false, error: e.message }) }
})

app.post('/api/flowers', async (req, res) => {
  const { name, category, price, stock } = req.body
  if (!name || !category || price === undefined || stock === undefined) {
    return res.status(400).json({ success: false, error: 'Missing: name, category, price, stock' })
  }
  try {
    const { data, error } = await supabase.from('flowers').insert({
      name: name.trim(), category,
      emoji: req.body.emoji || '🌸',
      origin: req.body.origin || 'Unknown',
      price: parseFloat(price),
      stock: parseInt(stock),
      vase_life: req.body.vaseLife || '7–14 days',
      scent: req.body.scent || '',
      seasons: req.body.seasons || [],
      bg: req.body.bg || 'linear-gradient(135deg,#fde8e8,#f9d4d4)',
      image_url: req.body.imageUrl || '',
      notes: req.body.notes || '',
    }).select().single()
    if (error) throw error
    res.status(201).json({ success: true, data: mapFlower(data) })
  } catch (e) { res.status(500).json({ success: false, error: e.message }) }
})

app.patch('/api/flowers/:id', async (req, res) => {
  try {
    const fieldMap = {
      name: 'name', emoji: 'emoji', category: 'category', origin: 'origin',
      price: 'price', stock: 'stock', vaseLife: 'vase_life', scent: 'scent',
      seasons: 'seasons', bg: 'bg', notes: 'notes', imageUrl: 'image_url',
    }
    const updates = {}
    for (const [c, s] of Object.entries(fieldMap)) {
      if (req.body[c] !== undefined) updates[s] = req.body[c]
    }
    const { data, error } = await supabase.from('flowers').update(updates).eq('id', req.params.id).select().single()
    if (error) return res.status(404).json({ success: false, error: 'Flower not found' })
    res.json({ success: true, data: mapFlower(data) })
  } catch (e) { res.status(500).json({ success: false, error: e.message }) }
})

app.delete('/api/flowers/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('flowers').delete().eq('id', req.params.id)
    if (error) return res.status(404).json({ success: false, error: 'Flower not found' })
    res.json({ success: true, message: 'Flower deleted' })
  } catch (e) { res.status(500).json({ success: false, error: e.message }) }
})

// ═══════════════════════════════════════════════════════════════════════════
// ORDERS
// ═══════════════════════════════════════════════════════════════════════════

app.get('/api/orders', async (req, res) => {
  try {
    let q = supabase.from('orders').select('*').order('created_at', { ascending: false })
    if (req.query.userId) q = q.eq('user_id', req.query.userId)
    if (req.query.status) q = q.eq('status', req.query.status)
    const { data, error } = await q
    if (error) throw error
    res.json({ success: true, data: (data || []).map(mapOrder), total: data.length })
  } catch (e) { res.status(500).json({ success: false, error: e.message }) }
})

app.get('/api/orders/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('orders').select('*').eq('id', req.params.id).single()
    if (error) return res.status(404).json({ success: false, error: 'Order not found' })
    res.json({ success: true, data: mapOrder(data) })
  } catch (e) { res.status(500).json({ success: false, error: e.message }) }
})

app.post('/api/orders', async (req, res) => {
  const { customerName, email, items, address } = req.body
  if (!customerName || !email || !items?.length || !address) {
    return res.status(400).json({ success: false, error: 'Missing required fields' })
  }
  try {
    const subtotal = items.reduce((s, i) => s + (i.price * (i.qty || 1)), 0)
    const shipping = 8.50
    const giftExtra = req.body.isGift ? 5.00 : 0
    const total = parseFloat((subtotal + shipping + giftExtra).toFixed(2))

    const { data: order, error } = await supabase.from('orders').insert({
      user_id: req.body.userId || null,
      customer_name: customerName,
      email,
      phone: req.body.phone || '',
      items,
      subtotal: parseFloat(subtotal.toFixed(2)),
      shipping, gift_extra: giftExtra, total,
      status: 'processing', tracking_step: 0,
      address,
      delivery_date: req.body.deliveryDate || null,
      delivery_slot: req.body.deliverySlot || '',
      is_gift: req.body.isGift || false,
      gift_message: req.body.giftMessage || '',
      payment: req.body.payment || 'cod',
      notes: req.body.notes || '',
    }).select().single()

    if (error) throw error

    for (const item of items) {
      const pid = parseInt(item.productId)
      if (!isNaN(pid)) {
        const { data: p } = await supabase.from('products').select('stock').eq('id', pid).single()
        if (p) await supabase.from('products').update({ stock: Math.max(0, p.stock - (item.qty || 1)) }).eq('id', pid)
      }
    }

    res.status(201).json({ success: true, data: mapOrder(order) })
  } catch (e) { res.status(500).json({ success: false, error: e.message }) }
})

app.patch('/api/orders/:id/status', async (req, res) => {
  const valid = ['processing', 'prepared', 'dispatched', 'delivered', 'cancelled']
  const { status } = req.body
  if (!valid.includes(status)) {
    return res.status(400).json({ success: false, error: `Status must be one of: ${valid.join(', ')}` })
  }
  try {
    const { data: existing, error: fe } = await supabase.from('orders').select('status, items').eq('id', req.params.id).single()
    if (fe) return res.status(404).json({ success: false, error: 'Order not found' })

    const stepMap = { processing: 0, prepared: 1, dispatched: 2, delivered: 3, cancelled: -1 }
    const { data, error } = await supabase.from('orders')
      .update({ status, tracking_step: stepMap[status] })
      .eq('id', req.params.id).select().single()
    if (error) throw error

    if (status === 'cancelled' && existing.status !== 'cancelled') {
      for (const item of (existing.items || [])) {
        const pid = parseInt(item.productId)
        if (!isNaN(pid)) {
          const { data: p } = await supabase.from('products').select('stock').eq('id', pid).single()
          if (p) await supabase.from('products').update({ stock: p.stock + (item.qty || 1) }).eq('id', pid)
        }
      }
    }

    res.json({ success: true, data: mapOrder(data) })
  } catch (e) { res.status(500).json({ success: false, error: e.message }) }
})

// ═══════════════════════════════════════════════════════════════════════════
// REVIEWS (🔥 UPGRADED: Smart Verification + Auto-Approval + Likes)
// ═══════════════════════════════════════════════════════════════════════════

// GET reviews - supports filtering by product, user, reported status
app.get('/api/reviews', async (req, res) => {
  try {
    const { productId, userId, reported } = req.query
    let q = supabase.from('reviews').select('*').order('created_at', { ascending: false })

    if (productId) q = q.eq('product_id', productId)
    if (userId) q = q.eq('user_id', userId)

    if (reported === 'true') {
      q = q.eq('is_reported', true)
    } else if (!userId) {
      q = q.eq('status', 'approved')
    }

    const { data, error } = await q
    if (error) throw error

    const reviews = (data || []).map(mapReview)
    const ratedReviews = reviews.filter(r => r.rating && r.rating > 0 && r.isVerified)
    const avgRating = ratedReviews.length
      ? parseFloat((ratedReviews.reduce((s, r) => s + r.rating, 0) / ratedReviews.length).toFixed(1))
      : null

    res.json({ success: true, data: reviews, total: reviews.length, avgRating })
  } catch (e) {
    console.error('[GET_REVIEWS_ERROR]', e)
    res.status(500).json({ success: false, error: e.message })
  }
})

// POST review - Smart verification: auto-check if user purchased this product
app.post('/api/reviews', async (req, res) => {
  const { productId, userId, userName, rating, comment } = req.body

  if (!productId || !userId || !comment?.trim()) {
    return res.status(400).json({ success: false, error: 'Product ID, User ID and Comment are required.' })
  }

  try {
    const { data: deliveredOrders } = await supabase
      .from('orders')
      .select('items')
      .eq('user_id', userId)
      .eq('status', 'delivered')

    let isVerified = false
    if (deliveredOrders && deliveredOrders.length > 0) {
      for (const order of deliveredOrders) {
        if (order.items && order.items.some(item => Number(item.productId) === Number(productId))) {
          isVerified = true
          break
        }
      }
    }

    if (!isVerified && rating && rating > 0) {
      return res.status(403).json({
        success: false,
        error: 'Only verified buyers can leave a star rating. You can still leave a comment.'
      })
    }

    const { data, error } = await supabase.from('reviews').insert({
      product_id: parseInt(productId),
      user_id: userId,
      user_name: userName || 'Anonymous',
      rating: isVerified && rating ? parseInt(rating) : null,
      comment: comment.trim(),
      status: 'approved',
      is_verified_purchase: isVerified,
      is_reported: false,
      report_reason: null,
      liked_by: []
    }).select().single()

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ success: false, error: 'You have already reviewed this item.' })
      }
      throw error
    }

    res.status(201).json({ success: true, data: mapReview(data) })
  } catch (e) {
    console.error('[POST_REVIEW_ERROR]', e)
    res.status(500).json({ success: false, error: e.message })
  }
})

// 🔥 Toggle Real Likes (Like/Unlike)
app.post('/api/reviews/:id/like', async (req, res) => {
  const { userId } = req.body
  if (!userId) {
    return res.status(400).json({ success: false, error: 'User ID is required to like a review.' })
  }

  try {
    const { data: review, error: fetchErr } = await supabase
      .from('reviews')
      .select('liked_by')
      .eq('id', req.params.id)
      .single()

    if (fetchErr) throw fetchErr

    let likedBy = review.liked_by || []
    const hasLiked = likedBy.includes(userId)

    if (hasLiked) {
      likedBy = likedBy.filter(id => id !== userId)
    } else {
      likedBy.push(userId)
    }

    const { data, error } = await supabase
      .from('reviews')
      .update({ liked_by: likedBy })
      .eq('id', req.params.id)
      .select()
      .single()

    if (error) throw error

    res.json({ success: true, data: mapReview(data) })
  } catch (e) {
    console.error('[LIKE_TOGGLE_ERROR]', e)
    res.status(500).json({ success: false, error: e.message })
  }
})

// PATCH review - Update review (user can edit own, admin can moderate)
app.patch('/api/reviews/:id', async (req, res) => {
  try {
    const updates = {}

    if (req.body.rating !== undefined) updates.rating = req.body.rating
    if (req.body.comment !== undefined) updates.comment = req.body.comment
    if (req.body.status !== undefined) updates.status = req.body.status
    if (req.body.dismissReport === true) {
      updates.is_reported = false
      updates.report_reason = null
    }

    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', req.params.id)
      .select()
      .single()

    if (error) return res.status(404).json({ success: false, error: 'Review not found' })
    res.json({ success: true, data: mapReview(data) })
  } catch (e) {
    console.error('[PATCH_REVIEW_ERROR]', e)
    res.status(500).json({ success: false, error: e.message })
  }
})

// Report inappropriate review
app.post('/api/reviews/:id/report', async (req, res) => {
  const { reason } = req.body
  if (!reason) {
    return res.status(400).json({ success: false, error: 'Report reason is required.' })
  }

  try {
    const { data, error } = await supabase
      .from('reviews')
      .update({ is_reported: true, report_reason: reason })
      .eq('id', req.params.id)
      .select()
      .single()

    if (error) return res.status(404).json({ success: false, error: 'Review not found' })
    res.json({ success: true, message: 'Review reported to admin for review.' })
  } catch (e) {
    console.error('[REPORT_REVIEW_ERROR]', e)
    res.status(500).json({ success: false, error: e.message })
  }
})

// DELETE review
app.delete('/api/reviews/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('reviews').delete().eq('id', req.params.id)
    if (error) return res.status(404).json({ success: false, error: 'Review not found' })
    res.json({ success: true, message: 'Review deleted' })
  } catch (e) {
    console.error('[DELETE_REVIEW_ERROR]', e)
    res.status(500).json({ success: false, error: e.message })
  }
})

// ── 404 ───────────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ success: false, error: 'Route not found' }))

// ── Error handler ─────────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err.message)
  res.status(500).json({ success: false, error: 'Internal server error' })
})

// ── Start ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════╗
  ║   🌸  FloraLab API — Running!        ║
  ║   Port    : ${PORT}                     ║
  ║   Database: Supabase PostgreSQL      ║
  ║   Auth    : Supabase GoTrue          ║
  ║   Storage : Supabase Bucket          ║
  ║   Reviews : Post-Moderation + Likes  ║
  ║   Users   : RBAC + Analytics         ║
  ╚══════════════════════════════════════╝
  `)
})