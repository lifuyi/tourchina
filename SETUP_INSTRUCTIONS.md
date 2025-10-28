# China Tour Guide - Setup Instructions

## Quick Start Guide

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment Variables

Create `.env.development` file in the root directory:

```bash
cp .env.example .env.development
```

Then update these critical variables:

#### Required Configuration:
```env
# Project Info
NEXT_PUBLIC_WEB_URL="http://localhost:3000"
NEXT_PUBLIC_PROJECT_NAME="China Tour Guide"

# Database (Get from Supabase)
DATABASE_URL="postgresql://postgres:[PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres"

# Payment (Get from Creem.io)
CREEM_ENV="test"
CREEM_API_KEY="your_creem_api_key"
CREEM_WEBHOOK_SECRET="your_webhook_secret"
CREEM_PRODUCTS='{"china-guide":"prod_YOUR_CREEM_PRODUCT_ID"}'
PAY_PROVIDER="creem"
```

### 3. Setup Supabase Database

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy the connection string from Project Settings > Database
3. Add to `.env.development` as `DATABASE_URL`
4. Run migrations:

```bash
pnpm db:push
```

This creates the necessary tables: `users`, `orders`, `credits`, etc.

### 4. Setup Creem.io Payment

1. Create account at [creem.io](https://creem.io)
2. Create a product:
   - Name: "China Tour Guide 2025"
   - Price: $29 USD
   - Type: One-time payment
3. Copy the product ID (looks like `prod_xxx`)
4. Update `.env.development`:
   ```env
   CREEM_PRODUCTS='{"china-guide":"prod_YOUR_ACTUAL_ID"}'
   ```
5. Get API keys from Creem dashboard
6. Set webhook URL to: `https://yoursite.com/api/pay/notify/creem`

### 5. Setup Google OAuth (Optional but Recommended)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Update `.env.development`:
   ```env
   AUTH_GOOGLE_ID="your_client_id"
   AUTH_GOOGLE_SECRET="your_client_secret"
   NEXT_PUBLIC_AUTH_GOOGLE_ENABLED="true"
   ```

### 6. Run Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 7. Test Purchase Flow

1. Navigate to `/pricing`
2. Click "Get the Guide"
3. Sign in with Google (if enabled)
4. Complete checkout with Creem test card
5. Verify redirect to `/my-orders`
6. Check order appears in database

## Project Structure

```
src/
├── app/[locale]/(default)/
│   ├── page.tsx              # Home page (landing)
│   ├── pricing/page.tsx      # Pricing page
│   ├── faq/page.tsx          # FAQ page (NEW)
│   └── my-orders/page.tsx    # Order history (TODO)
├── i18n/pages/
│   ├── landing/en.json       # Home page content
│   ├── pricing/en.json       # Pricing content
│   └── faq/en.json           # FAQ content (NEW)
├── components/blocks/        # Reusable UI components
├── services/                 # Business logic
└── models/                   # Database models
```

## What's Been Updated

### ✅ Completed:
1. **Configuration**
   - Updated `.env.example` with Creem products mapping
   - Changed default pay provider to "creem"
   - Updated project name to "China Tour Guide"

2. **Content Files**
   - Created `src/i18n/pages/pricing/en.json` - Single product at $29
   - Created `src/i18n/pages/faq/en.json` - 12 FAQ items
   - Updated `src/i18n/pages/landing/en.json` - Full landing page content
   - Updated `src/i18n/messages/en.json` - Global translations

3. **Pages**
   - Created `src/app/[locale]/(default)/faq/page.tsx` - FAQ page route
   - Updated `src/app/[locale]/(default)/page.tsx` - Simplified layout
   - Removed unused sections (branding, benefit, usage, showcase, pricing from home)

4. **Services**
   - Updated `src/services/page.ts` - Added `getFAQPage()` function

### 🔧 TODO (Next Steps):

1. **My Orders Page**
   - Create download portal at `/my-orders`
   - Show order history from database
   - Add download button for PDF

2. **PDF Storage & Delivery**
   - Upload PDF to S3/R2 storage
   - Generate signed download URLs
   - Add email delivery after purchase

3. **Email Notifications**
   - Welcome email with download link
   - Update notification emails

4. **Testing**
   - Test complete purchase flow
   - Test PDF download
   - Test webhook handling

## Content Highlights

### Pricing ($29)
- Single product: "China Tour Guide 2025"
- 14 features listed
- Emphasizes lifetime updates
- Shows original price $49 (discount psychology)

### Landing Page Sections
1. **Hero** - "Travel China with Confidence in 2025"
2. **Stats** - 200+ pages, 15+ cities, 2025 updated
3. **Introduce** - Why this guide is different
4. **Features** - 12 key features (transportation, visa, payments, etc.)
5. **Testimonials** - 6 traveler reviews
6. **FAQ Preview** - 4 top questions
7. **CTA** - Final call to action

### FAQ Page
- 12 comprehensive questions
- Covers format, updates, refunds, etc.
- Emphasizes "no AI content" and "real experience"

## Payment Flow

```
User clicks "Get the Guide" 
  ↓
Redirected to /pricing 
  ↓
Clicks "Get the Guide" button 
  ↓
Signs in (if not authenticated) 
  ↓
POST /api/checkout 
  ↓
Creates order in database (status: "created")
  ↓
Redirects to Creem checkout 
  ↓
User completes payment 
  ↓
Creem redirects to /api/pay/callback/creem 
  ↓
Validates payment & updates order (status: "paid")
  ↓
Sends webhook to /api/pay/notify/creem (async)
  ↓
Redirects user to /my-orders 
  ↓
User downloads PDF
```

## Database Schema

Using existing tables (no changes needed):

### `orders` table:
- `order_no` - Unique identifier
- `user_uuid` - Linked user
- `user_email` - Customer email
- `amount` - 2900 (cents = $29)
- `product_id` - "china-guide"
- `product_name` - "China Tour Guide 2025"
- `status` - "created" → "paid"
- `credits` - 0 (not used for this product)
- `paid_at` - Payment timestamp

### `users` table:
- Standard user authentication fields
- Links to orders via `uuid`

## Troubleshooting

### "CREEM_API_KEY is not set" error
- Make sure `.env.development` exists
- Check `CREEM_API_KEY` is set
- Restart dev server after env changes

### Database connection error
- Verify `DATABASE_URL` is correct
- Check Supabase project is running
- Run `pnpm db:push` to create tables

### Payment not working
- Check `PAY_PROVIDER="creem"` (not "stripe")
- Verify `CREEM_PRODUCTS` mapping is correct
- Test in Creem test mode first

### Checkout redirects to 404
- Clear `.next` cache: `rm -rf .next`
- Restart dev server: `pnpm dev`

## Support

For questions or issues:
- Check `PRODUCT_REQUIREMENTS_DOCUMENT.md` for detailed specs
- Review Creem docs: https://docs.creem.io
- Check Supabase docs: https://supabase.com/docs

## Next Phase

After setup is complete, we'll implement:
1. My Orders page with download functionality
2. PDF storage integration
3. Email delivery system
4. Production deployment

