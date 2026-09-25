import React, { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToggle } from "../../../hooks/useToggle";

import * as z from "zod";
import { loginFormSchema } from "../../../utils/formSchema/loginFormSchema";
import { signUpSchema } from "../../../utils/formSchema/loginFormSchema";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import BaseButton from "../BaseButton";

type LoginFormProps = {
  onSubmit: (data: z.infer<typeof loginFormSchema>) => void;
  onSignUp: (data: any) => void;
};

const LoginForm = ({ onSubmit, onSignUp }: LoginFormProps) => {
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      password_confirm: "",
    },
  });

  const loginMode = useToggle(true);

  return loginMode.toggleValue ? (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="flex-1 text-2xl font-bold">Login</div>
          <BaseButton
            label="Sign Up"
            onClick={loginMode.toggleOFF}
            className="bg-amber-400 hover:bg-amber-500 transition-all duration-150"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="form-login"
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4"
        >
          <FieldGroup>
            <Controller
              name="username"
              control={loginForm.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="form-username">Username</FieldLabel>
                  <Input
                    {...field}
                    id="form-username"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={loginForm.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="form-password">Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="form-password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Field orientation="horizontal" className="flex gap-3 justify-center">
            <BaseButton label="Login" form="form-login" type="submit" />
          </Field>
        </form>
      </CardContent>
    </Card>
  ) : (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="flex-1 text-2xl font-bold">Sign Up</div>
          <BaseButton
            label="Login"
            onClick={loginMode.toggleON}
            className="bg-amber-400 hover:bg-amber-500 transition-all duration-150"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="form-signup"
          onSubmit={signUpForm.handleSubmit(onSignUp)}
          className="flex flex-col items-center gap-4"
        >
          <FieldGroup>
            <Controller
              name="username"
              control={signUpForm.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="form-username">Username</FieldLabel>
                  <Input
                    {...field}
                    id="form-username"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={signUpForm.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="form-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="form-password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password_confirm"
              control={signUpForm.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="form-password-confirm">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-password-confirm"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Field orientation="horizontal" className="flex gap-3 justify-center">
            <BaseButton form="form-signup" type="submit" label="Sign Up" />
          </Field>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
