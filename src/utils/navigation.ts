/**
 * Determines whether the current page is an active focus/practice environment
 * where Header and Footer should be hidden to provide an immersive, distraction-free typing canvas.
 */
export function isFocusModePage(pathname: string | null): boolean {
  if (!pathname) return false;

  // 1. Dynamic Course lesson practice (e.g. /courses/english/lesson-1)
  if (pathname.match(/^\/courses\/[^/]+\/[^/]+$/)) return true;

  // 3. Active practice arenas (/practice/test, /practice/words, /practice/sentences, /practice/quotes, /practice/numbers, /practice/custom/test, /practice/english, etc. But keep Header/Footer on /practice and /practice/custom builder)
  if (pathname.startsWith("/practice/")) {
    if (pathname === "/practice/custom") return false;
    return true;
  }

  // 4. Active exam arenas (/exam/govt/test, /exam/ranked)
  if (pathname === "/exam/govt/test" || pathname === "/exam/ranked") return true;

  // 5. Active test slug arenas (/tests/[testSlug], but keep Header/Footer on /tests hub)
  if (pathname.startsWith("/tests/") && pathname !== "/tests") return true;

  // 6. Interactive Game screen (/game), Dashboard (/dashboard), Admin Control Panel (/admin), and Institute Portal (/institute)
  if (pathname === "/game" || pathname === "/dashboard" || pathname === "/admin" || pathname === "/institute") return true;

  return false;
}
