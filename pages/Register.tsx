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

type DemoUser = {
  name: string;
  email: string;
  password: string; // 시연용: 실제 배포에선 해시/서버 저장 필수
};

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 기본 검증
    if (!name.trim()) return setError("이름을 입력해주세요.");
    if (!email.trim() || !email.includes("@"))
      return setError("올바른 이메일을 입력해주세요.");
    if (pw.length < 8)
      return setError("비밀번호는 8자 이상으로 설정해주세요.");
    if (pw !== pw2) return setError("비밀번호가 일치하지 않습니다.");
    if (!agree) return setError("서비스 약관과 개인정보 처리방침에 동의해주세요.");

    setLoading(true);

    // 시연용: 기존 유저 중복 체크
    const raw = localStorage.getItem("wegrow-users") || "[]";
    const users: DemoUser[] = JSON.parse(raw);
    const exists = users.some((u) => u.email === email);
    if (exists) {
      setLoading(false);
      return setError("이미 가입된 이메일입니다. 로그인으로 진행해주세요.");
    }

    const newUser: DemoUser = { name, email, password: pw };
    users.push(newUser);
    localStorage.setItem("wegrow-users", JSON.stringify(users));

    // 시연 편의: 자동 로그인 플래그/프로필 저장
    localStorage.setItem("wegrow-current-user", JSON.stringify({ name, email }));
    localStorage.setItem("wegrow-login", "true");

    setLoading(false);
    // 회원가입 완료 후 이동
    navigate("/dashboard"); // 혹은 "/login"
  };

  return (
    <div className="min-h-screen w-full bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <Card className="w-full border-border/70 bg-background/95 shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-semibold text-foreground">
              회원가입
            </CardTitle>
            <CardDescription>
              필요한 정보를 입력하고 We:Grow와 함께 시작해보세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="홍길동"
                  autoComplete="name"
                  required
                  className="placeholder:text-muted-foreground focus:placeholder-transparent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

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
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  className="placeholder:text-muted-foreground focus:placeholder-transparent"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  최소 8자, 추천: 대/소문자, 숫자 조합
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-confirm">비밀번호 확인</Label>
                <Input
                  id="password-confirm"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  className="placeholder:text-muted-foreground focus:placeholder-transparent"
                  value={pw2}
                  onChange={(e) => setPw2(e.target.value)}
                />
              </div>

              {/* shadcn Checkbox는 네이티브 input이 아니므로 상태로 직접 검사 */}
              <div className="flex items-start space-x-3 rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
                <Checkbox
                  id="terms"
                  className="mt-0.5"
                  checked={agree}
                  onCheckedChange={(v) => setAgree(Boolean(v))}
                />
                <Label htmlFor="terms" className="flex-1 text-left">
                  <span className="font-medium text-foreground">서비스 이용 약관</span>과
                  <span className="font-medium text-foreground"> 개인정보 처리방침</span>에 동의합니다.
                </Label>
              </div>

              {error && (
                <p className="text-sm font-medium text-destructive">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full text-sm font-semibold"
                disabled={loading}
              >
                {loading ? "처리 중..." : "계정 만들기"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              이미 계정이 있으신가요?{" "}
              <Button
                variant="link"
                type="button"
                className="h-auto p-0 text-sm font-semibold"
                asChild
              >
                <Link to="/login">로그인하기</Link>
              </Button>
            </p>

            <div className="pt-2 text-center text-xs text-muted-foreground">
              <Link to="/" className="transition hover:text-primary">
                홈으로
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
