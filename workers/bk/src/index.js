const ORIGIN_HOST = 'imageexcerpt.lovable.app'
const PUBLIC_HOST = 'bk.meyracle.com'

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

const REWRITE_TYPES = /(?:text\/html|text\/css|text\/javascript|application\/javascript|application\/json|application\/xml|text\/xml|application\/manifest\+json)/i

function copyHeaders(headers) {
  const out = new Headers()
  for (const [key, value] of headers) {
    if (HOP_BY_HOP.has(key.toLowerCase())) continue
    out.append(key, value)
  }
  return out
}

function rewriteHost(value) {
  return value
    .replaceAll(`https://${ORIGIN_HOST}`, `https://${PUBLIC_HOST}`)
    .replaceAll(`http://${ORIGIN_HOST}`, `https://${PUBLIC_HOST}`)
}

function rewriteCookies(headers) {
  const cookies = headers.getSetCookie?.() ?? []
  if (!cookies.length) return
  headers.delete('Set-Cookie')
  for (const cookie of cookies) {
    headers.append(
      'Set-Cookie',
      cookie.replace(/;\s*Domain=\.?lovable\.app/i, `; Domain=${PUBLIC_HOST}`),
    )
  }
}

export default {
  async fetch(request) {
    const incoming = new URL(request.url)
    const originUrl = new URL(request.url)
    originUrl.protocol = 'https:'
    originUrl.hostname = ORIGIN_HOST
    originUrl.port = ''

    const headers = copyHeaders(request.headers)
    headers.set('X-Forwarded-Host', incoming.host)
    headers.set('X-Forwarded-Proto', 'https')

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
