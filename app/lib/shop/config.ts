// Feature flag: peptide commerce visibility on the front end.
// While false, the entire /shop storefront (peptide products, PDPs, cart,
// checkout) is hidden and routed to the GLP-1 offer, pending approvals.
// Editorial peptide content (e.g. /peptides, articles) is unaffected.
// GLP-1 (semaglutide/tirzepatide) products and the quiz funnel stay live.
// Flip to `true` to re-expose the peptide storefront in one place.
export const PEPTIDES_LIVE = false;
