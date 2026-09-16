const ORIGIN_HOST = 'imageexcerpt.lovable.app'
const PUBLIC_HOST = 'bk.meyracle.com'

const ALLOWED_METHODS = new Set(['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'])

const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
])

const STRIP_INCOMING = new Set([
  'x-forwarded-host',
  'x-forwarded-proto',
  'x-forwarded-for',
  'x-forwarded-port',
  'x-real-ip',
  'forwarded',
  'x-bk-proxy',
])

const REWRITE_TYPES = /(?:text\/html|text\/css|text\/javascript|application\/javascript|application\/json|application\/xml|text\/xml|application\/manifest\+json)/i

function allowedHost(hostname) {
  const host = hostname.toLowerCase()
  return host === PUBLIC_HOST || host.endsWith('.workers.dev')
}

function copyHeaders(headers, { stripIncoming = false } = {}) {
  const out = new Headers()
  for (const [key, value] of headers) {
    const lower = key.toLowerCase()
    if (HOP_BY_HOP.has(lower)) continue
    if (stripIncoming && STRIP_INCOMING.has(lower)) continue
    out.append(key, value)
  }
  return out
}

function rewriteHost(value) {
  return value
    .replaceAll(`https://${ORIGIN_HOST}`, `https://${PUBLIC_HOST}`)
    .replaceAll(`http://${ORIGIN_HOST}`, `https://${PUBLIC_HOST}`)
}

function hardenCookie(cookie) {
  let next = cookie.replace(/;\s*Domain=\.?lovable\.app/i, `; Domain=${PUBLIC_HOST}`)
  if (!/;\s*secure/i.test(next)) next += '; Secure'
  if (!/;\s*samesite=/i.test(next)) next += '; SameSite=Lax'
  return next
}

function rewriteCookies(headers) {
  const cookies = headers.getSetCookie?.() ?? []
  if (!cookies.length) return
  headers.delete('Set-Cookie')
  for (const cookie of cookies) {
    headers.append('Set-Cookie', hardenCookie(cookie))
  }
}

export default {
  async fetch(request) {
    const incoming = new URL(request.url)
    if (!allowedHost(incoming.hostname)) {
      return new Response('Forbidden', { status: 403 })
    }
    if (!ALLOWED_METHODS.has(request.method)) {
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: [...ALLOWED_METHODS].join(', ') },
      })
    }

    const originUrl = new URL(request.url)
    originUrl.protocol = 'https:'
    originUrl.hostname = ORIGIN_HOST
    originUrl.port = ''

    const headers = copyHeaders(request.headers, { stripIncoming: true })
    headers.set('X-Forwarded-Host', incoming.host)
    headers.set('X-Forwarded-Proto', 'https')
    headers.set('X-BK-Proxy', '1')

    const init = {
      method: request.method,
      headers,
      redirect: 'manual',
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      init.body = request.body
    }

    const response = await fetch(originUrl, init)
    const outHeaders = copyHeaders(response.headers)
    const location = outHeaders.get('Location')
    if (location) outHeaders.set('Location', rewriteHost(location))
    rewriteCookies(outHeaders)
    if (!outHeaders.has('X-Content-Type-Options')) {
      outHeaders.set('X-Content-Type-Options', 'nosniff')
    }

    const contentType = outHeaders.get('content-type') || ''
    if (REWRITE_TYPES.test(contentType)) {
      const body = rewriteHost(await response.text())
      outHeaders.delete('content-encoding')
      outHeaders.delete('content-length')
      return new Response(body, {
        status: response.status,
        statusText: response.statusText,
        headers: outHeaders,
      })
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: outHeaders,
    })
  },
}
