import { ChevronRight, PanelLeft } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import InputBox from "../components/InputBox";
import { askTutor } from "../services/api";

const STORAGE_KEY = "tutorix-ai-chats";
const WELCOME_MESSAGE =
  "Hi, I am Tutorix AI. Ask me any question, and I will explain it clearly in simple steps with examples.";

const createConversation = (id, title = "New Chat", messages = []) => ({
  id,
  title,
  preview: "Ask Tutorix AI anything",
  messages: messages.length ? messages : [{ role: "assistant", content: WELCOME_MESSAGE }],
  updatedAt: Date.now(),
});

const buildTitle = (text) => {
  const clean = text.trim().replace(/\s+/g, " ");
  return clean.length > 34 ? `${clean.slice(0, 34)}…` : clean;
};

const buildPreview = (text) => {
  const clean = text.trim().replace(/\s+/g, " ");
  return clean.length > 56 ? `${clean.slice(0, 56)}…` : clean;
};

const cloneChats = (sourceChats) =>
  sourceChats.map((chat) => ({
    ...chat,
    messages: chat.messages.map((message) => ({ ...message })),
  }));

const deriveChatMeta = (chat, nextMessages) => {
  const lastMessage = nextMessages.at(-1);
  const firstUserMessage = nextMessages.find((message) => message.role === "user");

  return {
    ...chat,
    title: firstUserMessage ? buildTitle(firstUserMessage.content) : "New Chat",
    preview: lastMessage ? buildPreview(lastMessage.content) : "Ask Tutorix AI anything",
    messages: nextMessages,
    updatedAt: Date.now(),
  };
};

const loadChats = () => {
  if (typeof window === "undefined") {
    return [createConversation("default-chat", "Welcome")];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [createConversation("default-chat", "Welcome")];
    }

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((chat, index) => ({
        id: chat.id || `legacy-chat-${index}`,
        title: chat.title || "New Chat",
        preview: chat.preview || (chat.messages?.at(-1)?.content ? buildPreview(chat.messages.at(-1).content) : "Ask Tutorix AI anything"),
        messages: Array.isArray(chat.messages) && chat.messages.length > 0 ? chat.messages : [{ role: "assistant", content: WELCOME_MESSAGE }],
        updatedAt: chat.updatedAt || Date.now(),
      }));
    }
  } catch {
    // fall through to default
  }

  return [createConversation("default-chat", "Welcome")];
};

function ChatPage() {
  const [chats, setChats] = useState(loadChats);
  const [activeChatId, setActiveChatId] = useState(() => loadChats()[0]?.id || "default-chat");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [undoState, setUndoState] = useState(null);

  const bottomRef = useRef(null);
  const undoTimeoutRef = useRef(null);

  const activeChat = useMemo(
    () => chats.find((chat) => chat.id === activeChatId) || chats[0],
    [activeChatId, chats]
  );

  const messages = activeChat?.messages || [];

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, activeChatId]);

  useEffect(() => {
    return () => {
      if (undoTimeoutRef.current) {
        clearTimeout(undoTimeoutRef.current);
      }
    };
  }, []);

  const speakText = (text) => {
    if (!voiceEnabled || typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const updateActiveChat = (updater) => {
    setChats((previousChats) =>
      previousChats.map((chat) => (chat.id === activeChatId ? updater(chat) : chat))
    );
  };

  const handleNewChat = () => {
    const id = `chat-${Date.now()}`;
    const nextChat = createConversation(id, "New Chat");
    setChats((previousChats) => [nextChat, ...previousChats]);
    setActiveChatId(id);
    setDraft("");
    setError("");
    setMobileSidebarOpen(false);
  };

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    setMobileSidebarOpen(false);
    setDraft("");
    setError("");
  };

  const handleToggleSidebar = () => {
    const isDesktop =
      typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

    if (isDesktop) {
      setSidebarCollapsed((previous) => !previous);
      return;
    }

    setMobileSidebarOpen((previous) => !previous);
  };

  const handleCloseSidebar = () => {
    const isDesktop =
      typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

    if (isDesktop) {
      setSidebarCollapsed(true);
      return;
    }

    setMobileSidebarOpen(false);
  };

  const setUndoSnapshot = (label, snapshot) => {
    if (undoTimeoutRef.current) {
      clearTimeout(undoTimeoutRef.current);
    }

    setUndoState({ label, snapshot });

    undoTimeoutRef.current = setTimeout(() => {
      setUndoState(null);
      undoTimeoutRef.current = null;
    }, 5000);
  };

  const handleUndo = () => {
    if (!undoState) {
      return;
    }

    setChats(undoState.snapshot.chats);
    setActiveChatId(undoState.snapshot.activeChatId);
    setUndoState(null);

    if (undoTimeoutRef.current) {
      clearTimeout(undoTimeoutRef.current);
      undoTimeoutRef.current = null;
    }
  };

  const handleDeleteMessage = (index) => {
    const message = messages[index];
    if (!message) {
      return;
    }

    const confirmDelete = window.confirm("Delete this message?");
    if (!confirmDelete) {
      return;
    }

    const snapshot = {
      chats: cloneChats(chats),
      activeChatId,
    };

    updateActiveChat((chat) => {
      const nextMessages = chat.messages.filter((_, currentIndex) => currentIndex !== index);
      return deriveChatMeta(chat, nextMessages);
    });

    setUndoSnapshot("Message deleted", snapshot);
  };

  const handleDeleteChat = (chatId) => {
    const chatToDelete = chats.find((chat) => chat.id === chatId);
    if (!chatToDelete) {
      return;
    }

    const confirmDelete = window.confirm(`Delete chat "${chatToDelete.title}"?`);
    if (!confirmDelete) {
      return;
    }

    const snapshot = {
      chats: cloneChats(chats),
      activeChatId,
    };

    const remainingChats = chats.filter((chat) => chat.id !== chatId);
    if (remainingChats.length === 0) {
      const resetChat = createConversation(`chat-${Date.now()}`, "Welcome");
      setChats([resetChat]);
      setActiveChatId(resetChat.id);
    } else {
      setChats(remainingChats);
      if (chatId === activeChatId) {
        setActiveChatId(remainingChats[0].id);
      }
    }

    setDraft("");
    setError("");
    setUndoSnapshot("Chat deleted", snapshot);
  };

  const handleSendMessage = async (question) => {
    const trimmed = question.trim();
    if (!trimmed || loading) {
      return;
    }

    setError("");
    const userMessage = { role: "user", content: trimmed };
    updateActiveChat((chat) => ({
      ...chat,
      title: chat.title === "New Chat" ? buildTitle(trimmed) : chat.title,
      preview: buildPreview(trimmed),
      messages: [...chat.messages, userMessage],
      updatedAt: Date.now(),
    }));

    setLoading(true);
    setIsTyping(true);

    try {
      const data = await askTutor(trimmed);
      const assistantMessage = { role: "assistant", content: data.answer };

      updateActiveChat((chat) => ({
        ...chat,
        preview: buildPreview(data.answer),
        messages: [...chat.messages, assistantMessage],
        updatedAt: Date.now(),
      }));

      speakText(data.answer);
    } catch (apiError) {
      const fallbackMessage =
        apiError?.response?.data?.detail ||
        "Something went wrong while contacting the tutor. Please try again.";
      setError(fallbackMessage);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const chatSummaries = chats.map((chat) => ({
    id: chat.id,
    title: chat.title,
    preview: chat.preview,
  }));

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-br from-[#FFF8E7] via-[#F3E4D7] to-[#EAD7C3] text-[#2E2E2E]">
      <header className="bg-transparent px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="mx-auto flex w-full max-w-[1380px] items-center justify-between gap-3 rounded-2xl border border-[#E6CBA8]/80 bg-[#FFF8E7]/85 px-4 py-2.5 shadow-[0_12px_35px_rgba(89,29,29,0.08)] backdrop-blur-xl sm:px-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleToggleSidebar}
              className="rounded-xl border border-[#E6CBA8] bg-[#FFF8E7] p-2 text-maroon transition hover:bg-[#f6e8d3]"
              aria-label="Toggle sidebar"
            >
              <PanelLeft size={16} />
            </button>

            <Link to="/" className="group flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#800000] shadow-md transition duration-200 group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="Tutorix AI logo"
                  className="h-full w-full scale-[2.35] object-cover"
                />
              </span>
              <span className="text-[24px] font-bold leading-none text-maroon">Tutorix AI</span>
            </Link>
          </div>

          <nav className="hidden items-center gap-2 sm:flex">
            <Link
              to="/"
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#2E2E2E] transition hover:bg-[#f6e8d3] hover:text-[#800000]"
            >
              Home
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-full bg-[#800000] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[#6d0000]"
            >
              Chat
              <ChevronRight size={14} />
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex h-full min-h-0 flex-col overflow-hidden">

        <div className="flex flex-1 overflow-hidden pt-2">
          <Sidebar
            chats={chatSummaries}
            activeChatId={activeChatId}
            onSelectChat={handleSelectChat}
            onNewChat={handleNewChat}
            onDeleteChat={handleDeleteChat}
            mobileOpen={mobileSidebarOpen}
            collapsed={sidebarCollapsed}
            onClose={() => setMobileSidebarOpen(false)}
          />

          <main className="flex flex-1 flex-col overflow-hidden bg-transparent px-3 py-2.5 sm:px-4 sm:py-3">
            <Header
              title={activeChat?.title || "New Chat"}
              subtitle="Ask anything. Voice input and voice output are available."
            />

            <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-black/5">
              <ChatWindow
                messages={messages}
                isTyping={isTyping}
                error={error}
                bottomRef={bottomRef}
                onDeleteMessage={handleDeleteMessage}
              />

              <InputBox
                value={draft}
                onChange={setDraft}
                onSend={handleSendMessage}
                loading={loading}
                voiceEnabled={voiceEnabled}
                onToggleVoice={() => setVoiceEnabled((previous) => !previous)}
                onSpeechStart={() => {}}
                onSpeechEnd={() => {}}
              />
            </div>
          </main>
        </div>
      </div>

      {undoState && (
        <div className="pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2 px-4">
          <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-[#DDBFA0] bg-white px-4 py-2.5 text-sm shadow-lg ring-1 ring-black/5">
            <span className="font-semibold text-[#2E2E2E]">{undoState.label}</span>
            <button
              type="button"
              onClick={handleUndo}
              className="rounded-full bg-[#800000] px-3 py-1 text-xs font-bold text-white transition hover:bg-[#660000]"
            >
              Undo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPage;
