import { NavLink, Outlet } from "react-router-dom";

// Active link: bold + underlined (not colour only). Inactive: muted text.
function navLinkClass({ isActive }: { isActive: boolean }) {
  const base = "rounded px-3 py-2 text-sm hover:bg-muted";
  return isActive
    ? `${base} font-semibold text-foreground underline underline-offset-4`
    : `${base} text-muted-foreground`;
}

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <span className="text-lg font-bold text-primary">FXDesk</span>

          <nav aria-label="Main">
            <ul className="flex gap-1">
              <li>
                {/* `end`: only active on exactly "/", otherwise "/" matches every page */}
                <NavLink to="/" end className={navLinkClass}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/rates" className={navLinkClass}>
                  Rates
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {/* The matched child route (Dashboard, Rates, ...) renders here */}
        <Outlet />
      </main>
    </div>
  );
}
