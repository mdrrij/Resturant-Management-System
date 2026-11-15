/**
 * ==============================================================================
 * HIMALAYAN BISTRO — RESTAURANT MANAGEMENT SYSTEM
 * Phase 1: Core Utilities, Formatters, Toast & Modal Engine
 * ==============================================================================
 */

const Utils = (function () {
  /**
   * Currency formatter (Default: Nepali Rupee - NPR / Rs.)
   */
  function formatCurrency(amount, currencySymbol = 'Rs.') {
    if (amount === null || amount === undefined || isNaN(amount)) return '-';
    const num = Number(amount);
    return `${currencySymbol} ${num.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }

  /**
   * Number formatter with Indian numbering system or standard commas
   */
  function formatNumber(number) {
    if (number === null || number === undefined || isNaN(number)) return '0';
    return Number(number).toLocaleString('en-IN');
  }

  /**
   * Generates a reusable SVG Icon element referencing the central icons sprite
   */
  function getIcon(iconId, extraClass = '') {
    return `<svg class="icon ${extraClass}" aria-hidden="true" focusable="false"><use href="assets/icons/icons.svg#${iconId}"></use></svg>`;
  }

  /**
   * Copy text to user clipboard with modern fallback
   */
  async function copyToClipboard(text, successMsg = 'Copied to clipboard!') {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers or sandboxed iframes
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      Toast.show({
        title: 'Copied!',
        message: `${text} • ${successMsg}`,
        type: 'success',
        duration: 3000
      });
      return true;
    } catch (err) {
      console.warn('Failed to copy to clipboard:', err);
      Toast.show({
        title: 'Copy Failed',
        message: 'Could not copy to clipboard. Please copy manually.',
        type: 'error'
      });
      return false;
    }
  }

  /**
   * Handles broken image loads gracefully with local fallback assets
   */
  function handleImageError(img, fallbackSrc = 'assets/images/dish-placeholder.svg') {
    if (!img) return;
    img.onerror = null; // Prevent infinite error loops
    img.src = fallbackSrc;
    img.classList.add('is-fallback-image');
    img.setAttribute('data-loaded-fallback', 'true');
  }

  return {
    formatCurrency,
    formatNumber,
    getIcon,
    copyToClipboard,
    handleImageError,
    $: (selector, scope = document) => scope.querySelector(selector),
    $$: (selector, scope = document) => Array.from(scope.querySelectorAll(selector))
  };
})();

/**
 * ==============================================================================
 * TOAST NOTIFICATION ENGINE
 * ==============================================================================
 */
const Toast = (function () {
  let container = null;

  function ensureContainer() {
    if (!container || !document.body.contains(container)) {
      container = document.querySelector('.toast-container');
      if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('role', 'status');
        document.body.appendChild(container);
      }
    }
    return container;
  }

  function show({ title, message, type = 'info', duration = 4000 }) {
    const parent = ensureContainer();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSymbol = 'icon-info';
    if (type === 'success') iconSymbol = 'icon-check-circle';
    if (type === 'error' || type === 'danger') iconSymbol = 'icon-alert-circle';
    if (type === 'warning') iconSymbol = 'icon-alert-circle';

    toast.innerHTML = `
      <div class="toast-icon">${Utils.getIcon(iconSymbol)}</div>
      <div class="toast-content">
        ${title ? `<h4 class="toast-title">${title}</h4>` : ''}
        <p class="toast-message">${message || ''}</p>
      </div>
      <button class="toast-close" aria-label="Close Notification">
        ${Utils.getIcon('icon-close')}
      </button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    const dismiss = () => {
      toast.classList.add('toast-hiding');
      setTimeout(() => {
        if (toast.parentElement) toast.remove();
      }, 250);
    };

    closeBtn.addEventListener('click', dismiss);

    parent.appendChild(toast);

    if (duration > 0) {
      setTimeout(dismiss, duration);
    }

    return toast;
  }

  return {
    show,
    success: (title, message, duration) => show({ title, message, type: 'success', duration }),
    error: (title, message, duration) => show({ title, message, type: 'error', duration }),
    warning: (title, message, duration) => show({ title, message, type: 'warning', duration }),
    info: (title, message, duration) => show({ title, message, type: 'info', duration })
  };
})();

/**
 * ==============================================================================
 * MODAL CONTROLLER
 * ==============================================================================
 */
const Modal = (function () {
  let activeModal = null;

  function open(modalId) {
    const modalEl = document.getElementById(modalId);
    if (!modalEl) {
      console.warn(`Modal with ID "${modalId}" not found.`);
      return;
    }

    modalEl.classList.add('is-open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    activeModal = modalEl;

    // Focus first interactive element inside modal
    const focusable = modalEl.querySelector('input, select, textarea, button:not(.modal-close)');
    if (focusable) focusable.focus();
  }

  function close(modalId) {
    const modalEl = modalId ? document.getElementById(modalId) : activeModal;
    if (!modalEl) return;

    modalEl.classList.remove('is-open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeModal = null;
  }

  // Global listeners for closing modal with Escape or Backdrop Click
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) {
      close();
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      close();
    }
    if (e.target.closest('[data-modal-close]')) {
      close();
    }
  });

  return {
    open,
    close
  };
})();

// Attach to window
if (typeof window !== 'undefined') {
  window.Utils = Utils;
  window.Toast = Toast;
  window.Modal = Modal;
}
