import Link from 'next/link';
import { Heading, BodyText } from '@/components';
import { PrimaryButton } from '@/components';
import { en } from '@/language/english';

/**
 * Custom 404 Page Not Found component
 * Displayed when a user navigates to a non-existent route
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="font-heading text-brand-500 text-[120px] leading-none font-bold sm:text-[180px]">
          {en.notFound.code}
        </div>

        <Heading as="h1" className="text-center">
          {en.notFound.heading}
        </Heading>

        <BodyText className="max-w-md text-center text-neutral-700 dark:text-neutral-300">
          {en.notFound.description}
        </BodyText>

        <Link href="/" className="mt-4">
          <PrimaryButton>{en.notFound.returnHome}</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
