import React from "react";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { useForm } from "react-hook-form";

const LoginForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="game-form">
      <div className="game-form-item">
        <label>Username</label>
        <InputText
          className="p-mb-3"
          {...register("username", { required: true })}
        />
        {errors.name && <div className="error-message"> Name required </div>}
      </div>
      <div className="game-form-item">
        <label>Password</label>
        <InputText
          type="password"
          className="p-mb-3"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <div className="error-message"> Password required </div>
        )}
      </div>
      <Button className="pink-button mt-4" label="Login" type="submit">
        {" "}
      </Button>
    </form>
  );
};

export default LoginForm;
