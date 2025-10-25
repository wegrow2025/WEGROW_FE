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

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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
      const raw = localStorage.getItem("wegrow-users") || "[]";
      const users: { email: string; password: string; name?: string }[] = JSON.parse(raw);
      const found = users.find((u) => u.email === email);

      if (!found || found.password !== pw) {
        setLoading(false);
        return setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      }

      // 로그인 성공 처리
      const profile = { email: found.email, name: found.name ?? "사용자" };

      // 세션 지속성: remember 체크 시 localStorage, 아니면 sessionStorage
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("wegrow-login", "true");
      storage.setItem("wegrow-current-user", JSON.stringify(profile));

      // 다른 저장소에 남아있을 수 있는 이전 세션 정보 정리
      const other = remember ? sessionStorage : localStorage;
      other.removeItem("wegrow-login");
      other.removeItem("wegrow-current-user");

      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      setError("로그인 처리 중 오류가 발생했습니다.");
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
