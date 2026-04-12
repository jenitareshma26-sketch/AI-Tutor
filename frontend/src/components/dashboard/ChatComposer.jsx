import { FileUp, Mic, SendHorizontal } from "lucide-react";

const modes = ["Learn Mode", "Exam Mode", "Coding Mode", "Freelance Mode"];

function ChatComposer({
  draft,
  onDraftChange,
  onSend,
  loading,
  mode,
  onModeChange,
  suggestedPrompts,
  onPromptClick,
  onUpload,
  onVoiceInput,
  isDark,
}) {
  return (
    <div className={`border-t p-4 sm:p-5 ${isDark ? "border-slate-800 bg-slate-950" : "border-[#E7D8C4] bg-[#FFF9EF]"}`}>
      <div className="mb-3 flex flex-wrap gap-2">
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onPromptClick(prompt)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              isDark
                ? "border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
                : "border-[#E7D8C4] bg-white text-[#6A2A2A] hover:bg-[#F5E9D8]"
            }`}
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="mb-3">
        <label className={`mb-1 block text-xs font-bold uppercase tracking-[0.18em] ${isDark ? "text-slate-400" : "text-[#7B1E1E]"}`}>
          Mode Selector
        </label>
        <select
          value={mode}
          onChange={(event) => onModeChange(event.target.value)}
          className={`w-full rounded-xl border px-3 py-2 text-sm font-semibold outline-none transition sm:w-56 ${
            isDark
              ? "border-slate-700 bg-slate-900 text-white focus:border-[#B64D2E]"
              : "border-[#E7D8C4] bg-white text-[#3A2D23] focus:border-[#B64D2E]"
          }`}
        >
          {modes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className={`flex items-center gap-2 rounded-2xl border px-3 py-2.5 shadow-sm ${
        isDark ? "border-slate-700 bg-slate-900" : "border-[#E7D8C4] bg-white"
      }`}>
        <input
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSend(draft);
            }
          }}
          placeholder="Ask anything, request explanations, or ask for freelancing help..."
          className={`flex-1 bg-transparent px-2 text-sm outline-none ${isDark ? "text-white placeholder:text-slate-500" : "text-[#2E2E2E] placeholder:text-[#8B7A68]"}`}
        />

        <label className={`inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition ${
          isDark ? "text-slate-200 hover:bg-slate-800" : "text-[#7B1E1E] hover:bg-[#F8EFE0]"
        }`} title="Upload file">
          <input type="file" className="hidden" onChange={onUpload} />
          <FileUp size={18} />
        </label>

        <button
          type="button"
          onClick={onVoiceInput}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition ${
            isDark ? "text-slate-200 hover:bg-slate-800" : "text-[#7B1E1E] hover:bg-[#F8EFE0]"
          }`}
          title="Voice input"
        >
          <Mic size={18} />
        </button>

        <button
          type="button"
          onClick={() => onSend(draft)}
          disabled={loading || !draft.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7B1E1E] to-[#B64D2E] px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-55"
        >
          <SendHorizontal size={15} /> Send
        </button>
      </div>
    </div>
  );
}

export default ChatComposer;
