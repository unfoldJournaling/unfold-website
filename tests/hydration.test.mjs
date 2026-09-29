import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

test('filtered resource URLs preserve the same initial HTML as static pages', async () => {
  const vite = await createServer({
    server: { middlewareMode: true, hmr: false }, appType: 'custom',
    ssr: { noExternal: ['react-router', 'react-router-dom'], resolve: { conditions: ['module-sync', 'module', 'node', 'import'] } },
    optimizeDeps: { noDiscovery: true },
  });
  try {
    const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');
    for (const route of ['/blog', '/prompts', '/help']) {
      assert.equal(render(`${route}?q=Sunday&topic=Everyday+rituals`), render(route));
    }
  } finally { await vite.close(); }
});
