import { useEffect, useMemo, useRef } from "react";
import { FileUp, Mic, SendHorizontal } from "lucide-react";

const modes = ["Learn Mode", "Exam Mode", "Coding Mode", "Freelance Mode"];
const MAX_CHARACTERS = 500;

function ChatInput({
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
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  }, [draft]);

  const typingSuggestions = useMemo(() => {
    const value = draft.trim().toLowerCase();
    if (!value) {
      return [];
    }

    if (value.includes("resume")) {
      return ["Make it ATS-friendly", "Add measurable achievements"];
    }

    if (value.includes("react") || value.includes("code")) {
      return ["Include edge cases", "Add test coverage"];
    }

    return ["Ask for a concise summary", "Request a step-by-step plan"];
  }, [draft]);

  const handleTextareaChange = (event) => {
    const nextValue = event.target.value.slice(0, MAX_CHARACTERS);
    onDraftChange(nextValue);
  };

  const handleSend = () => {
    if (loading || !draft.trim()) {
      return;
    }
    onSend(draft);
  };

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

      <div
        className={`rounded-2xl border px-2 py-2 shadow-sm transition ${
          isDark ? "border-slate-700 bg-slate-900" : "border-[#E7D8C4] bg-white"
        }`}
      >
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={handleTextareaChange}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSend();
            }
          }}
          spellCheck
          autoCorrect="on"
          autoCapitalize="sentences"
          rows={1}
          placeholder="Ask anything, request explanations, or get freelancing help..."
          className={`max-h-[100px] min-h-[32px] w-full resize-none bg-transparent px-2 py-1 text-sm outline-none focus-visible:ring-0 ${
            isDark
              ? "text-white placeholder:text-slate-500"
              : "text-[#2E2E2E] placeholder:text-[#8B7A68]"
          }`}
        />

        <div className="mt-2 flex items-center justify-between text-xs">
          <span className={isDark ? "text-slate-400" : "text-[#8B7A68]"}>
            Enter to send • Shift+Enter for new line
          </span>
          <span className={isDark ? "text-slate-400" : "text-[#8B7A68]"}>
            {draft.length}/{MAX_CHARACTERS}
          </span>
        </div>

        {typingSuggestions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {typingSuggestions.map((tip) => (
              <button
                key={tip}
                type="button"
                onClick={() => onDraftChange(`${draft}\n- ${tip}`.trim())}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${
                  isDark
                    ? "border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
                    : "border-[#E7D8C4] bg-[#FFF9EF] text-[#6A2A2A] hover:bg-[#F5E9D8]"
                }`}
              >
                {tip}
              </button>
            ))}
          </div>
        )}

        <div className="mt-2 flex items-center gap-2">
          <label
            className={`inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition ${
              isDark ? "text-slate-200 hover:bg-slate-800" : "text-[#7B1E1E] hover:bg-[#F8EFE0]"
            }`}
            title="Upload file"
          >
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
            onClick={handleSend}
            disabled={loading || !draft.trim()}
            className="ml-auto inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7B1E1E] to-[#B64D2E] px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-55"
          >
            <SendHorizontal size={15} /> Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
