import React from "react";
import styles from "../styles/signin.module.scss";
import Link from "next/link";
import { NextPage } from "next";

interface Props {}

const Signin: NextPage = (props: Props) => {
  return (
    <div className={styles.page}>
      <form
        method="post"
        action="http://localhost:4000/api/v1/auth/signin"
        className={styles.form}
      >
        <label htmlFor="email" className={styles.emaillabel}>
          Email
        </label>
        <input
          id="email"
          className={styles.email}
          type="email"
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
