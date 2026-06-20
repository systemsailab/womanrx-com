import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "California Privacy Notice",
  description: "California Consumer Privacy Act notice for WomanRx.com users.",
};

export default function CcpaPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="California Privacy Notice"
      effective="Applies to personal information collected from California residents"
    >
      <p>
        This California Privacy Notice applies to personal information that we collect
        online or offline from California residents.
      </p>

      <h2>Categories of Personal Information We Collect</h2>
      <p>We collect six categories of personal information:</p>
      <ol>
        <li><strong>Identifiers and contact information</strong> — name, email, phone, mailing address.</li>
        <li><strong>Medical and financial data</strong> — medication history, payment information.</li>
        <li><strong>Protected classifications</strong> — characteristics protected under California or federal law where required for health services.</li>
        <li><strong>Commercial information</strong> — products or services purchased.</li>
        <li><strong>Internet activity</strong> — browsing history, device information, interactions with our site.</li>
        <li><strong>Geolocation data</strong> — approximate location derived from IP or device.</li>
      </ol>

      <h2>How We Use Your Information</h2>
      <p>We process information for:</p>
      <ul>
        <li>Service delivery and order fulfillment</li>
        <li>Customer support and patient care</li>
        <li>Product and platform improvement</li>
        <li>Marketing communications</li>
        <li>Security protection and fraud prevention</li>
        <li>System maintenance and analytics</li>
        <li>Legal compliance and rights protection</li>
      </ul>

      <h2>Sales of Personal Information</h2>
      <p><strong>We do not sell your personal information.</strong></p>

      <h2>How We Share Your Information</h2>
      <p>We share information with:</p>
      <ul>
        <li>Pharmacies that fulfill prescriptions</li>
        <li>Service providers operating on our behalf</li>
        <li>Marketing partners delivering communications</li>
        <li>Third parties operating platforms we rely on for the business</li>
      </ul>

      <h2>Your Rights as a California Resident</h2>
      <p>You have the right to:</p>
      <ul>
        <li><strong>Know</strong> what personal information we have collected about you</li>
        <li><strong>Request deletion</strong> of personal information we hold</li>
        <li><strong>Opt out</strong> of the sale of personal information (we do not sell)</li>
        <li><strong>Be free from discrimination</strong> for exercising your rights</li>
      </ul>

      <h2>How to Submit a Request</h2>
      <p>Submit a request by:</p>
      <ul>
        <li>Email: <a href="mailto:support@womanrx.com">support@womanrx.com</a></li>
        <li>Contact form: <a href="/contact-us">womanrx.com/contact-us/</a></li>
      </ul>
      <p>
        We verify identity before fulfilling requests. Authorized agents may submit
        requests on your behalf with appropriate documentation. Parents or legal
        guardians may submit requests for children under 13.
      </p>

      <h2>Response Timeline</h2>
      <p>
        We will acknowledge your request within 10 business days, and provide processing
        details. We will respond substantively within 45 days, with one 45-day extension
        available where reasonably necessary.
      </p>

      <h2>Contact</h2>
      <p>
        <strong>WomanRx.com</strong>
        <br />
        <a href="mailto:support@womanrx.com">support@womanrx.com</a>
      </p>
    </LegalLayout>
  );
}
