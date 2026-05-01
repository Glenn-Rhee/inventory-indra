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

  async function handleSubmit(data: CREATEUSER) {}

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
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

        <Button className="py-4.5 text-lg font-medium" type="submit">
          Login
        </Button>
      </FieldGroup>
    </form>
  );
}
