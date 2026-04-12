import { useEffect, useMemo, useState } from "react";
import ChatArea from "../components/dashboard/ChatArea";
import ChatInput from "../components/dashboard/ChatInput";
import Navbar from "../components/dashboard/Navbar";
import RightPanel from "../components/dashboard/RightPanel";
import Sidebar from "../components/dashboard/Sidebar";
import { askTutor } from "../services/api";

const CHAT_STORAGE_KEY = "tutorix-chat-sessions-v2";
const THEME_STORAGE_KEY = "tutorix-theme";
const MAX_CONTEXT_MESSAGES = 15;

const modePromptMap = {
  "Learn Mode": [
    "Explain this concept in simple terms",
    "Give a real-life example",
    "Summarize key points in bullets",
  ],
  "Exam Mode": [
    "Ask me 5 MCQs",
    "Create a quick revision sheet",
    "Give me exam-level short answers",
  ],
  "Coding Mode": [
    "Generate starter code with comments",
    "Debug this logic step by step",
    "Teach me this algorithm visually",
  ],
  "Freelance Mode": [
    "Draft a client proposal",
    "Create portfolio project ideas",
    "Write a professional gig description",
  ],
};

const createId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

const createMessage = (role, content) => ({
  id: createId("msg"),
  role,
  content,
  timestamp: new Date().toISOString(),
});

const createChat = () => ({
  id: createId("chat"),
  title: "New Chat",
  messages: [],
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

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

const buildTitle = (text) => {
  const clean = text.trim().replace(/\s+/g, " ");
  return clean.length > 34 ? `${clean.slice(0, 34)}...` : clean;
};

const safeLoadState = () => {
  if (typeof window === "undefined") {
    return { chats: [], activeChatId: "" };
  }

  try {
    const raw = window.localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) {
      return { chats: [], activeChatId: "" };
    }

    const parsed = JSON.parse(raw);
    const chats = Array.isArray(parsed?.chats)
      ? parsed.chats.map((chat) => ({
          id: chat.id || createId("chat"),
          title: chat.title || "New Chat",
          messages: Array.isArray(chat.messages)
            ? chat.messages.map((message) => ({
                id: message.id || createId("msg"),
                role: message.role,
                content: message.content,
                timestamp: message.timestamp || new Date().toISOString(),
              }))
            : [],
          createdAt: Number.isFinite(chat.createdAt) ? chat.createdAt : Date.now(),
          updatedAt: Number.isFinite(chat.updatedAt) ? chat.updatedAt : Date.now(),
        }))
      : [];

    return {
      chats,
      activeChatId: typeof parsed?.activeChatId === "string" ? parsed.activeChatId : "",
    };
  } catch {
    return { chats: [], activeChatId: "" };
  }
};

function ChatPage() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("Learn Mode");
  const [activeTool, setActiveTool] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark";
  });

  useEffect(() => {
    const stored = safeLoadState();

    if (stored.chats.length === 0) {
      const firstChat = createChat();
      setChats([firstChat]);
      setActiveChatId(firstChat.id);
      return;
    }

    setChats(stored.chats);
    const validActive = stored.chats.find((chat) => chat.id === stored.activeChatId);
    setActiveChatId(validActive ? validActive.id : stored.chats[0].id);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || chats.length === 0) {
      return;
    }

    window.localStorage.setItem(
      CHAT_STORAGE_KEY,
      JSON.stringify({
        chats,
        activeChatId,
      })
    );
  }, [chats, activeChatId]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  const activeChat = useMemo(() => chats.find((chat) => chat.id === activeChatId) || null, [chats, activeChatId]);
  const messages = activeChat?.messages || [];

  const createNewChat = () => {
    const newChat = createChat();
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setDraft("");
    setError("");
    setMobileSidebarOpen(false);
  };

  const selectChat = (chatId) => {
    const exists = chats.some((chat) => chat.id === chatId);
    if (!exists) {
      return;
    }
    setActiveChatId(chatId);
    setError("");
    setMobileSidebarOpen(false);
  };

  const updateChatById = (chatId, updater) => {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== chatId) {
          return chat;
        }
        return updater(chat);
      })
    );
  };

  const deleteChat = (chatId) => {
    setChats((prev) => {
      const filtered = prev.filter((chat) => chat.id !== chatId);
      
      // If the deleted chat was active, switch to the first remaining chat
      if (chatId === activeChatId) {
        if (filtered.length > 0) {
          setActiveChatId(filtered[0].id);
        } else {
          // Create a new chat if all chats are deleted
          const newChat = createChat();
          setActiveChatId(newChat.id);
          return [newChat];
        }
      }
      
      return filtered;
    });
    setError("");
  };

  const sendMessage = async (text, options = {}) => {
    const trimmed = text.trim();
    if (!trimmed || loading || !activeChatId) {
      return;
    }

    setError("");
    const currentChat = chats.find((chat) => chat.id === activeChatId);
    if (!currentChat) {
      return;
    }

    let nextMessagesForChat = options.historyMessages
      ? [...options.historyMessages]
      : [...currentChat.messages];

    if (!options.skipUserMessage) {
      const userMessage = createMessage("user", trimmed);
      nextMessagesForChat = [...nextMessagesForChat, userMessage];

      updateChatById(activeChatId, (chat) => ({
        ...chat,
        title: chat.title === "New Chat" ? buildTitle(trimmed) : chat.title,
        messages: nextMessagesForChat,
        updatedAt: Date.now(),
      }));
    }

    const conversationMessages = nextMessagesForChat
      .slice(-MAX_CONTEXT_MESSAGES)
      .map((message) => ({
        role: message.role,
        content: message.content,
      }));

    setLoading(true);
    setIsTyping(true);

    try {
      const data = await askTutor(conversationMessages);
      const assistantMessage = createMessage("assistant", data.answer);

      updateChatById(activeChatId, (chat) => ({
        ...chat,
        messages: [...chat.messages, assistantMessage],
        updatedAt: Date.now(),
      }));
      setDraft("");
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

  const handleRegenerate = async () => {
    if (!activeChat || loading) {
      return;
    }

    const lastUserMessage = [...activeChat.messages].reverse().find((message) => message.role === "user");
    if (!lastUserMessage) {
      return;
    }

    let updatedHistory = [];

    updateChatById(activeChat.id, (chat) => {
      const nextMessages = [...chat.messages];
      if (nextMessages[nextMessages.length - 1]?.role === "assistant") {
        nextMessages.pop();
      }
      updatedHistory = nextMessages;
      return {
        ...chat,
        messages: nextMessages,
        updatedAt: Date.now(),
      };
    });

    await sendMessage(lastUserMessage.content, {
      skipUserMessage: true,
      historyMessages: updatedHistory,
    });
  };

  const handleCopyMessage = async (content) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }
    try {
      await navigator.clipboard.writeText(content);
    } catch {
      // Ignore clipboard errors.
    }
  };

  const handleVoiceInput = () => {
    if (typeof window === "undefined") {
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      setDraft((prev) => `${prev} ${transcript}`.trim());
    };

    recognition.onerror = () => {
      setError("Voice input failed. Please try again.");
    };

    recognition.start();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setDraft((prev) => `${prev} [File attached: ${file.name}]`.trim());
    event.target.value = "";
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  const toolPromptMap = {
    "Resume Builder": "Create a professional software engineer resume tailored for freelance roles with strong impact bullet points.",
    "Code Generator": "Generate a clean React + Tailwind pricing section component with accessible markup and reusable props.",
  };

  const handleToolSelect = (toolLabel) => {
    setActiveTool(toolLabel);
    const prompt = toolPromptMap[toolLabel];
    if (!prompt) {
      return;
    }

    setDraft(prompt);
    sendMessage(prompt);
  };

  const handleToggleSidebar = () => {
    const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      setSidebarCollapsed((prev) => !prev);
      return;
    }
    setMobileSidebarOpen((prev) => !prev);
  };

  const clearActiveChat = () => {
    if (!activeChatId) {
      return;
    }

    updateChatById(activeChatId, (chat) => ({
      ...chat,
      title: "New Chat",
      messages: [],
      updatedAt: Date.now(),
    }));
    setError("");
  };

  const handleOpenNotifications = () => {
    setNotificationsOpen((prev) => !prev);
    setSettingsOpen(false);
  };

  const handleOpenSettings = () => {
    setSettingsOpen((prev) => !prev);
    setNotificationsOpen(false);
  };

  const chatList = useMemo(
    () => [...chats].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)),
    [chats]
  );

  const notifications = useMemo(
    () =>
      [...messages]
        .filter((message) => message.role === "assistant")
        .slice(-5)
        .reverse()
        .map((message) => ({
          id: message.id,
          content: message.content,
          timestamp: message.timestamp,
        })),
    [messages]
  );

  const lastUserPrompt = [...messages].reverse().find((message) => message.role === "user")?.content || "";
  const suggestedPrompts = modePromptMap[mode] || modePromptMap["Learn Mode"];

  const smartSuggestions = useMemo(() => {
    if (!lastUserPrompt) {
      return [
        "Generate a focused learning roadmap",
        "Create a practical assignment",
        "Turn this lesson into a freelance mini-project",
      ];
    }

    const lower = lastUserPrompt.toLowerCase();
    if (lower.includes("resume") || lower.includes("portfolio")) {
      return [
        "Improve resume bullet points",
        "Create portfolio case study format",
        "Draft client pitch for this skill",
      ];
    }

    if (lower.includes("code") || lower.includes("bug") || lower.includes("react")) {
      return [
        "Request optimized code version",
        "Ask for test cases",
        "Generate interview follow-up questions",
      ];
    }

    return [
      "Ask for a step-by-step explanation",
      "Create a quiz from this conversation",
      "Map this topic to a paid freelance task",
    ];
  }, [lastUserPrompt]);

  const learningTips = useMemo(() => {
    const base = {
      "Learn Mode": [
        "Use active recall every 15 minutes.",
        "Teach the topic back in your own words.",
      ],
      "Exam Mode": [
        "Practice timed answers to improve speed.",
        "Revise weak areas before attempting full mocks.",
      ],
      "Coding Mode": [
        "Write edge cases before finalizing the solution.",
        "Refactor once it works, then add comments.",
      ],
      "Freelance Mode": [
        "Show outcomes, not just tasks, in your proposals.",
        "Deliver one polished sample before pitching bigger work.",
      ],
    };

    return base[mode] || base["Learn Mode"];
  }, [mode]);

  const freelanceTasks = useMemo(() => {
    const completed = messages.filter((message) => message.role === "assistant").length;
    const baseProgress = Math.min(88, 20 + completed * 8);

    return [
      {
        title: "Design a landing copy for a tutoring startup",
        difficulty: "Easy",
        reward: "$25",
        progress: Math.min(100, baseProgress),
      },
      {
        title: "Build a React pricing section with CTA",
        difficulty: "Medium",
        reward: "$60",
        progress: Math.min(100, baseProgress - 12),
      },
      {
        title: "Create end-to-end onboarding workflow",
        difficulty: "Hard",
        reward: "$120",
        progress: Math.min(100, baseProgress - 22),
      },
    ];
  }, [messages]);

  return (
    <div
      className={`h-screen overflow-hidden transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100"
          : "bg-gradient-to-br from-[#FFF8E7] via-[#F3E4D7] to-[#EAD7C3] text-[#2E2E2E]"
      }`}
    >
      <div className="flex h-full flex-col overflow-hidden">
        <Navbar
          onToggleSidebar={handleToggleSidebar}
          isDark={isDark}
          onToggleTheme={() => setIsDark((prev) => !prev)}
          onNotificationsClick={handleOpenNotifications}
          onSettingsClick={handleOpenSettings}
          notificationCount={notifications.length}
        />

        {(notificationsOpen || settingsOpen) && (
          <div className="pointer-events-none absolute right-3 top-16 z-40 w-[320px] sm:right-6">
            {notificationsOpen && (
              <section
                className={`pointer-events-auto rounded-2xl border p-3 shadow-xl ${
                  isDark ? "border-slate-700 bg-slate-900 text-slate-100" : "border-[#E7D8C4] bg-white text-[#2E2E2E]"
                }`}
              >
                <h3 className={`mb-2 text-sm font-black ${isDark ? "text-slate-100" : "text-[#7B1E1E]"}`}>
                  Notifications
                </h3>
                <div className="max-h-72 space-y-2 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className={`text-sm ${isDark ? "text-slate-400" : "text-[#7A6A59]"}`}>
                      No notifications yet.
                    </p>
                  ) : (
                    notifications.map((item) => (
                      <article
                        key={item.id}
                        className={`rounded-xl border px-3 py-2 ${
                          isDark ? "border-slate-700 bg-slate-950" : "border-[#E7D8C4] bg-[#FFF9EF]"
                        }`}
                      >
                        <p className="line-clamp-2 text-sm leading-6">{item.content}</p>
                        <p className={`mt-1 text-xs ${isDark ? "text-slate-400" : "text-[#7A6A59]"}`}>
                          {formatTime(item.timestamp)}
                        </p>
                      </article>
                    ))
                  )}
                </div>
              </section>
            )}

            {settingsOpen && (
              <section
                className={`pointer-events-auto rounded-2xl border p-3 shadow-xl ${
                  isDark ? "border-slate-700 bg-slate-900 text-slate-100" : "border-[#E7D8C4] bg-white text-[#2E2E2E]"
                }`}
              >
                <h3 className={`mb-3 text-sm font-black ${isDark ? "text-slate-100" : "text-[#7B1E1E]"}`}>
                  Settings
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border px-3 py-2">
                    <span className="text-sm font-semibold">Theme</span>
                    <button
                      type="button"
                      onClick={() => setIsDark((prev) => !prev)}
                      className="rounded-lg bg-gradient-to-r from-[#7B1E1E] to-[#B64D2E] px-3 py-1.5 text-xs font-black text-white"
                    >
                      {isDark ? "Dark" : "Light"}
                    </button>
                  </div>

                  <div className="rounded-xl border px-3 py-2">
                    <label className="mb-1 block text-xs font-bold uppercase tracking-[0.18em]">Default Mode</label>
                    <select
                      value={mode}
                      onChange={(event) => setMode(event.target.value)}
                      className={`w-full rounded-lg border px-2 py-1.5 text-sm ${
                        isDark ? "border-slate-700 bg-slate-950" : "border-[#E7D8C4] bg-white"
                      }`}
                    >
                      {Object.keys(modePromptMap).map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={createNewChat}
                    className="w-full rounded-xl border px-3 py-2 text-left text-sm font-semibold transition hover:bg-[#F4E8D4]"
                  >
                    Start New Chat
                  </button>

                  <button
                    type="button"
                    onClick={clearActiveChat}
                    className="w-full rounded-xl border border-red-300 px-3 py-2 text-left text-sm font-semibold text-red-700 transition hover:bg-red-50"
                  >
                    Clear Active Chat
                  </button>
                </div>
              </section>
            )}
          </div>
        )}

        <div className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-[1600px] overflow-hidden">
          <Sidebar
            chats={chatList}
            activeChatId={activeChatId}
            onSelectChat={selectChat}
            onNewChat={createNewChat}
            onDeleteChat={deleteChat}
            mobileOpen={mobileSidebarOpen}
            onClose={() => setMobileSidebarOpen(false)}
            collapsed={sidebarCollapsed}
            isDark={isDark}
          />

          <main className="flex min-w-0 flex-1 overflow-hidden px-3 py-4 sm:px-5 lg:pl-5">
            <div className="flex min-w-0 flex-1 overflow-hidden rounded-2xl border shadow-[0_20px_45px_rgba(0,0,0,0.06)]">
              <div className={`flex min-w-0 flex-1 flex-col overflow-hidden ${isDark ? "border-slate-800 bg-slate-950" : "border-[#E7D8C4] bg-white/95"}`}>
                <div className={`border-b px-4 py-3 ${isDark ? "border-slate-800 bg-slate-950" : "border-[#E7D8C4] bg-white/90"}`}>
                  <p className={`text-xs font-black uppercase tracking-[0.24em] ${isDark ? "text-slate-400" : "text-[#7B1E1E]"}`}>
                    {mode}
                  </p>
                  <h1 className="mt-1 text-2xl font-black tracking-tight">{activeChat?.title || "New Chat"}</h1>
                  <p className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-[#6E5A48]"}`}>
                    Professional tutoring workspace with persistent multi-chat history.
                  </p>
                </div>

                <ChatArea
                  key={activeChatId || "new-chat"}
                  messages={messages}
                  isTyping={isTyping}
                  error={error}
                  onCopy={handleCopyMessage}
                  onRegenerate={handleRegenerate}
                  isDark={isDark}
                />

                <ChatInput
                  draft={draft}
                  onDraftChange={setDraft}
                  onSend={sendMessage}
                  loading={loading}
                  mode={mode}
                  onModeChange={setMode}
                  suggestedPrompts={suggestedPrompts}
                  onPromptClick={setDraft}
                  onUpload={handleFileUpload}
                  onVoiceInput={handleVoiceInput}
                  isDark={isDark}
                />
              </div>
            </div>
          </main>

          <div className="hidden h-full min-h-0 overflow-y-auto px-2 py-4 xl:flex">
            <RightPanel
              suggestions={smartSuggestions}
              mode={mode}
              learningTips={learningTips}
              freelanceTasks={freelanceTasks}
              activeTool={activeTool}
              onToolSelect={handleToolSelect}
              onSuggestionClick={handleSuggestionClick}
              isDark={isDark}
            />
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1600px] overflow-y-auto px-3 pb-4 xl:hidden">
          <RightPanel
            suggestions={smartSuggestions}
            mode={mode}
            learningTips={learningTips}
            freelanceTasks={freelanceTasks}
            activeTool={activeTool}
            onToolSelect={handleToolSelect}
            onSuggestionClick={handleSuggestionClick}
            isDark={isDark}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
