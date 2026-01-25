// File: pages/api/notify-whatsapp.ts
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Sends a WhatsApp message using the Meta WhatsApp Cloud API if configured.
 * Required env vars when using Cloud API:
 * - WHATSAPP_TOKEN: Permanent access token
 * - WHATSAPP_PHONE_ID: Phone number ID (from WhatsApp Business)
 * - WHATSAPP_TO: Destination phone in international format, e.g. 15551234567
 *
 * If env is not configured, responds 501 so the client can fallback to wa.me link.
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

  const token = process.env.WHATSAPP_TOKEN
  const phoneId = process.env.WHATSAPP_PHONE_ID
  const to = process.env.WHATSAPP_TO

  if (!token || !phoneId || !to) {
    return res.status(501).json({
      error: 'WhatsApp Cloud API not configured',
      missing: {
        WHATSAPP_TOKEN: !!token,
        WHATSAPP_PHONE_ID: !!phoneId,
        WHATSAPP_TO: !!to,
      },
    })
  }

  try {
    const url = `https://graph.facebook.com/v17.0/${phoneId}/messages`
    const payload = {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: message },
    }

    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!resp.ok) {
      const details = await resp.json().catch(() => ({}))
      return res.status(502).json({ error: 'WhatsApp API error', details })
    }

    const data = await resp.json()
    return res.status(200).json({ ok: true, data })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('notify-whatsapp error:', msg)
    return res.status(500).json({ error: 'Failed to send WhatsApp message', details: msg })
  }
}
