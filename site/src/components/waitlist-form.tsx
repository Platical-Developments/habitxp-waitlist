import { useEffect, useRef } from 'react';

/**
 * The MailerLite embed, carried across from the previous page byte for byte.
 *
 * ## Why this is not written as JSX
 *
 * MailerLite's `webforms.min.js` finds this form by class name, and then owns
 * it: it intercepts submission, validates the field, swaps the form out for the
 * success message, and calls a global function when it is done. React and a
 * third-party script both believing they own the same DOM subtree is a classic
 * way to produce a form that works in development and silently stops working
 * once something above it re-renders.
 *
 * `dangerouslySetInnerHTML` is the fix rather than a shortcut. It makes the
 * subtree opaque to React: the markup is injected once and reconciliation never
 * walks inside it again, so MailerLite is the only thing mutating it. The
 * dependency array is empty for the same reason.
 *
 * These four class names are load-bearing and break *silently* if renamed:
 *   ml-subscribe-form-44831312, row-form, row-success, ml-block-form
 *
 * The double opt-in is the UK GDPR consent record, so it stays. So does the
 * promise line: MailerLite's confirmation email is a locked default that sets no
 * expectation about frequency, so the promise has to be made here, at the moment
 * somebody is deciding whether to hand over an address.
 */

const FORM_HTML = `
<div id="mlb2-44831312" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-44831312">
  <div class="ml-form-embedWrapper embedForm">
    <div class="ml-form-embedBody ml-form-embedBodyDefault row-form">
      <form class="ml-block-form"
            action="https://assets.mailerlite.com/jsonp/2574390/forms/195775750310200809/subscribe"
            data-code="" method="post" target="_blank">
        <div class="ml-form-formContent">
          <div class="ml-form-fieldRow ml-last-item">
            <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">
              <label class="ml-sr-only" for="ml-email">Your email address</label>
              <input id="ml-email" type="email" name="fields[email]" class="form-control"
                     data-inputmask="" placeholder="Your email address"
                     autocomplete="email" aria-required="true" required>
            </div>
          </div>
        </div>
        <input type="hidden" name="ml-submit" value="1">
        <div class="ml-form-embedSubmit">
          <button type="submit" class="primary">Join the waitlist</button>
          <button disabled="disabled" style="display:none;" type="button" class="loading">
            <span class="ml-form-embedSubmitLoad"></span>
            <span class="ml-sr-only">Sending&hellip;</span>
          </button>
        </div>
        <input type="hidden" name="anticsrf" value="true">
      </form>
      <p class="ml-promise">
        One email, when it launches. Nothing else, and your address goes to
        nobody. Unsubscribe in a tap.
      </p>
    </div>

    <div class="ml-form-successBody row-success" style="display:none" role="status" tabindex="-1">
      <div class="ml-form-successContent">
        <h4>Almost there</h4>
        <p>Check your email and click the link to confirm your place on the waitlist.</p>
      </div>
    </div>
  </div>
</div>
`;

declare global {
  interface Window {
    ml_webform_success_44831312?: () => void;
    ml_jQuery?: unknown;
    jQuery?: unknown;
  }
}

export function WaitlistForm() {
  const mounted = useRef(false);

  useEffect(() => {
    // React 19 runs effects twice in development. Loading the vendor script
    // twice registers its handlers twice, which submits the form twice.
    if (mounted.current) return;
    mounted.current = true;

    window.ml_webform_success_44831312 = () => {
      const $ = (window.ml_jQuery || window.jQuery) as
        | ((s: string) => { show(): void; hide(): void; get(i: number): HTMLElement | undefined })
        | undefined;
      if (!$) return;

      $('.ml-subscribe-form-44831312 .row-success').show();
      $('.ml-subscribe-form-44831312 .row-form').hide();

      /* The element that had focus — the submit button — is inside the form that
         just became display:none, so focus collapses to the top of the document
         and a keyboard or screen-reader user is returned to the page header with
         no indication anything worked. Moving the caret into the message means
         the next Tab continues from where they actually are. */
      $('.ml-subscribe-form-44831312 .row-success').get(0)?.focus();
    };

    const s = document.createElement('script');
    s.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v83147fa8ce2d95cb73ece7f28b469519';
    s.async = true;
    document.body.appendChild(s);

    /* MailerLite's own impression ping, fire-and-forget by design. Left
       unhandled, a rejection prints an uncaught error to the console — and
       rejection is the normal case behind a content blocker or on a dropped
       mobile connection, both routine for a page whose traffic arrives from a
       phone. Nothing to report, so nothing is reported. */
    fetch(
      'https://assets.mailerlite.com/jsonp/2574390/forms/195775750310200809/takel',
    ).catch(() => {});
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: FORM_HTML }} />;
}
