import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How WomanRx.com collects, uses, discloses, and protects information through womanrx.com.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      effective="Last updated · January 10, 2026"
    >
      <p>
        This privacy policy describes how WomanRx.com and/or our owners and/or affiliates
        (collectively "Company," "our," "we," or "us") collect, use, disclose, and
        protect information through the WomanRx.com website at womanrx.com. The policy
        applies only to Site-related information collection and does not cover other
        offerings or products. By using the Site, you accept these practices and the
        Terms of Use.
      </p>
      <p>
        California residents should reference the California Privacy Notice available at{" "}
        <a href="/ccpa">/ccpa/</a>.
      </p>

      <h2>About the Site</h2>
      <p>The Site gathers medication information, geographic location, and user preferences to:</p>
      <ul>
        <li>Check medication prices at multiple nearby pharmacies</li>
        <li>Show comparable medication pricing from third parties</li>
        <li>Send discount cards upon request</li>
        <li>Provide pharmacy coupons</li>
      </ul>

      <h2>Categories of Information We Collect</h2>
      <p>Information collected includes:</p>
      <ul>
        <li>Medication details (names, dosage) and preferred pharmacy</li>
        <li>Purchase transaction information including discount card usage</li>
        <li>
          Geographic location data: geolocation data, zip code, region, city, street
          address, time zone, latitude and longitude information
        </li>
        <li>User preferences</li>
        <li>Technical device data and application software information</li>
        <li>Metadata stored on devices</li>
      </ul>
      <p>
        The Site automatically collects usage information, device operating systems,
        identifiers, and IP addresses. Google Analytics uses "cookies", which are text
        files placed on your device, to help us analyze how you use our Site.
      </p>

      <h2>How We Use the Information We Collect</h2>
      <p>Information purposes include:</p>
      <ul>
        <li>Operating the Site and providing service features</li>
        <li>Fulfilling requested information and services</li>
        <li>Customizing user experience with personalized content</li>
        <li>Improving the Site and developing new products</li>
        <li>Account management, patient care, and customer service</li>
        <li>Delivering marketing communications</li>
        <li>Communicating service notices via email or SMS</li>
        <li>Detecting and preventing fraud and misuse</li>
        <li>Performing data analytics</li>
      </ul>
      <p>
        When permitted by law, the company may combine the information you provide us,
        or that we collect from third parties, with other information maintained by us.
      </p>

      <h2>How We Share Information We Collect</h2>
      <p>Information disclosure occurs with:</p>
      <ul>
        <li>Pharmacies and service partners</li>
        <li>Business partners delivering marketing communications</li>
        <li>Legal compliance scenarios or safety protection needs</li>
        <li>Potential corporate transaction partners</li>
        <li>Service providers working on company behalf</li>
      </ul>
      <p>
        Our service providers are required to agree to protect your personal information
        consistent with this Privacy Policy.
      </p>
      <p>
        The company shares anonymized demographic reports and non-identifying information
        with third parties. Text messaging opt-in data remains undisclosed to third
        parties.
      </p>

      <h2>Information Security</h2>
      <p>
        The company takes reasonable steps to protect your personal information, which is
        any information that identifies you or could reasonably be linked to you. Secure
        Sockets Layer (SSL) encryption protects information during Internet transport,
        indicated by https or lock symbols.
      </p>
      <p>
        The company acknowledges limitations: we cannot guarantee that the Internet or
        any other technical system will be 100% secure or error-free. Unencrypted email
        communications carry interception risks.
      </p>

      <h2>Your Choices</h2>
      <p>
        Users may opt out of marketing emails using unsubscribe links or contacting{" "}
        <a href="mailto:support@womanrx.com">support@womanrx.com</a>. Administrative
        and safety notices cannot be declined.
      </p>
      <p>
        The Site does not currently respond to "do not track" signals or other
        mechanisms that provide a method to opt out of the collection of information
        over time.
      </p>

      <h2>Information About Minors</h2>
      <p>
        The Site is intended for adults only and is not directed to, nor do we knowingly
        collect information from, individuals under the age of 18. Parents should contact
        support regarding unauthorized minor information collection.
      </p>

      <h2>California Residents</h2>
      <p>
        Per California Civil Code Section 1798.83, residents may request disclosure
        information once yearly via support@womanrx.com. Additional
        provisions apply under the <a href="/ccpa">California Privacy Notice</a>.
      </p>

      <h2>Links to Other Websites</h2>
      <p>
        The Site includes external third-party links. We are not responsible for the
        collection, use, and disclosure of your information on those websites and other
        online services.
      </p>

      <h2>Cookies and Similar Tools</h2>
      <p>
        Cookies store location and browsing information. A cookie is a unique numeric
        code that we transfer to your computer that lets us know your location and the
        information visited while on our website. Web beacons provide usage data.
      </p>
      <p>
        Users may disable cookies via browser settings, though Site functionality may
        suffer. By using our Site and not disabling cookies, you consent to their use.
      </p>

      <h2>Retention</h2>
      <p>
        The company retains personal information per record retention policies and legal
        requirements. Users requesting removal should contact{" "}
        <a href="mailto:support@womanrx.com">support@womanrx.com</a> or:
      </p>
      <p>
        <strong>WomanRx.com</strong>
        <br />
        Attn: Privacy Team / Regulatory Compliance
      </p>

      <h2>Access from Outside the United States</h2>
      <p>
        If you access the Site from outside the United States, please be aware that
        personal information may be transferred to, stored in, and processed in the
        United States.
      </p>

      <h2>Changes and Updates</h2>
      <p>
        Policy modifications are posted with updated dates. Your continued use of the
        Site after that date means you agree to this Privacy Policy and any updates.
      </p>

      <h2>Contact Us</h2>
      <p>
        <a href="mailto:support@womanrx.com">support@womanrx.com</a>
      </p>
      <p>
        <strong>WomanRx.com</strong>
        <br />
        Attn: Privacy Team / Regulatory Compliance
      </p>
    </LegalLayout>
  );
}
