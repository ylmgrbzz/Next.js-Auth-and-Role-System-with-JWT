"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const auth = useAuth();
  console.log("auth", auth);
  return (
    <header>
      <div>
        <Link href="/">Logo</Link>
      </div>
      <nav>
        <Link href="/panel">Panel (Protected Route)</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
