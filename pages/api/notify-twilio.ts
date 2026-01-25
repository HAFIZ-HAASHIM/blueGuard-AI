// File: pages/api/notify-twilio.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

/**
 * Sends a WhatsApp (preferred) or SMS message using Twilio if configured.
 * Environment variables required:
 * - TWILIO_ACCOUNT_SID
 * - TWILIO_AUTH_TOKEN
 * - TWILIO_FROM  (e.g., 'whatsapp:+14155238886' or '+14155551234')
 * - TWILIO_TO    (e.g., 'whatsapp:+15551234567' or '+15551234567')
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { message } = req.body || {}
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Missing message string' })
  }

  // Fallback loader for .env.local if Next hasn't populated process.env
  const ensureEnvLoaded = () => {
    try {
      const candidates = ['.env.local', '.env.development.local', '.env', '.env.development']
      for (const fname of candidates) {
        const p = path.join(process.cwd(), fname)
        if (!fs.existsSync(p)) continue
        const content = fs.readFileSync(p, 'utf8')
        content.split(/\r?\n/).forEach((line) => {
          const trimmed = line.trim()
          if (!trimmed || trimmed.startsWith('#')) return
          const eq = trimmed.indexOf('=')
          if (eq === -1) return
          const key = trimmed.slice(0, eq).trim()
          const value = trimmed.slice(eq + 1).trim()
          if (key && !(key in process.env)) {
            process.env[key] = value
          }
        })
        console.log('notify-twilio loaded env file:', fname)
        break
      }
    } catch {}
  }

  let sid = (process.env.TWILIO_ACCOUNT_SID || '').trim()
  let token = (process.env.TWILIO_AUTH_TOKEN || '').trim()
  let from = (process.env.TWILIO_FROM || '').trim()
  let to = (process.env.TWILIO_TO || '').trim()

  if (!sid || !token || !from || !to) {
    ensureEnvLoaded()
    sid = (process.env.TWILIO_ACCOUNT_SID || '').trim()
    token = (process.env.TWILIO_AUTH_TOKEN || '').trim()
    from = (process.env.TWILIO_FROM || '').trim()
    to = (process.env.TWILIO_TO || '').trim()
  }

  // Debug presence log (does not print secrets)
  console.log('notify-twilio env presence:', {
    TWILIO_ACCOUNT_SID: Boolean(sid),
    TWILIO_AUTH_TOKEN: Boolean(token),
    TWILIO_FROM: Boolean(from),
    TWILIO_TO: Boolean(to),
    cwd: process.cwd(),
    nodeEnv: process.env.NODE_ENV,
  })

  if (!sid || !token || !from || !to) {
    return res.status(501).json({
      error: 'Twilio not configured',
      missing: {
        TWILIO_ACCOUNT_SID: !!sid,
        TWILIO_AUTH_TOKEN: !!token,
        TWILIO_FROM: !!from,
        TWILIO_TO: !!to,
      },
    })
  }

  try {
    const auth = Buffer.from(`${sid}:${token}`).toString('base64')
    const body = new URLSearchParams({
      To: to,
      From: from,
      Body: message,
    })

    const resp = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    })

    const data = await resp.json()
    if (!resp.ok) {
      return res.status(502).json({ error: 'Twilio API error', details: data })
    }

    return res.status(200).json({ ok: true, data })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('notify-twilio error:', msg)
    return res.status(500).json({ error: 'Failed to send Twilio message', details: msg })
  }
}
