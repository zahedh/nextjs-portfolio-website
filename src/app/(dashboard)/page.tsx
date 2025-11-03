export default function Home() {
  return (
    <main className="flex flex-col bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      {/* 2️⃣ Hero */}
      <section className="border-brand-600 border-4 p-6 text-center">
        <h2 className="text-lg font-semibold">Hero Section</h2>
      </section>

      {/* 3️⃣ Skills Collage */}
      <section className="border-brand-700 border-4 p-6 text-center">
        <h2 className="text-lg font-semibold">Skills Collage Section</h2>
      </section>

      {/* 4️⃣ Projects */}
      <section className="border-brand-800 border-4 p-6 text-center">
        <h2 className="text-lg font-semibold">Projects Section</h2>
      </section>

      {/* 5️⃣ About */}
      <section className="border-brand-900 border-4 p-6 text-center">
        <h2 className="text-lg font-semibold">About Section</h2>
      </section>

      {/* 6️⃣ Timeline */}
      <section className="border-brand-400 border-4 p-6 text-center">
        <h2 className="text-lg font-semibold">Timeline Section</h2>
      </section>

      {/* 7️⃣ GitHub Contributions */}
      <section className="border-brand-300 border-4 p-6 text-center">
        <h2 className="text-lg font-semibold">GitHub Contributions Section</h2>
      </section>
    </main>
  );
}
