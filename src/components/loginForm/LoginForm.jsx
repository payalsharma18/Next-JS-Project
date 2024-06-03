"use client";
import { useState } from "react";
import styles from "./loginForm.module.css";
import Link from "next/link";
import { login } from "@/lib/actions";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation
    const validationErrors = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      const result = await login(undefined, formData);
      if (result.success) {
        // Redirect to dashboard or other page
      } else {
        setErrors({ error: result.error });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    let formErrors = {};

    if (!data.username.trim()) {
      formErrors.username = "Username is required";
    }

    if (!data.password.trim()) {
      formErrors.password = "Password is required";
    }

    return formErrors;
  };

  const validateField = (name, value) => {
    let fieldErrors = {};

    switch (name) {
      case "username":
        if (!value.trim()) {
          fieldErrors[name] = "Username is required";
        }
        break;
      case "password":
        if (!value.trim()) {
          fieldErrors[name] = "Password is required";
        }
        break;
      default:
        break;
    }

    return fieldErrors;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      {errors.username && <p className={styles.error}>{errors.username}</p>}
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p className={styles.error}>{errors.password}</p>}
      <button type="submit">Login</button>
      {errors.error && <p className={styles.error}>{errors.error}</p>}
      <Link href="/register">
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </form>
  );
};

export default LoginForm;

// import styles from "./loginForm.module.css";
// import { useFormState } from "react-dom";
// import Link from "next/link";
// import { login } from "@/lib/actions";

// const LoginForm = () => {
//   const [state, formAction] = useFormState(login, undefined);

//   return (
//     <form action={formAction} className={styles.form} >
//       <input type="text" placeholder="username" name="username" />
//       <input type="password" placeholder="password" name="password" />
//       <button>Login</button>
//       {state?.error}
//       <Link href="/register">
//         {"Don't have an account?"} <b>Register</b>
//       </Link>
//     </form>
//   );
// };

// export default LoginForm;
