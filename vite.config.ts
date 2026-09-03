import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const accessKey = env.WEB3FORMS_KEY || env.VITE_WEB3FORMS_KEY;

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'dev-api-dispatch',
        configureServer(server) {
          server.middlewares.use('/api/dispatch', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method Not Allowed' }));
              return;
            }

            let bodyStr = '';
            req.on('data', (chunk) => { bodyStr += chunk; });
            req.on('end', async () => {
              try {
                const body = JSON.parse(bodyStr || '{}');
                const key = accessKey;
                if (!key) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Dispatch key not configured in .env' }));
                  return;
                }

                const upstream = await fetch('https://api.web3forms.com/submit', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                  body: JSON.stringify({
                    access_key: key,
                    name: body.name,
                    email: body.email,
                    message: body.message,
                    from_name: body.name,
                    subject: `New dispatch from ${body.name} via betonportfolio.vercel.app`,
                  }),
                });
                const data = (await upstream.json()) as { success?: boolean; message?: string };
                res.statusCode = data.success ? 200 : 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message || 'Internal Error' }));
              }
            });
          });
        },
      },
    ],
  };
});
