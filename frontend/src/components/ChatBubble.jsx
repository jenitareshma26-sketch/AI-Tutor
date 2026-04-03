function ChatBubble({ role, message }) {
  const isUser = role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] rounded-2xl px-4 py-3 shadow-soft sm:max-w-[75%] ${
          isUser
            ? "bg-caramel text-cream rounded-br-md"
            : "bg-[#fff1d8] text-ink border border-caramel/10 rounded-bl-md"
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-relaxed sm:text-base">{message}</p>
      </div>
    </div>
  );
}

export default ChatBubble;
