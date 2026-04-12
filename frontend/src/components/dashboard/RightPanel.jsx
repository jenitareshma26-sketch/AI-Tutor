import { BadgeCheck, BookOpenCheck, Briefcase, FileCode2, Lightbulb, Sparkles } from "lucide-react";

const quickTools = [
  { label: "Resume Builder", icon: Briefcase },
  { label: "Code Generator", icon: FileCode2 },
];

const difficultyStyle = {
  Easy: "bg-emerald-100 text-emerald-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-rose-100 text-rose-700",
};

const badgeByProgress = (progress) => {
  if (progress >= 80) return "Gold";
  if (progress >= 55) return "Silver";
  return "Bronze";
};

function RightPanel({
  suggestions,
  mode,
  learningTips,
  freelanceTasks,
  activeTool,
  onToolSelect,
  onSuggestionClick,
  isDark,
}) {
  return (
    <aside className={`flex h-full min-h-0 w-[330px] min-w-[330px] flex-col gap-4 overflow-y-auto pr-1 ${isDark ? "text-slate-100" : "text-[#2E2E2E]"}`}>
      <section className={`rounded-2xl border p-4 shadow-sm ${isDark ? "border-slate-800 bg-slate-950" : "border-[#E7D8C4] bg-white"}`}>
        <p className={`mb-3 text-xs font-black uppercase tracking-[0.2em] ${isDark ? "text-slate-400" : "text-[#7B1E1E]"}`}>
          Smart Suggestions
        </p>
        <div className="space-y-2">
          {suggestions.map((tip) => (
            <button
              key={tip}
              type="button"
              onClick={() => onSuggestionClick(tip)}
              className={`w-full rounded-xl border px-3 py-2 text-left text-sm font-semibold transition ${
                isDark
                  ? "border-slate-700 bg-slate-900 hover:bg-slate-800"
                  : "border-[#E7D8C4] bg-[#FFF9EF] hover:bg-[#F4E8D4]"
              }`}
            >
              {tip}
            </button>
          ))}
        </div>
      </section>

      <section className={`rounded-2xl border p-4 shadow-sm ${isDark ? "border-slate-800 bg-slate-950" : "border-[#E7D8C4] bg-white"}`}>
        <p className={`mb-3 text-xs font-black uppercase tracking-[0.2em] ${isDark ? "text-slate-400" : "text-[#7B1E1E]"}`}>
          Quick Tools
        </p>
        <div className="grid gap-2">
          {quickTools.map(({ label, icon: Icon }) => {
            const isActive = activeTool === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => onToolSelect(label)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-[#B64D2E] bg-[#F4E2CF] text-[#6A2A2A]"
                    : isDark
                    ? "border-slate-700 bg-slate-900 hover:bg-slate-800"
                    : "border-[#E7D8C4] bg-[#FFF9EF] hover:bg-[#F4E8D4]"
                }`}
              >
                <Icon size={16} /> {label}
              </button>
            );
          })}
        </div>
      </section>

      <section className={`rounded-2xl border p-4 shadow-sm ${isDark ? "border-slate-800 bg-slate-950" : "border-[#E7D8C4] bg-white"}`}>
        <p className={`mb-3 text-xs font-black uppercase tracking-[0.2em] ${isDark ? "text-slate-400" : "text-[#7B1E1E]"}`}>
          Learning Tips • {mode}
        </p>
        <ul className="space-y-2">
          {learningTips.map((tip) => (
            <li key={tip} className="flex items-start gap-2 text-sm leading-6">
              <Lightbulb size={14} className="mt-1 shrink-0 text-[#B64D2E]" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={`rounded-2xl border p-4 shadow-sm ${isDark ? "border-slate-800 bg-slate-950" : "border-[#E7D8C4] bg-white"}`}>
        <p className={`mb-3 text-xs font-black uppercase tracking-[0.2em] ${isDark ? "text-slate-400" : "text-[#7B1E1E]"}`}>
          Freelance Tasks
        </p>
        <div className="space-y-3">
          {freelanceTasks.map((task) => {
            const badge = badgeByProgress(task.progress);
            return (
              <article
                key={task.title}
                className={`rounded-xl border p-3 ${isDark ? "border-slate-700 bg-slate-900" : "border-[#E7D8C4] bg-[#FFF9EF]"}`}
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <p className="text-sm font-black leading-5">{task.title}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                      difficultyStyle[task.difficulty] || "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {task.difficulty}
                  </span>
                </div>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-[#7A6A59]"}`}>Reward: {task.reward}</p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7B1E1E] to-[#B64D2E]"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className={isDark ? "text-slate-400" : "text-[#7A6A59]"}>Progress {task.progress}%</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#F1DFC6] px-2 py-0.5 font-bold text-[#7B1E1E]">
                    <BadgeCheck size={12} /> {badge}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div
          className={`mt-3 rounded-xl border px-3 py-2 text-xs ${
            isDark ? "border-slate-700 bg-slate-900 text-slate-300" : "border-[#E7D8C4] bg-[#FFF3E2] text-[#7B1E1E]"
          }`}
        >
          <p className="inline-flex items-center gap-2 font-semibold">
            <Sparkles size={13} /> Keep shipping tasks to unlock better payouts.
          </p>
          <p className="mt-1 inline-flex items-center gap-2 font-semibold">
            <BookOpenCheck size={13} /> Badge system boosts your freelance profile.
          </p>
        </div>
      </section>
    </aside>
  );
}

export default RightPanel;
