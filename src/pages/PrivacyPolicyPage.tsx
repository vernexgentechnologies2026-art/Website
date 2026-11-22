import { LegalPageLayout } from '@/components/layout/LegalPageLayout';
import { mailHref, site } from '@/config/site';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

// PLACEHOLDER CONTENT — replace with the final, legally reviewed Privacy Policy.
export default function PrivacyPolicyPage() {
  useDocumentMeta('privacy');

  return (
    <LegalPageLayout
      title="Privacy Policy"
      summary={`How ${site.name} handles personal information shared through this website.`}
    >
      <h2>1. About this policy</h2>
      <p>
        This section will identify {site.name} as the organisation responsible for personal information collected
        through {site.domainLabel}, and explain when the policy applies.
      </p>

      <h2>2. Information we may collect</h2>
      <p>The final policy will list the categories of information collected, which may include:</p>
      <ul>
        <li>Details you enter when requesting a call, such as your name, phone / WhatsApp number and business name.</li>
        <li>Messages you send us by email, phone or WhatsApp.</li>
        <li>Technical information that browsers send to websites, such as device and browser type.</li>
      </ul>

      <h2>3. How information is used</h2>
      <p>
        This section will describe the purposes for which information is used — for example, responding to enquiries
        and arranging strategy calls — and the basis for doing so.
      </p>

      <h2>4. Sharing and third-party services</h2>
      <p>
        This section will list any service providers involved in operating the website and handling enquiries (for
        example hosting, scheduling or messaging tools) and how information is shared with them.
      </p>

      <h2>5. Retention and security</h2>
      <p>This section will explain how long information is kept and the measures used to protect it.</p>

      <h2>6. Your choices and rights</h2>
      <p>
        This section will explain how you can request access to, correction of or deletion of your information, in line
        with applicable Indian law.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about privacy can be sent to <a href={mailHref}>{site.contact.email}</a>.
      </p>
    </LegalPageLayout>
  );
}
