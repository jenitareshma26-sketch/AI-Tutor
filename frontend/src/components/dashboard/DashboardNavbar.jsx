import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
import { Link } from "react-router-dom";

function DashboardNavbar({ onToggleSidebar, isDark, onToggleTheme }) {
  return (
    <header
      className={`sticky top-0 z-30 border-b px-4 py-3 backdrop-blur xl:px-6 ${
        isDark ? "border-slate-800 bg-slate-950/85" : "border-[#E7D8C4] bg-[#FFF9EF]/85"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition ${
              isDark
                ? "border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                : "border-[#E7D8C4] bg-white text-[#7B1E1E] hover:bg-[#F8EFE0]"
            }`}
            aria-label="Toggle sidebar"
          >
            <Menu size={18} />
          </button>

          <Link to="/" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#800000] shadow-md">
              <img src="/logo.png" alt="Tutorix AI logo" className="h-full w-full scale-[2.2] object-cover" />
            </span>
            <div className="leading-none">
              <p className={`text-[22px] font-black tracking-tight ${isDark ? "text-white" : "text-[#7B1E1E]"}`}>
                Tutorix AI
              </p>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-slate-400" : "text-[#8B6B52]"}`}>
                AI Tutoring + Freelance Hub
              </p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition ${
              isDark
                ? "border-slate-700 bg-slate-900 text-amber-300 hover:bg-slate-800"
                : "border-[#E7D8C4] bg-white text-[#7B1E1E] hover:bg-[#F8EFE0]"
            }`}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition ${
              isDark
                ? "border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
                : "border-[#E7D8C4] bg-white text-[#7B1E1E] hover:bg-[#F8EFE0]"
            }`}
            aria-label="Notifications"
          >
            <Bell size={17} />
          </button>

          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition ${
              isDark
                ? "border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
                : "border-[#E7D8C4] bg-white text-[#7B1E1E] hover:bg-[#F8EFE0]"
            }`}
            aria-label="Settings"
          >
            <Settings size={17} />
          </button>

          <button
            type="button"
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
              isDark
                ? "border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                : "border-[#E7D8C4] bg-white text-[#2E2E2E] hover:bg-[#F8EFE0]"
            }`}
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#8a2a2a] to-[#d17f4f] text-xs font-black text-white">
              J
            </span>
            <span className="hidden sm:inline">Jenita</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default DashboardNavbar;
