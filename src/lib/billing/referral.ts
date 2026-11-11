/** 30% of the pre-tax invoice amount, in cents. Stripe fees are not deducted. */
export function referralCreditCents(invoice: {
  total_excluding_tax?: number | null;
  subtotal?: number | null;
  amount_paid?: number | null;
}): number {
  const base =
    typeof invoice.total_excluding_tax === 'number'
      ? invoice.total_excluding_tax
      : typeof invoice.subtotal === 'number'
        ? invoice.subtotal
        : typeof invoice.amount_paid === 'number'
          ? invoice.amount_paid
          : 0;
  if (base <= 0) return 0;
  return Math.round(base * 0.3);
}
