import type { NextPage } from "next";
import React, { useContext } from "react";
import Head from "next/head";
import styles from "../styles/index.module.css";
import { TokenContext } from "./_app";
import router from "next/router";
import Header from "../components/Header";

const Home: NextPage = () => {
  const { token } = useContext(TokenContext);
  if (!token) {
    router.replace("/signin");
  }

  const userDetails = async () => {
    const res = await fetch(
      "https://shortie-api.herokuapp.com/api/v1/link/userdetails",
      {
        method: "GET",
        headers: {
          "Content-Type": "text/json",
          authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );
    const User = await res.json();
    console.log(User);
  };
  userDetails();

  return (
    <div className={styles.page}>
      <Head>
        <title>Url Shortner</title>
        <meta
          name="description"
          content="make your urls short and easy to maintain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <h1>Hello World</h1>
      <p>{token}</p>
    </div>
  );
};
export default Home;
