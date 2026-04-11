/**
 * Rate Limiting & Security utilities
 */

// In-memory store for rate limiting (consider Redis for production)
const requestCounts = new Map<string, { count: number; resetTime: number }>()

/**
 * Rate limiter middleware
 * Limits requests per IP per time window
 */
export function rateLimit(
  key: string,
  limit: number = 5,
  windowMs: number = 60000 // 1 minute default
) {
  const now = Date.now()
  const record = requestCounts.get(key)

  // If no record or window expired, create new
  if (!record || now > record.resetTime) {
    requestCounts.set(key, {
      count: 1,
      resetTime: now + windowMs,
    })
    return { allowed: true, remaining: limit - 1 }
  }

  // Increment count
  record.count++

  if (record.count > limit) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000)
    return {
      allowed: false,
      remaining: 0,
      retryAfter,
      resetTime: record.resetTime,
    }
  }

  return {
    allowed: true,
    remaining: limit - record.count,
    resetTime: record.resetTime,
  }
}

/**
 * Get client IP from request
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  return request.headers.get('x-real-ip') || 'unknown'
}

/**
 * Validate and sanitize email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length < 255
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}

/**
 * Validate phone number
 */
export function validatePhone(phone: string): boolean {
  // Basic validation: should contain only digits and +
  const cleaned = phone.replace(/[^\d+]/g, '')
  return cleaned.length >= 10 && cleaned.length <= 15
}

/**
 * Create secure random token
 */
export function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

/**
 * Check if request is from trusted origin
 */
export function isTrustedOrigin(origin: string | null): boolean {
  if (!origin) return false

  const trustedOrigins = [
    process.env.NEXT_PUBLIC_APP_URL,
    'http://localhost:3000',
    'https://localhost:3000',
  ]

  return trustedOrigins.some(
    (trusted) => trusted && origin.includes(new URL(trusted).hostname)
  )
}

/**
 * Security headers configuration
 */
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
}

/**
 * CORS headers for API
 */
export function getCORSHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  }
}
