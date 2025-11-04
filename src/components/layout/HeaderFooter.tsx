import Header from './Header';
import Footer from './Footer';

export default function HeaderFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="w-full flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
