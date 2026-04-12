import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar({
  onToggleSidebar,
  isDark,
  onToggleTheme,
  onNotificationsClick,
  onSettingsClick,
  notificationCount = 0,
}) {
  return (
    <header
      className={`z-20 flex h-16 items-center justify-between border-b px-4 sm:px-6 ${
        isDark ? "border-slate-800 bg-slate-950" : "border-[#E7D8C4] bg-[#FFF9EF]"
      }`}
    >
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
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#800000] shadow-md">
            <img src="/logo.png" alt="Tutorix AI logo" className="h-full w-full scale-[2.2] object-cover" />
          </span>
          <div className="leading-none">
            <p className={`text-xl font-black tracking-tight ${isDark ? "text-white" : "text-[#7B1E1E]"}`}>
              Tutorix AI
            </p>
            <p
              className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                isDark ? "text-slate-400" : "text-[#8B6B52]"
              }`}
            >
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
          onClick={onNotificationsClick}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition ${
            isDark
              ? "border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
              : "border-[#E7D8C4] bg-white text-[#7B1E1E] hover:bg-[#F8EFE0]"
          }`}
          aria-label="Notifications"
        >
          {notificationCount > 0 && (
            <span className="absolute ml-5 mt-[-18px] inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B64D2E] px-1 text-[10px] font-black text-white">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
          <Bell size={17} />
        </button>

        <button
          type="button"
          onClick={onSettingsClick}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition ${
            isDark
              ? "border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
              : "border-[#E7D8C4] bg-white text-[#7B1E1E] hover:bg-[#F8EFE0]"
          }`}
          aria-label="Settings"
        >
          <Settings size={17} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
