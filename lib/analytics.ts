/**
 * Google Analytics 4 event tracking helpers
 * Ensures type-safe analytics events across the application
 */

declare global {
  interface Window {
    gaEvent?: (name: string, params?: Record<string, any>) => void;
    dataLayer?: any[];
  }
}

/**
 * Generic track function - wraps window.gaEvent
 */
export const track = (name: string, params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gaEvent) {
    window.gaEvent(name, params);
  }
};

/**
 * Track lead form submissions (quote forms, contact forms)
 */
export const trackLeadSubmit = (formId: string, context: string) => {
  track('lead_form_submit', {
    form_id: formId,
    page_context: context,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track click-to-call interactions
 */
export const trackClickToCall = (phone: string) => {
  track('click_to_call', {
    phone_number: phone,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track credit application started
 */
export const trackCreditApp = () => {
  track('credit_app_started', {
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track credit application completed
 */
export const trackCreditAppCompleted = () => {
  track('credit_app_completed', {
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track CTA button clicks (Schedule Delivery, Get Quote, etc.)
 */
export const trackQuoteCTA = (label: string, location: string) => {
  track('cta_click', {
    cta_label: label,
    page_location: location,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track page view (for client-side navigation)
 */
export const trackPageView = () => {
  if (typeof window !== 'undefined') {
    track('page_view', {
      page_location: window.location.href,
      page_title: document.title,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url: string, label?: string) => {
  track('external_link_click', {
    link_url: url,
    link_label: label || url,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track file downloads
 */
export const trackDownload = (fileName: string, fileType: string) => {
  track('file_download', {
    file_name: fileName,
    file_type: fileType,
    timestamp: new Date().toISOString(),
  });
};
