import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ChatMessage({ content, isDark, isUser }) {
  const proseTone = isUser
    ? "prose-invert"
    : isDark
    ? "prose-invert"
    : "prose-slate";

  return (
    <div
      className={`prose prose-sm max-w-none leading-7 sm:prose-base ${proseTone}
      prose-headings:mb-3 prose-headings:mt-5 prose-headings:font-black prose-headings:tracking-tight
      prose-p:my-3 prose-p:leading-7 prose-strong:font-bold
      prose-ul:my-3 prose-ul:list-disc prose-ul:pl-5
      prose-ol:my-3 prose-ol:list-decimal prose-ol:pl-5
      prose-li:my-1`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-xl font-black leading-tight sm:text-2xl" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-lg font-black leading-tight sm:text-xl" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-base font-black leading-tight sm:text-lg" {...props} />
          ),
          p: ({ node, ...props }) => <p className="my-3" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-extrabold" {...props} />,
          table: ({ node, ...props }) => (
            <div className="my-4 w-full overflow-x-auto rounded-xl border border-black/10">
              <table className="w-full border-collapse text-sm" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              className={`border border-black/10 px-3 py-2 text-left text-xs font-black uppercase tracking-[0.08em] ${
                isDark ? "bg-slate-800/80 text-slate-100" : "bg-[#F8EFE0] text-[#7B1E1E]"
              }`}
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className={`border border-black/10 px-3 py-2 align-top ${
                isDark ? "bg-slate-900/30 text-slate-100" : "bg-white text-[#2F2F2F]"
              }`}
              {...props}
            />
          ),
          code: ({ inline, className, children, ...props }) => {
            if (inline) {
              return (
                <code
                  className={`rounded-md px-1.5 py-0.5 text-[0.92em] ${
                    isDark ? "bg-slate-800 text-amber-200" : "bg-[#F4E8D4] text-[#6A2A2A]"
                  }`}
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <pre
                className={`my-4 overflow-x-auto rounded-xl border p-3 text-sm ${
                  isDark
                    ? "border-slate-700 bg-slate-950 text-slate-100"
                    : "border-[#E7D8C4] bg-[#FFF9EF] text-[#2F2F2F]"
                }`}
              >
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
        }}
      >
        {content || ""}
      </ReactMarkdown>
    </div>
  );
}

export default ChatMessage;
