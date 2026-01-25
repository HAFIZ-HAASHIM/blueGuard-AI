import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const ensureEnvLoaded = () => {
    try {
      const envPath = path.join(process.cwd(), '.env.local')
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8')
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
      }
    } catch {}
  }

  // Try to load if missing
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    ensureEnvLoaded()
  }

  const env = {
    TWILIO_ACCOUNT_SID: Boolean((process.env.TWILIO_ACCOUNT_SID || '').trim()),
    TWILIO_AUTH_TOKEN: Boolean((process.env.TWILIO_AUTH_TOKEN || '').trim()),
    TWILIO_FROM: Boolean((process.env.TWILIO_FROM || '').trim()),
    TWILIO_TO: Boolean((process.env.TWILIO_TO || '').trim()),
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: Boolean((process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '').trim()),
  }
  res.status(200).json({ ok: true, env, cwd: process.cwd() })
}
