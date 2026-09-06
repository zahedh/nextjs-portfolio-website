/**
 * Morphing one element into another across a client-side navigation.
 *
 * The browser does the animation; this only decides when to let it photograph
 * the second page. Everything here is decoration, so every path out of it is a
 * plain navigation rather than a broken one.
 */

/**
 * How long to wait for the destination before giving up on the animation. Long
 * enough for a prefetched static route to render, short enough that a slow one
 * reads as a normal navigation rather than as a freeze.
 */
const SETTLE_TIMEOUT_MS = 400;

/**
 * The name both ends of a morph share. Only one element on a page may carry a
 * given name — two disables the transition altogether — so it is written onto
 * the element being left as the navigation starts, not onto every card.
 */
const SHARED_NAME = 'project-title';

/** The destination this morph waits for: a project page's own heading. */
export const PROJECT_TITLE_SELECTOR = '.project-page-title';

/** Whether the browser will animate a navigation, and the reader wants it to. */
export function canMorph(): boolean {
  return (
    typeof document !== 'undefined' &&
    typeof document.startViewTransition === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** True once `selector` matches; false if the wait ran out first. */
function waitFor(selector: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      resolve(true);
      return;
    }

    const finish = (arrived: boolean) => {
      observer.disconnect();
      clearTimeout(timer);
      resolve(arrived);
    };
    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) finish(true);
    });
    const timer = setTimeout(() => finish(false), SETTLE_TIMEOUT_MS);

    observer.observe(document.body, { childList: true, subtree: true });
  });
}

/**
 * Carries `element` into the element that `destinationSelector` will match once
 * `navigate` has landed.
 *
 * The App Router publishes no navigation-complete promise and `router.push`
 * returns nothing, so without a wait the browser photographs the new page
 * before React has drawn it and there is no morph to see. The wait ends on the
 * destination appearing — the very thing being photographed — and is capped so
 * a route that never arrives releases the page instead of holding it under a
 * frozen snapshot.
 */
export function morphInto(
  element: HTMLElement,
  destinationSelector: string,
  navigate: () => void
): void {
  element.style.viewTransitionName = SHARED_NAME;

  const transition: ViewTransition = document.startViewTransition(async () => {
    navigate();
    // A route that has not arrived in time has nothing to morph into, and
    // animating anyway shows the reader a title sliding into an empty page.
    // Skipping drops the animation and lets the navigation stand on its own,
    // which is what it would have done without any of this.
    if (!(await waitFor(destinationSelector))) transition.skipTransition();
  });

  // The name has to come off again. The card stays in the router cache, so
  // coming back would otherwise return a second element carrying it and
  // silently disable the next morph.
  void transition.finished
    .catch(() => undefined)
    .finally(() => {
      element.style.viewTransitionName = '';
    });
}
