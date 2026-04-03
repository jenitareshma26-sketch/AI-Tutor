import { Link } from "react-router-dom";
import { FaChartLine, FaLightbulb, FaUserGraduate } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const featurePoints = [
  "AI tutoring designed for practical skill growth",
  "Freelance-ready learning paths for real income opportunities",
  "Clean, responsive UI focused on clarity and productivity",
  "Guided lessons that help students build confidence step by step",
];

const aboutImages = [
  {
    title: "Focused Freelance Work",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Remote Collaboration",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Project Momentum",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  },
];

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-[#FFF8E7] via-[#F7E9D4] to-[#EAD7C3] text-[#2E2E2E]">
      <Navbar />

      <main className="page-pattern flex-1 pt-24 sm:pt-28">
        {/* Hero section: introduces Tutorix AI with a strong headline, short intro, and a left-side visual. */}
        <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 pb-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-12">
          <div className="animate-popIn order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-[2rem] border border-maroon/10 bg-[#fffaf3] p-5 shadow-soft sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(128,0,0,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(230,203,168,0.6),transparent_32%)]" />
              <div className="relative space-y-4">
                <div className="rounded-[1.5rem] border border-[#E6CBA8] bg-white/90 p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-maroon">Tutorix AI</p>
                      <h2 className="mt-2 text-2xl font-black text-[#4A0D14]">Learn. Build. Earn.</h2>
                    </div>
                    <div className="rounded-2xl bg-maroon p-3 text-white shadow-md">
                      <FaLightbulb size={20} />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#5B4636]">
                    A premium AI tutoring experience focused on skills that can grow into freelance income.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] bg-[#FFF7EC] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
                    <FaChartLine size={20} />
                    <p className="mt-3 text-sm font-bold uppercase tracking-[0.22em] text-[#4A0D14]">Growth</p>
                    <p className="mt-2 text-lg font-black text-[#4A0D14]">Track learning progress and output</p>
                  </div>
                  <div className="rounded-[1.5rem] bg-[#fff7ec] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
                    <FaUserGraduate size={20} className="text-maroon" />
                    <p className="mt-3 text-sm font-bold uppercase tracking-[0.22em] text-[#4A0D14]">Outcome</p>
                    <p className="mt-2 text-lg font-black text-[#4A0D14]">Build freelance-ready confidence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fadeUp order-1 self-center lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E6CBA8] bg-[#FFF8E7] px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-maroon shadow-sm">
              <FaLightbulb size={13} /> About Tutorix AI
            </div>

            <h1 className="font-display mt-6 max-w-2xl text-balance text-4xl font-black leading-[1.05] tracking-tight text-maroon sm:text-5xl lg:text-6xl">
              About Tutorix AI
            </h1>

            {/* Intro section: explains what the app is and how it helps users. */}
            <p className="anim-delay-1 animate-fadeUp mt-5 max-w-2xl text-base leading-8 text-[#5B4636] sm:text-lg">
              Tutorix AI is a SaaS learning platform built to help students master practical, income-generating
              skills with the support of an intelligent tutor. It combines guided learning, project-based
              practice, and freelancer-focused progress tracking into one clean, modern experience.
            </p>

            <div className="anim-delay-2 animate-fadeUp mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-[#E6CBA8] bg-white px-4 py-2 text-sm font-semibold text-[#4A0D14] shadow-sm">
                Premium UI
              </span>
              <span className="rounded-full border border-[#E6CBA8] bg-white px-4 py-2 text-sm font-semibold text-[#4A0D14] shadow-sm">
                AI Tutoring
              </span>
              <span className="rounded-full border border-[#E6CBA8] bg-white px-4 py-2 text-sm font-semibold text-[#4A0D14] shadow-sm">
                Freelance Growth
              </span>
            </div>
          </div>
        </section>

        {/* Mission and features section: presents the platform goal and its core benefits in a two-card grid. */}
        <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <article className="animate-fadeUp rounded-[2rem] border border-maroon/10 bg-white/90 p-6 shadow-soft backdrop-blur-sm sm:p-8">
            <div className="mb-4 inline-flex rounded-2xl bg-maroon p-3 text-cream shadow-glow">
              <FaLightbulb size={18} />
            </div>
            <h2 className="text-2xl font-black text-[#4A0D14]">Mission Statement</h2>
            <p className="mt-4 text-base leading-7 text-[#5B4636]">
              Our mission is to make skill-building practical, premium, and accessible. Tutorix AI helps learners
              understand concepts clearly, practice with purpose, and move toward real freelance opportunities with
              stronger confidence and better outcomes.
            </p>
          </article>

          <article className="animate-fadeUp rounded-[2rem] border border-maroon/10 bg-[#fffaf3] p-6 shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(89,29,29,0.12)] sm:p-8">
            <div className="mb-4 inline-flex rounded-2xl bg-maroon p-3 text-cream shadow-glow">
              <FaChartLine size={18} />
            </div>
            <h2 className="text-2xl font-black text-[#4A0D14]">Features</h2>
            <ul className="mt-5 space-y-3 text-base leading-7 text-[#5B4636]">
              {featurePoints.map((point) => (
                <li key={point} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm transition duration-200 hover:shadow-md">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-maroon" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        {/* Image gallery section: adds visual context related to freelancing and modern work. */}
        <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="animate-fadeUp rounded-[2rem] border border-maroon/10 bg-white/85 p-6 shadow-soft backdrop-blur-sm sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-maroon">Freelancing Journey</p>
            <h2 className="mt-3 text-2xl font-black text-[#4A0D14] sm:text-3xl">Built for real-world work</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {aboutImages.map((item) => (
                <figure
                  key={item.title}
                  className="group overflow-hidden rounded-[1.25rem] border border-[#E6CBA8] bg-[#fffaf3] shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <figcaption className="px-4 py-3 text-sm font-semibold text-[#4A0D14]">{item.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Creator section: introduces the creator with an avatar image and a short personal paragraph. */}
        <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <article className="animate-fadeUp rounded-[2rem] border border-[#E6CBA8] bg-[#fff7ec] p-6 shadow-soft sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-[#F1D8BE] bg-white shadow-md">
                  <img src="/logo.png" alt="Creator avatar" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-maroon">Creator</p>
                  <h2 className="mt-2 text-2xl font-black text-[#4A0D14]">About Me</h2>
                </div>
              </div>
              <p className="mt-5 text-base leading-7 text-[#5B4636]">
                I created Tutorix AI with a focus on elegance, clarity, and real-world usefulness. My goal is to
                help learners build high-value skills in an environment that feels polished, supportive, and ready
                for the freelance journey.
              </p>
            </article>

            {/* Closing CTA section: encourages the user to continue exploring the platform. */}
            <article className="animate-fadeUp flex flex-col justify-between rounded-[2rem] border border-maroon/10 bg-[#FFF7EC] p-6 shadow-soft sm:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#4A0D14]">Next Step</p>
                <h2 className="mt-3 text-2xl font-black text-[#4A0D14] sm:text-3xl">Ready to learn and earn?</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[#5B4636]">
                  Explore Tutorix AI to master skills, build projects, and prepare for freelance income with a
                  platform designed for progress.
                </p>
              </div>

              <Link
                to="/chat"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#800000] bg-[#FFF8E7] px-6 py-3 text-sm font-bold text-[#800000] transition duration-200 hover:scale-[1.02] hover:bg-[#f6e8d3] hover:shadow-md"
              >
                Start Learning
              </Link>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AboutPage;
