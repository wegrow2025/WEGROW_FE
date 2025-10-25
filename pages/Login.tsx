import { Link } from "react-router-dom";
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
            <form className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" type="email" placeholder="email@example.com" autoComplete="email" required className="placeholder:text-muted-foreground focus:placeholder-transparent"/>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">비밀번호</Label>
                  {/* <Button variant="link" type="button" className="h-auto p-0 text-xs font-medium">
                    비밀번호를 잊으셨나요?
                  </Button> */}
                </div>
                <Input id="password" type="password" placeholder="••••••••" autoComplete="current-password" required className="placeholder:text-muted-foreground focus:placeholder-transparent"/>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-xs font-medium text-muted-foreground">
                    로그인 상태 유지
                  </Label>
                </div>
              </div>
              <Button type="submit" className="w-full text-sm font-semibold">
                We:Grow 시작하기
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
