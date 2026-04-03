import { Mic, MicOff, SendHorizontal, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

function InputBox({ value, onChange, onSend, loading, voiceEnabled, onToggleVoice, onSpeechStart, onSpeechEnd }) {
  const [listening, setListening] = useState(false);
  const [speechError, setSpeechError] = useState("");
  const recognitionRef = useRef(null);
  const transcriptRef = useRef("");

  const speechSupported = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort?.();
    };
  }, []);

  const startListening = () => {
    if (!speechSupported) {
      setSpeechError("Speech recognition is not supported in this browser.");
      return;
    }

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;

    setSpeechError("");

    recognition.onstart = () => {
      setListening(true);
      onSpeechStart?.();
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ")
        .trim();

      transcriptRef.current = transcript;
      onChange(transcript);
    };

    recognition.onerror = () => {
      setSpeechError("Voice input could not start. Please try again.");
      setListening(false);
      onSpeechEnd?.();
    };

    recognition.onend = () => {
      setListening(false);
      onSpeechEnd?.();
      const transcript = (transcriptRef.current || value || "").trim();
      if (transcript && !loading) {
        onSend(transcript);
        onChange("");
      }
      transcriptRef.current = "";
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || loading) {
      return;
    }

    onSend(trimmed);
    onChange("");
    setSpeechError("");
  };

  return (
    <div className="sticky bottom-0 z-10 border-t border-[#E6CBA8] bg-white px-4 py-4 shadow-[0_-8px_24px_rgba(0,0,0,0.05)] sm:px-6">
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl items-end gap-3">
        <div className="flex-1">
          <textarea
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ask anything or use the microphone..."
            disabled={loading}
            className="min-h-[58px] w-full resize-none rounded-full border border-[#DCC8AF] bg-[#fbf7f2] px-5 py-3 text-sm text-[#2E2E2E] shadow-sm outline-none transition placeholder:text-gray-500 focus:border-maroon focus:ring-2 focus:ring-maroon/20 disabled:cursor-not-allowed disabled:bg-[#fbf7f2] sm:text-[15px]"
          />
          <div className="mt-2 flex items-center justify-between gap-3 text-xs sm:text-sm">
            <p className="font-semibold text-gray-600">{listening ? "Listening..." : speechError || "AI tutor ready to help."}</p>
            <div className="inline-flex items-center gap-2">
              <button
                type="button"
                onClick={onToggleVoice}
                className={`h-8 rounded-full border px-4 text-xs font-semibold transition ${
                  voiceEnabled
                    ? "border-[#DCC8AF] bg-[#f5eee4] text-gray-600"
                    : "border-[#DCC8AF] bg-white text-gray-500"
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  <Sparkles size={12} strokeWidth={2.2} />
                  {voiceEnabled ? "Voice Output On" : "Voice Output Off"}
                </span>
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (listening) {
              recognitionRef.current?.stop?.();
              setListening(false);
              onSpeechEnd?.();
              return;
            }

            startListening();
          }}
          className={`rounded-full p-3 text-maroon transition duration-200 hover:scale-[1.03] ${
            listening ? "animate-micPulse bg-[#ead7c3]" : "bg-transparent"
          }`}
          aria-label="Toggle microphone"
          title="Voice input"
        >
          {listening ? <MicOff size={18} strokeWidth={2.3} /> : <Mic size={18} strokeWidth={2.3} />}
        </button>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-w-[118px] items-center justify-center gap-2 rounded-full border border-[#6a0000] bg-[#800000] px-5 py-3 font-black text-white shadow-md transition duration-200 hover:scale-[1.02] hover:bg-[#660000] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? <LoadingSpinner /> : <SendHorizontal size={18} strokeWidth={2.4} />}
          <span>Send</span>
        </button>
      </form>
    </div>
  );
}

export default InputBox;
