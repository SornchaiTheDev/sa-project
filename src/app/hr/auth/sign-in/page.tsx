"use client";

import { Label } from "@radix-ui/react-label";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

function HRSignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post("/api/hr/auth/sign-in", {
        username,
        password,
      });
      router.push("/hr");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          setIsError(true);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsError(false);
  }, [username, password]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-[400px]">
        <h3 className="text-xl font-medium text-center">เข้าสู่ระบบ</h3>
        <form onSubmit={handleSignIn} className="flex flex-col gap-2 mt-4">
          <Label className="text-sm">ชื่อผู้ใช้</Label>
          <Input
            placeholder="ชื่อผู้ใช้"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-zinc-100 h-12"
          />
          <Label className="text-sm">รหัสผ่าน</Label>
          <Input
            placeholder="รหัสผ่าน"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-100 h-12"
          />
          {isError && (
            <p className="text-red-500 text-sm mt-1">
              ชื่อผู้ใช้หรือรหัสผ่านผิด
            </p>
          )}
          <Button {...{ isLoading }} className="w-full mt-2 h-10">
            เข้าสู่ระบบ
          </Button>
        </form>
        <h6 className="text-sm text-zinc-700 mt-2">
          ฉันยังไ่ม่มีบัญชี{" "}
          <Link href="/hr/auth/sign-up" className="text-zinc-900 font-medium">
            ลงทะเบียน
          </Link>
        </h6>
      </div>
    </div>
  );
}

export default HRSignInPage;
