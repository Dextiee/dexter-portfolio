export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Check environment variables
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('Missing environment variables:', {
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASS: !!process.env.SMTP_PASS
    });
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Dynamic import to handle potential module issues
    const nodemailer = await import('nodemailer');
    
    const transporter = nodemailer.default.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return res.status(200).json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error('Vercel function email error:', err);
    return res.status(500).json({ 
      error: 'Failed to send message',
      details: err.message 
    });
  }
}


