/**
 * Language Detection and RTL Layout Manager
 * Automatically detects page language changes and applies appropriate text direction
 */

// List of RTL (Right-to-Left) language codes
const RTL_LANGUAGES = [
  'ar',    // Arabic
  'he',    // Hebrew
  'fa',    // Persian/Farsi
  'ur',    // Urdu
  'yi',    // Yiddish
  'ji',    // Yiddish (alternative code)
  'iw',    // Hebrew (old code)
  'ps',    // Pashto
  'sd',    // Sindhi
  'ug',    // Uyghur
  'ku',    // Kurdish (Sorani)
  'arc',   // Aramaic
  'ckb',   // Central Kurdish
  'dv'     // Dhivehi/Maldivian
];

/**
 * Checks if a given language code represents an RTL language
 * @param {string} langCode - The language code to check (e.g., 'ar', 'en-US')
 * @returns {boolean} - True if the language is RTL
 */
function isRTLLanguage(langCode) {
  if (!langCode) return false;
  
  // Extract the base language code (e.g., 'ar' from 'ar-SA')
  const baseLang = langCode.toLowerCase().split('-')[0];
  
  return RTL_LANGUAGES.includes(baseLang);
}

/**
 * Applies RTL layout to the page
 * Enables Bootstrap RTL stylesheet and sets the dir attribute
 */
function applyRTL() {
  const html = document.documentElement;
  
  // Set the dir attribute to rtl
  html.setAttribute('dir', 'rtl');
  
  // Enable Bootstrap RTL stylesheet
  const bootstrapRTL = document.getElementById('bootstrap-rtl');
  const bootstrapLTR = document.getElementById('bootstrap-ltr');
  
  if (bootstrapRTL) {
    bootstrapRTL.removeAttribute('disabled');
  }
  
  if (bootstrapLTR) {
    bootstrapLTR.setAttribute('disabled', 'true');
  }
  
  // Add RTL class to body for custom CSS adjustments
  document.body.classList.add('rtl-layout');
  document.body.classList.remove('ltr-layout');
  
  console.log('✓ RTL layout applied');
}

/**
 * Applies LTR layout to the page
 * Disables Bootstrap RTL stylesheet and sets the dir attribute
 */
function applyLTR() {
  const html = document.documentElement;
  
  // Set the dir attribute to ltr
  html.setAttribute('dir', 'ltr');
  
  // Disable Bootstrap RTL stylesheet
  const bootstrapRTL = document.getElementById('bootstrap-rtl');
  const bootstrapLTR = document.getElementById('bootstrap-ltr');
  
  if (bootstrapRTL) {
    bootstrapRTL.setAttribute('disabled', 'true');
  }
  
  if (bootstrapLTR) {
    bootstrapLTR.removeAttribute('disabled');
  }
  
  // Add LTR class to body for custom CSS adjustments
  document.body.classList.add('ltr-layout');
  document.body.classList.remove('rtl-layout');
  
  console.log('✓ LTR layout applied');
}

/**
 * Detects the current page language and applies the appropriate layout
 */
function detectAndApplyLayout() {
  const html = document.documentElement;
  const currentLang = html.getAttribute('lang') || 'en';
  
  console.log(`Detecting language: ${currentLang}`);
  
  if (isRTLLanguage(currentLang)) {
    applyRTL();
  } else {
    applyLTR();
  }
}

/**
 * Changes the page language and automatically adjusts layout
 * @param {string} langCode - The new language code (e.g., 'ar', 'en', 'he')
 */
function changeLanguage(langCode) {
  const html = document.documentElement;
  html.setAttribute('lang', langCode);
  
  // The MutationObserver will automatically detect this change
  // and call detectAndApplyLayout()
}

/**
 * Initialize the language detector
 * Sets up MutationObserver to watch for language changes
 */
function initLanguageDetector() {
  // Apply layout based on initial language
  detectAndApplyLayout();
  
  // Create a MutationObserver to watch for changes to the lang attribute
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
        console.log('Language attribute changed, updating layout...');
        detectAndApplyLayout();
      }
    });
  });
  
  // Start observing the html element for attribute changes
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });
  
  console.log('✓ Language detector initialized');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguageDetector);
} else {
  // DOM is already loaded
  initLanguageDetector();
}

// Export functions for external use
window.languageDetector = {
  changeLanguage,
  detectAndApplyLayout,
  isRTLLanguage,
  applyRTL,
  applyLTR
};
