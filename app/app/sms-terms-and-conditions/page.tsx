import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "SMS Terms and Conditions",
  description:
    "SMS opt-in, frequency, STOP/HELP keywords, and carrier disclaimer for WomanRx.com text communications.",
};

export default function SmsTermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="SMS Terms and Conditions"
      effective="Mobile messaging program terms"
    >
      <h2>What You Are Opting In To</h2>
      <p>
        Users who provide a mobile number consent to receive SMS messages from WomanRx.com
        about consultations, follow-ups regarding continuing care, treatment updates,
        prescription or order notifications, and membership services. Opting in is
        voluntary and is not required for purchase.
      </p>

      <h2>Opt-In Confirmation</h2>
      <p>Upon enrollment, you will receive a message stating:</p>
      <blockquote>
        You have successfully opted in to receive SMS messages regarding consultations,
        care updates, and service notifications. Message frequency may vary. Msg & data
        rates may apply.
      </blockquote>

      <h2>Message Frequency</h2>
      <p>
        Communications vary based on your engagement level and include consultation
        reminders, follow-ups, order updates, and important care-related notifications.
      </p>

      <h2>Rates</h2>
      <p>
        Standard message and data rates may apply depending on your mobile carrier and
        service plan.
      </p>

      <h2>Opt-Out</h2>
      <p>
        You can unsubscribe at any time by replying <strong>STOP</strong> to any
        message. A final confirmation message will follow, after which no further texts
        will be sent unless you re-enroll.
      </p>

      <h2>Help</h2>
      <p>
        Reply <strong>HELP</strong> to any SMS for assistance, or email{" "}
        <a href="mailto:support@womanrx.com">support@womanrx.com</a>.
      </p>

      <h2>Carrier Disclaimer</h2>
      <p>Mobile carriers are not liable for delayed or undelivered messages.</p>

      <h2>Data Sharing</h2>
      <p>SMS opt-in data is not shared with third parties.</p>

      <h2>Contact</h2>
      <p>
        <strong>WomanRx.com</strong>
        <br />
        <a href="mailto:support@womanrx.com">support@womanrx.com</a>
      </p>
    </LegalLayout>
  );
}
