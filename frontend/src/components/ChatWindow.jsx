import { Bot } from "lucide-react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

function ChatWindow({ messages, isTyping, error, bottomRef, onDeleteMessage }) {
  return (
    <div className="scrollbar-gutter-stable flex-1 overflow-y-auto bg-[linear-gradient(180deg,#f3efef_0%,#f9f8f8_100%)] px-4 py-5 sm:px-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      {!messages.length ? (
        <div className="flex min-h-[58vh] items-center justify-center">
          <div className="w-full max-w-2xl rounded-2xl border border-[#E6CBA8] bg-white p-6 text-center shadow-md sm:p-8">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-maroon text-white shadow-md ring-1 ring-maroon/15">
              <Bot size={28} strokeWidth={2.3} />
            </div>
            <h3 className="text-2xl font-black text-[#2E2E2E] sm:text-3xl">Welcome to Tutorix AI</h3>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-gray-600 sm:text-base">
              Start your session with a fresh chat and ask your first question.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 pb-4">
          {messages.map((message, index) => (
            <MessageBubble
              key={`${message.role}-${index}-${message.content.slice(0, 12)}`}
              role={message.role}
              content={message.content}
              onDelete={() => onDeleteMessage?.(index)}
            />
          ))}

          {isTyping && <TypingIndicator />}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      )}
      </div>
    </div>
  );
}

export default ChatWindow;
