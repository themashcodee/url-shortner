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
    accessToken: string;
  };
}

const Home = () => {
  const router = useRouter();
  const { token } = useContext(TokenContext);
  const [accessToken, setAccessToken] = useState<string>(token);
  const [count, setCount] = useState<number>(0);
  const [links, setLinks] = useState<[]>();

  useEffect(() => {
    const fetchToken = async () => {
      if (!accessToken) {
        const data: refreshToken | null = await (
          await fetch(
            "https://shortie-api.herokuapp.com/api/v1/auth/refreshtoken",
            {
              method: "GET",
              credentials: "include",
              headers: {
                Accept: "application/json",
              },
            }
          )
        ).json();
        console.log("TOKEN", data);
        if (data?.status === 200) {
          setAccessToken(data.data.accessToken);
        } else {
          router.replace("/signin");
        }
      }
    };
    fetchToken();
  }, [accessToken, router]);

  useEffect(() => {
    const userDetails = async () => {
      const res = await (
        await fetch(
          "https://shortie-api.herokuapp.com/api/v1/link/userdetails",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
          }
        )
      ).json();
      console.log("USER", res);
      if (res.status === 200) {
        setLinks(res.links);
      }
    };
    userDetails();
  }, [links, accessToken]);

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
