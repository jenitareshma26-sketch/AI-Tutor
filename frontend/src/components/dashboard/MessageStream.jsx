import { Bot, Copy, RefreshCcw, User } from "lucide-react";

const formatTime = (timestamp) => {
  if (!timestamp) {
    return "Now";
  }

  try {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "Now";
  }
};

function MessageStream({ messages, isTyping, error, onCopy, onRegenerate, bottomRef, isDark }) {
  if (!messages.length) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div
          className={`w-full max-w-xl rounded-3xl border p-8 text-center shadow-sm ${
            isDark ? "border-slate-800 bg-slate-900/70 text-slate-200" : "border-[#E7D8C4] bg-[#FFF9EF] text-[#4A0D14]"
          }`}
        >
          <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7B1E1E] to-[#C46839] text-white">
            <Bot size={24} />
          </div>
          <h3 className="text-2xl font-black">Start your learning sprint</h3>
          <p className={`mt-3 text-sm leading-7 ${isDark ? "text-slate-400" : "text-[#6E5A48]"}`}>
            Pick a mode, ask anything, and Tutorix AI will help you learn, practice, and unlock freelance-ready output.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="scrollbar-gutter-stable flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-6">
      {messages.map((message) => {
        const isUser = message.role === "user";

        return (
          <article key={message.id} className={`group flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[86%] rounded-2xl border px-4 py-3 shadow-sm ${
              isUser
                ? "border-[#7B1E1E]/20 bg-gradient-to-br from-[#7B1E1E] to-[#A2382A] text-white"
                : isDark
                ? "border-slate-700 bg-slate-900 text-slate-100"
                : "border-[#E7D8C4] bg-white text-[#2F2F2F]"
            }`}>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold opacity-85">
                <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${isUser ? "bg-white/20" : isDark ? "bg-slate-800" : "bg-[#F8EFE0]"}`}>
                  {isUser ? <User size={12} /> : <Bot size={12} />}
                </span>
                <span>{isUser ? "You" : "Tutorix AI"}</span>
                <span>•</span>
                <span>{formatTime(message.timestamp)}</span>
              </div>

              <p className="whitespace-pre-wrap text-sm leading-7">{message.content}</p>

              {!isUser && (
                <div className="mt-3 flex gap-2 opacity-0 transition group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => onCopy(message.content)}
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                      isDark ? "bg-slate-800 text-slate-200 hover:bg-slate-700" : "bg-[#F8EFE0] text-[#6A2A2A] hover:bg-[#F1DFC6]"
                    }`}
                  >
                    <Copy size={12} /> Copy
                  </button>
                  <button
                    type="button"
                    onClick={onRegenerate}
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                      isDark ? "bg-slate-800 text-slate-200 hover:bg-slate-700" : "bg-[#F8EFE0] text-[#6A2A2A] hover:bg-[#F1DFC6]"
                    }`}
                  >
                    <RefreshCcw size={12} /> Regenerate
                  </button>
                </div>
              )}
            </div>
          </article>
        );
      })}

      {isTyping && (
        <div className="flex justify-start">
          <div className={`rounded-2xl border px-4 py-3 shadow-sm ${isDark ? "border-slate-700 bg-slate-900" : "border-[#E7D8C4] bg-white"}`}>
            <p className={`text-xs font-semibold ${isDark ? "text-slate-300" : "text-[#7B1E1E]"}`}>Tutorix AI is typing</p>
            <div className="mt-2 flex gap-1.5">
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#B64D2E] [animation-delay:0ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#B64D2E] [animation-delay:120ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#B64D2E] [animation-delay:240ms]" />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default MessageStream;
