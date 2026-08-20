/**
 * The one place anything about the launch is stated.
 *
 * The App Store URL is empty until the app is actually released. That is a
 * supported state, not a stub: while it is empty, every "Download" call to
 * action on the page turns itself into a waitlist call to action instead, so
 * the page is honest on both sides of launch day and nothing has to be
 * rewritten in a hurry the morning it goes live.
 *
 * On release, paste the App Store link here, rebuild, push. That is the whole
 * change.
 */
export const APP_STORE_URL = '';

export const IS_LIVE = APP_STORE_URL.length > 0;

export const PRIVACY_URL = 'https://platical-developments.github.io/habitxp-privacy/';
export const TERMS_URL = 'https://platical-developments.github.io/habitxp-privacy/terms/';
export const SUPPORT_URL = 'https://platical-developments.github.io/habitxp-privacy/support/';

/** Where the primary button goes, and what it says, in each of the two states. */
export const primaryCta = IS_LIVE
  ? { href: APP_STORE_URL, label: 'Download on the App Store' }
  : { href: '#waitlist', label: 'Get it when it lands' };
