"use client";

import FormInput from "@/components/FormInput";
import { FormProvider } from "react-hook-form";

export default function LoginForm() {
  return (
    <form className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5">
      <FormInput label="Email" name="email" type="email" />
      <FormInput label="Password" name="password" type="password" />

      <button>Login</button>
    </form>
  );
}
