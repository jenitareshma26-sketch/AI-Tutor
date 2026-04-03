function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#E6CBA8] bg-[#f8efe2] px-4 py-3 text-sm text-[#2E2E2E] shadow-sm">
      <span className="font-semibold">AI is typing...</span>
      <span className="inline-flex items-center gap-1">
        <span className="h-2.5 w-2.5 animate-pulseDot rounded-full bg-maroon" />
        <span className="h-2.5 w-2.5 animate-pulseDot rounded-full bg-maroon [animation-delay:0.15s]" />
        <span className="h-2.5 w-2.5 animate-pulseDot rounded-full bg-maroon [animation-delay:0.3s]" />
      </span>
    </div>
  );
}

export default TypingIndicator;
