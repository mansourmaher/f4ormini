"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Car, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/actions/auth/account";
import { logout } from "@/actions/auth/logout";

export function Header() {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserProfile();

      if (user.success && user.data) {
        setIsAuth(true);
      }
    };
    fetchUser();
  }, []);

  const handelClick = () => {
    isAuth ? router.push("/setup_account") : router.push("/login");
  };

  const handelLoagout=async()=>{
    await logout()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
            <Car className="h-6 w-6 text-accent-foreground" />
          </div>
          <span className="text-xl font-bold">AutoVerse</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/car"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Buy Cars
          </Link>
          <Link
            href="/sell"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Sell Your Car
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isAuth ? (
            <>
              <Button
                variant="ghost"
                className="hidden md:inline-flex"
                onClick={handelClick}
              >
                Profile
              </Button>
              <Button
                variant="ghost"
                className="hidden md:inline-flex"
                onClick={handelLoagout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              className="hidden md:inline-flex"
              onClick={handelClick}
            >
              Sign In
            </Button>
          )}

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
