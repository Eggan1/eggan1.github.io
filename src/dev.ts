/**
 * Development server: rebuilds on every change under src/ and pushes a
 * reload to any open browser tab over server-sent events.
 *
 *   node src/dev.ts
 */

import { createServer, type ServerResponse } from 'node:http';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile } from 'node:fs/promises';
import { watch } from 'node:fs';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = dirname(fileURLToPath(import.meta.url));
const ROOT = join(SRC, '..');
const PORT = Number(process.env.PORT ?? 4321);

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.JPG': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
};

/** Injected into served HTML only — never written to the built files. */
const LIVE_RELOAD = `
<script>
  new EventSource('/__reload').onmessage = () => location.reload();
</script>
`;

const clients = new Set<ServerResponse>();

const run = promisify(execFile);

/**
 * Builds in a child process. Rebuilding in-process would reuse the module
 * cache for everything build.ts imports, so edits to a component or to the
 * content would be silently ignored.
 */
async function rebuild(): Promise<boolean> {
  try {
    await run(process.execPath, [join(SRC, 'build.ts')], { cwd: ROOT });
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`\n  build failed:\n${message}\n`);
    return false;
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://localhost:${PORT}`);

  if (url.pathname === '/__reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    res.write('\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  const rel = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname).slice(1);
  const file = join(ROOT, normalize(rel).replace(/^(\.\.[/\\])+/, ''));

  try {
    const body = await readFile(file);
    const ext = extname(file);
    res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(ext === '.html' ? body.toString('utf8') + LIVE_RELOAD : body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<p>Not found: ${rel}</p>${LIVE_RELOAD}`);
  }
});

let pending: NodeJS.Timeout | undefined;

watch(SRC, { recursive: true }, (_event, filename) => {
  if (!filename || !/\.(ts|css)$/.test(filename)) return;
  clearTimeout(pending);
  pending = setTimeout(async () => {
    const ok = await rebuild();
    if (!ok) return;
    console.log(`  rebuilt (${filename}) — reloading ${clients.size} tab(s)`);
    for (const client of clients) client.write('data: reload\n\n');
  }, 60);
});

await rebuild();
server.listen(PORT, () => {
  console.log(`\n  Preview  http://localhost:${PORT}`);
  console.log('  Watching src/ — the page reloads itself on save.\n');
});
