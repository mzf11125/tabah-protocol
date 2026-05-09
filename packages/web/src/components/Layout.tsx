import { Outlet, NavLink } from "react-router-dom";
import { Activity, Megaphone, Building2, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", icon: Activity, label: "Dashboard", end: true },
  { to: "/campaigns", icon: Megaphone, label: "Campaigns" },
  { to: "/partners", icon: Building2, label: "Partners" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-stone-50">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 border-r border-stone-200 bg-white transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center gap-2 border-b border-stone-200 px-4">
          <Activity className="h-5 w-5 text-stone-900" />
          <span className="font-bold tracking-tight">Tabah</span>
          <span className="text-xs text-stone-400">v0.1</span>
        </div>
        <nav className="p-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-stone-100 text-stone-900"
                    : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-stone-200 bg-white px-4 lg:px-6">
          <button
            className="lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <h1 className="text-sm font-medium text-stone-500">Emergency Response Dashboard</h1>
        </header>
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
