import { LegalPageLayout } from '@/components/layout/LegalPageLayout';
import { mailHref, site } from '@/config/site';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

// PLACEHOLDER CONTENT — replace with the final, legally reviewed Terms and Conditions.
export default function TermsAndConditionsPage() {
  useDocumentMeta('terms');

  return (
    <LegalPageLayout
      title="Terms and Conditions"
      summary={`The terms that will apply to use of the ${site.name} website.`}
    >
      <h2>1. Introduction</h2>
      <p>
        This section will set out who operates {site.domainLabel} and how these terms apply to visitors using the
        website.
      </p>

      <h2>2. Use of the website</h2>
      <p>This section will describe acceptable use of the website and any restrictions.</p>

      <h2>3. Information on this website</h2>
      <p>
        This section will explain the nature of the content published on the website, including service descriptions,
        plan outlines and sample project results.
      </p>

      <h2>4. Enquiries and strategy calls</h2>
      <p>
        This section will explain how call requests and enquiries made through the website are handled, and that any
        project work is governed by a separate written agreement and quote.
      </p>

      <h2>5. Intellectual property</h2>
      <p>This section will cover ownership of the website&apos;s content, branding and logo.</p>

      <h2>6. Liability</h2>
      <p>This section will set out the limits of liability relating to use of the website.</p>

      <h2>7. Governing law</h2>
      <p>This section will state the governing law and jurisdiction.</p>

      <h2>8. Contact</h2>
      <p>
        Questions about these terms can be sent to <a href={mailHref}>{site.contact.email}</a>.
      </p>
    </LegalPageLayout>
  );
}
