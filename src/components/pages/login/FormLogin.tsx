"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ValidationForm from "@/model/validation-form";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import ResponseError from "@/error/ResponseError";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function FormLogin() {
  type CREATEUSER = z.infer<typeof ValidationForm.CREATEUSER>;
  const form = useForm<CREATEUSER>({
    resolver: zodResolver(ValidationForm.CREATEUSER),
    mode: "onChange",
    defaultValues: {
      password: "",
      username: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(data: CREATEUSER) {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        ...data,
        callbackUrl: "/",
        redirect: false,
      });

      if (!res?.ok && res?.status && res?.error) {
        throw new ResponseError(res?.status, res?.error);
      }

      router.push("/");
      toast.success("Successfully login!");
    } catch (error) {
      let message = "An error occured!";
      if (error instanceof ResponseError) {
        message = error.message;
      }

      setLoading(false);
      toast.error(message);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        form.handleSubmit(handleSubmit)();
      }}
    >
      <FieldGroup className="space-y-2">
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                id="username"
                type="text"
                placeholder="JaneDoe"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id="password"
                type="password"
                placeholder="********"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button disabled={loading} className="py-4.5 font-medium" type="submit">
          {loading ? (
            <>
              <Spinner />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
