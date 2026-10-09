import { Resend } from 'resend'
import type { IncomingMessage, ServerResponse } from 'node:http'

interface ContactPayload {
  readonly name: string
  readonly email: string
  readonly message: string
  readonly website?: string
}

interface ContactRequest extends IncomingMessage {
  readonly body?: unknown
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const sendJson = (response: ServerResponse, status: number, body: object): void => {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(body))
}

const parsePayload = (body: unknown): ContactPayload | null => {
  if (typeof body !== 'object' || body === null) return null
  const data = body as Record<string, unknown>
  const name = typeof data.name === 'string' ? data.name.trim() : ''
  const email = typeof data.email === 'string' ? data.email.trim() : ''
  const message = typeof data.message === 'string' ? data.message.trim() : ''
  const website = typeof data.website === 'string' ? data.website.trim() : undefined

  if (!name || !EMAIL_REGEX.test(email) || !message || name.length > 120 || message.length > 5000) {
    return null
  }

  return { name, email, message, website }
}

export default async function handler(request: ContactRequest, response: ServerResponse): Promise<void> {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    sendJson(response, 405, { error: 'Method not allowed' })
    return
  }

  const payload = parsePayload(request.body)
  if (payload === null) {
    sendJson(response, 400, { error: 'Invalid form data' })
    return
  }

  if (payload.website) {
    sendJson(response, 200, { success: true })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL

  if (!apiKey || !from || !to) {
    sendJson(response, 500, { error: 'Email service is not configured' })
    return
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: payload.email,
    subject: 'Nouveau message depuis le portfolio',
    text: `Nom : ${payload.name}\nEmail : ${payload.email}\n\n${payload.message}`,
  })

  if (error) {
    sendJson(response, 502, { error: 'Email delivery failed' })
    return
  }

  sendJson(response, 200, { success: true })
}
