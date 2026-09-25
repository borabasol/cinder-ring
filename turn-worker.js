// Cloudflare Worker: hands short-lived TURN credentials to the Cinder Ring page.
// Secrets live in the Worker settings, never in the game:
//   TURN_KEY_ID         (Text)   - the TURN key's "Turn Token ID"
//   TURN_KEY_API_TOKEN  (Secret) - the TURN key's "API Token"
const ALLOWED = ['https://borabasol.github.io'];

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = { 'Access-Control-Allow-Origin': ALLOWED.includes(origin) ? origin : ALLOWED[0], 'Vary': 'Origin' };
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: { ...cors, 'Access-Control-Allow-Methods': 'GET', 'Access-Control-Max-Age': '86400' } });
    }
    if (!ALLOWED.includes(origin)) return new Response('forbidden', { status: 403, headers: cors });

    const base = `https://rtc.live.cloudflare.com/v1/turn/keys/${env.TURN_KEY_ID}/credentials`;
    const init = {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.TURN_KEY_API_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ttl: 86400 }),
    };
    let res = await fetch(`${base}/generate-ice-servers`, init);
    if (!res.ok) res = await fetch(`${base}/generate`, init);
    if (!res.ok) return new Response(`turn error ${res.status}`, { status: 502, headers: cors });

    const data = await res.json();
    const ice = Array.isArray(data.iceServers) ? data.iceServers : [data.iceServers];
    return new Response(JSON.stringify(ice), { headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  },
};
