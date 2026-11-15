/**
 * ==============================================================================
 * HIMALAYAN BISTRO — RESTAURANT MANAGEMENT SYSTEM
 * Phase 1: LocalStorage Architecture & State Persistence
 * ==============================================================================
 */

const Storage = (function () {
  const PREFIX = 'HB_RMS_';
  let memoryFallback = {};
  let isStorageAvailable = true;

  // Test localStorage availability safely
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
  } catch (e) {
    isStorageAvailable = false;
    console.warn('Himalayan Bistro: localStorage is not available. Falling back to in-memory store.');
  }

  /**
   * Get an item by key with a fallback default value
   */
  function get(key, defaultValue = null) {
    const fullKey = PREFIX + key;
    try {
      if (isStorageAvailable) {
        const item = window.localStorage.getItem(fullKey);
        return item !== null ? JSON.parse(item) : defaultValue;
      }
      return memoryFallback.hasOwnProperty(fullKey) ? memoryFallback[fullKey] : defaultValue;
    } catch (error) {
      console.error(`Error reading key "${key}" from storage:`, error);
      return defaultValue;
    }
  }

  /**
   * Set an item by key
   */
  function set(key, value) {
    const fullKey = PREFIX + key;
    try {
      if (isStorageAvailable) {
        window.localStorage.setItem(fullKey, JSON.stringify(value));
      } else {
        memoryFallback[fullKey] = value;
      }
      return true;
    } catch (error) {
      console.error(`Error writing key "${key}" to storage:`, error);
      return false;
    }
  }

  /**
   * Remove an item by key
   */
  function remove(key) {
    const fullKey = PREFIX + key;
    try {
      if (isStorageAvailable) {
        window.localStorage.removeItem(fullKey);
      } else {
        delete memoryFallback[fullKey];
      }
      return true;
    } catch (error) {
      console.error(`Error removing key "${key}" from storage:`, error);
      return false;
    }
  }

  /**
   * Check if an item exists
   */
  function has(key) {
    const fullKey = PREFIX + key;
    if (isStorageAvailable) {
      return window.localStorage.getItem(fullKey) !== null;
    }
    return memoryFallback.hasOwnProperty(fullKey);
  }

  /**
   * Clear all Himalayan Bistro specific items
   */
  function clear() {
    try {
      if (isStorageAvailable) {
        const keysToRemove = [];
        for (let i = 0; i < window.localStorage.length; i++) {
          const k = window.localStorage.key(i);
          if (k && k.startsWith(PREFIX)) {
            keysToRemove.push(k);
          }
        }
        keysToRemove.forEach(k => window.localStorage.removeItem(k));
      }
      memoryFallback = {};
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  /**
   * Seed default preferences if not yet initialized
   */
  function initDefaults() {
    if (!has('app_initialized')) {
      set('app_initialized', true);
      set('preferences', {
        currency: 'NPR',
        currencySymbol: 'Rs.',
        taxRatePct: 13,
        serviceChargePct: 10,
        soundEnabled: true,
        useLocalFallbacks: false
      });
      console.info('Himalayan Bistro: Storage system successfully initialized with default preferences.');
    }
  }

  // Auto initialize defaults
  initDefaults();

  return {
    get,
    set,
    remove,
    has,
    clear,
    isAvailable: () => isStorageAvailable
  };
})();

// Export globally
if (typeof window !== 'undefined') {
  window.Storage = Storage;
}
