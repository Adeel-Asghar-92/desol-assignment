"use client";

import { LoginUserInput, LoginUserSchema } from "@/lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import FormInput from "@/components//Form/FormInput";
import Link from "next/link";
// import { handleApiError } from "@/lib/helpers";
// import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/Buttons/LoadingButton";
import { login } from "@/actions/auth";

export default function LoginForm() {
  const router = useRouter();
  const [requestLoading, setRequestLoading] = useState(false);
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

  async function LoginUserFunction(credentials: LoginUserInput) {
    setRequestLoading(true);
    await login(credentials)
      .then(({ data }) => {
        localStorage.setItem("accessToken", data.data.accessToken);
        router.push("/carModel/upload");
      })
      .catch((error) => {
        if (error instanceof Error) {
          // handleApiError(error);
        } else {
          console.log("Error message:", error.message);
        }
      })
      .finally(() => {
        setRequestLoading(false);
      });
  }

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
