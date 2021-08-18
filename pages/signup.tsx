import React, { FC, FormEvent, useState } from "react";
import styles from "../styles/signup.module.scss";
import Link from "next/link";

interface Props {}

const Signup: FC = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const registerUser = async (e: FormEvent) => {
    e.preventDefault();
    const result = await fetch("http://localhost:4000/api/v1/auth/signup", {
      method: "POST",
    });
    console.log(result);
  };

  return (
    <div className={styles.page}>
      <form onSubmit={(e) => registerUser(e)} className={styles.form}>
        <label htmlFor="email" className={styles.emaillabel}>
          Email
        </label>
        <input
          id="email"
          className={styles.email}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          required
        />
        <label htmlFor="password" className={styles.passwordlabel}>
          Password
        </label>
        <input
          id="password"
          className={styles.password}
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          maxLength={30}
        />
        <button type="submit" className={styles.submit}>
          sign up
        </button>
      </form>
      <div className={styles.switch}>
        {"Already have an account?"}
        <Link href="/signin" replace={true}>
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Signup;
