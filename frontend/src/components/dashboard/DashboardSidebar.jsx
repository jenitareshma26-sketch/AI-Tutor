import {
  BookOpen,
  Briefcase,
  ClipboardCheck,
  FolderHeart,
  GraduationCap,
  Plus,
  Target,
} from "lucide-react";

const navItems = [
  { label: "My Courses", icon: GraduationCap },
  { label: "Progress Tracker", icon: Target },
  { label: "Practice Tests", icon: ClipboardCheck },
  { label: "Freelance Tasks", icon: Briefcase },
  { label: "Saved Chats", icon: FolderHeart },
];

function DashboardSidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  collapsed,
  mobileOpen,
  onClose,
  isDark,
}) {
  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className={`fixed inset-0 z-20 transition xl:hidden ${
          mobileOpen ? "pointer-events-auto bg-black/45" : "pointer-events-none bg-transparent"
        }`}
        aria-label="Close sidebar"
      />

      <aside
        className={`fixed bottom-0 left-0 top-0 z-30 flex flex-col border-r transition-all duration-300 xl:static xl:z-auto ${
          mobileOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
        } ${collapsed ? "w-[92px]" : "w-[290px]"} ${
          isDark ? "border-slate-800 bg-slate-950" : "border-[#E7D8C4] bg-[#F8EFE0]"
        }`}
      >
        <div className="p-4">
          <button
            type="button"
            onClick={onNewChat}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black shadow-sm transition ${
              isDark
                ? "bg-gradient-to-r from-[#7B1E1E] to-[#B64D2E] text-white hover:brightness-110"
                : "bg-gradient-to-r from-[#7B1E1E] to-[#B64D2E] text-white hover:brightness-110"
            }`}
          >
            <Plus size={16} />
            {!collapsed && "New Chat"}
          </button>
        </div>

        <nav className="px-3">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className={`mb-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                isDark
                  ? "text-slate-200 hover:bg-slate-900"
                  : "text-[#4A0D14] hover:bg-[#EFE0CA]"
              }`}
            >
              <Icon size={16} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </button>
          ))}
        </nav>

        <div className="mt-2 flex min-h-0 flex-1 flex-col border-t border-black/10 px-3 pt-3">
          {!collapsed && (
            <div className={`mb-2 flex items-center gap-2 px-2 text-xs font-black uppercase tracking-[0.24em] ${isDark ? "text-slate-400" : "text-[#7B1E1E]"}`}>
              <BookOpen size={13} /> Chat History
            </div>
          )}

          <div className="scrollbar-gutter-stable space-y-2 overflow-y-auto pb-4">
            {chats.map((chat) => {
              const isActive = chat.id === activeChatId;
              return (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => onSelectChat(chat.id)}
                  className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                    isActive
                      ? isDark
                        ? "border-[#B64D2E] bg-slate-900 text-white"
                        : "border-[#D7B691] bg-[#EFD8B7] text-[#2E2E2E]"
                      : isDark
                      ? "border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-900"
                      : "border-[#E7D8C4] bg-[#FFF9EF] text-[#3E352B] hover:bg-[#F4E8D4]"
                  }`}
                >
                  {!collapsed ? (
                    <>
                      <p className="truncate text-sm font-black">{chat.title}</p>
                      <p className={`mt-1 truncate text-xs ${isDark ? "text-slate-400" : "text-[#7A6A59]"}`}>
                        {chat.preview}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm font-black">#{chat.title.slice(0, 1)}</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}

export default DashboardSidebar;
