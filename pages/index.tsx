import React, { useContext } from "react";
import Head from "next/head";
import styles from "../styles/index.module.css";
import { TokenContext } from "./_app";
import { useRouter } from "next/router";
import Header from "../components/Header";

const Home = () => {
  const { token } = useContext(TokenContext);
  const router = useRouter();
  if (!token) return router.replace("/signin");

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
