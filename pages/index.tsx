import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/index.module.css";
import { TokenContext } from "./_app";
import { useRouter } from "next/router";
import Header from "../components/Header";

interface refreshToken {
  message: string;
  status: number;
  data: {
    refreshToken: string;
  };
}

const Home = () => {
  const router = useRouter();
  const { token } = useContext(TokenContext);
  const [accessToken, setAccessToken] = useState<string>(token);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!token) {
      const fetchToken = async () => {
        const data: refreshToken | null = await (
          await fetch(
            "https://shortie-api.herokuapp.com/api/v1/auth/refreshtoken"
          )
        ).json();
        if (data?.status === 200) {
          setAccessToken(data.data.refreshToken);
        } else {
          router.replace("/signin");
        }
      };
      fetchToken();
    }
  });

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
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header></Header>
      <h1>Hello World</h1>
      <p>{accessToken}</p>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>increase</button>
    </div>
  );
};
export default Home;
