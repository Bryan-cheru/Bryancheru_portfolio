# Email Setup Guide for Contact Form

## Step 1: Get Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Go to API Keys section
4. Create a new API key
5. Copy the API key (starts with `re_`)

## Step 2: Configure Environment Variables

### For Local Development:
Update your `.env.local` file:
```
RESEND_API_KEY=re_your_actual_api_key_here
```

### For Vercel Deployment:
1. Go to your Vercel dashboard
2. Select your portfolio project
3. Go to Settings → Environment Variables
4. Add:
   - Name: `RESEND_API_KEY`
   - Value: `re_your_actual_api_key_here`
   - Environment: Production, Preview, Development

## Step 3: Domain Setup (Optional but Recommended)

### For Custom Domain Email:
1. In Resend, add your domain (e.g., `briancheruiyot.dev`)
2. Add the DNS records they provide
3. Update the `from` email in `/src/app/api/contact/route.ts`:
   ```typescript
   from: 'Portfolio Contact <contact@yourdomain.com>'
   ```

### For Default Resend Domain:
The current setup uses `contact@briancheruiyot.dev` which needs domain verification.
You can use Resend's default domain instead by changing to:
```typescript
from: 'contact@resend.dev'
```

## Step 4: Test the Contact Form

1. Deploy to Vercel with the API key
2. Fill out your contact form
3. Check your email at `briancheruiyot501@gmail.com`

## Free Tier Limits:
- Resend free plan: 100 emails/day, 3,000 emails/month
- Perfect for portfolio contact forms

## Troubleshooting:
- Check Vercel function logs if emails aren't sending
- Verify API key is correctly set in environment variables
- Make sure your domain is verified in Resend (if using custom domain)