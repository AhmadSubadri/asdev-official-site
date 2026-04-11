// Type definitions for the application

export interface Service {
  id: string
  title: string
  description: string
  icon?: string
  detail?: string
  image?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface Portfolio {
  id: string
  title: string
  description: string
  image: string
  category: string
  link?: string
  technologies?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface BlogArticle {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  image?: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  read: boolean
  replied: boolean
  createdAt: Date
}

export interface User {
  id: string
  email: string
  name?: string
  createdAt: Date
  updatedAt: Date
}

export type ContactFormData = Omit<ContactMessage, 'id' | 'read' | 'replied' | 'createdAt'>
