import {
  ArrowRight,
  Briefcase,
  Code2,
  FileText,
  Sparkles,
  Star,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LogoMark from "../components/LogoMark";

const features = [
  {
    title: "Skill-Based Learning",
    description: "Learn coding, design, writing, marketing, and other in-demand skills.",
    icon: Code2,
  },
  {
    title: "Freelance Readiness",
    description: "Train with project-based lessons that prepare you for real client work.",
    icon: Briefcase,
  },
  {
    title: "Earn with Skills",
    description: "Turn knowledge into income with practical freelancing opportunities.",
    icon: Sparkles,
  },
  {
    title: "AI Guidance",
    description: "Get step-by-step help while you build confidence and complete tasks.",
    icon: TrendingUp,
  },
];

const steps = [
  {
    title: "Learn a skill using AI",
    description: "Pick up the fundamentals with simple, guided lessons.",
    icon: Code2,
  },
  {
    title: "Practice with real tasks",
    description: "Work on assignments that feel like actual client projects.",
    icon: FileText,
  },
  {
    title: "Start freelancing",
    description: "Build a portfolio and offer services with confidence.",
    icon: Briefcase,
  },
  {
    title: "Earn money",
    description: "Use your skills to win projects and generate income.",
    icon: Wallet,
  },
];

const freelancingScenes = [
  {
    title: "Workspace Focus",
    description: "A clean setup for deep work and project delivery.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Client Collaboration",
    description: "Planning ideas and reviewing work with confidence.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Project Delivery",
    description: "Managing tasks, deadlines, and quality output.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
];

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Navbar />

      <main className="page-pattern relative flex-1 pt-20">
        <div className="pointer-events-none absolute -left-24 top-8 h-80 w-80 rounded-full bg-maroon/12 blur-3xl" />
        <div className="pointer-events-none absolute right-[-60px] top-24 h-96 w-96 rounded-full bg-gold/40 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-[18%] h-72 w-72 -translate-x-1/2 rounded-full bg-white/40 blur-3xl" />

        <section className="mx-auto grid w-full max-w-7xl gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-16">
          <div className="animate-fadeUp self-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E6CBA8] bg-[#FFF8E7] px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#2E2E2E] shadow-sm">
              <Star size={14} /> Learn for earning
            </div>

            <h1 className="font-display mt-6 max-w-2xl text-balance text-5xl font-black leading-[1.02] tracking-tight text-maroon sm:text-6xl lg:text-7xl">
              Learn Skills. Start Freelancing. Earn Money.
            </h1>

            <p className="anim-delay-1 animate-fadeUp mt-6 max-w-xl text-balance text-lg leading-relaxed text-gray-600 sm:text-xl">
              Use AI-powered tutoring to master real-world skills and start earning as a freelancer.
            </p>

            <div className="anim-delay-2 animate-fadeUp mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/chat"
                className="inline-flex items-center gap-2 rounded-full bg-[#800000] px-7 py-3.5 text-sm font-bold text-white shadow-glow transition duration-200 hover:scale-[1.03] hover:brightness-110 sm:text-base"
              >
                Start Learning
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/chat"
                className="inline-flex items-center gap-2 rounded-full border border-[#800000] px-7 py-3.5 text-sm font-bold text-[#800000] transition duration-200 hover:scale-[1.03] hover:bg-[#800000] hover:text-white sm:text-base"
              >
                Start Freelancing
              </Link>
            </div>

            <div className="mt-12 grid max-w-3xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {features.map(({ title, description, icon: Icon }, index) => (
                <article
                  key={title}
                  className="animate-fadeUp rounded-3xl border border-maroon/10 bg-[#fff7ec] p-5 shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(89,29,29,0.12)]"
                  style={{ animationDelay: `${0.08 * index}s` }}
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-maroon p-3 text-cream shadow-glow">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-base font-extrabold text-[#2E2E2E]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="animate-popIn relative flex items-center justify-center lg:justify-end">
            <div className="animate-float absolute left-6 top-8 hidden rounded-full border border-maroon/10 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-maroon shadow-soft backdrop-blur md:block">
              Freelance workflow
            </div>

            <div className="relative w-full max-w-[560px] rounded-[2rem] border border-maroon/10 bg-[#fffaf3] p-4 shadow-soft">
              <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(128,0,0,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(230,203,168,0.65),transparent_34%)]" />

              <div className="relative overflow-hidden rounded-[1.6rem] border border-maroon/10 bg-[#fffef9] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3 border-b border-maroon/10 pb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-maroon">Visual story</p>
                    <h2 className="mt-1 text-2xl font-black text-[#4A0D14]">Freelancing in action</h2>
                  </div>
                  <LogoMark size={56} className="drop-shadow-sm" />
                </div>

                <div className="mt-5 grid gap-4">
                  <div className="group relative overflow-hidden rounded-[1.6rem] border border-[#E6CBA8] shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
                    <img
                      src={freelancingScenes[0].image}
                      alt={freelancingScenes[0].title}
                      className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3d120d]/70 via-[#3d120d]/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f8e9da]">
                        {freelancingScenes[0].title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-white/90">
                        {freelancingScenes[0].description}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {freelancingScenes.slice(1).map((scene) => (
                      <div
                        key={scene.title}
                        className="group overflow-hidden rounded-[1.4rem] border border-[#E6CBA8] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                      >
                        <img
                          src={scene.image}
                          alt={scene.title}
                          className="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                          loading="lazy"
                        />
                        <div className="p-4">
                          <p className="text-sm font-black text-[#4A0D14]">{scene.title}</p>
                          <p className="mt-1 text-xs leading-5 text-[#5B4636]">{scene.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="animate-fadeIn rounded-[2rem] border border-maroon/10 bg-white/70 p-6 shadow-soft backdrop-blur-sm sm:p-8">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-maroon">How it works</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#2E2E2E] sm:text-4xl">
                A simple path from learning to earning
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                Learn marketable skills, practice with realistic tasks, and move toward freelancing opportunities that can generate income.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {steps.map(({ title, description, icon: Icon }, index) => (
                <article
                  key={title}
                  className="group rounded-3xl border border-[#E6CBA8] bg-[#fff7ec] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(89,29,29,0.12)]"
                  style={{ animationDelay: `${0.08 * index}s` }}
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-maroon p-3 text-cream shadow-glow transition duration-200 group-hover:scale-105">
                    <Icon size={18} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-maroon">Step {index + 1}</p>
                  <h3 className="mt-2 text-lg font-black text-[#2E2E2E]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;
