export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const rawBody = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const { name, email, message, botcheck } = rawBody;

  // Silent bot trap: drop bot submissions
  if (botcheck) {
    return res.status(200).json({ success: true });
  }

  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }

  const accessKey = process.env.WEB3FORMS_KEY || process.env.VITE_WEB3FORMS_KEY;
  if (!accessKey) {
    return res.status(500).json({ error: 'Dispatch key not configured on server' });
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        from_name: name,
        subject: `New dispatch from ${name} via betonportfolio.vercel.app`,
      }),
    });

    const data = (await response.json()) as { success?: boolean; message?: string };
    if (data.success) {
      return res.status(200).json({ success: true });
    }
    return res.status(500).json({ error: data.message || 'Transmission failed' });
  } catch {
    return res.status(500).json({ error: 'Failed to contact dispatch server' });
  }
}
