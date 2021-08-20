import React, { FC, FormEvent, useState, useContext } from "react";
import styles from "../styles/sign.module.css";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { TokenContext } from "./_app";

interface Props {}

const Signin: FC = (props: Props) => {
  const router = useRouter();
  const { setToken } = useContext(TokenContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitLabel, setSubmitLabel] = useState<string>("Submit");

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitLabel("Submiting...");

    const result = await fetch(
      "https://shortie-api.herokuapp.com/api/v1/auth/signin",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await result.json();
    if (data.status === 200) {
      setToken(data.data.accessToken);
      setSubmitLabel("Submit");
      return router.replace("/");
    }

    alert(data.message);
    setEmail("");
    setPassword("");
    setSubmitLabel("Submit");
  };

  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta
          name="description"
          content="make your urls short and easy to maintain"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>Sign in</h1>
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
            {submitLabel}
          </button>
        </form>
        <div className={styles.switch}>
          {"Don't have an account?"}
          <Link href="/signup" replace={true}>
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signin;
