import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export default function Login() {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !email.includes("@")) {
      return setError("올바른 이메일을 입력해주세요.");
    }
    if (!pw) {
      return setError("비밀번호를 입력해주세요.");
    }

    setLoading(true);

    try {

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password: pw,
          rememberMe: remember,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          (payload as { message?: string } | null)?.message || "이메일 또는 비밀번호가 올바르지 않습니다.";
        throw new Error(message);
      }

      // JWT 토큰 저장
      const token = (payload as { token?: string } | null)?.token;
      if (token) {
        localStorage.setItem('token', token);
      }

      const userData = (payload as { user?: unknown } | null)?.user ?? payload;

      if (userData && typeof userData === "object") {
        const candidate = userData as Record<string, unknown>;
        setCurrentUser({
          name: typeof candidate.name === "string" ? candidate.name : undefined,
          email: typeof candidate.email === "string" ? candidate.email : email,
          childAge:
            typeof candidate.childAge === "number"
              ? candidate.childAge
              : typeof candidate.childAge === "string"
                ? Number(candidate.childAge)
                : undefined,
          ...candidate,
        });
      } else {
        setCurrentUser({ email });
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "로그인 처리 중 오류가 발생했습니다.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <Card className="w-full border-border/70 bg-background/95 shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-semibold text-foreground">
              로그인
            </CardTitle>
            <CardDescription>
              등록한 이메일과 비밀번호로 계속 진행하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  autoComplete="email"
                  required
                  className="placeholder:text-muted-foreground focus:placeholder-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">비밀번호</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="placeholder:text-muted-foreground focus:placeholder-transparent"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={(v) => setRemember(Boolean(v))}
                  />
                  <Label htmlFor="remember" className="text-xs font-medium text-muted-foreground">
                    로그인 상태 유지
                  </Label>
                </div>
              </div>

              {error && (
                <p className="text-sm font-medium text-destructive">{error}</p>
              )}

              <Button type="submit" className="w-full text-sm font-semibold" disabled={loading}>
                {loading ? "처리 중..." : "We:Grow 시작하기"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              아직 계정이 없으신가요?{" "}
              <Button
                variant="link"
                type="button"
                className="h-auto p-0 text-sm font-semibold"
                asChild
              >
                <Link to="/register">가입하기</Link>
              </Button>
            </p>
            <div className="pt-2 text-center text-xs text-muted-foreground">
              <Link to="/" className="transition hover:text-primary">홈으로</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
