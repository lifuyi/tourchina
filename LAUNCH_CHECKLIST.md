# 🚀 China Tour Guide - Launch Checklist

## Pre-Launch Checklist

### Phase 1: Setup & Configuration ⚙️

#### Environment Configuration
- [ ] Create `.env.development` file
- [ ] Add `DATABASE_URL` from Supabase
- [ ] Add `CREEM_API_KEY` from Creem.io
- [ ] Add `CREEM_WEBHOOK_SECRET` from Creem.io
- [ ] Update `CREEM_PRODUCTS` with actual product ID
- [ ] Add Google OAuth credentials (optional)
- [ ] Set `NEXT_PUBLIC_WEB_URL` to your domain

#### Database Setup
- [ ] Create Supabase project
- [ ] Copy connection string
- [ ] Run `pnpm db:push` to create tables
- [ ] Verify tables created in Supabase dashboard
- [ ] Test database connection

#### Payment Setup
- [ ] Create Creem.io account
- [ ] Create product ($29, one-time payment)
- [ ] Copy product ID
- [ ] Get API key and webhook secret
- [ ] Set webhook URL in Creem dashboard
- [ ] Test in test mode first

#### Content & Branding
- [ ] Replace `/public/logo.png` with your logo
- [ ] Replace `/public/favicon.ico` with your favicon
- [ ] Update feature images in `/public/imgs/features/`
- [ ] Update user photos in `/public/imgs/users/`
- [ ] Review and customize landing page content
- [ ] Update testimonials with real quotes
- [ ] Review FAQ and update as needed
- [ ] Update support email in FAQ

#### PDF Setup
- [ ] Prepare final PDF guide (200+ pages)
- [ ] Upload to `/public/` OR S3/R2 storage
- [ ] Set `PDF_DOWNLOAD_URL` in env
- [ ] Test PDF download locally

---

### Phase 2: Testing 🧪

#### Local Testing
- [ ] Run `pnpm dev` successfully
- [ ] Homepage loads without errors
- [ ] All sections display correctly
- [ ] Navigation works (Home, Pricing, FAQ)
- [ ] Pricing page shows correct price ($29)
- [ ] FAQ page displays all questions
- [ ] Footer links work
- [ ] Mobile responsive (test on phone)

#### Authentication Testing
- [ ] Sign in with Google works
- [ ] User redirected after sign-in
- [ ] Sign out works
- [ ] Protected pages require auth

#### Purchase Flow Testing (Test Mode)
- [ ] Click "Get the Guide" button
- [ ] Redirected to pricing page
- [ ] Click purchase button
- [ ] Sign-in prompt appears (if not logged in)
- [ ] Redirected to Creem checkout
- [ ] Test payment form displays
- [ ] Complete test payment with test card
- [ ] Order created in database
- [ ] Order status is "created"
- [ ] Payment completes successfully
- [ ] Redirected back to site
- [ ] Callback updates order to "paid"
- [ ] Webhook received (check Creem dashboard)

#### Download Testing
- [ ] Redirected to `/my-orders` after payment
- [ ] Order appears in orders table
- [ ] "Download PDF" button visible
- [ ] Click download button
- [ ] PDF downloads successfully
- [ ] Can re-download multiple times
- [ ] Non-purchasers cannot access download

#### Security Testing
- [ ] Cannot download without auth
- [ ] Cannot download other users' orders
- [ ] Cannot download unpaid orders
- [ ] Download URL validates order ownership

---

### Phase 3: Production Setup 🌐

#### Domain & Hosting
- [ ] Purchase domain name
- [ ] Connect domain to Vercel/Cloudflare
- [ ] SSL certificate active
- [ ] Update `NEXT_PUBLIC_WEB_URL` to production domain

#### Production Environment
- [ ] Create `.env.production` or set vars in Vercel
- [ ] Switch Creem to production mode (`CREEM_ENV="production"`)
- [ ] Update Creem API key to production key
- [ ] Update product ID to production product
- [ ] Update webhook URL to production domain
- [ ] Set `DATABASE_URL` to production database
- [ ] Update Google OAuth redirect URIs

#### Final Checks
- [ ] All env variables set in hosting platform
- [ ] Database migrations run on production
- [ ] PDF uploaded to production storage
- [ ] Test one real purchase ($29)
- [ ] Verify order in production database
- [ ] Verify PDF downloads in production
- [ ] Check email notifications (if implemented)

---

### Phase 4: Content Polish ✨

#### Copy Review
- [ ] Proofread all page content
- [ ] Check for typos and grammar
- [ ] Verify all prices show $29
- [ ] Ensure CTAs are clear and compelling
- [ ] Check all links work
- [ ] Verify email addresses are correct

#### SEO Optimization
- [ ] Update page titles and descriptions
- [ ] Add OpenGraph images
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics (optional)
- [ ] Verify robots.txt allows indexing

#### Legal & Compliance
- [ ] Review Privacy Policy
- [ ] Review Terms of Service
- [ ] Add refund policy details
- [ ] GDPR compliance check (if selling in EU)
- [ ] Payment processor terms acknowledged

---

### Phase 5: Launch Day 🎉

#### Final Pre-Launch
- [ ] One last test purchase in production
- [ ] Verify webhook working
- [ ] Check all pages on mobile
- [ ] Test on different browsers
- [ ] Have support email ready

#### Go Live
- [ ] Announce on personal networks
- [ ] Post in travel communities (Reddit)
- [ ] Share on social media
- [ ] Monitor first orders closely
- [ ] Be ready for support questions

#### First 24 Hours
- [ ] Monitor server performance
- [ ] Check for any error logs
- [ ] Respond to support emails promptly
- [ ] Track conversion rates
- [ ] Fix any issues immediately

---

### Phase 6: Post-Launch 📈

#### Week 1
- [ ] Collect customer feedback
- [ ] Monitor refund requests
- [ ] Fix any bugs or issues
- [ ] Adjust messaging if needed
- [ ] Start collecting testimonials

#### Month 1
- [ ] Analyze conversion rates
- [ ] Review analytics data
- [ ] Plan first guide update
- [ ] Consider A/B testing pricing
- [ ] Explore marketing channels

#### Ongoing
- [ ] Update guide quarterly
- [ ] Send update emails to customers
- [ ] Respond to support within 24-48h
- [ ] Monitor competitor pricing
- [ ] Collect and display reviews

---

## Quick Reference

### Test Purchase (Creem Test Mode)
Use Creem test card numbers to simulate purchases without real money.

### Production Purchase
First live purchase should be your own to verify the entire flow.

### Support Preparation
Have responses ready for common questions:
- Download issues
- Refund requests
- Payment problems
- Access issues

### Emergency Contacts
- Creem Support: support@creem.io
- Supabase Support: support@supabase.io
- Your hosting provider support

---

## Success Metrics

### Launch Goals (First Month)
- [ ] 10+ sales
- [ ] <5% refund rate
- [ ] 5-star customer feedback
- [ ] No critical bugs
- [ ] <2% checkout abandonment

### Growth Goals (3 Months)
- [ ] 50+ sales
- [ ] Positive testimonials
- [ ] Featured in travel communities
- [ ] SEO ranking improvements
- [ ] Repeat customer updates

---

## Troubleshooting Quick Links

- **PRD:** `PRODUCT_REQUIREMENTS_DOCUMENT.md`
- **Setup:** `SETUP_INSTRUCTIONS.md`
- **Summary:** `IMPLEMENTATION_SUMMARY.md`
- **README:** `README_CHINA_TOUR_GUIDE.md`

---

## Time Estimates

| Task | Estimated Time |
|------|---------------|
| Environment setup | 30 minutes |
| Supabase setup | 15 minutes |
| Creem setup | 15 minutes |
| Google OAuth setup | 15 minutes |
| PDF upload | 10 minutes |
| Local testing | 30 minutes |
| Content updates | 1-2 hours |
| Production deploy | 30 minutes |
| Final testing | 30 minutes |
| **Total** | **4-5 hours** |

---

## You're Ready! 🚀

Check off each item as you complete it. Once all boxes are checked, you're ready to launch!

**Need help?** Refer to the documentation files or ask for assistance.

**Good luck with your launch!** 🇨🇳✨

