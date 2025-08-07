"use client";
import Link from "next/link";

import { BookHeart, Sparkles, User } from "lucide-react";
import { Button } from "./ui/button";
import ThemeSwitcher from "./theme/theme-switcher";

export default function Navbar() {
  return (
    <div>
      {" "}
      <div className="flex justify-between border border-muted shadow-md p-6">
        <div>
          {" "}
          <Link href="/">
            <div className="flex items-center justify-center gap-2">
              <BookHeart className="w-6 h-6 text-[#6366F1]" />
              <span className="text-2xl font-semibold  tracking-tight">
                Smart-Docs{" "}
              </span>
            </div>{" "}
          </Link>
        </div>
        <div className="flex gap-4">
          <div>
            <ThemeSwitcher />
          </div>

          <div>
            <Button className="rounded-full">
              <User />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
