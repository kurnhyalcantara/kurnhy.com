import clsx from 'clsx';
import Container from '../ui/container';
import { siteMetadata } from '@/data/site-metadata';
import { headerNavigation } from '@/data/navigation';
import { Link } from '../ui/link';
import ThemeToggle from '../ui/theme-toggle';
import BottomNavigation from '../ui/bottom-nav';
import { Logo } from './logo';

export default function Header() {
  return (
    <>
      <Container
        as="header"
        className={clsx(
          'bg-white/70 py-2.5 backdrop-blur-xl dark:bg-gray-900/60',
          'shadow-masere saturate-150 md:rounded-2xl',
          'outline outline-1 outline-gray-100/80 dark:outline-gray-700/60',
          siteMetadata.stickyNav && 'sticky top-2 z-50 lg:top-3'
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <Logo />
          <div className="flex items-center gap-4">
            <div className="hidden gap-1.5 sm:flex">
              {headerNavigation.map(({ href, title }) => {
                return (
                  <Link
                    key={title}
                    href={href}
                    className={clsx(
                      'relative inline-flex items-center rounded-xl px-3 py-1.5 text-sm font-medium',
                      'text-gray-700 transition-colors hover:text-gray-900',
                      'hover:bg-gray-900/5 dark:text-gray-200 dark:hover:text-white dark:hover:bg-white/10',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/10 dark:focus-visible:ring-white/15'
                    )}
                  >
                    {title}
                  </Link>
                );
              })}
            </div>
            <div
              data-orientation="vertical"
              role="separator"
              className="hidden h-4 w-px shrink-0 bg-gray-200/80 dark:bg-gray-700/70 md:block"
            />
            <div className="items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Container>
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl shadow-masere outline outline-1 outline-gray-100/80 dark:outline-gray-700/60">
        <BottomNavigation />
      </div>
    </>
  );
}
