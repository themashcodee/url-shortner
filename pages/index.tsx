import type { NextPage } from "next";
import React, { useContext } from "react";
import Head from "next/head";
import styles from "../styles/index.module.css";
import { TokenContext } from "./_app";

const Home: NextPage = () => {
  // const getAllLink = async () => {
  //   const result = await fetch("http://localhost:4000/api/v1/link/getall", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "text/json",
  //     },
  //     credentials: "include",
  //   });
  //   const data = await result.json();
  //   console.log(data);
  // };
  const data = useContext(TokenContext);
  console.log(data?.token);

  return (
    <div className={styles.container}>
      <Head>
        <title>Url Shortner</title>
        <meta
          name="description"
          content="make your urls short and easy to maintain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello World</h1>
      <button>request</button>
    </div>
  );
};

export default Home;
