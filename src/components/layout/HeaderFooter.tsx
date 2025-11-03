import Header from './Header';
import Footer from './Footer';

export default function HeaderFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-6rem)] flex-grow bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
        {children}
      </main>
      <Footer />
    </>
  );
}
