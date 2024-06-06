"use client"
// import { register } from "@/lib/actions";
// import styles from "./registerForm.module.css";
// import { useFormState } from "react-dom";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// const RegisterForm = () => {

//     const router = useRouter();
//     const [state, formAction] = useFormState(register, undefined);

//     useEffect(() => {
//         state?.success && router.push("/login");
//     }, [state?.success, router]);

//     return (
//         <form className={styles.form} action={formAction}>
//             <input type='text' placeholder='username' name='username' />
//             <input type='text' placeholder='email' name='email' />
//             <input type='password' placeholder='password' name='password' />
//             <input type='password' placeholder='password again' name='passwordRepeat' />
//             <button>Register</button>
//             {state?.error}
//             <Link href="/login">Have an account?<b>Login</b></Link>
//         </form>
//     )
// }

// export default RegisterForm


import { useState } from "react";
import { register } from "@/lib/actions";
import styles from "./registerForm.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        passwordRepeat: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        const fieldErrors = validateField(name, value);
        setErrors({
            ...errors,
            [name]: fieldErrors[name] ? fieldErrors[name] : '', // Set error message or empty string if field is now valid
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            const result = await register(undefined, formData);
            if (result.success) {
                router.push("/login");
            } else {
                setErrors({ error: result.error });
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const validateField = (name, value) => {
        let fieldErrors = {};

        switch (name) {
            case "username":
                if (!value.trim()) {
                    fieldErrors[name] = "Username is required";
                } else if (!/^[a-zA-Z0-9_\-\s]{5,15}$/.test(value)) {
                    fieldErrors[name] = "Username must be 5 to 15 characters long and can contain only letters, numbers, hyphens, underscores, and spaces";
                }
                break;

            case "email":
                if (!value.trim()) {
                    fieldErrors[name] = "Email is required";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    fieldErrors[name] = "Invalid email address";
                }
                break;
            case "password":
                if (!value.trim()) {
                    fieldErrors[name] = "Password is required";
                } else if (value.length < 6) {
                    fieldErrors[name] = "Password must be at least 6 characters";
                } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(value)) {
                    fieldErrors[name] = "Password must contain at least one letter, one number, and one special character";
                }
                break;
            case "passwordRepeat":
                if (value !== formData.password) {
                    fieldErrors[name] = "Passwords must match";
                }
                break;
            default:
                break;
        }

        return fieldErrors;
    };

    const validateForm = (data) => {
        let formErrors = {};

        Object.entries(data).forEach(([name, value]) => {
            const fieldErrors = validateField(name, value);
            if (Object.keys(fieldErrors).length > 0) {
                formErrors = {
                    ...formErrors,
                    ...fieldErrors,
                };
            }
        });

        return formErrors;
    };

    return (
        <div className={styles.container}>
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
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <p className={styles.error}>{errors.password}</p>}
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="passwordRepeat"
                    value={formData.passwordRepeat}
                    onChange={handleChange}
                />
                {errors.passwordRepeat && <p className={styles.error}>{errors.passwordRepeat}</p>}
                <button type="submit">Register</button>
                {errors.error && <p className={styles.error}>{errors.error}</p>}
                <Link href="/login">Have an account? <b>Login</b></Link>
            </form>
        </div>
    );
};

export default RegisterForm;
