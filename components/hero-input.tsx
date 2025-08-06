"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const HeroInput = () => {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  return (
    <div className="flex gap-2 items-center">
      <div className="">
        <Input
          placeholder="Ask questions"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="px-3 py-3 w-[60vh]"
        />
      </div>
      <div>
        <Button
          onClick={() => {
            localStorage.setItem("prompt", prompt);
            router.push("/chat");
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default HeroInput;
