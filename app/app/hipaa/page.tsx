import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "HIPAA Notice of Privacy Practices",
  description:
    "How protected health information (PHI) at WomanRx.com may be used and disclosed, and how you can access it.",
};

export default function HipaaPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="HIPAA Notice of Privacy Practices"
      effective="This Notice describes how medical information about you may be used and disclosed and how you can get access to this information. Please review it carefully."
    >
      <p>
        When this Notice of Privacy Practices ("Notice") refers to "we" or "us," it is
        referring to WomanRx.com and all the pharmacists who provide health care services
        and the employees of our pharmacy. We are required by law to maintain the
        privacy of your protected health information ("PHI"), to follow the terms of
        the Notice currently in effect, to give you this Notice setting forth our legal
        duties and privacy practices concerning your PHI, and to notify affected
        individuals following a breach of unsecured PHI. This Notice describes how we
        may use and disclose your PHI. Additionally, this Notice explains the rights
        you have with respect to your PHI, and certain obligations we must abide by in
        accordance with the law. We reserve the right to amend this Notice. If we make
        any material revisions to this Notice, we will post a copy of the revised
        Notice in the pharmacy, on our website, and will offer you a copy of the
        revised Notice.
      </p>

      <h2>I. Use and Disclosure of Your PHI</h2>
      <p>
        We will use and disclose your PHI for treatment, payment and health care
        operations. We may also use your PHI for other purposes that are permitted
        and/or required by law and pursuant to your written authorization. Any other
        uses not described in this Notice will only be made with your explicit written
        authorization, which you may revoke at any time by providing us with written
        notice of your revocation.
      </p>

      <h3>A. Treatment</h3>
      <p>
        We may use and disclose your PHI in order to provide you with prescription and
        supply services. We may disclose your PHI to other pharmacists, pharmacy
        technicians and health care providers that are involved in your care. You will
        receive an individual notice and have the opportunity to opt out of any
        subsidized treatment communications.
      </p>

      <h3>B. Payment</h3>
      <p>
        We will use and disclose your PHI in order to obtain payment for the health care
        services we provide to you. We may also need to disclose your PHI to receive
        prior approval from your health plan or to determine if your health plan will
        cover a certain prescription or service.
      </p>

      <h3>C. Health Care Operations</h3>
      <p>
        We may use and disclose your PHI in connection with the management of our
        pharmacy. For example, this may include quality assessment and improvement,
        internal compliance audits, and performance evaluations. Additionally, we may
        use your PHI for our business management and general administrative activities.
      </p>

      <h3>D. Prescription Refill Reminders, Treatment Alternatives or Health-Related Benefits</h3>
      <p>
        We may use and disclose your PHI to contact you to remind you about prescription
        refills, to tell you about treatment options or alternatives, or to inform you
        about health-related benefits or services that may be of interest to you.
      </p>

      <h3>E. Family Members, Relatives or Close Friends</h3>
      <p>
        Unless you object to such disclosure, we may disclose your PHI to your family
        members, relatives or close personal friends, or any other persons identified by
        you as being involved in the treatment or payment for your medical care. If you
        are not present to agree or object to our disclosure of your PHI to a family
        member, relative or friend, we may exercise our professional judgment to
        determine whether the disclosure is in your best interest. If we decide to
        disclose your PHI, we will only disclose the PHI that is relevant to your
        treatment or payment.
      </p>

      <h3>F. Other Permitted and Required Uses and Disclosures</h3>
      <p>
        We may use your PHI without obtaining your authorization and without offering
        you the opportunity to agree or object as follows:
      </p>
      <ul>
        <li>As required by law, provided that the use or disclosure will be made in compliance with applicable law;</li>
        <li>To a public health authority that is authorized by law to collect or receive such information, or to a foreign government agency acting in collaboration with a public health authority, for activities including preventing or controlling disease, reporting deaths, reporting adverse effects of medications, notification of communicable disease, and reporting abuse or neglect under certain circumstances;</li>
        <li>To a health oversight agency for oversight activities authorized by law, including audits and inspections, and civil, administrative or criminal investigations, proceedings or actions;</li>
        <li>For judicial or administrative proceedings purposes in response to a subpoena, court order, or discovery request, but only if efforts have been made to inform you about the request or to obtain an order protecting the information requested;</li>
        <li>To law enforcement to report certain injuries, comply with court orders or warrants, identify a suspect, fugitive, missing person or victim, or to report a crime;</li>
        <li>To a coroner or medical examiner to perform duties authorized by law such as identification of a deceased person or determining the cause of death;</li>
        <li>To funeral directors, consistent with applicable law, as necessary to carry out their duties;</li>
        <li>To organ procurement organizations or similar entities for the purpose of facilitating organ, eye or tissue donation and transplantation;</li>
        <li>For research purposes provided that certain approvals take place and assurances are given;</li>
        <li>To avert a serious threat to health or safety, so long as the disclosure is only to a person who is reasonably able to prevent or lessen such threat;</li>
        <li>For military and veterans activities to assure the proper execution of a military mission and to determine eligibility for benefits;</li>
        <li>For national security and intelligence activities;</li>
        <li>For protection of the President and other authorized persons or foreign heads of state;</li>
        <li>To a correctional institution or law enforcement custodian if you are an inmate or under custody;</li>
        <li>To the extent necessary to comply with laws relating to workers' compensation and work-related injuries.</li>
      </ul>

      <h2>II. Your Rights as Our Patient</h2>
      <p>
        As our patient, you have a number of rights associated with your PHI. The
        following describes your specific rights.
      </p>

      <h3>A. Right to Request Restrictions</h3>
      <p>
        You have the right to request restrictions or limitations on how we use and/or
        disclose your PHI; however, we do not have to agree to your requested
        restriction or limitation (except for transactions you paid for in full
        out-of-pocket). Your written request must specify: (1) if you would like to
        restrict or limit our use and/or disclosure; (2) what information you want
        restricted or limited; and (3) to whom the restriction or limitation applies
        (e.g., spouse).
      </p>

      <h3>B. Right to Confidential Communications</h3>
      <p>
        You have the right to receive confidential communications concerning your PHI
        by alternative means or via alternative locations. If you wish to receive
        confidential communications via alternative means or locations, please submit
        your request in writing to the Privacy Officer. We will accommodate all
        reasonable requests.
      </p>

      <h3>C. Right to Access and Obtain Copies</h3>
      <p>
        You have the right to access, inspect and obtain a copy of your PHI, including
        any electronic PHI; provided, however, you are not entitled to access certain
        PHI exempted under HIPAA. If you request a copy of your PHI, you will receive a
        response in a timely fashion but may be charged a reasonable, cost-based fee to
        cover copy costs and postage.
      </p>

      <h3>D. Right to Accounting of Disclosures</h3>
      <p>
        You have the right to receive an accounting of disclosures of your PHI made by
        us, including disclosures to or by our business associate(s), for a period of
        six (6) years prior to the date on which you request an accounting of
        disclosures, or such lesser period as you indicate. You will receive one
        request annually free of charge.
      </p>

      <h3>E. Right to Request Amendment</h3>
      <p>
        If you believe we have PHI about you that is incorrect or incomplete, you may
        make a written request to us stating the reasons to support any requested
        amendment. We may deny your request for amendment if, for example, we
        determine that the PHI you requested was not created by us or is already
        accurate and complete.
      </p>

      <h3>F. Right to Paper Copy of Notice</h3>
      <p>
        You have the right at any time to obtain a paper copy of this Notice, even if
        you receive this Notice electronically. Please send your request in writing to
        the Privacy Officer at the address listed below.
      </p>

      <h3>G. Right to Opt-Out of Fundraising</h3>
      <p>
        You have the right to opt-out of fundraising. Your PHI will not be used for
        fundraising purposes or sold without your prior authorization.
      </p>

      <h2>III. Additional Information / Questions or Complaints</h2>

      <h3>A. Contact Information</h3>
      <p>
        If you need any additional information about this Notice or wish to exercise
        any of your rights set forth in this Notice, please contact the Privacy Officer
        at the following address:
      </p>
      <p>
        <strong>WomanRx.com</strong>
      </p>
      <p>
        If you believe your privacy rights have been violated, you may file a complaint
        without retaliation with the Privacy Officer of the pharmacy or with:
      </p>
      <p>
        <strong>Secretary of the Department of Health and Human Services</strong>
        <br />
        200 Independence Avenue SW
        <br />
        Washington D.C. 20201
      </p>
    </LegalLayout>
  );
}
