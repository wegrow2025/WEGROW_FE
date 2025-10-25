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

export default function Register() {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [childAge, setChildAge] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 기본 검증
    if (!name.trim()) return setError("이름을 입력해주세요.");
    if (!email.trim() || !email.includes("@"))
      return setError("올바른 이메일을 입력해주세요.");
    if (pw.length < 8)
      return setError("비밀번호는 8자 이상으로 설정해주세요.");
    if (pw !== pw2) return setError("비밀번호가 일치하지 않습니다.");
    const parsedChildAge = Number(childAge);
    if (!childAge.trim() || Number.isNaN(parsedChildAge) || parsedChildAge <= 0)
      return setError("아이의 월령을 숫자로 입력해주세요.");
    if (!agree) return setError("서비스 약관과 개인정보 처리방침에 동의해주세요.");

    setLoading(true);

    try {
      const data =  JSON.stringify({
          'email' : email.trim(),
          'password': pw,
          'childAge': parsedChildAge,
          'name': name.trim(),
        });

      console.log(data);
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include",
        body: data,
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          (payload as { message?: string } | null)?.message ||
          "회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        throw new Error(message);
      }

      const userData = (payload as { user?: unknown } | null)?.user ?? payload;

      if (userData && typeof userData === "object") {
        const candidate = userData as Record<string, unknown>;
        setCurrentUser({
          name: typeof candidate.name === "string" ? candidate.name : name.trim(),
          email: typeof candidate.email === "string" ? candidate.email : email,
          childAge:
            typeof candidate.childAge === "number"
              ? candidate.childAge
              : typeof candidate.childAge === "string"
                ? Number(candidate.childAge)
                : parsedChildAge,
          ...candidate,
        });
      } else {
        setCurrentUser({
          name: name.trim(),
          email,
          childAge: parsedChildAge,
        });
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error
          ? err.message
          : "회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#FFF9F4] via-[#FEEFF7] to-[#F7F6FF] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
        <Card className="w-full border border-[#F4D7E8] bg-white/85 shadow-2xl backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-extrabold text-[#E17AA4]">
              회원가입
            </CardTitle>
            <CardDescription className="text-slate-600">
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
                <Label htmlFor="child-age">아이 월령</Label>
                <Input
                  id="child-age"
                  type="number"
                  min={0}
                  placeholder="18"
                  required
                  className="placeholder:text-muted-foreground focus:placeholder-transparent"
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
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
              <div className="flex items-start space-x-3 rounded-2xl border border-[#F4D7E8] bg-[#FFF2F8] p-3 text-xs text-slate-600">
                <Checkbox
                  id="terms"
                  className="mt-0.5"
                  checked={agree}
                  onCheckedChange={(v) => setAgree(Boolean(v))}
                />
                <Label htmlFor="terms" className="flex-1 text-left">
                  <span className="font-medium text-[#E17AA4]">서비스 이용 약관</span>과
                  <span className="font-medium text-[#E17AA4]"> 개인정보 처리방침</span>에 동의합니다.
                </Label>
              </div>

              {error && (
                <p className="text-sm font-medium text-[#E17AA4]">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full rounded-full bg-[#E17AA4] text-sm font-semibold text-white transition hover:bg-[#d0648f]"
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
                className="h-auto p-0 text-sm font-semibold text-[#E17AA4] hover:text-[#d0648f]"
                asChild
              >
                <Link to="/login">로그인하기</Link>
              </Button>
            </p>

            <div className="pt-2 text-center text-xs text-muted-foreground">
              <Link to="/" className="transition hover:text-[#E17AA4]">
                홈으로
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
