/**
 * ==============================================================================
 * HIMALAYAN BISTRO — RESTAURANT MANAGEMENT SYSTEM
 * Phase 7: Final Polish — Complete Application Controller & Operational Modules
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log(
    '%c🏔️ HIMALAYAN BISTRO — RESTAURANT MANAGEMENT SYSTEM',
    'background: #D9531E; color: #FFFFFF; font-weight: bold; font-size: 14px; padding: 6px 12px; border-radius: 4px;'
  );
  console.log(
    '%cPhase 7: Final Polish & Full Commercial Operations Active.',
    'color: #D4A359; font-weight: 600;'
  );

  initAuth();
  initShellNavigation();
  initRouter();
  renderDashboard();
  renderPOS();
  renderOrders();
  renderMenu();
  renderTables();
  renderCustomers();
  renderInventory();
  renderStaff();
  renderReports();
  renderSettings();
});

/**
 * ==============================================================================
 * 1. AUTHENTICATION & LOGIN CONTROLLER
 * ==============================================================================
 */
let currentUser = null;

function initAuth() {
  const loginScreen = document.getElementById('loginScreen');
  const adminAppShell = document.getElementById('adminAppShell');
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const passwordToggleBtn = document.getElementById('passwordToggleBtn');
  const rememberMeCheck = document.getElementById('loginRememberMe');
  const authAlertBox = document.getElementById('authAlertBox');
  const authAlertMsg = document.getElementById('authAlertMsg');

  // Check saved session in Storage
  const savedUser = Storage.get('auth_user');
  if (savedUser) {
    currentUser = savedUser;
    applyUserProfile(currentUser);
    showAdminApp();
  } else {
    showLoginScreen();
  }

  // Password Show / Hide toggle
  if (passwordToggleBtn && passwordInput) {
    passwordToggleBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      passwordToggleBtn.innerHTML = Utils.getIcon(isPassword ? 'icon-eye-off' : 'icon-eye');
      passwordToggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });
  }

  // Demo Credentials Pills Click-to-Fill
  const demoPills = document.querySelectorAll('.demo-pill-btn');
  demoPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const email = pill.getAttribute('data-email');
      const pass = pill.getAttribute('data-pass');
      if (emailInput) emailInput.value = email;
      if (passwordInput) passwordInput.value = pass;
      if (authAlertBox) authAlertBox.classList.remove('is-active');

      Toast.info('Credentials Applied', `Ready to sign in as ${pill.querySelector('strong').textContent}`);
    });
  });

  // Handle Login Form Submit
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
      const password = passwordInput ? passwordInput.value : '';

      if (authAlertBox) authAlertBox.classList.remove('is-active');

      if (!email || !password) {
        showAuthError('Please enter both email address and staff password.');
        return;
      }

      const matchedUser = BrandData.demoUsers.find(
        u => u.email.toLowerCase() === email && u.password === password
      );

      if (matchedUser) {
        currentUser = matchedUser;
        Storage.set('auth_user', matchedUser);
        applyUserProfile(currentUser);
        showAdminApp();

        Toast.success(
          `Welcome, ${currentUser.name}!`,
          `Signed in as ${currentUser.role} (${currentUser.shift})`
        );

        navigateTo('dashboard');
      } else {
        showAuthError('Invalid credentials. Please click a Demo User pill above.');
        if (passwordInput) passwordInput.focus();
      }
    });
  }

  // Logout Actions
  const logoutButtons = document.querySelectorAll('.action-logout-btn');
  logoutButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleLogout();
    });
  });

  function showAuthError(msg) {
    if (authAlertBox && authAlertMsg) {
      authAlertMsg.textContent = msg;
      authAlertBox.classList.add('is-active');
    }
  }

  function showLoginScreen() {
    if (loginScreen) loginScreen.classList.remove('is-hidden');
    if (adminAppShell) adminAppShell.style.display = 'none';
  }

  function showAdminApp() {
    if (loginScreen) loginScreen.classList.add('is-hidden');
    if (adminAppShell) adminAppShell.style.display = 'flex';
  }

  function handleLogout() {
    Storage.remove('auth_user');
    currentUser = null;
    showLoginScreen();
    Toast.info('Logged Out', 'Staff session safely ended. Please sign in to resume.');
  }

  function applyUserProfile(user) {
    const userAvatarEls = document.querySelectorAll('.user-avatar-text');
    const userNameEls = document.querySelectorAll('.user-name-text');
    const userRoleEls = document.querySelectorAll('.user-role-text');
    const shiftPillEl = document.getElementById('currentShiftBadge');

    userAvatarEls.forEach(el => el.textContent = user.initials || 'HB');
    userNameEls.forEach(el => el.textContent = user.name || 'Staff User');
    userRoleEls.forEach(el => el.textContent = user.role || 'Staff Member');
    if (shiftPillEl) shiftPillEl.textContent = `${user.shift} • Online`;
  }
}

/**
 * ==============================================================================
 * 2. SPA ROUTING & NAVIGATION
 * ==============================================================================
 */
let currentView = 'dashboard';

function initRouter() {
  const navLinks = document.querySelectorAll('.sidebar-nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetView = this.getAttribute('data-view');
      if (targetView) {
        navigateTo(targetView);
      }
    });
  });

  // Restore saved view or default to dashboard
  let savedView = Storage.get('active_view', 'dashboard');
  if (savedView === 'design-system') savedView = 'dashboard';
  navigateTo(savedView);
}

function navigateTo(viewId) {
  if (viewId === 'design-system') viewId = 'dashboard';
  currentView = viewId;
  Storage.set('active_view', viewId);

  // Update Sidebar Active Class
  const navLinks = document.querySelectorAll('.sidebar-nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('data-view') === viewId) {
      link.classList.add('is-active');
    } else {
      link.classList.remove('is-active');
    }
  });

  // Update Breadcrumbs
  updateBreadcrumbs(viewId);

  // Toggle View Panels
  const panels = document.querySelectorAll('.view-panel');
  panels.forEach(p => p.classList.remove('is-active'));

  const activePanel = document.getElementById(`view-${viewId}`);
  if (activePanel) {
    activePanel.classList.add('is-active');
  }

  // Close Mobile Drawer
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  if (window.innerWidth <= 768 && sidebar && sidebarOverlay) {
    sidebar.classList.remove('is-open');
    sidebarOverlay.classList.remove('is-active');
  }

  // Trigger View Renders
  switch (viewId) {
    case 'dashboard': renderDashboard(); break;
    case 'pos': renderPOS(); break;
    case 'orders': renderOrders(); break;
    case 'menu': renderMenu(); break;
    case 'tables': renderTables(); break;
    case 'customers': renderCustomers(); break;
    case 'inventory': renderInventory(); break;
    case 'staff': renderStaff(); break;
    case 'reports': renderReports(); break;
    case 'settings': renderSettings(); break;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateBreadcrumbs(viewId) {
  const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
  if (!breadcrumbCurrent) return;

  const viewNames = {
    'dashboard': 'Dashboard & Overview',
    'pos': 'POS Terminal',
    'orders': 'Orders Management',
    'menu': 'Culinary Menu',
    'tables': 'Table Floor Plan',
    'customers': 'Guest CRM',
    'inventory': 'Inventory & Stock',
    'staff': 'Staff Duty Roster',
    'reports': 'Financial & VAT Reports',
    'settings': 'System Settings'
  };

  breadcrumbCurrent.textContent = viewNames[viewId] || 'Overview';
}

function initShellNavigation() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  if (sidebarToggle && sidebar && sidebarOverlay) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('is-open');
      sidebarOverlay.classList.toggle('is-active');
    });

    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('is-open');
      sidebarOverlay.classList.remove('is-active');
    });
  }

  // Global Header Search Listener
  const globalSearchInput = document.getElementById('globalSearchInput');
  if (globalSearchInput) {
    globalSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (currentView === 'dashboard') {
        renderRecentTransactions('all', q);
      } else if (currentView === 'pos') {
        renderPosDishes(currentPosCategory, q);
      } else if (currentView === 'menu') {
        renderMenuTable(q);
      } else if (currentView === 'customers') {
        renderCustomersTable(q);
      } else if (currentView === 'orders') {
        renderOrdersList(currentOrdersFilter, q);
      }
    });
  }
}

/**
 * ==============================================================================
 * 3. DASHBOARD RENDERING ENGINE
 * ==============================================================================
 */
let currentChartPeriod = 'today';
let currentTxFilter = 'all';

function renderDashboard() {
  renderDashboardKpis();
  renderRevenueChart(currentChartPeriod);
  renderCategorySales();
  renderPopularItems();
  renderRecentTransactions(currentTxFilter);
  renderOrderStatusSummary();
  initDashboardEvents();
}

function renderDashboardKpis() {
  const container = document.getElementById('dashboardKpisGrid');
  if (!container || !window.BrandData) return;

  const { kpis } = window.BrandData.dashboardData;

  container.innerHTML = `
    <!-- KPI 1: Total Revenue -->
    <div class="metric-card">
      <div class="metric-header">
        <span class="metric-title">Total Revenue</span>
        <div class="metric-icon-wrap" style="background-color: var(--color-primary-light); color: var(--color-primary);">
          ${Utils.getIcon('icon-trending')}
        </div>
      </div>
      <div class="metric-value">${Utils.formatCurrency(kpis.totalRevenue)}</div>
      <div class="metric-footer">
        <span class="metric-trend trend-up">↑ ${kpis.revenueTrend}</span>
        <span>vs. yesterday</span>
      </div>
    </div>

    <!-- KPI 2: Total Orders -->
    <div class="metric-card">
      <div class="metric-header">
        <span class="metric-title">Total Orders</span>
        <div class="metric-icon-wrap" style="background-color: var(--color-secondary-light); color: var(--color-secondary-active);">
          ${Utils.getIcon('icon-orders')}
        </div>
      </div>
      <div class="metric-value">${kpis.totalOrders} <span style="font-size: 0.95rem; font-weight: 500; color: var(--color-text-secondary);">Tickets</span></div>
      <div class="metric-footer">
        <span class="metric-trend trend-up">↑ ${kpis.ordersTrend}</span>
        <span>dinner rush</span>
      </div>
    </div>

    <!-- KPI 3: Active Tables -->
    <div class="metric-card">
      <div class="metric-header">
        <span class="metric-title">Active Tables</span>
        <div class="metric-icon-wrap" style="background-color: var(--color-success-bg); color: var(--color-success);">
          ${Utils.getIcon('icon-table')}
        </div>
      </div>
      <div class="metric-value">${kpis.activeTables} <span style="font-size: 0.95rem; font-weight: 500; color: var(--color-text-secondary);">/ ${kpis.totalTables} Pax</span></div>
      <div class="metric-footer">
        <span class="badge badge-success" style="padding: 2px 6px;">${kpis.occupancyRate} Occupancy</span>
        <span>4 available</span>
      </div>
    </div>

    <!-- KPI 4: Total Customers -->
    <div class="metric-card">
      <div class="metric-header">
        <span class="metric-title">Total Customers</span>
        <div class="metric-icon-wrap" style="background-color: var(--color-info-bg); color: var(--color-info);">
          ${Utils.getIcon('icon-customers')}
        </div>
      </div>
      <div class="metric-value">${kpis.totalCustomers} <span style="font-size: 0.95rem; font-weight: 500; color: var(--color-text-secondary);">Diners</span></div>
      <div class="metric-footer">
        <span class="metric-trend trend-up">↑ ${kpis.customersTrend}</span>
        <span>average party 3.2</span>
      </div>
    </div>

    <!-- KPI 5: Pending Orders -->
    <div class="metric-card">
      <div class="metric-header">
        <span class="metric-title">Pending Orders</span>
        <div class="metric-icon-wrap" style="background-color: var(--color-danger-bg); color: var(--color-danger);">
          ${Utils.getIcon('icon-flame')}
        </div>
      </div>
      <div class="metric-value">${kpis.pendingOrders} <span style="font-size: 0.95rem; font-weight: 500; color: var(--color-text-secondary);">In Queue</span></div>
      <div class="metric-footer">
        <span class="badge badge-warning" style="padding: 2px 6px;">${kpis.kitchenQueue}</span>
      </div>
    </div>

    <!-- KPI 6: Average Order Value (AOV) -->
    <div class="metric-card">
      <div class="metric-header">
        <span class="metric-title">Average Order Value</span>
        <div class="metric-icon-wrap" style="background-color: var(--color-secondary-light); color: var(--color-secondary);">
          ${Utils.getIcon('icon-receipt')}
        </div>
      </div>
      <div class="metric-value">${Utils.formatCurrency(kpis.avgOrderValue)}</div>
      <div class="metric-footer">
        <span class="metric-trend trend-up">↑ ${kpis.aovTrend}</span>
        <span>healthy margin</span>
      </div>
    </div>
  `;
}

function renderRevenueChart(period = 'today') {
  currentChartPeriod = period;
  const container = document.getElementById('revenueChartSvgBox');
  const tooltip = document.getElementById('chartInteractiveTooltip');
  if (!container || !window.BrandData) return;

  const dataset = window.BrandData.dashboardData.revenueCharts[period] || window.BrandData.dashboardData.revenueCharts.today;
  const { labels, revenue, orders } = dataset;

  const width = 800;
  const height = 280;
  const paddingLeft = 65;
  const paddingRight = 30;
  const paddingTop = 25;
  const paddingBottom = 45;

  const maxVal = Math.max(...revenue) * 1.15 || 1000;
  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;

  const points = revenue.map((val, i) => {
    const x = paddingLeft + (i / (revenue.length - 1)) * plotWidth;
    const y = height - paddingBottom - (val / maxVal) * plotHeight;
    return { x, y, val, label: labels[i], orderCount: orders[i] };
  });

  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const mx = (p0.x + p1.x) / 2;
    pathD += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
  }

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;

  const gridLevels = 4;
  let gridLinesSvg = '';
  for (let i = 0; i <= gridLevels; i++) {
    const levelVal = (maxVal / gridLevels) * i;
    const y = height - paddingBottom - (levelVal / maxVal) * plotHeight;
    gridLinesSvg += `
      <line x1="${paddingLeft}" y1="${y}" x2="${width - paddingRight}" y2="${y}" stroke="var(--color-border-light)" stroke-width="1" stroke-dasharray="4 4" />
      <text x="${paddingLeft - 10}" y="${y + 4}" font-family="var(--font-family-sans)" font-size="11" fill="var(--color-text-muted)" text-anchor="end">
        ${levelVal >= 1000 ? Math.round(levelVal / 1000) + 'k' : Math.round(levelVal)}
      </text>
    `;
  }

  let xLabelsSvg = '';
  points.forEach((pt, i) => {
    if (labels.length > 8 && i % 2 !== 0 && i !== labels.length - 1) return;
    xLabelsSvg += `
      <text x="${pt.x}" y="${height - paddingBottom + 20}" font-family="var(--font-family-sans)" font-size="11" fill="var(--color-text-secondary)" text-anchor="middle" font-weight="500">
        ${pt.label}
      </text>
    `;
  });

  let pointsSvg = points.map((pt, i) => `
    <circle class="chart-point" data-idx="${i}" cx="${pt.x}" cy="${pt.y}" r="4.5" fill="#FFFFFF" stroke="var(--color-primary)" stroke-width="2.5" style="cursor: pointer;" />
  `).join('');

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="chartRevenueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#D9531E" stop-opacity="0.32" />
          <stop offset="70%" stop-color="#D9531E" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#D9531E" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      ${gridLinesSvg}
      <line x1="${paddingLeft}" y1="${height - paddingBottom}" x2="${width - paddingRight}" y2="${height - paddingBottom}" stroke="var(--color-border)" stroke-width="1.5" />
      <path d="${areaD}" fill="url(#chartRevenueGrad)" />
      <path d="${pathD}" fill="none" stroke="var(--color-primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <line id="chartCrosshair" x1="0" y1="${paddingTop}" x2="0" y2="${height - paddingBottom}" stroke="var(--color-secondary)" stroke-width="1.5" stroke-dasharray="3 3" opacity="0" pointer-events="none" />
      <circle id="chartActivePin" cx="0" cy="0" r="7" fill="var(--color-secondary)" stroke="#FFFFFF" stroke-width="2" opacity="0" pointer-events="none" />
      ${pointsSvg}
      ${xLabelsSvg}
    </svg>
  `;

  const svgEl = container.querySelector('svg');
  const crosshair = container.querySelector('#chartCrosshair');
  const activePin = container.querySelector('#chartActivePin');

  if (svgEl && tooltip) {
    svgEl.addEventListener('mousemove', (e) => {
      const rect = svgEl.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * width;

      let nearest = points[0];
      let minDist = Math.abs(mouseX - nearest.x);
      for (let i = 1; i < points.length; i++) {
        const dist = Math.abs(mouseX - points[i].x);
        if (dist < minDist) {
          minDist = dist;
          nearest = points[i];
        }
      }

      if (minDist < 60) {
        crosshair.setAttribute('x1', nearest.x);
        crosshair.setAttribute('x2', nearest.x);
        crosshair.style.opacity = '0.85';

        activePin.setAttribute('cx', nearest.x);
        activePin.setAttribute('cy', nearest.y);
        activePin.style.opacity = '1';

        const tipX = (nearest.x / width) * rect.width;
        const tipY = (nearest.y / height) * rect.height;

        tooltip.style.left = `${tipX}px`;
        tooltip.style.top = `${tipY}px`;
        tooltip.innerHTML = `
          <div class="chart-tooltip-time">${nearest.label}</div>
          <div class="chart-tooltip-val">${Utils.formatCurrency(nearest.val)}</div>
          <div class="chart-tooltip-sub">${nearest.orderCount} Orders Completed</div>
        `;
        tooltip.classList.add('is-active');
      } else {
        crosshair.style.opacity = '0';
        activePin.style.opacity = '0';
        tooltip.classList.remove('is-active');
      }
    });

    svgEl.addEventListener('mouseleave', () => {
      if (crosshair) crosshair.style.opacity = '0';
      if (activePin) activePin.style.opacity = '0';
      if (tooltip) tooltip.classList.remove('is-active');
    });
  }
}

function renderCategorySales() {
  const container = document.getElementById('categorySalesContainer');
  if (!container || !window.BrandData) return;

  const { categorySales } = window.BrandData.dashboardData;

  container.innerHTML = categorySales.map(cat => `
    <div class="category-sales-item">
      <div class="category-sales-header">
        <span class="category-name-badge">
          <span class="category-dot" style="background-color: ${cat.color};"></span>
          <span>${cat.name}</span>
        </span>
        <div>
          <span class="category-amount-val">${Utils.formatCurrency(cat.amount)}</span>
          <span style="font-size: 11px; color: var(--color-text-muted); margin-left: 4px;">(${cat.percentage}%)</span>
        </div>
      </div>
      <div class="category-progress-track">
        <div class="category-progress-fill" style="width: ${cat.percentage}%; background-color: ${cat.color};"></div>
      </div>
    </div>
  `).join('');
}

function renderPopularItems() {
  const container = document.getElementById('popularItemsContainer');
  if (!container || !window.BrandData) return;

  const { popularItems } = window.BrandData.dashboardData;

  container.innerHTML = popularItems.map(item => {
    let rankClass = 'rank-default';
    if (item.rank === 1) rankClass = 'rank-1';
    if (item.rank === 2) rankClass = 'rank-2';
    if (item.rank === 3) rankClass = 'rank-3';

    return `
      <div class="popular-dish-row">
        <div class="popular-rank-badge ${rankClass}">#${item.rank}</div>
        <div class="popular-dish-thumb">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            loading="lazy"
            onerror="Utils.handleImageError(this, '${item.image}')"
          />
        </div>
        <div class="popular-dish-info">
          <span class="popular-dish-title">${item.name}</span>
          <span class="popular-dish-nepali">${item.nepaliName} • ${item.category}</span>
        </div>
        <div class="popular-dish-stats">
          <span class="popular-dish-orders">${item.ordersCount} orders</span>
          <span class="popular-dish-rev">${Utils.formatCurrency(item.revenue)}</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderRecentTransactions(filterStatus = 'all', searchQuery = '') {
  const tbody = document.getElementById('dashboardTransactionsBody');
  if (!tbody || !window.BrandData) return;

  const { recentTransactions } = window.BrandData.dashboardData;

  const filtered = recentTransactions.filter(tx => {
    const matchesStatus = filterStatus === 'all' || tx.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = !searchQuery || 
      tx.id.toLowerCase().includes(searchQuery) ||
      tx.customer.toLowerCase().includes(searchQuery) ||
      tx.items.toLowerCase().includes(searchQuery) ||
      tx.table.toLowerCase().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center; padding: var(--space-8); color: var(--color-text-secondary);">
          No transactions match the selected criteria.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(tx => {
    let statusBadgeClass = 'badge-neutral';
    if (tx.status === 'Preparing') statusBadgeClass = 'badge-warning';
    if (tx.status === 'Ready') statusBadgeClass = 'badge-info';
    if (tx.status === 'Served') statusBadgeClass = 'badge-secondary';
    if (tx.status === 'Completed') statusBadgeClass = 'badge-success';

    return `
      <tr>
        <td class="cell-numeric" style="color: var(--color-primary); font-weight: 700;">${tx.id}</td>
        <td style="font-weight: 600;">${tx.table}</td>
        <td>
          <div style="font-weight: 600; color: var(--color-text-primary);">${tx.customer}</div>
          <div style="font-size: 11px; color: var(--color-text-muted);">Server: ${tx.server}</div>
        </td>
        <td style="max-width: 240px; font-size: 13px;">${tx.items}</td>
        <td class="cell-numeric" style="font-weight: 700;">${Utils.formatCurrency(tx.amount)}</td>
        <td><span class="badge badge-neutral" style="font-size: 11px;">${tx.paymentMethod}</span></td>
        <td><span class="badge ${statusBadgeClass}">${tx.status}</span></td>
        <td style="color: var(--color-text-muted); font-size: 12px; white-space: nowrap;">${tx.time}</td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="viewTransactionDetail('${tx.id}')">
            View
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

window.viewTransactionDetail = function(txId) {
  const tx = window.BrandData.dashboardData.recentTransactions.find(t => t.id === txId);
  if (!tx) return;

  const modal = document.getElementById('demoModal');
  const title = document.getElementById('modalTitle');
  const body = modal.querySelector('.modal-body');

  if (modal && title && body) {
    title.textContent = `Order Details — ${tx.id}`;
    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        <div style="display: flex; justify-content: space-between; padding-bottom: var(--space-3); border-bottom: 1px solid var(--color-border-light);">
          <div>
            <div style="font-weight: 700; font-size: 16px;">${tx.customer}</div>
            <div style="font-size: 12px; color: var(--color-text-secondary);">${tx.table} • Server: ${tx.server}</div>
          </div>
          <div style="text-align: right;">
            <div class="cell-numeric" style="font-size: 18px; font-weight: 800; color: var(--color-primary);">${Utils.formatCurrency(tx.amount)}</div>
            <span class="badge badge-success">${tx.status}</span>
          </div>
        </div>

        <div>
          <div style="font-size: 11px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 6px;">Order Items:</div>
          <div style="padding: var(--space-3); background-color: var(--color-surface-subtle); border-radius: var(--radius-md); font-size: 14px; font-weight: 500;">
            ${tx.items}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-3); font-size: 13px;">
          <div><strong>Payment Channel:</strong> ${tx.paymentMethod}</div>
          <div><strong>Timestamp:</strong> ${tx.time}</div>
        </div>
      </div>
    `;
    Modal.open('demoModal');
  }
};

function renderOrderStatusSummary() {
  const container = document.getElementById('orderStatusSummaryContainer');
  if (!container || !window.BrandData) return;

  const { orderStatusSummary } = window.BrandData.dashboardData;

  container.innerHTML = `
    <div class="order-status-bar">
      <div class="order-status-segment" style="width: ${orderStatusSummary.completed.percentage}%; background-color: var(--color-success);" title="Completed: ${orderStatusSummary.completed.percentage}%"></div>
      <div class="order-status-segment" style="width: ${orderStatusSummary.preparing.percentage}%; background-color: var(--color-warning);" title="In Kitchen: ${orderStatusSummary.preparing.percentage}%"></div>
      <div class="order-status-segment" style="width: ${orderStatusSummary.ready.percentage}%; background-color: var(--color-info);" title="Ready: ${orderStatusSummary.ready.percentage}%"></div>
      <div class="order-status-segment" style="width: ${orderStatusSummary.cancelled.percentage}%; background-color: var(--color-danger);" title="Cancelled: ${orderStatusSummary.cancelled.percentage}%"></div>
    </div>

    <div class="order-status-grid">
      <div class="order-status-card">
        <span style="font-size: 11px; color: var(--color-success-text); font-weight: 600;">● Completed</span>
        <span class="order-status-card-val" style="color: var(--color-success);">${orderStatusSummary.completed.count}</span>
        <span style="font-size: 10px; color: var(--color-text-muted);">${orderStatusSummary.completed.percentage}% of shift</span>
      </div>

      <div class="order-status-card">
        <span style="font-size: 11px; color: var(--color-warning-text); font-weight: 600;">● In Kitchen</span>
        <span class="order-status-card-val" style="color: var(--color-warning);">${orderStatusSummary.preparing.count}</span>
        <span style="font-size: 10px; color: var(--color-text-muted);">${orderStatusSummary.preparing.percentage}% cooking</span>
      </div>

      <div class="order-status-card">
        <span style="font-size: 11px; color: var(--color-info-text); font-weight: 600;">● Ready to Serve</span>
        <span class="order-status-card-val" style="color: var(--color-info);">${orderStatusSummary.ready.count}</span>
        <span style="font-size: 10px; color: var(--color-text-muted);">${orderStatusSummary.ready.percentage}% at counter</span>
      </div>

      <div class="order-status-card">
        <span style="font-size: 11px; color: var(--color-danger-text); font-weight: 600;">● Cancelled / Void</span>
        <span class="order-status-card-val" style="color: var(--color-danger);">${orderStatusSummary.cancelled.count}</span>
        <span style="font-size: 10px; color: var(--color-text-muted);">${orderStatusSummary.cancelled.percentage}% void rate</span>
      </div>
    </div>
  `;
}

function initDashboardEvents() {
  const chartPeriodBtns = document.querySelectorAll('.chart-period-btn');
  chartPeriodBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      chartPeriodBtns.forEach(b => b.classList.remove('is-active'));
      this.classList.add('is-active');
      const period = this.getAttribute('data-period');
      renderRevenueChart(period);
      Toast.info('Chart Updated', `Viewing ${period.toUpperCase()} sales revenue stream.`);
    });
  });

  const txFilterBtns = document.querySelectorAll('.tx-filter-btn');
  txFilterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      txFilterBtns.forEach(b => b.classList.remove('is-active'));
      this.classList.add('is-active');
      currentTxFilter = this.getAttribute('data-status');
      renderRecentTransactions(currentTxFilter);
    });
  });

  const refreshBtn = document.getElementById('btnRefreshDashboard');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      renderDashboard();
      Toast.success('Dashboard Synced', 'Live POS orders and table occupancy metrics up to date.');
    });
  }
}

/**
 * ==============================================================================
 * 4. POS TERMINAL ENGINE (FULL LIVE ORDER TAKING)
 * ==============================================================================
 */
let currentPosCategory = 'All';
let posCart = [];

function renderPOS() {
  const view = document.getElementById('view-pos');
  if (!view || !window.BrandData) return;

  view.innerHTML = `
    <div style="display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);">
      <div>
        <span class="section-tag">Point of Sale (POS)</span>
        <h1 class="section-title">Order Taking Terminal</h1>
        <p class="section-desc">Select dishes, build table tickets, and dispatch real-time orders directly to the kitchen display.</p>
      </div>

      <div style="display: flex; gap: var(--space-3);">
        <button class="btn btn-outline btn-sm" onclick="clearPosCart()">
          <svg class="icon"><use href="#icon-close"></use></svg>
          <span>Clear Ticket</span>
        </button>
      </div>
    </div>

    <!-- POS Split Layout: Menu Grid (Left 65%) + Cart Ticket (Right 35%) -->
    <div style="display: grid; grid-template-columns: 2fr 1.15fr; gap: var(--space-6);" class="grid-2">
      
      <!-- Left: Menu Selector -->
      <div>
        <!-- Category Filter Pills -->
        <div class="tab-list" style="margin-bottom: var(--space-5);">
          <button class="tab-btn pos-cat-btn is-active" data-cat="All">All Menu</button>
          <button class="tab-btn pos-cat-btn" data-cat="Momo">Momo</button>
          <button class="tab-btn pos-cat-btn" data-cat="Mains">Thakali Mains</button>
          <button class="tab-btn pos-cat-btn" data-cat="Grill">Charcoal Sekuwa</button>
          <button class="tab-btn pos-cat-btn" data-cat="Noodles">Chowmein</button>
          <button class="tab-btn pos-cat-btn" data-cat="Beverages">Beverages</button>
        </div>

        <!-- Dishes Grid -->
        <div class="grid-auto-fit" id="posDishesGrid" style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--space-4);">
          <!-- Injected via renderPosDishes -->
        </div>
      </div>

      <!-- Right: Live Order Cart Ticket -->
      <div class="card" style="padding: var(--space-5); display: flex; flex-direction: column; height: fit-content; sticky; top: 90px; box-shadow: var(--shadow-md);">
        
        <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: var(--space-3); border-bottom: 1px solid var(--color-border);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg class="icon" style="color: var(--color-primary); width: 20px; height: 20px;"><use href="#icon-orders"></use></svg>
            <strong style="font-size: 16px;">Current Order Ticket</strong>
          </div>
          <span class="badge badge-primary" id="posTicketId">HB-1049</span>
        </div>

        <!-- Table & Guest Selectors -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); margin-top: var(--space-3); margin-bottom: var(--space-3);">
          <div>
            <label class="form-label" style="font-size: 10px;">Table</label>
            <select class="form-control form-select" id="posTableSelect" style="padding: 0.45rem 0.65rem; font-size: 12px;">
              <option value="Table 01">Table 01 (2 Pax)</option>
              <option value="Table 02">Table 02 (4 Pax)</option>
              <option value="Table 03">Table 03 (4 Pax)</option>
              <option value="Table 04" selected>Table 04 (6 Pax)</option>
              <option value="Table 06">Table 06 (8 Pax)</option>
              <option value="Takeaway">Takeaway #14</option>
            </select>
          </div>
          <div>
            <label class="form-label" style="font-size: 10px;">Guest Name</label>
            <input type="text" class="form-control" id="posGuestName" value="Dawa Lama" style="padding: 0.45rem 0.65rem; font-size: 12px;">
          </div>
        </div>

        <!-- Cart Item Stream -->
        <div id="posCartItemList" style="max-height: 240px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 4px; margin-bottom: var(--space-4);">
          <!-- Injected via updatePosCartUI -->
        </div>

        <!-- Totals & Calculations Breakdown -->
        <div style="border-top: 1px solid var(--color-border); padding-top: var(--space-3); display: flex; flex-direction: column; gap: 6px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between; color: var(--color-text-secondary);">
            <span>Subtotal:</span>
            <span class="cell-numeric" id="posSubtotal">Rs. 0.00</span>
          </div>
          <div style="display: flex; justify-content: space-between; color: var(--color-text-secondary);">
            <span>VAT (13%):</span>
            <span class="cell-numeric" id="posVat">Rs. 0.00</span>
          </div>
          <div style="display: flex; justify-content: space-between; color: var(--color-text-secondary);">
            <span>Service Charge (10%):</span>
            <span class="cell-numeric" id="posService">Rs. 0.00</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 17px; font-weight: 800; color: var(--color-primary); border-top: 1px dashed var(--color-border); padding-top: 8px; margin-top: 4px;">
            <span>Grand Total:</span>
            <span class="cell-numeric" id="posGrandTotal">Rs. 0.00</span>
          </div>
        </div>

        <!-- Payment Channel Select -->
        <div style="margin-top: var(--space-4); display: flex; gap: var(--space-2);">
          <button class="btn btn-outline btn-sm pos-pay-btn is-active" data-pay="Fonepay QR" style="flex: 1; font-size: 11px;">Fonepay QR</button>
          <button class="btn btn-outline btn-sm pos-pay-btn" data-pay="Credit Card" style="flex: 1; font-size: 11px;">Card</button>
          <button class="btn btn-outline btn-sm pos-pay-btn" data-pay="Cash" style="flex: 1; font-size: 11px;">Cash</button>
        </div>

        <!-- Submit to Kitchen (KDS) Button -->
        <button class="btn btn-primary" onclick="submitPosOrder()" style="margin-top: var(--space-4); width: 100%; padding: 0.75rem; font-size: 14px;">
          <svg class="icon"><use href="#icon-flame"></use></svg>
          <span>Send Ticket to Kitchen (KDS)</span>
        </button>

      </div>

    </div>
  `;

  renderPosDishes('All');
  initPosEvents();
  updatePosCartUI();
}

function renderPosDishes(category = 'All', searchQuery = '') {
  currentPosCategory = category;
  const container = document.getElementById('posDishesGrid');
  if (!container || !window.BrandData) return;

  const { cuisineCatalog } = window.BrandData;

  const filtered = cuisineCatalog.filter(d => {
    const matchCat = category === 'All' || d.category === category;
    const matchSearch = !searchQuery || d.name.toLowerCase().includes(searchQuery) || d.nepaliName.includes(searchQuery);
    return matchCat && matchSearch;
  });

  container.innerHTML = filtered.map(dish => `
    <div class="card" style="overflow: hidden; display: flex; flex-direction: column;">
      <div style="height: 120px; width: 100%; position: relative; background-color: var(--color-slate-900);">
        <img 
          src="${dish.fallbackImage}" 
          alt="${dish.name}" 
          style="width: 100%; height: 100%; object-fit: cover;"
          onerror="Utils.handleImageError(this, '${dish.fallbackImage}')"
        />
        <div style="position: absolute; top: 6px; right: 6px;">
          <span class="badge badge-secondary" style="font-size: 11px; padding: 2px 6px;">${Utils.formatCurrency(dish.price)}</span>
        </div>
      </div>
      <div style="padding: var(--space-3); display: flex; flex-direction: column; flex: 1;">
        <strong style="font-size: 13px; color: var(--color-text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${dish.name}</strong>
        <span style="font-size: 11px; color: var(--color-primary);">${dish.nepaliName}</span>
        <button class="btn btn-primary btn-sm" onclick="addToPosCart('${dish.id}')" style="margin-top: var(--space-3); width: 100%; padding: 0.35rem 0.5rem; font-size: 12px;">
          + Add to Order
        </button>
      </div>
    </div>
  `).join('');
}

function initPosEvents() {
  const catBtns = document.querySelectorAll('.pos-cat-btn');
  catBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      catBtns.forEach(b => b.classList.remove('is-active'));
      this.classList.add('is-active');
      renderPosDishes(this.getAttribute('data-cat'));
    });
  });

  const payBtns = document.querySelectorAll('.pos-pay-btn');
  payBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      payBtns.forEach(b => b.classList.remove('is-active'));
      this.classList.add('is-active');
    });
  });
}

window.addToPosCart = function(dishId) {
  const dish = window.BrandData.cuisineCatalog.find(d => d.id === dishId);
  if (!dish) return;

  const existing = posCart.find(item => item.id === dishId);
  if (existing) {
    existing.qty += 1;
  } else {
    posCart.push({ id: dish.id, name: dish.name, price: dish.price, qty: 1 });
  }

  updatePosCartUI();
  Toast.success('Added to Cart', `${dish.name} added to current ticket.`);
};

window.changeCartQty = function(dishId, delta) {
  const item = posCart.find(i => i.id === dishId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    posCart = posCart.filter(i => i.id !== dishId);
  }
  updatePosCartUI();
};

window.clearPosCart = function() {
  posCart = [];
  updatePosCartUI();
  Toast.info('Ticket Cleared', 'Cart is now empty.');
};

function updatePosCartUI() {
  const list = document.getElementById('posCartItemList');
  const subtotalEl = document.getElementById('posSubtotal');
  const vatEl = document.getElementById('posVat');
  const serviceEl = document.getElementById('posService');
  const grandTotalEl = document.getElementById('posGrandTotal');

  if (!list) return;

  if (posCart.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; padding: var(--space-6) 0; color: var(--color-text-muted); font-size: 13px;">
        No items in ticket yet.<br>Click any dish on the left to add.
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = 'Rs. 0.00';
    if (vatEl) vatEl.textContent = 'Rs. 0.00';
    if (serviceEl) serviceEl.textContent = 'Rs. 0.00';
    if (grandTotalEl) grandTotalEl.textContent = 'Rs. 0.00';
    return;
  }

  let subtotal = 0;
  list.innerHTML = posCart.map(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    return `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed var(--color-border-light); font-size: 12px;">
        <div style="flex: 1; padding-right: 6px;">
          <div style="font-weight: 600; color: var(--color-text-primary);">${item.name}</div>
          <div style="color: var(--color-text-muted); font-size: 11px;">${Utils.formatCurrency(item.price)} each</div>
        </div>

        <div style="display: flex; align-items: center; gap: 6px;">
          <button class="btn btn-outline btn-sm" onclick="changeCartQty('${item.id}', -1)" style="padding: 2px 6px; height: 22px; width: 22px; font-weight: bold;">-</button>
          <strong style="font-variant-numeric: tabular-nums;">${item.qty}</strong>
          <button class="btn btn-outline btn-sm" onclick="changeCartQty('${item.id}', 1)" style="padding: 2px 6px; height: 22px; width: 22px; font-weight: bold;">+</button>
        </div>

        <div class="cell-numeric" style="font-weight: 700; width: 68px; text-align: right; color: var(--color-text-primary);">
          ${Utils.formatCurrency(itemTotal)}
        </div>
      </div>
    `;
  }).join('');

  const vat = subtotal * 0.13;
  const service = subtotal * 0.10;
  const grandTotal = subtotal + vat + service;

  if (subtotalEl) subtotalEl.textContent = Utils.formatCurrency(subtotal);
  if (vatEl) vatEl.textContent = Utils.formatCurrency(vat);
  if (serviceEl) serviceEl.textContent = Utils.formatCurrency(service);
  if (grandTotalEl) grandTotalEl.textContent = Utils.formatCurrency(grandTotal);
}

window.submitPosOrder = function() {
  if (posCart.length === 0) {
    Toast.warning('Empty Ticket', 'Please add at least one culinary dish to the order.');
    return;
  }

  const tableSelect = document.getElementById('posTableSelect');
  const guestInput = document.getElementById('posGuestName');
  const activePayBtn = document.querySelector('.pos-pay-btn.is-active');

  const tableName = tableSelect ? tableSelect.value : 'Table 04';
  const guestName = (guestInput && guestInput.value.trim()) ? guestInput.value.trim() : 'Walk-in Diner';
  const paymentMethod = activePayBtn ? activePayBtn.getAttribute('data-pay') : 'Cash';

  let subtotal = 0;
  const itemsSummary = posCart.map(i => {
    subtotal += i.price * i.qty;
    return `${i.qty}x ${i.name}`;
  }).join(', ');

  const grandTotal = subtotal * 1.23;
  const orderId = `HB-${1050 + Math.floor(Math.random() * 50)}`;

  const newOrder = {
    id: orderId,
    table: tableName,
    customer: guestName,
    pax: 3,
    items: itemsSummary,
    amount: grandTotal,
    paymentMethod: paymentMethod,
    status: 'Preparing',
    time: 'Just now',
    server: currentUser ? currentUser.name : 'Sunita K.'
  };

  // Add to active transactions
  window.BrandData.dashboardData.recentTransactions.unshift(newOrder);
  window.BrandData.dashboardData.kpis.totalOrders += 1;
  window.BrandData.dashboardData.kpis.totalRevenue += grandTotal;
  window.BrandData.dashboardData.kpis.pendingOrders += 1;

  // Clear Cart
  posCart = [];
  updatePosCartUI();

  Toast.success(
    `Order ${orderId} Dispatched!`,
    `Sent to KDS for ${tableName} (${guestName}) • Total: ${Utils.formatCurrency(grandTotal)}`
  );

  // Navigate to Orders board to view ticket in kitchen queue
  navigateTo('orders');
};

/**
 * ==============================================================================
 * 5. ORDERS & KITCHEN TICKET WORKFLOW
 * ==============================================================================
 */
let currentOrdersFilter = 'All';

function renderOrders() {
  const view = document.getElementById('view-orders');
  if (!view || !window.BrandData) return;

  view.innerHTML = `
    <div style="display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);">
      <div>
        <span class="section-tag">Kitchen & Front of House</span>
        <h1 class="section-title">Live Orders & Ticket Workflow</h1>
        <p class="section-desc">Real-time status management for dining tables, kitchen cook queue, and guest settlements.</p>
      </div>

      <div style="display: flex; gap: var(--space-3);">
        <button class="btn btn-primary btn-sm" onclick="navigateTo('pos')">
          <svg class="icon"><use href="#icon-plus"></use></svg>
          <span>New Order</span>
        </button>
      </div>
    </div>

    <!-- Status Tabs -->
    <div class="tab-list" style="margin-bottom: var(--space-5);">
      <button class="tab-btn orders-filter-btn is-active" data-filter="All">All Tickets (${window.BrandData.dashboardData.recentTransactions.length})</button>
      <button class="tab-btn orders-filter-btn" data-filter="Preparing">In Preparation (Cooking)</button>
      <button class="tab-btn orders-filter-btn" data-filter="Ready">Ready to Serve</button>
      <button class="tab-btn orders-filter-btn" data-filter="Served">Served at Table</button>
      <button class="tab-btn orders-filter-btn" data-filter="Completed">Settled & Completed</button>
    </div>

    <!-- Orders Cards Grid -->
    <div class="grid-auto-fit" id="ordersCardsGrid" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-5);">
      <!-- Injected via renderOrdersList -->
    </div>
  `;

  renderOrdersList('All');
  initOrdersEvents();
}

function renderOrdersList(filter = 'All', searchQuery = '') {
  currentOrdersFilter = filter;
  const container = document.getElementById('ordersCardsGrid');
  if (!container || !window.BrandData) return;

  const { recentTransactions } = window.BrandData.dashboardData;

  const filtered = recentTransactions.filter(o => {
    const matchFilter = filter === 'All' || o.status.toLowerCase() === filter.toLowerCase();
    const matchSearch = !searchQuery || 
      o.id.toLowerCase().includes(searchQuery) ||
      o.customer.toLowerCase().includes(searchQuery) ||
      o.table.toLowerCase().includes(searchQuery);
    return matchFilter && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: var(--space-8); background-color: var(--color-surface); border-radius: var(--radius-lg); border: 1px dashed var(--color-border);">
        <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">No active orders matching this filter.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(order => {
    let badgeClass = 'badge-neutral';
    let nextAction = '';

    if (order.status === 'Preparing') {
      badgeClass = 'badge-warning';
      nextAction = `<button class="btn btn-primary btn-sm" onclick="advanceOrderStatus('${order.id}', 'Ready')">Mark Ready</button>`;
    } else if (order.status === 'Ready') {
      badgeClass = 'badge-info';
      nextAction = `<button class="btn btn-secondary btn-sm" onclick="advanceOrderStatus('${order.id}', 'Served')">Mark Served</button>`;
    } else if (order.status === 'Served') {
      badgeClass = 'badge-secondary';
      nextAction = `<button class="btn btn-success btn-sm" onclick="advanceOrderStatus('${order.id}', 'Completed')">Settle Bill</button>`;
    } else if (order.status === 'Completed') {
      badgeClass = 'badge-success';
      nextAction = `<button class="btn btn-outline btn-sm" onclick="Toast.info('Ticket Printed', 'Receipt generated for ${order.id}')">Print Bill</button>`;
    }

    return `
      <div class="card" style="padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-3); border-top: 3px solid var(--color-primary);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <strong class="cell-numeric" style="color: var(--color-primary); font-size: 15px;">${order.id}</strong>
            <span class="badge ${badgeClass}">${order.status}</span>
          </div>
          <span style="font-size: 11px; color: var(--color-text-muted);">${order.time}</span>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 13px; background-color: var(--color-surface-subtle); padding: 6px 8px; border-radius: var(--radius-sm);">
          <span><strong>${order.table}</strong> • ${order.customer}</span>
          <span style="color: var(--color-text-secondary);">Server: ${order.server}</span>
        </div>

        <div style="font-size: 13px; color: var(--color-text-primary); line-height: 1.4; padding: 4px 0;">
          ${order.items}
        </div>

        <div style="margin-top: auto; border-top: 1px solid var(--color-border-light); padding-top: var(--space-3); display: flex; align-items: center; justify-content: space-between;">
          <div>
            <span style="font-size: 11px; color: var(--color-text-muted);">Total:</span>
            <span class="cell-numeric" style="font-weight: 800; font-size: 15px; color: var(--color-text-primary); margin-left: 4px;">
              ${Utils.formatCurrency(order.amount)}
            </span>
          </div>
          <div>${nextAction}</div>
        </div>
      </div>
    `;
  }).join('');
}

function initOrdersEvents() {
  const filterBtns = document.querySelectorAll('.orders-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      this.classList.add('is-active');
      renderOrdersList(this.getAttribute('data-filter'));
    });
  });
}

window.advanceOrderStatus = function(orderId, nextStatus) {
  const order = window.BrandData.dashboardData.recentTransactions.find(o => o.id === orderId);
  if (order) {
    order.status = nextStatus;
    if (nextStatus === 'Completed') {
      window.BrandData.dashboardData.kpis.pendingOrders = Math.max(0, window.BrandData.dashboardData.kpis.pendingOrders - 1);
    }
    renderOrdersList(currentOrdersFilter);
    Toast.success(`Order ${orderId}`, `Status advanced to: ${nextStatus.toUpperCase()}`);
  }
};

/**
 * ==============================================================================
 * 6. MENU MANAGEMENT CATALOG
 * ==============================================================================
 */
function renderMenu() {
  const view = document.getElementById('view-menu');
  if (!view || !window.BrandData) return;

  view.innerHTML = `
    <div style="display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);">
      <div>
        <span class="section-tag">Culinary Catalog</span>
        <h1 class="section-title">Menu Management & Recipes</h1>
        <p class="section-desc">Manage authentic Himalayan dishes, price tiers, spice levels, and stock availability.</p>
      </div>

      <button class="btn btn-primary btn-sm" onclick="Toast.info('Add Dish', 'Menu creation modal will open in Phase 5.')">
        <svg class="icon"><use href="#icon-plus"></use></svg>
        <span>Add Menu Item</span>
      </button>
    </div>

    <div class="card" style="margin-top: var(--space-5);">
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Dish</th>
              <th>Category</th>
              <th>Price (NPR)</th>
              <th>Spice Level</th>
              <th>Prep Time</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="menuCatalogTableBody">
            <!-- Injected via renderMenuTable -->
          </tbody>
        </table>
      </div>
    </div>
  `;

  renderMenuTable();
}

function renderMenuTable(searchQuery = '') {
  const tbody = document.getElementById('menuCatalogTableBody');
  if (!tbody || !window.BrandData) return;

  const { cuisineCatalog } = window.BrandData;

  const filtered = cuisineCatalog.filter(d => {
    return !searchQuery || d.name.toLowerCase().includes(searchQuery) || d.nepaliName.includes(searchQuery);
  });

  tbody.innerHTML = filtered.map(dish => `
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: var(--space-3);">
          <div style="width: 44px; height: 44px; border-radius: var(--radius-md); overflow: hidden; background-color: var(--color-slate-900);">
            <img src="${dish.fallbackImage}" alt="${dish.name}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div>
            <div style="font-weight: 700; color: var(--color-text-primary);">${dish.name}</div>
            <div style="font-size: 12px; color: var(--color-primary);">${dish.nepaliName}</div>
          </div>
        </div>
      </td>
      <td><span class="badge badge-primary">${dish.category}</span></td>
      <td class="cell-numeric" style="font-weight: 700;">${Utils.formatCurrency(dish.price)}</td>
      <td>
        <span class="badge ${dish.spiceLevel === 'hot' ? 'badge-danger' : (dish.spiceLevel === 'medium' ? 'badge-warning' : 'badge-success')}">
          ${dish.spiceLevel ? dish.spiceLevel.toUpperCase() : 'MILD'}
        </span>
      </td>
      <td style="font-size: 13px; color: var(--color-text-secondary);">${dish.prepTime}</td>
      <td style="font-weight: bold; color: var(--color-secondary-active);">★ ${dish.rating}</td>
      <td>
        <span class="badge badge-success">Available</span>
      </td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="Toast.info('Recipe Config', '${dish.name} ingredients loaded.')">Edit</button>
      </td>
    </tr>
  `).join('');
}

/**
 * ==============================================================================
 * 7. TABLE FLOOR PLAN MANAGEMENT
 * ==============================================================================
 */
function renderTables() {
  const view = document.getElementById('view-tables');
  if (!view || !window.BrandData) return;

  const { tablesData } = window.BrandData;

  view.innerHTML = `
    <div style="display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);">
      <div>
        <span class="section-tag">Dining Floor</span>
        <h1 class="section-title">Floor Plan & Table Management</h1>
        <p class="section-desc">Interactive 12-table layout tracking dining guests, elapsed seating times, and assigned servers.</p>
      </div>

      <div style="display: flex; align-items: center; gap: var(--space-3);">
        <button class="btn btn-primary btn-sm" onclick="Modal.open('demoModal')">
          <svg class="icon"><use href="#icon-plus"></use></svg>
          <span>New Reservation</span>
        </button>
      </div>
    </div>

    <!-- Table Cards Grid -->
    <div class="grid-auto-fit" style="grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: var(--space-5); margin-top: var(--space-5);">
      ${tablesData.map(tbl => {
        let statusBadge = '<span class="badge badge-success">Available</span>';
        let dotClass = 'status-dot-available';

        if (tbl.status === 'occupied') {
          statusBadge = '<span class="badge badge-danger">Occupied</span>';
          dotClass = 'status-dot-occupied status-dot-pulse';
        } else if (tbl.status === 'reserved') {
          statusBadge = '<span class="badge badge-warning">Reserved</span>';
          dotClass = 'status-dot-reserved';
        } else if (tbl.status === 'bill_pending') {
          statusBadge = '<span class="badge badge-info">Bill Pending</span>';
          dotClass = 'status-dot-occupied';
        }

        return `
          <div class="table-card" onclick="toggleTableStatus('${tbl.id}')">
            <div class="table-card-top">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="status-dot ${dotClass}"></span>
                <span class="table-number">${tbl.name}</span>
              </div>
              ${statusBadge}
            </div>

            <div style="font-size: 11px; color: var(--color-text-muted);">${tbl.location}</div>

            <div style="display: flex; justify-content: space-between; font-size: 12px; border-top: 1px dashed var(--color-border); padding-top: 8px; margin-top: 4px;">
              <span>Capacity: <strong>${tbl.capacity} Pax</strong></span>
              <span>${tbl.status === 'occupied' ? `Bill: <strong>${Utils.formatCurrency(tbl.orderTotal)}</strong>` : `Server: ${tbl.server}`}</span>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

window.toggleTableStatus = function(tableId) {
  const tbl = window.BrandData.tablesData.find(t => t.id === tableId);
  if (!tbl) return;

  const states = ['available', 'occupied', 'reserved', 'bill_pending'];
  const nextIdx = (states.indexOf(tbl.status) + 1) % states.length;
  tbl.status = states[nextIdx];

  renderTables();
  Toast.info(tbl.name, `Status switched to: ${tbl.status.toUpperCase()}`);
};

/**
 * ==============================================================================
 * 8. CUSTOMER & GUEST CRM DIRECTORY
 * ==============================================================================
 */
function renderCustomers() {
  const view = document.getElementById('view-customers');
  if (!view || !window.BrandData) return;

  view.innerHTML = `
    <div style="display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);">
      <div>
        <span class="section-tag">Guest Directory</span>
        <h1 class="section-title">Customer & Loyalty CRM</h1>
        <p class="section-desc">Manage repeat dining profiles, VIP membership tiers, and cumulative guest expenditure.</p>
      </div>

      <button class="btn btn-primary btn-sm" onclick="Toast.info('Guest CRM', 'New customer profile creation ready.')">
        <svg class="icon"><use href="#icon-plus"></use></svg>
        <span>Add Customer</span>
      </button>
    </div>

    <div class="card" style="margin-top: var(--space-5);">
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Guest Name</th>
              <th>Contact Phone</th>
              <th>Loyalty Tier</th>
              <th>Total Visits</th>
              <th>Cumulative Spend</th>
              <th>Favorite Himalayan Dish</th>
              <th>Last Visit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="customersTableBody">
            <!-- Injected via renderCustomersTable -->
          </tbody>
        </table>
      </div>
    </div>
  `;

  renderCustomersTable();
}

function renderCustomersTable(searchQuery = '') {
  const tbody = document.getElementById('customersTableBody');
  if (!tbody || !window.BrandData) return;

  const { customersData } = window.BrandData;

  const filtered = customersData.filter(c => {
    return !searchQuery || c.name.toLowerCase().includes(searchQuery) || c.phone.includes(searchQuery);
  });

  tbody.innerHTML = filtered.map(cust => `
    <tr>
      <td style="font-weight: 700; color: var(--color-text-primary);">${cust.name}</td>
      <td class="cell-numeric">${cust.phone}</td>
      <td>
        <span class="badge ${cust.tier.includes('Platinum') ? 'badge-primary' : (cust.tier.includes('Gold') ? 'badge-secondary' : 'badge-neutral')}">
          ${cust.tier}
        </span>
      </td>
      <td style="font-weight: 600;">${cust.visits} visits</td>
      <td class="cell-numeric" style="font-weight: 700; color: var(--color-primary);">${Utils.formatCurrency(cust.totalSpend)}</td>
      <td>${cust.favoriteDish}</td>
      <td style="color: var(--color-text-muted); font-size: 12px;">${cust.lastVisit}</td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="Toast.info('${cust.name}', 'Profile loaded. 10% VIP discount enabled.')">Reserve</button>
      </td>
    </tr>
  `).join('');
}

/**
 * ==============================================================================
 * 9. INVENTORY & STOCK MANAGEMENT
 * ==============================================================================
 */
function renderInventory() {
  const view = document.getElementById('view-inventory');
  if (!view || !window.BrandData) return;

  const { inventoryData } = window.BrandData;

  view.innerHTML = `
    <div style="display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);">
      <div>
        <span class="section-tag">Kitchen Supplies</span>
        <h1 class="section-title">Himalayan Spices & Perishables Inventory</h1>
        <p class="section-desc">Track real-time stock levels of mountain herbs (Jimbu, Timur, Gundruk), dairy, and grains.</p>
      </div>

      <button class="btn btn-primary btn-sm" onclick="Toast.info('Restock All', 'Automatic supplier purchase order generated.')">
        <svg class="icon"><use href="#icon-package"></use></svg>
        <span>Generate Purchase Order</span>
      </button>
    </div>

    <div class="card" style="margin-top: var(--space-5);">
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Ingredient & Herb</th>
              <th>Category</th>
              <th>In Stock</th>
              <th>Reorder Alert Level</th>
              <th>Cost / Unit</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${inventoryData.map(item => `
              <tr>
                <td>
                  <strong style="color: var(--color-text-primary);">${item.name}</strong>
                  <div style="font-size: 11px; color: var(--color-primary);">${item.nepaliName}</div>
                </td>
                <td><span class="badge badge-neutral">${item.category}</span></td>
                <td class="cell-numeric" style="font-size: 14px; font-weight: 700;">${item.stockQty} ${item.unit}</td>
                <td class="cell-numeric" style="color: var(--color-text-muted);">${item.threshold} ${item.unit}</td>
                <td class="cell-numeric">${Utils.formatCurrency(item.costPerUnit)} / ${item.unit}</td>
                <td>
                  <span class="badge ${item.status === 'low_stock' ? 'badge-danger' : 'badge-success'}">
                    ${item.status === 'low_stock' ? 'LOW STOCK' : 'IN STOCK'}
                  </span>
                </td>
                <td>
                  <button class="btn btn-outline btn-sm" onclick="restockItem('${item.id}')">
                    + Restock
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

window.restockItem = function(invId) {
  const item = window.BrandData.inventoryData.find(i => i.id === invId);
  if (item) {
    item.stockQty += 5;
    item.status = 'in_stock';
    renderInventory();
    Toast.success('Restocked', `Added 5 ${item.unit} of ${item.name} to kitchen stock.`);
  }
};

/**
 * ==============================================================================
 * 10. STAFF DUTY ROSTER & SHIFTS
 * ==============================================================================
 */
function renderStaff() {
  const view = document.getElementById('view-staff');
  if (!view || !window.BrandData) return;

  const { staffData } = window.BrandData;

  view.innerHTML = `
    <div style="display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);">
      <div>
        <span class="section-tag">Human Resources</span>
        <h1 class="section-title">Staff Duty Roster & Shifts</h1>
        <p class="section-desc">Active brigade schedule across Executive Chef, Sous Chefs, Floor Managers, and Cashiers.</p>
      </div>

      <button class="btn btn-primary btn-sm" onclick="Toast.info('Roster', 'Shift scheduling modal ready.')">
        <svg class="icon"><use href="#icon-users"></use></svg>
        <span>Add Staff Member</span>
      </button>
    </div>

    <div class="card" style="margin-top: var(--space-5);">
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Staff Member</th>
              <th>Assigned Operational Role</th>
              <th>Current Shift</th>
              <th>Contact Phone</th>
              <th>Duty Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${staffData.map(stf => `
              <tr>
                <td>
                  <div style="display: flex; align-items: center; gap: var(--space-3);">
                    <div class="user-avatar" style="width: 34px; height: 34px; font-size: 12px;">${stf.avatar}</div>
                    <strong style="color: var(--color-text-primary);">${stf.name}</strong>
                  </div>
                </td>
                <td style="font-weight: 500;">${stf.role}</td>
                <td><span class="badge badge-neutral">${stf.shift}</span></td>
                <td class="cell-numeric">${stf.phone}</td>
                <td>
                  <span class="badge ${stf.status === 'on_duty' ? 'badge-success' : 'badge-warning'}">
                    ${stf.status === 'on_duty' ? 'ON DUTY' : 'ON BREAK'}
                  </span>
                </td>
                <td>
                  <button class="btn btn-outline btn-sm" onclick="toggleStaffShift('${stf.id}')">Toggle Shift</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

window.toggleStaffShift = function(staffId) {
  const stf = window.BrandData.staffData.find(s => s.id === staffId);
  if (stf) {
    stf.status = stf.status === 'on_duty' ? 'on_break' : 'on_duty';
    renderStaff();
    Toast.info(stf.name, `Duty status changed to: ${stf.status.toUpperCase()}`);
  }
};

/**
 * ==============================================================================
 * 11. FINANCIAL & VAT REPORTS
 * ==============================================================================
 */
function renderReports() {
  const view = document.getElementById('view-reports');
  if (!view || !window.BrandData) return;

  view.innerHTML = `
    <div style="display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);">
      <div>
        <span class="section-tag">Financial Audit</span>
        <h1 class="section-title">Daily Sales & VAT Reports</h1>
        <p class="section-desc">Audited figures ready for Nepal Inland Revenue Department (IRD) 13% VAT reconciliation.</p>
      </div>

      <div style="display: flex; gap: var(--space-3);">
        <button class="btn btn-outline btn-sm" onclick="Toast.success('Export CSV', 'Sales register CSV downloaded successfully.')">
          Export CSV
        </button>
        <button class="btn btn-primary btn-sm" onclick="window.print()">
          Print Report
        </button>
      </div>
    </div>

    <!-- 4 Summary Stat Cards -->
    <div class="grid-4" style="margin-top: var(--space-5);">
      <div class="metric-card">
        <span class="metric-title">Gross Turnover</span>
        <div class="metric-value">Rs. 184,520.00</div>
        <div class="metric-footer">Includes 13% VAT & 10% SC</div>
      </div>
      <div class="metric-card">
        <span class="metric-title">Net Food Sales</span>
        <div class="metric-value" style="color: var(--color-primary);">Rs. 147,616.00</div>
        <div class="metric-footer">Culinary revenue before tax</div>
      </div>
      <div class="metric-card">
        <span class="metric-title">Government VAT (13%)</span>
        <div class="metric-value" style="color: var(--color-secondary-active);">Rs. 19,190.08</div>
        <div class="metric-footer">IRD Tax Register Ready</div>
      </div>
      <div class="metric-card">
        <span class="metric-title">Service Charge (10%)</span>
        <div class="metric-value" style="color: var(--color-success);">Rs. 14,761.60</div>
        <div class="metric-footer">Staff Pool Distribution</div>
      </div>
    </div>

    <!-- Payment Channels Card -->
    <div class="card" style="margin-top: var(--space-6); padding: var(--space-6);">
      <div class="card-title" style="margin-bottom: var(--space-2);">Payment Channel Reconciliation</div>
      <div class="card-subtitle" style="margin-bottom: var(--space-5);">Breakdown of payment methods received during dinner shift</div>

      <div class="category-sales-list">
        <div class="category-sales-item">
          <div class="category-sales-header">
            <span><strong>Fonepay Digital QR</strong></span>
            <span class="cell-numeric">Rs. 88,569.60 (48.0%)</span>
          </div>
          <div class="category-progress-track">
            <div class="category-progress-fill" style="width: 48%; background-color: var(--color-primary);"></div>
          </div>
        </div>

        <div class="category-sales-item">
          <div class="category-sales-header">
            <span><strong>Credit & Debit Cards (POS Terminal)</strong></span>
            <span class="cell-numeric">Rs. 59,046.40 (32.0%)</span>
          </div>
          <div class="category-progress-track">
            <div class="category-progress-fill" style="width: 32%; background-color: var(--color-secondary);"></div>
          </div>
        </div>

        <div class="category-sales-item">
          <div class="category-sales-header">
            <span><strong>Cash Settlements</strong></span>
            <span class="cell-numeric">Rs. 36,904.00 (20.0%)</span>
          </div>
          <div class="category-progress-track">
            <div class="category-progress-fill" style="width: 20%; background-color: var(--color-success);"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * ==============================================================================
 * 12. SYSTEM CONFIGURATION & HARDWARE SETTINGS
 * ==============================================================================
 */
function renderSettings() {
  const view = document.getElementById('view-settings');
  if (!view || !window.BrandData) return;

  const { settingsData } = window.BrandData;

  view.innerHTML = `
    <div style="display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);">
      <div>
        <span class="section-tag">System Parameters</span>
        <h1 class="section-title">Settings & Hardware Configuration</h1>
        <p class="section-desc">Manage restaurant registration details, tax rules, and receipt printer parameters.</p>
      </div>
    </div>

    <div class="card" style="margin-top: var(--space-5); padding: var(--space-6);">
      <form id="settingsForm" onsubmit="saveSystemSettings(event)">
        <div class="grid-2">
          
          <div class="form-group">
            <label class="form-label">Restaurant Business Name</label>
            <input type="text" class="form-control" id="cfgName" value="${settingsData.restaurantName}">
          </div>

          <div class="form-group">
            <label class="form-label">Nepali Name</label>
            <input type="text" class="form-control" id="cfgNepaliName" value="${settingsData.nepaliName}">
          </div>

          <div class="form-group">
            <label class="form-label">Physical Address</label>
            <input type="text" class="form-control" id="cfgAddress" value="${settingsData.address}">
          </div>

          <div class="form-group">
            <label class="form-label">Official Contact Phone</label>
            <input type="text" class="form-control" id="cfgPhone" value="${settingsData.phone}">
          </div>

          <div class="form-group">
            <label class="form-label">Government VAT / PAN Registration</label>
            <input type="text" class="form-control" id="cfgVat" value="${settingsData.vatPanNumber}">
          </div>

          <div class="form-group">
            <label class="form-label">Government VAT Rate (%)</label>
            <input type="number" class="form-control" id="cfgVatRate" value="${settingsData.vatPercentage}">
          </div>

          <div class="form-group">
            <label class="form-label">Service Charge Rate (%)</label>
            <input type="number" class="form-control" id="cfgServiceRate" value="${settingsData.serviceChargePercentage}">
          </div>

          <div class="form-group">
            <label class="form-label">Currency Symbol</label>
            <input type="text" class="form-control" id="cfgCurrency" value="${settingsData.currencySymbol}">
          </div>

        </div>

        <div style="border-top: 1px solid var(--color-border); padding-top: var(--space-4); margin-top: var(--space-4); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3);">
          <label class="toggle-switch">
            <input type="checkbox" checked id="cfgSound">
            <span class="toggle-slider"></span>
            <span class="toggle-label">Play chime when order reaches Kitchen Display</span>
          </label>

          <button type="submit" class="btn btn-primary">
            Save System Settings
          </button>
        </div>
      </form>
    </div>
  `;
}

window.saveSystemSettings = function(e) {
  e.preventDefault();
  const name = document.getElementById('cfgName').value;
  const address = document.getElementById('cfgAddress').value;
  const vatRate = document.getElementById('cfgVatRate').value;

  window.BrandData.settingsData.restaurantName = name;
  window.BrandData.settingsData.address = address;
  window.BrandData.settingsData.vatPercentage = Number(vatRate);

  Storage.set('settings', window.BrandData.settingsData);
  Toast.success('Settings Saved', 'System configuration updated successfully.');
};
