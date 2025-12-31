import React, { useState } from "react";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { useForm } from "react-hook-form";
import { useToggle } from "../../../hooks/useToggle";

const LoginForm = ({ onSubmit, onSignUp }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
 const loginMode = useToggle(true)

  return loginMode.toggleValue ? (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4">
      <div className="flex gap-3 items-center">
        <label className="w-18">Username</label>
        <div>
          <InputText
            className="bg-transparent! border rounded-lg border-gray-500"
            {...register("username", { required: true })}
          />
          {errors.username && <div className="text-red-500"> Username required </div>}
        </div>
        
      </div>
      <div className="flex gap-3 items-center">
        <label className="w-18">Password</label>
        <div>
          <InputText
            type="password"
            className="bg-transparent! border rounded-lg border-gray-500"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <div className="text-red-500"> Password required </div>
          )}
        </div>
      </div>
      <div></div>
      <Button className="border-none py-1! hover:text-amber-500 hover:text-2xl transition-all" label="Login" type="submit" />
      <p>Or</p>
      <Button className="border-none py-1! hover:text-blue-500" label="Sign Up" type="button" onClick={loginMode.toggleOFF} />
    </form>
  ) : (
    <form onSubmit={handleSubmit(onSignUp)} className="flex flex-col items-center gap-4">
      <div className="flex gap-3 items-center">
        <label className="w-18">Username</label>
        <div>
          <InputText
            className="bg-transparent! border rounded-lg border-gray-500"
            {...register("username", { required: true })}
          />
          {errors.username && <div className="text-red-500"> Username required </div>}
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <label className="w-18">Display name</label>
        <div>
          <InputText
            className="bg-transparent! border rounded-lg border-gray-500"
            {...register("display_name", { required: true })}
            type="email"
          />
          {errors.display_name && <div className="text-red-500"> Display name required </div>}
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <label className="w-18">Email</label>
        <div>
          <InputText
            className="bg-transparent! border rounded-lg border-gray-500"
            {...register("email", { required: true })}
          />
          {errors.email && <div className="text-red-500"> Email required </div>}
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <label className="w-18">Password</label>
        <div>
          <InputText
            type="password"
            className="bg-transparent! border rounded-lg border-gray-500"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <div className="text-red-500"> Password required </div>
          )}
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <label className="w-18">Password</label>
        <div>
          <InputText
            type="password"
            className="bg-transparent! border rounded-lg border-gray-500"
            {...register("password_confirm", {
              required: true,
              validate: (value) => {
                return watch("password") === value || "Passwords should match!";
              },
            })}
          />
          {errors.password_confirm && (
            <div className="text-red-500"> Passwords don't match </div>
          )}
        </div>
      </div>
      <div></div>
      <Button className="border-none py-1! hover:text-amber-500 hover:text-2xl transition-all" label="Sign Up" type="submit" />
      <p>Already have an account?</p>
      <Button className="border-none py-1! hover:text-blue-500" label="Login" type="button" onClick={loginMode.toggleON} />
    </form>
  );
};

export default LoginForm;
