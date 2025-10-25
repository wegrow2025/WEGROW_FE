import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Home,
  TrendingUp,
  Clock,
  Lightbulb,
  Menu,
  X,
  Settings,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const navItems = [
  { path: "/", label: "홈", icon: Home },
  { path: "/timeline", label: "타임라인", icon: Clock },
  { path: "/growth", label: "성장분석", icon: TrendingUp },
  { path: "/tips", label: "팁", icon: Lightbulb },
];

export function Layout({ children, showNav = true }: LayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLanding = location.pathname === "/" && !showNav;

  if (isLanding) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F4] via-[#FEEFF7] to-[#F7F6FF] text-slate-900 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between h-16 px-4 border-b border-[#F4D7E8] bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-40">
        <Link to="/" className="text-lg font-bold text-[#E17AA4]">
          We:Grow
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-[#FDF2F7] rounded-md text-slate-600"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-[#F4D7E8] bg-white/80 backdrop-blur-xl h-screen fixed top-0 left-0">
        <div className="flex items-center gap-3 h-20 px-6 border-b border-[#F4D7E8] bg-white/70">
          <div className="w-10 h-10 rounded-2xl bg-[#F7B5C3] flex items-center justify-center text-lg shadow-sm">
            🐭
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              도담
            </span>
            <span className="text-xs text-slate-500">말놀이 성장 파트너</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all",
                location.pathname === path
                  ? "bg-gradient-to-r from-[#FDE4EC] to-[#E7D7FA] text-slate-900 font-semibold shadow-sm"
                  : "text-slate-600 hover:bg-[#FDF2F7]"
              )}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-[#F4D7E8] p-4 space-y-2">
          <Link
            to="/upload"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-[#FDF2F7] transition"
          >
            <Upload size={20} />
            <span>녹음/업로드</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-[#FDF2F7] transition"
          >
            <Settings size={20} />
            <span>설정</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white/95 backdrop-blur-xl border-r border-[#F4D7E8] flex flex-col">
            <div className="h-16" />
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl transition",
                    location.pathname === path
                      ? "bg-gradient-to-r from-[#FDE4EC] to-[#E7D7FA] text-slate-900 font-semibold shadow-sm"
                      : "text-slate-600 hover:bg-[#FDF2F7]"
                  )}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
            <div className="border-t border-[#F4D7E8] p-4 space-y-2">
              <Link
                to="/upload"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-[#FDF2F7] transition"
              >
                <Upload size={20} />
                <span>녹음/업로드</span>
              </Link>
              <Link
                to="/settings"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-[#FDF2F7] transition"
              >
                <Settings size={20} />
                <span>설정</span>
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <div className="pb-20 lg:pb-0">{children}</div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-[#F4D7E8] bg-white/90 backdrop-blur flex items-center justify-around h-16 z-40">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={cn(
              "flex flex-col items-center justify-center gap-1 flex-1 h-full transition",
              location.pathname === path
                ? "text-[#E17AA4] bg-[#FDF2F7]"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Icon size={24} />
            <span className="text-xs font-medium">{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
