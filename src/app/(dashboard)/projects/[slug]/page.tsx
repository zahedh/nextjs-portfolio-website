import { notFound } from 'next/navigation';

export default async function ProjectExpanded({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) notFound();

  return <div>Project: {slug}</div>;
}
