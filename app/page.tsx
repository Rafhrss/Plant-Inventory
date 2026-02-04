import AuthButton from "@/components/auth-button";
import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href='/login'>Sign In</Link>
      <Hero/>
      <AuthButton/>
    </>
  );
}