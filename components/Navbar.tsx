"use client";
import { HomeIcon, Loader2, LogOut, Sprout } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { authClient } from "@/lib/auth-client";
import { LoginModal } from "./LoginModal";

function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.reload(); // Refresh untuk membersihkan state
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-primary font-mono tracking-wider"
            >
              Plantventory
            </Link>
          </div>

          {/* Navbar Components */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/plants">
                <Sprout className="w-4 h-4" />
                <span className="hidden lg:inline">Plants</span>
              </Link>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Home</span>
              </Link>
            </Button>

            <ModeToggle />

            {/* Auth Section: Dialog Pop-up atau Tombol Logout */}
            <div className="flex items-center pl-2 border-l ml-2 gap-2">
              {isPending ? (
                <Button disabled variant="ghost" size="sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </Button>
              ) : session ? (
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden lg:inline">Logout</span>
                </Button>
              ) : (
                <LoginModal /> // Muncul sebagai tombol Sign In yang membuka Pop-up
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
