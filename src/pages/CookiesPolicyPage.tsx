import { LegalPageLayout } from '@/components/layout/LegalPageLayout';
import { mailHref, site } from '@/config/site';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

// PLACEHOLDER CONTENT — replace with the final, legally reviewed Cookies Policy.
// Review this page whenever analytics, advertising pixels or chat widgets are added.
export default function CookiesPolicyPage() {
  useDocumentMeta('cookies');

  return (
    <LegalPageLayout
      title="Cookies Policy"
      summary={`How the ${site.name} website uses cookies and similar technologies.`}
    >
      <h2>1. What cookies are</h2>
      <p>
        This section will explain what cookies and similar technologies (such as local storage) are and why websites
        use them.
      </p>

      <h2>2. Cookies used on this website</h2>
      <p>
        This section will list each cookie or similar technology used on {site.domainLabel}, its purpose and how long it
        lasts. Categories may include:
      </p>
      <ul>
        <li>Strictly necessary — required for the website to work.</li>
        <li>Analytics — help understand how visitors use the website, if enabled.</li>
        <li>Marketing — used to measure advertising, if enabled.</li>
      </ul>

      <h2>3. Third-party services</h2>
      <p>
        This section will describe third-party services that may set their own cookies or receive technical data, such
        as web font providers or embedded tools.
      </p>

      <h2>4. Managing cookies</h2>
      <p>This section will explain how visitors can control or delete cookies through their browser settings.</p>

      <h2>5. Contact</h2>
      <p>
        Questions about cookies can be sent to <a href={mailHref}>{site.contact.email}</a>.
      </p>
    </LegalPageLayout>
  );
}
