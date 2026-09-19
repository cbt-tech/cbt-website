import { LegalPolicyPage, type PolicySection } from "@/components/common/LegalPolicyPage";
import { createMetadata } from "@/lib/metadata";
export const metadata = createMetadata({ title: "Privacy Policy", path: "/privacy-policy" });
const sections: PolicySection[] = [
  { id: "scope", title: "Who we are and what this policy covers", paragraphs: [
    "Cantabridge Technologies, based in Rajasthan, India, operates this website. This policy covers website enquiries, consultations, developer hiring requests, career applications, website-agent conversations where enabled, and related correspondence.",
    "Client systems and project data may be governed by a separate service, confidentiality, or data-processing agreement. This policy does not replace those agreements or reduce rights and obligations under applicable law.",
  ] },
  { id: "information", title: "Information collected and why", paragraphs: [
    "Enquiries and consultations: name, email, optional phone, company or organization where provided or required, selected service, project details, and a form-start timestamp used to check submissions. We use these details to assess your request, contact you, and discuss suitable services.",
    "Developer hiring requests: contact name, company, work email, optional phone, expertise required, developer count, engagement type, duration, expected start, optional budget, working-hour or timezone requirements, and project brief. We use them to assess staffing and engagement requirements and respond to you.",
    "Career applications: name, email, optional phone, location, area of interest, experience, optional current company, LinkedIn and portfolio links, application message, résumé, and career-use consent. We use this information to assess your profile and contact you about suitable opportunities. Résumés are delivered as email attachments.",
    "Every form also sends your privacy acknowledgment. Notification emails include the policy version and server receipt time. This records an acknowledgment associated with the submission; it does not independently verify the submitter's identity.",
  ] },
  { id: "technical", title: "Technical information and spam prevention", paragraphs: [
    "Requests include technical information such as IP addresses, origin, and browser request headers. Our endpoints use IP addresses for temporary rate limits in server memory. Career submissions also use a temporary fingerprint derived from selected application details to detect duplicates. Hidden form fields help detect automated submissions.",
    "Hosting and email services may generate access, delivery, and error logs needed to operate and secure the site. Application error messages do not intentionally include complete submissions. The current website code does not include advertising trackers or visitor analytics. See the Cookie Policy for browser-storage information.",
  ] },
  { id: "grounds", title: "Purposes and grounds for processing", paragraphs: [
    "We process submitted information for the specific enquiry or recruitment purpose above and related communication and administration. Where consent is required, we request an affirmative checkbox, unchecked by default. Career applications also require permission to consider your profile for opportunities.",
    "Where applicable law permits, we may process information to take requested steps before an engagement, perform an agreement, comply with law, prevent fraud and abuse, resolve disputes, and establish or defend legal claims. These website forms do not collect payment-card details.",
  ] },
  { id: "responsibilities", title: "Sharing information responsibly", paragraphs: [
    "Provide accurate information you are entitled to share. Do not submit passwords, access tokens, payment-card numbers, government identity documents, health information, or confidential client records through general-purpose forms. Include only relevant information. Contact us first to agree a suitable transfer method and contractual safeguards if a project requires sensitive material.",
    "If you submit another person's information, you must have the necessary authority and give them relevant notice. We may request clarification, decline a request, or remove unnecessary material. Your responsibilities do not exclude our duties under applicable privacy law.",
  ] },
  { id: "sharing", title: "Providers and disclosures", paragraphs: [
    "Depending on our configured submission service, form details are stored in company-controlled Google Sheets or sent through Resend to our company mailbox. When Google storage is enabled, career résumés are stored in a restricted Google Drive folder and the sheet contains a file link. Google processes this information to provide Sheets, Drive, and Apps Script. When email delivery is enabled, Resend and our receiving email provider process submissions, including career résumé attachments. Website hosting providers process requests needed to serve the site. Authorized company personnel access submissions for their stated purpose.",
    "Information may be disclosed to professional advisers where necessary for advice or a dispute, or to authorities where required by law. A business restructuring or transfer may involve necessary information, subject to applicable safeguards and notices. We do not sell form information or share it with advertisers for targeted advertising.",
  ] },
  { id: "website-agent", title: "Website agent and Salesforce", paragraphs: [
    "Our website agent uses Salesforce Embedded Messaging and agent features to assist with enquiries. The chat component loads across the site and may open automatically. Salesforce receives technical requests when it loads; messages, details you choose to share, and relevant session information may be processed by Salesforce and its service providers to operate the agent, subject to the applicable service terms and privacy arrangements. Avoid sharing sensitive or confidential information; contact us by email for privacy requests or human assistance.",
    "Automated replies may contain errors and do not create contractual commitments. Salesforce is a trademark of Salesforce, Inc.; the name is used only to identify the technology provider, without implying sponsorship, endorsement, or partnership. Using a third-party provider does not remove our responsibilities under applicable law.",
  ] },
  { id: "locations", title: "Processing locations", paragraphs: [
    "We operate in India. Google, email, and hosting providers may process information in other countries according to the services and account settings used. Resend's data-processing terms describe processing in the United States and the use of subprocessors. Applicable transfer restrictions and safeguards must be observed where required; this policy is not a waiver of those requirements.",
  ] },
  { id: "retention", title: "Retention and deletion", paragraphs: [
    "Submissions are retained in company-controlled spreadsheets, résumé folders, email correspondence, and provider systems according to the submission service used. Enquiry and hiring records are retained while handling the request and resulting engagement, career records while assessing relevant opportunities. Necessary legal, accounting, security, and dispute obligations may justify additional retention.",
    "We review continued need and delete or anonymize information when no longer needed, subject to legal requirements. Provider logs, backups, and mailbox archives may have separate retention cycles. Rate-limit and duplicate checks use short windows and server memory and may reset on server restart. You may request deletion or withdraw consent using the contact details below; necessary legal records may remain and backups may follow their normal removal cycle.",
  ] },
  { id: "security", title: "Security and incidents", paragraphs: [
    "The site uses input validation, size limits, origin checks, spam checks, and rate limits to reduce abuse. Career files are checked for permitted type, size, and file signatures; these checks are not a malware scan. Operational security also depends on protection of company mailboxes, provider accounts, and hosting access.",
    "No internet transmission or storage system is guaranteed completely secure. Contact us promptly about suspected issues and avoid sending credentials. We will handle incidents and required notifications in accordance with applicable law. This statement does not disclaim statutory privacy duties or responsibility that cannot lawfully be excluded.",
  ] },
  { id: "rights", title: "Choices, requests, and complaints", paragraphs: [
    "Email contact@cantabridgetechnologies.com with the subject 'Privacy request' to request access, correction, deletion, withdrawal of consent, or to raise a complaint. Identify the relevant submission or correspondence. We may seek proportionate verification of identity or authority; do not send identity documents unless we arrange a suitable method.",
    "Withdrawal does not affect processing already lawfully completed but may prevent continued handling of an enquiry or application. We will assess requests and respond within applicable legal deadlines. Further rights given by applicable law, including representation, nomination, or complaints to a competent authority, remain available.",
  ] },
  { id: "children-links", title: "Children and external websites", paragraphs: [
    "Forms are intended for adults aged 18 or older acting for themselves or an organization. We do not knowingly seek children's information. A parent or guardian should contact us if a child's information has been submitted so we can assess removal and applicable obligations.",
    "External websites have their own policies and collection practices, which we do not control. This policy covers our website and the processing described here.",
  ] },
  { id: "updates", title: "Updates to this policy", paragraphs: [
    "We may update this notice when features, providers, or legal requirements change. The date and version identify the current notice. Where a change requires new notice or fresh consent, we will provide it as required. Updating this page alone is not consent to unrelated new uses of previously submitted information.",
  ] },
];

export default function PrivacyPolicyPage() {
  return <LegalPolicyPage title="Privacy Policy" introduction="How we handle information you share with Cantabridge Technologies and how to exercise your choices." sections={sections} />;
}
