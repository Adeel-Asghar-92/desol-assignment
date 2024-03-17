"use client";

import { LoginUserInput, LoginUserSchema } from "@/lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
// import { apiLoginUser } from "@/lib/api-requests";
import FormInput from "@/components//Form/FormInput";
import Link from "next/link";
// import { LoadingButton } from "@/components/LoadingButton";
// import { handleApiError } from "@/lib/helpers";
// import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/Buttons/LoadingButton";

export default function LoginForm() {
  const router = useRouter();

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(LoginUserSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  async function LoginUserFunction(credentials: LoginUserInput) {}

  const onSubmitHandler: SubmitHandler<LoginUserInput> = (values) => {
    LoginUserFunction(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="">
        <FormInput label="Email" name="email" type="email" />
        <FormInput label="Password" name="password" type="password" />

        <LoadingButton loading={false} textColor="007bff">
          Login
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
