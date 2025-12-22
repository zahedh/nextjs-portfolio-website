import Header from './Header';
import Footer from './Footer';

/** Layout wrapper adding a header and footer around page content. */
export default function HeaderFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-xs md:pb-md lg:pb-lg flex min-h-screen flex-col">
      <Header />
      <main className="w-full flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
