import { Mic } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full bg-transparent px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border border-[#E6CBA8]/80 bg-[#FFF8E7]/85 px-4 py-2.5 shadow-[0_12px_35px_rgba(89,29,29,0.08)] backdrop-blur-xl sm:px-5 lg:px-6">
        <Link to="/" className="group inline-flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#800000] shadow-md ring-2 ring-[#f4d8b5] transition duration-200 group-hover:scale-105">
            <img
              src="/logo.png"
              alt="Tutorix AI logo"
              className="h-full w-full scale-[2.35] object-cover"
            />
          </span>
          <span className="text-lg font-black tracking-wide text-[#800000] sm:text-xl">Tutorix AI</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#800000] text-white shadow-md"
                  : "text-[#2E2E2E] hover:bg-[#f6e8d3] hover:text-[#800000]"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#800000] text-white shadow-md"
                  : "text-[#2E2E2E] hover:bg-[#f6e8d3] hover:text-[#800000]"
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#800000] text-white shadow-md"
                  : "text-[#2E2E2E] hover:bg-[#f6e8d3] hover:text-[#800000]"
              }`
            }
          >
            Chat
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-full border border-[#E6CBA8] bg-[#fff3de] px-3 py-2 text-xs font-semibold text-[#2E2E2E] transition-all duration-200 hover:scale-[1.02] hover:border-[#800000]/30 hover:bg-[#fff0d6] hover:text-[#800000] sm:inline-flex"
            aria-label="Voice setting"
          >
            <Mic size={14} />
            Voice
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
