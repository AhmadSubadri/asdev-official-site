import nodemailer from 'nodemailer'

// Configure transporter based on environment
const getTransporter = async () => {
  // For Gmail with app-specific password
  if (process.env.SMTP_USER?.includes('gmail')) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  // Generic SMTP
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
  replyTo?: string
}

/**
 * Send email via SMTP
 */
export async function sendEmail(options: EmailOptions) {
  try {
    // Skip if no SMTP configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.warn('Email not configured. Skipping email send.')
      return { success: false, message: 'Email not configured' }
    }

    const transporter = await getTransporter()

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Email sent:', result.messageId)

    return {
      success: true,
      messageId: result.messageId,
    }
  } catch (error) {
    console.error('Email send error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email',
    }
  }
}

/**
 * Send contact form notification to admin
 */
export async function sendContactNotification(contactData: {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_FROM

  if (!adminEmail) {
    console.warn('Admin email not configured')
    return { success: false }
  }

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${contactData.name}</p>
    <p><strong>Email:</strong> ${contactData.email}</p>
    ${contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : ''}
    ${contactData.subject ? `<p><strong>Subject:</strong> ${contactData.subject}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${contactData.message.replace(/\n/g, '<br>')}</p>
    <hr>
    <p>Reply to: ${contactData.email}</p>
  `

  return sendEmail({
    to: adminEmail,
    subject: `New Contact: ${contactData.subject || contactData.name}`,
    html,
    text: `New contact from ${contactData.name} (${contactData.email}): ${contactData.message}`,
    replyTo: contactData.email,
  })
}

/**
 * Send auto-reply to visitor
 */
export async function sendContactReply(email: string, name: string) {
  const html = `
    <h2>Thank you for contacting Asdev Digital Solution!</h2>
    <p>Hi ${name},</p>
    <p>We received your message and will get back to you as soon as possible.</p>
    <p>In the meantime, feel free to reach out to us via:</p>
    <ul>
      <li>WhatsApp: +62 (812) 3456-7890</li>
      <li>Email: info@asdev.id</li>
      <li>Phone: +62 (812) 3456-7890</li>
    </ul>
    <p>Best regards,<br>Asdev Digital Solution Team</p>
  `

  return sendEmail({
    to: email,
    subject: 'We received your message - Asdev Digital Solution',
    html,
    text: 'Thank you for contacting Asdev Digital Solution. We will get back to you soon.',
  })
}
