# Contact Form Setup Guide

This guide will help you set up email functionality for the contact form.

## Current Status

✅ The contact form is fully functional with:
- Client-side validation with Zod
- Server-side validation with Server Actions
- Proper error handling and user feedback
- Accessibility features (ARIA attributes)

⚠️ Email sending is **not yet configured** - it currently logs submissions to console.

## Quick Start Options

Choose one of the following options based on your needs:

### Option 1: Resend (Recommended) ⭐

**Why Resend?**
- Simple setup with excellent DX
- Generous free tier (3,000 emails/month)
- Built specifically for developers
- Great documentation

**Setup:**

1. **Install Resend:**
   ```bash
   npm install resend
   ```

2. **Get API Key:**
   - Sign up at [resend.com](https://resend.com)
   - Verify your domain (or use their test domain)
   - Get your API key from the dashboard

3. **Add to `.env.local`:**
   ```env
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_EMAIL=your-email@example.com
   ```

4. **Update `app/actions/contact.ts`:**
   ```typescript
   import { Resend } from 'resend';

   const resend = new Resend(process.env.RESEND_API_KEY);

   // Replace the TODO section with:
   await resend.emails.send({
     from: 'contact@yourdomain.com', // Must be from your verified domain
     to: process.env.CONTACT_EMAIL!,
     subject: `Portfolio Contact: ${validatedData.subject}`,
     html: `
       <h2>New Contact Form Submission</h2>
       <p><strong>From:</strong> ${validatedData.name}</p>
       <p><strong>Email:</strong> ${validatedData.email}</p>
       <p><strong>Subject:</strong> ${validatedData.subject}</p>
       <hr />
       <p><strong>Message:</strong></p>
       <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
     `,
   });
   ```

---

### Option 2: SendGrid

**Why SendGrid?**
- Reliable and widely used
- Free tier: 100 emails/day
- Good email deliverability

**Setup:**

1. **Install SendGrid:**
   ```bash
   npm install @sendgrid/mail
   ```

2. **Get API Key:**
   - Sign up at [sendgrid.com](https://sendgrid.com)
   - Navigate to Settings → API Keys
   - Create a new API key with "Mail Send" permissions

3. **Add to `.env.local`:**
   ```env
   SENDGRID_API_KEY=SG.your_api_key_here
   CONTACT_EMAIL=your-email@example.com
   FROM_EMAIL=noreply@yourdomain.com
   ```

4. **Update `app/actions/contact.ts`:**
   ```typescript
   import sgMail from '@sendgrid/mail';

   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

   // Replace the TODO section with:
   await sgMail.send({
     to: process.env.CONTACT_EMAIL!,
     from: process.env.FROM_EMAIL!, // Must be verified in SendGrid
     subject: `Portfolio Contact: ${validatedData.subject}`,
     html: `
       <h2>New Contact Form Submission</h2>
       <p><strong>From:</strong> ${validatedData.name}</p>
       <p><strong>Email:</strong> ${validatedData.email}</p>
       <p><strong>Subject:</strong> ${validatedData.subject}</p>
       <hr />
       <p><strong>Message:</strong></p>
       <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
     `,
   });
   ```

---

### Option 3: Nodemailer (Gmail/SMTP)

**Why Nodemailer?**
- Works with any SMTP provider (Gmail, Outlook, etc.)
- No third-party service needed
- Free

**Setup:**

1. **Install Nodemailer:**
   ```bash
   npm install nodemailer
   npm install -D @types/nodemailer
   ```

2. **Get Gmail App Password (if using Gmail):**
   - Enable 2FA on your Google account
   - Go to Google Account → Security → 2-Step Verification
   - Create an "App Password" for "Mail"
   - Use this password (not your regular Gmail password)

3. **Add to `.env.local`:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your_app_password_here
   CONTACT_EMAIL=your-email@gmail.com
   ```

4. **Update `app/actions/contact.ts`:**
   ```typescript
   import nodemailer from 'nodemailer';

   // Replace the TODO section with:
   const transporter = nodemailer.createTransporter({
     host: process.env.SMTP_HOST,
     port: parseInt(process.env.SMTP_PORT!),
     secure: false,
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASSWORD,
     },
   });

   await transporter.sendMail({
     from: process.env.SMTP_USER,
     to: process.env.CONTACT_EMAIL,
     subject: `Portfolio Contact: ${validatedData.subject}`,
     replyTo: validatedData.email,
     html: `
       <h2>New Contact Form Submission</h2>
       <p><strong>From:</strong> ${validatedData.name}</p>
       <p><strong>Email:</strong> ${validatedData.email}</p>
       <p><strong>Subject:</strong> ${validatedData.subject}</p>
       <hr />
       <p><strong>Message:</strong></p>
       <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
     `,
   });
   ```

---

### Option 4: Third-Party Form Services

**Why Third-Party?**
- Zero backend code needed
- Very simple setup
- Usually free for low volume

#### Formspree

1. **Sign up at [formspree.io](https://formspree.io)**
2. **Create a new form and get the endpoint**
3. **Update `app/actions/contact.ts`:**
   ```typescript
   // Replace the TODO section with:
   const response = await fetch(process.env.FORMSPREE_ENDPOINT!, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       name: validatedData.name,
       email: validatedData.email,
       subject: validatedData.subject,
       message: validatedData.message,
     }),
   });

   if (!response.ok) {
     throw new Error('Failed to submit form');
   }
   ```

#### Web3Forms

1. **Get API key from [web3forms.com](https://web3forms.com)**
2. **Add to `.env.local`:**
   ```env
   WEB3FORMS_ACCESS_KEY=your_access_key_here
   ```
3. **Update `app/actions/contact.ts`:**
   ```typescript
   // Replace the TODO section with:
   const response = await fetch('https://api.web3forms.com/submit', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       access_key: process.env.WEB3FORMS_ACCESS_KEY,
       name: validatedData.name,
       email: validatedData.email,
       subject: validatedData.subject,
       message: validatedData.message,
     }),
   });

   if (!response.ok) {
     throw new Error('Failed to submit form');
   }
   ```

---

## Testing

After setup, test your contact form:

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the contact page**

3. **Submit a test message**

4. **Check:**
   - Console for any errors
   - Your email inbox
   - Form shows success message

### Common Issues

**Issue: "RESEND_API_KEY is not defined"**
- Solution: Make sure `.env.local` exists and contains the key
- Restart your dev server after adding env variables

**Issue: Gmail "Less secure app" error**
- Solution: Use an App Password (not your regular password)
- Enable 2FA first, then create App Password

**Issue: Email goes to spam**
- Solution: Verify your domain's SPF/DKIM records
- Use a verified sending domain
- Add proper reply-to addresses

**Issue: "Network request failed"**
- Solution: Check if API key is correct
- Verify endpoint URL is correct
- Check firewall/network settings

---

## Security Best Practices

1. **Never commit `.env.local` to git**
   - Already in `.gitignore`
   - Use `.env.example` for documentation

2. **Use environment variables**
   - Never hardcode API keys
   - Access via `process.env.VARIABLE_NAME`

3. **Validate on server-side**
   - Already implemented with Zod
   - Never trust client-side validation alone

4. **Rate limiting (Optional)**
   - Consider adding rate limiting for production
   - Use services like Upstash or implement with Redis

---

## Production Deployment

When deploying to Vercel/Netlify:

1. **Add environment variables in dashboard:**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment

2. **Redeploy your site**

3. **Test in production**

---

## Email Template Customization

Want to customize the email? Edit the HTML in your implementation:

```typescript
const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1f7a8c; color: white; padding: 20px; }
        .content { padding: 20px; background: #f9f9f9; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
        </div>
        <div class="content">
          <p><strong>From:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        </div>
        <div class="footer">
          <p>Sent from your portfolio contact form</p>
        </div>
      </div>
    </body>
  </html>
`;
```

---

## Support

If you encounter issues:

1. Check the service's documentation
2. Verify environment variables are set correctly
3. Check console for error messages
4. Test with a simple example first

---

**Recommendation:** Start with **Resend** for the best developer experience and reliability.

Good luck! 🚀

