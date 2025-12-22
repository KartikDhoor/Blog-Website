import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaHome, FaCommentAlt, FaBell } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { BiCategory } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { HiMiniBars4 } from "react-icons/hi2";
import { RxCrossCircled } from "react-icons/rx";
import { BarChart3 } from "lucide-react";

export default function DashboardMaster() {
  const [nav, setNav] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Watch html.dark class
  useEffect(() => {
    const initialDark = document.documentElement.classList.contains("dark");
    setIsDark(initialDark);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName === "class") {
          const hasDark = document.documentElement.classList.contains("dark");
          setIsDark(hasDark);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleNavbar = () => setNav((prev) => !prev);

  const links = [
    { to: "/dashboard", label: "Home", icon: FaHome },
    { to: "/dashboard/user", label: "Users", icon: BsFillPersonFill },
    { to: "/dashboard/blog", label: "Blog", icon: CgWebsite },
    { to: "/dashboard/category", label: "Category", icon: BiCategory },
    { to: "/dashboard/comment", label: "Comment", icon: FaCommentAlt },
    { to: "/dashboard/announcement", label: "Announcement", icon: FaBell },
    { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/", label: "Website", icon: CgWebsite },
  ];

  const NavLinkBlock = ({ to, label, Icon }) => (
    <Link to={to}>
      <div className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 mb-2 transition-all hover:-translate-y-1 hover:bg-orange-500/10 hover:border-orange-400/40 border border-transparent">
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-black/80 dark:bg-white/10 text-orange-400 shadow-md group-hover:shadow-orange-500/40">
          <Icon className="w-5 h-5" />
        </div>
        <span className="hidden md:inline-block text-sm font-semibold text-gray-900 dark:text-gray-100">
          {label}
        </span>
      </div>
    </Link>
  );

  return (
    <div
      className={`min-h-screen w-full flex transition-colors duration-500 bg-gradient-to-br ${
        isDark
          ? "from-gray-950 via-black to-gray-900 text-white"
          : "from-white via-orange-50 to-yellow-50 text-gray-900"
      }`}
    >
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col w-72 px-5 py-6 gap-4 sticky top-0 h-screen z-40 border-r backdrop-blur-2xl transition-colors duration-500 ${
          isDark
            ? "bg-black/80 border-white/10"
            : "bg-white/80 border-orange-100 shadow-xl"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-black tracking-[0.22rem] uppercase bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
            NEURADHOOR
          </h1>
        </div>

        {/* Section label */}
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 mb-2">
          Dashboard
        </p>

        {/* Links */}
        <nav className="flex-1 pr-1 overflow-y-auto sidebar-scroll">
          {links.map((item) => (
            <NavLinkBlock
              key={item.to}
              to={item.to}
              label={item.label}
              Icon={item.icon}
            />
          ))}
        </nav>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <div
          className={`h-16 flex items-center justify-between px-4 sm:px-6 border-b backdrop-blur-xl transition-colors duration-500 ${
            isDark
              ? "bg-black/85 border-white/10"
              : "bg-white/90 border-orange-100 shadow-md"
          }`}
        >
          <h1 className="text-lg font-black tracking-[0.2rem] uppercase bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
            NEURADHOOR
          </h1>
          <button
            onClick={handleNavbar}
            className={`p-2.5 rounded-2xl border shadow-md transition-colors ${
              isDark
                ? "bg-white/10 border-white/20"
                : "bg-white border-orange-100"
            }`}
          >
            <HiMiniBars4 className="w-6 h-6 text-orange-500" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {nav && (
        <aside className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleNavbar}
          />
          <div
            className={`absolute top-0 right-0 h-full w-[80%] sm:w-[70%] flex flex-col px-5 py-5 border-l backdrop-blur-2xl shadow-2xl transition-colors duration-500 ${
              isDark
                ? "bg-black/92 border-white/10"
                : "bg-white/95 border-orange-100"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black tracking-[0.18rem] uppercase bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
                Dashboard
              </h2>
              <button
                className="p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10"
                onClick={handleNavbar}
              >
                <RxCrossCircled className="w-7 h-7 text-orange-500" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto sidebar-scroll">
              {links.map((item) => (
                <Link to={item.to} key={item.to} onClick={handleNavbar}>
                  <div className="group flex items-center gap-3 rounded-2xl px-3 py-3 mb-1 transition-all hover:-translate-y-1 hover:bg-orange-500/10 hover:border-orange-400/40 border border-transparent">
                    <div className="flex items-center justify-center w-9 h-9 rounded-2xl bg-black/80 dark:bg-white/10 text-orange-400 shadow-md group-hover:shadow-orange-500/40">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {item.label}
                    </span>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </aside>
      )}

      {/* Main content area with light/dark glass card background */}
      <main className="flex-1 lg:ml-2 pt-20 lg:pt-10 pb-8 px-2 sm:px-4 lg:px-6">
        <div
          className={`max-w-6xl mx-auto rounded-3xl border backdrop-blur-2xl p-3 sm:p-4 lg:p-5 transition-colors duration-500 ${
            isDark
              ? "bg-white/5 border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.75)]"
              : "bg-white/80 border-orange-100 shadow-[0_18px_60px_rgba(253,186,116,0.35)]"
          }`}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}
