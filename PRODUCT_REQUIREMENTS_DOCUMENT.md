# Product Requirements Document (PRD)
## China Tour Guide - Digital Travel Guide Platform

**Version:** 1.0  
**Date:** January 2025  
**Project Type:** Digital Product Sales Platform  
**Reference:** https://www.realchinaguide.com/

---

## 1. Executive Summary

### 1.1 Product Vision
Transform the existing ShipAny template into a **China Tour Guide** sales platform - a simple, conversion-focused website that sells a comprehensive digital PDF travel guide for independent travelers visiting China.

### 1.2 Business Model
- **Product:** Single digital PDF guide (200+ pages)
- **Price:** $29 USD (one-time payment)
- **Value Proposition:** Practical, experience-based travel guide with lifetime updates
- **Target Audience:** Independent travelers, first-time visitors to China, English speakers

### 1.3 Success Metrics
- Conversion rate from landing page to purchase
- Average time to purchase decision
- Customer satisfaction (via testimonials/feedback)
- Repeat purchases for updates (if versioning implemented)

---

## 2. Product Overview

### 2.1 Core Features
1. **Landing Page** - Hero, features, social proof, CTA
2. **Pricing Page** - Single product offering at $29
3. **FAQ Page** - Common questions about the guide
4. **Checkout Flow** - Creem.io payment integration
5. **Order Management** - User dashboard to access purchased guide
6. **PDF Delivery** - Secure download after purchase

### 2.2 Technical Stack
- **Framework:** Next.js 15 (App Router)
- **Payment:** Creem.io
- **Database:** Supabase (PostgreSQL via Drizzle ORM)
- **Storage:** S3-compatible (for PDF hosting)
- **Authentication:** NextAuth.js (Google OAuth)
- **Deployment:** Vercel or Cloudflare
- **Language:** English only (initially)

---

## 3. User Stories

### 3.1 Visitor (Potential Customer)
- As a visitor, I want to **quickly understand what the guide offers** so I can decide if it's worth purchasing
- As a visitor, I want to **see the table of contents or preview** so I know what's included
- As a visitor, I want to **read testimonials from other travelers** so I trust the product quality
- As a visitor, I want to **see a clear price ($29)** without hidden fees or confusion
- As a visitor, I want to **complete checkout in under 2 minutes** so I can download immediately

### 3.2 Customer (After Purchase)
- As a customer, I want to **download the PDF immediately after payment** so I can start reading
- As a customer, I want to **access my purchase anytime** in case I lose the file
- As a customer, I want to **receive update notifications** when new versions are released
- As a customer, I want to **re-download updated versions for free** as promised

### 3.3 Admin (Site Owner)
- As an admin, I want to **see order statistics** to track sales
- As an admin, I want to **upload new PDF versions** when content is updated
- As an admin, I want to **send update notifications** to existing customers

---

## 4. Page Structure & Content

### 4.1 Landing Page (`/`)
**Purpose:** Convert visitors to customers

**Sections:**
1. **Hero**
   - Headline: "Travel China with Confidence in 2025"
   - Subheadline: "Complete, honest travel guide by real travelers. 200+ pages of practical advice."
   - CTA: "Get the Guide - $29"
   - Trust element: "Lifetime updates included"

2. **Social Proof Stats**
   - "200+ Pages"
   - "15+ Cities Covered"
   - "Updated 2025"

3. **What's Inside** (Features)
   - Transportation tutorials
   - Visa & entry guide
   - Payment apps setup (Alipay, WeChat Pay)
   - VPN & essential apps
   - Cultural tips
   - Language basics
   - Safety & emergency contacts
   - Troubleshooting common issues

4. **Why This Guide** (Benefits)
   - No AI fluff - written by real travelers
   - Practical, step-by-step tutorials
   - Updated for 2025
   - Lifetime free updates
   - Instant download

5. **Testimonials**
   - 3-6 testimonials from Reddit users or beta testers
   - Focus on specific problems solved
   - Include traveler photos/avatars

6. **FAQ Preview** (Top 3-4 questions)
   - What format is the guide?
   - Can I access it offline?
   - Do I get updates?
   - Link to full FAQ page

7. **Final CTA**
   - "Start Planning Your China Trip Today"
   - "Get the Guide - $29"

### 4.2 Pricing Page (`/pricing`)
**Purpose:** Clear, simple purchase decision

**Content:**
- **Single Product Card**
  - Title: "China Tour Guide 2025"
  - Price: ~~$49~~ **$29** (show discount)
  - "Launch price - includes lifetime updates"
  - Detailed feature list (14 items)
  - Large CTA button: "Get the Guide"

**Design Notes:**
- Single column layout (no comparison needed)
- Emphasize value: $29 vs. typical travel guide books ($25-40)
- Highlight "lifetime updates" as competitive advantage

### 4.3 FAQ Page (`/faq`)
**Purpose:** Address objections and concerns

**Questions (10-12 total):**
1. What format is the guide in?
2. Can I access it offline?
3. How do I download after purchase?
4. Is the guide updated? How often?
5. Do I get free updates?
6. What if I lose the file?
7. Can I share it with my travel partner?
8. Do you offer refunds?
9. What payment methods do you accept?
10. How is this different from free online resources?
11. Is the content AI-generated?
12. How can I contact support?

### 4.4 My Orders Page (`/my-orders`)
**Purpose:** Access purchased guide

**Content:**
- Order history table
- Download button for PDF
- "Last updated: [date]"
- Support contact link

### 4.5 Header Navigation
- Logo: "China Tour Guide"
- Links: Home | Pricing | FAQ
- Right side: Sign In button

### 4.6 Footer
- Brand: "China Tour Guide"
- Links: Pricing, FAQ, Privacy Policy, Terms of Service
- Social: Email contact
- Copyright notice

---

## 5. Product Configuration

### 5.1 Pricing Structure
```json
{
  "product_id": "china-guide",
  "product_name": "China Tour Guide 2025 - Complete Travel Guide",
  "interval": "one-time",
  "amount": 2900,
  "currency": "USD",
  "display_price": "$29",
  "original_price": "$49",
  "credits": 0,
  "valid_months": 0
}
```

### 5.2 Creem.io Configuration
**Environment Variables:**
```bash
PAY_PROVIDER="creem"
CREEM_ENV="test" # or "production"
CREEM_API_KEY="your_api_key"
CREEM_WEBHOOK_SECRET="your_webhook_secret"
CREEM_PRODUCTS='{"china-guide":"prod_creem_id_here"}'
```

**Product Setup in Creem Dashboard:**
1. Create product: "China Tour Guide 2025"
2. Price: $29 USD
3. Type: One-time payment
4. Copy product ID to env variable

### 5.3 Database Schema
**Using existing schema:**
- `orders` table - tracks all purchases
- `users` table - authenticated users
- No changes needed to schema

**Order Fields Used:**
- `order_no` - unique order identifier
- `user_uuid` - linked user
- `user_email` - customer email
- `amount` - 2900 (cents)
- `status` - "created" → "paid"
- `product_id` - "china-guide"
- `product_name` - "China Tour Guide 2025"
- `paid_at` - payment timestamp
- `paid_email` - customer email from payment

### 5.4 PDF Storage
**Storage Configuration:**
```bash
STORAGE_ENDPOINT="https://your-s3-endpoint.com"
STORAGE_REGION="us-east-1"
STORAGE_ACCESS_KEY="your_access_key"
STORAGE_SECRET_KEY="your_secret_key"
STORAGE_BUCKET="china-guide-pdfs"
STORAGE_DOMAIN="https://downloads.yoursite.com"
```

**File Structure:**
```
/products/
  /china-guide/
    /v1.0/china-tour-guide-2025-v1.0.pdf
    /v1.1/china-tour-guide-2025-v1.1.pdf
```

**Download URL Strategy:**
- Generate signed URLs with 7-day expiration
- Regenerate on each download request
- Track download count per order (optional analytics)

---

## 6. User Flows

### 6.1 Purchase Flow
```
1. Visitor lands on homepage
   ↓
2. Reads features, testimonials, FAQ
   ↓
3. Clicks "Get the Guide - $29"
   ↓
4. Redirected to /pricing page
   ↓
5. Clicks "Get the Guide" button
   ↓
6. Prompted to sign in (if not authenticated)
   - Google OAuth sign-in
   ↓
7. Redirected to Creem.io checkout
   - Pre-filled email from user account
   ↓
8. Completes payment (card, Alipay, etc.)
   ↓
9. Creem redirects to /api/pay/callback/creem
   ↓
10. Callback validates payment
    - Updates order status to "paid"
    - Sends welcome email with download link
    ↓
11. User redirected to /my-orders
    ↓
12. Downloads PDF immediately
```

### 6.2 Return Customer Flow
```
1. Customer logs in
   ↓
2. Navigates to /my-orders
   ↓
3. Sees order history
   ↓
4. Clicks "Download PDF"
   ↓
5. Gets latest version of guide
```

### 6.3 Update Notification Flow
```
1. Admin uploads new PDF version
   ↓
2. System sends email to all customers
   - "New version available!"
   - Link to /my-orders
   ↓
3. Customer logs in and re-downloads
```

---

## 7. Technical Implementation

### 7.1 Files to Create
1. `src/i18n/pages/faq/en.json` - FAQ page content
2. `src/app/[locale]/(default)/faq/page.tsx` - FAQ page route
3. `src/services/pdf.ts` - PDF storage/download service (optional)
4. `src/app/api/download/[order_no]/route.ts` - Secure download endpoint (optional)

### 7.2 Files to Modify
1. `src/i18n/pages/landing/en.json` - Update all sections
2. `src/i18n/pages/pricing/en.json` - Single product pricing
3. `.env.example` - Document Creem products mapping
4. `src/app/api/pay/callback/creem/route.ts` - Add email delivery logic
5. `src/i18n/messages/en.json` - Update global strings (site name, etc.)

### 7.3 Files to Use As-Is
- All existing components (Hero, Feature, Pricing, FAQ, Testimonial, etc.)
- Payment flow (checkout API, Creem integration)
- Database schema and models
- Authentication system
- Order management system

### 7.4 Files/Features to Remove or Hide
- Showcase page (not needed)
- Credits system UI (keep schema, set to 0)
- API keys page (not needed for customers)
- Admin dashboard (optional - keep for yourself)
- Multiple language support (keep en only)
- Subscription pricing groups (only one-time payment)

---

## 8. Content Strategy

### 8.1 Messaging Pillars
1. **Authenticity** - "Written by real travelers, not AI"
2. **Practicality** - "Step-by-step tutorials, not just tips"
3. **Current** - "Updated for 2025"
4. **Complete** - "Everything in one place"
5. **Value** - "Lifetime updates, one-time price"

### 8.2 Tone of Voice
- Friendly, helpful, conversational
- Honest (acknowledge challenges of traveling China)
- Confident (we've done this, you can too)
- Not overly salesy (let value speak for itself)

### 8.3 SEO Keywords (Primary)
- China travel guide
- Travel China independently
- China travel tips 2025
- First time China travel
- China itinerary guide
- Traveling China without Chinese

### 8.4 Social Proof Strategy
**Testimonial Sources:**
1. Reddit r/travelchina community (with permission)
2. Beta testers who used early version
3. Personal network who traveled China
4. Email solicitation after purchase

**Testimonial Structure:**
- Name + role/context ("Solo traveler", "Family of 4")
- Specific problem solved ("The VPN guide saved me", "Alipay setup was impossible until this")
- Result achieved ("Had amazing trip", "No stress")
- Photo (real person, not stock)

---

## 9. Email Communications

### 9.1 Welcome Email (Post-Purchase)
**Subject:** "Your China Tour Guide is Ready! 🎉"

**Content:**
```
Hi [Name],

Welcome to the China Tour Guide family!

Your guide is ready to download:
[Download Button]

What's inside:
✓ 200+ pages of practical advice
✓ Step-by-step tutorials for apps, payments, transportation
✓ City itineraries and recommendations
✓ Visa, safety, and emergency information

📌 Bookmark this email - you can re-download anytime from your account:
[My Orders Link]

🔄 Lifetime updates included - we'll email you when new versions are available.

Questions? Just reply to this email.

Happy travels!
The China Tour Guide Team
```

### 9.2 Update Notification Email
**Subject:** "New Version Available: China Tour Guide [Version]"

**Content:**
```
Hi [Name],

Good news! We've updated your China Tour Guide with new information.

What's new in this version:
• [Update 1]
• [Update 2]
• [Update 3]

Download the latest version:
[Download Button]

Or visit your account: [My Orders Link]

As promised, all updates are free forever.

Safe travels!
The China Tour Guide Team
```

---

## 10. Deployment Checklist

### 10.1 Pre-Launch
- [ ] Supabase project created
- [ ] Database migrations run (`pnpm db:push`)
- [ ] Package manager: `pnpm` only (no npm/yarn)
- [ ] Creem.io account created (test mode)
- [ ] Creem product created and mapped
- [ ] PDF uploaded to storage
- [ ] Test purchase in Creem test mode
- [ ] Verify order created in database
- [ ] Test webhook delivery
- [ ] Test email delivery
- [ ] Test PDF download
- [ ] Google Analytics configured (optional)
- [ ] Domain configured
- [ ] SSL certificate active

### 10.2 Content Review
- [ ] All landing page sections reviewed
- [ ] Pricing page accurate
- [ ] FAQ page complete
- [ ] All CTAs functional
- [ ] All links working
- [ ] Images optimized
- [ ] Mobile responsive
- [ ] Cross-browser tested

### 10.3 Legal
- [ ] Privacy Policy updated
- [ ] Terms of Service updated
- [ ] Refund policy defined
- [ ] Payment processor terms acknowledged

### 10.4 Go-Live
- [ ] Switch Creem to production mode
- [ ] Update CREEM_ENV to "production"
- [ ] Update CREEM_API_KEY to production key
- [ ] Update CREEM_PRODUCTS to production product ID
- [ ] Test live purchase with real card
- [ ] Verify webhook in production
- [ ] Monitor first 10 orders closely

---

## 11. Success Metrics & Analytics

### 11.1 Key Metrics to Track
1. **Traffic**
   - Unique visitors
   - Traffic sources (organic, Reddit, social)
   - Bounce rate
   - Time on site

2. **Conversion**
   - Landing page → Pricing page
   - Pricing page → Checkout
   - Checkout → Completed purchase
   - Overall conversion rate

3. **Revenue**
   - Total orders
   - Total revenue
   - Average order value ($29)
   - Refund rate

4. **Engagement**
   - FAQ page views
   - Download count per customer
   - Email open rates
   - Support ticket volume

### 11.2 Analytics Setup
- Google Analytics 4
- Track custom events:
  - `view_pricing`
  - `click_checkout`
  - `purchase_complete`
  - `download_pdf`

---

## 12. Future Enhancements (Post-MVP)

### 12.1 Phase 2 Features
- [ ] Email marketing integration (welcome series)
- [ ] Affiliate program (Reddit users promote, earn commission)
- [ ] Customer reviews/ratings section
- [ ] Blog/resources section (SEO content)
- [ ] Sample chapter preview (lead magnet)

### 12.2 Phase 3 Features
- [ ] Multiple guide versions (regions, themes)
- [ ] Bundle pricing (China + other countries)
- [ ] Community forum for travelers
- [ ] Trip planning service (premium upsell)
- [ ] Mobile app (offline access)

### 12.3 Internationalization
- [ ] Chinese version (Simplified/Traditional)
- [ ] Support for ¥ CNY pricing
- [ ] WeChat Pay integration (for Chinese diaspora)

---

## 13. Risk Assessment

### 13.1 Technical Risks
| Risk | Impact | Mitigation |
|------|--------|-----------|
| Payment gateway downtime | High | Have backup payment method (Stripe) |
| PDF storage failure | High | Multi-region backup, CDN |
| Webhook delivery failure | Medium | Implement retry logic, manual reconciliation |
| Database connection issues | High | Supabase has built-in redundancy |

### 13.2 Business Risks
| Risk | Impact | Mitigation |
|------|--------|-----------|
| Low conversion rate | High | A/B test pricing, messaging |
| High refund rate | Medium | Clear FAQ, realistic expectations |
| Outdated content complaints | Medium | Commit to quarterly updates |
| Competition from free resources | Medium | Emphasize curation, time-saving |

### 13.3 Legal Risks
| Risk | Impact | Mitigation |
|------|--------|-----------|
| Copyright claims (images, content) | High | Use only original or licensed content |
| Payment processor disputes | Medium | Clear refund policy, responsive support |
| GDPR compliance | Medium | Privacy policy, data retention policy |

---

## 14. Budget & Resources

### 14.1 Development Costs
- Development time: ~2-3 days (using existing template)
- Designer time: ~1 day (branding, images) - optional
- Content writing: ~1 day (landing page copy) - if outsourced

### 14.2 Ongoing Costs
- Hosting (Vercel): Free or $20/month (Pro)
- Database (Supabase): Free tier sufficient initially
- Storage (S3/R2): ~$5-10/month for 1000 customers
- Payment processing (Creem): 2.9% + $0.30 per transaction
- Domain: ~$12/year
- Email (Resend/SendGrid): Free tier sufficient

**Monthly Operating Cost:** ~$15-30 (excluding payment fees)

### 14.3 Break-Even Analysis
- Fixed costs: ~$30/month
- Variable costs per sale: $1.14 (payment fee on $29)
- Net revenue per sale: $27.86
- Break-even: 2 sales/month

---

## 15. Support & Maintenance

### 15.1 Customer Support Channels
- Email: support@[domain].com
- Response time: 24-48 hours
- FAQ page (self-service)

### 15.2 Maintenance Schedule
- **Weekly:** Check order reports, respond to support emails
- **Monthly:** Review analytics, optimize conversion
- **Quarterly:** Update guide content, send update email
- **Annually:** Review pricing, add new features

---

## 16. Launch Strategy

### 16.1 Soft Launch (Week 1-2)
- Launch to private audience (friends, Reddit in comments)
- Collect feedback on UX, content clarity
- Fix bugs, improve messaging
- Goal: 10-20 test purchases

### 16.2 Public Launch (Week 3)
- Post on r/travelchina (as genuine community member, not spam)
- Submit to travel deal sites (if allowed)
- Share in travel Facebook groups
- Goal: 50 purchases in first month

### 16.3 Growth Phase (Month 2-3)
- SEO optimization (blog content)
- Paid ads (Google, Facebook) if ROI positive
- Affiliate partnerships
- Goal: 100-200 purchases

---

## 17. Appendix

### 17.1 Reference Sites
- https://www.realchinaguide.com/ (primary inspiration)
- https://travel.chinida.com/ (mentioned in brief)

### 17.2 Technology Documentation
- Next.js: https://nextjs.org/docs
- Creem.io: https://docs.creem.io
- Supabase: https://supabase.com/docs
- Drizzle ORM: https://orm.drizzle.team/docs

### 17.3 Design Resources
- Fonts: Inter (body), Playfair Display (headings) - matching realchinaguide.com
- Color scheme: Clean, trustworthy (blues/greens), not too touristy
- Images: Real travel photos (not stock tourist clichés)

---

## 18. Approval & Sign-Off

**Document Status:** Draft  
**Prepared By:** AI Development Agent  
**Review Required By:** Product Owner  

**Approval Checklist:**
- [ ] Pricing approved ($29)
- [ ] Content strategy approved
- [ ] Technical approach approved
- [ ] Timeline realistic
- [ ] Budget acceptable

**Next Steps After Approval:**
1. Confirm Creem.io and Supabase accounts ready
2. Confirm PDF guide is ready for upload
3. Begin Phase 1: Configuration & Content
4. Estimated completion: 2-3 days

---

**END OF DOCUMENT**
