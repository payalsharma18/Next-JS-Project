"use client"
import { register } from "@/lib/actions";
import styles from "./registerForm.module.css";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const RegisterForm = () => {

    const router = useRouter();
    const [state, formAction] = useFormState(register, undefined)
    useEffect(() => {
        state?.success && router.push("/login");
    }, [state?.success, router]);

    return (
        <form className={styles.form} action={formAction}>
            <input type='text' placeholder='username' name='username' />
            <input type='text' placeholder='email' name='email' />
            <input type='password' placeholder='password' name='password' />
            <input type='password' placeholder='password again' name='passwordRepeat' />
            <button>Register</button>
            {state?.error}
            <Link href="/login">Have an account?<b>Login</b></Link>
        </form>
    )
}

export default RegisterForm