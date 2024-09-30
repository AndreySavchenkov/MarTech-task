"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./RegisterForm.module.scss";
import { Button } from "../Button/Button";
import errorIcon from "../../../public/icons/error.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IFormInput {
  email: string;
  password: string;
}

export const RegisterForm = ({ handle }: { handle: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const router = useRouter();

  const authenticateUser = async (credentials: string) => {
    const response = await fetch("https://api.dating.com/identity", {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  };

  const registerUser = async (data: IFormInput) => {
    const response = await fetch("https://api.dating.com/identity", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("Submitting data:", data);
    setLoading(true);
    setErrorMessage("");

    const credentials = btoa(`${data.email}:${data.password}`);
    console.log("Encoded credentials:", credentials);

    try {
      const authResponse = await authenticateUser(credentials);

      if (authResponse.ok) {
        const authToken = authResponse.headers.get("X-Token");
        if (authToken) {
          localStorage.setItem("authToken", authToken);
          router.push(`https://www.dating.com/people/#token=${authToken}`);
          return;
        }
      } else if (authResponse.status === 401) {
        console.error(
          "Unauthorized: Invalid credentials. Trying to register..."
        );
        const registrationResponse = await registerUser(data);

        if (registrationResponse.ok) {
          const regToken = registrationResponse.headers.get("X-Token");
          if (regToken) {
            localStorage.setItem("authToken", regToken);
            router.push(`https://www.dating.com/people/#token=${regToken}`);
          }
        } else {
          const error = await registrationResponse.json();
          setErrorMessage(error.message || "Registration failed.");
        }
      } else {
        const error = await authResponse.json();
        setErrorMessage(error.message || "Authorization failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.form__title}>
        To register, enter the mail to which our news is sent and set your
        password
      </p>
      <div className={styles.form__field}>
        <input
          className={`${styles.form__field__input} ${
            errors.email ? styles.form__field__input_error : ""
          }`}
          placeholder="Example@email.com"
          {...register("email", {
            required: "Email Address is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid e-mail",
            },
          })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <>
            <p role="alert" className={styles.form__field__errorMessage}>
              {errors.email.message}
            </p>
            <Image
              className={styles.form__field__errorIcon}
              src={errorIcon}
              width={20}
              height={20}
              alt="error icon"
            />
          </>
        )}
        {errorMessage && (
          <p className={styles.form__field__errorMessage}>{errorMessage}</p>
        )}
      </div>
      <div className={styles.form__field}>
        <input
          className={`${styles.form__field__input} ${
            errors.password ? styles.form__field__input_error : ""
          }`}
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            maxLength: {
              value: 255,
              message: "Password cannot exceed 255 characters",
            },
          })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <>
            <p role="alert" className={styles.form__field__errorMessage}>
              {errors.password.message}
            </p>
            <Image
              className={styles.form__field__errorIcon}
              src={errorIcon}
              width={20}
              height={20}
              alt="error icon"
            />
          </>
        )}
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Send"}
      </Button>
    </form>
  );
};
