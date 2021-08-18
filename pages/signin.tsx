import React, { FC, FormEvent, useState } from "react";
import styles from "../styles/signin.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {}

const Signin: FC = (props: Props) => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    const result = await fetch("http://localhost:4000/api/v1/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await result.json();
    console.log(data);
    if (data.status === 200) {
      alert(data.message);
      return router.replace("/");
    }
    alert(data.message);
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.page}>
      <form onSubmit={(e) => loginUser(e)} className={styles.form}>
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
          sign in
        </button>
      </form>
      <div className={styles.switch}>
        {"Don't have an account?"}
        <Link href="/signup" replace={true}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Signin;
