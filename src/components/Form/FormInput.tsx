import React from "react";
import { useFormContext } from "react-hook-form";
import styles from "./FormInput.module.css";

type FormInputProps = {
  label: string;
  name: string;
  type?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        placeholder=" "
        className={styles.inputField}
        {...register(name)}
      />
      {errors[name] && (
        <span className={styles.errorMessage}>
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default FormInput;
