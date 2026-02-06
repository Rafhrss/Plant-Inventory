"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2, Github, EyeOff, Eye } from "lucide-react";
import { Separator } from "./ui/separator";

export function LoginModal() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State untuk error
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Validasi Regex tetap di awal
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (isSignUp && !passwordRegex.test(password)) {
      setErrorMessage(
        "Password minimal 8 karakter, mengandung huruf besar, kecil, dan angka.",
      );
      return;
    }

    setLoading(true);

    // 2. Gunakan if-else langsung agar TypeScript tahu fungsi mana yang dipanggil
    if (isSignUp) {
      await authClient.signUp.email(
        {
          email,
          password,
          name,
          callbackURL: "/",
        },
        {
          onError: (ctx) => {
            setErrorMessage(ctx.error.message);
          },
        },
      );
    } else {
      await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: "/",
        },
        {
          onError: (ctx) => {
            setErrorMessage(ctx.error.message);
          },
        },
      );
    }

    setLoading(false);
  };

  const handleGithubLogin = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {isSignUp ? "Create an Account" : "Sign In"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isSignUp
              ? "Enter your details to register."
              : "Enter your credentials to access your account."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Tombol GitHub yang saya hilangkan tadi */}
          <Button
            variant="outline"
            onClick={handleGithubLogin}
            className="w-full"
          >
            <Github className="mr-2 h-4 w-4" /> GitHub
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            {isSignUp && (
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Rafa Haris"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="rafa@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  // Tipe berubah dinamis tergantung state
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10" // Beri ruang di kanan agar teks tidak tertutup ikon
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" /> // Ikon mata dicoret
                  ) : (
                    <Eye className="h-4 w-4" /> // Ikon mata biasa
                  )}
                </button>
              </div>
              {isSignUp && (
                <p className="text-[10px] text-muted-foreground">
                  Min. 8 chars, uppercase, lowercase & number
                </p>
              )}
            </div>

            {errorMessage && (
              <div className="bg-destructive/10 p-2 rounded-md border border-destructive/20">
                <p className="text-xs text-destructive text-center font-medium">
                  {errorMessage}
                </p>
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>

            <p className="text-center text-sm mt-2">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                className="text-primary font-bold cursor-pointer hover:underline"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
