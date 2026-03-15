import Header from './Header';
import Footer from './Footer';

/** Layout wrapper adding a header and footer around page content. */
export default function HeaderFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-3 sm:pb-4 md:pb-16 lg:pb-24 flex min-h-screen flex-col">
      <Header />
      <main className="w-full flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
