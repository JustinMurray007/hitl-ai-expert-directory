/**
 * Automatic tax stays off.
 *
 * The business is a California sole proprietorship. Prices are tax-exclusive,
 * but there is no active Stripe Tax registration. Sending
 * `automatic_tax: { enabled: true }` with no registration collects $0 and
 * looks like tax is on.
 *
 * `STRIPE_AUTOMATIC_TAX=true` is reserved for a later change after a
 * registration is active. This build never returns an enabled tax setting,
 * even if that variable is true. `AUTOMATIC_TAX_ALLOWED` is the gate.
 */
export const AUTOMATIC_TAX_ALLOWED = false;

export function automaticTaxParam(
  flag: string | undefined,
): { enabled: true } | undefined {
  if (AUTOMATIC_TAX_ALLOWED && flag === 'true') {
    return { enabled: true };
  }
  return undefined;
}
