import { Plus, Settings, Trash2 } from "lucide-react";
import LogoMark from "./LogoMark";

function Sidebar({ chats, activeChatId, onSelectChat, onNewChat, onDeleteChat, mobileOpen, collapsed, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/20 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-[86vw] max-w-sm flex-col border-r border-[#E6CBA8] bg-[#F5E6D3] shadow-md transition-transform duration-300 lg:static lg:z-auto lg:w-[316px] lg:max-w-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${collapsed ? "lg:hidden" : ""}`}
      >
        <div className="border-b border-[#E6CBA8] p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <LogoMark size={54} className="shrink-0" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-maroon">Tutorix AI</p>
                <h2 className="mt-2 text-xl font-black text-[#2E2E2E]">Chat History</h2>
                <p className="mt-1 text-sm font-medium text-ink/80">Recent conversations</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#DDBFA0] bg-[#FFF8E7] p-3 text-maroon shadow-sm">
              <Settings size={18} strokeWidth={2.2} />
            </div>
          </div>

          <button
            type="button"
            onClick={onNewChat}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#DDBFA0] bg-[#FFF8E7] px-4 py-3 text-sm font-black text-[#2E2E2E] shadow-sm transition hover:scale-[1.01] hover:bg-[#F3E4D7]"
          >
            <Plus size={16} strokeWidth={2.4} />
            New Chat
          </button>

        </div>

        <div className="scrollbar-gutter-stable flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-3 px-1 text-[29px] font-extrabold tracking-tight text-[#2E2E2E]">New Chat</p>
          <div className="space-y-2">
            {chats.map((chat) => {
              const isActive = chat.id === activeChatId;
              return (
                <div
                  key={chat.id}
                  className={`group flex items-start gap-2 rounded-2xl border p-2 transition duration-200 hover:scale-[1.01] ${
                    isActive
                      ? "border-[#E6CBA8] bg-[#E6CBA8] text-[#2E2E2E] shadow-sm"
                      : "border-[#E6CBA8] bg-[#FFF8E7] text-[#2E2E2E] hover:border-[#E6CBA8] hover:bg-[#EAD7C3] hover:shadow-sm"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectChat(chat.id)}
                    className="min-w-0 flex-1 rounded-xl px-2 py-1 text-left"
                    aria-label={`Open chat ${chat.title}`}
                  >
                    <p className="truncate text-sm font-black">{chat.title}</p>
                    <p
                      className={`mt-1 overflow-hidden text-xs leading-4 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] ${
                        isActive ? "text-[#2E2E2E]" : "text-gray-600"
                      }`}
                    >
                      {chat.preview}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteChat(chat.id)}
                    className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#D9A8A8] bg-[#FFF3F3] text-[#7B1E1E] opacity-0 shadow-sm transition duration-200 hover:scale-105 hover:bg-[#FDE9E9] focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/30 group-hover:opacity-100"
                    aria-label={`Delete chat ${chat.title}`}
                    title="Delete chat"
                  >
                    <Trash2 size={14} />
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
