# 🏔️ Himalayan Bistro — Restaurant Management System (RMS)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![Vanilla JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Architecture](https://img.shields.io/badge/Architecture-Single_Page_Application_(SPA)-D9531E?style=flat-square)
![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub_Pages_Ready-success?style=flat-square)

> **Professional Internship Demonstration Project**  
> A commercial-grade, zero-dependency Restaurant Management System engineered in standard HTML5, modern CSS3, and modular Vanilla JavaScript. Built exclusively with client-side execution, relative asset paths, resilient SVG failovers, and browser local storage persistence.

---

## 1. Project Overview

**Himalayan Bistro** is an enterprise-caliber Restaurant Management System (RMS) developed for high-velocity dining establishments. The software bridges the authentic culinary heritage of Nepal (Thakali, Newari, and Himalayan mountain dining) with modern, high-speed SaaS ergonomics.

It provides end-to-end front-of-house (FOH) and back-of-house (BOH) operational capabilities:
* **Staff Authentication:** Role-based demo login with session persistence.
* **Executive Dashboard:** Live turnover telemetry, real-time KPI metrics, and an interactive vanilla SVG revenue chart.
* **Point of Sale (POS) Terminal:** Dynamic dish selection, automated tax/service calculations, and live kitchen dispatch.
* **Live Orders Stream:** KDS order lifecycle management from preparation to table service and settlement.
* **Culinary Menu Catalog:** Dish categorization, pricing, prep times, and spice level monitoring.
* **Table Floor Management:** Real-time visual floor plan tracking table occupancy, diners, and servers.
* **Guest CRM Directory:** Customer dining profiles, cumulative spending, and VIP loyalty tiers.
* **Kitchen Inventory & Herbs:** Stock tracking for authentic Himalayan spices (Jimbu, Timur) and perishables.
* **Staff Duty Roster:** Brigade shifts across chefs, managers, servers, and cashiers.
* **Financial & VAT Audits:** Tax reconciliation ready for Nepal Inland Revenue Department (IRD) 13% VAT and 10% Service Charge compliance.

---

## 2. Problem Statement & Objectives

### Problem Statement
Traditional restaurant software is often burdened by:
1. High subscription overhead and heavy backend database infrastructure requiring complex local servers.
2. Cluttered, slow interfaces that lead to order bottlenecks during dinner rushes.
3. Lack of cultural and local operational alignment (e.g., dual currency formatting, 13% VAT, 10% Service Charge, local Himalayan spice tracking).
4. Fragile web systems that fail or display broken placeholders when external image CDNs are throttled or offline.

### Project Objectives
* **Zero Backend Dependency:** Achieve complete CRUD simulations, state persistence, and operational workflows using pure HTML5, CSS3, and Vanilla JavaScript without databases or server runtimes.
* **High-Speed Ergonomics:** Eliminate page reloads through Single Page Application (SPA) architecture.
* **Operational Accuracy:** Calculate exact billing, 13% VAT, and 10% Service Charge in Nepali Rupees (`Rs.`).
* **Visual Identity & Contrast:** Adhere to WCAG AAA contrast standards using an earthy Himalayan palette (Saffron Flame `#D9531E`, Himalayan Brass `#D4A359`, Obsidian Slate `#0F141C`).
* **Offline Resilience:** Guarantee zero broken images by combining high-definition food photography with local SVG vector artwork failovers.
* **Turnkey Deployment:** Host seamlessly on GitHub Pages by double-clicking or deploying directly from the `main` branch.

---

## 3. Demo Credentials

The application includes built-in frontend authentication. Click any of the one-click demo pills on the sign-in screen to auto-fill:

| Role | Email Address | Password (PIN) | Staff Name | Assigned Shift |
| :--- | :--- | :--- | :--- | :--- |
| **Administrator** | `admin@himalayanbistro.com` | `bistro2026` | Sunita Karmacharya | Evening Lead |
| **Floor Manager** | `manager@himalayanbistro.com` | `manager2026` | Rohan Manandhar | Dinner Shift |
| **Lead Cashier** | `cashier@himalayanbistro.com` | `pos2026` | Anish Tuladhar | POS Counter 1 |

*Note: You can also toggle password visibility using the interactive Eye button.*

---

## 4. Key Features & Operational Modules

```
┌────────────────────────────────────────────────────────────────────────┐
│                   HIMALAYAN BISTRO MANAGEMENT SUITE                     │
├─────────────┬─────────────┬─────────────┬──────────────┬───────────────┤
│ 1. DASHBOARD│   2. POS    │  3. ORDERS  │   4. MENU    │   5. TABLES   │
│ Live KPIs   │ Real-time   │ Cook Queue  │ Dish Catalog │ 12-Table Plan │
│ SVG Charts  │ Cart & VAT  │ KDS Flow    │ Spice Levels │ Status Toggle │
├─────────────┼─────────────┼─────────────┼──────────────┼───────────────┤
│6. CUSTOMERS │7. INVENTORY │  8. STAFF   │  9. REPORTS  │ 10. SETTINGS  │
│ Guest CRM   │ Herb Alerts │ Duty Roster │ 13% VAT Calc │ Hardware/Tax  │
│ VIP Loyalty │ Restock +5kg│ Shift Toggle│ CSV Export   │ Preferences   │
└─────────────┴─────────────┴─────────────┴──────────────┴───────────────┘
```

### Module Breakdown:
1. **Authentication Portal:** Split-screen responsive login card with brand showcase, demo user pills, email/password validation, show/hide password toggle, and remember-me session storage.
2. **Operations Dashboard:**
   * 6 Metric Cards: Total Revenue, Total Orders, Active Tables, Diners Served, Kitchen Queue, Average Order Value.
   * Responsive Vanilla SVG Revenue Chart with hourly (11:00-22:00), weekly, and monthly periods, cubic Bézier smoothing, area gradient fill, and interactive hover tooltips.
   * Category sales breakdown progress bars (Thakali Sets, Momo, Sekuwa, Chowmein, Chiya).
   * Popular Himalayan dishes leaderboard with rank badges and revenue totals.
   * Recent transactions data table with real-time status filters (**All**, **Preparing**, **Ready**, **Served**, **Completed**) and "View Ticket" modal inspector.
   * Order status summary bar (85.2% Completed, 8.5% In Kitchen, 4.2% Ready, 2.1% Voided).
3. **Point of Sale (POS) Terminal:**
   * Category tabs: All, Momo, Thakali Mains, Charcoal Sekuwa, Chowmein, Beverages.
   * Live Order Ticket Cart with table selector, guest name, quantity modifiers (`+` / `-`), subtotal, 13% VAT, 10% Service Charge, and Grand Total.
   * Payment channel selector (Fonepay QR, Credit Card, Cash).
   * Real-time "Send Ticket to Kitchen (KDS)" action that immediately creates a live order, updates KPIs, and resets the ticket.
4. **Orders Management (KDS Stream):**
   * Filter tickets by lifecycle: All, Preparing, Ready to Serve, Served, Completed.
   * One-click status progression: "Mark Ready" -> "Mark Served" -> "Settle Bill" -> "Print Bill".
5. **Culinary Menu Catalog:**
   * Full menu table showing dish imagery, Nepali typography (झोल मोमो, थकाली खाना सेट), prices in `Rs.`, spice meters (Mild, Medium, Hot), prep time, and customer ratings.
6. **Table Floor Plan:**
   * 12 interactive table cards displaying seat capacity, location (Window Alcove, Royal Booth, Main Hall, Patio), status badges (Available, Occupied, Reserved, Bill Pending), elapsed timers, and server assignments. Click any table to toggle its status.
7. **Customer & Loyalty CRM:**
   * Guest directory with contact numbers, total visit frequency, cumulative spend in `Rs.`, favorite dishes, and VIP loyalty tiers (Platinum VIP, Gold VIP, Silver, Regular).
8. **Kitchen Inventory & Mountain Herbs:**
   * Supply tracker for authentic ingredients: Wild Jimbu, Timur Sichuan pepper, Gundruk, Basmati rice, Cow Ghee, Chicken, Mutton, Ilam tea leaves, and Mustard greens.
   * Visual stock status tags (In Stock, Low Stock Alert) with quick "+ Restock" action.
9. **Staff Duty Roster:**
   * Staff directory across kitchen chefs, floor managers, and cashiers with shift hours, contact info, and active duty status toggle (On Duty / On Break).
10. **Financial & VAT Audits:**
    * Audited totals for Gross Turnover, Net Food Sales, 13% Government VAT, and 10% Service Charge pool.
    * Payment channel reconciliation: Fonepay QR (48%), Cards (32%), Cash (20%).
    * Simulated CSV export and printable receipt format.
11. **System & Hardware Settings:**
    * Configurable restaurant business profile, official address (Thamel, Kathmandu), VAT/PAN number, tax percentage rates, currency symbol, and sound alert toggles.

---

## 5. Technology Stack & Architecture

### Technologies
* **Markup:** Semantic HTML5 (`<aside>`, `<header>`, `<main>`, `<section>`, `<nav>`, `<dialog>`).
* **Styling:** Modular CSS3 with centralized CSS variables (`:root`), Flexbox, CSS Grid, and custom animations.
* **Scripting:** Modular Vanilla JavaScript (ES6+), pure DOM manipulation, zero external frameworks (No React, Angular, Vue, jQuery, or Node.js).
* **Storage:** Client-side HTML5 `localStorage` with in-memory fallback.
* **Vector Graphics:** Scalable SVG sprite (`<use href="#icon-...">`) and inline procedural SVG chart generators.

### Architectural Principles
* **Single Page Application (SPA):** Seamless view switching via `navigateTo(viewId)` with zero full-page reloads.
* **Responsive Fluid Grid:** Responsive breakpoints at `1024px`, `860px`, and `768px` ensuring pristine usability on phones, tablets, POS terminals, and wide desktop displays.
* **Resilient Failovers:** Every image tag implements `onerror="Utils.handleImageError(this, 'fallback.svg')"` to guarantee that missing network connections never produce broken layout artifacts.

---

## 6. Directory Structure

```
Resturant Management System/
│
├── index.html                   # Master application entry point (Auth Screen & Admin SPA)
│
├── css/
│   ├── variables.css            # Centralized design tokens (:root color, spacing, typography)
│   ├── components.css           # Reusable UI component system, cards, forms, tables, modals
│   └── style.css                # Shell layouts, responsive grids, and media queries
│
├── js/
│   ├── data.js                  # Central data store (Auth, Menu, Orders, Tables, CRM, Stock)
│   ├── storage.js               # Safe LocalStorage wrapper with in-memory failover
│   ├── utils.js                 # Currency formatters, icon helper, Toast engine, Modal manager
│   └── app.js                   # Application bootstrap, Auth engine, Router & View controllers
│
├── assets/
│   ├── images/
│   │   ├── momo-fallback.svg    # Local vector illustration: Steamed Jhol Momo
│   │   ├── thakali-fallback.svg # Local vector illustration: Royal Thakali Thali
│   │   ├── sekuwa-fallback.svg  # Local vector illustration: Charcoal Sekuwa
│   │   ├── chowmein-fallback.svg# Local vector illustration: Himalayan Chowmein
│   │   ├── beverage-fallback.svg# Local vector illustration: Masala Chiya
│   │   ├── ambiance-fallback.svg# Local vector illustration: Bistro Ambiance
│   │   └── dish-placeholder.svg# Universal culinary fallback placeholder
│   │
│   ├── icons/
│   │   └── icons.svg            # Master SVG icon sprite library
│   │
│   └── logo/
│       ├── himalayan-bistro-mark.svg # Geometric brand emblem (Twin peaks & cloche)
│       ├── himalayan-bistro-logo.svg # Full horizontal brand lockup with typography
│       └── favicon.svg               # Scalable browser favicon
│
├── README.md                    # Comprehensive technical documentation
└── .gitignore                   # Version control exclusions
```

---

## 7. Installation & Local Setup

Because this project requires **no database, no compiler, and no backend server**, setup is instantaneous:

### Option 1: Direct Double-Click (Zero Setup)
Simply navigate to the project directory on your computer and double-click `index.html`. It will open in Google Chrome, Microsoft Edge, Mozilla Firefox, or Apple Safari and run completely offline!

### Option 2: Local HTTP Server (Recommended for Developers)
You can run a lightweight local static server using Python or Node:

```bash
# Using Python 3:
python -m http.server 8000

# Using Node (npx):
npx serve .
```

Then open your browser and navigate to:
```
http://localhost:8000
```

---

## 8. GitHub Pages Deployment Instructions

This repository is pre-configured for instant zero-configuration hosting on **GitHub Pages**.

### Step-by-Step Deployment:
1. **Create a GitHub Repository:**
   * Go to [GitHub](https://github.com/) and click **New Repository**.
   * Name your repository (e.g., `himalayan-bistro-rms`).
   * Keep it **Public** and do not add a default README (you already have this one).
2. **Push the Project Files:**
   Open terminal / command prompt in the project root:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Himalayan Bistro restaurant management system"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. **Enable GitHub Pages:**
   * On your GitHub repository page, click the **Settings** tab.
   * In the left navigation menu, click **Pages** (under the "Code and automation" section).
   * Under **Build and deployment**:
     * **Source:** Select `Deploy from a branch`.
     * **Branch:** Select `main` from the dropdown.
     * **Folder:** Leave as `/ (root)`.
     * Click **Save**.
4. **Access the Deployed Application:**
   * Within 60 seconds, GitHub Pages will deploy your site.
   * Your live application will be accessible at:
     ```
     https://<your-username>.github.io/<your-repo-name>/
     ```
   * All relative links, SVGs, and scripts will load immediately with zero configuration!

---

## 9. Verification & Testing Results

| Test Category | Test Case | Status | Verified Behavior |
| :--- | :--- | :---: | :--- |
| **Authentication** | Demo Pill Autofill | ✅ PASS | Clicking Admin/Manager/Cashier populates credentials instantly. |
| **Authentication** | Password Show/Hide | ✅ PASS | Eye icon toggles field type between password and text. |
| **Authentication** | Invalid Login Trap | ✅ PASS | Unmatched passwords trigger the animated alert box. |
| **Authentication** | Session Persistence | ✅ PASS | Reloading the browser preserves the active staff profile. |
| **Authentication** | Session Logout | ✅ PASS | Clicking Sign Out clears storage and returns to the login screen. |
| **Navigation** | SPA View Routing | ✅ PASS | All 10 views switch without page reloads; breadcrumbs update dynamically. |
| **Navigation** | Mobile Navigation | ✅ PASS | Sidebar collapses to drawer; hamburger button opens overlay. |
| **Dashboard** | Revenue Chart | ✅ PASS | SVG curve renders smoothly; hover tracking displays active tooltips. |
| **Dashboard** | Period Toggle | ✅ PASS | Switching Today / Week / Month redraws chart data accurately. |
| **POS Terminal** | Live Order Dispatch | ✅ PASS | Adding items calculates subtotal, 13% VAT, and pushes to Orders. |
| **Orders Board** | Status Progression | ✅ PASS | Advancing status from Preparing -> Ready -> Served updates cards. |
| **Table Layout** | Status Toggling | ✅ PASS | Clicking any table rotates status (Available -> Occupied -> Reserved). |
| **Inventory** | Herb Restock | ✅ PASS | Clicking "+ Restock" adds 5 units and clears low-stock alerts. |
| **Asset Safety** | Image Failovers | ✅ PASS | Disconnecting network triggers local vector SVG backups without broken icons. |
| **Console Quality** | Zero Errors | ✅ PASS | Clean browser console with custom branded initialization log. |

---

## 10. Known Limitations & Future Enhancements

### Known Limitations
* **Client-Side Persistence:** Session state, inventory adjustments, and submitted orders persist in browser `localStorage`. Clearing browser cookies or switching devices will reset the data to initial defaults.
* **Simulated Thermal Printing:** Bill and receipt generation triggers simulated print previews (`window.print()`) rather than direct ESC/POS hardware serial ports.
* **Single Device Multi-Tenancy:** Simultaneous multi-device collaboration is simulated through the role switcher; real-time multi-tablet synchronization requires WebSockets.

### Future Enhancements (Phase 8+ Roadmap)
* **WebSockets Synchronizer:** Real-time bi-directional synchronization between the POS counter and kitchen tablets.
* **Thermal Receipt ESC/POS WebUSB:** Direct Bluetooth/USB thermal receipt printer integration.
* **QR Code Table Ordering:** Dynamic guest mobile menu ordering via QR codes placed on physical tables.
* **Multi-Branch Support:** Enterprise switching between multiple bistro locations across Kathmandu and Pokhara.

---

## 11. Authors & Internship Acknowledgements

* **Project:** Himalayan Bistro Restaurant Management System
* **Curator:** Senior UI/UX Architect & Frontend Engineer
* **Target Delivery:** Professional Internship Demonstration
* **Copyright:** © 2026 Himalayan Bistro. All Rights Reserved. Built with pride for Himalayan hospitality.
