"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    })
    setLoading(false)
  }

  const handleSocialLogin = async (provider: "github" | "google") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4">
      <Card className="w-full max-w-md shadow-lg border-zinc-200 dark:border-zinc-800">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Sign in to your account</CardTitle>
          <CardDescription>Don&apos;t have an account? <span className="text-primary cursor-pointer hover:underline">Sign up</span></CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 gap-2">
            <Button variant="outline" onClick={() => handleSocialLogin("github")}>
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><Separator /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleCredentialsLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <span className="text-xs text-primary hover:underline cursor-pointer">Forgot password?</span>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}