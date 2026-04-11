/**
 * WhatsApp Integration Utilities
 *
 * This module provides utilities for WhatsApp integration.
 * Currently supports: Direct WhatsApp links
 *
 * Future: WhatsApp Business API integration
 */

export interface WhatsAppMessage {
  phone: string
  message: string
}

/**
 * Generate WhatsApp Web link (opens in browser)
 * Format: https://wa.me/[country-code][phone-number]
 */
export function generateWhatsAppLink(phone: string, message?: string): string {
  // Remove any non-digit characters except +
  const cleanPhone = phone.replace(/[^\d+]/g, '')

  // Ensure it starts with +
  const formattedPhone = cleanPhone.startsWith('+') ? cleanPhone.slice(1) : cleanPhone

  let url = `https://wa.me/${formattedPhone}`

  if (message) {
    // URL encode the message
    const encodedMessage = encodeURIComponent(message)
    url += `?text=${encodedMessage}`
  }

  return url
}

/**
 * Generate WhatsApp share link
 */
export function generateWhatsAppShareLink(
  message: string,
  options?: { title?: string; url?: string }
): string {
  const text = encodeURIComponent(message)
  return `https://wa.me/?text=${text}`
}

/**
 * Format phone number to WhatsApp format
 * Example: +62812345678 or 62812345678
 */
export function formatPhoneForWhatsApp(phone: string): string {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '')

  // If starts with 0 (Indonesian format), replace with country code 62
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1)
  }

  // Ensure it starts with country code
  if (!cleaned.startsWith('+')) {
    cleaned = '+' + cleaned
  }

  return cleaned
}

/**
 * Create pre-filled WhatsApp message
 * Use this to create messages for contact/inquiry
 */
export function createContactMessage(name: string, email: string): string {
  return `Halo Asdev, saya ${name} (${email}). Saya ingin mengetahui lebih lanjut tentang layanan Anda.`
}

/**
 * Create WhatsApp Business API message body
 * (For future Business API integration)
 */
export function createBusinessAPIMessage(
  phoneNumber: string,
  templateName: string,
  parameters?: Record<string, string>
) {
  return {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: phoneNumber,
    type: 'template',
    template: {
      name: templateName,
      language: {
        code: 'id_ID',
      },
      ...(parameters && {
        parameters: {
          body: {
            parameters: Object.values(parameters),
          },
        },
      }),
    },
  }
}

/**
 * Configuration constants
 */
export const WHATSAPP_CONFIG = {
  // Asdev company number (update this!)
  companySupportPhone: '+62812345678',

  // Available departments
  departments: {
    sales: '+62812345678',
    support: '+62812345679',
    technical: '+62812345680',
  },

  // Message templates
  templates: {
    inquiry: 'Halo, saya ingin mengetahui lebih lanjut tentang layanan Anda.',
    support: 'Saya butuh bantuan dengan...',
    proposal: 'Saya ingin meminta penawaran untuk project...',
  },
}

/**
 * Get WhatsApp contact button props
 */
export function getWhatsAppButtonProps(
  department: keyof typeof WHATSAPP_CONFIG.departments = 'sales'
) {
  const phone = WHATSAPP_CONFIG.departments[department]
  return {
    href: generateWhatsAppLink(phone),
    target: '_blank',
    rel: 'noopener noreferrer',
    title: `Chat via WhatsApp - ${department.charAt(0).toUpperCase() + department.slice(1)}`,
  }
}
