# Jay Vijay Pest Control - Static Website

A premium, modern, professional, fully responsive pest control business website for **Jay Vijay Pest Control** ("Ultimate Pest Solution"). 

Built entirely with standard-compliant, performance-optimized **HTML5, CSS3, and vanilla ES6 JavaScript** — no build steps, node modules, frameworks, or database backends are required. Deployable directly to free static hosting services like **GitHub Pages**.

---

## 📂 Project Directory Structure

```text
/
├── index.html          # Homepage (Core features, services, floating booking)
├── about.html          # Company background, philosophy, team, and badges
├── services.html       # Detailed 11 pest specializations with descriptions
├── pricing.html        # One-time and Quarterly/Comprehensive AMC Packages
├── gallery.html        # Categorized gallery with interactive Vanilla JS Lightbox
├── testimonials.html   # 100% verified customer reviews with interactive carousel
├── faq.html            # 15 detailed pest FAQs with smooth CSS accordion dropdowns
├── contact.html        # Inquiry forms, call/whatsapp desks, Google Maps embed
├── privacy.html        # Privacy policy (Zero Server Storage, WhatsApp Encrypted Flow)
├── terms.html          # Terms & Conditions (Warranty, AMC rules, liability waiver)
├── css/
│   └── style.css       # Unified styling sheet with custom Sleek Interface theme
├── js/
│   └── script.js       # Core logic (Booking modal validation, Lightbox, Accordion, Slider)
├── assets/             # Business vector graphics, icons, and logo assets
├── favicon.ico         # Custom favicon asset
├── sitemap.xml         # XML Sitemap for search engines and Google Search Console
├── robots.txt          # Standard robots directives and XML sitemap registration
└── README.md           # Documentation & deployment guide (this file)
```

---

## 🛠️ Key Technical Features

1. **Sleek Interface Theme:**
   - Centralized, Material-3-aligned style system featuring **Deep Navy (#12283F)** as the primary backdrop, and **Vibrant Red (#E13B3B)** as the high-contrast accent color.
   - Elegant typography pairing of **Poppins** (bold headers) and **Inter** (highly-legible body paragraphs) sourced via Google Fonts CDN.

2. **Unified Navigation Menu:**
   - Mobile-first, responsive hamburger dropdown with focus-trapped key navigation.
   - Uniform header and footer modules across all 10 site directories.

3. **Secure WhatsApp Booking Engine:**
   - Unified, interactive modal popup built entirely with vanilla JS validation.
   - Checks name lengths, valid 10-digit Indian mobile patterns starting with 6–9, and drop-down selectors.
   - **Zero Server-Side Storage:** Form values are compiled purely inside the client-side browser context to generate a URL-encoded string payload. Tap/Click to submit seamlessly opens WhatsApp on web/mobile to send directly to their official desk (`+91 9922464685`).
   - A secondary on-page success indicator banner reminds clients to press 'Send' in WhatsApp to complete booking steps.

4. **Dynamic On-Page Components (Vanilla JS Only):**
   - **Gallery Lightbox:** Fully responsive lightbox popup that dynamically queries the visible grid list based on the active category filter (Termite, Rodent, Fogging, On-Site) with touch & keyboard navigation support (Esc, Arrow Left/Right).
   - **Accordion FAQ Container:** Highly-polished FAQ section containing 15 detailed questions with automatic height measurements for buttery-smooth CSS transition animations.
   - **Testimonials Carousel:** Auto-rotating slider track with physical swipe gesture support on mobile, dot indicators, and manual controls.

---

## ⚠️ Important Customization & Placeholder Warnings

Before deploying this project live to production, you **MUST** review and customize the following assets:

1. **Images & Visual Media:**
   - Many images across pages utilize placeholder URLs from **Unsplash** (e.g., `https://images.unsplash.com/...`) and **Placehold.co** (e.g., `https://placehold.co/100x100?text=K`).
   - Ensure you replace these with your own high-resolution, optimized business photography. We recommend maintaining similar aspect ratios (typically `16:9` for section banners and `1:1` for customer review avatars) to prevent structural layouts from shifting.
   
2. **Favicon and Brand Assets:**
   - Overwrite `/favicon.ico` and `/assets/` logos with your company's actual brand graphics to establish brand consistency.

3. **WhatsApp Numbers:**
   - WhatsApp redirect target desk is hardcoded to **`+91 9922464685`** inside `/js/script.js` and **`+91 7559352915`** on floating action templates. If your customer desk phone changes, update these numbers inside `js/script.js` and your HTML link elements.

---

## 🚀 Easy Deployment via GitHub Pages

Deploying the website is completely free and takes less than 2 minutes using **GitHub Pages**:

1. **Create a GitHub Repository:**
   - Create a new, public repository on GitHub (e.g., `jayvijaypestcontrol`).

2. **Push Codebase to GitHub:**
   - Initialize git in your project directory:
     ```bash
     git init
     git add .
     git commit -m "Initial commit of static codebase"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/jayvijaypestcontrol.git
     git push -u origin main
     ```

3. **Enable GitHub Pages:**
   - Open your repository settings on GitHub.
   - Navigate to the **Pages** menu on the left sidebar.
   - Under **Build and deployment**, set the source to **Deploy from a branch**.
   - Select the `main` branch and `/ (root)` folder, then click **Save**.

4. **Verify Live Deployment:**
   - Within 1–2 minutes, your live URL will be active at: `https://YOUR_USERNAME.github.io/jayvijaypestcontrol/`
   - Since all page-to-page navigation hyperlinks utilize strictly relative paths, all directories will link together flawlessly under subdirectories without broken links!
