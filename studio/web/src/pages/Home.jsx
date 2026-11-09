import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CookieConsent from "react-cookie-consent";
import {
  ArrowRight,
  CalendarDays,
  Code2,
  Lightbulb,
  MousePointer2,
  Puzzle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import heroImage from "../assets/img/logo.jpg";

const Home = () => {
  const { t } = useTranslation();

  const highlights = [
    {
      icon: Code2,
      title: t("Project-first coding"),
      copy: t("Kids learn by building animations, games, webpages, and small tools they can proudly show at home."),
    },
    {
      icon: Users,
      title: t("Small-group support"),
      copy: t("Lessons are paced so beginners feel comfortable while curious students still have room to stretch."),
    },
    {
      icon: ShieldCheck,
      title: t("Confident digital habits"),
      copy: t("We pair coding concepts with problem solving, debugging, online safety, and patient collaboration."),
    },
  ];

  const paths = [
    {
      icon: Sparkles,
      title: t("Creative Coding"),
      copy: t("Color, motion, sound, and story-based projects help younger learners see code as a creative material."),
      accent: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300",
    },
    {
      icon: Puzzle,
      title: t("Game Logic"),
      copy: t("Students practice loops, variables, conditions, and events while designing playable challenges."),
      accent: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300",
    },
    {
      icon: MousePointer2,
      title: t("Web Foundations"),
      copy: t("Older students learn how pages are structured, styled, and connected through real browser projects."),
      accent: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300",
    },
  ];

  return (
    <>
      <section className="bg-gray-50 py-16 transition-colors dark:bg-slate-950 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-gray-200 dark:bg-slate-900 dark:text-red-300 dark:ring-slate-800">
                <CalendarDays size={16} />
                {t("After-school and weekend programs")}
              </div>
              <h1 className="max-w-3xl text-4xl font-bold uppercase tracking-tight text-gray-900 dark:text-slate-100 md:text-5xl">
                {t("programming education for kids")}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-slate-300 md:text-xl">
                {t(
                  "offering unique, fun, activities and learning. Discover kids' programs with everything from home activities to classes.",
                )}
              </p>
              <p className="max-w-2xl text-base leading-7 text-gray-600 dark:text-slate-300">
                {t("Will PGM Studio helps children move from screen time to build time. Every class turns big ideas into small, friendly steps: ask a question, try code, test the result, and improve it together.")}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/event"
                  className="inline-flex items-center justify-center gap-2 rounded bg-red-600 px-6 py-3 font-bold uppercase text-white transition duration-300 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
                >
                  {t("Explore Programs")}
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded border border-gray-300 bg-white px-6 py-3 font-bold uppercase text-gray-800 transition duration-300 hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-400 dark:hover:text-blue-300"
                >
                  {t("Contact Us")}
                </Link>
              </div>
              <div className="grid max-w-2xl grid-cols-3 gap-3 pt-3">
                {[
                  [t("Ages"), "7-14"],
                  [t("Format"), t("Hands-on")],
                  [t("Level"), t("Beginner friendly")],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-slate-900 dark:ring-slate-800"
                  >
                    <p className="text-xs font-bold uppercase text-gray-500 dark:text-slate-400">
                      {label}
                    </p>
                    <p className="mt-1 text-lg font-bold text-gray-900 dark:text-slate-100">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-gray-200 dark:bg-slate-900 dark:ring-slate-800">
                <img
                  src={heroImage}
                  alt={t("Will PGM Studio programming education logo")}
                  className="h-72 w-full object-cover md:h-96"
                />
                <div className="grid gap-4 border-t border-gray-200 p-5 dark:border-slate-800 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-bold uppercase text-red-600 dark:text-red-300">
                      {t("This week")}
                    </p>
                    <p className="mt-1 text-gray-700 dark:text-slate-300">
                      {t("Build a mini game, remix it, and share the final project.")}
                    </p>
                  </div>
                  <div className="rounded-lg bg-yellow-50 p-4 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-100">
                    <Lightbulb className="mb-2" size={22} />
                    <p className="font-semibold">
                      {t("Curiosity is the curriculum. Code is the tool.")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 transition-colors dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-bold uppercase text-red-600 dark:text-red-300">
              {t("Why kids enjoy it")}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-slate-100">
              {t("Lessons feel playful, but every activity builds real technical confidence.")}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {highlights.map(({ icon: Icon, title, copy }) => (
              <article
                key={title}
                className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-slate-800 dark:bg-slate-950"
              >
                <Icon className="text-red-600 dark:text-red-300" size={28} />
                <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-slate-100">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-gray-600 dark:text-slate-300">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14 transition-colors dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-bold uppercase text-blue-600 dark:text-blue-300">
                {t("Learning paths")}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-slate-100">
                {t("Choose the kind of making that lights them up.")}
              </h2>
              <p className="mt-4 leading-7 text-gray-600 dark:text-slate-300">
                {t("Each path can stand alone or grow into the next one, so students can start simple and keep building as their confidence grows.")}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {paths.map(({ icon: Icon, title, copy, accent }) => (
                <article
                  key={title}
                  className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-gray-200 dark:bg-slate-900 dark:ring-slate-800"
                >
                  <div className={`mb-4 inline-flex rounded-lg p-3 ${accent}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-slate-300">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 transition-colors dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="rounded-lg bg-slate-900 p-8 text-white dark:bg-slate-800 md:p-10">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-sm font-bold uppercase text-red-300">
                  {t("Ready to start?")}
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                  {t("Find an upcoming class and give your child a first project to be proud of.")}
                </h2>
              </div>
              <Link
                to="/event"
                className="inline-flex items-center justify-center gap-2 rounded bg-white px-6 py-3 font-bold uppercase text-slate-900 transition hover:bg-red-50 hover:text-red-700"
              >
                {t("View Events")}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CookieConsent
        buttonStyle={{ backgroundColor: "#dc2626", color: "#fff" }}
        style={{ background: "#1e293b", color: "#f8fafc" }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
};

export default Home;
