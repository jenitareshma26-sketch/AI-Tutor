import { BookOpen, Plus, Trash2 } from "lucide-react";

function Sidebar({ chats, activeChatId, onSelectChat, onNewChat, onDeleteChat, mobileOpen, onClose, collapsed, isDark }) {
  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className={`fixed inset-0 z-20 transition lg:hidden ${
          mobileOpen ? "pointer-events-auto bg-black/45" : "pointer-events-none bg-transparent"
        }`}
        aria-label="Close sidebar"
      />

      <aside
        className={`fixed left-0 top-16 z-30 flex h-[calc(100vh-4rem)] w-[280px] flex-col border-r transition-all duration-300 lg:static lg:top-0 lg:h-full lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          collapsed ? "lg:w-0 lg:min-w-0 lg:overflow-hidden lg:border-r-0" : "lg:w-[280px] lg:min-w-[280px]"
        } ${isDark ? "border-slate-800 bg-slate-950" : "border-[#E7D8C4] bg-[#F8EFE0]"}`}
      >
        <div className="p-4">
          <button
            type="button"
            onClick={onNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7B1E1E] to-[#B64D2E] px-4 py-3 text-sm font-black text-white shadow-sm transition hover:brightness-110"
          >
            <Plus size={16} /> New Chat
          </button>
        </div>

        <div className="mt-1 flex min-h-0 flex-1 flex-col border-t border-black/10 px-3 pt-3">
          <div
            className={`mb-2 flex items-center gap-2 px-2 text-xs font-black uppercase tracking-[0.24em] ${
              isDark ? "text-slate-400" : "text-[#7B1E1E]"
            }`}
          >
            <BookOpen size={13} /> Chat History
          </div>

          <div className="space-y-2 overflow-y-auto pb-4">
            {chats.map((chat) => {
              const isActive = chat.id === activeChatId;
              return (
                <div
                  key={chat.id}
                  className="group relative"
                >
                  <button
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
                    <p className="truncate text-sm font-black pr-6">{chat.title}</p>
                    <p className={`mt-1 truncate text-xs ${isDark ? "text-slate-400" : "text-[#7A6A59]"}`}>
                      {chat.messages.length ? chat.messages.at(-1).content : "Ask Tutorix AI anything"}
                    </p>
                  </button>
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onDeleteChat) {
                        onDeleteChat(chat.id);
                      }
                    }}
                    className={`absolute right-2 top-2 opacity-0 transition group-hover:opacity-100 rounded-lg p-1.5 ${
                      isDark
                        ? "bg-red-900/50 text-red-300 hover:bg-red-900"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                    title="Delete chat"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
