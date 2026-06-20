import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Returns & Refund Policy",
  description: "Return and refund policy for prescription medications and OTC products from WomanRx.com.",
};

export default function ReturnsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Returns & Refund Policy"
      effective="Per State and Federal pharmacy regulations"
    >
      <h2>Prescription Medications</h2>
      <p>
        State and Federal regulations do not allow the return of prescription
        medications after being dispensed by the pharmacy. Once charged and handed to
        carriers, <strong>all sales become final.</strong>
      </p>
      <p>
        Customers can modify orders before shipment via their account. Damaged or lost
        items require contacting patient care at{" "}
        <a href="mailto:support@womanrx.com">support@womanrx.com</a>.
      </p>

      <h2>Over-the-Counter Products</h2>
      <p>
        We accept returns on unopened items within <strong>30 days after the sale.</strong>{" "}
        Customers pay return shipping costs; COD returns are not accepted. WomanRx.com
        reserves the right to deny returns if products appear tampered with, opened, or
        not in original condition. After approval, refunds are issued to the original
        payment method.
      </p>

      <h2>Return Address</h2>
      <p>
        Contact{" "}
        <a href="mailto:support@womanrx.com">support@womanrx.com</a> for
        return authorization and the correct return address.
      </p>

      <h2>Lost Packages</h2>
      <p>
        In the rare case your package is lost in transit, WomanRx.com will reship your
        prescription or non-prescription order. We coordinate with carriers to locate
        packages before reshipping.
      </p>

      <h2>Contact</h2>
      <ul>
        <li>Email: <a href="mailto:support@womanrx.com">support@womanrx.com</a></li>
      </ul>
    </LegalLayout>
  );
}
