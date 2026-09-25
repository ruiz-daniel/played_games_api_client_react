import React from "react";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { useForm } from "react-hook-form";

const RegisterForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="game-form">
        <div className="game-form-item">
          <label>Username*</label>
          <InputText
            className="p-mb-3"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <div className="error-message"> Name required </div>
          )}
        </div>
        <div className="game-form-item">
          <label>Display Name*</label>
          <InputText
            className="p-mb-3"
            {...register("display_name", { required: true })}
          />
          {errors.display_name && (
            <div className="error-message"> Display Name required </div>
          )}
        </div>
        <div className="game-form-item">
          <label>Email</label>
          <InputText className="p-mb-3" {...register("email")} />
        </div>
        <div className="game-form-item">
          <label>Password*</label>
          <InputText
            type="password"
            className="p-mb-3"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <div className="error-message"> Password required </div>
          )}
        </div>
        <div className="game-form-item">
          <label>Confirm Password*</label>
          <InputText
            type="password"
            className="p-mb-3"
            {...register("password_confirm", {
              required: true,
              validate: (value) => {
                return watch("password") === value || "Passwords should match!";
              },
            })}
          />
          {errors.password_confirm && (
            <div className="error-message"> Passwords don't match</div>
          )}
        </div>
        <Button className="pink-button mt-4" label="Register" type="submit" />
      </form>
    </div>
  );
};

export default RegisterForm;
