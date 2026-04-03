import { Trash2 } from "lucide-react";

function MessageBubble({ role, content, onDelete }) {
  const isUser = role === "user";

  return (
    <div className={`group flex w-full items-start gap-2 ${isUser ? "justify-end" : "justify-start"} animate-fadeUp`}>
      {!isUser && onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#DDBFA0] bg-[#FFF8E7] text-maroon opacity-0 shadow-sm transition duration-200 hover:scale-105 hover:bg-[#F3E4D7] focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/30 group-hover:opacity-100"
          aria-label="Delete this message"
          title="Delete message"
        >
          <Trash2 size={14} />
        </button>
      )}
      <div
        className={`max-w-[92%] rounded-2xl px-4 py-3 shadow-md sm:max-w-[80%] ${
          isUser
            ? "rounded-br-md bg-[#800000] text-white"
            : "rounded-bl-md border border-[#E6CBA8] bg-[#F3E4D7] text-[#2E2E2E] shadow-sm"
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-relaxed sm:text-[15px]">{content}</p>
      </div>
      {isUser && onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#DDBFA0] bg-[#FFF8E7] text-maroon opacity-0 shadow-sm transition duration-200 hover:scale-105 hover:bg-[#F3E4D7] focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/30 group-hover:opacity-100"
          aria-label="Delete this message"
          title="Delete message"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}

export default MessageBubble;
