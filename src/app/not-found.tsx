import type { Metadata } from 'next';
import HeaderFooter from '@/components/layout/HeaderFooter';
import { PrimaryButton } from '@/components';
import { en } from '@/language/english';

export const metadata: Metadata = {
  title: '404 Not Found | Zahed Heidari',
};

/** Shown for any route that does not exist, inside the site's own header and
    footer so a visitor arriving on a broken link can reach every section. */
export default function NotFound() {
  return (
    <HeaderFooter>
      <div className="screen-parent">
        {/* Cancels the shell's header offset, as a project page does. */}
        <section className="screen-section -mt-18">
          <div className="section-inner">
            <div className="page-head">
              <p className="page-meta">{en.notFound.code}</p>
              <h1 className="page-title">{en.notFound.heading}</h1>
              <p className="page-summary">{en.notFound.description}</p>
              <div className="page-actions mt-2">
                <PrimaryButton hyperlink="/" className="page-action">
                  {en.notFound.returnHome}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </HeaderFooter>
  );
}
