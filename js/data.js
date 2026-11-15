/**
 * ==============================================================================
 * HIMALAYAN BISTRO — RESTAURANT MANAGEMENT SYSTEM
 * Complete Operational Data Store: Auth, POS, Tables, Orders, CRM, Inventory & Staff
 * ==============================================================================
 */

const BrandData = {
  brand: {
    name: "Himalayan Bistro",
    nepaliName: "हिमालयन बिस्ट्रो",
    tagline: "Authentic Himalayan Flavors • Contemporary Dining & Management",
    version: "2.5.0-final",
    concept: "Merging the time-honored culinary heritage of the Himalayas with a contemporary, high-efficiency restaurant management engine.",
    established: 2026,
    currency: "NPR",
    currencySymbol: "Rs.",
    shift: "Dinner Rush Shift (18:00 - 23:00)",
    vatNumber: "PAN 601948271",
    address: "Mandala Street, Thamel, Kathmandu, Nepal",
    phone: "+977 1 4268900",
    email: "manager@himalayanbistro.com"
  },

  /* Frontend Demo Authentication Users */
  demoUsers: [
    {
      id: "usr-admin",
      email: "admin@himalayanbistro.com",
      password: "bistro2026",
      name: "Sunita Karmacharya",
      role: "Administrator",
      initials: "SK",
      shift: "Evening Lead",
      pin: "2026"
    },
    {
      id: "usr-manager",
      email: "manager@himalayanbistro.com",
      password: "manager2026",
      name: "Rohan Manandhar",
      role: "Floor Manager",
      initials: "RM",
      shift: "Dinner Shift",
      pin: "1122"
    },
    {
      id: "usr-cashier",
      email: "cashier@himalayanbistro.com",
      password: "pos2026",
      name: "Anish Tuladhar",
      role: "Lead Cashier",
      initials: "AT",
      shift: "POS Counter 1",
      pin: "3344"
    }
  ],

  /* Operational Sidebar Navigation (Strictly Functional Management Modules) */
  navigationItems: [
    { id: "dashboard", label: "Dashboard", icon: "icon-dashboard", badge: null },
    { id: "pos", label: "POS Terminal", icon: "icon-orders", badge: "Live" },
    { id: "orders", label: "Orders", icon: "icon-receipt", badge: "7 New" },
    { id: "menu", label: "Menu", icon: "icon-utensils", badge: "6 Items" },
    { id: "tables", label: "Tables", icon: "icon-table", badge: "8/12" },
    { id: "customers", label: "Customers", icon: "icon-customers", badge: "386" },
    { id: "inventory", label: "Inventory", icon: "icon-package", badge: "2 Low" },
    { id: "staff", label: "Staff", icon: "icon-users", badge: "8 Duty" },
    { id: "reports", label: "Reports", icon: "icon-reports", badge: "VAT" },
    { id: "settings", label: "Settings", icon: "icon-settings", badge: null }
  ],

  /* Centralized Color Tokens for System Reference */
  colorTokens: [
    { category: "Brand Primary", name: "Saffron Flame", token: "--color-primary", hex: "#D9531E", role: "Primary action buttons, brand accents" },
    { category: "Brand Secondary", name: "Himalayan Brass", token: "--color-secondary", hex: "#D4A359", role: "Thali-inspired gold, secondary actions" },
    { category: "Himalayan Slate", name: "Obsidian Deep", token: "--color-slate-900", hex: "#0F141C", role: "Main dark background, shell structure" },
    { category: "Himalayan Slate", name: "Sidebar Night", token: "--color-sidebar", hex: "#11161F", role: "Navigation sidebar" },
    { category: "Canvas & Surface", name: "Workspace Canvas", token: "--color-background", hex: "#F4F6F9", role: "Low eye-strain operational canvas" },
    { category: "Canvas & Surface", name: "Pure Surface", token: "--color-surface", hex: "#FFFFFF", role: "Card & sheet background" },
    { category: "Status", name: "Mountain Herb (Success)", token: "--color-success", hex: "#10B981", role: "Available tables, completed orders" },
    { category: "Status", name: "Mustard Gold (Warning)", token: "--color-warning", hex: "#F59E0B", role: "Kitchen preparing, low inventory" },
    { category: "Status", name: "Timur Chili (Danger)", token: "--color-danger", hex: "#EF4444", role: "Occupied tables, critical alerts" },
    { category: "Status", name: "Glacier Blue (Info)", token: "--color-info", hex: "#3B82F6", role: "Dine-in status, announcements" }
  ],

  /* Culinary Menu Catalog with Authentic Nepali Imagery & Fallbacks */
  cuisineCatalog: [
    {
      id: "dish-01",
      name: "Steamed Jhol Momo",
      nepaliName: "झोल मोमो",
      category: "Momo",
      price: 380,
      spiceLevel: "medium",
      prepTime: "15 min",
      rating: 4.9,
      tags: ["Signature", "Bestseller"],
      description: "Handcrafted chicken dumplings bathed in roasted sesame, tomato, and Timur pepper soup.",
      imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "assets/images/momo-fallback.svg",
      available: true
    },
    {
      id: "dish-02",
      name: "Royal Thakali Thali Set",
      nepaliName: "थकाली खाना सेट",
      category: "Mains",
      price: 650,
      spiceLevel: "medium",
      prepTime: "20 min",
      rating: 5.0,
      tags: ["Authentic", "Complete Feast"],
      description: "Brass platter with Basmati rice, wild Jimbu black dal, mustard greens, gundruk achar, and tender mutton curry.",
      imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "assets/images/thakali-fallback.svg",
      available: true
    },
    {
      id: "dish-03",
      name: "Charcoal Sekuwa Skewers",
      nepaliName: "पोलेको सेकुवा",
      category: "Grill",
      price: 490,
      spiceLevel: "hot",
      prepTime: "18 min",
      rating: 4.8,
      tags: ["Wood Fired", "Spicy"],
      description: "Tender chunks of meat marinated in ginger, garlic, mustard oil, and mountain Timur, chargrilled on skewers.",
      imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "assets/images/sekuwa-fallback.svg",
      available: true
    },
    {
      id: "dish-04",
      name: "Himalayan Street Chowmein",
      nepaliName: "हिमालयन चाउमिन",
      category: "Noodles",
      price: 320,
      spiceLevel: "medium",
      prepTime: "12 min",
      rating: 4.7,
      tags: ["Wok Tossed", "Quick Serve"],
      description: "High-heat wok-tossed noodles with crunchy julienned vegetables, scallions, and savory mountain sauce.",
      imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "assets/images/chowmein-fallback.svg",
      available: true
    },
    {
      id: "dish-05",
      name: "Clay Pot Masala Chiya",
      nepaliName: "मट्का मसला चिया",
      category: "Beverages",
      price: 150,
      spiceLevel: "mild",
      prepTime: "8 min",
      rating: 4.9,
      tags: ["Hot Beverage", "Earthy"],
      description: "Full cream mountain milk slow-simmered with Ilam tea leaves, cardamom, cinnamon, and fresh ginger.",
      imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "assets/images/beverage-fallback.svg",
      available: true
    },
    {
      id: "dish-06",
      name: "Kothey Pan-Fried Momo",
      nepaliName: "कोथे मोमो",
      category: "Momo",
      price: 420,
      spiceLevel: "medium",
      prepTime: "16 min",
      rating: 4.8,
      tags: ["Crispy Bottom", "Chef Special"],
      description: "Half-steamed, half pan-crisped dumplings served with fiery roasted tomato and garlic achar dip.",
      imageUrl: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "assets/images/momo-fallback.svg",
      available: true
    }
  ],

  /* Live Dashboard Telemetry & Multi-Period Revenue Metrics */
  dashboardData: {
    kpis: {
      totalRevenue: 184520,
      revenueTrend: "+16.4%",
      totalOrders: 142,
      ordersTrend: "+12.1%",
      activeTables: 8,
      totalTables: 12,
      occupancyRate: "66.7%",
      totalCustomers: 386,
      customersTrend: "+18.5%",
      pendingOrders: 7,
      kitchenQueue: "3 Cooking • 4 In Queue",
      avgOrderValue: 1299.44,
      aovTrend: "+3.8%"
    },

    revenueCharts: {
      today: {
        labels: ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
        revenue: [8500, 16200, 24800, 14200, 9600, 11400, 18900, 28400, 31200, 15800, 5520, 0],
        orders: [7, 13, 19, 11, 7, 9, 14, 22, 25, 12, 3, 0]
      },
      weekly: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        revenue: [142000, 158000, 164500, 172000, 198000, 224500, 184520],
        orders: [110, 124, 128, 134, 156, 178, 142]
      },
      monthly: {
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
        revenue: [3450000, 3820000, 4120000, 3950000, 4280000, 4610000, 4890000],
        orders: [2700, 3010, 3240, 3100, 3350, 3620, 3840]
      }
    },

    categorySales: [
      { name: "Thakali Khana Sets", amount: 62350, percentage: 33.8, count: 96, color: "#D4A359" },
      { name: "Momo Specialties", amount: 58400, percentage: 31.6, count: 124, color: "#D9531E" },
      { name: "Charcoal Sekuwa & Grills", amount: 32830, percentage: 17.8, count: 67, color: "#F43F5E" },
      { name: "Wok Chowmein & Noodles", amount: 18240, percentage: 9.9, count: 57, color: "#3B82F6" },
      { name: "Beverages & Spiced Chiya", amount: 12700, percentage: 6.9, count: 85, color: "#10B981" }
    ],

    popularItems: [
      { rank: 1, name: "Steamed Jhol Momo", nepaliName: "झोल मोमो", category: "Momo", ordersCount: 124, revenue: 47120, rating: 4.9, image: "assets/images/momo-fallback.svg" },
      { rank: 2, name: "Royal Thakali Thali Set", nepaliName: "थकाली खाना सेट", category: "Mains", ordersCount: 96, revenue: 62400, rating: 5.0, image: "assets/images/thakali-fallback.svg" },
      { rank: 3, name: "Charcoal Sekuwa Skewers", nepaliName: "पोलेको सेकुवा", category: "Grill", ordersCount: 67, revenue: 32830, rating: 4.8, image: "assets/images/sekuwa-fallback.svg" },
      { rank: 4, name: "Himalayan Street Chowmein", nepaliName: "हिमालयन चाउमिन", category: "Noodles", ordersCount: 57, revenue: 18240, rating: 4.7, image: "assets/images/chowmein-fallback.svg" },
      { rank: 5, name: "Clay Pot Masala Chiya", nepaliName: "मट्का मसला चिया", category: "Beverages", ordersCount: 85, revenue: 12750, rating: 4.9, image: "assets/images/beverage-fallback.svg" }
    ],

    recentTransactions: [
      { id: "HB-1048", table: "Table 04", customer: "Tenzing Norbu", pax: 4, items: "2x Jhol Momo, 1x Thakali Thali, 2x Chiya", amount: 1710, paymentMethod: "Fonepay QR", status: "Preparing", time: "3 min ago", server: "Sunita K." },
      { id: "HB-1047", table: "Table 01", customer: "Dr. Anil Shakya", pax: 2, items: "2x Charcoal Sekuwa, 1x Chowmein", amount: 1300, paymentMethod: "Credit Card", status: "Preparing", time: "8 min ago", server: "Anish T." },
      { id: "HB-1046", table: "Table 06", customer: "Maya Gurung", pax: 5, items: "4x Thakali Thali, 4x Chiya, 1x Momo", amount: 3580, paymentMethod: "Cash", status: "Ready", time: "14 min ago", server: "Rohan M." },
      { id: "HB-1045", table: "Table 03", customer: "Pasang Sherpa", pax: 4, items: "3x Jhol Momo, 2x Sekuwa", amount: 2120, paymentMethod: "Fonepay QR", status: "Served", time: "21 min ago", server: "Sunita K." },
      { id: "HB-1044", table: "Table 08", customer: "Rajesh Shrestha", pax: 2, items: "1x Thakali Thali, 1x Chowmein", amount: 970, paymentMethod: "Debit Card", status: "Completed", time: "35 min ago", server: "Anish T." },
      { id: "HB-1043", table: "Takeaway #12", customer: "Sabina Pradhan", pax: 1, items: "3x Jhol Momo, 1x Sekuwa", amount: 1630, paymentMethod: "Cash", status: "Completed", time: "48 min ago", server: "Counter" },
      { id: "HB-1042", table: "Table 02", customer: "Dawa Lama", pax: 3, items: "2x Thakali Thali, 2x Chiya", amount: 1600, paymentMethod: "Credit Card", status: "Completed", time: "1h 12m ago", server: "Rohan M." },
      { id: "HB-1041", table: "Table 05", customer: "Bikash Rai", pax: 2, items: "2x Chowmein, 2x Chiya", amount: 940, paymentMethod: "Fonepay QR", status: "Completed", time: "1h 26m ago", server: "Sunita K." }
    ],

    orderStatusSummary: {
      completed: { count: 121, percentage: 85.2, label: "Completed Orders" },
      preparing: { count: 12, percentage: 8.5, label: "In Kitchen Queue" },
      ready: { count: 6, percentage: 4.2, label: "Ready to Serve" },
      cancelled: { count: 3, percentage: 2.1, label: "Voided / Cancelled" }
    }
  },

  /* 12-Table Floor Plan Model */
  tablesData: [
    { id: "T-01", name: "Table 01", capacity: 2, location: "Window Alcove", status: "occupied", guests: 2, server: "Sunita K.", elapsed: "28m", orderTotal: 1300 },
    { id: "T-02", name: "Table 02", capacity: 4, location: "Main Hall", status: "available", guests: 0, server: "-", elapsed: "-", orderTotal: 0 },
    { id: "T-03", name: "Table 03", capacity: 4, location: "Main Hall", status: "reserved", guests: 4, server: "Rohan M.", elapsed: "In 15m", orderTotal: 0 },
    { id: "T-04", name: "Table 04", capacity: 6, location: "Royal Booth", status: "occupied", guests: 5, server: "Sunita K.", elapsed: "42m", orderTotal: 1710 },
    { id: "T-05", name: "Table 05", capacity: 2, location: "Window Alcove", status: "available", guests: 0, server: "-", elapsed: "-", orderTotal: 0 },
    { id: "T-06", name: "Table 06", capacity: 8, location: "Family Dining", status: "occupied", guests: 7, server: "Rohan M.", elapsed: "14m", orderTotal: 3580 },
    { id: "T-07", name: "Table 07", capacity: 4, location: "Patio Terrace", status: "occupied", guests: 4, server: "Anish T.", elapsed: "35m", orderTotal: 2450 },
    { id: "T-08", name: "Table 08", capacity: 2, location: "Patio Terrace", status: "bill_pending", guests: 2, server: "Anish T.", elapsed: "55m", orderTotal: 970 },
    { id: "T-09", name: "Table 09", capacity: 4, location: "Main Hall", status: "available", guests: 0, server: "-", elapsed: "-", orderTotal: 0 },
    { id: "T-10", name: "Table 10", capacity: 6, location: "Royal Booth", status: "occupied", guests: 6, server: "Sunita K.", elapsed: "18m", orderTotal: 4120 },
    { id: "T-11", name: "Table 11", capacity: 4, location: "Main Hall", status: "reserved", guests: 3, server: "Rohan M.", elapsed: "In 30m", orderTotal: 0 },
    { id: "T-12", name: "Table 12", capacity: 8, location: "Private Lounge", status: "available", guests: 0, server: "-", elapsed: "-", orderTotal: 0 }
  ],

  /* Customer CRM Guest Directory */
  customersData: [
    { id: "CUST-101", name: "Tenzing Norbu", phone: "+977 9801234567", tier: "Gold VIP", visits: 24, totalSpend: 48200, favoriteDish: "Steamed Jhol Momo", lastVisit: "Today" },
    { id: "CUST-102", name: "Maya Gurung", phone: "+977 9841890234", tier: "Platinum VIP", visits: 38, totalSpend: 84500, favoriteDish: "Royal Thakali Thali", lastVisit: "Today" },
    { id: "CUST-103", name: "Dr. Anil Shakya", phone: "+977 9851098765", tier: "Silver", visits: 14, totalSpend: 29400, favoriteDish: "Charcoal Sekuwa", lastVisit: "Today" },
    { id: "CUST-104", name: "Pasang Sherpa", phone: "+977 9813456789", tier: "Gold VIP", visits: 19, totalSpend: 38900, favoriteDish: "Steamed Jhol Momo", lastVisit: "Today" },
    { id: "CUST-105", name: "Sabina Pradhan", phone: "+977 9860123987", tier: "Regular", visits: 6, totalSpend: 11200, favoriteDish: "Himalayan Chowmein", lastVisit: "Today" },
    { id: "CUST-106", name: "Rajesh Shrestha", phone: "+977 9849876543", tier: "Silver", visits: 11, totalSpend: 21500, favoriteDish: "Royal Thakali Thali", lastVisit: "Yesterday" },
    { id: "CUST-107", name: "Dawa Lama", phone: "+977 9803456712", tier: "Regular", visits: 8, totalSpend: 16800, favoriteDish: "Clay Pot Masala Chiya", lastVisit: "2 days ago" },
    { id: "CUST-108", name: "Bikash Rai", phone: "+977 9812987654", tier: "Regular", visits: 5, totalSpend: 9400, favoriteDish: "Himalayan Chowmein", lastVisit: "3 days ago" }
  ],

  /* Himalayan Herb & Ingredient Inventory Model */
  inventoryData: [
    { id: "INV-01", name: "Wild Jimbu Herb", nepaliName: "जिम्बु", category: "Spices", stockQty: 1.2, unit: "kg", threshold: 0.5, status: "in_stock", costPerUnit: 2400 },
    { id: "INV-02", name: "Himalayan Timur Pepper", nepaliName: "टिमुर", category: "Spices", stockQty: 0.35, unit: "kg", threshold: 0.5, status: "low_stock", costPerUnit: 1800 },
    { id: "INV-03", name: "Fermented Gundruk Leaves", nepaliName: "गुन्द्रुक", category: "Fermented", stockQty: 2.8, unit: "kg", threshold: 1.0, status: "in_stock", costPerUnit: 650 },
    { id: "INV-04", name: "Aromatic Basmati Rice", nepaliName: "बासमती चामल", category: "Grains", stockQty: 85, unit: "kg", threshold: 25, status: "in_stock", costPerUnit: 160 },
    { id: "INV-05", name: "Pure Mountain Cow Ghee", nepaliName: "शुद्ध घिउ", category: "Dairy", stockQty: 4.5, unit: "kg", threshold: 2.0, status: "in_stock", costPerUnit: 1200 },
    { id: "INV-06", name: "Organic Chicken Mince", nepaliName: "कुखुराको किमा", category: "Poultry", stockQty: 14.0, unit: "kg", threshold: 5.0, status: "in_stock", costPerUnit: 520 },
    { id: "INV-07", name: "Mountain Mutton Curry Cuts", nepaliName: "खसीको मासु", category: "Meat", stockQty: 3.2, unit: "kg", threshold: 4.0, status: "low_stock", costPerUnit: 1350 },
    { id: "INV-08", name: "CTC Ilam Black Tea", nepaliName: "इलाम चियापत्ती", category: "Beverages", stockQty: 8.5, unit: "kg", threshold: 2.0, status: "in_stock", costPerUnit: 850 },
    { id: "INV-09", name: "Green Cardamom Pods", nepaliName: "सुकुमेल", category: "Spices", stockQty: 1.8, unit: "kg", threshold: 0.5, status: "in_stock", costPerUnit: 3800 },
    { id: "INV-10", name: "Fresh Mustard Greens (Saag)", nepaliName: "रायोको साग", category: "Produce", stockQty: 6.0, unit: "kg", threshold: 3.0, status: "in_stock", costPerUnit: 120 }
  ],

  /* Staff Duty Roster & Shifts Model */
  staffData: [
    { id: "STF-01", name: "Sunita Karmacharya", role: "Administrator & Floor Lead", shift: "Evening Peak", status: "on_duty", phone: "+977 9801122334", avatar: "SK" },
    { id: "STF-02", name: "Kazi Sherpa", role: "Executive Head Chef", shift: "Kitchen Brigade", status: "on_duty", phone: "+977 9841223344", avatar: "KS" },
    { id: "STF-03", name: "Rohan Manandhar", role: "Dining Floor Manager", shift: "Dinner Shift", status: "on_duty", phone: "+977 9851334455", avatar: "RM" },
    { id: "STF-04", name: "Pemba Lama", role: "Sous Chef (Grill & Sekuwa)", shift: "Kitchen Brigade", status: "on_duty", phone: "+977 9813445566", avatar: "PL" },
    { id: "STF-05", name: "Anish Tuladhar", role: "Lead POS Cashier", shift: "Front Counter 1", status: "on_duty", phone: "+977 9860556677", avatar: "AT" },
    { id: "STF-06", name: "Dikila Tamang", role: "Senior Table Server", shift: "Main Hall", status: "on_duty", phone: "+977 9849667788", avatar: "DT" },
    { id: "STF-07", name: "Suman Maharjan", role: "Table Server", shift: "Patio Terrace", status: "on_break", phone: "+977 9803778899", avatar: "SM" },
    { id: "STF-08", name: "Nima Bhutia", role: "Kitchen Steward / Porter", shift: "Kitchen Brigade", status: "on_duty", phone: "+977 9812889900", avatar: "NB" }
  ],

  /* System Configuration Defaults */
  settingsData: {
    restaurantName: "Himalayan Bistro",
    nepaliName: "हिमालयन बिस्ट्रो",
    tagline: "Authentic Himalayan Flavors • Contemporary Dining & Management",
    address: "Mandala Street, Thamel, Kathmandu, Nepal",
    phone: "+977 1 4268900",
    email: "contact@himalayanbistro.com",
    vatPanNumber: "601948271",
    vatPercentage: 13,
    serviceChargePercentage: 10,
    currencyCode: "NPR",
    currencySymbol: "Rs.",
    soundAlerts: true,
    autoPrintKDS: true,
    tableCount: 12
  }
};

// Export to window for global modular vanilla access
if (typeof window !== 'undefined') {
  window.BrandData = BrandData;
}
