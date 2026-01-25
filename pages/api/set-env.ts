import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Development-only endpoint to set server env vars at runtime.
 * This does NOT persist to disk and will reset on server restart.
 * Intended to unblock local dev when .env files are not being picked up.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ error: 'set-env is only available in development' })
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    const allowedKeys = new Set([
      'TWILIO_ACCOUNT_SID',
      'TWILIO_AUTH_TOKEN',
      'TWILIO_FROM',
      'TWILIO_TO',
    ])
    const body = typeof req.body === 'object' ? req.body : {}
    const set: Record<string, boolean> = {}

    Object.entries(body as Record<string, string>).forEach(([k, v]) => {
      if (!allowedKeys.has(k)) return
      if (typeof v !== 'string' || !v.trim()) return
      process.env[k] = v.trim()
      set[k] = true
    })

    return res.status(200).json({ ok: true, set })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return res.status(500).json({ error: msg })
  }
}
