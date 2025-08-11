"use client";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";

const Upload = () => {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="grid w-full max-w-sm items-center gap-3 ">
        <Label htmlFor="">Enter files</Label>
        <Input id="file" type="file" onChange={handleFile} />
      </div>
    </div>
  );
};

export default Upload;
