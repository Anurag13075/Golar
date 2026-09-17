"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <motion.svg 
    initial={{
      x:20,
      filter:"blur(0px)"
    }}
    animate={{
      x:0,
      filter:"blur(20px)"
    }}
    viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.9-2.26 5.35-4.78 7l7.73 6c4.51-4.18 7.09-10.36 7.09-17.47z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.01 24.01 0 0 0 0 21.56l7.98-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.9l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </motion.svg>
  );
}

function EyeIcon({ open, className }: { open: boolean; className?: string }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.24 4.24M9.4 5.5A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a13.6 13.6 0 0 1-3.4 4.2M6.6 6.6C4.3 8.1 2 12 2 12a13.9 13.9 0 0 0 5.4 5.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FieldLabel({
  htmlFor,
  active,
  children,
}: {
  htmlFor: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.label
      htmlFor={htmlFor}
      initial={false}
      animate={{
        top: active ? 8 : 18,
        fontSize: active ? "0.7rem" : "0.95rem",
        color: active ? "#a89b8c" : "#6b6259",
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="pointer-events-none absolute left-4 origin-left font-normal tracking-wide"
    >
      {children}
    </motion.label>
  );
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Enter your email and password to continue.");
      return;
    }
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0f0d0b] px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[400px] overflow-hidden rounded-2xl border border-[#2a2521] bg-[#161310] p-9 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
      >
        {/* subtle top glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-[#c9814a]/10 blur-3xl" />

        <div className="relative">
          <div className="mb-8">
            <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#c9814a]/15">
              <span className="h-2 w-2 rounded-full bg-[#c9814a]" />
            </div>
            <h1 className="text-[1.6rem] font-medium leading-tight text-[#f3ede6]">
              Welcome back
            </h1>
            <p className="mt-1.5 text-[0.9rem] text-[#8a8079]">
              Sign in to pick up where you left off.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className={cn(
                  "peer h-[54px] w-full rounded-xl border bg-[#1c1814] px-4 pt-4 text-[0.95rem] text-[#f3ede6] outline-none transition-colors",
                  "border-[#332c26] focus:border-[#c9814a]/70"
                )}
              />
              <FieldLabel htmlFor="email" active={emailFocused || email.length > 0}>
                Email
              </FieldLabel>
            </div>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className={cn(
                  "peer h-[54px] w-full rounded-xl border bg-[#1c1814] px-4 pt-4 pr-11 text-[0.95rem] text-[#f3ede6] outline-none transition-colors",
                  "border-[#332c26] focus:border-[#c9814a]/70"
                )}
              />
              <FieldLabel htmlFor="password" active={passwordFocused || password.length > 0}>
                Password
              </FieldLabel>
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6b6259] transition-colors hover:text-[#c9b8a5]"
              >
                <EyeIcon open={showPassword} className="h-[18px] w-[18px]" />
              </button>
            </div>

            <div className="flex justify-end -mt-1">
              <a
                href="#"
                className="text-[0.8rem] text-[#8a8079] transition-colors hover:text-[#c9814a]"
              >
                Forgot password?
              </a>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[0.8rem] text-[#e0806a]"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="mt-1 flex h-[50px] w-full items-center justify-center rounded-xl bg-[#c9814a] text-[0.95rem] font-medium text-[#161310] transition-colors hover:bg-[#d68e56] disabled:opacity-70"
            >
              {loading ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                  className="h-4 w-4 rounded-full border-2 border-[#161310]/30 border-t-[#161310]"
                />
              ) : (
                "Sign in"
              )}
            </motion.button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#2a2521]" />
            <span className="text-[0.75rem] text-[#6b6259]">or continue with</span>
            <div className="h-px flex-1 bg-[#2a2521]" />
          </div>

          <button
            type="button"
            className="flex h-[50px] w-full items-center justify-center gap-2.5 rounded-xl border border-[#332c26] bg-[#1c1814] text-[0.9rem] font-medium text-[#f3ede6] transition-colors hover:border-[#443a31] hover:bg-[#221d18]"
          >
            <GoogleIcon className="h-[18px] w-[18px]" />
            Continue with Google
          </button>

          <p className="mt-7 text-center text-[0.85rem] text-[#8a8079]">
            Don&apos;t have an account?{" "}
            <a href="#" className="font-medium text-[#c9814a] hover:text-[#d68e56]">
              Sign up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}