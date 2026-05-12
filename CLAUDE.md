# ericvdub-astro CLAUDE.md

## Project overview
Astro 5 + Tailwind + Cloudflare adapter site for ericvdub.com. Output mode: `server` (hybrid). Dev runs on a port assigned by ClaudeCommand (`$PORT`, currently 5007).

## Dev server
Start command: `npm run dev -- --port $PORT`

**Do NOT start a new cloudflared quick tunnel.** The CC preview is served through a named tunnel defined in `~/.cloudflared/config.yml` (managed by ClaudeCommand/systemd). Starting a quick tunnel creates orphaned processes and the URL is inaccessible anyway.

To restart the dev server (pre-authorized per global CLAUDE.md):
```bash
pkill -f "astro dev" 2>/dev/null; sleep 1
cd /home/ericv/srv/claude-command-state/workspace/ericsvanwagoner/ericvdub-astro
npm run dev -- --port 5007 > /tmp/ericvdub-dev.log 2>&1 &
```
Verify: `curl -s -o /dev/null -w "%{http_code}" http://localhost:5007/`

## Vite 6 / allowedHosts
Vite 6 blocks requests from unknown hostnames by default. The tunnel uses a `*.ericvdub.com` subdomain — **always keep this in `astro.config.mjs`**:
```js
server: {
  allowedHosts: true
}
```
Setting it only under `vite:` is ignored; it must be at the Astro config top level.

## Known issues & fixes
| Symptom | Cause | Fix |
|---|---|---|
| Black screen / page loads but blank | `threshold: 0.15` on IntersectionObserver too high for tall cards | Already fixed: threshold `0.05` + `rootMargin` + 2s fallback timeout |
| "Blocked request" in browser | Vite 6 allowedHosts missing | Already fixed: `server.allowedHosts: true` in astro.config.mjs |
| Tunnel 502 | Dev server crashed | Restart dev server (see above) |
| Multiple orphaned tunnels | Old quick-tunnel attempts | `pkill -f "cloudflared tunnel --url"` to clean up |

## API key for AI chat
The `/resume` page AI chat calls `POST /api/chat` which requires `ANTHROPIC_API_KEY`.
- Local dev: create `.env` with `ANTHROPIC_API_KEY=sk-ant-...`
- Production: set in Cloudflare Pages environment variables

## MCP server
`mcp-server/` contains a standalone MCP server exposing Eric's resume as tools (`get_resume_section`, `search_resume`, `get_full_resume`). Run locally: `cd mcp-server && npm install && npm run dev`.
